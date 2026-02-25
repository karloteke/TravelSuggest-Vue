<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const heroVisible = ref(false)
const howItWorksVisible = ref(false)
const rewardsVisible = ref(false)
const rulesVisible = ref(false)

const observerCallback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('data-section')
      if (id === 'how-it-works') howItWorksVisible.value = true
      if (id === 'rewards') rewardsVisible.value = true
      if (id === 'rules') rulesVisible.value = true
    }
  })
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  setTimeout(() => {
    heroVisible.value = true
  }, 200)

  observer = new IntersectionObserver(observerCallback, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px',
  })

  document.querySelectorAll('[data-section]').forEach((el) => {
    observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="overflow-hidden">
    <!-- ============ HERO CINEMATICO ============ -->
    <section class="relative w-full h-screen overflow-hidden">
      <!-- Video de fondo -->
      <video
        class="absolute inset-0 w-full h-full object-cover scale-105"
        autoplay
        muted
        loop
        playsinline
      >
        <source src="/videos/video.mp4" type="video/mp4" />
      </video>

      <!-- Overlay gradiente cinematico -->
      <div class="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/70"></div>
      <div
        class="absolute inset-0 bg-linear-to-r from-primary/20 via-transparent to-accent/10"
      ></div>

      <!-- Particulas decorativas -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"
        ></div>
        <div
          class="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float delay-300"
        ></div>
      </div>

      <!-- Contenido Hero -->
      <div
        class="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 py-12"
      >
        <!-- Badge superior -->
        <div :class="heroVisible ? 'animate-fade-in-down' : 'opacity-0'" class="mb-8">
          <span
            class="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-white/90 text-sm font-medium tracking-wide"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Comunidad activa de viajeros
          </span>
        </div>

        <!-- Titulo principal -->
        <h1
          :class="heroVisible ? 'animate-fade-in-up' : 'opacity-0'"
          class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-none tracking-tight"
          style="font-family: 'Playfair Display', serif"
        >
          <span class="block">Descubre el</span>
          <span class="block mt-2">
            <span class="shimmer-text">Mundo</span>
          </span>
        </h1>

        <!-- Subtitulo -->
        <p
          :class="heroVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'"
          class="mt-6 text-lg sm:text-xl md:text-2xl text-white/80 font-light max-w-2xl leading-relaxed tracking-wide"
        >
          Comparte destinos, descubre experiencias y conecta con viajeros que inspiran
        </p>

        <!-- CTA Buttons -->
        <div
          :class="heroVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'"
          class="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <router-link
            to="/destinations"
            class="group relative px-8 py-4 bg-white text-gray-900 font-bold rounded-full text-base overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:scale-105"
          >
            <span class="relative z-10 flex items-center gap-2">
              Explorar Destinos
              <svg
                class="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </router-link>
          <a
            href="#como-funciona"
            class="px-8 py-4 glass text-white font-semibold rounded-full text-base transition-all duration-300 hover:bg-white/20 hover:scale-105"
          >
            Como funciona
          </a>
        </div>

        <!-- Stats flotantes -->
        <div
          :class="heroVisible ? 'animate-fade-in-up delay-700' : 'opacity-0'"
          class="mt-8 flex items-center gap-6 sm:gap-10"
        >
          <div class="text-center">
            <p class="text-2xl sm:text-3xl font-extrabold text-white">100+</p>
            <p class="text-xs sm:text-sm text-white/60 mt-1 font-medium uppercase tracking-wider">
              Destinos
            </p>
          </div>
          <div class="h-10 w-px bg-white/20"></div>
          <div class="text-center">
            <p class="text-2xl sm:text-3xl font-extrabold text-white">150+</p>
            <p class="text-xs sm:text-sm text-white/60 mt-1 font-medium uppercase tracking-wider">
              Experiencias
            </p>
          </div>
          <div class="h-10 w-px bg-white/20"></div>
          <div class="text-center">
            <p class="text-2xl sm:text-3xl font-extrabold text-white">1K+</p>
            <p class="text-xs sm:text-sm text-white/60 mt-1 font-medium uppercase tracking-wider">
              Viajeros
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ COMO FUNCIONA ============ -->
    <section
      id="como-funciona"
      data-section="how-it-works"
      class="relative py-28 px-4 bg-linear-to-b from-gray-50 to-white overflow-hidden"
    >
      <!-- Decoracion de fondo -->
      <div
        class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/30 to-transparent"
      ></div>
      <div class="absolute top-20 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div class="max-w-6xl mx-auto relative">
        <!-- Header de seccion -->
        <div
          class="text-center mb-20"
          :class="howItWorksVisible ? 'animate-fade-in-up' : 'opacity-0'"
        >
          <span
            class="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Sencillo y rapido
          </span>
          <h2
            class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight"
            style="font-family: 'Playfair Display', serif"
          >
            Como funciona<br />
            <span class="text-gradient">TravelSuggest</span>
          </h2>
          <p class="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            En tres sencillos pasos, forma parte de la comunidad viajera mas inspiradora
          </p>
        </div>

        <!-- Steps Grid -->
        <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
          <!-- Step 1 -->
          <div
            :class="howItWorksVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'"
            class="group relative"
          >
            <div
              class="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              <!-- Numero -->
              <div
                class="absolute -top-5 left-8 w-10 h-10 bg-linear-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 transition-transform group-hover:scale-110 group-hover:rotate-3"
              >
                <span class="text-white font-bold text-lg">1</span>
              </div>
              <!-- Icono -->
              <div
                class="mt-4 mb-6 w-16 h-16 bg-linear-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
              >
                <svg
                  class="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Explora Destinos</h3>
              <p class="text-gray-500 leading-relaxed">
                Navega por una coleccion curada de destinos y experiencias compartidas por viajeros
                reales de todo el mundo.
              </p>
            </div>
            <!-- Conector (solo desktop) -->
            <div class="hidden md:block absolute top-1/2 -right-6 lg:-right-8 w-12 lg:w-16">
              <svg class="w-full text-primary/30" viewBox="0 0 60 20" fill="none">
                <path
                  d="M0 10h50m-8-6l8 6-8 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <!-- Step 2 -->
          <div
            :class="howItWorksVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'"
            class="group relative"
          >
            <div
              class="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              <div
                class="absolute -top-5 left-8 w-10 h-10 bg-linear-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 transition-transform group-hover:scale-110 group-hover:rotate-3"
              >
                <span class="text-white font-bold text-lg">2</span>
              </div>
              <div
                class="mt-4 mb-6 w-16 h-16 bg-linear-to-br from-emerald-50 to-green-100 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
              >
                <svg
                  class="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Registrate y Comparte</h3>
              <p class="text-gray-500 leading-relaxed">
                Crea tu perfil, anade tus destinos favoritos y comparte experiencias unicas con la
                comunidad.
              </p>
            </div>
            <div class="hidden md:block absolute top-1/2 -right-6 lg:-right-8 w-12 lg:w-16">
              <svg class="w-full text-primary/30" viewBox="0 0 60 20" fill="none">
                <path
                  d="M0 10h50m-8-6l8 6-8 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <!-- Step 3 -->
          <div
            :class="howItWorksVisible ? 'animate-fade-in-up delay-600' : 'opacity-0'"
            class="group"
          >
            <div
              class="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              <div
                class="absolute -top-5 left-8 w-10 h-10 bg-linear-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 transition-transform group-hover:scale-110 group-hover:rotate-3"
              >
                <span class="text-white font-bold text-lg">3</span>
              </div>
              <div
                class="mt-4 mb-6 w-16 h-16 bg-linear-to-br from-amber-50 to-orange-100 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
              >
                <svg
                  class="w-8 h-8 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Gana Recompensas</h3>
              <p class="text-gray-500 leading-relaxed">
                Acumula puntos por tus contribuciones y canjalos por increibles recompensas y
                experiencias exclusivas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ PUNTOS Y RECOMPENSAS - PREMIUM ============ -->
    <section
      data-section="rewards"
      class="relative py-28 px-4 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      <!-- Decoracion -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-6xl mx-auto relative">
        <!-- Header -->
        <div class="text-center mb-16" :class="rewardsVisible ? 'animate-fade-in-up' : 'opacity-0'">
          <span
            class="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Sistema de recompensas
          </span>
          <h2
            class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
            style="font-family: 'Playfair Display', serif"
          >
            Viaja, Comparte,<br />
            <span class="text-gradient-gold">Gana Premios</span>
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Puntos -->
          <div
            :class="rewardsVisible ? 'animate-slide-in-left delay-200' : 'opacity-0'"
            class="group"
          >
            <div
              class="h-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-primary/30 hover:-translate-y-1"
            >
              <div class="flex items-center gap-4 mb-8">
                <div
                  class="w-14 h-14 bg-linear-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"
                >
                  <svg
                    class="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white">Puntos por Participacion</h3>
                  <p class="text-white/50 text-sm">Cada accion suma</p>
                </div>
              </div>
              <ul class="space-y-5">
                <li
                  class="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 transition-all hover:bg-white/10"
                >
                  <div
                    class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0"
                  >
                    <span class="text-2xl">🎟️</span>
                  </div>
                  <div>
                    <p class="text-white font-bold">100 puntos</p>
                    <p class="text-white/50 text-sm">Bienvenida al registrarte</p>
                  </div>
                </li>
                <li
                  class="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 transition-all hover:bg-white/10"
                >
                  <div
                    class="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0"
                  >
                    <span class="text-2xl">💰</span>
                  </div>
                  <div>
                    <p class="text-white font-bold">150 puntos</p>
                    <p class="text-white/50 text-sm">Por cada destino agregado</p>
                  </div>
                </li>
                <li
                  class="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 transition-all hover:bg-white/10"
                >
                  <div
                    class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0"
                  >
                    <span class="text-2xl">🎉</span>
                  </div>
                  <div>
                    <p class="text-white font-bold">50 puntos</p>
                    <p class="text-white/50 text-sm">Por cada experiencia compartida</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Niveles -->
          <div
            :class="rewardsVisible ? 'animate-slide-in-right delay-400' : 'opacity-0'"
            class="group"
          >
            <div
              class="h-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-amber-400/30 hover:-translate-y-1"
            >
              <div class="flex items-center gap-4 mb-8">
                <div
                  class="w-14 h-14 bg-linear-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20"
                >
                  <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white">Niveles de Recompensas</h3>
                  <p class="text-white/50 text-sm">Cuanto mas compartes, mas ganas</p>
                </div>
              </div>
              <ul class="space-y-5">
                <li
                  class="flex items-center gap-4 p-3 rounded-2xl bg-linear-to-r from-amber-900/20 to-transparent border border-amber-800/20 transition-all hover:from-amber-900/30"
                >
                  <div
                    class="w-12 h-12 rounded-xl bg-amber-700/30 flex items-center justify-center shrink-0"
                  >
                    <span class="text-2xl">🥉</span>
                  </div>
                  <div>
                    <p class="text-amber-200 font-bold">Nivel Bronce</p>
                    <p class="text-white/50 text-sm">2.000 pts � Descuentos en viajes</p>
                  </div>
                </li>
                <li
                  class="flex items-center gap-4 p-3 rounded-2xl bg-linear-to-r from-gray-400/10 to-transparent border border-gray-500/20 transition-all hover:from-gray-400/20"
                >
                  <div
                    class="w-12 h-12 rounded-xl bg-gray-400/20 flex items-center justify-center shrink-0"
                  >
                    <span class="text-2xl">🥈</span>
                  </div>
                  <div>
                    <p class="text-gray-300 font-bold">Nivel Plata</p>
                    <p class="text-white/50 text-sm">5.000 pts � Packs de experiencias</p>
                  </div>
                </li>
                <li
                  class="flex items-center gap-4 p-3 rounded-2xl bg-linear-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 transition-all hover:from-yellow-500/20"
                >
                  <div
                    class="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0"
                  >
                    <span class="text-2xl">🥇</span>
                  </div>
                  <div>
                    <p class="text-yellow-300 font-bold">Nivel Oro</p>
                    <p class="text-white/50 text-sm">10.000 pts � Articulos de viaje premium</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ BASES DE CANJE - PREMIUM ============ -->
    <section data-section="rules" class="relative py-24 px-4 bg-white overflow-hidden">
      <div
        class="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"
      ></div>

      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-14" :class="rulesVisible ? 'animate-fade-in-up' : 'opacity-0'">
          <span
            class="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Informacion importante
          </span>
          <h2
            class="text-3xl md:text-4xl font-extrabold text-gray-900"
            style="font-family: 'Playfair Display', serif"
          >
            Bases del Canje
          </h2>
        </div>

        <div class="space-y-5">
          <div
            :class="rulesVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'"
            class="group flex items-start gap-5 p-6 bg-linear-to-r from-emerald-50/80 to-white rounded-2xl border border-emerald-100 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-100/50 hover:-translate-y-0.5"
          >
            <div
              class="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
            >
              <svg
                class="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">Canje trimestral</h4>
              <p class="text-gray-600 leading-relaxed">
                Las recompensas se canjean al finalizar cada trimestre (marzo, junio, septiembre,
                diciembre) para garantizar la disponibilidad de premios.
              </p>
            </div>
          </div>

          <div
            :class="rulesVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'"
            class="group flex items-start gap-5 p-6 bg-linear-to-r from-blue-50/80 to-white rounded-2xl border border-blue-100 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-0.5"
          >
            <div
              class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">Vigencia de 12 meses</h4>
              <p class="text-gray-600 leading-relaxed">
                Los puntos son validos durante 12 meses desde la fecha de obtencion. Usalos antes de
                que caduquen.
              </p>
            </div>
          </div>

          <div
            :class="rulesVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'"
            class="group flex items-start gap-5 p-6 bg-linear-to-r from-violet-50/80 to-white rounded-2xl border border-violet-100 transition-all duration-300 hover:shadow-lg hover:shadow-violet-100/50 hover:-translate-y-0.5"
          >
            <div
              class="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
            >
              <svg
                class="w-6 h-6 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">Calidad verificada</h4>
              <p class="text-gray-600 leading-relaxed">
                Cada contribucion es revisada por nuestro equipo para garantizar la calidad de los
                contenidos. Las recompensas se emiten solo para contribuciones aprobadas.
              </p>
            </div>
          </div>
        </div>

        <!-- CTA final -->
        <div
          :class="rulesVisible ? 'animate-fade-in-up delay-600' : 'opacity-0'"
          class="mt-16 text-center"
        >
          <div
            class="inline-flex flex-col items-center p-10 rounded-3xl bg-linear-to-br from-primary/5 via-accent/5 to-primary/5 border border-primary/10"
          >
            <p
              class="text-xl md:text-2xl font-bold text-gray-900 mb-2"
              style="font-family: 'Playfair Display', serif"
            >
              Listo para empezar tu aventura?
            </p>
            <p class="text-gray-500 mb-6 max-w-md">
              Unete a la comunidad de viajeros que descubren, comparten y ganan recompensas.
            </p>
            <router-link
              to="/add-user"
              class="group px-8 py-4 bg-linear-to-r from-primary to-accent text-white font-bold rounded-full text-base transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              <span class="flex items-center gap-2">
                Crear Cuenta Gratis
                <svg
                  class="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
