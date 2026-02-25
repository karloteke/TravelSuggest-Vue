<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/loginStore'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const route = useRoute()
const { isLoggedIn, logout, getRole, getUserId } = useLoginStore()
const role = computed(() => getRole())
const currentUserId = computed(() => getUserId())
const userStore = useUserStore()
const isHome = computed(() => route.path === '/')
const solidHeader = computed(() => scrolled.value || !isHome.value)

const menuOpen = ref(false)
const scrolled = ref(false)

const currentUser = computed(() => {
  const userId = currentUserId.value
  return userStore.users.find((user) => user.id === userId)
})

const userPoints = computed(() => currentUser.value?.points || 0)

const handleScroll = () => {
  scrolled.value = window.scrollY > 60
}

onMounted(async () => {
  await userStore.fetchCurrentUser()
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navigateTo = (route: string | Record<string, unknown>) => {
  menuOpen.value = false
  router.push(route)
}

const handleLogout = () => {
  menuOpen.value = false
  logout()
}

interface MenuItem {
  text: string
  route: string | Record<string, unknown>
  icon: string
}

const commonMenuItems: MenuItem[] = [
  {
    text: 'Inicio',
    route: '/',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4',
  },
  {
    text: 'Destinos',
    route: '/destinations',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    text: 'Experiencias',
    route: '/suggestions',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    text: 'Consejos',
    route: '/tips',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]

const authMenuItems: MenuItem[] = [
  {
    text: 'Registrarse',
    route: '/add-user',
    icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
  },
  {
    text: 'Iniciar sesion',
    route: '/login',
    icon: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1',
  },
]

const adminMenuItems: MenuItem[] = [
  {
    text: 'Usuarios',
    route: 'users',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  },
]

const userMenuItems = computed(() => [
  {
    text: 'Editar Perfil',
    route: { name: 'editUser', params: { userId: currentUserId.value } },
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
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
  return [...commonMenuItems, ...authMenuItems]
})
</script>

<template>
  <!-- Premium Navbar -->
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
    :class="
      solidHeader
        ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200/50'
        : 'bg-transparent'
    "
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <router-link to="/" class="shrink-0 group">
          <div class="flex items-center gap-3">
            <img
              src="@/assets/logo.png"
              class="h-16 w-auto transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-xl drop-shadow-lg"
              :class="solidHeader ? '' : 'drop-shadow-xl'"
              alt="TravelSuggest"
            />
          </div>
        </router-link>

        <!-- Desktop nav links -->
        <div class="hidden md:flex items-center gap-1">
          <router-link
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.route as string"
            class="relative px-4 py-2 text-base font-bold tracking-wide transition-all duration-300 rounded-lg group"
            :class="
              solidHeader
                ? 'text-gray-700 hover:text-primary'
                : 'text-white hover:text-white/100 drop-shadow-md'
            "
            active-class="!text-primary font-extrabold"
          >
            {{ item.text }}
            <span
              class="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-linear-to-r from-primary to-accent-light rounded-full transition-all duration-300 w-0 group-hover:w-3/4"
            ></span>
          </router-link>

          <template v-if="isLoggedIn()">
            <!-- Points badge premium -->
            <div
              class="flex items-center gap-2 ml-3 px-4 py-2 rounded-full transition-all duration-300"
              :class="
                solidHeader
                  ? 'bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200/60'
                  : 'glass'
              "
            >
              <svg
                class="w-4 h-4 text-amber-400 animate-float"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <span
                class="text-sm font-bold"
                :class="solidHeader ? 'text-amber-700' : 'text-amber-300'"
                >{{ userPoints }} pts</span
              >
            </div>
            <button
              @click="handleLogout"
              class="ml-2 px-5 py-2 rounded-full text-base font-bold transition-all duration-300"
              :class="
                solidHeader
                  ? 'text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold'
                  : 'text-red-200 hover:text-red-100 hover:bg-white/20 font-bold drop-shadow-md'
              "
            >
              Cerrar sesion
            </button>
          </template>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="menuOpen = !menuOpen"
          class="md:hidden p-2.5 rounded-xl transition-all duration-300"
          :class="
            solidHeader
              ? 'text-gray-600 hover:text-primary hover:bg-primary/5'
              : 'text-white hover:bg-white/10'
          "
        >
          <svg
            v-if="!menuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu premium -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-4 scale-95"
    >
      <div
        v-if="menuOpen"
        class="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100/50 shadow-2xl"
      >
        <div class="px-4 py-4 space-y-1">
          <a
            v-for="(item, index) in menuItems"
            :key="index"
            @click="navigateTo(item.route)"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-700 hover:text-primary hover:bg-linear-to-r hover:from-primary/5 hover:to-accent/5 transition-all cursor-pointer group"
          >
            <svg
              class="w-5 h-5 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="item.icon"
              />
            </svg>
            <span class="font-bold text-base">{{ item.text }}</span>
          </a>

          <template v-if="isLoggedIn()">
            <div class="flex items-center gap-2 px-4 py-3">
              <svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <span class="text-sm font-bold text-amber-700">{{ userPoints }} puntos</span>
            </div>
            <hr class="border-gray-200/50 my-1" />
            <a
              @click="handleLogout"
              class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-600 hover:bg-red-50 transition-all cursor-pointer font-bold text-base"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Cerrar sesion</span>
            </a>
          </template>
        </div>
      </div>
    </transition>
  </nav>

  <!-- NO spacer - the hero goes behind the transparent navbar -->
</template>
