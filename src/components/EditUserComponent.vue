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

// Obtener el rol y el userId del usuario logueado
const currentUserId = computed(() => loginStore.getUserId())
const userRole = computed(() => loginStore.getRole())

// Estado del usuario
const user = ref<UserUpdate | null>(null)

// Validaciones
const rules = {
  required: (value: string) => !!value || 'Este campo es obligatorio.',
  email: (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'El correo electrónico no es válido.'
  },
  optionalPassword: (value: string) => {
    // Si está vacío, es válido; si no, debe tener al menos 6 caracteres.
    return !value || value.length >= 6 || 'Debe tener al menos 6 caracteres.'
  },
}

const userNameRules = [rules.required]
const emailRules = [rules.required, rules.email]
const passwordRules = [rules.optionalPassword]

// Cargar el usuario al montar el componente
onMounted(async () => {
  if (userRole.value !== 'admin' && userId !== currentUserId.value) {
    router.push('/')
    return
  }

  let existingUser = userStore.getUserById(userId)
  if (existingUser) {
    user.value = {
      userName: existingUser.userName,
      email: existingUser.email,
      password: '', //Se deja vacio para que no se muestre la contraseña
    }
  } else {
    existingUser = await userStore.fetchUserById(userId)  // Si no está en el store, obtenerlo del servidor
    if (existingUser) {
      user.value = {
        userName: existingUser.userName,
        email: existingUser.email,
        password: '',
      }
    } else {
      console.error('Usuario no encontrado')
      router.push('/users')
    }
  }
})

// Función para enviar el formulario
const submitForm = async () => {
  if (user.value) {
    const payload: Partial<UserUpdate> = {   // Preparar el payload para enviar
      userName: user.value.userName,
      email: user.value.email,
    }

    // Solo incluir la contraseña si el usuario la proporciona
    if (user.value.password && user.value.password.trim() !== '') {
      payload.password = user.value.password
    }

    await userStore.updateUser(userId, payload) // Llamar a la función de actualización en el store
    successAlert.value = true // Mostrar la alerta de éxito

    setTimeout(() => {
      successAlert.value = false
      router.push('/')
    }, 3000)
  }
}
</script>

<template>
  <div class="container-form" v-if="user">
    <v-sheet class="mx-auto form-container" width="630">
      <h2 class="form-title">Editar Usuario</h2>
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="user.userName"
          label="Nombre de usuario"
          prepend-icon="mdi-account"
          outlined
          dense
          required
          :rules="userNameRules"
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          label="Email"
          prepend-icon="mdi-email-outline"
          outlined
          dense
          required
          :rules="emailRules"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          placeholder="Rellenar solo si deseas cambiar la contraseña (mínimo 6 caracteres)"
          label="Contraseña"
          prepend-icon="mdi-lock-outline"
          outlined
          dense
          required
          :rules="passwordRules"
        ></v-text-field>

        <v-btn class="submit-button" type="submit" block color="#05a4c8">
          Actualizar Usuario
        </v-btn>
      </v-form>
    </v-sheet>
  </div>

  <v-alert v-model="successAlert" type="success" dismissible class="success-alert">
    Usuario actualizado correctamente.
  </v-alert>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

.container-form {
  padding: 40px;
  margin-top: 80px;
  display: flex;
  justify-content: center;
}

.form-container {
  padding: 30px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 6px 18px rgba(13, 111, 229, 0.2);
}

.form-title {
  font-size: 26px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  color: #4a90e2;
  text-align: center;
  margin-bottom: 20px;
}

.submit-button {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #05a4c8;
  transition:
    background 0.3s,
    box-shadow 0.3s;
}

.submit-button:hover {
  background: linear-gradient(135deg, #0d6fe5, #05a4c8);
  box-shadow: 0 4px 12px rgba(5, 164, 200, 0.3);
}

.success-alert {
  position: fixed;
  top: 85px;
  right: 20px;
  width: 300px;
  z-index: 1000;
}
</style>
