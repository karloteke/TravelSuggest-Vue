<script setup lang="ts">
import { useSuggestionStore } from '@/stores/suggestionStore'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { format } from 'date-fns'

const { suggestions, deleteSuggestion } = useSuggestionStore()
const router = useRouter()
const pageSize = 6
const currentPage = ref(1)

const deleteConfirmDialog = ref(false) // Estado del modal de confirmación de eliminación
const suggestionToDelete = ref<number | null>(null) // ID del destino a eliminar

const handleAddSuggestion = () => {
  router.push('/add-suggestion')
}

const editSuggestion = (suggestionId: number) => {
  router.push(`/edit-suggestion/${suggestionId}`)
}

// Función para abrir el modal de confirmación de eliminación
const openDeleteConfirmDialog = (suggestionId: number) => {
  suggestionToDelete.value = suggestionId
  deleteConfirmDialog.value = true
}

// Función para confirmar e eliminar destino
const confirmDeleteSuggestion = async () => {
  console.log("confirmDeleteSuggestion called");
  if (suggestionToDelete.value !== null) {
    await deleteSuggestion(suggestionToDelete.value)
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

// Método para generar un array de estrellas basado en la puntuación
const getStars = (rating: number) => {
  const maxStars = 5
  return Array.from({ length: maxStars }, (_, index) => index < rating)
}
</script>

<template>
  <div class="container">
    <div class="secction-title-container">
      <h1 class="section-title">
        <strong>Experiencias compartidas por los viajeros de TravelSuggest</strong>
      </h1>
    </div>
    <p class="description">
      En TravelSuggest, cada experiencia cuenta y cada consejo de viaje suma. Si has visitado un
      lugar que te ha dejado sin palabras, ¡compártelo con nuestra comunidad! Publica tus
      recomendaciones y ayuda a otros viajeros a descubrir esos destinos únicos que tanto te gustan.
      ¿Tienes algún rincón especial, una ruta secreta o un consejo imprescindible? Tu experiencia
      puede ser la clave para que otros vivan una aventura inolvidable. Cada vez que creas una
      experiencia única y la compartes con nosotros, ganas puntos. Estos puntos se acumulan y te
      permiten desbloquear recompensas exclusivas: desde descuentos especiales y artículos de viaje
      hasta packs de experiencias. Únete a nuestra comunidad y convierte tus aventuras en recuerdos
      compartidos.
    </p>

    <div class="button-container">
      <button class="floating-add-button" @click="handleAddSuggestion">
        <v-icon>mdi-plus</v-icon> Añadir Experiencia
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
            v-for="suggestion in paginatedSuggestions"
            :key="suggestion.id"
          >
            <v-card class="mx-auto my-4 custom-card" outlined>
              <v-card-title class="title-suggestion">{{ suggestion.title }}</v-card-title>
              <v-card-subtitle class="subtitle"
                ><v-icon small>mdi-card-account-details-outline</v-icon>
                {{ suggestion.id }}</v-card-subtitle
              >
              <v-card-text class="details-text">
                <p class="mt-4"><v-icon small>mdi-information-outline</v-icon> {{ suggestion.description }}</p>
                <p class="mt-4">
                  <v-icon small>mdi-cash</v-icon>
                  {{ suggestion.price }} €
                </p>
                <p class="mt-4"><v-icon small>mdi-calendar</v-icon> {{ formatDate(suggestion.created_at) }}</p>

                <!-- Renderizar estrellas según la puntuación -->
                <p class="mt-4">
                  <span v-for="(isFilled, index) in getStars(suggestion.rating)" :key="index">
                    <v-icon small :class="isFilled ? 'star-filled' : 'star-empty'">
                      {{ isFilled ? 'mdi-star' : 'mdi-star-outline' }}
                    </v-icon>
                  </span>
                </p>

                <v-card-actions class="actions-container">
                <v-btn icon color="#9aadff" @click="editSuggestion(suggestion.id)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="#f4978e" @click="openDeleteConfirmDialog(suggestion.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
              </v-card-text>
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
      <v-card-text> ¿Estás seguro de que deseas eliminar esta experiencia? </v-card-text>
      <v-card-actions>
        <v-btn color="red" @click="confirmDeleteSuggestion">Sí, eliminar</v-btn>
        <v-btn color="blue-grey" @click="deleteConfirmDialog = false">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

.container{
  box-sizing: border-box;
  background-image: url('/src/assets/fondo.jpg');
  min-height: 100vh;
  padding: 25px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
}

.secction-title-container{
  text-align: center;
}

.section-title{
  font-size: 35px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
  color: #9aadff;
  margin-top: 85px;
  margin-bottom: 20px;
  text-align: center;
}

.floating-add-button {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  font-size: 20px;
  padding: 10px 10px;
  border-radius: 50px;
  box-shadow: 0 3px 10px #be9ffe;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 30px;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.floating-add-button:hover {
  box-shadow: 0 8px 16px rgba(154, 173, 255, 0.3);
}

.title-suggestion {
  color: #9aadff;
  font-weight: bold;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 35px;
  white-space: normal; /* Permite el ajuste en varias líneas */
  word-wrap: break-word;
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

.star-filled {
  color: #FFD700; 
}
.star-empty {
  color: #C0C0C0; 
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
</style>
