FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Aceptar el argumento de construcción para la URL base de la API
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# Define la imagen base para la etapa de producción
FROM nginx:1.19.0-alpine

# Copia los archivos estáticos generados en la etapa de construcción al directorio de contenido de Nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Inicia el servidor nginx cuando se ejecute el contenedor
CMD ["nginx", "-g", "daemon off;"]
