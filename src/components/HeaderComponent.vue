<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// Función para navegar a cualquier ruta
function navigateTo(route: string) {
  router.push({ name: route });
}

// Función para redirigir a la ruta de añadir usuario
function navigateToAddUser() {
  router.push('/add-user'); 
}

// Función para manejar el login
function login() {
  console.log('Iniciar Sesión clickeado');
}

// Función para manejar el login
function logout() {
  console.log('Cerrar Sesión clickeado');
}

// Definición de los elementos del menú
interface MenuItem {
  title: string;
  route: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { title: 'Inicio', route: 'home', icon: 'mdi-home' },
  { title: 'Usuarios', route: 'users', icon: 'mdi-account-group' },
  { title: 'Destinos', route: 'destinations', icon: 'mdi-map-marker' },
  { title: 'Sugerencias', route: 'suggestions', icon: 'mdi-lightbulb' },
  { title: 'Consejos para un Viaje Responsable', route: 'tips', icon: 'mdi-earth' },
];
</script>

<template>
  <v-app-bar app color="white" elevated height="100px">
    <!-- Menú Hamburguesa y Logo -->
    <div class="d-flex align-center" style="margin: 0 20px;">
      <v-menu offset-y rounded transition="scale-transition" min-width="250">
        <template #activator="{ props }">
          <v-btn
            icon
            color="#0d6fe5"
            v-bind="props"
            class="menu-button"
            style="font-size: 28px; padding: 10px;"
          >
            <v-icon style="font-size: 36px;">mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-sheet class="dropdown-menu" elevation="8" rounded>
          <v-list dense>
            <v-divider class="mb-2 mt-2"></v-divider>
            <v-list-item
              v-for="item in menuItems"
              :key="item.route"
              @click="navigateTo(item.route)"
              class="dropdown-item"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
        </v-sheet>
      </v-menu>
      <v-toolbar-title>
        <img src="@/assets/logo.png" class="design-logo" alt="Logo" />
      </v-toolbar-title>
    </div>

    <v-spacer></v-spacer>

    <!-- Íconos de Registrar e Iniciar Sesión -->
    <v-col cols="auto" class="d-flex">
      <v-btn
        icon
        color="#0d6fe5"
        @click="navigateToAddUser"
        class="icon-button mr-3"
      >
        <v-icon style="font-size: 28px;">mdi-account-plus</v-icon> 
      </v-btn>
      <v-btn
        icon
        color="#0d6fe5"
        @click="login"
        class="icon-button mr-3"
      >
        <v-icon style="font-size: 28px;">mdi-login</v-icon> 
      </v-btn>
      <v-btn
        icon
        color="#0d6fe5"
        @click="logout"
        class="icon-button mr-3"
      >
        <v-icon style="font-size: 28px;">mdi-logout</v-icon> 
      </v-btn>
    </v-col>
  </v-app-bar>
</template>


<style scoped>
.design-logo {
  max-height: 70px;
  margin-right: 5px; 
}

.v-app-bar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-btn {
  text-transform: none;
  font-weight: bold;
}

.v-btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.menu-button {
  margin-right: 8px; 
}

.dropdown-menu {
  padding: 10px 0;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.dropdown-item {
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #e0f2f1;
}

.v-list-item-title {
  font-weight: 600;
}

.icon-button {
  margin-right: 15px; /* Ajusta el valor según lo necesites */
}

</style>
