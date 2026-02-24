<script setup lang="ts">
import { ref } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'

const successAlert = ref(false)
const { addDestination } = useDestinationStore()
const errors = ref<Record<string, string>>({})

const destinationData = ref({
  cityName: '',
  description: '',
  season: '',
  isPopular: false,
  category: '',
})

const imageBase64 = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona un archivo de imagen.')
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      imageBase64.value = reader.result as string
    }
  }
}

const validate = () => {
  errors.value = {}
  if (!destinationData.value.cityName) errors.value.cityName = 'Este campo es obligatorio.'
  if (!destinationData.value.description) errors.value.description = 'Este campo es obligatorio.'
  if (!destinationData.value.season) errors.value.season = 'Este campo es obligatorio.'
  if (!destinationData.value.category) errors.value.category = 'Este campo es obligatorio.'
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return

  const newDestination = {
    id: 0,
    cityName: destinationData.value.cityName,
    description: destinationData.value.description,
    season: destinationData.value.season,
    isPopular: destinationData.value.isPopular,
    category: destinationData.value.category,
    imageBase64: imageBase64.value,
  }

  await addDestination(newDestination)

  destinationData.value = { cityName: '', description: '', season: '', isPopular: false, category: '' }
  imageBase64.value = null
  successAlert.value = true

  setTimeout(() => {
    successAlert.value = false
    window.location.href = '/destinations'
  }, 2000)
}
</script>

<template>
  <div class="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="w-full max-w-lg">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h2 class="text-2xl font-bold text-center text-primary mb-8">Crear Nuevo Destino</h2>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- City Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Nombre de la ciudad</label>
            <input v-model="destinationData.cityName" type="text" placeholder="Ej: Barcelona"
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
              :class="errors.cityName ? 'border-red-300' : 'border-gray-200'" />
            <p v-if="errors.cityName" class="mt-1 text-xs text-red-500">{{ errors.cityName }}</p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Descripcion</label>
            <textarea v-model="destinationData.description" rows="3" placeholder="Describe el destino..."
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50 resize-none"
              :class="errors.description ? 'border-red-300' : 'border-gray-200'"></textarea>
            <p v-if="errors.description" class="mt-1 text-xs text-red-500">{{ errors.description }}</p>
          </div>

          <!-- Season -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Mejor estacion</label>
            <select v-model="destinationData.season"
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50 appearance-none cursor-pointer"
              :class="errors.season ? 'border-red-300' : 'border-gray-200'">
              <option value="">Seleccionar...</option>
              <option v-for="s in ['Verano', 'Primavera', 'Otono', 'Invierno', 'Todas las estaciones']" :key="s" :value="s">{{ s }}</option>
            </select>
            <p v-if="errors.season" class="mt-1 text-xs text-red-500">{{ errors.season }}</p>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Categoria</label>
            <select v-model="destinationData.category"
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50 appearance-none cursor-pointer"
              :class="errors.category ? 'border-red-300' : 'border-gray-200'">
              <option value="">Seleccionar...</option>
              <option v-for="c in ['Playa', 'Montana', 'Ciudad', 'Aventura', 'Cultural', 'Gastronomia', 'Ocio']" :key="c" :value="c">{{ c }}</option>
            </select>
            <p v-if="errors.category" class="mt-1 text-xs text-red-500">{{ errors.category }}</p>
          </div>

          <!-- Popular checkbox -->
          <label class="flex items-center gap-3 cursor-pointer">
            <input v-model="destinationData.isPopular" type="checkbox" class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/30" />
            <span class="text-sm font-medium text-gray-700">Es popular?</span>
          </label>

          <!-- Image upload -->
          <div class="flex flex-col items-center gap-3">
            <button type="button" @click="triggerFileInput"
              class="flex items-center gap-2 px-4 py-2 text-primary border border-primary/30 rounded-xl hover:bg-primary/5 transition-colors text-sm font-medium">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Subir imagen
            </button>
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
            <img v-if="imageBase64" :src="imageBase64" class="max-h-48 rounded-xl object-contain" alt="Vista previa" />
          </div>

          <!-- Submit -->
          <button type="submit"
            class="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all duration-200">
            Crear Destino
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- Success alert -->
  <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-x-4" enter-to-class="opacity-100 translate-x-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0 translate-x-4">
    <div v-if="successAlert" class="fixed top-24 right-5 z-50 flex items-center gap-3 px-5 py-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl shadow-lg max-w-sm">
      <svg class="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <p class="text-sm font-medium">Destino creado correctamente.</p>
    </div>
  </transition>
</template>
