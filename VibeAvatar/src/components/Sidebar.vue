<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img src="/playlist.png" alt="Playlist Logo" class="sidebar-logo" />
      <h2 class="sidebar-title">My Playlist</h2>
    </div>

    <!-- Search box -->
    <div class="search-box">
      <input
        type="text"
        v-model="localSearchQuery"
        @input="updateSearchQuery"
        placeholder="Search playlists..."
        class="search-input"
      />
    </div>

    <nav class="playlist-container">
      <li
      v-for="playlist in playlists"
        :key="playlist.id"
        class="playlist-item"
        @click="selectPlaylist(playlist.id)"
      >
        <div class="playlist-cover">
          <img
            :src="playlist.cover ?? '/default-cover.png'"
            :alt="playlist.name"
          />

        </div>
        <div class="playlist-info">
          <h3>{{ playlist.name }}</h3>
          <p>{{ playlist.owner }}</p>
        </div>
      </li>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Playlist } from "../services/Utilities";

export default defineComponent({
  name: "Sidebar",
  props: {
    playlists: {
      type: Array as () => Playlist[],
      required: true,
    },
    searchQuery: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const localSearchQuery = ref(props.searchQuery);
    function updateSearchQuery() {
      emit("updateSearchQuery", localSearchQuery.value);
    }
    function selectPlaylist(id: string) {
      emit("selectPlaylist", id);
    }

    return {
      localSearchQuery,
      updateSearchQuery,
      selectPlaylist,
    };
  },
});
</script>


<style scoped>
.sidebar {
  background-color: #ffffff;
  color: #000000;
  width: 100%; 
  padding: 20px;
  border-radius: 10px;
  height: 100vh - 400px ; 
}

.search-box {
  width: 100%;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #dbdedb; 
  background-color: #f4f4f4;
  color: #000000;
}

.playlist-container {
  max-height: calc(100vh - 520px);
  overflow-y: auto; 
}

.playlist-container::-webkit-scrollbar {
    width: 8px; 
}

.playlist-container::-webkit-scrollbar-thumb {
    background-color: #d8d8d8;
    border-radius: 4px;
}

.playlist-container::-webkit-scrollbar-track {
    background-color: #f2f2f2;
    border-radius: 4px;
}

.playlist-container::-webkit-scrollbar-thumb:hover {
    background: #a6a6a6; 
}

.sidebar-header {
  display: flex; 
  align-items: center; 
  margin-bottom: 20px; 
}

.sidebar-logo {
  width: 20px; 
  height: 20px; 
  margin-right: 10px; 
  filter: invert(100%);

}

.sidebar-title {
  font-weight: bold;
  margin: 0; 
  font-size: 1.1rem; 
}

.playlist-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 10px; 
  border-radius: 8px; 
  transition: background-color 0.3s ease; 
  cursor: pointer;
}

.playlist-item:hover {
  background-color: #1DB954; 
}

.playlist-cover {
  margin-top: 10px;
  margin-right: 5px; 
}

.playlist-cover img {
  width: 50px;
  height: 50px;
  border-radius: 3px; 
}

.playlist-info {
  flex: 1; 
  min-width: 0; 
}

.playlist-info h3 {
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-info p {
  font-size: 12px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #383a39;;
  transition: color 0.3s ease;
}

.playlist-item:hover .playlist-info p {
  color: #000;
}
</style>

  