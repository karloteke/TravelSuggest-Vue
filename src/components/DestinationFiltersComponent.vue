<script setup lang="ts">
import { ref } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'
import type { DestinationQueryParameters } from '@/core/destination'

const destinationStore = useDestinationStore()
const emit = defineEmits(['no-results'])

const seasons = ['Verano', 'Primavera', 'Otoño', 'Invierno', 'Todas las estaciones']
const categories = ['Playa', 'Montaña', 'Ciudad', 'Aventura', 'Cultural', 'Gastronomía', 'Ocio']
const popularityOptions = [
  { title: 'Alta', value: 'true' },
  { title: 'Normal', value: 'false' },
]

const filters = ref<{
  cityName: string
  season: string
  category: string
  isPopular: string
}>({
  cityName: '',
  season: '',
  category: '',
  isPopular: '',
})

const applyFilters = async () => {
  const appliedFilters: DestinationQueryParameters = {}

  if (typeof filters.value.cityName === 'string' && filters.value.cityName.trim() !== '') {
    appliedFilters.cityName = filters.value.cityName.trim()
  }
  if (filters.value.season) {
    appliedFilters.season = filters.value.season
  }
  if (filters.value.category) {
    appliedFilters.category = filters.value.category
  }
  if (filters.value.isPopular !== '') {
    appliedFilters.isPopular = filters.value.isPopular === 'true'
  }

  const result = await destinationStore.fetchDestinations(appliedFilters)

  if (result === 'noResults') {
    emit('no-results')
  }
}
</script>

<template>
  <div class="relative rounded-2xl mb-10 overflow-hidden">
    <div
      class="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 shadow-xl"
    >
      <!-- Decoracion de fondo -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
        <div
          class="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl"
        ></div>
      </div>

      <div class="relative flex items-center justify-center gap-2 mb-6">
        <div class="h-px flex-1 bg-linear-to-r from-transparent to-white/20"></div>
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <svg
            class="w-5 h-5 text-accent-light"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filtrar Destinos
        </h3>
        <div class="h-px flex-1 bg-linear-to-l from-transparent to-white/20"></div>
      </div>

      <form
        @submit.prevent="applyFilters"
        class="relative space-y-4 md:space-y-0 md:flex md:flex-wrap md:items-end md:gap-4 md:justify-center"
      >
        <!-- City name -->
        <div class="w-full md:w-52">
          <label class="block text-xs font-medium text-white/70 mb-1.5 tracking-wide uppercase"
            >Destino</label
          >
          <input
            v-model="filters.cityName"
            type="text"
            placeholder="Nombre..."
            class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-accent/50 focus:border-accent/50 focus:bg-white/15 outline-none transition-all text-sm backdrop-blur-sm"
          />
        </div>

        <!-- Season -->
        <div class="w-full md:w-48">
          <label class="block text-xs font-medium text-white/70 mb-1.5 tracking-wide uppercase"
            >Estacion</label
          >
          <select
            v-model="filters.season"
            class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-accent/50 focus:border-accent/50 focus:bg-white/15 outline-none transition-all text-sm appearance-none cursor-pointer backdrop-blur-sm"
          >
            <option value="" class="bg-gray-800 text-white">Todas</option>
            <option v-for="s in seasons" :key="s" :value="s" class="bg-gray-800 text-white">
              {{ s }}
            </option>
          </select>
        </div>

        <!-- Popularity -->
        <div class="w-full md:w-48">
          <label class="block text-xs font-medium text-white/70 mb-1.5 tracking-wide uppercase"
            >Popularidad</label
          >
          <select
            v-model="filters.isPopular"
            class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-accent/50 focus:border-accent/50 focus:bg-white/15 outline-none transition-all text-sm appearance-none cursor-pointer backdrop-blur-sm"
          >
            <option value="" class="bg-gray-800 text-white">Todas</option>
            <option
              v-for="p in popularityOptions"
              :key="p.title"
              :value="p.value"
              class="bg-gray-800 text-white"
            >
              {{ p.title }}
            </option>
          </select>
        </div>

        <!-- Category -->
        <div class="w-full md:w-48">
          <label class="block text-xs font-medium text-white/70 mb-1.5 tracking-wide uppercase"
            >Categoria</label
          >
          <select
            v-model="filters.category"
            class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-accent/50 focus:border-accent/50 focus:bg-white/15 outline-none transition-all text-sm appearance-none cursor-pointer backdrop-blur-sm"
          >
            <option value="" class="bg-gray-800 text-white">Todas</option>
            <option v-for="c in categories" :key="c" :value="c" class="bg-gray-800 text-white">
              {{ c }}
            </option>
          </select>
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="group w-full md:w-auto px-8 py-2.5 bg-linear-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-sm flex items-center justify-center gap-2"
        >
          <svg
            class="w-4 h-4 group-hover:rotate-12 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Filtrar
        </button>
      </form>
    </div>
  </div>
</template>
