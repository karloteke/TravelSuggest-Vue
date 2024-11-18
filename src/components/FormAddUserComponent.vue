<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';

const successAlert = ref(false); 
const showModal = ref(false);
const { addUser, findUserName } = useUserStore();

const userData = ref({
  userName: '',
  email: '',
  password: '',
  points: 0
});

const handleSubmit = async () => {
  if (!userData.value.userName || !userData.value.email || !userData.value.password) {
    showModal.value = true; // Mostrar modal si faltan campos
    return; 
  }

  const existingUserName = findUserName(userData.value.userName);
  if (existingUserName) {
    alert('Ese nombre de usuario ya existe.');
    return; 
  }

  const newUser = {
    id: 0, 
    userName: userData.value.userName,
    email: userData.value.email,
    password: userData.value.password,
    points: 0,
    role: 'user' 
  };
  
  await addUser(newUser);
  
  // Resetear valores del formulario
  userData.value = { userName: '', email: '', password: '', points: 0 };
  successAlert.value = true;
  setTimeout(() => {
    successAlert.value = false;
  }, 2000);
};
</script>

<template>
  <div class="container-form">
    <v-sheet class="mx-auto form-container" width="450">
      <h2 class="form-title">Crear Nuevo Usuario</h2>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="userData.userName"
          label="Nombre de usuario"
          prepend-icon="mdi-account"
          outlined
          dense
          required
        ></v-text-field>

        <v-text-field
          v-model="userData.email"
          label="Email"
          prepend-icon="mdi-email-outline"
          outlined
          dense
          required
        ></v-text-field>

        <v-text-field
          v-model="userData.password"
          label="Contraseña"
          prepend-icon="mdi-lock-outline"
          outlined
          dense
          required
          type="password"
        ></v-text-field>

        <v-btn class="submit-button" type="submit" block color="#9aadff">Crear usuario</v-btn>
      </v-form>
    </v-sheet>
  </div>

  <!-- Modal para mensaje de campos incompletos -->
  <v-dialog v-model="showModal" max-width="290">
    <v-card>
      <v-card-title class="headline">Campos incompletos</v-card-title>
      <v-card-text>Por favor, complete todos los campos.</v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="showModal = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Alerta de éxito -->
  <v-alert v-model="successAlert" type="success" dismissible class="success-alert">
    Usuario creado correctamente.
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
  box-shadow: 0 6px 18px rgba(90, 103, 216, 0.3);
}

.form-title {
  font-size: 26px;
  font-weight: bold;
  color: #9aadff;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Open Sans', sans-serif;
}

.submit-button {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.success-alert {
  position: fixed;
  top: 70px;
  right: 20px;
  width: 300px;
  z-index: 1000;
  color: white;
  font-weight: bold;
  font-size: 16px;
}
</style>
