<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'
import type { DestinationUpdate } from '@/core/destination'

const route = useRoute()
const router = useRouter()
const destinationStore = useDestinationStore()
const destinationId = Number(route.params.destinationId)
const successAlert = ref(false)
const destination = ref<DestinationUpdate | null>(null)
const imageBase64 = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const errors = ref<Record<string, string>>({})

const triggerFileInput = () => { fileInput.value?.click() }

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    if (!file.type.startsWith('image/')) { alert('Por favor, selecciona un archivo de imagen.'); return }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => { imageBase64.value = reader.result as string }
  }
}

onMounted(async () => {
  let existing = destinationStore.getDestinationById(destinationId)
  if (!existing) existing = await destinationStore.fetchDestinationById(destinationId)
  if (existing) {
    destination.value = {
      cityName: existing.cityName, description: existing.description,
      season: existing.season, isPopular: existing.isPopular,
      category: existing.category, imageBase64: existing.imageBase64,
    }
  } else { router.push('/destinations') }
})

const validate = () => {
  errors.value = {}
  if (!destination.value?.cityName) errors.value.cityName = 'Este campo es obligatorio.'
  if (!destination.value?.description) errors.value.description = 'Este campo es obligatorio.'
  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  if (!validate() || !destination.value) return
  const payload: DestinationUpdate = {
    cityName: destination.value.cityName, description: destination.value.description,
    season: destination.value.season, isPopular: destination.value.isPopular,
    category: destination.value.category, imageBase64: imageBase64.value,
  }
  await destinationStore.updateDestination(destinationId, payload)
  successAlert.value = true
  setTimeout(() => { successAlert.value = false; router.push('/destinations') }, 2000)
}
</script>

<template>
  <div class="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="w-full max-w-xl" v-if="destination">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h2 class="text-2xl font-bold text-center text-primary mb-8">Editar Destino</h2>
        <form @submit.prevent="submitForm" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Nombre del destino</label>
            <input v-model="destination.cityName" type="text"
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
              :class="errors.cityName ? 'border-red-300' : 'border-gray-200'" />
            <p v-if="errors.cityName" class="mt-1 text-xs text-red-500">{{ errors.cityName }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Descripcion</label>
            <textarea v-model="destination.description" rows="4"
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50 resize-none"
              :class="errors.description ? 'border-red-300' : 'border-gray-200'"></textarea>
            <p v-if="errors.description" class="mt-1 text-xs text-red-500">{{ errors.description }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Mejor estacion</label>
            <select v-model="destination.season"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50 appearance-none cursor-pointer">
              <option v-for="s in ['Verano', 'Primavera', 'Otono', 'Invierno', 'Todas las estaciones']" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Categoria</label>
            <select v-model="destination.category"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50 appearance-none cursor-pointer">
              <option v-for="c in ['Playa', 'Montana', 'Ciudad', 'Aventura', 'Cultural', 'Gastronomia', 'Ocio']" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <label class="flex items-center gap-3 cursor-pointer">
            <input v-model="destination.isPopular" type="checkbox" class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/30" />
            <span class="text-sm font-medium text-gray-700">Es popular?</span>
          </label>
          <div class="flex flex-col items-center gap-3">
            <button type="button" @click="triggerFileInput"
              class="flex items-center gap-2 px-4 py-2 text-primary border border-primary/30 rounded-xl hover:bg-primary/5 transition-colors text-sm font-medium">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
              </svg>
              Cambiar Imagen
            </button>
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
            <span v-if="imageBase64" class="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 text-sm rounded-full border border-emerald-200">
              Imagen seleccionada
            </span>
          </div>
          <button type="submit"
            class="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all duration-200">
            Actualizar Destino
          </button>
        </form>
      </div>
    </div>
  </div>

  <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-x-4" enter-to-class="opacity-100 translate-x-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0 translate-x-4">
    <div v-if="successAlert" class="fixed top-24 right-5 z-50 flex items-center gap-3 px-5 py-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl shadow-lg max-w-sm">
      <svg class="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <p class="text-sm font-medium">Destino actualizado correctamente.</p>
    </div>
  </transition>
</template>
