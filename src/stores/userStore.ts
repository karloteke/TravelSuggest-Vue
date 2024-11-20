import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { User, UserUpdate } from '@/core/user'

export const useUserStore = defineStore('users', () => {
  const users = reactive<User[]>([])

  async function fetchAll() {
    try {
      const response = await fetch('http://localhost:5146/User')

      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de usuarios')
      }

      const usersData = await response.json()
      console.log('Usuarios recibidos:', usersData)

      // Actualiza el array reactivo de usuarios
      users.splice(0, users.length, ...usersData)
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
    }
  }

  async function addUser(newUser: User) {
    try {
      const response = await fetch('http://localhost:5146/User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      if (response.ok) {
        const createdUser = await response.json()
        console.log('Usuario añadido satisfactoriamente:', createdUser)
        await fetchAll()
      } else {
        const errorMessage = await response.text()
        console.error('Fallo al añadir el usuario:', errorMessage)
      }
    } catch (error) {
      console.error('Error al añadir usuario:', error)
    }
  }

  // Función para encontrar un usuario por ID en el store
  function getUserById(userId: number): User | undefined {
    return users.find((user) => user.id === userId)
  }

  // Función para obtener un usuario por ID desde el servidor
  async function fetchUserById(userId: number): Promise<User | undefined> {
    try {
      const response = await fetch(`http://localhost:5146/User/${userId}`)
      if (!response.ok) {
        throw new Error('No se pudo obtener el usuario')
      }
      const userData: User = await response.json()
      return userData
    } catch (error) {
      console.error('Error al obtener el usuario:', error)
      return undefined // Asegura que retorna undefined en caso de error
    }
  }

  async function updateUser(userId: number, payload: Partial<UserUpdate>) {
    try {
      const response = await fetch(`http://localhost:5146/User/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Error al actualizar el usuario')
      }

      console.log('Usuario actualizado:', await response.json())
    } catch (error) {
      console.error('Error en updateUser:', error)
    }
  }

  async function deleteUser(userId: number) {
    try {
      const response = await fetch(`http://localhost:5146/User/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        console.log(`Usuario con ID ${userId} borrado satisfactoriamente`)
        await fetchAll()
      } else {
        const errorMessage = await response.text()
        console.error('Fallo al borrar el usuario:', errorMessage)
      }
    } catch (error) {
      console.error('Error al borrar el usuario:', error)
    }
  }

  // Función para encontrar un usuario por nombre
  function findUserName(userName: string) {
    return users.find((user: { userName: string }) => user.userName === userName)
  }

  return {
    users,
    fetchAll,
    addUser,
    updateUser,
    getUserById,
    fetchUserById,
    deleteUser,
    findUserName,
  }
})
