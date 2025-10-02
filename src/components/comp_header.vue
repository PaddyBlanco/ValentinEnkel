<template>
  <header class="site-header" role="banner">
    <a class="logo" href="/" rel="home" aria-label="Startseite: Bauer">
      <img src="/src/assets/Svgs/Logo/Schriftzug-Bauer.svg" alt="Valentin & enkel Logo mit Bauer" />
    </a>

    <!-- Toggle Button -->
    <button class="nav-toggle" :aria-expanded="showNav" aria-controls="primary-nav" @click="toggleNav"
      @keydown.escape="closeNav" type="button">
      <span class="sr-only">Menü {{ showNav ? 'schließen' : 'öffnen' }}</span>
      <svg :class="['nav-icon', { 'is-open': showNav }]" viewBox="0 0 80 40" aria-hidden="true" focusable="false">
        <g class="bar bar--top">
          <line class="line" x1="5" y1="10" x2="75" y2="10" />
        </g>
        <g class="bar bar--bottom">
          <line class="line" x1="5" y1="30" x2="75" y2="30" />
        </g>
      </svg>
    </button>

    <!-- backdrop -->
    <div class="backdrop" :class="{ 'is-open': showNav }" @click="closeNav" aria-hidden="true"></div>

    <!-- Navigation -->
    <nav id="primary-nav" class="navigation" :class="{ 'is-open': showNav }" aria-label="Hauptnavigation"
      :aria-hidden="!showNav">
      <div class="nav-list" role="list">
        <div><a ref="firstLink" href="/about">Home</a><span>base</span></div>
        <div><a href="/projects">Services</a><span>was wir anbieten</span></div>
        <div><a href="/contact">Über uns</a><span>wer wir sind</span></div>
        <div><a href="/contact">Kontakt</a><span>auf augenhöhe</span></div>
      </div>
      <div class="flex-row w-100 nav-footer">
        <div class="nav-footer-item"><a href="/inprint">Impressum</a></div>
        <div class="nav-footer-item"><a href="/privacyPolicy">Datenschutz</a></div>
        <div class="nav-footer-item"><a href="/agbs">AGBs</a></div>
        <div class="flex-item text-right"><a href="/agbs">LinkedIn</a></div>
      </div>
      <div class="line-1"></div>
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
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
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

/* Panel: animiert per transform (performant), nicht via width */
.navigation {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: end;
  top: 0;
  right: 0;
  height: 100dvh;
  width: 50dvw;
  min-width: 750px;
  background-color: var(--background-color);
  transform: translateX(100%);
  transition: transform 260ms ease;
  z-index: 100;
  border-left: 1px solid var(--line-color);
}


/* Navigation  */
.nav-list {
  width: 100%;
}

.nav-list div {
  display: flex;
  flex-direction: row;
  flex: 0 0 100%;
  padding-inline-start: 20%;
  border-bottom: 1px solid #ffffff55;
}

.nav-list span {
  margin-block-start: 30px;
  font-family: 'Courier New';
  margin-inline-start: 20px;
  display: none;
}

.nav-list div:hover span {
  display: block;
}


.nav-list div a {
  font-size: 10vh;
  font-family: 'Cal Sans';
  margin: 0;
  font-weight: normal;
}


.site-header {
  position: relative;
  z-index: 100;
}

.logo {
  position: fixed;
  top: 50px;
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
  top: 50px;
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
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease, background 200ms ease;
  z-index: 90;
}

.backdrop.is-open {
  opacity: 1;
  pointer-events: auto;
}

.navigation.is-open {
  transform: translateX(0);
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
.bar--top {
  transform: translateY(0) rotate(0);
}

.bar--bottom {
  transform: translateY(0) rotate(0);
}

/* Offen -> X */
.nav-icon.is-open .bar--top {
  transform: translateY(10px) rotate(22.5deg);
}

.nav-icon.is-open .bar--bottom {
  transform: translateY(-10px) rotate(-22.5deg);
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

.nav-footer {
  padding-inline-start: 20%;
  padding-inline-end: 75px;
  padding-block: 5rem;
}

.nav-footer-item {
  padding-inline-end: 3rem;
}

.line-1 {
    position: absolute;
    top: 0;
    left: 10%;
    height: 100%;
    width: var(--line-width);
    background:var(--line-color);
  }


/* Reduced motion respektieren */
@media (prefers-reduced-motion: reduce) {
  .backdrop,
  .navigation,
  .bar {
    transition: none;
  }
}


@media (max-width: 1000px) {
  .navigation {
    width: 100vw;
    min-width: 100%;
    border-left:none;
  }
  .nav-list div a {
  font-size:  var(--h1-size);
}

  .logo {
    top: 20px;
    left: 20px;
  }

  .logo img {
    height: 25px;
  }

  .nav-icon {
    width: 60px;
    height: 30px;
  }

  .nav-toggle {
    top: 20px;
    right: 20px;
  }
  .nav-list div {
 
  padding-inline-start: 10%;
 
}
.nav-footer{
  gap:1rem;
}
.nav-footer-item{
  width:50%;
}

.line-1{
  left:5%;
}
}
</style>
