<template>
  <div class="tracklist-container">
    <!-- New container -->
    <div class="tracklist">
      <table>
        <thead>
          <tr>
            <th class="number-column">#</th>
            <th class="title-column">Title</th>
            <th class="album-column">Album</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(track, index) in tracks"
            :key="track.id"
            @click="openTrackUrl(track.externalUrl)"
            class="track-row"
          >
            <td class="number-column">{{ index + 1 }}</td>
            <td class="title-column">
              <div class="track-info">
                <img
                  :src="track.imageUrl"
                  class="album-cover"
                  :alt="track.name"
                />
                <div>
                  <div class="track-title">{{ track.name }}</div>
                  <div class="artist-name">{{ track.artists }}</div>
                </div>
              </div>
            </td>
            <td class="album-column">
              <div class="album-name">{{ track.album }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tracklist",
  props: {
    tracks: {
      type: Array, 
      required: true,
    },
  },
  methods: {
    openTrackUrl(url) {
      window.open(url, "_blank"); // Opens the track's URL in a new tab
    },
  },
};
</script>

<style scoped>
.tracklist-container {
  width: 600px;
  border-radius: 10px; 
  background-color: #ffffff; 
  overflow-x: hidden;
}

thead,
tbody tr {
  display: table;
  width: 400px;
  table-layout: fixed; 
  border-radius: 10px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

tbody tr:hover {
  background-color: #3fd366; 
}

tbody {
  display: block;
  height: calc(100vh - 180px); 
  overflow-y: scroll;
  width: 100%;
  border-radius: 15px;
  margin-bottom: 20px;
  overflow-x: hidden;
}

tbody::-webkit-scrollbar {
  width: 8px;
}

tbody::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 4px; 
}

tbody::-webkit-scrollbar-thumb {
  background-color: #8f8f8f; 
  border-radius: 4px; 
}

tbody::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
}

thead {
  background-color: #ffffff;
  color: #000;
}

.album-cover {
  width: 50px;
  height: 50px;
  border-radius: 3px;
  margin-right: 10px;
  vertical-align: middle;
}

.track-info {
  display: flex;
  align-items: center;
}

.number-column {
  width: 50px; /* Updated from 20px to 50px */
  font-size: 14px;
  color: #000000;
}

.title-column {
  color: #000000;
  width: 265px; /* Updated from 180px to 275px */
  font-size: 14px;
}

.track-title {
  color: #000000;
  width: 200px; /* Updated from 180px to 275px */
  font-size: 14px;
  white-space: nowrap; /* Ensure text does not wrap */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Display ellipsis for overflow */
}

.album-column {
  color: #000000;
  width: 255px; /* Updated from 250px to 275px */
  font-size: 14px;
}

.album-name {
  width: 250px; /* Updated from 250px to 275px */
  color: #383a39;
  font-size: 14px;
  white-space: nowrap; /* Ensure text does not wrap */
  overflow: hidden; 
  text-overflow: ellipsis; 
}

.artist-name {
  width: 180px; 
  font-size: 12px; 
  white-space: nowrap; 
  color: #383a39;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
