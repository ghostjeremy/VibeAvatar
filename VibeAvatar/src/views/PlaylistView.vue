<template>
  <div class="playlist-container">
    <PlaylistAnalyzer
      :cover="cover"
      :name="name"
      :owner="owner"
      :playlistId="playlistId"
      :evaluation="evaluation"
      :fetchEvaluation="fetchEvaluation"
    />
    <ImageGenerator
      :imageUrl="imageUrl"
      :fetchImageData="fetchImageData"
      :likeButtonClicked="handleLikeButtonClick"
    />

    <Tracklist :tracks="tracks" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useProfileView } from "../viewmodels/ProfileViewModel";
import PlaylistAnalyzer from "../components/PlaylistAnalyzer.vue";
import ImageGenerator from "../components/ImageGenerator.vue";
import Tracklist from "../components/Tracklist.vue"; // Import Tracklist component
import { useProfile } from "../stores/profileStore";

export default defineComponent({
  name: "PlaylistView",
  components: {
    PlaylistAnalyzer,
    ImageGenerator,
    Tracklist,
  },
  setup() {
    const route = useRoute();
    const cover = ref<string | undefined>();
    const name = ref<string | undefined>();
    const owner = ref<string | undefined>();
    const playlistId = computed(() => route.query.id as string | undefined);
    const imageUrl = ref<string | null>(null);
    const { fetchTracks, fetchChatGPTEvaluation, evaluation, fetchImage } =
      useProfileView();
    const { toggleFavourite } = useProfile();

    const tracks = ref<Array<any>>([]);

    function updateTracksFromRoute() {
      console.log('updating playlist...')
      const encodedTracks = route.query.tracks as string | undefined;
      if (encodedTracks) {
        try {
          tracks.value = JSON.parse(decodeURIComponent(encodedTracks));
        } catch (error) {
          console.error("Failed to parse tracks data:", error);
        }
      }
    }

    async function fetchEvaluation() {
      if (playlistId.value) {
        await fetchTracks(playlistId.value); // Ensure fetchTracks is called first
        await fetchChatGPTEvaluation(playlistId.value, owner.value || ""); // Fetch evaluation
      }
    }

    async function fetchImageData() {
      console.log("fetchImageData called");
      if (playlistId.value) {
        console.log("Playlist ID:", playlistId.value);
        await fetchTracks(playlistId.value); // Ensure tracks are fetched

        const imageUrlFromAPI = await fetchImage();
        console.log("U === > Fetched image URL:", imageUrlFromAPI);

        imageUrl.value = imageUrlFromAPI;
        console.log("A === > Assigned image URL:", imageUrl.value);
      } else {
        console.warn("No valid playlist ID found");
      }
    }

    function updateParams() {
      evaluation.value = "";
      cover.value =
        typeof route.query.cover === "string" ? route.query.cover : undefined;
      name.value =
        typeof route.query.name === "string" ? route.query.name : undefined;
      owner.value =
        typeof route.query.owner === "string" ? route.query.owner : undefined;
    }

    // Call initially to set initial values
    updateParams();
    updateTracksFromRoute();

    // Watch for route changes and update params
    watch(() => route.query, updateTracksFromRoute);
    watch(route, () => {
      updateParams();
    });

    function handleLikeButtonClick(imageUrl: string | null) {
      if (imageUrl) {
        const playlistName = name.value || "Unknown Playlist"; // Fallback to a default name if undefined
        toggleFavourite(imageUrl, playlistName); // Pass both the URL and playlist name
      }
    }

    return {
      cover,
      name,
      owner,
      playlistId,
      evaluation,
      imageUrl,
      tracks,
      fetchEvaluation,
      fetchImageData,
      handleLikeButtonClick,
    };
  },
});
</script>

<style scoped>
.playlist-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.playlist-container > *:first-child {
  /* PlaylistAnalyzer takes 30% */
  flex: 0 0 30%;
}

.playlist-container > *:nth-child(2) {
  /* ImageGenerator takes 30% */
  flex: 0 0 30%;
}

.playlist-container > *:last-child {
  /* Tracklist takes 40% */
  flex: 0 0 40%;
}
</style>
