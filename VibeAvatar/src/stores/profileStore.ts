import { defineStore } from 'pinia';
import { ref } from 'vue'
import { saveFavourites, getFavourites } from "../firebaseModel";

export interface FavouriteImage {
  url: string;
  playlistName: string;
  time: string;
}

interface UserProfile {
  display_name: string;
  email: string;
  id: string;
  avatar: string;
  favouriteImages: FavouriteImage[]; // Define favouriteImages as a list of strings
}

export const useProfile = defineStore('profile', () => {
  const profile = ref<UserProfile>({
    display_name: '',
      email: '',
      id: '',
      avatar: '',
      favouriteImages: []
  })

  const setProfile = (info: Partial<UserProfile>) => {
    profile.value = {
      ...profile.value,
      ...info,
      favouriteImages: info.favouriteImages ?? profile.value.favouriteImages
    } as UserProfile;
  };

  const resetProfile = () => {
    profile.value = {
      display_name: '',
      email: '',
      id: '',
      avatar: '',
      favouriteImages: []
    };
  };

  const toggleFavourite = (url: string, playlistName: string) => {
    // Ensure favouriteImages is properly initialized
    if (!Array.isArray(profile.value.favouriteImages)) {
      profile.value.favouriteImages = [];
    }

    const index = profile.value.favouriteImages.findIndex(img => img.url === url);

    if (index === -1) {
      const newFavourite: FavouriteImage = {
        url,
        playlistName,
        time: new Date().toISOString()
      };
      profile.value.favouriteImages.push(newFavourite); // Add if it doesn't exist
      console.log('Image URL added to favourites:', newFavourite);
      saveFavourites(profile.value.id, profile.value.favouriteImages);
    } else {
      profile.value.favouriteImages.splice(index, 1); // Remove if it already exists
      console.log('Image URL removed from favourites:', url);
      saveFavourites(profile.value.id, profile.value.favouriteImages);
    }

    console.log('Current favouriteImages:', profile.value.favouriteImages);
  };

  const loadFavourites = async () => {
    if (profile.value.id) {
      const favourites = await getFavourites(profile.value.id); // Fetch from Firebase
      if (favourites) {
        profile.value.favouriteImages = favourites;
      }
    }
  };


  return { profile, setProfile, resetProfile, toggleFavourite, loadFavourites }
})
