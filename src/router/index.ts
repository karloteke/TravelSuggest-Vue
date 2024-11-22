import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import TipsView from '../views/TipsView.vue';
import DestinationView from '@/views/DestinationView.vue';
import UserListView from '@/views/UserListView.vue';
import AddUserView from '@/views/AddUserView.vue';
import EditUserView from '@/views/EditUserView.vue';
import AddDestinationView from '@/views/AddDestinationView.vue';
import EditDestinationView from '@/views/EditDestinationView.vue';
import SuggestionView from '@/views/SuggestionView.vue';
import AddSuggestionView from '@/views/AddSuggestionView.vue';
import EditSuggestionView from '@/views/EditSuggestionView.vue';

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
      component: AddUserView
    },
    { 
      path: '/edit-user/:userId',
      name: 'editUser',
      component: EditUserView,
      props: true, // Permite pasar params como props al componente
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
      path: '/edit-destination/:destinationId',
      name: 'editDestination',
      component: EditDestinationView,
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
    { 
      path: '/edit-suggestion/:suggestionId',
      name: 'editSuggestion',
      component: EditSuggestionView,
    },
  ],
})

export default router
