<template>
  <div class="home-container">
    <video class="background-video" autoplay muted playsinline>
      <source src="/videos/video.mp4" type="video/mp4" />
      Tu navegador no soporta el elemento de video.
    </video>

    <div class="overlay-content">
      <h1>BIENVENIDOS A TRAVELSUGGEST</h1>
      <p>Conectando aventuras y destinos</p>
    </div>
  </div>

  <div class="description-content">
    <h2>¿CÓMO FUNCIONA TRAVELSUGGEST?</h2>
    <p>
      En TravelSuggest, puedes explorar una gran variedad de destinos y sugerencias de viaje
      compartidas por nuestra comunidad de viajeros. Si quieres contribuir con tus propios destinos
      o recomendaciones, es necesario registrarte.
    </p>
    <p>
      Al registrarte, recibirás puntos por tus contribuciones que podrás canjear por recompensas
      exclusivas. ¡Cuantos más destinos y sugerencias compartas, más puntos ganarás!
      <strong>¡Únete hoy y sé parte de la comunidad TravelSuggest!</strong>
    </p>
  </div>

  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="points-box">
          <v-card-title>PUNTOS POR PARTICIPACIÓN</v-card-title>
          <v-card-text>
            <ul>
              <li>🎉 <strong>100 puntos de bienvenida</strong> al registrarte.</li>
              <li>🗺️ <strong>150 puntos por cada destino</strong> que agregues.</li>
              <li>💡 <strong>50 puntos por cada sugerencia</strong> que compartas.</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Caja de Niveles de Recompensas -->
      <v-col cols="12" md="6">
        <v-card class="rewards-box">
          <v-card-title>NIVELES DE RECOMPENSAS</v-card-title>
          <v-card-text>
            <ul>
              <li>🥉 <strong>Nivel Bronce</strong>: 2000 puntos - Descuentos en viajes.</li>
              <li>🥈 <strong>Nivel Plata</strong>: 5000 puntos - Packs de experiencias.</li>
              <li>🥇 <strong>Nivel Oro</strong>: 10.000 puntos - Artículos de viaje.</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <div class="rewards">
    <p>Los puntos que acumules pueden canjearse por recompensas siguiendo estas bases:</p>
    <ul>
      <li>
        Las recompensas pueden ser canjeadas al finalizar cada trimestre (marzo, junio, septiembre,
        diciembre). Esto nos permite garantizar la disponibilidad de premios.
      </li>
      <li>
        Los puntos tienen una vigencia de 12 meses desde la fecha en que los obtuviste. ¡Úsalos
        antes de que caduquen!
      </li>
      <li>
        Además, cada contribución es revisada por nuestro equipo para garantizar la calidad de los
        contenidos. Las recompensas se emiten solo para contribuciones aprobadas.
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

.home-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
}

.overlay-content h1 {
  font-size: 45px;
  color: #f0f0f0;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.overlay-content p {
  font-size: 25px;
  color: #e0e0e0;
}

.v-card-title{
  text-align: center;
  color: #4a90e2;
}

.description-content {
  max-width: 85%;
  margin: 60px auto 40px;
  text-align: left;
  line-height: 1.8;
  color: #555;
}

.description-content h2 {
  font-size: 35px;
  color: #4a90e2;
  margin-bottom: 15px;
  text-align: center;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.description-content p {
  font-size: 18px;
  color: #444;
  text-align: justify;
  margin-bottom: 20px;
  font-family: 'Open Sans', sans-serif;
}

/* Caja de puntos y niveles */
.points-box,
.rewards-box {
  border: 1px solid #0d6fe5;
  background-color: #f0f4ff;
  border-radius: 8px;
  padding: 20px;
  margin: 35px auto;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(11, 1, 93, 0.1);
  word-wrap: break-word;
  white-space: normal;
}

.points-box h3,
.rewards-box h3 {
  text-align: center;
  font-size: 22px;
  color: #4a90e2;
  margin-bottom: 10px;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.points-box ul,
.rewards-box ul {
  text-align: left; 
  list-style-type: none;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  color: #333;
}

.points-box li,
.rewards-box li {
  font-size: 17px;
  margin: 8px 0;
  position: relative;
}

.text-center {
  display: flex;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
}

.rewards {
  max-width: 85%; 
  margin: 40px auto; 
  padding: 20px; 
  line-height: 1.8; 
  font-family: 'Open Sans', sans-serif; 
  font-size: 18px;
}

.rewards p {
  margin-bottom: 15px; 
}

.rewards ul {
  list-style-type: none; 
  padding: 0; 
}

.rewards li {
  margin-bottom: 10px; 
  line-height: 1.5; 
}

.rewards li::before {
  content: '✔️';
  margin-right: 10px;
  color: #4caf50;
  font-size: 18px;
}
</style>
