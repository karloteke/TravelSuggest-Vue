import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import TipsView from '../views/TipsView.vue';
import UserListView from '@/views/UserListView.vue';
import AddUserView from '@/views/AddUserView.vue';
import EditUserView from '@/views/EditUserView.vue';
import DestinationView from '@/views/DestinationView.vue';
import AddDestinationView from '@/views/AddDestinationView.vue';
import EditDestinationView from '@/views/EditDestinationView.vue';
import DestinationSuggestionsComponent from '../components/DestinationSuggestionsComponent.vue';
import SuggestionView from '@/views/SuggestionView.vue';
import AddSuggestionView from '@/views/AddSuggestionView.vue';
import EditSuggestionView from '@/views/EditSuggestionView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { 
      path: '/login',
      name: 'login',
      component: LoginView
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
      props: true, // Permite pasar el Id como prop al componente
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
      path: '/destination/:id/suggestions',
      name: 'DestinationSuggestions',
      component: DestinationSuggestionsComponent,
      props: true, // Esto permitirá pasar el ID como prop al componente
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
