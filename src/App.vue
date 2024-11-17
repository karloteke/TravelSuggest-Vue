<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
</script>

<template>
 <v-app class="app-layout">
    <header>
      <HeaderComponent></HeaderComponent>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <footer>
      <FooterComponent></FooterComponent>
    </footer>
  </v-app>
</template>

<style scoped>
/* Configuración de Flexbox para mantener el footer en la parte inferior */
.app-layout {
  min-height: 100vh;
  box-sizing: border-box; 
}

.main-content {
  flex: 1; /* Permite que el contenido principal ocupe el espacio disponible */
}

body {
  overflow-x: hidden;
  padding: 0px;
  margin: 0px;
}


</style>
