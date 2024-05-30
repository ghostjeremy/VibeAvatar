<template>
  <div class="playlist-analyzer">
    <div class="playlist-info">
      <img
        :src="cover || '/default-cover.jpg'"
        alt="Playlist Cover"
        class="playlist-cover"
      />
      <div class="text-info">
        <div class="playlist-name">{{ name || "Playlist Name" }}</div>
        <div class="creator-name">{{ owner || "Creator Name" }}</div>
      </div>
    </div>
    <div class="analysis-section">
      <div class="message-box">      <div
        v-if="evaluation !== null && evaluation !== ''"
        class="evaluation-result"
      >
        {{ evaluation }}
      </div></div>
      <button @click="analyzePlaylist" class="analyze-btn">
        <img
          src="/artificial-intelligence.png"
          alt="Analyze"
          class="button-icon"
        />
        Analyze
      </button>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "PlaylistAnalyzer",
  props: {
    cover: String,
    name: String,
    owner: String,
    playlistId: String,
    evaluation: {
      type: String as PropType<string | null>,
      default: null,
    },
    fetchEvaluation: Function, // Receive the method as a prop
  },
  setup(props) {
    const analyzePlaylist = async () => {
      if (props.fetchEvaluation) {
        await props.fetchEvaluation(); // Call the new function
      }
    };

    return {
      analyzePlaylist,
    };
  },
});
</script>

<style scoped>
.playlist-analyzer {
  background-color: #ffffff;
  color: #000000;
  height: calc(100vh - 86px);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.button-icon{
  filter: invert(100%);
}

.playlist-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.playlist-cover {
  width: 50px; 
  height: 50px; 
  margin-right: 20px;
  border-radius: 3px;
}

.text-info {
  display: flex;
  flex-direction: column;
}

.playlist-name {
  color: #000000;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.creator-name {
  color: #383a39;;
  font-size: 12px;
}

.analysis-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.message-box {
  height: auto;
  font-size: 14px;
  margin: 0 20px 20px;  
  width: 100%;
  background-color: #e9e9e9;; 
  padding: 10px; 
  border-radius: 4px; 
  box-sizing: border-box; 
  text-align: justify;  
}

.analyze-btn {
  display: flex;
  align-items: center;
  background-color: #fff;
  color: #000000;
  border: none;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.analyze-btn:hover {
  background-color: #1db954;
}

.button-icon {
  width: 20px; 
  height: 20px; 
  margin-right: 8px;
}
</style>
