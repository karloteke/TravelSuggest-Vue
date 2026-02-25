<script setup lang="ts">
import { useSuggestionStore } from '@/stores/suggestionStore'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { format } from 'date-fns'
import SuggestionFiltersComponent from '@/components/SuggestionFiltersComponent.vue'
import { useLoginStore } from '@/stores/loginStore'
import { useUserStore } from '@/stores/userStore'

const loginStore = useLoginStore()
const userStore = useUserStore()
const isLoggedIn = computed(() => loginStore.isLoggedIn())
const currentUserId = computed(() => loginStore.getUserId())
const role = computed(() => loginStore.getRole())

const { suggestions, deleteSuggestion, fetchSuggestions } = useSuggestionStore()
const router = useRouter()
const pageSize = 6
const currentPage = ref(1)

const deleteConfirmDialog = ref(false)
const suggestionToDelete = ref<number | null>(null)
const showNoResultsAlert = ref(false)

const editSuggestion = (suggestionId: number) => {
  router.push(`/edit-suggestion/${suggestionId}`)
}

const openDeleteConfirmDialog = (suggestionId: number) => {
  suggestionToDelete.value = suggestionId
  deleteConfirmDialog.value = true
}

const confirmDeleteSuggestion = async () => {
  if (suggestionToDelete.value !== null) {
    await deleteSuggestion(suggestionToDelete.value)
    await fetchSuggestions()
    await userStore.fetchCurrentUser()
    deleteConfirmDialog.value = false
    suggestionToDelete.value = null
  }
}

const totalPages = computed(() => Math.ceil(suggestions.length / pageSize))

const paginatedSuggestions = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return suggestions.slice(startIndex, endIndex)
})

const changePage = (page: number) => {
  currentPage.value = page
}

const formatDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy')
}

const getStars = (rating: number) => {
  const maxStars = 5
  return Array.from({ length: maxStars }, (_, index) => index < rating)
}

onMounted(() => {
  fetchSuggestions()
})

const handleNoResults = () => {
  showNoResultsAlert.value = true
  setTimeout(() => {
    showNoResultsAlert.value = false
  }, 2000)
}
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
      class="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"
    ></div>
    <div class="absolute top-1/3 right-1/4 w-64 h-64 bg-amber-200/10 rounded-full blur-3xl"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-10">
        <div
          class="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          Experiencias reales
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 font-serif mb-4">
          EXPERIENCIAS COMPARTIDAS POR LOS VIAJEROS
        </h1>
        <p class="max-w-3xl mx-auto text-gray-500 leading-relaxed">
          En TravelSuggest, cada experiencia cuenta y cada consejo de viaje suma. Publica tus
          recomendaciones y ayuda a otros viajeros a descubrir esos destinos unicos. Cada vez que
          creas una experiencia, ganas puntos para desbloquear recompensas exclusivas.
        </p>
      </div>

      <!-- Filters -->
      <SuggestionFiltersComponent @no-results="handleNoResults" />

      <!-- No results alert -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-4"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 translate-x-4"
      >
        <div
          v-if="showNoResultsAlert"
          class="fixed top-24 right-5 z-50 flex items-center gap-3 px-5 py-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl shadow-lg max-w-sm backdrop-blur-sm"
        >
          <svg class="w-5 h-5 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-sm font-medium">
            No se encontraron sugerencias que coincidan con los filtros aplicados.
          </p>
        </div>
      </transition>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <div
          v-for="suggestion in paginatedSuggestions"
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
            <!-- Price badge on image -->
            <div class="absolute bottom-3 left-3">
              <span
                class="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-emerald-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg"
              >
                ?? {{ suggestion.price }} EUR
              </span>
            </div>
            <!-- Rating on image -->
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

          <!-- Gradient header bar (only when no image) -->
          <div
            v-else
            class="h-2 bg-linear-to-r from-primary via-accent to-primary bg-[length:200%_100%] group-hover:animate-pulse"
          ></div>

          <div class="p-6">
            <h3
              class="text-xl font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors duration-300 break-words"
            >
              {{ suggestion.title }}
            </h3>
            <p class="text-xs text-gray-400 mb-4">Usuario: {{ suggestion.userId }}</p>

            <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {{ suggestion.description }}
            </p>

            <!-- Price & date (when no image) -->
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
            <!-- Date only (when has image, price is on image) -->
            <div v-else class="flex items-center justify-between mb-4">
              <span class="text-xs text-gray-400 flex items-center gap-1">
                ?? {{ formatDate(suggestion.created_at) }}
              </span>
            </div>

            <!-- Stars (when no image, stars are on image otherwise) -->
            <div v-if="!suggestion.imageBase64" class="flex items-center gap-1 mb-5">
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

            <!-- Actions -->
            <div
              v-if="isLoggedIn && (suggestion.userId === currentUserId || role === 'admin')"
              class="flex items-center gap-2 pt-4 border-t border-gray-100/80"
            >
              <button
                @click="editSuggestion(suggestion.id)"
                class="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-primary bg-primary/5 rounded-xl hover:bg-primary/15 hover:shadow-sm transition-all duration-200"
                title="Editar experiencia"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Editar
              </button>

              <button
                @click="openDeleteConfirmDialog(suggestion.id)"
                class="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-red-500 bg-red-50/80 rounded-xl hover:bg-red-100 hover:shadow-sm transition-all duration-200"
                title="Eliminar experiencia"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-16">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="[
            'w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300',
            currentPage === page
              ? 'bg-linear-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 scale-110'
              : 'bg-white/80 backdrop-blur-sm text-gray-600 border border-gray-200/60 hover:border-primary hover:text-primary hover:shadow-md',
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>

  <!-- Delete confirmation modal -->
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="deleteConfirmDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-sm"
        @click="deleteConfirmDialog = false"
      ></div>
      <div class="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full">
        <h3 class="text-xl font-bold text-gray-800 mb-2">Confirmar Eliminacion</h3>
        <p class="text-gray-600 mb-6">Estas seguro de que deseas eliminar esta experiencia?</p>
        <div class="flex gap-3">
          <button
            @click="confirmDeleteSuggestion"
            class="flex-1 py-2.5 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
          >
            Si, eliminar
          </button>
          <button
            @click="deleteConfirmDialog = false"
            class="flex-1 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
