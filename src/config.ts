// Esta variable leerá la URL desde las variables de entorno definidas por Vite (import.meta.env)
// Local (npm run dev): usa https://localhost:7193 por defecto
// Docker: se inyecta VITE_API_BASE_URL=http://localhost:2001 como build arg
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7193'
