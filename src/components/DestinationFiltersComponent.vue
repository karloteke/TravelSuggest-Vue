<script setup lang="ts">
import { ref } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'
import type { DestinationQueryParameters } from '@/core/destination'

const destinationStore = useDestinationStore()
const emit = defineEmits(['no-results'])

// Opciones disponibles
const seasons = ['Verano', 'Primavera', 'Otoño', 'Invierno', 'Todas las estaciones']
const categories = ['Playa', 'Montaña', 'Ciudad', 'Aventura', 'Cultural', 'Gastronomía', 'Ocio']
const popularityOptions = [
  { title: 'Alta', value: true },
  { title: 'Normal', value: false },
]

// Estado de los filtros
const filters = ref<{
  cityName: string
  season?: string
  category?: string
  isPopular?: boolean | null
}>({
  cityName: '',
  season: undefined,
  category: undefined,
  isPopular: null,
})

const applyFilters = async () => {
  const appliedFilters: DestinationQueryParameters = {}

  // Verificar que cityName sea una cadena antes de llamar a trim
  if (typeof filters.value.cityName === 'string' && filters.value.cityName.trim() !== '') {
    appliedFilters.cityName = filters.value.cityName.trim()
  }
  if (filters.value.season) {
    appliedFilters.season = filters.value.season
  }
  if (filters.value.category) {
    appliedFilters.category = filters.value.category
  }
  if (typeof filters.value.isPopular === 'boolean') {
    appliedFilters.isPopular = filters.value.isPopular
  }

  const result = await destinationStore.fetchDestinations(appliedFilters)

  if (result === 'noResults') {
    emit('no-results')
  }
}
</script>

<template>
  <v-card class="pa-3 mb-3 filter-card">
    <h3 class="filter-title">Filtrar Destinos</h3>

    <v-form @submit.prevent="applyFilters">
      <v-row class="filter-row" justify="center" align="center">
        <v-col cols="12" sm="2" md="2" class="d-flex justify-center">
          <v-text-field
            v-model="filters.cityName"
            label="Nombre de destino"
            prepend-icon="mdi-city"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="2" md="2" class="d-flex justify-center">
          <v-select
            v-model="filters.season"
            :items="seasons"
            label="Estación"
            prepend-icon="mdi-weather-partly-cloudy"
            clearable
          ></v-select>
        </v-col>

        <v-col cols="12" sm="2" md="2" class="d-flex justify-center">
          <v-select
            v-model="filters.isPopular"
            :items="popularityOptions"
            item-title="title"
            item-value="value"
            label="Popularidad"
            prepend-icon="mdi-fire"
            clearable
          ></v-select>
        </v-col>

        <v-col cols="12" sm="2" md="2" class="d-flex justify-center">
          <v-select
            v-model="filters.category"
            :items="categories"
            label="Categoría"
            prepend-icon="mdi-tag-outline"
            clearable
          ></v-select>
        </v-col>

        <v-col cols="12" sm="2" md="2" class="filter-button-container">
          <v-btn color="#4a90e2" type="submit" class="filter-button">
            Filtrar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<style scoped>
.filter-card {
  background-color: #2b3c56;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #ffffff;
  width: 97%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 20px;
}

.filter-title {
  color: #4a90e2;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.filter-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap; /* Evita que los elementos se envuelvan en nuevas líneas */
}

.filter-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4px;
}

.filter-button {
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #05a4c8;
  transition:
    background 0.3s,
    box-shadow 0.3s;
  width: 100%; 
  max-width: 280px;
}

.filter-button:hover {
  background: linear-gradient(135deg, #0d6fe5, #05a4c8);
  box-shadow: 0 4px 12px rgba(5, 164, 200, 0.3);
}

.mb-3 {
  margin-bottom: 50px !important;
}

.v-text-field,
.v-select {
  min-width: 220px;
  max-width: 280px;
}
</style>
