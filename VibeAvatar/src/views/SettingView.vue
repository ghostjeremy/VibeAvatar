<template>
    <div class="settings-container">
      <ApiKeyInput />
    </div>
  </template>
  
  <script lang="ts">
  import ApiKeyInput from '../components/ApiKeyInput.vue';
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: 'SettingView',
    components: {
      ApiKeyInput
    }
  });
  </script>
  
