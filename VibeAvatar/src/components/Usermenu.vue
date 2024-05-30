<template>
  <div class="user-menu">
    <button @click="onGallery">
      <img src="/gallery.png" alt="Gallery" class="icon"> Gallery
    </button>
    <button @click="onSetting">
      <img src="/setting.png" alt="Setting" class="icon"> Setting
    </button>
    <button @click="onSignOut">
      <img src="/logout.png" alt="Sign out" class="icon"> Sign out
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useProfile } from '../stores/profileStore';
import { signOut } from '../viewmodels/SignOutViewModel.ts';

export default {
  setup() {
    const router = useRouter();

    // Navigation function for Gallery page
    const onGallery = () => {
      router.push('gallery');
    };

    // Navigation function for Setting page
    const onSetting = () => {
      router.push('settings');
    };

    const onSignOut = signOut();

    return {
      onGallery,
      onSetting,
      onSignOut
    };
  }
};
</script>

<style scoped>
.user-menu {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  width: 100%;
  height: 150px; 
}
img{
  filter: invert(100%);
}

button {
  color: #000000;
  background-color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
  width: 100%; 
}

button:last-child {
  margin-bottom: 0; 
}

button:hover {
  background-color: #1DB954; 
}

.icon {
  width: 20px; 
  height: 20px; 
  margin-right: 18px;
}
</style>