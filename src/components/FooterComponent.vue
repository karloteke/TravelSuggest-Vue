<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function navigateTo(route: string) {
    router.push({ name: route });
  }
</script>


<template>
  <v-footer class="footer">
    <v-row justify="center" no-gutters>
      <v-col cols="12" class="text-center mb-2">
        <img src="@/assets/logo.png" alt="Logo" style="max-height: 80px; margin-right: 12px;">
      </v-col>

      <!-- Enlaces de Navegación -->
      <v-col cols="12" class="text-center mb-4">
        <v-btn variant = "text" class="footer-link" @click="navigateTo('home')">Inicio</v-btn>
        <v-btn variant = "text" class="footer-link" @click="navigateTo('destinations')">Destinos</v-btn>
        <v-btn variant = "text" class="footer-link" @click="navigateTo('suggestions')">Experiencias</v-btn>
        <v-btn variant = "text" class="footer-link" @click="navigateTo('tips')">Consejos para un viaje responsable</v-btn>
      </v-col>

      <!-- Derechos Reservados -->
      <v-col cols="12" class="text-center mt-4">
        <span class="footer-copy">&copy; {{ new Date().getFullYear() }} TravelSuggest. Todos los derechos reservados.</span>
      </v-col>
    </v-row>
  </v-footer>
</template>



<style scoped>
  .footer {
    padding: 20px 0;
    color: white;
    text-align: center;
    background-color: rgb(40, 40, 40)
  }

  .footer-title {
    font-size: 1.5rem;
    font-weight: bold;
    font-family: Ro; 
  }

  .footer-link {
    color: white;
    font-weight: bold;
    margin: 0 10px;
  }

  .footer-link:hover {
    color: #05a4c8 
  }

  .footer-copy {
    font-size: 0.875rem;
    color: white;
  }
</style>
