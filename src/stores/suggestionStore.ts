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
    return {
        suggestions,
        fetchAllSuggestions,
    };
});
