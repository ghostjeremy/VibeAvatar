<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed } from "vue";
import Toggle from "./components/icons/IconToggle.vue";
import GlobalLoading from "./components/GlobalLoading.vue";
import Footer from './components/footer.vue';

const route = useRoute();
const showInLogin = computed(() => route.path !== '/login');

const isActiveProfile = computed(() => {
  return route.path.startsWith('/profile');
});

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};
</script>

<template>
  <header>
    <RouterLink to="/" class="logoVA">
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="37"
        height="37"
      />
      <div class="VA">Vibe Avatar</div>
    </RouterLink>
    <nav>
      <div class="right-menu">
        <RouterLink  to="/about">About</RouterLink>
        <Toggle @toggle-dark-mode="toggleDarkMode" />
      </div>
    </nav>
  </header>
  <GlobalLoading />

  <RouterView />
  <Footer v-if="showInLogin" />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.574);
  -webkit-backdrop-filter: blur(40px);
  backdrop-filter: blur(40px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 10px;
}

.logoVA {
  display: flex;
  justify-content: center;
  margin: 0rem 0rem 0 1.2rem;
}

.VA {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  font-size: 18px;
  font-weight: 500;
}

nav {
  display: flex;
  justify-content: center;
  text-align: left;
  margin-left: -1rem;
  font-size: 18px;
  margin-top: 0.5rem;
}

header a.router-link-exact-active {
  color: var(--color-text);
}

nav a {
  display: inline-block;
  padding: 0 0.5rem;
  border-left: 0px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

header {
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

.right-menu {
  display: flex;
  align-items: center;
}

header a {
  margin: 0 15px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

header a.router-link-exact-active:hover {
  background-color: transparent;
}

.active-link, 
header a.router-link-exact-active{
  color: #33cc99 !important;
}
</style>
