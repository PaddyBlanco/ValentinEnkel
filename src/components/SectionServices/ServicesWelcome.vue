<template>
  <section class="section-welcome-services">
    <h1>Greifbarer Mehrwert<br/>von innen heraus.</h1>
    <canvas ref="canvas" class="mesh-canvas" aria-hidden="true"></canvas>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

/** ---------- Konfiguration (Look & Feel) ---------- */
const cfg = {
  bg: "#000000",
  lineBase: "rgba(255,255,255,0.07)",   // dezentes Netz
  linePeak: "rgba(255,255,255,0.95)",   // Wellen-Highlight
  lineWidth: 1,                         // px (wird mit DPR multipliziert)
  spacing: 64,                          // Abstand der Knoten (px)
  wave: {
    speed: 260,      // px/s – Ausbreitungsgeschwindigkeit
    band: 42,        // „Bandbreite“ der Front (größer = weicher)
    amplitude: 6,    // max. Knoten-Auslenkung (px)
    period: 4.8,     // s – Zeit zwischen zwei Wellen
    count: 3         // gleichzeitig „laufende“ Fronten (versetzt)
  },
  subtleDrift: 0.15, // sehr leichter Grunddrift (px), 0 = aus
};

/** ---------- Setup ---------- */
type Vec = { x: number; y: number };
type Node = { x: number; y: number; bx: number; by: number }; // base + current
type Edge = [number, number]; // Indizes in nodes

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let nodes: Node[] = [];
let edges: Edge[] = [];
let raf = 0;
let center: Vec = { x: 0, y: 0 };
let dpr = Math.max(1, window.devicePixelRatio || 1);
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/** ---------- Triangular/Hex-Mesh ohne Überschneidungen ---------- */
function buildMesh(w: number, h: number) {
  nodes = [];
  edges = [];

  const s = cfg.spacing;
  const rowH = s * Math.sin(Math.PI / 3); // ≈ 0.866 * s
  const cols = Math.ceil(w / s) + 3;      // +Buffer über den Rand
  const rows = Math.ceil(h / rowH) + 3;

  // Knoten erzeugen (alternierende Offsets → hex/triangulär)
  for (let r = 0; r < rows; r++) {
    const y = r * rowH - rowH; // nach oben padden
    const isOdd = r % 2 === 1;
    for (let c = 0; c < cols; c++) {
      const x = (c + (isOdd ? 0.5 : 0)) * s - s; // nach links padden
      nodes.push({ x, y, bx: x, by: y });
    }
  }

  // Hilfsfunktion: Index in nodes
  const idx = (r: number, c: number) => r * cols + c;

  // Kanten setzen: rechts, unten-rechts, unten-links (keine Überschneidung)
  for (let r = 0; r < rows; r++) {
    const isOdd = r % 2 === 1;
    for (let c = 0; c < cols; c++) {
      const a = idx(r, c);
      // rechts
      if (c + 1 < cols) edges.push([a, idx(r, c + 1)]);
      // unten rechts
      if (r + 1 < rows) {
        const cr = c + (isOdd ? 0 : 1);
        if (cr >= 0 && cr < cols) edges.push([a, idx(r + 1, cr)]);
      }
      // unten links
      if (r + 1 < rows) {
        const cl = c + (isOdd ? -1 : 0);
        if (cl >= 0 && cl < cols) edges.push([a, idx(r + 1, cl)]);
      }
    }
  }
}

/** ---------- Canvas-Größe & DPR ---------- */
function resize() {
  if (!canvas.value) return;
  const { clientWidth, clientHeight } = canvas.value;
  dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.value.width = Math.floor(clientWidth * dpr);
  canvas.value.height = Math.floor(clientHeight * dpr);
  ctx = canvas.value.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // 1 CSS px = 1 Einheit
  center = { x: clientWidth / 2, y: clientHeight / 2 };
  buildMesh(clientWidth, clientHeight);
}

/** ---------- Wellenfunktion (Mehrere versetzte Fronten) ---------- */
function waveEnvelope(distance: number, t: number) {
  const { speed, band, period, count } = cfg.wave;
  let intensity = 0;
  for (let i = 0; i < count; i++) {
    const phase = ((t + (i * period) / count) % period);
    const R = speed * phase;                      // Front-Radius
    const delta = distance - R;
    // Gauß um die Front; 0.399 ~ 1/sqrt(2π) für ordentlichen Peak
    const gauss = Math.exp(-(delta * delta) / (2 * band * band));
    intensity += gauss;
  }
  return intensity; // 0..≈count
}

/** ---------- Animation-Loop ---------- */
function animate(ts: number) {
  if (!ctx || !canvas.value) return;
  const t = ts / 1000; // Sekunden
  const w = canvas.value.clientWidth;
  const h = canvas.value.clientHeight;

  // Hintergrund
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = cfg.bg;
  ctx.fillRect(0, 0, w, h);

  // Knoten verschieben (kleine Auslenkung entlang radialer Richtung)
  // und Kanten zeichnen (Helligkeit an der Front hochfahren)
  const { amplitude } = cfg.wave;

  // optionaler „Atmungs“-Drift (sehr subtil)
  const driftX = cfg.subtleDrift ? Math.sin(t * 0.3) * cfg.subtleDrift : 0;
  const driftY = cfg.subtleDrift ? Math.cos(t * 0.27) * cfg.subtleDrift : 0;

  // Knoten-Update
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    const dx = (n.bx + driftX) - center.x;
    const dy = (n.by + driftY) - center.y;
    const dist = Math.hypot(dx, dy) || 1;
    const dirX = dx / dist, dirY = dy / dist;

    const env = prefersReducedMotion ? 0 : waveEnvelope(dist, t);
    const disp = Math.min(1, env) * amplitude; // clamp
    n.x = n.bx + dirX * disp;
    n.y = n.by + dirY * disp;
  }

  // Linien zeichnen
  ctx.lineWidth = cfg.lineWidth;
  for (let e = 0; e < edges.length; e++) {
    const [ai, bi] = edges[e];
    const a = nodes[ai], b = nodes[bi];

    // Intensität ~ Nähe der Front (nehme max der Endpunkte)
    const da = Math.hypot((a.x - center.x), (a.y - center.y));
    const db = Math.hypot((b.x - center.x), (b.y - center.y));
    const ia = waveEnvelope(da, t);
    const ib = waveEnvelope(db, t);
    const inten = Math.min(1, Math.max(ia, ib)); // 0..1

    // Farbe zwischen Basis & Peak mischen
    ctx.strokeStyle = mixRGBA(cfg.lineBase, cfg.linePeak, inten);

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  raf = requestAnimationFrame(animate);
}

/** ---------- Farbinterpolation (rgba strings) ---------- */
function mixRGBA(a: string, b: string, t: number) {
  const pa = parseRgba(a), pb = parseRgba(b);
  const lerp = (x: number, y: number) => x + (y - x) * t;
  const r = Math.round(lerp(pa[0], pb[0]));
  const g = Math.round(lerp(pa[1], pb[1]));
  const bl = Math.round(lerp(pa[2], pb[2]));
  const alpha = lerp(pa[3], pb[3]);
  return `rgba(${r},${g},${bl},${alpha})`;
}
function parseRgba(s: string): [number, number, number, number] {
  // erwartet rgba(r,g,b,a) oder rgb(r,g,b)
  const nums = s.match(/[\d.]+/g)?.map(Number) ?? [255,255,255,1];
  if (nums.length === 3) nums.push(1);
  return nums as [number, number, number, number];
}

/** ---------- Lifecycle ---------- */
onMounted(() => {
  resize();
  window.addEventListener("resize", resize, { passive: true });
  if (!prefersReducedMotion) raf = requestAnimationFrame(animate);
  else drawStatic(); // statisches Netz ohne Animation
});
onUnmounted(() => {
  window.removeEventListener("resize", resize);
  cancelAnimationFrame(raf);
});

/** ---------- Static fallback ---------- */
function drawStatic() {
  if (!ctx || !canvas.value) return;
  const w = canvas.value.clientWidth;
  const h = canvas.value.clientHeight;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = cfg.bg;
  ctx.fillRect(0, 0, w, h);
  ctx.lineWidth = cfg.lineWidth;
  ctx.strokeStyle = cfg.lineBase;
  for (const [ai, bi] of edges) {
    const a = nodes[ai], b = nodes[bi];
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
}
</script>

<style scoped>
.section-welcome-services{
  position: relative;
  height: 100vh;
  background: #000;
  display: grid;
  place-items: center;
  overflow: hidden;
}
.section-welcome-services h1{
  position: relative;
  z-index: 1;
  color: #fff;
  font-size: clamp(2rem, 7vw, 7rem);
  line-height: 1.02;
  text-wrap: balance;
  text-align: center;
  pointer-events: none;
}
.mesh-canvas{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block; /* vermeidet whitespace */
  z-index: 0;
}
</style>
