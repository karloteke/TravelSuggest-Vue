<template>
  <div>
    <!-- Hero con video -->
    <section class="relative w-full h-screen overflow-hidden">
      <video class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline>
        <source src="/videos/video.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
          BIENVENIDOS A <span class="text-accent-light">TRAVELSUGGEST</span>
        </h1>
        <p class="mt-4 text-lg md:text-2xl text-gray-200 font-light max-w-2xl">
          Conectando aventuras y destinos
        </p>
        <a href="#como-funciona" class="mt-8 px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300">
          Descubre mas
        </a>
      </div>
    </section>

    <!-- Como funciona -->
    <section id="como-funciona" class="py-20 px-4 bg-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-primary font-serif mb-6">
          COMO FUNCIONA TRAVELSUGGEST
        </h2>
        <div class="space-y-5 text-left md:text-justify">
          <p class="text-lg text-gray-600 leading-relaxed">
            En TravelSuggest, puedes explorar una gran variedad de destinos y sugerencias de viaje
            compartidas por nuestra comunidad de viajeros. Si quieres contribuir con tus propios destinos
            o recomendaciones, es necesario registrarte.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            Al registrarte, recibiras puntos por tus contribuciones que podras canjear por recompensas
            exclusivas. Cuantos mas destinos y sugerencias compartas, mas puntos ganaras.
            <strong class="text-primary">Unete hoy y se parte de la comunidad TravelSuggest!</strong>
          </p>
        </div>
      </div>
    </section>

    <!-- Puntos y Recompensas -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <!-- Puntos -->
        <div class="bg-white rounded-2xl p-8 shadow-md border border-primary/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-primary">PUNTOS POR PARTICIPACION</h3>
          </div>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <span class="text-2xl">🎉</span>
              <span class="text-gray-700"><strong class="text-gray-900">100 puntos de bienvenida</strong> al registrarte.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-2xl">🗺️</span>
              <span class="text-gray-700"><strong class="text-gray-900">150 puntos por cada destino</strong> que agregues.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-2xl">💡</span>
              <span class="text-gray-700"><strong class="text-gray-900">50 puntos por cada sugerencia</strong> que compartas.</span>
            </li>
          </ul>
        </div>

        <!-- Niveles -->
        <div class="bg-white rounded-2xl p-8 shadow-md border border-primary/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-primary">NIVELES DE RECOMPENSAS</h3>
          </div>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <span class="text-2xl">🥉</span>
              <span class="text-gray-700"><strong class="text-gray-900">Nivel Bronce</strong>: 2000 puntos - Descuentos en viajes.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-2xl">🥈</span>
              <span class="text-gray-700"><strong class="text-gray-900">Nivel Plata</strong>: 5000 puntos - Packs de experiencias.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-2xl">🥇</span>
              <span class="text-gray-700"><strong class="text-gray-900">Nivel Oro</strong>: 10.000 puntos - Articulos de viaje.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Bases de canje -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-3xl mx-auto">
        <p class="text-lg text-gray-600 mb-6">
          Los puntos que acumules pueden canjearse por recompensas siguiendo estas bases:
        </p>
        <div class="space-y-4">
          <div class="flex items-start gap-3 p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
            <span class="text-green-500 mt-0.5">&#x2714;&#xFE0F;</span>
            <p class="text-gray-700">
              Las recompensas pueden ser canjeadas al finalizar cada trimestre (marzo, junio, septiembre,
              diciembre). Esto nos permite garantizar la disponibilidad de premios.
            </p>
          </div>
          <div class="flex items-start gap-3 p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
            <span class="text-green-500 mt-0.5">&#x2714;&#xFE0F;</span>
            <p class="text-gray-700">
              Los puntos tienen una vigencia de 12 meses desde la fecha en que los obtuviste. Usalos
              antes de que caduquen!
            </p>
          </div>
          <div class="flex items-start gap-3 p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
            <span class="text-green-500 mt-0.5">&#x2714;&#xFE0F;</span>
            <p class="text-gray-700">
              Cada contribucion es revisada por nuestro equipo para garantizar la calidad de los
              contenidos. Las recompensas se emiten solo para contribuciones aprobadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
