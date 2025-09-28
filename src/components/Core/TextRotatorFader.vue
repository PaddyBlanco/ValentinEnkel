<template>
  <div
    class="rotator"
    :aria-live="ariaLive"
    role="status"
    @mouseenter="pauseOnHover && pause()"
    @mouseleave="pauseOnHover && resume()"
  >
    <h2
      v-for="(w, idx) in words"
      :key="idx"
      class="word"
      :class="{
        'is-active': idx === activeIndex,
        'is-leaving': idx === leavingIndex
      }"
      :style="wordStyle"
    >
      {{ w }}
    </h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';

interface Props {
  words: string[];
  /** Zeit zwischen Wechseln (ms) */
  interval?: number;
  /** Dauer des Fades (ms) */
  duration?: number;
  /** CSS easing z.B. 'ease', 'ease-in-out' */
  easing?: string;
  /** Animation pausieren bei Hover */
  pauseOnHover?: boolean;
  /** ARIA Live Region */
  ariaLive?: 'off' | 'polite' | 'assertive';
}

const props = withDefaults(defineProps<Props>(), {
  interval: 2000,
  duration: 600,
  easing: 'ease',
  pauseOnHover: true,
  ariaLive: 'polite'
});

const activeIndex = ref(0);
const leavingIndex = ref<number | null>(null);
let timer: number | null = null;
let isPaused = false;

const wordStyle = computed(() => ({
  transition: `opacity ${props.duration}ms ${props.easing}`
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
  if (timer != null) {
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
  activeIndex.value = 0;
  start();
});
onBeforeUnmount(() => stop());

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
  width: 100%;
  height: 120px;      /* fixe Höhe verhindert Layout-Shift; anpassen falls nötig */
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@media (max-width: 1000px) {
  .rotator { height: 70px; }
}

.word {
  position: absolute;
  inset: 0;           /* top/right/bottom/left:0 */
  opacity: 0;         /* standard: unsichtbar */
  z-index: 0;
  white-space: nowrap;
  will-change: opacity;
}

.word.is-active {
  opacity: 1;         /* fade in */
  z-index: 2;
}

.word.is-leaving {
  opacity: 0;         /* fade out (übergang) */
  z-index: 1;
}

/* Reduced Motion: Animationen entfernen */
@media (prefers-reduced-motion: reduce) {
  .word,
  .word.is-active,
  .word.is-leaving {
    transition: none !important;
    opacity: 1 !important;
  }
}
</style>
