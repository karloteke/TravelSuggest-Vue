<template>
  <!-- Barra de navegación con fondo blanco -->
  <v-app-bar app color="white" light>
    <!-- Logo y Título a la izquierda -->
    <v-toolbar-title class="d-flex align-center">
      <img src="@/assets/logo.png" alt="Logo" style="max-height: 80px; margin-right: 12px;">
      <!-- <span class="font-weight-bold" :style="{ color: '#9aadff' }">TravelSuggest</span> -->
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Botones de Navegación para Destinos y Sugerencias con texto azul suave y fondo blanco -->
    <v-btn
      variant="text"
      class="mx-2"
      :style="{ color: '#9aadff' }"
      @click="navigateTo('destinos')"
    >
      Destinos
    </v-btn>
    <v-btn
      variant="text"
      class="mx-2"
      :style="{ color: '#9aadff' }"
      @click="navigateTo('sugerencias')"
    >
      Sugerencias
    </v-btn>

    <v-btn
      variant="text"
      class="mx-2"
      :style="{ color: '#9aadff' }"
      @click="navigateTo('sugerencias')"
    >
      Consejos para un Viaje Responsable
    </v-btn>

    <!-- Botón de Login a la derecha con fondo azul suave y texto blanco -->
    <v-btn
      :style="{ backgroundColor: '#9aadff', color: 'white' }"
      @click="login"
      class="mx-2"
      rounded
    >
      Login
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateTo(route: string) {
  router.push({ name: route });
}

function login() {
  console.log("Login clicked");
}
</script>

<style scoped>
.v-toolbar-title {
  display: flex;
  align-items: center;
}

.v-btn:hover {
  background-color: #fcdaf6; /* Color lila suave al hacer hover */
}

.v-btn[variant="text"] {
  color: #9aadff;
}
</style>
