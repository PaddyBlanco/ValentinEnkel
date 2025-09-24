<template>
  <header class="site-header" role="banner">
    <a class="logo" href="/" rel="home" aria-label="Startseite: Bauer">
      <img src="/src/assets/Svgs/Logo/Schriftzug_Bauer.svg" alt="Bauer Logo" />
    </a>

    <button
      class="nav-toggle"
      :aria-expanded="showNav"
      aria-controls="primary-nav"
      @click="toggleNav"
      @keydown.escape="closeNav"
      type="button">
      <span class="sr-only">Menü {{ showNav ? 'schließen' : 'öffnen' }}</span>
      <svg :class="['nav-icon', { 'is-open': showNav }]" viewBox="0 0 80 40"  aria-hidden="true" focusable="false">
        <g class="bar bar--top">
          <line class="line" x1="5" y1="10" x2="75" y2="10" />
        </g>
        <g class="bar bar--bottom">
          <line class="line" x1="5" y1="30" x2="75" y2="30" />
        </g>
      </svg>
    </button>

    <div
      class="backdrop"
      :class="{ 'is-open': showNav }"
      @click="closeNav"
      aria-hidden="true"
    ></div>

    <!-- Hauptnavigation: semantisch korrektes <nav>, bleibt immer im DOM (SEO) -->
    <nav
      id="primary-nav"
      class="navigation"
      :class="{ 'is-open': showNav }"
      aria-label="Hauptnavigation"
      :aria-hidden="!showNav"
    >
      <ul class="nav-list" role="list">
        <li><a ref="firstLink" href="/about">About</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const showNav = ref(false)
const firstLink = ref<HTMLAnchorElement | null>(null)

const openNav = async () => {
  if (showNav.value) return
  showNav.value = true
  // Scroll sperren (body scroll lock)
  //document.documentElement.style.overflow = 'hidden'
     //document.body.style.overflow = 'hidden'
  await nextTick()
  firstLink.value?.focus()
}

const closeNav = () => {
  if (!showNav.value) return
  showNav.value = false
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}

const toggleNav = () => (showNav.value ? closeNav() : openNav())

// ESC global (falls Fokus im Panel steckt)
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeNav()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  // Fallback: Scroll wieder erlauben
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
})

// Defensive: wenn Viewport wechselt (z.B. Desktop -> Mobil), Panel zu
watch(
  () => window.matchMedia('(min-width: 1024px)').matches,
  () => closeNav()
)
</script>

<style scoped>
/* ===== Layout ===== */
.site-header {
  position: relative;
  z-index: 100;
}

.logo {
  position: fixed;
  top: 70px;
  left: 75px;
  z-index: 10;
  background: none;
}

.logo img {
  height: 34px;

}

.nav-toggle {
  position: fixed;
  right: 75px;
  top: 70px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 110;
  line-height: 0;
}

/* Overlay hinter dem Panel */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.0);
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease, background 200ms ease;
  z-index: 90;
}

.backdrop.is-open {
  opacity: 1;
  pointer-events: auto;
}

/* Panel: animiert per transform (performant), nicht via width */
.navigation {
  position: fixed;
  top: 0;
  right: 0;
  height: 100svh;
  width: min(50vw, 560px);
  max-width: 100%;
  background-color: var(--background-color, #111);
  transform: translateX(100%);
  transition: transform 260ms ease;
  z-index: 100;
  display: flex;
  align-items: center;
}

.navigation.is-open {
  transform: translateX(0);
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0 2rem;
  display: grid;
  gap: 1rem;
  width: 100%;
}

.nav-list a {
  display: inline-block;
  font-size: 1.25rem;
  text-decoration: none;
  color: var(--text-on-bg, #fff);
}


.nav-icon {
  color: #fff;
  width: 80px;
  height: 40px;
}

.line {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}

.bar {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  transition: transform 260ms ease;
}

/* Ausgangslage: auseinandergezogen */
.bar--top { transform: translateY(0) rotate(0); }
.bar--bottom { transform: translateY(0) rotate(0); }

/* Offen -> X */
.nav-icon.is-open .bar--top { transform: translateY(10px) rotate(22.5deg); }
.nav-icon.is-open .bar--bottom { transform: translateY(-10px) rotate(-22.5deg); }

/* Reduced motion respektieren */
@media (prefers-reduced-motion: reduce) {
  .backdrop,
  .navigation,
  .bar { transition: none; }
}


/* Screenreader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}


@media (max-width: 1000px) {
   .logo {
    top: 20px;
    left: 20px;
   }

   .logo img{
      height: 25px;
   }

.nav-icon{
      width: 60px;
      height: 30px;
}

.nav-toggle{
      top: 20px;
      right: 20px;
}
   
}

</style>
