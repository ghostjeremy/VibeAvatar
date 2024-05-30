<template>
  <div class="about">
    <main class='navigation'>
      <nav class='navigation-interface'>
        <div class='navigation-dot' data-index='0'></div>
        <div class='navigation-dot' data-index='1'></div>
      </nav>
      <section class='navigation-section' data-pos='0' id="theSite">
        <div class='navigation-section-wrapper1'>
          <ion-icon class='navigation-icon' name="ellipse-outline"></ion-icon>
          <h1 class='navigation-pronounciation'>About Viber Avatar</h1>
          <p class='navigation-definition'>
              Welcome to our app, designed for playlist analysis and personalized cover image creation using OpenAI. Analyze
          your playlist songs to gain insights and craft unique cover images, adding a personal touch to your music
          collection. Experience the fusion of analytics and creativity, making your playlists truly yours.
          </p>
          <span class='navigation-closure'>...</span>
        </div>
      </section>
      <section class='navigation-section' data-pos='1' id="Team">
        <div class='navigation-section-wrapper3'>
          <ion-icon class='navigation-icon' name="square-outline"></ion-icon>
          <h1 class='navigation-pronounciation'>Our Team</h1>
          <div class="container">
            <div class="card">
              <div class="bg">
                <div class="profile-image">
                  <img src="@/assets/ww.jpeg" alt="Laicaiwei Wang"/>
                </div>
                  <h2>Laicaiwei Wang</h2>
                  <p class="role">Back-end Dev</p>
                  <small class="profile-user-handle">wanglaicaiwei@outlook.com</small>
              </div>                
            </div>
            <div class="card">
              <div class="bg">
                <div class="profile-image">
                  <img src="@/assets/ff.jpeg" alt="Yueling Fan"/>
                </div>
                  <h2>Yueling Fan</h2>
                  <p class="role">Front-end / UX</p>
                  <small class="profile-user-handle">fanfan6027@gmail.com</small>
              </div>                
            </div>
            <div class="card">
              <div class="bg">
                <div class="profile-image">
                  <img src="@/assets/ll.jpeg" alt="Zhentong Liu"/>
                </div>
                  <h2>Zhengtong Liu</h2>
                  <p class="role">Front-end / Architect</p>
                  <small class="profile-user-handle">zhentongliu202@gmail.com</small>
              </div>                
            </div>
            <div class="card">
              <div class="bg">
                <div class="profile-image">
                  <img src="@/assets/zk.jpeg" alt="Zhikun Wu"/>
                </div>
                  <h2>Zhikun Wu</h2>
                  <p class="role">Front-end / Dashboard Dev</p>
                  <small class="profile-user-handle">jeremy.zk.wu@gmail.com</small>
              </div>                
            </div>
          </div>          
        </div>
      </section>
    </main>
  </div>
   
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { init } from '../services/scrollerbar';

export default defineComponent({
  mounted() {
    init();
  }
});
</script>