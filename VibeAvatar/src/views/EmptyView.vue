<template>
    <div class="empty-container">
      <Empty/>
    </div>
  </template>
  
  <script lang="ts">

import Empty from "../components/Empty.vue";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: 'emptyView',
    components: {
      Empty
    }
  });
  </script>
  
