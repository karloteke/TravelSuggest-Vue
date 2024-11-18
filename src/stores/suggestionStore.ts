import type { Suggestion } from '@/core/suggestion';
import { defineStore } from 'pinia';
import { reactive } from 'vue';


export const useSuggestionStore = defineStore('suggestions', () => {
    const suggestions = reactive<Suggestion[]>([]);

    async function fetchAllSuggestions() {
        try {
            const response = await fetch('http://localhost:5146/Suggestion');
            
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de sugerencias');
            }

            const suggestionsData = await response.json();
            console.log('Sugerencias recibidas:', suggestionsData);

            // Actualiza el array reactivo de destinos
            suggestions.splice(0, suggestions.length, ...suggestionsData);
        } catch (error) {
            console.error('Error al obtener sugerencias:', error);
        }
    }

    async function addSuggestion(newSuggestion: Suggestion, destinationId: number) {
      
        try {
            const response = await fetch(`http://localhost:5146/Suggestion?destinationId=${destinationId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSuggestion)
            });

            if (!response.ok) {
              // Manejo detallado de errores de respuesta
              const errorText = await response.text();
              console.error(`Error al añadir la sugerencia: Código ${response.status}, Mensaje: ${errorText}`);
              throw new Error(`Error ${response.status}: ${errorText}`);
          }

          const result = await response.json();
          console.log('Sugerencia añadida satisfactoriamente:', result);
          await fetchAllSuggestions();  // Actualizar la lista de sugerencias

        } catch (error) {
          console.error('Error al añadir la sugerencia:', error);
      }
  }

    async function deleteSuggestion(suggestionId: number) {
      console.log("deleteSuggestion called with ID:", suggestionId); 
        try {
          const response = await fetch(`http://localhost:5146/Suggestion/${suggestionId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            console.log(`Sugerencia con ID ${suggestionId} borrado satisfactoriamente`);
            await fetchAllSuggestions();
          } else {
            const errorMessage = await response.text();
            console.error('Fallo al borrar la sugerencia:', errorMessage);
          }
        } catch (error) {
          console.error('Error al borrar la sugerencia:', error);
        }
      }
    return {
        suggestions,
        fetchAllSuggestions,
        addSuggestion,
        deleteSuggestion
    };
});
