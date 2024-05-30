<template>
 <main>
    <div class="login">
      <div class="Tittle">
        <div class="tittle1">
        The <h1> Personalised </h1>
        </div>
        <div class="tittle2">
          <h1 >Music Art Grallery with AI</h1>
      </div>
        <p>Creating artwork and feature reviews by analysing your Spotify playlists.</p>
    </div>
      <button id="loginButton" class="connectSpotify" @click="login">Connect your Spotify</button>

      <div class="UseApi">
              <div class="descriptionLeft">Playlist Access</div>
              <img alt="Spotify logo" class="Spotify" src="@/assets/Spotify_logo.svg" width="30" height="30" />
              <div class="descriptionRight">Artwork and reviews Generator</div>
              <img alt="OpenAI logo" class="OpenAI" src="@/assets/openai_logo.svg" width="30" height="30" />
      </div>

    <router-view></router-view>
  </div>
 </main>
 
</template>

<script setup lang="ts">
import { useSpotifyLogin } from '../viewmodels/LoginViewModel'
import { useRouter } from 'vue-router';
const router = useRouter()
if(localStorage.getItem('userInfo')){
  router.push('/profile')
}
const { login } = useSpotifyLogin()
</script>




