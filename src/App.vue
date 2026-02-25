<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const fullBleedPages = ['home', 'tips']
const isFullBleed = computed(() => fullBleedPages.includes(route.name as string))
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <header class="shrink-0">
      <HeaderComponent />
    </header>

    <main class="flex-1" :class="!isFullBleed ? 'pt-20' : ''">
      <RouterView />
    </main>

    <footer class="shrink-0">
      <FooterComponent />
    </footer>
  </div>
</template>
