<template>
  <div class="section-home" >
    <div class="gradient-bg" :aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" focusable="false" aria-hidden="true">
        <defs>
          <filter id="goo">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="1" stitchTiles="stitch" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div class="gradients-container">
        <div class="g g1"></div>
        <div class="g g2"></div>
        <div class="g g3"></div>
        <div class="g g4"></div>
        <div class="g g5"></div>
        <div class="g interactive" ref="interactiveRef"></div>
      </div>
    </div>
    <div class="gradient-bg-noise"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const interactiveRef = ref<HTMLDivElement | null>(null)
let rafId: number | null = null
let curX = 0, curY = 0, tgX = 0, tgY = 0

const move = () => {
  // sanfter, GPU-beschleunigter Ease
  curX += (tgX - curX) / 20
  curY += (tgY - curY) / 20
  const el = interactiveRef.value
  if (el) el.style.transform = `translate3d(${Math.round(curX)}px, ${Math.round(curY)}px, 0)`
  rafId = window.requestAnimationFrame(move)
}

const onMouseMove = (e: MouseEvent) => {
  tgX = e.clientX
  tgY = e.clientY
}

onMounted(() => {
  // Respektiert reduzierte Bewegung
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!prefersReduced) {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    move()
  } else {
    // zentriert ohne Animation
    const el = interactiveRef.value
    if (el) el.style.transform = 'translate3d(0,0,0)'
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  if (rafId != null) cancelAnimationFrame(rafId)
})
</script>

<style scoped>


.section-home {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100vh;
    --color-bg1: #002c29;
  --color-bg2: #5f1900;
  --color1:  #ffd1accc;
  --color2:  #00747acc;
  --color3:  #B64D0Ccc;
  --color4:  #005c56cc;
  --color5:  #ff3c00c8;
  --color-interactive: #00889dcc;
  --circle-size: 80%;
  --blending: hard-light;
}

.gradient-bg {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: clip;
  background: linear-gradient(40deg, var(--color-bg1), var(--color-bg2));
}

.gradient-bg-noise {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100vh;
   opacity: 0.55;
  background-image: url(/src/assets/Images/Gradients/noise.webp);
  pointer-events: none;
}

svg { display: block; position: fixed; inset: 0; width: 0; height: 0; }

.gradients-container {
  filter: url(#goo) blur(30px); /* etwas geringer -> bessere Performance */
  width: 100%;
  height: 100%;
  will-change: transform, filter;
  pointer-events: none; 
}

.g {
  position: absolute;
  width: var(--circle-size);
  height: var(--circle-size);
  mix-blend-mode: var(--blending);
  opacity: 1;
  will-change: transform;
}

.g1 {
  background: radial-gradient(circle at center, var(--color1) 0, rgba(255, 255, 255, 0) 50%) no-repeat;
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  transform-origin: center;
  animation: moveVertical 30s ease-in-out infinite;
}

.g2 {
  background: radial-gradient(circle at center, var(--color2) 0, rgba(0, 0, 0, 0) 50%) no-repeat;
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  transform-origin: calc(50% - 400px);
  animation: moveInCircle 20s reverse infinite;
}

.g3 {
  background: radial-gradient(circle at center, var(--color3) 0, rgba(0, 0, 0, 0) 50%) no-repeat;
  top: calc(50% - var(--circle-size) / 2 + 200px);
  left: calc(50% - var(--circle-size) / 2 - 500px);
  transform-origin: calc(50% + 400px);
  animation: moveInCircle 40s linear infinite;
}

.g4 {
  background: radial-gradient(circle at center, var(--color4) 0, rgba(0, 0, 0, 0) 50%) no-repeat;
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  transform-origin: calc(50% - 200px);
  animation: moveHorizontal 40s ease-in-out infinite;
  opacity: 0.7;
}

.g5 {
  background: radial-gradient(circle at center, var(--color5) 0, rgba(0, 0, 0, 0) 50%) no-repeat;
  width: calc(var(--circle-size) * 2);
  height: calc(var(--circle-size) * 2);
  top: calc(50% - var(--circle-size));
  left: calc(50% - var(--circle-size));
  transform-origin: calc(50% - 800px) calc(50% + 200px);
  animation: moveInCircle 20s ease-in-out infinite;
}

.interactive {
  background: radial-gradient(circle at center, var(--color-interactive) 0, rgba(0, 0, 0, 0) 50%) no-repeat;
  width: 100%;
  height: 100%;
  top: -50%;
  left: -50%;
  opacity: 0.7;
}

@keyframes moveInCircle {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}

@keyframes moveVertical {
  0% { transform: translateY(-50%); }
  50% { transform: translateY(50%); }
  100% { transform: translateY(-50%); }
}

@keyframes moveHorizontal {
  0% { transform: translateX(-50%) translateY(-10%); }
  50% { transform: translateX(50%) translateY(10%); }
  100% { transform: translateX(-50%) translateY(-10%); }
}

/* Accessibility: reduziert Animationen deutlich */
@media (prefers-reduced-motion: reduce) {
  .gradients-container { filter: url(#goo) blur(20px); }
  .g { animation: none !important; }
}
/* === 3) Mobile-Optimierungen ============================================ */
/* Ziel: weniger Rechenlast, kleinere Flächen, ruhigere Bewegungen. */
@media (max-width: 768px) {
  .section-home {
    --circle-size: 56%;           /* kleiner => weniger Overdraw */
    --blending: screen;           /* verträglicher als hard-light auf Mobile */
  }

  .gradients-container {
    filter: url(#goo) blur(18px); /* weniger Blur für Performance */
  }

  .g { opacity: 0.9; }

  .g1 { animation-duration: 24s; }   /* etwas schneller, aber kleinere Wege */
  .g2 { animation-duration: 18s; }
  .g3 { animation-duration: 32s; }
  .g4 { animation-duration: 32s; }
  .g5 {
    width: calc(var(--circle-size) * 1.5);
    height: calc(var(--circle-size) * 1.5);
    top: calc(50% - var(--circle-size) * 0.75);
    left: calc(50% - var(--circle-size) * 0.75);
    animation-duration: 18s;
  }

  /* Parallax-Layer glätten: volle Fläche + geringere Deckkraft */
  .interactive {
    opacity: 0.45;
    /* auf Mobile verhindert Überschwingen */
    transform: translate3d(0,0,0) !important;
  }
}

/* === 4) iOS Safari gezielt verbessern =================================== */
/* -webkit-touch-callout ist ein robustes iOS-Merkmal. */
@supports (-webkit-touch-callout: none) {
  .section-home {
    --blending: screen;              /* vermeidet harte Kontrastkanten */
  }

  .gradients-container {
    /* Safari mag kleinere Blur-Radien + kein SVG-Filter-Chaos */
    filter: blur(16px);              /* fällt auf simples Blur zurück */
  }

  /* SVG-Filter per Safari-iOS lieber ganz umgehen (GPU-Saves) */
  svg + .gradients-container { filter: blur(16px) !important; }

  .g {
    /* Viele WebKit-Versionen performen transform besser ohne mix-blend-mode */
    mix-blend-mode: normal;
    opacity: 0.85;
  }

  /* Reduziere Pfadlängen, damit die Kreise im View bleiben */
  .g1, .g2, .g3, .g4 {
    animation-timing-function: ease-in-out;
  }

  .interactive {
    opacity: 0.35;
    transform: translate3d(0,0,0) !important; /* Parallax neutralisieren */
  }

  .gradient-bg-noise {
    opacity: 0.4; /* Moiré/Posterization auf iOS reduzieren */
  }
}

/* === 5) macOS Safari (WebKit) =========================================== */
/* -webkit-backdrop-filter existiert auf macOS Safari verlässlich. */
@supports (-webkit-backdrop-filter: none) and (not (backdrop-filter: none)) {
  .section-home { --blending: screen; }
  .gradients-container { filter: blur(18px); }
  .g { mix-blend-mode: lighten; opacity: 0.9; }
  .interactive { opacity: 0.4; transform: translate3d(0,0,0) !important; }
}

/* === 6) Zusätzliche Guards gegen Ruckler ================================ */
/* Falls der Nutzer reduzierte Bewegung aktiviert hat, sind wir noch sanfter. */
@media (prefers-reduced-motion: reduce) {
  .gradients-container { filter: blur(14px); }
  .interactive { opacity: 0.3; transform: translate3d(0,0,0) !important; }
}
</style>
