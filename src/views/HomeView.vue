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
      contribuir y agregar destionos nuevos o tus propias recomendaciones, es necesario que te registres.
    </p>
    <p>
      Al unirte, no solo serás parte de una comunidad de viajeros, sino que también 
      recibirás puntos por cada contribución que hagas, los cuales podrás canjear por recompensas 
      exclusivas. ¡Cuantos más destinos y sugerencias compartas, más puntos ganarás!
    </p>

    <div class="points-box">
      <h3>Beneficios de Registrarte:</h3>
      <ul>
        <li>🎉 <strong>100 puntos de bienvenida</strong> al registrarte.</li>
        <li>🗺️ <strong>150 puntos por cada destino</strong> que agregues.</li>
        <li>💡 <strong>50 puntos por cada sugerencia</strong> que compartas.</li>
      </ul>
    </div>

    <p>
      Con estos puntos, podrás disfrutar de <strong>descuentos especiales</strong>, 
      <strong>packs de experiencias únicas</strong> y <strong>artículos de viaje</strong> que harán 
      tus próximas aventuras aún más emocionantes. Recuerda mantener tus aportes adecuados y 
      respetuosos para que todos los viajeros puedan disfrutar de una comunidad positiva y útil.
    </p>
    <p>
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
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  .description-content {
    padding: 30px;
    max-width: 85%;
    margin: 60px auto 40px;
    text-align: left;
    line-height: 1.8;
    color: #555;
    font-family: 'Open Sans', sans-serif;
  }

  .description-content h2 {
    font-size: 28px;
    color: #4a4a4a;
    margin-bottom: 15px;
    font-family:Open sans;
  }

  .description-content p {
    font-size: 18px;
    color: #444;
    text-align: justify;
    margin-bottom: 20px;
  }

  .points-box {
    background-color: #e9f1ff;
    border: 2px solid #9aadff;
    border-radius: 8px;
    padding: 20px;
    margin: 20px auto;
    width: 500px;
    text-align: center;
  }

  .points-box h3 {
    font-size: 1.4em;
    color: #4a4a4a;
    margin-bottom: 10px;
  }

  .points-box ul {
    list-style-type: none;
    padding: 0;
  }

  .points-box li {
    font-size: 1.1em;
    color: #333;
    margin: 8px 0;
    padding-left: 20px;
    position: relative;
  }
</style>