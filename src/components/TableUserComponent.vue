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
const changePage = (page: number) => {
  currentPage.value = page
}
</script>

<template>
  <div
    class="min-h-screen py-12 px-4 relative overflow-hidden"
    style="
      background: linear-gradient(
        135deg,
        #f0f4ff 0%,
        #e8f0fe 25%,
        #f5f0ff 50%,
        #eef7f2 75%,
        #fef9f0 100%
      );
    "
  >
    <!-- Decorative background shapes -->
    <div
      class="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-120 h-120 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-200/10 rounded-full blur-3xl -translate-x-1/2"
    ></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-10">
        <div
          class="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Gestion de usuarios
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 font-serif mb-4">
          USUARIOS DE TRAVELSUGGEST
        </h1>
        <p class="max-w-3xl mx-auto text-gray-500 leading-relaxed">
          Administra los usuarios de la plataforma. Puedes editar, eliminar o agregar nuevos
          usuarios desde aqui.
        </p>
      </div>

      <!-- Add button -->
      <div class="flex justify-start mb-8">
        <button
          @click="handleAddUser"
          class="group/btn flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-accent text-white font-semibold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
        >
          <svg
            class="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Agregar Usuario
        </button>
      </div>

      <!-- Desktop Table -->
      <div
        class="hidden md:block bg-white/80 backdrop-blur-sm rounded-2xl shadow-md shadow-gray-200/50 border border-white/60 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-linear-to-r from-primary to-accent text-white">
                <th class="px-6 py-4 text-left text-sm font-semibold">Nombre Usuario</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th class="px-6 py-4 text-center text-sm font-semibold">Puntos</th>
                <th class="px-6 py-4 text-center text-sm font-semibold">Rol</th>
                <th class="px-6 py-4 text-center text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100/80">
              <tr
                v-for="user in paginatedUsers"
                :key="user.id"
                class="hover:bg-primary/5 transition-colors duration-200"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-9 h-9 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold text-sm"
                    >
                      {{ user.userName.charAt(0).toUpperCase() }}
                    </div>
                    <span class="text-sm font-semibold text-gray-800">{{ user.userName }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold"
                  >
                    <svg class="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                      />
                    </svg>
                    {{ user.points }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-semibold"
                    :class="
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-sky-100 text-sky-700'
                    "
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <div class="inline-flex items-center gap-2">
                    <button
                      @click="handleEditUser(user.id)"
                      class="p-2.5 text-primary bg-primary/5 rounded-xl hover:bg-primary/15 hover:shadow-sm transition-all duration-200"
                      title="Editar"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="openDeleteConfirmDialog(user.id)"
                      class="p-2.5 text-red-500 bg-red-50/80 rounded-xl hover:bg-red-100 hover:shadow-sm transition-all duration-200"
                      title="Eliminar"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
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
        <div
          v-for="user in paginatedUsers"
          :key="'m-' + user.id"
          class="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-md shadow-gray-200/50 border border-white/60 p-5 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold text-sm"
              >
                {{ user.userName.charAt(0).toUpperCase() }}
              </div>
              <span class="text-lg font-semibold text-gray-800">{{ user.userName }}</span>
            </div>
            <span
              class="px-3 py-1 rounded-full text-xs font-semibold"
              :class="
                user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-sky-100 text-sky-700'
              "
            >
              {{ user.role }}
            </span>
          </div>
          <p class="text-sm text-gray-500 mb-1">{{ user.email }}</p>
          <div class="flex items-center justify-between mt-4 pt-3 border-t border-gray-100/80">
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold"
            >
              <svg class="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                />
              </svg>
              {{ user.points }} pts
            </span>
            <div class="flex items-center gap-2">
              <button
                @click="handleEditUser(user.id)"
                class="p-2.5 text-primary bg-primary/5 rounded-xl hover:bg-primary/15 transition-all duration-200"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                @click="openDeleteConfirmDialog(user.id)"
                class="p-2.5 text-red-500 bg-red-50/80 rounded-xl hover:bg-red-100 transition-all duration-200"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-16">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="[
            'w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300',
            currentPage === page
              ? 'bg-linear-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 scale-110'
              : 'bg-white/80 backdrop-blur-sm text-gray-600 border border-gray-200/60 hover:border-primary hover:text-primary hover:shadow-md',
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>

  <!-- Delete Modal -->
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="deleteConfirmDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-sm"
        @click="deleteConfirmDialog = false"
      ></div>
      <div class="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full">
        <h3 class="text-xl font-bold text-gray-800 mb-2">Confirmar Eliminacion</h3>
        <p class="text-gray-600 mb-6">
          Estas seguro de que deseas eliminar este usuario? Esta accion no se puede deshacer.
        </p>
        <div class="flex gap-3">
          <button
            @click="confirmDeleteUser"
            class="flex-1 py-2.5 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
          >
            Si, eliminar
          </button>
          <button
            @click="deleteConfirmDialog = false"
            class="flex-1 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
