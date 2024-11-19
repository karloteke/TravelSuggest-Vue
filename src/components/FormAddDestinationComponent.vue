<script setup lang="ts">
import { ref } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'

const showModal = ref(false)
const successAlert = ref(false)
const { addDestination } = useDestinationStore()

const destinationData = ref({
  cityName: '',
  description: '',
  season: '',
  isPopular: false,
  category: '',
})

const userId = ref('')

const handleSubmit = async () => {
  if (
    !destinationData.value.cityName ||
    !destinationData.value.description ||
    !destinationData.value.season ||
    !destinationData.value.category ||
    !userId.value
  ) {
    showModal.value = true
    return
  }

  // Crear objeto de destino
  const newDestination = {
    id: 0,
    cityName: destinationData.value.cityName,
    description: destinationData.value.description,
    season: destinationData.value.season,
    isPopular: destinationData.value.isPopular,
    category: destinationData.value.category,
    userId: Number(userId.value),
  }

  await addDestination(newDestination, Number(userId.value))

  // Limpiar los campos después de agregar el destino
  destinationData.value = {
    cityName: '',
    description: '',
    season: '',
    isPopular: false,
    category: '',
  }
  userId.value = ''

  // Mostrar alerta de éxito
  successAlert.value = true
  setTimeout(() => {
    successAlert.value = false
  }, 2000)
}
</script>

<template>
  <div class="container-form">
    <v-sheet class="mx-auto form-container" width="450">
      <h2 class="form-title">Crear Nuevo Destino</h2>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="destinationData.cityName"
          placeholder="Nombre de la ciudad"
          prepend-icon="mdi-city"
          required
          outlined
        ></v-text-field>

        <v-textarea
          v-model="destinationData.description"
          placeholder="Descripción"
          prepend-icon="mdi-text-box-outline"
          required
          outlined
          rows="3"
        ></v-textarea>

        <v-select
          v-model="destinationData.season"
          :items="['Verano', 'Primavera', 'Otoño', 'Invierno', 'Todas las estaciones']"
          label="Mejor estación"
          prepend-icon="mdi-weather-partly-cloudy"
          required
          outlined
        ></v-select>

        <v-select
          v-model="destinationData.category"
          :items="['Playa', 'Montaña', 'Ciudad', 'Aventura', 'Cultural', 'Gastronomía', 'Ocio']"
          label="Categoría"
          prepend-icon="mdi-tag-outline"
          required
          outlined
        ></v-select>

        <v-checkbox
          v-model="destinationData.isPopular"
          label="¿Es popular?"
          prepend-icon="mdi-heart-outline"
          class="popular-checkbox"
        ></v-checkbox>

        <v-text-field
          v-model="userId"
          placeholder="ID del Usuario"
          prepend-icon="mdi-account"
          required
          outlined
        ></v-text-field>

        <v-btn class="submit-button" type="submit" block color="#05a4c8">Crear Destino</v-btn>
      </v-form>
    </v-sheet>

    <!-- Modal de alerta de campos incompletos -->
    <v-dialog v-model="showModal" max-width="290">
      <v-card>
        <v-card-title class="headline">Campos incompletos</v-card-title>
        <v-card-text>Por favor, complete todos los campos.</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="showModal = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  font-size: 26px;
  font-weight: bold;
  color:#4a90e2; 
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
  transition: background 0.3s, box-shadow 0.3s;
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

.popular-checkbox .v-input--selection-controls__input {
  font-size: 18px;
}
</style>
