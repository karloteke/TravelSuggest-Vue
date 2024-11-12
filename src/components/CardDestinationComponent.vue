<script setup lang="ts">
  import { useDestinationStore } from '@/stores/destinationStore'; 
  import { useRouter } from 'vue-router';
  import { ref, computed } from 'vue';

  const { destinations } = useDestinationStore();
  const router = useRouter();
  const pageSize = 5;
  const currentPage = ref(1);

  const handleAddDestination = () => {
    router.push('/add-destination');
  };

  const totalPages = computed(() => Math.ceil(destinations.length / pageSize));

  const paginatedDestinations = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return destinations.slice(startIndex, endIndex);
  });

  const changePage = (page: number) => {
    currentPage.value = page;
  };
</script>

<template>
  <div class="container">
    <h1 class="section-title">Lista de Destinos</h1>
    
    <div class="button-container">
      <v-btn @click="handleAddDestination" color="#ffb4f3">
        <v-icon left>mdi-plus</v-icon> Añadir Destino
      </v-btn>
    </div>

    <div class="card-container">
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="destination in paginatedDestinations" :key="destination.id">
          <v-card class="mx-auto my-4 custom-card" outlined>
            <div class="card-content">
              <v-card-title class="city-name">{{ destination.cityName }}</v-card-title>
              <v-card-subtitle class="subtitle">Mejor estación: {{ destination.season }}</v-card-subtitle>
              
              <v-card-text class="details-text">
                <p><strong>ID:</strong> {{ destination.id }}</p>
                <p><strong>Descripción:</strong> {{ destination.description }}</p>
                <p><strong>¿Es popular?:</strong> {{ destination.isPopular ? 'Sí' : 'No' }}</p>
                <p><strong>Categoría:</strong> {{ destination.category }}</p>
              </v-card-text>
            </div>

            <v-card-actions class="actions-container">
              <v-btn icon color="#ffb4f3" @click="addSuggestion(destination.id)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn icon color="#9aadff" @click="editDestination(destination.id)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="#f4978e" @click="deleteDestination(destination.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div class="pagination-container">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        @input="changePage"
      ></v-pagination>
    </div>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background-image: url('/src/assets/fondo.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .section-title {
    font-size: 35px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: bold;
    color: #9aadff;
    margin-top: 85px;
    margin-bottom: 20px;
    text-align: center;
  }

  .button-container {
    margin-bottom: 20px;
  }

  .custom-card {
    background-color: #ffffff;
    border: 1px solid #be9ffe;
    color: rgb(74, 74, 74);
    border-radius: 8px;
    min-height: 350px;
    max-height: 350px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    font-family: 'Open Sans', sans-serif;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .city-name {
    color: #9aadff;
    font-weight: 700;
  }

  .subtitle {
    color: #555;
    font-size: 0.9em;
    margin-bottom: 10px;
  }

  .details-text p {
    margin: 5px 0;
    color: #333;
    font-size: 0.95em;
  }

  .actions-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .card-container {
    width: 100%;
    max-width: 1200px;
  }

  .pagination-container {
    margin-top: 80px;
    margin-bottom: 60px;
  }
</style>
