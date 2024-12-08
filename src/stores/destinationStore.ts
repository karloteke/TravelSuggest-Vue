import type { Destination, DestinationQueryParameters } from '@/core/destination'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useLoginStore } from './loginStore'


export const useDestinationStore = defineStore('destinations', () => {
  const destinations = reactive<Destination[]>([])
  const loginStore = useLoginStore()
  const { getToken, getUserId } = loginStore

  async function fetchAllDestinations() {
    try {
      const token = getToken()

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch('https://localhost:7193/Destination', {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de destinos')
      }

      const destinationsData = await response.json()
      console.log('Destinos recibidos:', destinationsData)

      destinations.splice(0, destinations.length, ...destinationsData) // Actualiza el array reactivo de destinos
    } catch (error) {
      console.error('Error al obtener destinos:', error)
    }
  }

  async function addDestination(newDestination: Partial<Destination>) {
    try {
      const token = getToken()
      const userId = getUserId()

      const response = await fetch(`https://localhost:7193/Destination?userId=${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDestination),
      })

      if (response.ok) {
        const createdDestination = await response.json()
        console.log('Destino añadido satisfactoriamente:', createdDestination)

        destinations.unshift(createdDestination) //Insertamos el destino al inicio del array actual 
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
      const token = getToken()
      console.log('Token en fetchDestinationById:', token)

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`https://localhost:7193/Destination/${destinationId}`, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        throw new Error('No se pudo obtener el destino')
      }
      const destinationData: Destination = await response.json()
      return destinationData
    } catch (error) {
      console.error('Error al obtener el destino:', error)
      return undefined // Asegura que retorna undefined en caso de error
    }
  }

  async function updateDestination(destinationId: number, payload: Partial<Destination>) {
    try {
      const token = getToken()
      const response = await fetch(`https://localhost:7193/Destination/${destinationId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Error al actualizar el destino')
      }

      const updatedDestination: Destination = await response.json()
      const index = destinations.findIndex((d) => d.id === destinationId)
      if (index !== -1) {
        destinations[index] = updatedDestination
      }
      console.log('Destino actualizado:', updatedDestination)
    } catch (error) {
      console.error('Error en updateDestination:', error)
    }
  }

  async function deleteDestination(destinationId: number) {
    try {
      const token = getToken()
      const response = await fetch(`https://localhost:7193/Destination/${destinationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        console.log(`Destino con ID ${destinationId} borrado satisfactoriamente`)
        const index = destinations.findIndex((d) => d.id === destinationId)
        if (index !== -1) {
          destinations.splice(index, 1)
        }

      } else {
        const errorMessage = await response.text()
        console.error('Fallo al borrar el destino:', errorMessage)
      }
    } catch (error) {
      console.error('Error al borrar el destino:', error)
    }
  }

  async function fetchDestinations(filters: DestinationQueryParameters = {}) {
    try {
      // Construir parámetros de consulta a partir de filtros
      const queryParams = new URLSearchParams()

      if (filters.cityName) queryParams.append('cityName', filters.cityName)
      if (filters.season) queryParams.append('season', filters.season)
      if (filters.category) queryParams.append('category', filters.category)
      if (typeof filters.isPopular === 'boolean') {
        queryParams.append('isPopular', filters.isPopular.toString())
      }

      // Hacer la solicitud con los filtros aplicados
      const response = await fetch(`https://localhost:7193/Destination?${queryParams.toString()}`)

      if (response.ok) {
        // Si la respuesta es exitosa, procesa los datos
        const destinationsData: Destination[] = await response.json()
        destinations.splice(0, destinations.length, ...destinationsData)

        return destinationsData.length === 0 ? 'noResults' : 'success'
      } else if (response.status === 404) {
        destinations.splice(0, destinations.length) // Si no se encontraron resultados, vacía el array
        return 'noResults'
      } else {
        throw new Error('No se pudo obtener la lista de destinos')
      }
    } catch (error) {
      console.error('Error al obtener destinos:', error)
      destinations.splice(0, destinations.length) // Aseguramos que los destinos queden vacíos
      return 'error' // Retorna 'error' para casos graves
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
    fetchDestinations,
  }
})
