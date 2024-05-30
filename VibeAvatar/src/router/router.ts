import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import AboutView from '../views/AboutView.vue'
import GalleryView  from '../views/GalleryView.vue'
import SettingView from '../views/SettingView.vue'
import PlaylistView from '../views/PlaylistView.vue'
import EmptyView from '@/views/EmptyView.vue'

const routes = [
  { path: '/', redirect: '/login' }, 
  { path: '/login', name: 'login', component: LoginView },
  { path: '/about', name: 'about', component: AboutView },
  {
    path: '/profile',
    component: ProfileView,
    children: [
      { path: '', redirect: '/profile/empty' }, 
      { path: 'empty', component: EmptyView},
      { path: 'settings', component: SettingView },
      { path: 'gallery', component: GalleryView },
      { path: 'playlist', component: PlaylistView}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
