<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <header class="flex-shrink-0">
      <HeaderComponent />
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <footer class="flex-shrink-0">
      <FooterComponent />
    </footer>
  </div>
</template>
