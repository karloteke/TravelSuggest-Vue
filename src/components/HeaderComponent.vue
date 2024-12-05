<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/loginStore'
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const { isLoggedIn, logout, getRole, getUserId } = useLoginStore()
const role = computed(() => getRole())
const currentUserId = computed(() => getUserId())
const userStore = useUserStore()

const userPoints = ref<number | null>(null)

// Obtener los puntos del usuario logueado
onMounted(async () => {
  userPoints.value = await userStore.getCurrentUserPoints()
})

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

const authMenuItems: MenuItem[] = [
  { text: 'Registrarse', route: '/add-user', icon: 'mdi-account-plus' },
  { text: 'Iniciar sesión', route: '/login', icon: 'mdi-login' },
]

const adminMenuItems: MenuItem[] = [{ text: 'Usuarios', route: 'users', icon: 'mdi-account-group' }]
const userMenuItems = computed(() => [
  {
    text: 'Editar Perfil',
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
  return [...commonMenuItems, ...authMenuItems]
})
</script>

<template>
  <v-app-bar color="white" height="100px">
    <v-toolbar-title class="ml-10">
      <img src="@/assets/logo.png" class="design-logo" alt="Logo" />
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu offset-y :close-on-content-click="true" ref="menuRef">
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="menu-button mr-10">
          <v-icon style="font-size: 45px; color: rgb(79 121 184)">mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list style="min-width: 200px; background-color: #2b3c56">
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="item.route ? navigateTo(item.route) : null"
          class="menu-item"
        >
          <div style="display: flex; align-items: center; color: white">
            <v-icon style="color: white; margin-right: 10px">{{ item.icon }}</v-icon>
            <span style="color: white">{{ item.text }}</span>
          </div>
        </v-list-item>

        <v-list-item v-if="isLoggedIn()" class="static-item">
          <div style="display: flex; align-items: center; color: white">
            <v-icon style="color: white; margin-right: 10px">mdi-star-outline</v-icon>
            <span style="color: white"
              >Mis Puntos: {{ userPoints !== null ? userPoints : 'Cargando...' }}</span
            >
          </div>
        </v-list-item>

        <!-- Separador y "Cerrar sesión" si el usuario está logueado -->
        <v-divider v-if="isLoggedIn()"></v-divider>
        <v-list-item v-if="isLoggedIn()" @click="logout">
          <v-list-item-title><v-icon left>mdi-logout</v-icon>Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
.design-logo {
  max-height: 70px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.v-toolbar-title {
  margin: 0px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 18px 0;
}

.v-list-item {
  color: white;
}

@media (max-width: 600px) {
  .design-logo {
    height: 60px;
    margin-left: 0px;
  }
}
</style>
