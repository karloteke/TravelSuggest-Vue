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

onMounted(async () => {
  let existing = destinationStore.getDestinationById(destinationId)
  if (!existing) existing = await destinationStore.fetchDestinationById(destinationId)
  if (existing) {
    destination.value = {
      cityName: existing.cityName,
      description: existing.description,
      season: existing.season,
      isPopular: existing.isPopular,
      category: existing.category,
      imageBase64: existing.imageBase64,
    }
  } else {
    router.push('/destinations')
  }
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
    cityName: destination.value.cityName,
    description: destination.value.description,
    season: destination.value.season,
    isPopular: destination.value.isPopular,
    category: destination.value.category,
    imageBase64: imageBase64.value ?? destination.value.imageBase64,
  }
  await destinationStore.updateDestination(destinationId, payload)
  successAlert.value = true
  setTimeout(() => {
    successAlert.value = false
    router.push('/destinations')
  }, 2000)
}
</script>

<template>
  <div
    class="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-6 relative overflow-hidden"
  >
    <!-- Fondo cinematico -->
    <div class="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900"></div>
    <div class="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-accent/10"></div>
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-float"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-float delay-300"
      ></div>
      <div
        class="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
      ></div>
    </div>

    <div class="relative z-10 w-full max-w-2xl" v-if="destination">
      <!-- Card con glassmorphism -->
      <div
        class="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-6 md:p-8"
      >
        <!-- Logo -->
        <div class="flex justify-center mb-4">
          <div class="relative">
            <div class="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
            <img src="@/assets/logo.png" alt="Logo" class="relative h-14 w-auto drop-shadow-2xl" />
          </div>
        </div>

        <!-- Titulo -->
        <h2
          class="text-2xl font-bold text-center text-white mb-1"
          style="font-family: 'Playfair Display', serif"
        >
          Editar Destino
        </h2>
        <p class="text-center text-white/50 text-sm mb-5">Actualiza la informacion del destino</p>

        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- City Name -->
          <div>
            <label class="block text-sm font-medium text-white/70 mb-1.5">Nombre del destino</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg
                  class="w-5 h-5 text-white/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <input
                v-model="destination.cityName"
                type="text"
                class="w-full pl-11 pr-4 py-2.5 bg-white/8 border rounded-xl focus:ring-2 focus:ring-accent/40 focus:border-accent/40 focus:bg-white/12 outline-none transition-all text-white placeholder-white/30 backdrop-blur-sm text-sm"
                :class="errors.cityName ? 'border-red-400/50' : 'border-white/15'"
              />
            </div>
            <p v-if="errors.cityName" class="mt-1 text-xs text-red-400">{{ errors.cityName }}</p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-white/70 mb-1.5">Descripcion</label>
            <textarea
              v-model="destination.description"
              rows="4"
              class="w-full px-4 py-2.5 bg-white/8 border rounded-xl focus:ring-2 focus:ring-accent/40 focus:border-accent/40 focus:bg-white/12 outline-none transition-all text-white placeholder-white/30 backdrop-blur-sm text-sm resize-none"
              :class="errors.description ? 'border-red-400/50' : 'border-white/15'"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-xs text-red-400">
              {{ errors.description }}
            </p>
          </div>

          <!-- Two columns: Season & Category -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Season -->
            <div>
              <label class="block text-sm font-medium text-white/70 mb-1.5">Mejor estacion</label>
              <select
                v-model="destination.season"
                class="w-full px-4 py-2.5 bg-white/8 border border-white/15 rounded-xl focus:ring-2 focus:ring-accent/40 focus:border-accent/40 focus:bg-white/12 outline-none transition-all text-white backdrop-blur-sm text-sm appearance-none cursor-pointer"
              >
                <option
                  v-for="s in ['Verano', 'Primavera', 'Otono', 'Invierno', 'Todas las estaciones']"
                  :key="s"
                  :value="s"
                  class="bg-gray-800 text-white"
                >
                  {{ s }}
                </option>
              </select>
            </div>

            <!-- Category -->
            <div>
              <label class="block text-sm font-medium text-white/70 mb-1.5">Categoria</label>
              <select
                v-model="destination.category"
                class="w-full px-4 py-2.5 bg-white/8 border border-white/15 rounded-xl focus:ring-2 focus:ring-accent/40 focus:border-accent/40 focus:bg-white/12 outline-none transition-all text-white backdrop-blur-sm text-sm appearance-none cursor-pointer"
              >
                <option
                  v-for="c in [
                    'Playa',
                    'Montana',
                    'Ciudad',
                    'Aventura',
                    'Cultural',
                    'Gastronomia',
                    'Ocio',
                  ]"
                  :key="c"
                  :value="c"
                  class="bg-gray-800 text-white"
                >
                  {{ c }}
                </option>
              </select>
            </div>
          </div>

          <!-- Popular checkbox -->
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              v-model="destination.isPopular"
              type="checkbox"
              class="w-5 h-5 rounded border-white/30 bg-white/10 text-accent focus:ring-accent/30"
            />
            <span class="text-sm font-medium text-white/70">Es popular?</span>
          </label>

          <!-- Image upload -->
          <div class="flex flex-col items-center gap-3">
            <button
              type="button"
              @click="triggerFileInput"
              class="flex items-center gap-2 px-4 py-2 text-white/70 border border-white/20 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Cambiar Imagen
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onFileChange"
            />
            <span
              v-if="imageBase64"
              class="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full border border-emerald-500/30"
            >
              Imagen seleccionada
            </span>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="w-full py-2.5 bg-linear-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-sm tracking-wide uppercase"
          >
            Actualizar Destino
          </button>
        </form>
      </div>
    </div>
  </div>

  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-x-4"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0 translate-x-4"
  >
    <div
      v-if="successAlert"
      class="fixed top-24 right-5 z-50 flex items-center gap-3 px-5 py-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl shadow-lg max-w-sm"
    >
      <svg class="w-5 h-5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="text-sm font-medium">Destino actualizado correctamente.</p>
    </div>
  </transition>
</template>
