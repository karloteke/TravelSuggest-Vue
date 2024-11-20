<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'; 
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';


const userStore = useUserStore();

const { users, deleteUser } = useUserStore();
const router = useRouter();
const pageSize = 6;
const currentPage = ref(1);

// Estado del modal de confirmación de eliminación
const deleteConfirmDialog = ref(false); 
const userToDelete = ref<number | null>(null); // ID del usuario a eliminar

// Cargar usuarios al montar el componente
onMounted(async () => {
  await userStore.fetchAll();
});

const handleAddUser = () => {
  router.push('/add-user');
};

const handleEditUser = (userId: number) => {
  router.push(`/edit-user/${userId}`);
};

// Función para abrir el modal de confirmación de eliminación
const openDeleteConfirmDialog = (userId: number) => {
  userToDelete.value = userId;
  deleteConfirmDialog.value = true;
};

// Función para confirmar y proceder con la eliminación del usuario
const confirmDeleteUser = async () => {
  if (userToDelete.value !== null) {
    await deleteUser(userToDelete.value);
    deleteConfirmDialog.value = false;
    userToDelete.value = null;
  }
};

const totalPages = computed(() => Math.ceil(users.length / pageSize));

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return users.slice(startIndex, endIndex);
});

const changePage = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <div class="container">
    <h1 class="section-title">Usuarios de TravelSuggest</h1>
    
    <button class="floating-add-button" @click="handleAddUser">
      <v-icon>mdi-account-plus</v-icon> Agregar Usuario
    </button>

    <div class="table-container">
      <table class="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre Usuario</th>
            <th>Email</th>
            <th>Puntos</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.userName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.points }}</td>
            <td>{{ user.role }}</td>
            <td class="action-icons">
              <button @click="handleEditUser(user.id)" class="icon-button edit">✏️</button>
              <button @click="openDeleteConfirmDialog(user.id)" class="icon-button delete">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-container">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="['pagination-button', { active: currentPage === page }]"
      >
        {{ page }}
      </button>
    </div>

    <!-- Modal de Confirmación de Eliminación -->
    <v-dialog v-model="deleteConfirmDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirmar Eliminación</v-card-title>
        <v-card-text>
          ¿Estás seguro de que deseas eliminar este usuario?
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="confirmDeleteUser">Sí, eliminar</v-btn>
          <v-btn color="blue-grey" @click="deleteConfirmDialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

.container {
  max-width: 1200px;
  margin: auto;
  padding: 30px 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  position: relative;
  text-align: center;
}

.section-title {
  font-size: 35px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  color: #4a90e2; 
  margin-top: 85px;
  margin-bottom: 20px;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 12px rgba(13, 111, 229, 0.15);
  border-radius: 8px;
}

.user-table th, .user-table td {
  padding: 12px;
  font-size: 16px;
  color: #333;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  background-color:#0db4f3; 
  color: white;
  font-weight: bold;
}

.user-table tbody tr {
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

.user-table tbody tr:hover {
  background-color: rgba(13, 111, 229, 0.1); 
  box-shadow: 0 4px 12px rgba(13, 111, 229, 0.2);
}

.action-icons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.pagination-button {
  background-color:#0db4f3; 
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.pagination-button.active,
.pagination-button:hover {
  background-color: #4a90e2; 
  box-shadow: 0 4px 8px rgba(13, 111, 229, 0.3);
}

.floating-add-button {
  background-color: #ffffff; 
  color: #4a90e2; 
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(5, 164, 200, 0.3); 
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.3s, color 0.3s, box-shadow 0.3s;
}

.floating-add-button:hover {
  background: linear-gradient(135deg, #62bff6, #66e2b7); 
  color: #ffffff; 
  box-shadow: 0 6px 12px rgba(102, 189, 240, 0.4); 
}
</style>
