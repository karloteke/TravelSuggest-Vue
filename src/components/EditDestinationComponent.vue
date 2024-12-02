<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'
import type { DestinationUpdate } from '@/core/destination'

const route = useRoute()
const router = useRouter()
const destinationStore = useDestinationStore()

const destinationId = Number(route.params.destinationId)

const successAlert = ref(false)

// Estado del usuario
const destination = ref<DestinationUpdate | null>(null)

// Estado para la nueva imagen
const imageBase64 = ref<string | null>(null)
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

// Validaciones
const rules = {
  required: (value: string) => !!value || 'Este campo es obligatorio.',
}

const cityNameRules = [rules.required]
const descriptionRules = [rules.required]

// Cargar el usuario al montar el componente
onMounted(async () => {
  let existingDestination = destinationStore.getDestinationById(destinationId)
  if (existingDestination) {
    destination.value = {
      cityName: existingDestination.cityName,
      description: existingDestination.description,
      season: existingDestination.season,
      isPopular: existingDestination.isPopular,
      category: existingDestination.category,
      imageBase64: existingDestination.imageBase64,
    }
  } else {
    existingDestination = await destinationStore.fetchDestinationById(destinationId) // Si no está en el store, obtenerlo del servidor
    if (existingDestination) {
      destination.value = {
        cityName: existingDestination.cityName,
        description: existingDestination.description,
        season: existingDestination.season,
        isPopular: existingDestination.isPopular,
        category: existingDestination.category,
        imageBase64: existingDestination.imageBase64,
      }
    } else {
      console.error('Destino no encontrado')
      router.push('/destinations')
    }
  }
})

// Función para enviar el formulario
const submitForm = async () => {
  if (destination.value) {
    const payload: DestinationUpdate = {
      // Preparar el payload para enviar
      cityName: destination.value.cityName,
      description: destination.value.description,
      season: destination.value.season,
      isPopular: destination.value.isPopular,
      category: destination.value.category,
      imageBase64: imageBase64.value,
    }

    await destinationStore.updateDestination(destinationId, payload) // Llamar a la función de actualización en el store

    successAlert.value = true // Mostrar la alerta de éxito

    setTimeout(() => {
      successAlert.value = false
      router.push('/destinations')
    }, 2000)
  }
}
</script>

<template>
  <div class="container-form" v-if="destination">
    <v-sheet class="mx-auto form-container" width="630">
      <h2 class="form-title">Editar Destino</h2>
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="destination.cityName"
          label="Nombre del destino"
          prepend-icon="mdi-card-account-details-outline"
          outlined
          dense
          required
          :rules="cityNameRules"
        ></v-text-field>

        <v-textarea
          v-model="destination.description"
          label="Descripción"
          prepend-icon="mdi-information-outline"
          outlined
          dense
          auto-grow
          required
          :rules="descriptionRules"
        ></v-textarea>

        <v-select
          v-model="destination.season"
          :items="['Verano', 'Primavera', 'Otoño', 'Invierno', 'Todas las estaciones']"
          label="Mejor estación"
          prepend-icon="mdi-weather-partly-cloudy"
          required
          outlined
        ></v-select>

        <v-checkbox
          v-model="destination.isPopular"
          label="¿Es popular?"
          prepend-icon="mdi-fire"
          class="popular-checkbox"
        ></v-checkbox>

        <v-select
          v-model="destination.category"
          :items="['Playa', 'Montaña', 'Ciudad', 'Aventura', 'Cultural', 'Gastronomía', 'Ocio']"
          label="Categoría"
          prepend-icon="mdi-tag-outline"
          required
          outlined
        ></v-select>

        <!-- Carga de Imagen -->
        <div class="image-upload">
          <v-btn @click="triggerFileInput" color="primary">
            <v-icon left>mdi-upload</v-icon> Cambiar Imagen
          </v-btn>

          <!-- Input de archivo oculto -->
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="onFileChange"
            style="display: none"
          />

          <!-- Mensaje de confirmación de imagen seleccionada -->
          <v-chip v-if="imageBase64" color="green" text-color="white" class="mt-2" outlined>
            <v-icon left>mdi-check-circle</v-icon> Imagen seleccionada
          </v-chip>
        </div>
        <v-btn class="submit-button" type="submit" block color="#05a4c8">
          Actualizar Destino
        </v-btn>
      </v-form>
    </v-sheet>
  </div>

  <v-alert v-model="successAlert" type="success" dismissible class="success-alert">
    Destino actualizado correctamente.
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
  font-size: 30px;
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

.image-upload {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 60px;
  cursor: pointer;
}

.success-alert {
  position: fixed;
  top: 85px;
  right: 20px;
  width: 300px;
  z-index: 1000;
}
</style>
