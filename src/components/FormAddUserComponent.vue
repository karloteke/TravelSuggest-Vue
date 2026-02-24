<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

const successAlert = ref(false)
const modal = ref(false)
const { addUser, findUserName } = useUserStore()
const showPassword = ref(false)
const errors = ref<Record<string, string>>({})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const userData = ref({
  userName: '',
  email: '',
  password: '',
  points: 0,
})

const validate = () => {
  errors.value = {}
  if (!userData.value.userName) errors.value.userName = 'Este campo es obligatorio.'
  if (!userData.value.email) errors.value.email = 'Este campo es obligatorio.'
  else {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!pattern.test(userData.value.email)) errors.value.email = 'El correo electronico no es valido.'
  }
  if (!userData.value.password) errors.value.password = 'Este campo es obligatorio.'
  else if (userData.value.password.length < 6) errors.value.password = 'Debe tener al menos 6 caracteres.'
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return

  const existingUserName = findUserName(userData.value.userName)
  if (existingUserName) {
    modal.value = true
    return
  }

  const newUser = {
    id: 0,
    userName: userData.value.userName,
    email: userData.value.email,
    password: userData.value.password,
    points: 0,
    role: 'user',
  }

  try {
    await addUser(newUser)
    successAlert.value = true
    setTimeout(() => {
      successAlert.value = false
      router.push('/login')
    }, 2000)
  } catch (error) {
    console.error('Error al anadir el usuario:', error)
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div class="flex justify-center mb-6">
          <img src="@/assets/logo.png" alt="Logo" class="h-20 w-auto" />
        </div>
        <h2 class="text-2xl font-bold text-center text-primary mb-8">Registro de Usuario</h2>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Nombre de usuario</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <input v-model="userData.userName" type="text"
                class="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
                :class="errors.userName ? 'border-red-300' : 'border-gray-200'" placeholder="Tu nombre de usuario" />
            </div>
            <p v-if="errors.userName" class="mt-1 text-xs text-red-500">{{ errors.userName }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <input v-model="userData.email" type="email"
                class="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
                :class="errors.email ? 'border-red-300' : 'border-gray-200'" placeholder="correo@ejemplo.com" />
            </div>
            <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Contrasena</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input v-model="userData.password" :type="showPassword ? 'text' : 'password'"
                class="w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
                :class="errors.password ? 'border-red-300' : 'border-gray-200'" placeholder="Minimo 6 caracteres" />
              <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-xs text-red-500">{{ errors.password }}</p>
          </div>

          <button type="submit"
            class="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all duration-200">
            Crear usuario
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
      <p class="text-sm font-medium">Usuario creado correctamente.</p>
    </div>
  </transition>

  <!-- Duplicate username modal -->
  <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="modal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="modal = false"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full">
        <h3 class="text-xl font-bold text-gray-800 mb-2">Nombre de Usuario Existente</h3>
        <p class="text-gray-600 mb-6">El nombre de usuario "{{ userData.userName }}" ya existe. Por favor, elige otro nombre.</p>
        <button @click="modal = false" class="w-full py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors">
          Cerrar
        </button>
      </div>
    </div>
  </transition>
</template>
