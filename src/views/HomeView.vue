<template>
  <div class="home-container">
    <video class="background-video" autoplay muted playsinline>
      <source src="/videos/video.mp4" type="video/mp4" />
      Tu navegador no soporta el elemento de video.
    </video>

    <div class="overlay-content">
      <h1>Bienvenidos a TravelSuggest</h1>
      <p>Explora el mundo de forma responsable</p>
    </div>
  </div>

  <div class="description-content">
    <h2>¿Cómo Funciona TravelSuggest?</h2>
    <p>
      En TravelSuggest, tienes la libertad de explorar una gran variedad de destinos y sugerencias 
      de viaje compartidas por nuestra comunidad de viajeros. Sin embargo, si quieres 
      contribuir y agregar destinos nuevos o tus propias recomendaciones, es necesario que te registres.
    </p>
    <p>
      Al unirte, no solo serás parte de una comunidad de viajeros, sino que también 
      recibirás puntos por cada contribución que hagas, los cuales podrás canjear por recompensas 
      exclusivas. ¡Cuantos más destinos y sugerencias compartas, más puntos ganarás!
    </p>

    <div class="points-box">
      <h3>Puntos por Participación</h3>
      <ul>
        <li>🎉 <strong>100 puntos de bienvenida</strong> al registrarte.</li>
        <li>🗺️ <strong>150 puntos por cada destino</strong> que agregues.</li>
        <li>💡 <strong>50 puntos por cada sugerencia</strong> que compartas.</li>
      </ul>
    </div>

    <div class="levels-box">
      <h3>Niveles de Recompensas</h3>
      <ul>
        <li>🥉 <strong>Nivel Bronce</strong>: 2000 puntos - Descuentos en viajes.</li>
        <li>🥈 <strong>Nivel Plata</strong>: 5000 puntos - Packs de experiencias.</li>
        <li>🥇 <strong>Nivel Oro</strong>: 10.000 puntos - Artículos de viaje.</li>
      </ul>
    </div>

    <p>
      Con estos puntos, podrás disfrutar de <strong>descuentos especiales</strong>, 
      <strong>packs de experiencias</strong> y <strong>artículos de viaje</strong> que harán 
      tus próximas aventuras aún más emocionantes. Recuerda mantener tus aportes adecuados y 
      respetuosos para que todos los viajeros puedan disfrutar de una comunidad positiva y útil.
    </p>
    <p class="text-center">
      ¡Únete hoy a nuestra comunidad de viajeros TravelSuggest!
    </p>
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
    font-size: 20px;
    color: #e0e0e0;
  }

  .description-content {
    padding: 30px;
    max-width: 85%;
    margin: 60px auto 40px;
    text-align: left;
    line-height: 1.8;
    color: #555;
  }

  .description-content h2 {
    font-size: 35px;
    color: #9aadff;
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
  .points-box, .levels-box {
    border: 1px solid #be9ffe;
    background-color: #f0f4ff;
    border-radius: 8px;
    padding: 20px;
    margin: 35px auto;
    width: 500px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .points-box h3, .levels-box h3 {
    font-size: 22px;
    color: #9aadff;
    margin-bottom: 10px;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  .points-box ul, .levels-box ul {
    list-style-type: none;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    color: #333;
  }

  .points-box li, .levels-box li {
    font-size: 17px;
    margin: 8px 0;
    position: relative;
  }

  .text-center{
    display: flex;
    justify-content: center;
  }
</style>
