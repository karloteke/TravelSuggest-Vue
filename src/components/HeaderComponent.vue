<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/loginStore'
import { computed } from 'vue'

const router = useRouter()
const { isLoggedIn, logout, getRole, getUserId } = useLoginStore()
const role = computed(() => getRole())
const currentUserId = computed(() => getUserId())

const navigateTo = (route: string | Record<string, unknown>) => {
  router.push(route)
}

interface MenuItem {
  text: string
  route: string | Record<string, unknown> // Puede ser una cadena o un objeto de ruta
  icon: string
}

const commonMenuItems: MenuItem[] = [
  { text: 'Inicio', route: '/', icon: 'mdi-home' },
  { text: 'Destinos', route: '/destinations', icon: 'mdi-map-marker' },
  { text: 'Experiencias', route: '/suggestions', icon: 'mdi-lightbulb' },
  { text: 'Consejos para un Viaje Responsable', route: '/tips', icon: 'mdi-earth' },
]

const adminMenuItems: MenuItem[] = [{ text: 'Usuarios', route: 'users', icon: 'mdi-account-group' }]
const userMenuItems = computed(() => [
  {
    text: 'Editar mi Perfil',
    route: { name: 'editUser', params: { userId: currentUserId.value } },
    icon: 'mdi-account-edit',
  },
])

const menuItems = computed(() => {
  if (isLoggedIn()) {
    if (role.value === 'admin') {
      return [...commonMenuItems, ...adminMenuItems]
    } else {
      return [...commonMenuItems, ...userMenuItems.value]
    }
  }
  // Usuarios no autenticados
  return commonMenuItems
})
</script>

<template>
  <v-app-bar color="white" height="100px">
    <!-- Menú desplegable -->
    <v-menu offset-y :close-on-content-click="true" ref="menuRef">
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="menu-button">
          <v-icon style="font-size: 36px">mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list style="min-width: 200px; background-color: #2b3c56">
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="() => navigateTo(item.route)"
          class="menu-item"
        >
          <div style="display: flex; align-items: center; color: white">
            <v-icon style="color: white; margin-right: 10px">{{ item.icon }}</v-icon>
            <span style="color: white">{{ item.text }}</span>
          </div>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Logo -->
    <v-toolbar-title class="ml-3">
      <img src="@/assets/logo.png" class="design-logo" alt="Logo" />
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Botones de Registrarse e Iniciar Sesión/Cerrar Sesión -->
    <div class="button-group">
      <router-link to="/add-user" v-if="!isLoggedIn()">
        <v-btn class="custom-btn" :elevation="3" color="#0d6fe5">
          <v-icon left>mdi-account-plus</v-icon>
          Registrarse
        </v-btn>
      </router-link>
      <router-link to="/login" v-if="!isLoggedIn()">
        <v-btn class="custom-btn" :elevation="3" color="#0d6fe5" style="margin-left: 10px">
          <v-icon left>mdi-login</v-icon>
          Iniciar sesión
        </v-btn>
      </router-link>
      <v-btn v-if="isLoggedIn()" @click="logout" class="custom-btn" :elevation="3" color="#0d6fe5">
        <v-icon left>mdi-logout</v-icon>
        Cerrar sesión
      </v-btn>
    </div>
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
  margin-right: 13px;
}

.v-btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 18px 0;
}

.v-list {
  padding: 0;
}

.v-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
}

.v-list-item-icon {
  margin-right: 10px;
}

.v-list-item-title {
  font-size: 20px;
  font-weight: 500;
  color: white;
}

.button-group {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
