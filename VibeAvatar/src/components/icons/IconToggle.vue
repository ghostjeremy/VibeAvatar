<template>
  <div class="Dark-theme-switcher" @click="Toggle">
    <input id="switch" class="input" type="checkbox" v-model="darkMode">
      <div class="icon icon--moon" >
        <svg height="22" width="22" fill="rgb(50,50,50)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" fill-rule="evenodd"></path>
        </svg>
       
      </div>
      <div class="icon icon--sun" >
        <svg height="22" width="22" fill="rgb(50,50,50)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
        </svg>
        
      </div>
  </div>
</template>

<script setup>
import { defineEmits,ref, onMounted, nextTick } from 'vue';
const emit = defineEmits(['toggle-dark-mode']);
const darkMode = ref(false);

// Lifecycle hook to initialize the dark mode from localStorage
onMounted(() => {
  darkMode.value = localStorage.getItem('dark-mode') === 'true';
  updateBodyClass();
});

function Toggle() {
  darkMode.value = !darkMode.value;
  localStorage.setItem('dark-mode', darkMode.value.toString());
  nextTick(() => {
    updateBodyClass();
  });
  emit('toggle-dark-mode');
}

function updateBodyClass() {
  document.body.classList.toggle('dark-mode', darkMode.value);
}

</script>

<style scoped>
.Dark-theme-switcher {
  background-color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 0 50px 20px rgba(0, 0, 0, .1);
  line-height: 1;
  margin-left: 2.2rem;
}

.input {
  display: none;
}

.icon {
  grid-column: 1 / 1;
  grid-row: 1 / 1;
  transition: transform 500ms;
}

.icon--moon {
  /* transform: scale(0); */
  transform: scale(1);
}

.icon--sun {
  transform: scale(0);
}

#switch:checked + .icon--moon {
  transform: rotate(360deg) scale(0);
}

#switch:checked ~ .icon--sun {
  transform: scale(1) rotate(360deg);
}

body.dark-mode .Dark-theme-switcher {
  background-color: rgb(220,220,220); 
}

</style>

  
  
 
  