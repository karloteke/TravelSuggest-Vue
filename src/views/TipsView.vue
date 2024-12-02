<script setup lang="ts">

</script>

<template>
  <div class="tips-container">
    <h1>CONSEJOS PARA UN VIAJE RESPONSABLE</h1>
    <p class="intro">
      En TravelSuggest, nos apasiona hacer que los viajes sean inolvidables, pero también responsables. Por eso, hemos creado esta sección para compartir simples, pero efectivos consejos que pueden ayudarte a reducir tu impacto ambiental. ¡Un viaje consciente es un viaje mejor!
    </p>

    <section class="tip">
      <h2>🚴‍♂️ Usa Transporte Público o Medios Ecológicos</h2>
      <p>
        Desplazarse en transporte público, en bicicleta o caminando es una excelente manera de reducir la huella de carbono. Al optar por estos medios, no solo cuidas el planeta, sino que también te permite vivir el destino de una forma más auténtica y cercana.
      </p>
    </section>

    <section class="tip">
      <h2>♻️ Reduce el Uso de Plásticos de un Solo Uso</h2>
      <p>
        Una de las formas más simples de cuidar el entorno es llevar contigo una botella de agua reutilizable y bolsas de tela. Esto reduce la cantidad de residuos plásticos y ayuda a mantener limpios los lugares que visitas. Cada pequeña acción cuenta para un planeta más limpio.
      </p>
    </section>

    <section class="tip">
      <h2>🐾 Respeta la Flora y Fauna Local</h2>
      <p>
        La naturaleza es el hogar de muchas especies y ecosistemas. Es fundamental no dejar basura, no arrancar plantas ni molestar a los animales. Sigue siempre las indicaciones de conservación y mantén una distancia prudente para proteger la biodiversidad.
      </p>
    </section>

    <section class="tip">
      <h2>🛍️ Apoya a los Negocios Locales</h2>
      <p>
        Opta por alojarte en hospedajes familiares, comprar en tiendas locales y comer en restaurantes de la zona. Así, ayudas a las economías locales a prosperar y tienes una experiencia más auténtica y enriquecedora. Si compras recuerdos, elige productos artesanales hechos por los artesanos del lugar.
      </p>
    </section>

    <section class="tip">
      <h2>🌐 Infórmate y Respeta la Cultura Local</h2>
      <p>
        Antes de llegar, toma un tiempo para conocer las costumbres y normas culturales. Aprender algunas frases en el idioma local, como “hola” y “gracias”, puede hacer una gran diferencia. Mostrar interés y respeto por la cultura local mejorará tu experiencia de viaje.
      </p>
    </section>

    <p class="closing">
      En TravelSuggest, creemos que viajar es una oportunidad para descubrir y cuidar. Al seguir estos consejos, te unes a un movimiento de viajeros conscientes que ayudan a preservar el mundo para futuras generaciones. ¡Gracias por ser parte de este cambio!
    </p>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
  .tips-container {
    padding: 40px 30px;
    max-width: 800px;
    margin: auto;
    line-height: 1.8;
    color: #333;
  }

  h1 {
    font-size: 32px;
    font-weight: bold;
    color:#4a90e2; 
    text-align: center;
    margin-top: 70px;
    margin-bottom: 20px;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  .intro, .closing {
    margin-bottom: 20px;
    color: #555;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
  }

  .tip {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #f0f4ff;
    border-left: 6px solid #05a4c8;
    border-radius: 8px;
  
  }

  .tip h2 {
    font-size: 23px;
    color: #4a4a4a;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #444;
    text-align: justify;
    font-family: 'Open Sans', sans-serif;
  }
</style>
