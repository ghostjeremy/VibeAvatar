<template>
  <div class="dashboard">
    <div class="container">
      <div class="column column1">
        <Userprofile :user="profile" />
        <Sidebar
          :playlists="filteredPlaylists"
          :searchQuery="searchQuery"
          @selectPlaylist="handleSelectPlaylist"
          @updateSearchQuery="searchQuery = $event"
        />
        <Usermenu />
      </div>

      <div class="column column2">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Userprofile from "../components/Userprofile.vue";
import Usermenu from "../components/Usermenu.vue";
import Sidebar from "../components/Sidebar.vue";
import { useProfileView } from "../viewmodels/ProfileViewModel";

export default defineComponent({
  name: "ProfileView",
  components: {
    Userprofile,
    Usermenu,
    Sidebar,
  
  },
  setup() {
    const router = useRouter();
    const {
      profile,
      fetchTracks,
      isDataLoaded,
      searchQuery,
      filteredPlaylists,
      tracks,
      isLoaded,
    } = useProfileView(); // use ViewModel logic

    async function handleSelectPlaylist(playlistId: string) {
      await fetchTracks(playlistId); // Load the playlist tracks

      const selectedPlaylist = filteredPlaylists.value.find(
        (playlist) => playlist.id === playlistId
      );

      // Modified lines: Encode tracks data into JSON and add to query params
      const encodedTracks = encodeURIComponent(JSON.stringify(tracks.value));

      router.push({
        path: "/profile/playlist",
        query: {
          id: selectedPlaylist?.id,
          name: selectedPlaylist?.name,
          owner: selectedPlaylist?.owner,
          cover: selectedPlaylist?.cover,
          tracks: encodedTracks, // Add encoded tracks data to the query params
        },
      });
    }

    return {
      profile,
      isDataLoaded,
      searchQuery,
      filteredPlaylists,
      handleSelectPlaylist,
      isLoaded,
    };
  },
});
</script>

<style scoped>
.dashboard{
  background-color: #e8eae8;
  padding-bottom: 20px;
  padding-right: 40px;
}

.container {
  display: flex;
  flex-direction: row; 
  gap: 20px;
  padding-top: 45px;
  margin: 2rem;
  
}

.column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.column1 {
  width: 300px; 
}

.column2 {
  flex: 1; 
}

.column3 {
  width: 600px; 
}
</style>
