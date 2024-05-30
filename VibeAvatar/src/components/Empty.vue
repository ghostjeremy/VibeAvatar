<template>
    <div class="empty">
      <p>Choose A Playlist to Analyze</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Empty',
  };
  </script>
  
  <style scoped>
  .empty {
  background-image: linear-gradient(
			175deg,
			#25f776,
			#25f776 1%,
			rgb(255, 255, 255) 28%,
			#ffffff 100%
		);
  color: #000000;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  font-weight: bold;
  justify-content: center; 
  align-items: center; 
    height: calc(100vh - 86px);
    width: 100%; 
  }
  </style>