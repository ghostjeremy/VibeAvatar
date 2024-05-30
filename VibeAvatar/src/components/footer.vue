<template>  
    <footer id="footer" class="footer">
    <div class="grid-container">
      <div class="footer-content">
        <div class="footer-logo">
          <RouterLink to="/" class="nav-link" id="logo">
            <img
              src="@/assets/logo.svg"
              onerror="this.src='/src/assets/noContent.svg';"
              alt="Vibe Avatar logo."
              decoding="sync"
            />
            <div class="VA">Vibe Avatar</div>
          </RouterLink>
        </div>
        <div class="footer-section">
          <h5>About</h5>
          <ul>
            <li><a href="/About#theSite">The Site</a></li>
            <li><a href="/About#Team">Team</a></li>
            
          </ul>
        </div>
        <div class="footer-section">
          <h5>Dashboard</h5>
          <ul>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Playlist</a></li>
            <li><a href="#">Setting</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h5>USEFUL LINKS</h5>
          <ul>
            <li><a href="https://developer.spotify.com/documentation/web-api" target="_blank">Spotify API</a></li>
            <li><a href="https://platform.openai.com/docs/api-reference" target="_blank">OpenAi API</a></li>
          </ul>
        </div>
        <div class="API-icons">
          <a href="https://open.spotify.com/"  target="_blank"><img src="@/assets/Spotify_logo.svg" alt="Spotify"></a>
          <a href="https://openai.com/"  target="_blank"><img src="@/assets/openai_logo.svg" alt="OpenAi"></a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>This website uses the Spotify and OpenAI API.</p> 
        <p>Copyright © 2024 Vibe Avatar. All rights reserved</p> 
      </div>
    </div>
    </footer>
  </template> 
     
      
  
  <script lang="ts">
 export default {
  name: 'Footer',
}
</script>