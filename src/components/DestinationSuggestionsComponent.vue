<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSuggestionStore } from '@/stores/suggestionStore'
import { useDestinationStore } from '@/stores/destinationStore'
import type { Suggestion } from '@/core/suggestion'
import type { Destination } from '@/core/destination'
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter()
const destinationId = Number(route.params.id)
const { fetchSuggestionsByDestinationId } = useSuggestionStore()
const { fetchDestinationById } = useDestinationStore()

const suggestions = ref<Suggestion[]>([])
const destination = ref<Destination | null | undefined>(null)
const dataLoaded = ref(false)

const formatDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy')
}

const getStars = (rating: number) => {
  const maxStars = 5
  return Array.from({ length: maxStars }, (_, index) => index < rating)
}

onMounted(async () => {
  suggestions.value = await fetchSuggestionsByDestinationId(destinationId)
  destination.value = await fetchDestinationById(destinationId)
  dataLoaded.value = true

  if (suggestions.value.length === 0) {
    setTimeout(() => {
      router.push('/destinations')
    }, 2000)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50/30 py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-bold text-primary text-center font-serif mb-10">
        <span v-if="destination">Experiencias en {{ destination.cityName }}</span>
      </h1>

      <!-- No experiences alert -->
      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-x-4" enter-to-class="opacity-100 translate-x-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0 translate-x-4">
        <div v-if="dataLoaded && suggestions.length === 0" class="fixed top-24 right-5 z-50 flex items-center gap-3 px-5 py-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl shadow-lg max-w-sm">
          <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          <p class="text-sm font-medium">No hay experiencias para este destino.</p>
        </div>
      </transition>

      <!-- Cards Grid -->
      <div v-if="suggestions.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div class="h-2 bg-gradient-to-r from-primary to-accent"></div>

          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors break-words">
              {{ suggestion.title }}
            </h3>
            <p class="text-xs text-gray-400 mb-4">ID: {{ suggestion.id }}</p>

            <p class="text-gray-600 text-sm leading-relaxed mb-4">
              {{ suggestion.description }}
            </p>

            <div class="flex items-center justify-between mb-4">
              <span class="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {{ suggestion.price }} EUR
              </span>
              <span class="text-xs text-gray-400">
                {{ formatDate(suggestion.created_at) }}
              </span>
            </div>

            <!-- Stars -->
            <div class="flex items-center gap-1">
              <template v-for="(isFilled, index) in getStars(suggestion.rating)" :key="index">
                <svg
                  class="w-5 h-5"
                  :class="isFilled ? 'text-star' : 'text-star-empty'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
