import { API_Config, BASE_URL, TOKEN_URL, SERVER_URL } from './apiConfig'
import { uploadImageToFirebase } from '../firebaseModel'

interface Options {
    method: string
    headers: {
      Authorization: string
    }
}

interface Artist {
    name: string
}

interface ArtistUrl {
    name: string
    url: string
}
  
export interface Track {
    id: string
    name: string
    artists: Artist[]
    artistUrls: ArtistUrl[]
    album: string
    albumUrl: string
    imageUrl: string | null
    externalUrl: string
}
  
export interface Playlist {
    id: string
    name: string
    owner: string
    cover: string | null
}

async function getResponseACB(response: Response): Promise<any> {
  return response.json().then(
    (promiseJson: any) => {
        console.log(response)
        if (!response.ok) {
            let responseObj = {}
            if (response.status === 401) {
                refreshToken()
                throw new Error("Access token expired. Try again.")
            } else if (response.status === 429) {
                responseObj = {retry_after: response.headers.get('retry-after')}
            }
            const error = Object.assign(responseObj, promiseJson, {
                status: response.status,
                statusText: response.statusText
            })
            const errorString = JSON.stringify(error); // Convert the error object to a string
            throw new Error(errorString); // Throw the error string
          }
          return promiseJson
    }
  )
}

// User Authorization Code with PKCE Flow
// Add scope according to Spotify API document for different endpoints
async function redirectToSpotifyLogin() {
    const verifier = generateCodeVerifier(128)
    const challenge = await generateCodeChallenge(verifier)
  
    localStorage.setItem('verifier', verifier)
    const spotifyAuthUrl =
      'https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        response_type: 'code',
        client_id: API_Config.API_KEY,
        scope: 'user-read-private user-read-email user-top-read playlist-read-private playlist-read-collaborative', // Add scopes as needed
        redirect_uri: SERVER_URL + '/profile', // Specify your redirect URI
        state: 'STATE', // Optional: Add state parameter for security
        show_dialog: 'true', // Optional: Show authorization dialog every time
        code_challenge_method: 'S256',
        code_challenge: challenge
      })
  
    window.location.href = spotifyAuthUrl
}

function generateCodeVerifier(length: number) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
  
async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier)
    const digest = await window.crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
}
  
// Get token
async function getToken(code: any): Promise<string> {
    const verifier = localStorage.getItem('verifier')
  
    const params = new URLSearchParams()
    params.append('client_id', API_Config.API_KEY)
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', SERVER_URL + '/profile')
    params.append('code_verifier', verifier!)
  
    const result = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(API_Config.API_KEY + ':' + API_Config.API_SECRET)}`
      },
      body: params
    })
    const { access_token, refresh_token, expires_in } = await result.json()
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    localStorage.setItem('expires_in', expires_in)
    return access_token
}

// Refresh token that has been previously stored 
async function refreshToken(): Promise<void> {
    const refreshToken: string | null = localStorage.getItem('refresh_token')
    const url: string = TOKEN_URL
  
    const payload: RequestInit = {
       method: 'POST',
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken ?? "",
          client_id: API_Config.API_KEY
       }),
    };
  
    try {
       const response = await fetch(url, payload);
       const responseBody = await response.json();
  
       localStorage.setItem('access_token', responseBody.access_token);
       localStorage.setItem('refresh_token', responseBody.refresh_token);
    } catch (error) {
       console.error("Error refreshing token:", error);
    }
}


// API Endpoints Functions
async function getProfile(token: string): Promise<any> {
    const url = `${BASE_URL}/me`
    const options: Options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const profileData = await fetch(url, options).then(getResponseACB)
    const userInfo = { id: profileData.id, display_name: profileData.display_name, email: profileData.email, avatar: profileData.images[0]?.url }
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    console.log('local userInfo: ', localStorage.getItem('userInfo'))
    return userInfo
}

async function getUserPlaylists(token: string, userId: string): Promise<Playlist[]> {
    const url = `${BASE_URL}/users/${userId}/playlists`
    const options: Options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const data = await fetch(url, options).then(getResponseACB)
    console.log("User's Playlists:", data.items)
    const playlists: Playlist[] = data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        owner: item.owner.display_name,
        cover: item.images ? (item.images[0]?.url || '/EmptyPlaylistCover.png') : '/EmptyPlaylistCover.png'
    }))
    console.log(playlists)
    return playlists
}

async function getPlaylistById(token: string, playlistId: string): Promise<Track[]> {
    const url = `${BASE_URL}/playlists/${playlistId}`
    const options: Options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const data = await fetch(url, options).then(getResponseACB)
    console.log('Playlist Songs:', data.tracks.items)
    const tracks: Track[] = data.tracks.items.map((item: any) => ({
        id: item.track.id,
        name: item.track.name,
        artists: item.track.artists.map((artist: any) => artist.name).join(", "),
        artistUrls: item.track.artists.map((artist: any) => ({
            name: artist.name,
            url: artist.external_urls.spotify
        })),
        album: item.track.album.name,
        albumUrl: item.track.album.external_urls.spotify,
        imageUrl: item.track.album.images[0]?.url || null,
        externalUrl: item.track.external_urls.spotify
    }))
    console.log(tracks)
    return tracks
}

// Get features of each track in a playlist for one call
async function getPlaylistFeatures(token: string, playlistId: string): Promise<any> {
    const tracks = await getPlaylistById(token, playlistId)
    const trackIds = tracks.map(item => item.id).join(',')
    const url = `${BASE_URL}/audio-features?ids=${trackIds}`
    const options: Options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const playlistFeatures = await fetch(url, options).then(getResponseACB)
    console.log('Playlist features:', playlistFeatures)
    return playlistFeatures
}


async function getTrackFeatures(token: string, trackId: string): Promise<any> {
    console.log('Getting track features...: '+trackId)
    const url = `${BASE_URL}/audio-features/${trackId}`
    const options: Options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const features = await fetch(url, options).then(getResponseACB)
    console.log('Track features:', features)
    return features
}

async function getChatCompletions(userName: string, songs: string) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_Config.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `You are a professional music connoisseur, here is a list of songs from your client ${userName}'s playlist. Please give a paragraph in about 100 words commenting on ${userName}'s preferences in music.`
                    },
                    {
                        role: 'user',
                        content: songs
                    }
                ]
            })
        });

        const responseData = await response.json();
        console.log(responseData.choices[0].message.content);
        return responseData.choices[0].message.content
    } catch (error) {
        console.error('Error fetching chat completions:', error);
    }
}

async function getImagePrompt(songs: string) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_Config.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `Give me a promt in less than 100 words for generating an album image according to the following songs in a playlist (only reply with the content of image description): ${songs}. You don't have to include the names of the songs in the description.`
                    },
                    {
                        role: 'user',
                        content: songs
                    }
                ]
            })
        });

        const responseData = await response.json();
        console.log('Image Prompt: ', responseData.choices[0].message.content);
        return responseData.choices[0].message.content
    } catch (error) {
        console.error('Error fetching chat completions:', error);
    }
}

async function getImage(songs: string): Promise<string | null> { 
    const prompt = await getImagePrompt(songs)
    const url = 'https://api.openai.com/v1/images/generations';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_Config.OPENAI_API_KEY}`
    };
    const data = {
      model: 'dall-e-2',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData)
      if (responseData && responseData.data.length > 0) {
        // return responseData
        // return responseData.data[0].url
        const url = await uploadImageToFirebase('data:image/png;base64,'+responseData.data[0].b64_json)
        return url
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
  
    return null;
}

export { 
    redirectToSpotifyLogin,
    getToken,
    refreshToken, 
    getProfile, 
    getUserPlaylists, 
    getPlaylistById, 
    getPlaylistFeatures,
    getTrackFeatures,
    getChatCompletions,
    getImage,
    }
