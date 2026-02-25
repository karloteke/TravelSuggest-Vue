<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useSuggestionStore } from '@/stores/suggestionStore'
import type { SuggestionUpdate } from '@/core/suggestion'

const route = useRoute()
const router = useRouter()
const suggestionStore = useSuggestionStore()
const suggestionId = Number(route.params.suggestionId)
const successAlert = ref(false)
const suggestion = ref<SuggestionUpdate | null>(null)
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
  let existing = suggestionStore.getSuggestionById(suggestionId)
  if (!existing) existing = await suggestionStore.fetchSuggestionById(suggestionId)
  if (existing) {
    suggestion.value = {
      title: existing.title,
      description: existing.description,
      price: existing.price,
      rating: existing.rating,
      imageBase64: existing.imageBase64,
    }
  } else {
    router.push('/suggestions')
  }
})

const validate = () => {
  errors.value = {}
  if (!suggestion.value?.title) errors.value.title = 'Este campo es obligatorio.'
  if (!suggestion.value?.description) errors.value.description = 'Este campo es obligatorio.'
  if (suggestion.value?.price === undefined || suggestion.value?.price === null)
    errors.value.price = 'Este campo es obligatorio.'
  else if (isNaN(Number(suggestion.value.price)) || Number(suggestion.value.price) < 0)
    errors.value.price = 'Debe ser un numero positivo.'
  if (!suggestion.value?.rating) errors.value.rating = 'Este campo es obligatorio.'
  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  if (!validate() || !suggestion.value) return
  const payload: SuggestionUpdate = {
    title: suggestion.value.title,
    description: suggestion.value.description,
    price: suggestion.value.price,
    rating: suggestion.value.rating,
    imageBase64: imageBase64.value ?? suggestion.value.imageBase64,
  }
  await suggestionStore.updateSuggestion(suggestionId, payload)
  successAlert.value = true
  setTimeout(() => {
    successAlert.value = false
    router.push('/suggestions')
  }, 2000)
}
</script>

<template>
  <div
    class="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50"
  >
    <div class="w-full max-w-xl" v-if="suggestion">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h2 class="text-2xl font-bold text-center text-primary mb-8">Editar Experiencia</h2>
        <form @submit.prevent="submitForm" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Titulo</label>
            <input
              v-model="suggestion.title"
              type="text"
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
              :class="errors.title ? 'border-red-300' : 'border-gray-200'"
            />
            <p v-if="errors.title" class="mt-1 text-xs text-red-500">{{ errors.title }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Descripcion</label>
            <textarea
              v-model="suggestion.description"
              rows="4"
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50 resize-none"
              :class="errors.description ? 'border-red-300' : 'border-gray-200'"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-xs text-red-500">
              {{ errors.description }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Precio (EUR)</label>
            <input
              v-model="suggestion.price"
              type="number"
              step="0.01"
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
              :class="errors.price ? 'border-red-300' : 'border-gray-200'"
            />
            <p v-if="errors.price" class="mt-1 text-xs text-red-500">{{ errors.price }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Valoracion</label>
            <select
              v-model="suggestion.rating"
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50 appearance-none cursor-pointer"
              :class="errors.rating ? 'border-red-300' : 'border-gray-200'"
            >
              <option v-for="r in [1, 2, 3, 4, 5]" :key="r" :value="r">
                {{ r }} estrella{{ r > 1 ? 's' : '' }}
              </option>
            </select>
            <p v-if="errors.rating" class="mt-1 text-xs text-red-500">{{ errors.rating }}</p>
          </div>
          <!-- Image upload -->
          <div class="flex flex-col items-center gap-3">
            <button
              type="button"
              @click="triggerFileInput"
              class="flex items-center gap-2 px-4 py-2 text-primary border border-primary/30 rounded-xl hover:bg-primary/5 transition-colors text-sm font-medium"
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
            <img
              v-if="imageBase64"
              :src="imageBase64"
              class="max-h-48 rounded-xl object-contain"
              alt="Vista previa nueva"
            />
            <img
              v-else-if="suggestion.imageBase64"
              :src="suggestion.imageBase64"
              class="max-h-48 rounded-xl object-contain"
              alt="Imagen actual"
            />
            <span
              v-if="imageBase64"
              class="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 text-sm rounded-full border border-emerald-200"
            >
              Nueva imagen seleccionada
            </span>
          </div>

          <button
            type="submit"
            class="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all duration-200"
          >
            Actualizar Experiencia
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
      <svg class="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="text-sm font-medium">Experiencia actualizada correctamente.</p>
    </div>
  </transition>
</template>
