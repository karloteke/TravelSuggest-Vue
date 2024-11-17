<script setup lang="ts">
import { ref } from 'vue';
import { useDestinationStore } from '@/stores/destinationStore';

const showModal = ref(false);
const successAlert = ref(false);
const { addDestination } = useDestinationStore(); 

const destinationData = ref({
  cityName: '',
  description: '',
  season: '',
  isPopular: false,
  category: '',
});

let userId = ''; // Campo para el ID del usuario

const handleSubmit = async () => {
  if (!destinationData.value.cityName || !destinationData.value.description || !destinationData.value.season || 
      !destinationData.value.category || !userId)
   {
    showModal.value = true; 
    return; 
  }

  // Crea el objeto de destino 
  const newDestination = {
    id: 0,
    cityName: destinationData.value.cityName,
    description: destinationData.value.description,
    season: destinationData.value.season,
    isPopular: destinationData.value.isPopular,
    category: destinationData.value.category,
    userId: Number(userId),
  };

  await addDestination(newDestination, Number(userId));

  // Limpiar los campos después de agregar el destino
  destinationData.value = {
    cityName: '',
    description: '',
    season: '',
    isPopular: false,
    category: '',
  };
  userId = ''; // Limpia el userId

  // Muestra el alerta de éxito
  successAlert.value = true;
  setTimeout(() => {
    successAlert.value = false;
  }, 2000);
};
</script>

<template>
  <div class="container-form">
    <v-sheet class="mx-auto form-container" width="400">
      <h2 class="form-title">Crear nuevo destino</h2>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="destinationData.cityName"
          placeholder="Nombre de la ciudad"
          required
        ></v-text-field>
        <v-textarea
          v-model="destinationData.description"
          placeholder="Descripción"
          required
        ></v-textarea>
        <v-select
          v-model="destinationData.season"
          :items="['Verano', 'Primavera', 'Otoño', 'Invierno', 'Todas las estaciones del año']"
          label="Mejor estación del año"
          required
        ></v-select>
        <v-select
          v-model="destinationData.category"
          :items="['Playa', 'Montaña', 'Ciudad', 'Aventura', 'Cultural', 'Gastronomía', 'Ocio']"
          label="Categoría"
          required
        ></v-select>
        <v-checkbox
          v-model="destinationData.isPopular"
          label="¿Es popular?"
        ></v-checkbox>
        <v-text-field
          v-model="userId"
          placeholder="ID del Usuario"
          required
        ></v-text-field>

        <v-btn class="mt-2" type="submit" block color="#9aadff"
          >Crear Destino</v-btn
        >
      </v-form>
    </v-sheet>

    <!-- Pop-Up Modal para mensaje de campos incompletos -->
    <v-dialog v-model="showModal" max-width="290">
      <v-card>
        <v-card-title class="headline">Campos incompletos</v-card-title>
        <v-card-text>Por favor, complete todos los campos.</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="showModal = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <!-- v-alert para mensaje de éxito -->
    <v-alert v-model="successAlert" type="success" dismissible class="success-alert">
      Destino creado correctamente.
    </v-alert>
  </div>
</template>

<style scoped>
.form-title{
  font-size: 24px;
  font-weight: bold;
  color: #9aadff;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Open Sans', sans-serif;
}

.container-form {
  padding: 40px;
  margin-top: 80px;
  display: flex;
  justify-content: center;
}

.form-container {
  padding: 30px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
