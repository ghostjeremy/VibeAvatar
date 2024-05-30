import { onMounted, ref , computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProfile } from '../stores/profileStore';
import { getPlaylistById, getUserPlaylists, getToken, getProfile, getChatCompletions, getImage } from '../services/Utilities';
import { useLoadingStore } from '../stores/loadingStore';
import type { Playlist, Track } from '../services/Utilities';


export function useProfileView() {
    const profileStore = useProfile();
    const route = useRoute();
    const router = useRouter();
    const profile = computed(() => profileStore.profile);
    const loadingStore = useLoadingStore();
    const isLoaded = ref(false);

    const playlists = ref<Playlist[]>([]);
    const tracks = ref<Track[]>([]); 
    const searchQuery = ref<string>(''); 
    const isDataLoaded = ref(false);
    const evaluation = ref<string | null>(null);

    // if the user just logged in, use fetchProfile to add userInfo to localStorage
    const fetchProfile = async (code: any) => {
          // There is no valid profile data but there is a code parameter to load data.
          loadingStore.showLoading();
          try {
            console.log('Getting token...')
            const accessToken = await getToken(code);
            const profileData = await getProfile(accessToken);

            // update profile
            profileStore.setProfile(profileData);
            isLoaded.value = true
            
            console.log("Profile data fetched and stored");
          } catch (error) {
            console.error('Error in fetchProfile', error);
            isLoaded.value = false
          } finally {
            loadingStore.hideLoading();
          }
      };

    onMounted(async () => {
        if(route.query.error === 'access_denied') {
            router.push('/login')
        }
        try {
            loadingStore.showLoading(); 
            const code = route.query.code;
            console.log(route.query)
    
            // check if there is local user info
            let localUserInfo = localStorage.getItem('userInfo')
        
            if (localUserInfo) {
                const userInfo = JSON.parse(localUserInfo)
                console.log('local userInfo: ', localUserInfo)
                // reload data from localStorage to profile
                profileStore.setProfile({ ...userInfo })
                isLoaded.value = true
                console.log("Using existing profile data from store");
            } else {
                console.log('Getting profile...')
                if(code){
                    await fetchProfile(code) // waiting for the profile data to be updated
                    console.log('Fetched profile data')
                } else {
                    console.log('Error: Not getting code.')
                }
            }
            if (profile.value.id && localStorage.access_token) {
                console.log('getting playlist data...')
                const playlistsData = await getUserPlaylists(localStorage.access_token, profile.value.id);
                playlists.value = playlistsData;
                console.log(playlistsData);
            }
            
        } finally {
            loadingStore.hideLoading(); 
            isDataLoaded.value = true
        }
    });

    const fetchTracks = async (playlistId: string) => {
        try {
            loadingStore.showLoading(); 
            const tracksData = await getPlaylistById(localStorage.access_token, playlistId);
            console.log('Fetched tracks data:', tracksData); 
            tracks.value = tracksData;
            console.log('Tracks array:', tracks.value);
        } finally {
            loadingStore.hideLoading();
        }
    };

    const filteredPlaylists = computed<Playlist[]>(() => {
        if (!searchQuery.value.trim()) {
            return playlists.value;
        }
        return playlists.value.filter(
            (playlist: Playlist) =>
                playlist.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                playlist.owner.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });

    const fetchChatGPTEvaluation = async (playlistId: string, owner: string) => {
        console.log('Evaluating playlist:', playlistId); // Log playlist ID
        try {
            const playlistTracks = tracks.value;
            
            if (playlistTracks.length === 0) {
                console.error('No tracks found for this playlist ID:', playlistId); // Log the playlist ID
                return;
            }

            const trackNames = playlistTracks.map(track => track.name).join(', ');
            console.log('Track names:', trackNames); // Log the track names

            evaluation.value = await getChatCompletions(owner, trackNames); // Update evaluation
            console.log('Evaluation:', evaluation.value); // Log the evaluation
        } catch (error) {
            console.error('Error fetching evaluation:', error); // Log errors
        }
    };

    const fetchImage = async () => {
        try {
            if (tracks.value.length === 0) {
                console.error('No tracks available to generate image.');
                return null;
            }

            const trackNames = tracks.value.map(track => track.name).join(', ');
            console.log('F == > Fetching image with track names:', trackNames); 

            // Fetch the generated image URL from the OpenAI API
            const imageUrl = await getImage(trackNames);
            console.log('R == > Received image URL:', imageUrl);

            return imageUrl;
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            loadingStore.hideLoading();
        }

        return null;
    };

    return {
        profile,
        playlists,
        tracks,
        fetchTracks,
        isDataLoaded,
        searchQuery,
        filteredPlaylists,
        evaluation,
        fetchChatGPTEvaluation, 
        fetchImage,
        isLoaded
    };
}