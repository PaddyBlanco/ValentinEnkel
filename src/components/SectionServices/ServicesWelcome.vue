<template>
  <section class="section-welcome-services">
    <div class="text-right headline"><h1>Greifbarer Mehrwert</h1></div>

    <div class="text-left flex-row headline">
      <h1>von innen heraus.</h1>
      <div class="flex-item images">
        <ResponsiveImage
        name="contact/Contact-2"
        alt="Roman Mitterlehner und Patrick Weiß lachen Valentin & Enkel"
        className="headline-image"
        sizes="4vw"
        />
          <ResponsiveImage
        name="contact/Contact-1"
        alt="Roman Mitterlehner und Patrick Weiß drinken Kaffee. Valentin & Enkel"
        className="headline-image"
        sizes="4vw"
      />
      <ResponsiveImage
        name="contact/Contact-3"
        alt="Roman Mitterlehner und Patrick Weiß beraten sich."
        className="headline-image"
        sizes="4vw"
      />
      </div>
    
    </div>

    <canvas
      ref="canvas"
      class="mesh-canvas"
      :class="{ 'mesh-ready': ready }"
      aria-hidden="true"
    ></canvas>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import ResponsiveImage from "../Core/ResponsiveImage.vue";
import MeshWorker from "../../workers/meshWorker?worker";


const cfg = {
  bg: "#000000",
  lineBase: "rgba(255,255,255,0.10)",
  linePeak: "rgba(255,255,255,0.6)",
  strokePx: 1,                 // Strichstärke in CSS-Pixeln
  spacing: 70,                 // Zielabstand zwischen Knoten (größer = schneller, luftiger)
  jitter: 20,                  // Unregelmäßigkeit der Punkte
  kNearest: 3,                 // max. Nachbarn pro Knoten
  maxDistFactor: 1.25,          // maximale Kantenlänge = spacing * factor
  wave: { speed: 250, band: 50, amplitude: 20, period: 6, count: 2 },
  subtleDrift: 0.2,           // sehr kleiner „Atmungs“-Drift
  cursor: { sigma: 50, boost: 1 }, // Maus-Spotlight
  buckets: 16,                 // Quantisierung der Helligkeit: 0..16 (→ 17 Farben)
} as const;

/** ---------- Types ---------- */
type Vec = { x: number; y: number };

/** ---------- Refs & State ---------- */
const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;

let dpr = Math.max(1, window.devicePixelRatio || 1);
let center: Vec = { x: 0, y: 0 };
const ready = ref(false); // nur für das *erste* Mesh → Canvas fade-in

// Mesh-Daten vom Worker (Typed Arrays)
let nodesBase: Float32Array | null = null; // [bx0,by0, bx1,by1, ...]
let edgesIdx: Uint32Array | null = null;   // [i0,j0, i1,j1, ...]
let nodeCount = 0;

// Per-Frame-Buffer (wiederverwendet → keine Allocations)
let pos: Float32Array = new Float32Array(0);     // [x0,y0, x1,y1, ...]
let waveI: Float32Array = new Float32Array(0);   // [i0, i1, ...]
let curI: Float32Array = new Float32Array(0);    // [i0, i1, ...]

// Maus-Spotlight
const mouse = { x: Infinity, y: Infinity, active: false };

// Reduced Motion
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Worker-Handling
let worker: Worker | null = null;
let buildSeq = 0;       // ID des neuesten Build-Auftrags
let raf = 0;

// Resize: robust & ruhig
let ro: ResizeObserver | null = null;
let resizeTimer: number | null = null;
const idle = (cb: () => void) =>
  (window as any).requestIdleCallback
    ? (window as any).requestIdleCallback(cb, { timeout: 250 })
    : setTimeout(cb, 0);

/** ---------- Farbpalette (buckets) ---------- */
let palette: string[] = [];
function parseRgba(s: string): [number, number, number, number] {
  const m = s.match(/[\d.]+/g)?.map(Number) ?? [255, 255, 255, 1];
  if (m.length === 3) m.push(1);
  return m as [number, number, number, number];
}
function makePalette(base: string, peak: string, steps: number) {
  const a = parseRgba(base), b = parseRgba(peak);
  const lerp = (x: number, y: number, t: number) => x + (y - x) * t;
  const out: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const r = Math.round(lerp(a[0], b[0], t));
    const g = Math.round(lerp(a[1], b[1], t));
    const bl = Math.round(lerp(a[2], b[2], t));
    const al = lerp(a[3], b[3], t);
    out.push(`rgba(${r},${g},${bl},${al})`);
  }
  return out;
}

/** ---------- Worker ---------- */
function attachWorker() {
  worker = new MeshWorker();
  worker.onmessage = (e: MessageEvent) => {
    const msg = e.data as {
      type: "mesh";
      nodes: ArrayBuffer;
      edges: ArrayBuffer;
      seq?: number;
    };
    if (!msg || msg.type !== "mesh") return;
    if (typeof msg.seq === "number" && msg.seq < buildSeq) return; // veraltete Antwort

    nodesBase = new Float32Array(msg.nodes);
    edgesIdx = new Uint32Array(msg.edges);
    nodeCount = nodesBase.length / 2;

    // Frame-Buffer neu dimensionieren (einmalig)
    pos = new Float32Array(nodesBase.length);
    waveI = new Float32Array(nodeCount);
    curI = new Float32Array(nodeCount);

    // Erstes Mesh? → Canvas einblenden
    ready.value = true;
  };
  worker.onerror = () => {
    // Fallback: kein Mesh → nur schwarzer Hintergrund
    nodesBase = null;
    edgesIdx = null;
  };
}

function buildInWorker() {
  if (!canvas.value || !worker) return;
  const { clientWidth: w, clientHeight: h } = canvas.value;
  const seq = ++buildSeq; // Build-ID

  worker.postMessage({
    type: "build",
    w,
    h,
    spacing: cfg.spacing,
    jitter: cfg.jitter,
    kNearest: cfg.kNearest,
    maxDistFactor: cfg.maxDistFactor,
    seq,
  });
}

/** ---------- Canvas / DPR ---------- */
function resize() {
  if (!canvas.value) return;
  const { clientWidth, clientHeight } = canvas.value;
  dpr = Math.max(1, window.devicePixelRatio || 1);

  canvas.value.width = Math.floor(clientWidth * dpr);
  canvas.value.height = Math.floor(clientHeight * dpr);

  ctx = canvas.value.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  center = { x: clientWidth / 2, y: clientHeight / 2 };

  // Neu bauen – aber nicht aggressiv (Debounce + Idle)
  if (resizeTimer) window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => idle(buildInWorker), 160);
}

/** ---------- Envelopes ---------- */
function waveEnvelope(distance: number, t: number) {
  const { speed, band, period, count } = cfg.wave;
  let intensity = 0;
  for (let i = 0; i < count; i++) {
    const phase = (t + (i * period) / count) % period;
    const R = speed * phase;
    const d = distance - R;
    intensity += Math.exp(-(d * d) / (2 * band * band));
  }
  return intensity; // 0..≈count
}
function cursorEnvelope(distance: number) {
  if (!mouse.active) return 0;
  const s = cfg.cursor.sigma;
  return Math.exp(-(distance * distance) / (2 * s * s)); // 0..1
}

/** ---------- Render ---------- */
function render(ts: number) {
  if (!ctx || !canvas.value) return;
  const t = ts / 1000;
  const w = canvas.value.clientWidth;
  const h = canvas.value.clientHeight;

  // Hintergrund
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = cfg.bg;
  ctx.fillRect(0, 0, w, h);

  if (!nodesBase || !edgesIdx) return;

  // 1) Pro Node: Position & Intensitäten berechnen (einmalig)
  const driftX = cfg.subtleDrift ? Math.sin(t * 0.3) * cfg.subtleDrift : 0;
  const driftY = cfg.subtleDrift ? Math.cos(t * 0.27) * cfg.subtleDrift : 0;
  const amp = prefersReducedMotion ? 0 : cfg.wave.amplitude;

  for (let i = 0, pn = 0; i < nodeCount; i++, pn += 2) {
    const bx = nodesBase[pn] + driftX;
    const by = nodesBase[pn + 1] + driftY;

    // Richtung von der Mitte
    const dx = bx - center.x;
    const dy = by - center.y;
    const dist = Math.hypot(dx, dy) || 1;
    const dirX = dx / dist;
    const dirY = dy / dist;

    // Welle
    const wEnv = amp * Math.min(1, waveEnvelope(dist, t));
    const x = bx + dirX * wEnv;
    const y = by + dirY * wEnv;

    pos[pn] = x;
    pos[pn + 1] = y;

    // Intensitäten (getrennt halten → max() pro Kante)
    waveI[i] = Math.min(1, waveEnvelope(dist, t));
    if (mouse.active) {
      const dm = Math.hypot(x - mouse.x, y - mouse.y);
      const ce = cursorEnvelope(dm) * (1 + cfg.cursor.boost);
      curI[i] = ce > 1 ? 1 : ce;
    } else {
      curI[i] = 0;
    }
  }

  // 2) Linien in Buckets sammeln → je Bucket einmal stroken
  const steps = cfg.buckets;
  const paths: (Path2D | null)[] = Array(steps + 1).fill(null);
  const getPath = (idx: number) => (paths[idx] ??= new Path2D());

  for (let k = 0; k < edgesIdx.length; k += 2) {
    const ai = edgesIdx[k]!;
    const bi = edgesIdx[k + 1]!;

    const a2 = ai * 2;
    const b2 = bi * 2;

    const ax = pos[a2], ay = pos[a2 + 1];
    const bx2 = pos[b2], by2 = pos[b2 + 1];

    // Helligkeit: max aus Wave- und Cursor-Anteil der Endpunkte
    const iw = waveI[ai] > waveI[bi] ? waveI[ai] : waveI[bi];
    const ic = curI[ai] > curI[bi] ? curI[ai] : curI[bi];
    let inten = iw > ic ? iw : ic;
    if (inten < 0) inten = 0;
    if (inten > 1) inten = 1;

    const bucket = Math.round(inten * steps);
    const p = getPath(bucket);
    p.moveTo(ax, ay);
    p.lineTo(bx2, by2);
  }

  // 3) Strokes pro Bucket ausgeben
  ctx.lineWidth = cfg.strokePx;
  for (let i = 0; i <= steps; i++) {
    const p = paths[i];
    if (!p) continue;
    ctx.strokeStyle = palette[i]!;
    ctx.stroke(p);
  }
}

/** ---------- RAF Loop ---------- */
function loop(ts: number) {
  render(ts);
  raf = requestAnimationFrame(loop);
}

/** ---------- Events ---------- */
function onPointerMove(e: PointerEvent) {
  if (!canvas.value) return;
  const rect = canvas.value.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
  mouse.active = true;
  if (prefersReducedMotion) render(performance.now());
}
function onPointerLeave() {
  mouse.active = false;
  if (prefersReducedMotion) render(performance.now());
}

/** ---------- Lifecycle ---------- */
onMounted(() => {
  palette = makePalette(cfg.lineBase, cfg.linePeak, cfg.buckets);
  attachWorker();
  // Canvas initialisieren
  resize();
  // Erstes Mesh asynchron bauen
  buildInWorker();

  // Resize reaktiv & „sanft“
  ro = new ResizeObserver(() => idle(resize));
  if (canvas.value) ro.observe(canvas.value);

  // Maus
  canvas.value?.addEventListener("pointermove", onPointerMove, { passive: true });
  canvas.value?.addEventListener("pointerleave", onPointerLeave, { passive: true });

  // Start
  raf = requestAnimationFrame(loop);
});

onUnmounted(() => {
  ro?.disconnect();
  canvas.value?.removeEventListener("pointermove", onPointerMove);
  canvas.value?.removeEventListener("pointerleave", onPointerLeave);
  cancelAnimationFrame(raf);
  worker?.terminate();
});
</script>

<style scoped>
.section-welcome-services{
  position: relative;
  height: 100vh;
  background: var(--background-color, #000);
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-items: center;
  overflow: hidden;
  margin-inline: -5px;
  padding-inline: 0;
}
.headline{
  position: relative;
  z-index: 1;
  width: 100%;
  margin-block: 1rem;
  pointer-events: none;
}
.headline h1{
  font-size: calc(var(--h1-size, 4rem) * 1.1);
}
.headline-image{
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  margin-inline-start: 2rem;
}

/* Canvas blendet ein, sobald das erste Mesh da ist */
.mesh-canvas{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 0;
  opacity: 0;
  transition: opacity .3s ease;
}
.mesh-canvas.mesh-ready{ opacity: 1; }


@media (max-width:1000px) {

  .section-welcome-services{
    margin-inline:0;
  }

  .headline h1{
    font-size: var(--h1-size);
    margin-block:5vh;
  }
  .headline-image{
  height: var(--h1-size);
  margin-inline: 1rem;
}
.images{
  width: 100%;
  text-align: center;
}
}
</style>
