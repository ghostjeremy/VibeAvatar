<template>
  <div class="gallery-container">
    <div class="sort-buttons">
      <button @click="sort('time')" class="button sort-button">
        Time {{ sortOrder.time === "desc" ? "▼" : "▲" }}
      </button>
      <button @click="sort('title')" class="button sort-button">
        Name {{ sortOrder.title === "desc" ? "▼" : "▲" }}
      </button>
    </div>
    <div class="gallery">
      <div
        class="image-item"
        v-for="(image, index) in sortedImages"
        :key="index"
      >
        <img
          :src="image.url"
          :alt="image.playlistName"
          class="image"
          @click="openModal(image)"
        />
        <div class="image-info">
          <h3>{{ image.playlistName }}</h3>
          <p>{{ formatDateTime(image.time) }}</p>
          <div class="button-container">
            <button
              @click="downloadImage(image.url, image.playlistName)"
              class="button icon-button"
            >
              <img src="/apps.png" alt="Download" class="icon" />
            </button>
            <button @click="prepareDelete(index)" class="button icon-button">
              <img src="/delete.png" alt="Delete" class="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Image Modal -->
    <div v-if="imageModal.show" class="modal">
      <div class="modal-content image-modal-content">
        <button @click="closeModal" class="modal-close-button">⊗</button>
        <img :src="imageModal.url" alt="Full Size" style="width: 600px" />
      </div>
    </div>
    <!-- Confirmation Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>Are you sure to delete this image?</p>
        <button @click="deleteImage" class="modal-button">Yes</button>
        <button @click="showModal = false" class="modal-button">No</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useProfile, type FavouriteImage } from "../stores/profileStore";
import { saveFavourites } from "../firebaseModel";

export default defineComponent({
  name: "Gallery",
  setup() {
    const profileStore = useProfile();
    const profile = computed(() => profileStore.profile);
    let localUserInfo = localStorage.getItem("userInfo");
    if (localUserInfo) {
      const userInfo = JSON.parse(localUserInfo);
      console.log("local userInfo: ", localUserInfo);

      // reload data from localStorage to profile
      profileStore.setProfile({ ...userInfo });
      profileStore.loadFavourites();
      console.log(profile);
    }

    const sortOrder = ref<{ time: "asc" | "desc"; title: "asc" | "desc" }>({
      time: "desc",
      title: "asc",
    });

    const sort = (key: "time" | "title") => {
      sortOrder.value[key] = sortOrder.value[key] === "asc" ? "desc" : "asc";
    };

    const sortedImages = computed(() => {
      return profile.value.favouriteImages.slice().sort((a, b) => {
        const key = sortOrder.value.time === "desc" ? "time" : "title";
        const isAsc = sortOrder.value[key] === "asc";

        if (key === "time") {
          return isAsc
            ? new Date(a.time).getTime() - new Date(b.time).getTime()
            : new Date(b.time).getTime() - new Date(a.time).getTime();
        } else if (key === "title") {
          return isAsc
            ? a.playlistName.localeCompare(b.playlistName)
            : b.playlistName.localeCompare(a.playlistName);
        }
        return 0;
      });
    });

    const showModal = ref(false);
    const imageModal = ref({ show: false, url: "" });
    const imageToDeleteIndex = ref<number | null>(null);

    const openModal = (image: FavouriteImage) => {
      imageModal.value.url = image.url;
      imageModal.value.show = true;
    };

    const closeModal = () => {
      imageModal.value.show = false;
      showModal.value = false;
    };

    const prepareDelete = (index: number) => {
      const imageToDelete = sortedImages.value[index];
      const originalIndex = profile.value.favouriteImages.findIndex(
        (img) => img.url === imageToDelete.url
      );

      console.log(
        "Preparing to delete image at original index:",
        originalIndex
      ); // Debug log
      imageToDeleteIndex.value = originalIndex;
      showModal.value = true;
    };

    const deleteImage = () => {
      if (
        imageToDeleteIndex.value !== null &&
        imageToDeleteIndex.value !== -1
      ) {
        profile.value.favouriteImages.splice(imageToDeleteIndex.value, 1); // Direct mutation
        console.log(
          "Image removed at original index:",
          imageToDeleteIndex.value
        ); // Debug log

        // Call saveFavourites manually to update the database
        saveFavourites(profile.value.id, profile.value.favouriteImages);

        closeModal();
      } else {
        console.error("Invalid image index is selected for deletion");
      }
    };

    const downloadImage = (url: string, playlistName: string) => {
      const a = document.createElement("a");
      a.href = url;
      a.download = playlistName.replace(/\s+/g, "_") + ".jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    const formatDateTime = (isoString: string) => {
      const date = new Date(isoString);
      return date
        .toLocaleString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
        .replace(/,/g, "")
        .replace(/ /g, "-");
    };

    onMounted(async () => {
      const profileStore = useProfile();
      await profileStore.loadFavourites();
    });

    return {
      sortedImages,
      imageModal,
      openModal,
      closeModal,
      deleteImage,
      prepareDelete,
      downloadImage,
      formatDateTime,
      sort,
      sortOrder,
      showModal,
      imageToDeleteIndex,
    };
  },
});
</script>

<style scoped>
.gallery-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(255, 255, 255);
  color: #fff;
  padding: 20px;
  border-radius: 8px;
}
.sort-buttons {
  display: flex;
  margin-bottom: 20px;
}
.sort-button {
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 10px 15px;
  margin-right: 10px;
}
.sort-button:last-child {
  margin-right: 0;
}
.sort-button:hover {
  background-color: #1db954;
}
.gallery {
  height: calc(100vh - 172px);
  overflow-y: auto; 
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding-right: 10px;
  justify-content: center;
  align-items: center;
  overflow-x: hidden; 
  overflow-y: hidden; 
  
}

.gallery::-webkit-scrollbar {
  width: 8px; 
}

.gallery::-webkit-scrollbar-thumb {
  background-color: #8f8f8f; 
  border-radius: 4px; 
}

.gallery::-webkit-scrollbar-track {
  background-color: #000; 
  border-radius: 4px; 
}

.gallery::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

.image-item {
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
}
.image {
  position: relative;
  width: 100%;
  max-width: 600px;
  border-radius: 4px;
  cursor: pointer;
}
.image-info {
  text-align: center;
  padding: 10px;
}
.image-info h3,
.image-info p {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.image-info h3 {
  font-size: 14px;
  color: #000;
}
.image-info p {
  font-size: 10px;
  color: #383a39;
}
.button-container {
  display: flex;
  justify-content: center;
  gap: 10px; /* Space between buttons */
  margin-top: 20px; 
}
.button {
  background-color: #444;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.icon-button {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  background-color: #444;
  color: #fff;
  border: none;
  width: 30px; 
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover,
.icon-button:hover {
  background-color: #1db954;
}
.icon {
  width: 20px;
  height: 20px;
}

.modal-button {
  background-color: #000; 
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.modal-button:hover {
  background-color: #1db954;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  background-color: #444;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative; 
  width: auto; 
  max-width: 95%; 
  min-height: 100px; 
}

.modal-content img {
  max-width: 480px; 
  border-radius: 8px;
  height: auto; 
}

.modal-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  font-weight: bold;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  font-size: 24px;
  z-index: 10; 
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
