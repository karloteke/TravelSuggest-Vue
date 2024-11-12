import type { Destination } from "@/core/destination";
import { defineStore } from 'pinia';
import { reactive } from 'vue';


export const useDestinationStore = defineStore('destinations', () => {
    const destinations = reactive<Destination[]>([]);

    async function fetchAllDestinations() {
        try {
            const response = await fetch('http://localhost:5146/Destination');
            
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de destinos');
            }

            const destinationsData = await response.json();
            console.log('Destinos recibidos:', destinationsData);

            // Actualiza el array reactivo de destinos
            destinations.splice(0, destinations.length, ...destinationsData);
        } catch (error) {
            console.error('Error al obtener destinos:', error);
        }
    }

    return {
        destinations,
        fetchAllDestinations,
    };
});
