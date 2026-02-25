<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

const userStore = useUserStore()
const { users, deleteUser } = useUserStore()
const router = useRouter()
const pageSize = 6
const currentPage = ref(1)

const deleteConfirmDialog = ref(false)
const userToDelete = ref<number | null>(null)

onMounted(async () => {
  await userStore.fetchAll()
})

const handleAddUser = () => router.push('/add-user')
const handleEditUser = (userId: number) => router.push(`/edit-user/${userId}`)

const openDeleteConfirmDialog = (userId: number) => {
  userToDelete.value = userId
  deleteConfirmDialog.value = true
}

const confirmDeleteUser = async () => {
  if (userToDelete.value !== null) {
    await deleteUser(userToDelete.value)
    deleteConfirmDialog.value = false
    userToDelete.value = null
  }
}

const totalPages = computed(() => Math.ceil(users.length / pageSize))
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return users.slice(start, start + pageSize)
})
const changePage = (page: number) => { currentPage.value = page }
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8 mt-16">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <h1 class="text-3xl font-bold text-primary">Usuarios de TravelSuggest</h1>
      <button @click="handleAddUser"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary font-semibold rounded-full shadow-md hover:bg-linear-to-r hover:from-accent-light hover:to-emerald-300 hover:text-white transition-all duration-300">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/>
        </svg>
        Agregar Usuario
      </button>
    </div>

    <!-- Desktop Table -->
    <div class="hidden md:block bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-linear-to-r from-primary to-accent text-white">
              <th class="px-6 py-4 text-left text-sm font-semibold">Id</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Nombre Usuario</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Email</th>
              <th class="px-6 py-4 text-center text-sm font-semibold">Puntos</th>
              <th class="px-6 py-4 text-center text-sm font-semibold">Rol</th>
              <th class="px-6 py-4 text-center text-sm font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-blue-50/50 transition-colors duration-150">
              <td class="px-6 py-4 text-sm text-gray-500 font-mono">{{ user.id }}</td>
              <td class="px-6 py-4 text-sm font-medium text-gray-800">{{ user.userName }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>
              <td class="px-6 py-4 text-center">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
                  <svg class="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                  {{ user.points }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="px-3 py-1 rounded-full text-xs font-semibold"
                  :class="user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-sky-100 text-sky-700'">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <div class="inline-flex items-center gap-2">
                  <button @click="handleEditUser(user.id)" class="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors" title="Editar">
                    <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></svg>
                  </button>
                  <button @click="openDeleteConfirmDialog(user.id)" class="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors" title="Eliminar">
                    <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Cards -->
    <div class="md:hidden space-y-4">
      <div v-for="user in paginatedUsers" :key="'m-'+user.id" class="bg-white rounded-xl shadow-md border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-3">
          <span class="text-lg font-semibold text-gray-800">{{ user.userName }}</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold"
            :class="user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-sky-100 text-sky-700'">{{ user.role }}</span>
        </div>
        <p class="text-sm text-gray-500 mb-1">{{ user.email }}</p>
        <div class="flex items-center justify-between mt-3">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
            <svg class="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            {{ user.points }} pts
          </span>
          <div class="flex items-center gap-2">
            <button @click="handleEditUser(user.id)" class="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></svg></button>
            <button @click="openDeleteConfirmDialog(user.id)" class="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-8">
      <button v-for="page in totalPages" :key="page" @click="changePage(page)"
        class="w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200"
        :class="currentPage === page
          ? 'bg-linear-to-r from-primary to-accent text-white shadow-md shadow-primary/25'
          : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'">
        {{ page }}
      </button>
    </div>

    <!-- Delete Modal -->
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="deleteConfirmDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" @click.self="deleteConfirmDialog = false">
        <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 rounded-full bg-red-100">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900">Confirmar Eliminacion</h3>
          </div>
          <p class="text-gray-600 mb-6">Estas seguro de que deseas eliminar este usuario? Esta accion no se puede deshacer.</p>
          <div class="flex gap-3 justify-end">
            <button @click="deleteConfirmDialog = false" class="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Cancelar</button>
            <button @click="confirmDeleteUser" class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors shadow-sm">Eliminar</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
