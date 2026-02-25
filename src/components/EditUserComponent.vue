<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useLoginStore } from '@/stores/loginStore'
import type { UserUpdate } from '@/core/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const loginStore = useLoginStore()

const userId = Number(route.params.userId)
const successAlert = ref(false)
const showPassword = ref(false)

const currentUserId = computed(() => loginStore.getUserId())
const userRole = computed(() => loginStore.getRole())

const user = ref<UserUpdate | null>(null)
const errors = ref<Record<string, string>>({})

onMounted(async () => {
  if (userRole.value !== 'admin' && userId !== currentUserId.value) {
    router.push('/')
    return
  }
  let existingUser = userStore.getUserById(userId)
  if (!existingUser) existingUser = await userStore.fetchUserById(userId)
  if (existingUser) {
    user.value = { userName: existingUser.userName, email: existingUser.email, password: '' }
  } else {
    console.error('Usuario no encontrado')
    router.push('/users')
  }
})

const validate = () => {
  errors.value = {}
  if (!user.value?.userName) errors.value.userName = 'Este campo es obligatorio.'
  if (!user.value?.email) errors.value.email = 'Este campo es obligatorio.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.value.email)) errors.value.email = 'El correo electronico no es valido.'
  if (user.value?.password && user.value.password.length < 6) errors.value.password = 'Debe tener al menos 6 caracteres.'
  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  if (!validate() || !user.value) return
  const payload: Partial<UserUpdate> = { userName: user.value.userName, email: user.value.email }
  if (user.value.password && user.value.password.trim() !== '') payload.password = user.value.password
  await userStore.updateUser(userId, payload)
  successAlert.value = true
  setTimeout(() => { successAlert.value = false; router.push('/') }, 3000)
}
</script>

<template>
  <div class="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-linear-to-br from-gray-50 to-blue-50">
    <div class="w-full max-w-xl" v-if="user">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h2 class="text-2xl font-bold text-center text-primary mb-8">Editar Usuario</h2>
        <form @submit.prevent="submitForm" class="space-y-5">
          <!-- Username -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Nombre de usuario</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
              </span>
              <input v-model="user.userName" type="text"
                class="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
                :class="errors.userName ? 'border-red-300' : 'border-gray-200'" />
            </div>
            <p v-if="errors.userName" class="mt-1 text-xs text-red-500">{{ errors.userName }}</p>
          </div>
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
              </span>
              <input v-model="user.email" type="email"
                class="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
                :class="errors.email ? 'border-red-300' : 'border-gray-200'" />
            </div>
            <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
          </div>
          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Contrasena</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
              </span>
              <input v-model="user.password" :type="showPassword ? 'text' : 'password'" placeholder="Solo si deseas cambiar (min. 6 caracteres)"
                class="w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-800 bg-gray-50/50"
                :class="errors.password ? 'border-red-300' : 'border-gray-200'" />
              <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-xs text-red-500">{{ errors.password }}</p>
          </div>
          <button type="submit"
            class="w-full py-3 bg-linear-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all duration-200">
            Actualizar Usuario
          </button>
        </form>
      </div>
    </div>
  </div>

  <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-x-4" enter-to-class="opacity-100 translate-x-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0 translate-x-4">
    <div v-if="successAlert" class="fixed top-24 right-5 z-50 flex items-center gap-3 px-5 py-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl shadow-lg max-w-sm">
      <svg class="w-5 h-5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <p class="text-sm font-medium">Usuario actualizado correctamente.</p>
    </div>
  </transition>
</template>
