import type { Suggestion, SuggestionQueryParameters } from '@/core/suggestion'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useLoginStore } from './loginStore'
import { API_BASE_URL } from '@/config'
import { useUserStore } from './userStore'

export const useSuggestionStore = defineStore('suggestions', () => {
  const suggestions = reactive<Suggestion[]>([])
  const { getToken, getUserId } = useLoginStore()
  const userStore = useUserStore()

  async function fetchAllSuggestions() {
    try {
      const token = getToken()

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`${API_BASE_URL}/Suggestion`, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de sugerencias')
      }

      const suggestionsData = await response.json()
      console.log('Sugerencias recibidas:', suggestionsData)

      // Actualiza el array reactivo de sugerencias
      suggestions.splice(0, suggestions.length, ...suggestionsData)
    } catch (error) {
      console.error('Error al obtener sugerencias:', error)
    }
  }

  async function addSuggestion(newSuggestion: Partial<Suggestion>, destinationId: number) {
    try {
      const token = getToken()
      const userId = getUserId()

      const suggestionPayload = {
        ...newSuggestion,
        userId: userId,
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`${API_BASE_URL}/Suggestion?destinationId=${destinationId}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(suggestionPayload),
        },
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error(
          `Error al añadir la sugerencia: Código ${response.status}, Mensaje: ${errorText}`,
        )
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      const createdSuggestion = await response.json()
      console.log('Sugerencia añadida satisfactoriamente:', createdSuggestion)

      suggestions.unshift(createdSuggestion) // Insertar la nueva sugerencia al inicio del array 
      await userStore.fetchCurrentUser() // Actualiza los puntos del usuario

    } catch (error) {
      console.error('Error al añadir la sugerencia:', error)
    }
  }

  // Función para obtener una sugerencia por ID desde el store
  function getSuggestionById(suggestionId: number): Suggestion | undefined {
    return suggestions.find((suggestion) => suggestion.id === suggestionId)
  }

  // Función para obtener una sugerencia por ID desde el servidor
  async function fetchSuggestionById(suggestionId: number): Promise<Suggestion | undefined> {
    try {
      const token = getToken()
      console.log('Token en fetchSuggestionById:', token)

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`${API_BASE_URL}/Suggestion/${suggestionId}`, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        throw new Error('No se pudo obtener la sugerencia')
      }
      const suggestionData: Suggestion = await response.json()
      return suggestionData
    } catch (error) {
      console.error('Error al obtener la sugerencia:', error)
      return undefined // Retorna undefined en caso de error
    }
  }

  async function updateSuggestion(suggestionId: number, payload: unknown) {
    try {
      const token = getToken()
      const response = await fetch(`${API_BASE_URL}/Suggestion/${suggestionId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(`Error al actualizar la sugerencia: ${errorMessage}`)
      }

      console.log('Sugerencia actualizada:', await response.json())
    } catch (error) {
      console.error('Error en updateSuggestion:', error)
    }
  }

  async function deleteSuggestion(suggestionId: number) {
    console.log('deleteSuggestion called with ID:', suggestionId)
    try {
      const token = getToken()
      const response = await fetch(`${API_BASE_URL}/Suggestion/${suggestionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        console.log(`Sugerencia con ID ${suggestionId} borrado satisfactoriamente`)
        await fetchAllSuggestions()
        await userStore.fetchCurrentUser() // Actualiza los puntos del usuario
      } else {
        const errorMessage = await response.text()
        console.error('Fallo al borrar la sugerencia:', errorMessage)
      }
    } catch (error) {
      console.error('Error al borrar la sugerencia:', error)
    }
  }

  async function fetchSuggestionsByDestinationId(destinationId: number): Promise<Suggestion[]> {
    try {
      const response = await fetch(
        `https://localhost:7193/Suggestion?destinationId=${destinationId}`,
      )

      if (!response.ok) {
        throw new Error('No se pudieron obtener las sugerencias para este destino')
      }

      const suggestionsData: Suggestion[] = await response.json()
      return suggestionsData
    } catch (error) {
      console.error('Error al obtener las sugerencias por destino:', error)
      return []
    }
  }

  async function fetchSuggestions(filters: SuggestionQueryParameters = {}) {
    try {
      // Construir parámetros de consulta a partir de filtros
      const queryParams = new URLSearchParams()

      if (filters.minPrice !== undefined) queryParams.append('minPrice', String(filters.minPrice))
      if (filters.maxPrice !== undefined) queryParams.append('maxPrice', String(filters.maxPrice))
      if (filters.rating !== undefined) queryParams.append('rating', String(filters.rating))

      // Hacer la solicitud con los filtros aplicados
      const response = await fetch(`${API_BASE_URL}/Suggestion?${queryParams.toString()}`)

      if (response.ok) {
        // Si la respuesta es exitosa, procesa los datos
        const suggestionData: Suggestion[] = await response.json()
        suggestions.splice(0, suggestions.length, ...suggestionData)

        return suggestionData.length === 0 ? 'noResults' : 'success'
      } else if (response.status === 404) {
        suggestions.splice(0, suggestions.length) // Si no se encontraron resultados, vacía el array
        return 'noResults'
      } else {
        throw new Error('No se pudo obtener la lista de destinos')
      }
    } catch (error) {
      console.error('Error al obtener destinos:', error)
      suggestions.splice(0, suggestions.length) // Aseguramos que las experiencias queden vacías
      return 'error' // Retorna 'error' para casos graves
    }
  }

  return {
    suggestions,
    fetchAllSuggestions,
    addSuggestion,
    getSuggestionById,
    fetchSuggestionById,
    updateSuggestion,
    deleteSuggestion,
    fetchSuggestionsByDestinationId,
    fetchSuggestions,
  }
})
