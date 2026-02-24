<script setup lang="ts">
import { ref } from 'vue'
import { useLoginStore } from '@/stores/loginStore'

const { login } = useLoginStore()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const showErrorAlert = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

async function handleLogin() {
  try {
    await login({ userName: username.value, password: password.value })
    localStorage.setItem('username', username.value)
    localStorage.setItem('password', password.value)
    window.location.href = '/'
  } catch {
    showErrorAlert.value = true
    setTimeout(() => {
      showErrorAlert.value = false
    }, 3000)
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <!-- Logo -->
        <div class="flex justify-center mb-6">
          <img src="@/assets/logo.png" alt="Logo" class="h-20 w-auto" />
        </div>

        <h2 class="text-2xl font-bold text-center text-primary mb-8">Iniciar Sesion</h2>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Username -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Nombre de usuario</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <input
                v-model="username"
                type="text"
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
                placeholder="Tu nombre de usuario"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Contrasena</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
                placeholder="Tu contrasena"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all duration-200"
          >
            Iniciar sesion
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- Error alert -->
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-x-4"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 translate-x-4"
  >
    <div
      v-if="showErrorAlert"
      class="fixed top-24 right-5 z-50 flex items-center gap-3 px-5 py-4 bg-red-50 border border-red-200 text-red-700 rounded-xl shadow-lg max-w-sm"
    >
      <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>
      <p class="text-sm font-medium">Credenciales incorrectos, revise los campos de nuevo.</p>
    </div>
  </transition>
</template>
