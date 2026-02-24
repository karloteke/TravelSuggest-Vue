<script setup lang="ts">
import { ref } from 'vue'
import { useSuggestionStore } from '@/stores/suggestionStore'
import type { SuggestionQueryParameters } from '@/core/suggestion'

const suggestionStore = useSuggestionStore()
const emit = defineEmits(['no-results'])

const ratings = [1, 2, 3, 4, 5]

const filters = ref<{
  rating: string
  minPrice: string
  maxPrice: string
}>({
  rating: '',
  minPrice: '',
  maxPrice: '',
})

const applyFilters = async () => {
  const appliedFilters: SuggestionQueryParameters = {}

  if (filters.value.minPrice !== '') {
    appliedFilters.minPrice = Number(filters.value.minPrice)
  }
  if (filters.value.maxPrice !== '') {
    appliedFilters.maxPrice = Number(filters.value.maxPrice)
  }
  if (filters.value.rating !== '') {
    appliedFilters.rating = Number(filters.value.rating)
  }

  const result = await suggestionStore.fetchSuggestions(appliedFilters)

  if (result === 'noResults') {
    emit('no-results')
  }
}
</script>

<template>
  <div class="bg-dark-card rounded-2xl p-6 md:p-8 mb-10 shadow-lg">
    <h3 class="text-xl font-bold text-primary text-center mb-6">Filtrar Experiencias</h3>

    <form @submit.prevent="applyFilters" class="space-y-4 md:space-y-0 md:flex md:flex-wrap md:items-end md:gap-4 md:justify-center">
      <!-- Min Price -->
      <div class="w-full md:w-48">
        <label class="block text-xs font-medium text-gray-300 mb-1.5">Precio Minimo</label>
        <input
          v-model="filters.minPrice"
          type="number"
          placeholder="0"
          class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
        />
      </div>

      <!-- Max Price -->
      <div class="w-full md:w-48">
        <label class="block text-xs font-medium text-gray-300 mb-1.5">Precio Maximo</label>
        <input
          v-model="filters.maxPrice"
          type="number"
          placeholder="1000"
          class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
        />
      </div>

      <!-- Rating -->
      <div class="w-full md:w-48">
        <label class="block text-xs font-medium text-gray-300 mb-1.5">Puntuacion</label>
        <select
          v-model="filters.rating"
          class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm appearance-none cursor-pointer"
        >
          <option value="" class="bg-dark-card">Todas</option>
          <option v-for="r in ratings" :key="r" :value="r" class="bg-dark-card">{{ r }} estrella{{ r > 1 ? 's' : '' }}</option>
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
