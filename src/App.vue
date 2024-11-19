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
body, html {
  margin: 0; 
  padding: 0; 
  overflow-x: hidden; 
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  box-sizing: border-box; 
}

header {
  flex: 0 0 auto; 
}

.main-content {
  flex: 1; 
  overflow: auto; 
}

footer {
  flex: 0 0 auto;
}

</style>
