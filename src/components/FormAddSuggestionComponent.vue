<script setup lang="ts">
import { ref } from 'vue'
import { useSuggestionStore } from '@/stores/suggestionStore'

const showModal = ref(false)
const successAlert = ref(false)
const { addSuggestion } = useSuggestionStore()

const suggestionData = ref({
  title: '',
  description: '',
  price: '',
  rating: '',
})

const userId = ref('');
const destinationId = ref('');

const handleSubmit = async () => {
  if (
    !suggestionData.value.title ||
    !suggestionData.value.description ||
    !suggestionData.value.price ||
    !suggestionData.value.rating ||
    !userId.value ||
    !destinationId.value
  ) {
    showModal.value = true
    return
  }

  // Crear objeto de sugerencia
  const newSuggestion = {
    id: 0,
    title: suggestionData.value.title,
    description: suggestionData.value.description,
    price: Number(suggestionData.value.price),
    rating: Number(suggestionData.value.rating),
    created_at: '',
    userId: Number(userId.value),
  }

  await addSuggestion(newSuggestion, Number(destinationId.value))
  
  // Limpiar los campos
  suggestionData.value = {
    title: '',
    description: '',
    price: '',
    rating: '',
  }
  userId.value = ''; 
  destinationId.value = '';

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
      <h2 class="form-title">Crear Nueva Experiencia</h2>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="suggestionData.title"
          placeholder="Título"
          prepend-icon="mdi-pencil"
          required
          outlined
        ></v-text-field>

        <v-textarea
          v-model="suggestionData.description"
          placeholder="Descripción"
          prepend-icon="mdi-text-box-outline"
          required
          outlined
          rows="3"
        ></v-textarea>

        <v-text-field
          v-model="suggestionData.price"
          label="Precio"
          prepend-icon="mdi-currency-eur"
          placeholder="Ej: 23.45"
          required
          outlined
        ></v-text-field>

        <v-select
          v-model="suggestionData.rating"
          :items="['1', '2', '3', '4', '5']"
          label="Valoración"
          prepend-icon="mdi-star-outline"
          required
          outlined
          class="select-rating"
        ></v-select>

        <v-text-field
          v-model="destinationId"
          placeholder="ID del Destino"
          prepend-icon="mdi-map-marker"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="userId"
          placeholder="ID del Usuario"
          prepend-icon="mdi-account"
          required
          outlined
        ></v-text-field>

        <v-btn class="submit-btn" type="submit" block color="#9aadff">Crear Sugerencia</v-btn>
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
      Sugerencia creada correctamente.
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
  color: #9aadff; 
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Open Sans', sans-serif;
}

.form-container {
  padding: 30px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 6px 18px rgba(90, 103, 216, 0.3);
}

.submit-btn {
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
  color: white;
}

.success-alert {
  position: fixed;
  top: 70px;
  right: 20px;
  width: 300px;
  z-index: 1000;
  color: white;
  font-weight: bold;
  font-size: 16px; 
}

</style>
