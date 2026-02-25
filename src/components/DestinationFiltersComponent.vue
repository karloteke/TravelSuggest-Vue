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
  <div
    class="relative rounded-2xl p-[1px] mb-10 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30"
  >
    <div class="bg-dark-card/95 backdrop-blur-xl rounded-2xl p-6 md:p-8">
      <div class="flex items-center justify-center gap-2 mb-6">
        <div class="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30"></div>
        <h3 class="text-lg font-bold text-primary flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filtrar Destinos
        </h3>
        <div class="h-px flex-1 bg-gradient-to-l from-transparent to-accent/30"></div>
      </div>

      <form
        @submit.prevent="applyFilters"
        class="space-y-4 md:space-y-0 md:flex md:flex-wrap md:items-end md:gap-4 md:justify-center"
      >
        <!-- City name -->
        <div class="w-full md:w-52">
          <label class="block text-xs font-medium text-gray-300 mb-1.5 tracking-wide uppercase"
            >Destino</label
          >
          <input
            v-model="filters.cityName"
            type="text"
            placeholder="Nombre..."
            class="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/40 focus:border-primary/50 focus:bg-white/10 outline-none transition-all text-sm"
          />
        </div>

        <!-- Season -->
        <div class="w-full md:w-48">
          <label class="block text-xs font-medium text-gray-300 mb-1.5 tracking-wide uppercase"
            >Estacion</label
          >
          <select
            v-model="filters.season"
            class="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary/40 focus:border-primary/50 focus:bg-white/10 outline-none transition-all text-sm appearance-none cursor-pointer"
          >
            <option value="" class="bg-dark-card">Todas</option>
            <option v-for="s in seasons" :key="s" :value="s" class="bg-dark-card">{{ s }}</option>
          </select>
        </div>

        <!-- Popularity -->
        <div class="w-full md:w-48">
          <label class="block text-xs font-medium text-gray-300 mb-1.5 tracking-wide uppercase"
            >Popularidad</label
          >
          <select
            v-model="filters.isPopular"
            class="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary/40 focus:border-primary/50 focus:bg-white/10 outline-none transition-all text-sm appearance-none cursor-pointer"
          >
            <option value="" class="bg-dark-card">Todas</option>
            <option
              v-for="p in popularityOptions"
              :key="p.title"
              :value="p.value"
              class="bg-dark-card"
            >
              {{ p.title }}
            </option>
          </select>
        </div>

        <!-- Category -->
        <div class="w-full md:w-48">
          <label class="block text-xs font-medium text-gray-300 mb-1.5 tracking-wide uppercase"
            >Categoria</label
          >
          <select
            v-model="filters.category"
            class="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary/40 focus:border-primary/50 focus:bg-white/10 outline-none transition-all text-sm appearance-none cursor-pointer"
          >
            <option value="" class="bg-dark-card">Todas</option>
            <option v-for="c in categories" :key="c" :value="c" class="bg-dark-card">
              {{ c }}
            </option>
          </select>
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="group w-full md:w-auto px-8 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-sm flex items-center justify-center gap-2"
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
