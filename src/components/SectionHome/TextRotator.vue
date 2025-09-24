<template>
  <div
    class="rotator" :aria-live="ariaLive"  role="status"
    @mouseenter="pauseOnHover && pause()"
    @mouseleave="pauseOnHover && resume()">
    <h2 v-for="(w, idx) in words" :key="idx" class="word"
      :class="{
        'is-active': idx === activeIndex,
        'is-leaving': idx === leavingIndex
      }"
      :style="wordStyle"
      >{{ w }}</h2
    >
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';

interface Props {
  words: string[];
  interval?: number;
  duration?: number;
  easing?: string;
  pauseOnHover?: boolean;
  ariaLive?: 'off' | 'polite' | 'assertive';
}

const props = withDefaults(defineProps<Props>(), {
  interval: 1800,
  duration: 420,
  easing: 'ease',
  pauseOnHover: true,
  ariaLive: 'polite'
});

const activeIndex = ref(0);
const leavingIndex = ref<number | null>(null);
let timer: number | null = null;
let isPaused = false;

const wordStyle = computed(() => ({
  transition: `transform ${props.duration}ms ${props.easing}, opacity ${props.duration}ms ${props.easing}`
}));

function step() {
  if (!props.words?.length) return;
  const current = activeIndex.value;
  const next = (current + 1) % props.words.length;

  leavingIndex.value = current;
  activeIndex.value = next;
  window.setTimeout(() => {
    if (leavingIndex.value === current) leavingIndex.value = null;
  }, props.duration);
}

function start() {
  stop();
  timer = window.setInterval(step, props.interval) as unknown as number;
}

function stop() {
  if (timer) {
    window.clearInterval(timer);
    timer = null;
  }
}

function pause() {
  isPaused = true;
  stop();
}

function resume() {
  if (!isPaused) return;
  isPaused = false;
  start();
}

onMounted(() => {
  // defensiv: aktiven Index auf 0 halten, falls leere Liste
  activeIndex.value = 0;
  start();
});
onBeforeUnmount(() => stop());

// Wenn sich Words ändern, sauber neu starten
watch(
  () => props.words,
  (arr) => {
    activeIndex.value = 0;
    leavingIndex.value = null;
    if (arr?.length) start();
    else stop();
  },
  { deep: true }
);
</script>

<style scoped>
.rotator {
  position: relative;
  display: inline-block;
  height: 120px;
  width: 100%;
  overflow: hidden;
  vertical-align: bottom;
  /* Optional: sanfter Font-Rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@media (max-width: 1000px) {
  .rotator {
    height: 70px;
  }
}

.word {
  z-index: 2;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  transform: translateY(-100%); /* Start: oberhalb (unsichtbar) */
  opacity: 0;
  white-space: nowrap;
  will-change: transform, opacity;
}

.word.is-active {
  transform: translateY(0);      /* kommt von oben rein */
  opacity: 1;
}

.word.is-leaving {
  transform: translateY(100%);   /* rutscht nach unten raus */
  opacity: 0;
}

/* Reduced Motion: Animationen minimieren */
@media (prefers-reduced-motion: reduce) {
  .word,
  .word.is-active,
  .word.is-leaving {
    transition: none !important;
    transform: translateY(0) !important;
    opacity: 1 !important;
  }
}
</style>