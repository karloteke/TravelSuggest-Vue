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
  <div
    class="min-h-screen py-12 px-4 relative overflow-hidden"
    style="
      background: linear-gradient(
        135deg,
        #f0f4ff 0%,
        #e8f0fe 25%,
        #f5f0ff 50%,
        #eef7f2 75%,
        #fef9f0 100%
      );
    "
  >
    <!-- Decorative background shapes -->
    <div
      class="absolute top-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"
    ></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center mb-10">
        <div
          class="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Experiencias del destino
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
          <span v-if="destination">Experiencias en {{ destination.cityName }}</span>
        </h1>
      </div>

      <!-- No experiences alert -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-4"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 translate-x-4"
      >
        <div
          v-if="dataLoaded && suggestions.length === 0"
          class="fixed top-24 right-5 z-50 flex items-center gap-3 px-5 py-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl shadow-lg max-w-sm backdrop-blur-sm"
        >
          <svg class="w-5 h-5 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-sm font-medium">No hay experiencias para este destino.</p>
        </div>
      </transition>

      <!-- Cards Grid -->
      <div
        v-if="suggestions.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          class="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-md shadow-gray-200/50 border border-white/60 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500"
        >
          <!-- Image (if available) -->
          <div v-if="suggestion.imageBase64" class="relative h-48 overflow-hidden">
            <img
              :src="suggestion.imageBase64"
              :alt="suggestion.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div
              class="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
            <div class="absolute bottom-3 left-3">
              <span
                class="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-emerald-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg"
              >
                ?? {{ suggestion.price }} EUR
              </span>
            </div>
            <div class="absolute top-3 right-3">
              <span
                class="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm"
              >
                <template v-for="(isFilled, index) in getStars(suggestion.rating)" :key="index">
                  <svg
                    class="w-3.5 h-3.5"
                    :class="isFilled ? 'text-star' : 'text-star-empty'"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </template>
              </span>
            </div>
          </div>

          <!-- Gradient header bar (no image) -->
          <div v-else class="h-2 bg-linear-to-r from-primary via-accent to-primary"></div>

          <div class="p-6">
            <h3
              class="text-xl font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors duration-300 break-words"
            >
              {{ suggestion.title }}
            </h3>
            <p class="text-xs text-gray-400 mb-4">ID: {{ suggestion.id }}</p>

            <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {{ suggestion.description }}
            </p>

            <div v-if="!suggestion.imageBase64" class="flex items-center justify-between mb-4">
              <span
                class="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 bg-emerald-50/80 px-3 py-1.5 rounded-full"
              >
                ?? {{ suggestion.price }} EUR
              </span>
              <span class="text-xs text-gray-400 flex items-center gap-1">
                ?? {{ formatDate(suggestion.created_at) }}
              </span>
            </div>
            <div v-else class="flex items-center mb-4">
              <span class="text-xs text-gray-400 flex items-center gap-1">
                ?? {{ formatDate(suggestion.created_at) }}
              </span>
            </div>

            <!-- Stars (when no image) -->
            <div v-if="!suggestion.imageBase64" class="flex items-center gap-1">
              <template v-for="(isFilled, index) in getStars(suggestion.rating)" :key="index">
                <svg
                  class="w-5 h-5"
                  :class="isFilled ? 'text-star' : 'text-star-empty'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
