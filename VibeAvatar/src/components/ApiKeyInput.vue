<template>
  <div class="api-key-container">
    <div class="input-wrapper">
      <input
        :type="isKeyVisible ? 'text' : 'password'"
        v-model="apiKey"
        placeholder="Enter your OpenAI API Key"
        class="api-key-input"
      />
      <button @click="toggleVisibility" class="icon-button">
        <img
          :src="isKeyVisible ? '/hidden.png' : '/show.png'"
          alt="Toggle Visibility"
          class="icon"
        />
      </button>
    </div>
    <button @click="saveApiKey" class="save-btn">Save</button>
  </div>
</template>

<script>
import { API_Config } from "@/services/apiConfig";

export default {
  name: "ApiKeyInput",
  data() {
    return {
      apiKey: "",
      isKeyVisible: false,
    };
  },
  methods: {
    toggleVisibility() {
      this.isKeyVisible = !this.isKeyVisible;
    },
    saveApiKey() {
      console.log("API Key Saved:", this.apiKey);
      API_Config.setOpenAIKey(this.apiKey)
    },
  },
};
</script>

<style scoped>
.api-key-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

img{
  filter: invert(100%);
}

.input-wrapper {
  position: relative;
  flex-grow: 1;
  margin-right: 10px;
}

.api-key-input {
  width: 100%;
  color: #000000;
  border-radius: 4px;
  border: 1px solid #dbdedb; 
  background-color: #f4f4f4;
  padding: 10px;
  padding-right: 40px; 
  outline: none;
}

.icon-button {
  position: absolute;
  right: 5px; 
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.icon {
  width: 24px; 
  height: 24px;
}

.save-btn {
  color: #000000;
  background-color: #e0e0e0;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-btn:hover {
  background-color: #1db954;
}

</style>
