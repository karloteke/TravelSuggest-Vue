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
  <div class="relative rounded-2xl mb-10 overflow-hidden">
    <div
      class="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 shadow-xl"
    >
      <!-- Decoracion de fondo -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-10 -right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
        <div
          class="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl"
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
          Filtrar Experiencias
        </h3>
        <div class="h-px flex-1 bg-linear-to-l from-transparent to-white/20"></div>
      </div>

      <form
        @submit.prevent="applyFilters"
        class="relative space-y-4 md:space-y-0 md:flex md:flex-wrap md:items-end md:gap-4 md:justify-center"
      >
        <!-- Min Price -->
        <div class="w-full md:w-48">
          <label class="block text-xs font-medium text-white/70 mb-1.5 tracking-wide uppercase"
            >Precio Minimo</label
          >
          <input
            v-model="filters.minPrice"
            type="number"
            placeholder="0"
            class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-accent/50 focus:border-accent/50 focus:bg-white/15 outline-none transition-all text-sm backdrop-blur-sm"
          />
        </div>

        <!-- Max Price -->
        <div class="w-full md:w-48">
          <label class="block text-xs font-medium text-white/70 mb-1.5 tracking-wide uppercase"
            >Precio Maximo</label
          >
          <input
            v-model="filters.maxPrice"
            type="number"
            placeholder="1000"
            class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-accent/50 focus:border-accent/50 focus:bg-white/15 outline-none transition-all text-sm backdrop-blur-sm"
          />
        </div>

        <!-- Rating -->
        <div class="w-full md:w-48">
          <label class="block text-xs font-medium text-white/70 mb-1.5 tracking-wide uppercase"
            >Puntuacion</label
          >
          <select
            v-model="filters.rating"
            class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-accent/50 focus:border-accent/50 focus:bg-white/15 outline-none transition-all text-sm appearance-none cursor-pointer backdrop-blur-sm"
          >
            <option value="" class="bg-gray-800 text-white">Todas</option>
            <option v-for="r in ratings" :key="r" :value="r" class="bg-gray-800 text-white">
              {{ r }} estrella{{ r > 1 ? 's' : '' }}
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
