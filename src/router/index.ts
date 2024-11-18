import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import TipsView from '../views/TipsView.vue';
import DestinationView from '@/views/DestinationView.vue';
import UserListView from '@/views/UserListView.vue';
import FormAddUserComponent from '../components/FormAddUserComponent.vue';
import AddDestinationView from '@/views/AddDestinationView.vue';
import SuggestionView from '@/views/SuggestionView.vue';
import AddSuggestionView from '@/views/AddSuggestionView.vue';

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
      path: '/users',
      name: 'users',
      component: UserListView
    },
    { 
      path: '/add-user',
      name: 'addUser',
      component: FormAddUserComponent
    },
    {
      path: '/destinations',
      name: 'destinations',
      component: DestinationView
    },
    { 
      path: '/add-destination',
      name: 'addDestination',
      component: AddDestinationView
    },
    { 
      path: '/suggestions',
      name: 'suggestions',
      component: SuggestionView
    },
    { 
      path: '/add-suggestion',
      name: 'addSuggestion',
      component: AddSuggestionView
    },

  ],
})

export default router
