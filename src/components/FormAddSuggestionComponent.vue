<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSuggestionStore } from '@/stores/suggestionStore'
import { useDestinationStore } from '@/stores/destinationStore'
import { useRoute, useRouter } from 'vue-router'

const successAlert = ref(false)
const suggestionStore = useSuggestionStore()
const destinationStore = useDestinationStore()
const { addSuggestion } = suggestionStore
const { fetchDestinationById } = destinationStore
const route = useRoute()
const router = useRouter()
const errors = ref<Record<string, string>>({})

const destinationId = ref<number | null>(null)
if (route.params.destinationId) {
  destinationId.value = Number(route.params.destinationId)
} else {
  router.push('/destinations')
}

const destinationName = ref('')

onMounted(async () => {
  if (destinationId.value !== null) {
    try {
      const destination = await fetchDestinationById(destinationId.value)
      destinationName.value = destination?.cityName || 'Destino desconocido'
    } catch {
      destinationName.value = 'Destino desconocido'
    }
  }
})

const suggestionData = ref({
  title: '',
  description: '',
  price: '',
  rating: '',
})

const validate = () => {
  errors.value = {}
  if (!suggestionData.value.title) errors.value.title = 'Este campo es obligatorio.'
  if (!suggestionData.value.description) errors.value.description = 'Este campo es obligatorio.'
  if (!suggestionData.value.price) errors.value.price = 'Este campo es obligatorio.'
  else if (isNaN(Number(suggestionData.value.price)) || Number(suggestionData.value.price) < 0) errors.value.price = 'Debe ser un numero positivo.'
  if (!suggestionData.value.rating) errors.value.rating = 'Este campo es obligatorio.'
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return

  const newSuggestion = {
    title: suggestionData.value.title,
    description: suggestionData.value.description,
    price: Number(suggestionData.value.price),
    rating: Number(suggestionData.value.rating),
  }

  if (!destinationId.value) return

  await addSuggestion(newSuggestion, Number(destinationId.value))

  suggestionData.value = { title: '', description: '', price: '', rating: '' }
  successAlert.value = true

  setTimeout(() => {
    successAlert.value = false
    window.location.href = '/suggestions'
  }, 2000)
}
</script>

<template>
  <div class="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="w-full max-w-lg">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h2 class="text-2xl font-bold text-center text-primary mb-8">
          Crear experiencia para {{ destinationName }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Titulo</label>
            <input v-model="suggestionData.title" type="text" placeholder="Titulo de la experiencia"
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
              :class="errors.title ? 'border-red-300' : 'border-gray-200'" />
            <p v-if="errors.title" class="mt-1 text-xs text-red-500">{{ errors.title }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Descripcion</label>
            <textarea v-model="suggestionData.description" rows="3" placeholder="Describe tu experiencia..."
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50 resize-none"
              :class="errors.description ? 'border-red-300' : 'border-gray-200'"></textarea>
            <p v-if="errors.description" class="mt-1 text-xs text-red-500">{{ errors.description }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Precio (EUR)</label>
            <input v-model="suggestionData.price" type="text" placeholder="Ej: 23.45"
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
              :class="errors.price ? 'border-red-300' : 'border-gray-200'" />
            <p v-if="errors.price" class="mt-1 text-xs text-red-500">{{ errors.price }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Valoracion</label>
            <select v-model="suggestionData.rating"
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50 appearance-none cursor-pointer"
              :class="errors.rating ? 'border-red-300' : 'border-gray-200'">
              <option value="">Seleccionar...</option>
              <option v-for="r in ['1','2','3','4','5']" :key="r" :value="r">{{ r }} estrella{{ Number(r) > 1 ? 's' : '' }}</option>
            </select>
            <p v-if="errors.rating" class="mt-1 text-xs text-red-500">{{ errors.rating }}</p>
          </div>

          <button type="submit"
            class="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all duration-200">
            Crear Experiencia
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
      <p class="text-sm font-medium">Experiencia creada correctamente.</p>
    </div>
  </transition>
</template>
