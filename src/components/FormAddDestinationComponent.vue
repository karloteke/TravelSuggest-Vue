<script setup lang="ts">
import { ref } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'
import type { VForm } from 'vuetify/components'
import router from '@/router';

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

const userId = ref('')

// Reglas de validación
const rules = {
  required: (value: string) => !!value || 'Este campo es obligatorio.',
}

const cityNameRules = [rules.required]
const descriptionRules = [rules.required]
const seasonRules = [rules.required]
const categoryRules = [rules.required]
const userIdRules = [rules.required]

const handleSubmit = async () => {
  const validationResult = formRef.value?.validate()

  // Validar el formulario y capturar el resultado
  const isValid = typeof validationResult === 'object' ? (await validationResult).valid : validationResult
  
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

  // Resetear el formulario 
  formRef.value?.reset();

  // Mostrar alerta de éxito
  successAlert.value = true;

  // Mostrar alerta de éxito
  successAlert.value = true
  setTimeout(() => {
    successAlert.value = false
    router.push("/destinations")
  }, 3000)
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

        <v-text-field
          v-model="userId"
          placeholder="ID del Usuario"
          prepend-icon="mdi-account"
          required
          outlined
          :rules="userIdRules"
        ></v-text-field>

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
