<script setup lang="ts">
import { ref } from 'vue'
import { useSuggestionStore } from '@/stores/suggestionStore'
import type { SuggestionQueryParameters } from '@/core/suggestion'

const suggestionStore = useSuggestionStore()
const emit = defineEmits(['no-results'])

// Opciones de filtros
const ratings = [1, 2, 3, 4, 5] // Puntuación de 1 a 5
const priceRange = ref<{ min: number | null; max: number | null }>({ min: null, max: null })
const filters = ref<{
  rating?: number
  minPrice?: number | null
  maxPrice?: number | null
}>({
  rating: undefined,
  minPrice: null,
  maxPrice: null,
})

const applyFilters = async () => {
  const appliedFilters: SuggestionQueryParameters = {}


  if (filters.value.minPrice !== null) {
    appliedFilters.minPrice = filters.value.minPrice
  }
  if (filters.value.maxPrice !== null) {
    appliedFilters.maxPrice = filters.value.maxPrice
  }
  if (filters.value.rating) {
    appliedFilters.rating = filters.value.rating
  }

  const result = await suggestionStore.fetchSuggestions(appliedFilters)

  if (result === 'noResults') {
    emit('no-results')
  }
}
</script>

<template>
  <v-card class="pa-3 mb-3 filter-card">
    <h3 class="filter-title">Filtrar Sugerencias</h3>

    <v-form @submit.prevent="applyFilters">
      <v-row class="filter-row" justify="center" align="center">

        <v-col cols="12" sm="2" md="2" class="d-flex justify-center">
          <v-text-field
            v-model="filters.minPrice"
            :items= "priceRange"
            label="Precio Mínimo"
            type="number"
            prepend-icon="mdi-currency-eur"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2" md="2" class="d-flex justify-center">
          <v-text-field
            v-model="filters.maxPrice"
            :items= "priceRange"
            label="Precio Máximo"
            type="number"
            prepend-icon="mdi-currency-eur"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="2" md="2" class="d-flex justify-center">
          <v-select
            v-model="filters.rating"
            :items="ratings"
            label="Puntuación"
            prepend-icon="mdi-star"
            clearable
          ></v-select>
        </v-col>

        <!-- Botón para aplicar filtros -->
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
  gap: 70px;
  flex-wrap: wrap;
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
