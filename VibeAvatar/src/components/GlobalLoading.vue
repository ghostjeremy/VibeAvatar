<template>
  <div v-if="isLoading" class="loading-overlay">
    <l-ping size="45" speed="1" :color="spinnerColor"></l-ping>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLoadingStore } from "../stores/loadingStore";

const store = useLoadingStore();
const isLoading = computed(() => store.isLoading);
const spinnerColor = computed(() =>
  getComputedStyle(document.documentElement)
    .getPropertyValue("--loading-color")
    .trim()
);
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2000;
}
</style>
