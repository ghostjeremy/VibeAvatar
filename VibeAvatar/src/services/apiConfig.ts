import { getApiKey, getApiSecret } from '../firebaseModel'

// apiConfig.ts
interface Server {
    localTest: string,
    firebaseTest: string,
    web: string
}

const API_Config = {
    API_KEY: '',
    API_SECRET: '',
    OPENAI_API_KEY: '',
    setSpotifyKey(spkey: string) {
        this.API_KEY = spkey
    },
    setSpotifySecret(spsecret: string) {
        this.API_SECRET = spsecret
    },
    setOpenAIKey(aikey: string) {
        this.OPENAI_API_KEY = aikey
        console.log('openai key updated.')
    }
}

async function fetchConfigFromFirestore() {
    const spkey = await getApiKey('Spotify')
    const spsecret = await getApiSecret('Spotify')
    const aikey = await getApiKey('OpenAI')
    API_Config.setSpotifyKey(spkey)
    API_Config.setOpenAIKey(aikey)
    API_Config.setSpotifySecret(spsecret)
    console.log('API config initialed.')
  }

const server: Server = {
    localTest: 'http://localhost:5173',
    firebaseTest: 'http://127.0.0.1:5000',
    web: 'https://vibe-avatar.web.app'
}

// ****** change server url in different development conditions ******
const SERVER_URL = server.localTest 
const BASE_URL: string = 'https://api.spotify.com/v1'
const TOKEN_URL = 'https://accounts.spotify.com/api/token'

export { BASE_URL, TOKEN_URL, SERVER_URL, API_Config, fetchConfigFromFirestore };

