<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import type { VForm } from 'vuetify/components'
import router from '@/router';

const successAlert = ref(false)
const modal = ref(false) 
const formRef = ref<VForm | null>(null)
const { addUser, findUserName } = useUserStore()

const userData = ref({
  userName: '',
  email: '',
  password: '',
  points: 0,
})

// Validaciones
const rules = {
  required: (value: string) => !!value || 'Este campo es obligatorio.',
  email: (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'El correo electrónico no es válido.'
  },
  minLength: (length: number) => {
    return (value: string) =>
      (value && value.length >= length) || `Debe tener al menos ${length} caracteres.`
  },
}

const userNameRules = [rules.required]
const emailRules = [rules.required, rules.email]
const passwordRules = [rules.required, rules.minLength(6)]

const handleSubmit = async () => {

  const validationResult = formRef.value?.validate();   // Validar el formulario y capturar el resultado
  
  // Extraer el valor booleano si validationResult es un objeto
  const isValid = typeof validationResult === 'object' ? (await validationResult).valid : validationResult;
  
  if (!isValid) {
    return;
  }

  // Verificar si el nombre de usuario ya existe
  const existingUserName = findUserName(userData.value.userName);
  console.log('Nombre de usuario existente:', existingUserName);

  if (existingUserName) {
    modal.value = true;
    return;
  }

  // Crear el nuevo usuario
  const newUser = {
    id: 0,
    userName: userData.value.userName,
    email: userData.value.email,
    password: userData.value.password,
    points: 0,
    role: 'user',
  };

  try {
    await addUser(newUser);
    console.log('Usuario añadido exitosamente.');

    // Resetear el formulario 
    formRef.value?.reset();

    // Mostrar alerta de éxito
    successAlert.value = true;

    setTimeout(() => {
      successAlert.value = false;
      router.push('/users');
    }, 3000);
  } catch (error) {
    console.error('Error al añadir el usuario:', error);
  }
};
</script>

<template>
  <div class="container-form">
    <v-sheet class="mx-auto form-container" width="450">
      <div class="form-header">
        <v-col cols="12" class="text-center mb-2">
          <img src="@/assets/logo.png" alt="Logo" style="max-height: 80px; margin-right: 12px;">
        </v-col>
        <h2 class="form-title">Registro de Usuario</h2>
      </div>
      <v-form ref="formRef" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="userData.userName"
          label="Nombre de usuario"
          prepend-icon="mdi-account"
          outlined
          dense
          required
          :rules="userNameRules"
        ></v-text-field>

        <v-text-field
          v-model="userData.email"
          label="Email"
          prepend-icon="mdi-email-outline"
          outlined
          dense
          required
          :rules="emailRules"
        ></v-text-field>

        <v-text-field
          v-model="userData.password"
          label="Contraseña"
          prepend-icon="mdi-lock-outline"
          outlined
          dense
          required
          :rules="passwordRules"
        ></v-text-field>

        <v-btn class="submit-button" type="submit" block color="#05a4c8">Crear usuario</v-btn>
      </v-form>
    </v-sheet>
  </div>

  <!-- Alerta de éxito -->
  <v-alert v-model="successAlert" type="success" dismissible class="success-alert">
    Usuario creado correctamente.
  </v-alert>

  <!-- Modal para nombre de usuario duplicado -->
  <v-dialog v-model="modal" max-width="400">
  <v-card>
    <v-card-title class="headline">Nombre de Usuario Existente</v-card-title>
    <v-card-text>
      El nombre de usuario "{{ userData.userName }}" ya existe. Por favor, elige otro nombre.
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="modal = false">Cerrar</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
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

.success-alert {
  position: fixed;
  top: 85px;
  right: 20px;
  width: 300px;
  z-index: 1000;
  background-color: #00e194;
  color: white;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 225, 148, 0.4);
}
</style>
