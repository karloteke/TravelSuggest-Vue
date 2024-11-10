<template>
  <v-footer color="#9aadff" class="footer">
    <v-row justify="center" no-gutters>
      <!-- Logo y Nombre de la Página -->
      <v-col cols="12" class="text-center mb-2">
        <v-img src="@/assets/logo.png" max-height="40" contain class="mb-2"></v-img>
        <span class="footer-title">TravelSuggest</span>
      </v-col>

      <!-- Enlaces de Navegación -->
      <v-col cols="12" class="text-center mb-4">
        <v-btn variant = "text" class="footer-link" @click="navigateTo('destinos')">Destinos</v-btn>
        <v-btn variant = "text" class="footer-link" @click="navigateTo('sugerencias')">Sugerencias</v-btn>
        <v-btn variant = "text" class="footer-link" @click="navigateTo('contacto')">Consejos para un Viaje Responsable</v-btn>
      </v-col>

      <!-- Derechos Reservados -->
      <v-col cols="12" class="text-center mt-4">
        <span class="footer-copy">&copy; {{ new Date().getFullYear() }} TravelSuggest. Todos los derechos reservados.</span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateTo(route: string) {
  router.push({ name: route });
}

</script>

<style scoped>
.footer {
  padding: 20px 0;
  color: white;
  text-align: center;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffb4f3; /* Color rosa */
}

.footer-link {
  color: white;
  font-weight: bold;
  margin: 0 10px;
}

.footer-link:hover {
  color: #ffb4f3; /* Color rosa en hover */
}

.footer-icon {
  color: white;
  cursor: pointer;
  transition: color 0.3s;
}

.footer-icon:hover {
  color: #ffb4f3; /* Color rosa en hover */
}

.footer-copy {
  font-size: 0.875rem;
  color: white;
}
</style>
