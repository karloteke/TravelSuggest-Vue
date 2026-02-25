<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
const cardsVisible = ref(false)

const observerCallback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('data-section')
      if (id === 'tips-cards') cardsVisible.value = true
    }
  })
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  setTimeout(() => { visible.value = true }, 100)

  observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  })

  document.querySelectorAll('[data-section]').forEach(el => {
    observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

const tips = [
  {
    icon: '🚲',
    color: 'emerald',
    bgFrom: 'from-emerald-500',
    bgTo: 'to-teal-600',
    iconBg: 'bg-emerald-500/10',
    borderHover: 'hover:border-emerald-200',
    title: 'Transporte Ecologico',
    description: 'Desplazarse en transporte publico, bicicleta o caminando reduce tu huella de carbono. Ademas, te permite vivir el destino de forma mas autentica y cercana.',
    tag: 'Movilidad'
  },
  {
    icon: '💧',
    color: 'blue',
    bgFrom: 'from-blue-500',
    bgTo: 'to-cyan-600',
    iconBg: 'bg-blue-500/10',
    borderHover: 'hover:border-blue-200',
    title: 'Reduce Plasticos',
    description: 'Lleva contigo botella reutilizable y bolsas de tela. Cada pequena accion cuenta para reducir residuos y mantener limpios los lugares que visitas.',
    tag: 'Sostenibilidad'
  },
  {
    icon: '🌿',
    color: 'amber',
    bgFrom: 'from-amber-500',
    bgTo: 'to-orange-600',
    iconBg: 'bg-amber-500/10',
    borderHover: 'hover:border-amber-200',
    title: 'Respeta la Naturaleza',
    description: 'No dejes basura, no arranques plantas ni molestes a los animales. Sigue las indicaciones de conservacion y protege la biodiversidad local.',
    tag: 'Naturaleza'
  },
  {
    icon: '🏪',
    color: 'rose',
    bgFrom: 'from-rose-500',
    bgTo: 'to-pink-600',
    iconBg: 'bg-rose-500/10',
    borderHover: 'hover:border-rose-200',
    title: 'Apoya lo Local',
    description: 'Hospedajes familiares, tiendas locales y restaurantes de la zona. Asi ayudas a las economias locales y vives experiencias mas autenticas y enriquecedoras.',
    tag: 'Comunidad'
  },
  {
    icon: '🎭',
    color: 'indigo',
    bgFrom: 'from-indigo-500',
    bgTo: 'to-violet-600',
    iconBg: 'bg-indigo-500/10',
    borderHover: 'hover:border-indigo-200',
    title: 'Respeta la Cultura',
    description: 'Investiga costumbres y normas culturales antes de viajar. Aprender frases como "hola" y "gracias" en el idioma local hara una gran diferencia.',
    tag: 'Cultura'
  }
]
</script>

<template>
  <div class="overflow-hidden">
    <!-- ============ HERO BANNER ============ -->
    <section class="relative pt-32 pb-24 px-4 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <!-- Decoracion -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-20 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <!-- Lineas decorativas -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div class="absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-white to-transparent"></div>
        <div class="absolute top-3/4 left-0 w-full h-px bg-linear-to-r from-transparent via-white to-transparent"></div>
      </div>

      <div class="max-w-4xl mx-auto text-center relative">
        <!-- Badge -->
        <div
          :class="visible ? 'animate-fade-in-down' : 'opacity-0'"
          class="mb-6"
        >
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold tracking-wider uppercase">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            Viaja con consciencia
          </span>
        </div>

        <!-- Titulo -->
        <h1
          :class="visible ? 'animate-fade-in-up' : 'opacity-0'"
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
          style="font-family: 'Playfair Display', serif;"
        >
          Consejos para un<br>
          <span class="text-gradient">Viaje Responsable</span>
        </h1>

        <!-- Subtitulo -->
        <p
          :class="visible ? 'animate-fade-in-up delay-300' : 'opacity-0'"
          class="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          Simples pero efectivos consejos que pueden ayudarte a reducir tu impacto ambiental. Un viaje consciente es un viaje mejor.
        </p>

        <!-- Scroll hint -->
        <div
          :class="visible ? 'animate-fade-in-up delay-500' : 'opacity-0'"
          class="mt-12"
        >
          <a href="#tips-grid" class="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm font-medium tracking-wider uppercase">
            Descubre los consejos
            <svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- ============ TIPS GRID ============ -->
    <section
      id="tips-grid"
      data-section="tips-cards"
      class="relative py-24 px-4 bg-linear-to-b from-gray-50 to-white overflow-hidden"
    >
      <!-- Decoracion de fondo -->
      <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-400 via-primary to-accent"></div>
      <div class="absolute top-40 -right-40 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
      <div class="absolute bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

      <div class="max-w-5xl mx-auto relative">
        <div class="space-y-8">
          <div
            v-for="(tip, index) in tips"
            :key="index"
            :class="cardsVisible ? `animate-fade-in-up delay-${(index + 1) * 100}` : 'opacity-0'"
            class="group"
          >
            <div
              class="relative flex flex-col md:flex-row items-start gap-6 p-8 bg-white rounded-3xl border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1"
              :class="tip.borderHover"
            >
              <!-- Numero de paso -->
              <div class="absolute -top-3 -left-3 md:top-4 md:-left-4">
                <div
                  class="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg bg-linear-to-br"
                  :class="`${tip.bgFrom} ${tip.bgTo}`"
                >
                  {{ index + 1 }}
                </div>
              </div>

              <!-- Icono grande -->
              <div
                class="w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                :class="tip.iconBg"
              >
                <span class="text-4xl">{{ tip.icon }}</span>
              </div>

              <!-- Contenido -->
              <div class="flex-1">
                <!-- Tag -->
                <span
                  class="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 bg-gray-100 text-gray-500 group-hover:text-gray-700 transition-colors"
                >
                  {{ tip.tag }}
                </span>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors" style="font-family: 'Playfair Display', serif;">
                  {{ tip.title }}
                </h2>
                <p class="text-gray-500 leading-relaxed text-base md:text-lg">
                  {{ tip.description }}
                </p>
              </div>

              <!-- Flecha decorativa -->
              <div class="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 group-hover:bg-primary/10 transition-all self-center">
                <svg class="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA final -->
        <div
          :class="cardsVisible ? 'animate-fade-in-up delay-700' : 'opacity-0'"
          class="mt-20"
        >
          <div class="relative p-10 md:p-14 rounded-3xl bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden text-center">
            <!-- Decoracion -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
              <div class="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl"></div>
            </div>

            <div class="relative">
              <div class="inline-flex items-center gap-2 mb-4">
                <span class="text-3xl">🌍</span>
              </div>
              <p class="text-2xl md:text-3xl font-bold text-white mb-3" style="font-family: 'Playfair Display', serif;">
                Viaja, Descubre, Cuida
              </p>
              <p class="text-white/50 max-w-lg mx-auto leading-relaxed mb-8">
                Al seguir estos consejos, te unes a un movimiento de viajeros conscientes que preservan el mundo para futuras generaciones. Gracias por ser parte del cambio.
              </p>
              <router-link
                to="/destinations"
                class="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-full text-base transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 hover:scale-105"
              >
                Explorar Destinos
                <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
