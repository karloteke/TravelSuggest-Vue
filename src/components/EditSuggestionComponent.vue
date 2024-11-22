<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useSuggestionStore } from '@/stores/suggestionStore'
import type { SuggestionUpdate } from '@/core/suggestion'
import type { VForm } from 'vuetify/components'

const route = useRoute()
const router = useRouter()
const suggestionStore = useSuggestionStore()
const suggestionId = Number(route.params.suggestionId)
const successAlert = ref(false)
const formRef = ref<VForm | null>(null)

// Estado de la sugerencia
const suggestion = ref<SuggestionUpdate | null>(null)

// Validaciones
const rules = {
    required: (value: unknown) => value !== null && value !== undefined && value !== '' || 'Este campo es obligatorio.',
  numeric: (value: string) => !isNaN(Number(value)) || 'Este campo debe ser numérico.',
  minValue: (min: number) => (value: string) => Number(value) >= min || `El valor debe ser mayor o igual a ${min}.`,
  maxValue: (max: number) => (value: string) => Number(value) <= max || `El valor debe ser menor o igual a ${max}.`,
}

const titleRules = [rules.required]
const descriptionRules = [rules.required]
const priceRules = [rules.required, rules.numeric, rules.minValue(0)]
const ratingRules = [rules.required, rules.numeric, rules.minValue(1), rules.maxValue(5)]

// Cargar la sugerencia al montar el componente
onMounted(async () => {
  let existingSuggestion = suggestionStore.getSuggestionById(suggestionId)
  if (existingSuggestion) {
    suggestion.value = {
      title: existingSuggestion.title,
      description: existingSuggestion.description,
      price: existingSuggestion.price,
      rating: existingSuggestion.rating,
    }
  } else {
    existingSuggestion = await suggestionStore.fetchSuggestionById(suggestionId)
    if (existingSuggestion) {
      suggestion.value = {
        title: existingSuggestion.title,
        description: existingSuggestion.description,
        price: existingSuggestion.price,
        rating: existingSuggestion.rating,
      }
    } else {
      console.error('Sugerencia no encontrada')
      router.push('/suggestions')
    }
  }
})

// Función para enviar el formulario
const submitForm = async () => {
  const validationResult = formRef.value?.validate()

  const isValid = typeof validationResult === 'object' ? (await validationResult).valid : validationResult

  if (!isValid) {
    return
  }

  if (suggestion.value) {
    const payload: SuggestionUpdate = {
      title: suggestion.value.title,
      description: suggestion.value.description,
      price: suggestion.value.price,
      rating: suggestion.value.rating,
    }

    await suggestionStore.updateSuggestion(suggestionId, payload)
    successAlert.value = true

    setTimeout(() => {
      successAlert.value = false
      router.push('/suggestions')
    }, 3000)
  }
}
</script>

<template>
    <div class="container-form" v-if="suggestion">
      <v-sheet class="mx-auto form-container" width="630">
        <h2 class="form-title">Editar Sugerencia</h2>
        <v-form ref="formRef" @submit.prevent="submitForm">
          <v-text-field
            v-model="suggestion.title"
            label="Título"
            prepend-icon="mdi-pencil"
            outlined
            dense
            required
            :rules="titleRules"
          ></v-text-field>
  
          <v-textarea
            v-model="suggestion.description"
            label="Descripción"
            prepend-icon="mdi-text-box-outline"
            outlined
            dense
            auto-grow
            required
            :rules="descriptionRules"
          ></v-textarea>
  
          <v-text-field
            v-model="suggestion.price"
            label="Precio"
            prepend-icon="mdi-currency-eur"
            outlined
            dense
            required
            :rules="priceRules"
          ></v-text-field>
  
          <v-select
            v-model="suggestion.rating"
            :items="[1, 2, 3, 4, 5]"
            label="Valoración"
            prepend-icon="mdi-star-outline"
            outlined
            dense
            required
            :rules="ratingRules"
          ></v-select>
  
          <v-btn class="submit-button" type="submit" block color="#05a4c8">
            Actualizar experiencia
          </v-btn>
        </v-form>
      </v-sheet>
    </div>
  
    <v-alert v-model="successAlert" type="success" dismissible class="success-alert">
      Experiencia actualizada correctamente.
    </v-alert>
  </template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

.container-form {
  padding: 40px;
  margin-top: 80px;
  display: flex;
  justify-content: center;
}

.form-container {
  padding: 30px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 6px 18px rgba(13, 111, 229, 0.2);
}

.form-title {
  font-size: 26px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  color: #4a90e2;
  text-align: center;
  margin-bottom: 20px;
}

.submit-button {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #05a4c8;
  transition:
    background 0.3s,
    box-shadow 0.3s;
}

.submit-button:hover {
  background: linear-gradient(135deg, #0d6fe5, #05a4c8);
  box-shadow: 0 4px 12px rgba(5, 164, 200, 0.3);
}

.success-alert {
  position: fixed;
  top: 85px;
  right: 20px;
  width: 300px;
  z-index: 1000;
  background-color: #00e194;
  color: white;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 225, 148, 0.4);
}
</style>


  