<template>
    <div class="user-profile">
      <div class="user-avatar">
        <img :src="user.avatar" :alt="user.display_name">
      </div>
      <div class="user-info">
        <h2>{{ user.display_name }}</h2>
        <p>Email: {{ user.email }}</p>
        <p>UserID: {{ user.id }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Userprofile',
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
.user-profile {
  display: flex;
  align-items: center;
  width: 100%; 
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  height: 100px; 
  overflow: hidden; 
}
  .user-avatar img {
    width: 70px; 
    height: 70px; 
    border-radius: 50%; 
    margin-right: 10px;
  }
  
  .user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden; 
  width: 0; /* Prevent flexbox child from overflowing */
  flex-grow: 1;
}

  .user-info h2 {
    margin: 0;
    color: black;
    font-size: 20px;
    white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  }
  
  .user-info p {
    margin: 0;
    color: #383a39;
    font-size: 12px;  
    white-space: nowrap; /* Keep text on one line */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>
  