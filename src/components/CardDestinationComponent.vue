<script setup lang="ts">
import { useDestinationStore } from '@/stores/destinationStore'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import DestinationFiltersComponent from '@/components/DestinationFiltersComponent.vue'
import { useLoginStore } from '@/stores/loginStore'

const loginStore = useLoginStore()
const isLoggedIn = computed(() => loginStore.isLoggedIn())
const currentUserId = computed(() => loginStore.getUserId())
const role = computed(() => loginStore.getRole())

const { destinations, deleteDestination, fetchDestinations } = useDestinationStore()
const router = useRouter()
const pageSize = 6
const currentPage = ref(1)

const deleteConfirmDialog = ref(false) // Estado del modal de confirmación de eliminación
const destinationToDelete = ref<number | null>(null) // ID del destino a eliminar
const showNoResultsAlert = ref(false) // Controla la visibilidad del mensaje de filtros no encontrados

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

// Función para abrir el modal de confirmación de eliminación
const openDeleteConfirmDialog = (destinationId: number) => {
  destinationToDelete.value = destinationId
  deleteConfirmDialog.value = true
}

// Función para confirmar e eliminar destino
const confirmDeleteDestination = async () => {
  if (destinationToDelete.value !== null) {
    await deleteDestination(destinationToDelete.value)
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

// Iconos según estación del año
const getSeasonIcon = (season: string) => {
  switch (season) {
    case 'Verano':
      return 'mdi-weather-sunny'
    case 'Primavera':
      return 'mdi-flower'
    case 'Otoño':
      return 'mdi-leaf-maple'
    case 'Invierno':
      return 'mdi-snowflake'
    case 'Todas las estaciones del año':
      return 'mdi-earth'
    default:
      return 'mdi-calendar'
  }
}

// Iconos según categoría
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Playa':
      return 'mdi-beach'
    case 'Montaña':
      return 'mdi-terrain'
    case 'Ciudad':
      return 'mdi-city'
    case 'Aventura':
      return 'mdi-hiking'
    case 'Cultural':
      return 'mdi-drama-masks'
    case 'Gastronomía':
      return 'mdi-silverware-fork-knife'
    case 'Ocio':
      return 'mdi-party-popper'
    default:
      return 'mdi-tag-outline'
  }
}

// Cargar destinos al montar el componente
onMounted(() => {
  fetchDestinations() // Llamamos a fetchDestinations() para cargar los destinos inicialmente
})

// Manejador del evento no-results
const handleNoResults = () => {
  showNoResultsAlert.value = true
  setTimeout(() => {
    showNoResultsAlert.value = false
  }, 2000)
}
</script>

<template>
  <div class="container">
    <div class="section-title-container">
      <h1 class="section-title">
        <strong>DESTINOS COMPARTIDOS POR LOS VIAJEROS DE TRAVELSUGGEST</strong>
      </h1>
    </div>

    <p class="description">
      Explora los destinos recomendados por nuestra comunidad de viajeros. Descubre lugares únicos y
      planifica tu próxima aventura de forma responsable. ¿Tienes un destino en mente? ¡Compártelo
      con nosotros y ayuda a otros a descubrirlo! ¡Regístrate ahora! Como miembro registrado, podrás
      compartir tus propios destinos y sugerencias, ayudando a otros viajeros a tener experiencias
      inolvidables. Cada contribución que hagas te otorgará puntos, y estos puntos se acumulan para
      desbloquear recompensas especiales, como descuentos, artículos de viaje, o incluso paquetes de
      experiencias únicas.
    </p>

    <!-- Componente de Filtros -->
    <DestinationFiltersComponent @no-results="handleNoResults" />

    <div class="button-container">
      <button class="floating-add-button" @click="handleAddDestination" v-if="isLoggedIn">
        <v-icon>mdi-plus</v-icon> Añadir Destino
      </button>
    </div>

    <v-alert
      v-if="showNoResultsAlert"
      type="info"
      class="no-results-alert"
      elevation="2"
      dismissible
    >
      No se encontraron destinos que coincidan con los filtros aplicados.
    </v-alert>

    <div class="card-container">
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            md="6"
            lg="4"
            class="pa-4"
            v-for="destination in paginatedDestinations"
            :key="destination.id"
          >
            <v-card class="mx-auto my-4 custom-card" outlined>
              <v-card-title class="title-destination">{{ destination.cityName }}</v-card-title>
              <v-card-subtitle class="subtitle"
                ><v-icon small>mdi-card-account-details-outline</v-icon>
                {{ destination.id }}</v-card-subtitle
              >
              <div class="image-wrapper">
                <v-img
                  :src="destination.imageBase64 || '/assets/default-image.jpg'"
                  class="destination-image"
                  cover
                  alt="Imagen del destino"
                ></v-img>
              </div>

              <v-card-text class="details-text">
                <p><v-icon small>mdi-text-box-outline</v-icon> {{ destination.description }}</p>
                <p class="mt-4">
                  <v-icon :icon="getSeasonIcon(destination.season)" small></v-icon>
                  {{ destination.season }}
                </p>
                <p class="mt-4">
                  <v-icon small>mdi-fire</v-icon>
                  {{ destination.isPopular ? 'Alta' : 'Normal' }}
                </p>
                <p class="mt-4">
                  <v-icon :icon="getCategoryIcon(destination.category)" small></v-icon>
                  {{ destination.category }}
                </p>
              </v-card-text>

              <v-card-actions class="actions-container">
                <v-tooltip bottom>
                  <template #activator="{ props }">
                    <v-btn icon color="#4caf50" @click="viewDetails(destination.id)" v-bind="props">
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                  </template>
                  <span>Ver las experiencias para este destino</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template #activator="{ props }">
                    <v-btn
                      color="#ff9800"
                      @click="addSuggestion(destination.id)"
                      v-if="isLoggedIn"
                      v-bind="props"
                    >
                      <v-icon left>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>Añade una experiencia para este destino</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template #activator="{ props }">
                    <v-btn
                      icon
                      color="#05a4c8"
                      @click="editDestination(destination.id)"
                      v-if="
                        isLoggedIn && (destination.userId === currentUserId || role === 'admin')
                      "
                      v-bind="props"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Edita este destino</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template #activator="{ props }">
                    <v-btn
                      icon
                      color="#f4978e"
                      @click="openDeleteConfirmDialog(destination.id)"
                      v-if="
                        isLoggedIn && (destination.userId === currentUserId || role === 'admin')
                      "
                      v-bind="props"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Borra este destino</span>
                </v-tooltip>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="pagination-container">
      <v-pagination v-model="currentPage" :length="totalPages" @input="changePage"></v-pagination>
    </div>
  </div>

  <!-- Modal de Confirmación de Eliminación -->
  <v-dialog v-model="deleteConfirmDialog" max-width="400">
    <v-card>
      <v-card-title class="headline">Confirmar Eliminación</v-card-title>
      <v-card-text> ¿Estás seguro de que deseas eliminar este destino? </v-card-text>
      <v-card-actions>
        <v-btn color="red" @click="confirmDeleteDestination">Sí, eliminar</v-btn>
        <v-btn color="blue-grey" @click="deleteConfirmDialog = false">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

.container {
  box-sizing: border-box;
  background-image: url('/src/assets/fondo.jpg');
  min-height: 100vh;
  padding: 40px 20px;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
}

.section-title-container {
  text-align: center;
}

.floating-add-button {
  background-color: #ffffff;
  color: #4a90e2;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(5, 164, 200, 0.3);
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 30px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  transition:
    background 0.3s,
    color 0.3s,
    box-shadow 0.3s;
}

.floating-add-button:hover {
  background: linear-gradient(135deg, #62bff6, #66e2b7);
  color: #ffffff;
  box-shadow: 0 6px 12px rgba(102, 189, 240, 0.4);
}

.section-title {
  font-size: 35px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
  color: #4a90e2;
  margin-top: 85px;
  margin-bottom: 20px;
  text-align: center;
}

.description {
  font-size: 18px;
  color: #000000;
  margin-bottom: 20px;
  line-height: 1.6;
  font-family: 'Open Sans', sans-serif;
  padding: 40px 20px;
}

.button-container {
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
  width: 90%;
}

.custom-card {
  background-color: #ffffff;
  border: 1px solid #05a4c8;
  color: rgb(74, 74, 74);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  font-family: 'Open Sans', sans-serif;
  box-shadow: 0 4px 12px rgba(13, 111, 229, 0.1);
  max-width: 100%;
}

.title-destination {
  padding-top: 25px;
  font-size: 35px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
  color: #62bff6;
  margin-bottom: 20px;
  text-align: center;
  word-wrap: break-word;
  white-space: normal;
}

.subtitle {
  color: #555;
  font-size: 15px;
  text-align: center;
}

.details-text p {
  color: #333;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
}

.actions-container {
  display: flex;
  justify-content: space-around;
  margin-top: auto;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 80px;
  margin-bottom: 60px;
}

.no-results-alert {
  position: fixed;
  top: 85px;
  right: 20px;
  width: 300px;
  z-index: 1000;
}
</style>
