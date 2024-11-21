import type { Destination } from '@/core/destination'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useDestinationStore = defineStore('destinations', () => {
  const destinations = reactive<Destination[]>([])

  async function fetchAllDestinations() {
    try {
      const response = await fetch('http://localhost:5146/Destination')

      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de destinos')
      }

      const destinationsData = await response.json()
      console.log('Destinos recibidos:', destinationsData)

      // Actualiza el array reactivo de destinos
      destinations.splice(0, destinations.length, ...destinationsData)
    } catch (error) {
      console.error('Error al obtener destinos:', error)
    }
  }

  async function addDestination(newDestination: Destination, userId: number) {
    try {
      const response = await fetch(`http://localhost:5146/Destination?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDestination),
      })

      if (response.ok) {
        const createdDestination = await response.json()
        console.log('Destino añadido satisfactoriamente:', createdDestination)

        fetchAllDestinations() // Actualizar la lista de destinos
      } else {
        const errorMessage = await response.text()
        console.error('Fallo al añadir el destino:', errorMessage)
      }
    } catch (error) {
      console.error('Error al añadir destino:', error)
    }
  }

  // Función para encontrar un destino por ID en el store
  function getDestinationById(destinationId: number): Destination | undefined {
    return destinations.find((destination) => destination.id === destinationId)
  }

  // Función para obtener un destino por ID desde el servidor
  async function fetchDestinationById(destinationId: number): Promise<Destination | undefined> {
    try {
      const response = await fetch(`http://localhost:5146/Destination/${destinationId}`)
      if (!response.ok) {
        throw new Error('No se pudo obtener el usuario')
      }
      const destinationData: Destination = await response.json()
      return destinationData
    } catch (error) {
      console.error('Error al obtener el destino:', error)
      return undefined // Asegura que retorna undefined en caso de error
    }
  }

  async function updateDestination(destinationId: number, payload: unknown) {
    try {
      const response = await fetch(`http://localhost:5146/Destination/${destinationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Error al actualizar el destino')
      }

      console.log('Destino actualizado:', await response.json())
    } catch (error) {
      console.error('Error en updateDestination:', error)
    }
  }

  async function deleteDestination(destinationId: number) {
    try {
      const response = await fetch(`http://localhost:5146/Destination/${destinationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        console.log(`Destino con ID ${destinationId} borrado satisfactoriamente`)
        await fetchAllDestinations()
      } else {
        const errorMessage = await response.text()
        console.error('Fallo al borrar el destino:', errorMessage)
      }
    } catch (error) {
      console.error('Error al borrar el destino:', error)
    }
  }

  return {
    destinations,
    fetchAllDestinations,
    addDestination,
    getDestinationById,
    fetchDestinationById,
    updateDestination,
    deleteDestination,
  }
})
