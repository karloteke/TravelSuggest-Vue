<script setup lang="ts">
import { ref } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'
import type { DestinationQueryParameters } from '@/core/destination'

const destinationStore = useDestinationStore()
const emit = defineEmits(['no-results'])

const seasons = ['Verano', 'Primavera', 'Otono', 'Invierno', 'Todas las estaciones']
const categories = ['Playa', 'Montana', 'Ciudad', 'Aventura', 'Cultural', 'Gastronomia', 'Ocio']
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
  <div class="bg-dark-card rounded-2xl p-6 md:p-8 mb-10 shadow-lg">
    <h3 class="text-xl font-bold text-primary text-center mb-6">Filtrar Destinos</h3>

    <form @submit.prevent="applyFilters" class="space-y-4 md:space-y-0 md:flex md:flex-wrap md:items-end md:gap-4 md:justify-center">
      <!-- City name -->
      <div class="w-full md:w-52">
        <label class="block text-xs font-medium text-gray-300 mb-1.5">Destino</label>
        <input
          v-model="filters.cityName"
          type="text"
          placeholder="Nombre..."
          class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
        />
      </div>

      <!-- Season -->
      <div class="w-full md:w-48">
        <label class="block text-xs font-medium text-gray-300 mb-1.5">Estacion</label>
        <select
          v-model="filters.season"
          class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm appearance-none cursor-pointer"
        >
          <option value="" class="bg-dark-card">Todas</option>
          <option v-for="s in seasons" :key="s" :value="s" class="bg-dark-card">{{ s }}</option>
        </select>
      </div>

      <!-- Popularity -->
      <div class="w-full md:w-48">
        <label class="block text-xs font-medium text-gray-300 mb-1.5">Popularidad</label>
        <select
          v-model="filters.isPopular"
          class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm appearance-none cursor-pointer"
        >
          <option value="" class="bg-dark-card">Todas</option>
          <option v-for="p in popularityOptions" :key="p.title" :value="p.value" class="bg-dark-card">{{ p.title }}</option>
        </select>
      </div>

      <!-- Category -->
      <div class="w-full md:w-48">
        <label class="block text-xs font-medium text-gray-300 mb-1.5">Categoria</label>
        <select
          v-model="filters.category"
          class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm appearance-none cursor-pointer"
        >
          <option value="" class="bg-dark-card">Todas</option>
          <option v-for="c in categories" :key="c" :value="c" class="bg-dark-card">{{ c }}</option>
        </select>
      </div>

      <!-- Button -->
      <button
        type="submit"
        class="w-full md:w-auto px-8 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 active:scale-95 transition-all duration-200 text-sm"
      >
        Filtrar
      </button>
    </form>
  </div>
</template>
