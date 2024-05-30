<template>
  <div class="image-generator">
    <div class="style-selector">
      <div class="select-wrapper">
        <select id="style-select" v-model="selectedStyle">
          <option disabled value="">Select style...</option>
          <option value="dramatic">Dramatic</option>
          <option value="impression">Impression</option>
          <option value="romantic">Romantic</option>
        </select>
      </div>
    </div>
    <div v-if="loading" class="loading">
      <div class="loader"></div>
      <p>Loading...
      </p>
    </div>
    <img
      v-else :src="imageUrl || '/default-cover.png'"
      :class="{'invert-image': (imageUrl || '/default-cover.png') === '/default-cover.png'}"
      alt="Generated Cover"
      class="image"
    />
    <div class="button-group">
      <button @click="fetchImage" class="action-btn">
        <img src="/gene.png" alt="Generate" class="button-icon" />
        Generate
      </button>
      <button @click="toggleLike" :class="likeButtonClass" class="action-btn">
        ❤︎
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "ImageGenerator",
  props: {
    imageUrl: {
      type: String as PropType<string | null>,
      default: null, 
    },
    fetchImageData: Function, // Receive the method as a prop
    likeButtonClicked: Function,
  },
  data() {
    return {
      selectedStyle: "",
      liked: false,
      loading: false,
    };
  },
  computed: {
    likeButtonClass() {
      return {
        liked: this.liked,
        "not-liked": !this.liked,
      };
    },
  },
  methods: {
    fetchImage() {
      if (this.fetchImageData) {
        this.loading = true; 
        this.fetchImageData() 
        .then(() => {
        this.loading = false;
      })
      .catch((error: Error) => {
        console.error("Error generating image:", error);
        this.loading = false;
      });
      } else {
        console.error("fetchImageData function not passed correctly");
      }
    },
    toggleLike() {
      if (this.likeButtonClicked) {
        this.likeButtonClicked(this.imageUrl); // Pass the image URL to the parent method
      }
      this.liked = !this.liked; // Toggle the like state
    },
  },
});
</script>

<style scoped>
.image-generator {
  background-color: #ffffff;
  color: #000000;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button-group img{
  filter: invert(100%);
}

.loading{
  background-color: #ebebeb;
  width:100%;
  height:60%;
  padding: 0%;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center; 
  flex-direction: column; 
}
.loader {
  width: 45px;
  height: 40px;
  margin-bottom: 1rem;
  background: linear-gradient(#0000 calc(1*100%/6),#28cf33 0 calc(3*100%/6),#0000 0),
            linear-gradient(#0000 calc(2*100%/6),#28cf33 0 calc(4*100%/6),#0000 0),
            linear-gradient(#0000 calc(3*100%/6),#28cf33 0 calc(5*100%/6),#0000 0);
  background-size: 10px 400%;
  background-repeat: no-repeat;
  animation: matrix 0.7s infinite linear;
}
.loading p{
  font-size: 18px;
  color: #28cf33;
  z-index: 30;
}

@keyframes matrix {
  0% {
    background-position: 0% 100%, 50% 100%, 100% 100%
  }

  100% {
    background-position: 0% 0%, 50% 0%, 100% 0%
  }
}
    
.style-selector {
  width: 100%;
  margin-bottom: 20px;
}

.select-wrapper {
  position: relative;
}

.select-wrapper:after {
  content: "▼";
  color: #000000;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.select-wrapper select {
  width: 100%;
  padding: 10px;
  background-color: #f4f4f4;
  color: #000000;
  border-radius: 4px;
  border: none;
  -webkit-appearance: none;
  appearance: none;
}

.image {
  width:100%;
  border-radius: 4px;
  margin-bottom: 20px;
}
.invert-image {
    filter: invert(100%);
  }

.button-group {
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn {
  display: flex;
  align-items: center;
  background-color: transparent;
  color: #000000;
  border: none;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px; 
}

.action-btn:hover {
  background-color: #1db954;
}

.action-btn:last-child {
  margin-right: 0; 
}

.liked {
  font-size: 20px;
  background-color: transparent;
  color: #fe4949;
}

.not-liked {
  font-size: 20px;
  background-color: transparent;
  color: #737373; 
}

.button-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>
