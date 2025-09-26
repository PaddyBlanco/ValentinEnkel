<template>
  <section class="section-services">
    <h1 class="reveal right" v-inview>Was wir anbieten.</h1>
    <div class="text-container reveal right" v-inview>
      <p>Wir sind ein technologieorientiertes Beratungs- und Entwicklungsunternehmen für
        Firmen mit technischem Kern – insbesondere im Maschinen- und Fahrzeugbau sowie in
        der industriellen Serienfertigung – und entwickeln Lösungen gemeinsam mit den
        Mitarbeiterinnen und Mitarbeitern vor Ort.</p>
      <button v-inview class="btn reveal up">Services</button>
    </div>

    <ResponsiveImage name="services/Services-1" alt="Webentwicklung-Service bei Valentin & Enkel"
      className="s-image-1 reveal left" v-inview sizes="10vw" />
    <ResponsiveImage name="services/Services-2" alt="Webentwicklung-Service bei Valentin & Enkel"
      className="s-image-2 reveal left" v-inview sizes="10vw" />
    <ResponsiveImage name="services/Services-3" alt="Webentwicklung-Service bei Valentin & Enkel"
      className="s-image-3 reveal left" v-inview sizes="10vw" />

    <div class="line-1"></div>
    <div class="monospace mono-right">Technologieberatung von innen heraus</div>
    <div class="line-w" ref="lineWRef" :class="{ 'animate': isLineWVisible }"></div>

  </section>
</template>

<script setup lang="ts">

import { onMounted, onBeforeUnmount, ref } from 'vue';
import ResponsiveImage from '../Core/ResponsiveImage.vue';


const lineWRef = ref<HTMLElement | null>(null);
const isLineWVisible = ref(false);
let io: IntersectionObserver | null = null;

onMounted(() => {
  // Fallback ohne IO: sofort zeigen
  if (!('IntersectionObserver' in window)) {
    isLineWVisible.value = true;
    return;
  }
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          isLineWVisible.value = true;
          // nur einmal animieren
          io?.unobserve(e.target);
          io?.disconnect();
          io = null;
        }
      }
    },
    {
      root: null,           // Viewport
      rootMargin: '0px 0px 0% 0px', // leicht früher starten
      threshold: 0.2        // 20% sichtbar reicht
    }
  );
  if (lineWRef.value) io.observe(lineWRef.value);
});

onBeforeUnmount(() => {
  io?.disconnect();
  io = null;
});
</script>

<style scoped>
.s-image-1 {
  position: absolute;
  right: 5%;
  top: 250px;
  width: 9%;
}


.s-image-2 {
  position: absolute;
  right: 18%;
  top: 100px;
  width: 12%;
}

.s-image-3 {
  position: absolute;
  left: 55%;
  bottom: 100px;
  width: 10%;
}

.section-services {
  position: relative;
  padding-block-start: 15rem;
  padding-block-end: 13rem;
  padding-left: 10%;
}

.text-container {
  max-width: 45%;
  margin-left: 10%;
}

.text-container p {
  margin-block: 2rem;
}

.mono-right {
  position: absolute;
  bottom: 5px;
  right: 50px;
}

.line-1 {
  position: absolute;
  top: 0;
  left: 50%;
  height: 0;
  width: var(--line-width);
  opacity: var(--line-opacity);
  background: var(--color);
  transform: translateX(-50%);
  animation: drawLine 1.5s ease-out forwards;
  animation-delay: 2s;
}

.line-w {
  position: absolute;
  z-index: 100;
  bottom: 0;
  left: 50%;
  height: var(--line-width);
  opacity: var(--line-opacity);
  background-color: var(--color);

  width: 20px;
}

.line-w.animate {
  animation: drawLine-w 1.5s ease-out forwards;
  animation-delay: 0.2s;
  /* optional kleine Verzögerung */
}



@keyframes drawLine {
  from {
    height: 0;
    /* Start mit 0 Höhe */
  }

  to {
    height: 100%;
    /* Von 30% bis 100% = 70% Länge */
  }
}

@keyframes drawLine-w {
  from {
    left: 50%;
    width: 0px;
  }

  to {
    left: 0;
    width: 100%;
  }
}

/* Motion-Preference respektieren */
@media (prefers-reduced-motion: reduce) {

  .line-w,
  .line-w.animate {
    animation: none !important;
    left: 0;
    width: 100%;
  }

  .line-1 {
    animation: none !important;
    height: 100%;
  }
}

@keyframes drawLine-w {
  from {
    left: 50%;
    /* Start mit 0 Höhe */
    width: 0px;
  }

  to {
    left: 0;
    width: 100%;
    /* Von 30% bis 100% = 70% Länge */
  }
}
</style>
