<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSuggestionStore } from '@/stores/suggestionStore'
import { useDestinationStore } from '@/stores/destinationStore'
import { useRoute, useRouter } from 'vue-router'
import type { VForm } from 'vuetify/components'

const formRef = ref<VForm | null>(null)
const successAlert = ref(false)

const suggestionStore = useSuggestionStore()
const destinationStore = useDestinationStore()

const { addSuggestion } = suggestionStore
const { fetchDestinationById } = destinationStore

const route = useRoute()
const router = useRouter()

// Obtener destinationId de los parámetros de la ruta
const destinationId = ref<number | null>(null)
if (route.params.destinationId) {
  destinationId.value = Number(route.params.destinationId)
} else {
  console.error('destinationId no proporcionado en los parámetros de la ruta')
  router.push('/destinations')
}

// Obtener el nombre del destino
const destinationName = ref('')

// Cargar el nombre del destino al montar el componente
onMounted(async () => {
  if (destinationId.value !== null) {
    try {
      const destination = await fetchDestinationById(destinationId.value)
      destinationName.value = destination?.cityName || 'Destino desconocido'
    } catch (error) {
      console.error('Error al obtener el destino:', error)
      destinationName.value = 'Destino desconocido'
    }
  }
})

const suggestionData = ref({
  title: '',
  description: '',
  price: '',
  rating: '',
})

// Reglas de validación
const rules = {
  required: (value: string) => !!value || 'Este campo es obligatorio.',
  numeric: (value: string) => !isNaN(Number(value)) || 'Este campo debe ser numérico.',
  minValue: (min: number) => (value: string) =>
    Number(value) >= min || `El valor debe ser mayor o igual a ${min}.`,
  maxValue: (max: number) => (value: string) =>
    Number(value) <= max || `El valor debe ser menor o igual a ${max}.`,
}

const titleRules = [rules.required]
const descriptionRules = [rules.required]
const priceRules = [rules.required, rules.numeric, rules.minValue(0)]
const ratingRules = [rules.required, rules.numeric, rules.minValue(1), rules.maxValue(5)]

const handleSubmit = async () => {
  const validationResult = formRef.value?.validate()

  // Validar el formulario y capturar el resultado
  const isValid =
    typeof validationResult === 'object' ? (await validationResult).valid : validationResult

  if (!isValid) {
    return
  }

  // Crear objeto de sugerencia
  const newSuggestion = {
    title: suggestionData.value.title,
    description: suggestionData.value.description,
    price: Number(suggestionData.value.price),
    rating: Number(suggestionData.value.rating),
  }

  if (!destinationId.value) {
    console.error('destinationId es inválido o no está definido')
    return
  }

  await addSuggestion(newSuggestion, Number(destinationId.value))

  // Limpiar los campos
  suggestionData.value = {
    title: '',
    description: '',
    price: '',
    rating: '',
  }

  // Resetear el formulario
  formRef.value?.reset()

  // Mostrar alerta de éxito
  successAlert.value = true

  // Mostrar alerta de éxito
  successAlert.value = true
  
  setTimeout(() => {
    successAlert.value = false
    window.location.href = '/suggestions'
  }, 2000)
}
</script>

<template>
  <div class="container-form">
    <v-sheet class="mx-auto form-container" width="450">
      <h2 class="form-title">Crear nueva experiencia para {{ destinationName }}</h2>
      <v-form ref="formRef" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="suggestionData.title"
          placeholder="Título"
          prepend-icon="mdi-pencil"
          required
          outlined
          :rules="titleRules"
        ></v-text-field>

        <v-textarea
          v-model="suggestionData.description"
          placeholder="Descripción"
          prepend-icon="mdi-text-box-outline"
          required
          outlined
          rows="3"
          :rules="descriptionRules"
        ></v-textarea>

        <v-text-field
          v-model="suggestionData.price"
          label="Precio"
          prepend-icon="mdi-currency-eur"
          placeholder="Ej: 23.45"
          required
          outlined
          :rules="priceRules"
        ></v-text-field>

        <v-select
          v-model="suggestionData.rating"
          :items="['1', '2', '3', '4', '5']"
          label="Valoración"
          prepend-icon="mdi-star-outline"
          required
          outlined
          class="select-rating"
          :rules="ratingRules"
        ></v-select>

        <v-btn class="submit-button" type="submit" block color="#05a4c8">Crear Experiencia</v-btn>
      </v-form>
    </v-sheet>

    <!-- Alerta de éxito -->
    <v-alert v-model="successAlert" type="success" dismissible class="success-alert">
      Experiencia creada correctamente.
    </v-alert>
  </div>
</template>

<style scoped>
.container-form {
  padding: 40px;
  margin-top: 80px;
  display: flex;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
}

.form-title {
  font-size: 30px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
  color: #4a90e2;
  text-align: center;
  margin-bottom: 20px;
}

.form-container {
  padding: 30px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 6px 18px rgba(90, 103, 216, 0.3);
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

.image-upload-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 50px;
  cursor: pointer;
}

.clickable-icon {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  font-size: 35px;
}

.clickable-icon:hover {
  transform: scale(1.2);
}

.image-upload-text {
  margin-left: 10px;
  color: #4a90e2;
  font-weight: bold;
  font-size: 16px;
}

.image-preview {
  margin-bottom: 40px;
  border-radius: 8px;
}

.success-alert {
  position: fixed;
  top: 85px;
  right: 20px;
  width: 300px;
  z-index: 1000;
}
</style>
