<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateTo(route: string) {
  router.push({ name: route })
}
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col items-center gap-8">
        <!-- Logo -->
        <img src="@/assets/logo.png" alt="TravelSuggest" class="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity" />

        <!-- Nav links -->
        <div class="flex flex-wrap justify-center gap-2">
          <button
            @click="navigateTo('home')"
            class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            Inicio
          </button>
          <button
            @click="navigateTo('destinations')"
            class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            Destinos
          </button>
          <button
            @click="navigateTo('suggestions')"
            class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            Experiencias
          </button>
          <button
            @click="navigateTo('tips')"
            class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            Consejos
          </button>
        </div>

        <!-- Divider -->
        <div class="w-full max-w-md h-px bg-linear-to-r from-transparent via-gray-600 to-transparent"></div>

        <!-- Copyright -->
        <p class="text-sm text-gray-400">
          &copy; {{ new Date().getFullYear() }} TravelSuggest. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>
