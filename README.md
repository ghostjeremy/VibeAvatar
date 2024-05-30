# VIBE AVATAR

Our project involves creating personalized playlist covers based on the content and musical attributes of a user's created or followed playlists, utilizing OpenAI's GPT-3.5 for playlist analysis and DALL·E for generating the artwork that matches the playlist's style. The project uses Vue, adopting the MVVM architecture, and employs Pinia as the store library and state management framework.

[To call user information in developer mode, it may needs to be added to the allowlist.](https://developer.spotify.com/documentation/web-api/concepts/quota-modes)

## Home Page

![Home Page](/index.png)

## Dashboard

![Dashboard](/dashboard.png)

## Gallery

![Gallery](/gallery.png)

# Project Structure

📦 **Vibe Avatar**

- README.md
- env.d.ts
- index.html
- package-lock.json
- package.json
- **public/** # storage for images
- **src/**
  - App.vue # the root component initializes and structures the entire Vue application
  - **assets/** # storage for images
    - base.css # Handle gobal css for light and dark mode.
    - main.css # Handle css for different media.
  - **components/**
    - ApiKeyInput.vue # the component for OpenAI API key input
    - Empty.vue # the component for showing “Choose A Playlist to Analyze”
    - Gallery.vue # the component for image gallery
    - GlobalLoading.vue # the component for global loading status (using the third-party component 'ldrs-ping')
    - ImageGenerator.vue # the component for generating images based on playlists by DALL-E
    - PlaylistAnalyzer.vue # the component for analyzing playlists by GPT
    - Sidebar.vue # the component for sidebar which includes playlists and search
    - Tracklist.vue # the component for a table to show the tracks of a playlist
    - Usermenu.vue # the component for the user's menu
    - Userprofile.vue # the component for the user's profile
    - footer.vue # the component for the footer
    - **icons/**  
      - IconToggle.vue # the component for the dark mode trigger
  - Firebase
    - .firebaserc
    - firebase.json
    - firebaseConfig.ts
    - firebaseModel.ts # maintains user data in firebase.
  - main.ts
  - **router/**
    - router.ts # manages routes of the app.
  - **services/**
    - Utilities.ts # provides utility functions for a Vue.js and TypeScript project that handle authentication with Spotify, fetch user data and playlists, manage API tokens, interact with the OpenAI API for chat completions and image generation, and upload images to Firebase.
    - apiConfig.ts # contains configuration information for API and the route for testing and deploying.
    - scrollerbar.ts # supports responsive scrolling, enabling smooth scrolling between sections.
  - shims-vue.d.ts
  - **stores/**
    - loadingStore.ts # the store component for managing the loading state, including showing and hiding loading indicators
    - profileStore.ts # the store component for managing the user profile, including user details, favorite images, and interactions with Firebase for saving and loading favorite images
  - **viewmodels/**
    - LoginViewModel.ts # the viewmodel component for handling Spotify login, including redirecting to the Spotify login page
    - ProfileViewModel.ts # the viewmodel component for managing user profile view, including fetching profile data, playlists, and tracks, handling authentication, and integrating with OpenAI for playlist evaluations and images
    - SignOutViewModel.ts # the viewmodel component for managing user sign-out, resetting profile and redirecting to login
  - **views/**
    - AboutView.vue # the view component for the introduction of the project and team members
    - EmptyView.vue # the view component for an empty state
    - GalleryView.vue # the view component for the gallery of liked images
    - LoginView.vue # the view component for user login
    - PlaylistView.vue # the view component for the main dashboard for playlists
    - ProfileView.vue # the view component for the user profile menu and playlist collection
    - SettingView.vue # the view component for setting OpenAI API key

- Environment configuration
  - tsconfig.app.json
  - tsconfig.json
  - tsconfig.node.json
  - vite.config.ts



## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
