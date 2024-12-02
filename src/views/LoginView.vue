<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/loginStore'

const { login } = useLoginStore()
const router = useRouter()

// Inicializar las referencias con valores vacíos
const username = ref('')
const password = ref('')

const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

async function handleLogin() {
  try {
    await login({ userName: username.value, password: password.value })
    // Guardar nombre de usuario y contraseña en localStorage
    localStorage.setItem('username', username.value)
    localStorage.setItem('password', password.value)
    router.push('/') // Si el inicio de sesión es correcto, redirige a la página principal
  } catch (error) {
    if (error instanceof Error) {
      alert('Credenciales incorrectas. Inténtalo de nuevo.')
    } else {
      alert('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.')
    }
  }
}
</script>

<template>
  <div class="container-form">
    <v-sheet class="mx-auto form-container" width="450">
      <div class="form-header">
        <v-col cols="12" class="text-center mb-2">
          <img src="@/assets/logo.png" alt="Logo" style="max-height: 80px; margin-right: 12px" />
        </v-col>
        <h2 class="form-title">Iniciar Sesión</h2>
      </div>
      <v-form ref="formRef" @submit.prevent="handleLogin">
        <v-text-field
          v-model="username"
          label="Nombre de usuario"
          prepend-icon="mdi-account"
          outlined
          dense
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Contraseña"
          prepend-icon="mdi-lock-outline"
          append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          outlined
          dense
          required
          @click:append="togglePasswordVisibility"
        >
          <template #append>
            <v-icon @click="togglePasswordVisibility" class="cursor-pointer" color="grey">
              {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
            </v-icon>
          </template>
        </v-text-field>

        <v-btn class="submit-button" block type="submit"> Iniciar sesión </v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style scoped>
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
  font-size: 30px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
  color: #4a90e2;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Open Sans', sans-serif;
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
</style>
