<script setup lang="ts">
import { useDestinationStore } from '@/stores/destinationStore'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import DestinationFiltersComponent from '@/components/DestinationFiltersComponent.vue'
import { useLoginStore } from '@/stores/loginStore'
import { useUserStore } from '@/stores/userStore'

const loginStore = useLoginStore()
const userStore = useUserStore()
const isLoggedIn = computed(() => loginStore.isLoggedIn())
const currentUserId = computed(() => loginStore.getUserId())
const role = computed(() => loginStore.getRole())

const { destinations, deleteDestination, fetchDestinations } = useDestinationStore()
const router = useRouter()
const pageSize = 6
const currentPage = ref(1)

const deleteConfirmDialog = ref(false)
const destinationToDelete = ref<number | null>(null)
const showNoResultsAlert = ref(false)

const handleAddDestination = () => {
  router.push('/add-destination')
}

const editDestination = (destinationId: number) => {
  router.push(`/edit-destination/${destinationId}`)
}

const viewDetails = (destinationId: number) => {
  router.push(`/destination/${destinationId}/suggestions`)
}

const addSuggestion = (destinationId: number) => {
  router.push({ name: 'AddSuggestion', params: { destinationId } })
}

const openDeleteConfirmDialog = (destinationId: number) => {
  destinationToDelete.value = destinationId
  deleteConfirmDialog.value = true
}

const confirmDeleteDestination = async () => {
  if (destinationToDelete.value !== null) {
    await deleteDestination(destinationToDelete.value)
    await fetchDestinations()
    await userStore.fetchCurrentUser()
    deleteConfirmDialog.value = false
    destinationToDelete.value = null
  }
}

const totalPages = computed(() => Math.ceil(destinations.length / pageSize))

const paginatedDestinations = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return destinations.slice(startIndex, endIndex)
})

const changePage = (page: number) => {
  currentPage.value = page
}

const getSeasonEmoji = (season: string) => {
  switch (season) {
    case 'Verano': return '☀️'
    case 'Primavera': return '🌸'
    case 'Otoño': return '🍂'
    case 'Invierno': return '❄️'
    case 'Todas las estaciones del año': return '🌍'
    default: return '📅'
  }
}

const getCategoryEmoji = (category: string) => {
  switch (category) {
    case 'Playa': return '🏖️'
    case 'Montaña': return '⛰️'
    case 'Ciudad': return '🏙️'
    case 'Aventura': return '🥾'
    case 'Cultural': return '🎭'
    case 'Gastronomia': return '🍴'
    case 'Ocio': return '🎉'
    default: return '🏷️'
  }
}

onMounted(() => {
  fetchDestinations()
})

const handleNoResults = () => {
  showNoResultsAlert.value = true
  setTimeout(() => {
    showNoResultsAlert.value = false
  }, 2000)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50/30 py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-bold text-primary font-serif mb-4">
          DESTINOS COMPARTIDOS POR LOS VIAJEROS
        </h1>
        <p class="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          Explora los destinos recomendados por nuestra comunidad de viajeros. Descubre lugares unicos y
          planifica tu proxima aventura de forma responsable. Tienes un destino en mente? Compartelo
          con nosotros! Registrate ahora y gana puntos por cada contribucion.
        </p>
      </div>

      <!-- Filters -->
      <DestinationFiltersComponent @no-results="handleNoResults" />

      <!-- Add button -->
      <div class="flex justify-start mb-8" v-if="isLoggedIn">
        <button
          @click="handleAddDestination"
          class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:shadow-primary/25 active:scale-95 transition-all duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Anadir Destino
        </button>
      </div>

      <!-- No results alert -->
      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-x-4" enter-to-class="opacity-100 translate-x-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0 translate-x-4">
        <div v-if="showNoResultsAlert" class="fixed top-24 right-5 z-50 flex items-center gap-3 px-5 py-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl shadow-lg max-w-sm">
          <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          <p class="text-sm font-medium">No se encontraron destinos que coincidan con los filtros aplicados.</p>
        </div>
      </transition>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="destination in paginatedDestinations"
          :key="destination.id"
          class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <!-- Image -->
          <div class="relative h-56 overflow-hidden">
            <img
              :src="destination.imageBase64 || '/assets/default-image.jpg'"
              :alt="destination.cityName"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute top-3 right-3 flex gap-2">
              <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary rounded-full">
                {{ getCategoryEmoji(destination.category) }} {{ destination.category }}
              </span>
            </div>
            <div v-if="destination.isPopular" class="absolute top-3 left-3">
              <span class="px-3 py-1 bg-amber-400/90 backdrop-blur-sm text-xs font-bold text-white rounded-full flex items-center gap-1">
                🔥 Popular
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">
              {{ destination.cityName }}
            </h3>
            <p class="text-xs text-gray-400 mb-3">ID: {{ destination.id }}</p>

            <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {{ destination.description }}
            </p>

            <div class="flex items-center gap-4 text-sm text-gray-500 mb-5">
              <span class="flex items-center gap-1">
                {{ getSeasonEmoji(destination.season) }} {{ destination.season }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 pt-4 border-t border-gray-100">
              <button
                @click="viewDetails(destination.id)"
                class="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
                title="Ver experiencias"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                Ver
              </button>

              <button
                v-if="isLoggedIn"
                @click="addSuggestion(destination.id)"
                class="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-amber-600 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors"
                title="Anadir experiencia"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                Exp.
              </button>

              <button
                v-if="isLoggedIn && (destination.userId === currentUserId || role === 'admin')"
                @click="editDestination(destination.id)"
                class="p-2.5 text-primary bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors"
                title="Editar destino"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>

              <button
                v-if="isLoggedIn && (destination.userId === currentUserId || role === 'admin')"
                @click="openDeleteConfirmDialog(destination.id)"
                class="p-2.5 text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                title="Eliminar destino"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
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
            'w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200',
            currentPage === page
              ? 'bg-primary text-white shadow-md shadow-primary/30'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>

  <!-- Delete confirmation modal -->
  <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="deleteConfirmDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="deleteConfirmDialog = false"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full">
        <h3 class="text-xl font-bold text-gray-800 mb-2">Confirmar Eliminacion</h3>
        <p class="text-gray-600 mb-6">Estas seguro de que deseas eliminar este destino?</p>
        <div class="flex gap-3">
          <button
            @click="confirmDeleteDestination"
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
