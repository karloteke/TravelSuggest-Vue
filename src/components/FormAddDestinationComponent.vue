<script setup lang="ts">
import { ref } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'
import type { VForm } from 'vuetify/components'
import router from '@/router'

const formRef = ref<VForm | null>(null) // Referencia al formulario
const successAlert = ref(false)
const { addDestination } = useDestinationStore()


const destinationData = ref({
  cityName: '',
  description: '',
  season: '',
  isPopular: false,
  category: '',
})

// Variable para la imagen en Base64
const imageBase64 = ref<string | null>(null)

// Referencia al input de archivo
const fileInput = ref<HTMLInputElement | null>(null)

// Función para disparar el input de archivo
const triggerFileInput = () => {
  fileInput.value?.click()
}

// Manejo del cambio de archivo
const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona un archivo de imagen.')
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      imageBase64.value = reader.result as string
    }
    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error)
    }
  }
}

// Reglas de validación
const rules = {
  required: (value: string) => !!value || 'Este campo es obligatorio.',
}

const cityNameRules = [rules.required]
const descriptionRules = [rules.required]
const seasonRules = [rules.required]
const categoryRules = [rules.required]

const handleSubmit = async () => {
  const validationResult = formRef.value?.validate()

  // Validar el formulario y capturar el resultado
  const isValid =
    typeof validationResult === 'object' ? (await validationResult).valid : validationResult

  if (!isValid) {
    return
  }

  // Crear el nuevo destino
  const newDestination = {
    id: 0,
    cityName: destinationData.value.cityName,
    description: destinationData.value.description,
    season: destinationData.value.season,
    isPopular: destinationData.value.isPopular,
    category: destinationData.value.category,
    imageBase64: imageBase64.value,
  }

  await addDestination(newDestination)

  // Limpiar los campos después de agregar el destino
  destinationData.value = {
    cityName: '',
    description: '',
    season: '',
    isPopular: false,
    category: '',
  }

  // Resetear el formulario
  formRef.value?.reset()

  // Mostrar alerta de éxito
  successAlert.value = true

  // Mostrar alerta de éxito
  successAlert.value = true

  setTimeout(() => {
    successAlert.value = false
    router.push('/destinations').then(() => {
      location.reload() // Recarga
    })
  }, 2000)
}
</script>

<template>
  <div class="container-form">
    <v-sheet class="mx-auto form-container" width="450">
      <h2 class="form-title">Crear Nuevo Destino</h2>
      <v-form ref="formRef" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="destinationData.cityName"
          placeholder="Nombre de la ciudad"
          prepend-icon="mdi-city"
          required
          outlined
          :rules="cityNameRules"
        ></v-text-field>

        <v-textarea
          v-model="destinationData.description"
          placeholder="Descripción"
          prepend-icon="mdi-text-box-outline"
          required
          outlined
          rows="3"
          :rules="descriptionRules"
        ></v-textarea>

        <v-select
          v-model="destinationData.season"
          :items="['Verano', 'Primavera', 'Otoño', 'Invierno', 'Todas las estaciones']"
          label="Mejor estación"
          prepend-icon="mdi-weather-partly-cloudy"
          required
          outlined
          :rules="seasonRules"
        ></v-select>

        <v-select
          v-model="destinationData.category"
          :items="['Playa', 'Montaña', 'Ciudad', 'Aventura', 'Cultural', 'Gastronomía', 'Ocio']"
          label="Categoría"
          prepend-icon="mdi-tag-outline"
          required
          outlined
          :rules="categoryRules"
        ></v-select>

        <v-checkbox
          v-model="destinationData.isPopular"
          label="¿Es popular?"
          prepend-icon="mdi-fire"
          class="popular-checkbox"
        ></v-checkbox>

        <div class="image-upload-container">
          <v-icon
            color="primary"
            large
            class="clickable-icon"
            @click="triggerFileInput"
            aria-label="Subir Imagen"
          >
            mdi-camera-plus
          </v-icon>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            style="display: none"
            @change="onFileChange"
          />
        </div>

        <!-- Vista previa de la imagen -->
        <v-img
          v-if="imageBase64"
          :src="imageBase64"
          class="image-preview"
          max-height="200"
          contain
        ></v-img>

        <v-btn class="submit-button" type="submit" block color="#05a4c8">Crear Destino</v-btn>
      </v-form>
    </v-sheet>

    <!-- Alerta de éxito -->
    <v-alert v-model="successAlert" type="success" dismissible class="success-alert">
      Destino creado correctamente.
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

.image-upload-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
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
}

.popular-checkbox .v-input--selection-controls__input {
  font-size: 18px;
}
</style>
