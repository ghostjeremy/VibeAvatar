<template>
  <div class="gallery-container">
    <Gallery />
  </div>
</template>

<script lang="ts">
import Gallery from "../components/Gallery.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "GalleryView",
  components: {
    Gallery,
  },
});
</script>


