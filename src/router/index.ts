import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import TipsView from '../views/TipsView.vue';
import DestinationView from '@/views/DestinationView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tips',
      name: 'tips',
      component: TipsView
    },
    {
      path: '/destinations',
      name: 'destinations',
      component: DestinationView
    },
  ],
})

export default router
