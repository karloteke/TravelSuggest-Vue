
<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function navigateTo(route: string) {
    router.push({ name: route });
  }

  function login() {
    console.log("Login clicked");
  }
</script>


<template>
  <v-app-bar app color="white" light>
    <v-toolbar-title>
      <img src="@/assets/logo.png" class="design-logo" alt="Logo">
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      variant="text"
      class="menu-button mx-2"
      @click="navigateTo('home')"
    >
      Inicio
    </v-btn>
    <v-btn
      variant="text"
      class="menu-button mx-2"
      @click="navigateTo('destinations')"
    >
      Destinos
    </v-btn>
    <v-btn
      variant="text"
      class="menu-button mx-2"
      @click="navigateTo('suggest')"
    >
      Sugerencias
    </v-btn>

    <v-btn
      variant="text"
      class="menu-button mx-2"
      @click="navigateTo('tips')"
    >
      Consejos para un Viaje Responsable
    </v-btn>

    <v-btn
      @click="login"
      class="login-button mx-2"
      rounded
    >
      Login
    </v-btn>
  </v-app-bar>
</template>


<style scoped>

  .design-logo{
    max-height: 70px;
    margin-right: 12px;
  }
  .v-toolbar-title {
    display: flex;
    align-items: center;
  }

   .menu-button {
    color: #9aadff;
    font-size: 15px;
    font-weight: bold;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  .menu-button:hover {
    color: #ffb4f3;
  }

  .login-button{
    background-color: #9aadff;
    color: white;
    font-weight: bold;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
</style>
