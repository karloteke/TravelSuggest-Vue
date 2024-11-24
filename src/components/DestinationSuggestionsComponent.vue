<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSuggestionStore } from '@/stores/suggestionStore'
import { useDestinationStore } from '@/stores/destinationStore' // Importamos el destinationStore
import type { Suggestion } from '@/core/suggestion'
import type { Destination } from '@/core/destination'
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter()
const destinationId = Number(route.params.id) // Obtenemos el ID del destino desde la ruta
const { fetchSuggestionsByDestinationId } = useSuggestionStore()
const { fetchDestinationById } = useDestinationStore() // Obtenemos la función para obtener el destino

const suggestions = ref<Suggestion[]>([])
const destination = ref<Destination | null | undefined>(null)
const dataLoaded = ref(false)

const formatDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy')
}

// Método para generar un array de estrellas basado en la puntuación
const getStars = (rating: number) => {
  const maxStars = 5
  return Array.from({ length: maxStars }, (_, index) => index < rating)
}

onMounted(async () => {
  suggestions.value = await fetchSuggestionsByDestinationId(destinationId)
  destination.value = await fetchDestinationById(destinationId) // Obtenemos el destino
  dataLoaded.value = true // Los datos han sido cargados

  if (suggestions.value.length === 0) {
    setTimeout(() => {
      router.push('/destinations')
    }, 3000)
  }
})
</script>

<template>
  <div class="container">
    <h1 class="section-title">
      Experiencias en
      <span v-if="destination">{{ destination.cityName }}</span>
    </h1>

    <v-alert
      v-if="dataLoaded && suggestions.length === 0"
      type="info"
      elevation="2"
      class="no-experiences-alert"
    >
      No hay experiencias para este destino.
    </v-alert>

    <div class="card-container" v-else>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            md="6"
            lg="4"
            class="pa-4"
            v-for="suggestion in suggestions"
            :key="suggestion.id"
          >
            <v-card class="mx-auto my-4 custom-card" outlined>
              <v-card-title class="title-suggestion">{{ suggestion.title }}</v-card-title>
              <v-card-subtitle class="subtitle"
                ><v-icon small>mdi-account</v-icon> {{ suggestion.id }}</v-card-subtitle
              >
              <v-card-text class="details-text">
                <p class="mt-4">
                  <v-icon small>mdi-text-box-outline</v-icon> {{ suggestion.description }}
                </p>
                <p class="mt-4">
                  <v-icon small>mdi-currency-eur</v-icon>
                  {{ suggestion.price }}
                </p>
                <p class="mt-4">
                  <v-icon small>mdi-calendar</v-icon> {{ formatDate(suggestion.created_at) }}
                </p>

                <!-- Renderizar estrellas según la puntuación -->
                <p class="mt-4">
                  <span v-for="(isFilled, index) in getStars(suggestion.rating)" :key="index">
                    <v-icon small :class="isFilled ? 'star-filled' : 'star-empty'">
                      {{ isFilled ? 'mdi-star' : 'mdi-star-outline' }}
                    </v-icon>
                  </span>
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
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

.secction-title-container {
  text-align: center;
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

.title-suggestion {
  color: #62bff6;
  font-weight: bold;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 28px;
  white-space: normal;
  word-wrap: break-word;
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
  color: #ffd700; /* Estrellas rellenas en amarillo */
}

.star-empty {
  color: #c0c0c0; /* Estrellas vacías en gris claro */
}

.no-experiences-alert {
  position: fixed;
  top: 85px;
  right: 20px;
  width: 300px;
  z-index: 1000;
}
</style>
