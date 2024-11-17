<script setup lang="ts">
import { useDestinationStore } from '@/stores/destinationStore'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const { destinations, deleteDestination } = useDestinationStore()
const router = useRouter()
const pageSize = 6
const currentPage = ref(1)


const deleteConfirmDialog = ref(false) // Estado del modal de confirmación de eliminación
const destinationToDelete = ref<number | null>(null) // ID del destino a eliminar

const handleAddDestination = () => {
  router.push('/add-destination')
}

const editDestination = (destinationId: number) => {
  router.push(`/edit-destination/${destinationId}`)
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
</script>

<template>
  <div class="container">
    <h1 class="section-title">
      <strong>Destinos compartidos por los viajeros de TravelSuggest</strong>
    </h1>
    <p class="description">
      Explora los destinos recomendados por nuestra comunidad de viajeros. Descubre lugares únicos y
      planifica tu próxima aventura de forma responsable. ¿Tienes un destino en mente? ¡Compártelo
      con nosotros y ayuda a otros a descubrirlo! ¡Regístrate ahora! Como miembro registrado, podrás
      compartir tus propios destinos y sugerencias, ayudando a otros viajeros a tener experiencias
      inolvidables. Cada contribución que hagas te otorgará puntos, y estos puntos se acumulan para
      desbloquear recompensas especiales, como descuentos, artículos de viaje, o incluso paquetes de
      experiencias únicas.
    </p>

    <div class="button-container">
      <button class="floating-add-button" @click="handleAddDestination">
        <v-icon>mdi-plus</v-icon> Añadir Destino
      </button>
    </div>

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
              <v-card-title class="city-name">{{ destination.cityName }}</v-card-title>
              <v-card-subtitle class="subtitle"
                >Mejor estación: {{ destination.season }}</v-card-subtitle
              >
              <v-card-text class="details-text">
                <p><v-icon small>mdi-pound</v-icon> ID: {{ destination.id }}</p>
                <p><v-icon small>mdi-information-outline</v-icon> {{ destination.description }}</p>
                <p>
                  <v-icon small>mdi-star</v-icon> Popularidad:
                  {{ destination.isPopular ? 'Alta' : 'Normal' }}
                </p>
                <p><v-icon small>mdi-tag</v-icon> Categoría: {{ destination.category }}</p>
              </v-card-text>

              <v-card-actions class="actions-container">
                <v-btn icon color="#9aadff" @click="editDestination(destination.id)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="#f4978e" @click="openDeleteConfirmDialog(destination.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
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
  padding: 25px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
}

/* @media (max-width: 600px) {
  .container {
    padding: 15px;
  }
} */

.floating-add-button {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  font-size: 16px;
  padding: 10px 10px;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(154, 173, 255, 0.6);
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 30px;
}

.floating-add-button:hover {
  box-shadow: 0 8px 16px rgba(154, 173, 255, 0.3);
}

.section-title {
  font-size: 35px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
  color: #9aadff;
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
  padding-left: 30px;
}

.button-container {
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
  width: 90%;
}

.custom-card {
  background-color: #ffffff;
  border: 1px solid #be9ffe;
  color: rgb(74, 74, 74);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: 'Open Sans', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.city-name {
  color: #9aadff;
  font-weight: 700;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 25px;
}

.subtitle {
  color: #555;
  font-size: 0.9em;
  margin-bottom: 10px;
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

.pagination-container {
  margin-top: 80px;
  margin-bottom: 60px;
}

.success-alert {
  position: fixed;
  top: 70px;
  right: 20px;
  width: 300px;
  box-shadow: 0 4px 12px rgba(154, 173, 255, 0.6);
  z-index: 1000;
  background-color: #9aadff;
  color: white;
  font-weight: bold;
  font-size: 16px;
}
</style>
