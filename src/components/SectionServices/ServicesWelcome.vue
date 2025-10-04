<template>
  <section class="section-welcome-services">
     <div class="text-right headline"><h1>Greifbarer Mehrwert</h1></div>
     <div class="text-left flex-row headline">
        <h1 class="headline">von innen heraus.</h1>
        <ResponsiveImage name="aboutus/AboutUs-1" 
            alt="Webentwicklung-Service bei Valentin & Enkel"
            className="headline-image" sizes="4vw" /> 
             <ResponsiveImage name="aboutus/AboutUs-1" 
            alt="Webentwicklung-Service bei Valentin & Enkel"
            className="headline-image" sizes="4vw" /> 
             <ResponsiveImage name="aboutus/AboutUs-1" 
            alt="Webentwicklung-Service bei Valentin & Enkel"
            className="headline-image" sizes="4vw" />   
    </div>
    <canvas ref="canvas" class="mesh-canvas" aria-hidden="true"></canvas>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import ResponsiveImage from "../Core/ResponsiveImage.vue";

/** ---------- Look & Feel ---------- */
const cfg = {
  bg: "#000000",
  lineBase: "rgba(255,255,255,0.1)",
  linePeak: "rgba(255,255,255,0.6)",  // nahe Weiß für Highlight
  lineWidth: 1,
  spacing: 32,
  jitter: 30,
  kNearest: 4,
  maxDistFactor: 1.8,
  wave: { speed: 170, band: 42, amplitude: 6, period: 8, count: 2 },
  subtleDrift: 0.15,
  cursor: {
    sigma: 30,   // „Radius“ des Maus-Highlights (px, als Gauß σ)
    boost: 0.5,   // extra Aufhellung (0..1) für im Cursorbereich
  },
};

type Vec = { x: number; y: number };
type Node = { x: number; y: number; bx: number; by: number };
type Edge = [number, number];

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let nodes: Node[] = [];
let edges: Edge[] = [];
let raf = 0;
let center: Vec = { x: 0, y: 0 };
let dpr = Math.max(1, window.devicePixelRatio || 1);
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Mauszustand */
const mouse = { x: Infinity, y: Infinity, active: false };

/** ---------- Unregelmäßiges, planres Netz ---------- */
function buildMeshIrregular(w: number, h: number) {
  nodes = [];
  edges = [];

  const s = cfg.spacing;
  const cols = Math.ceil(w / s) + 2;
  const rows = Math.ceil(h / s) + 2;
  const offsetX = -s, offsetY = -s;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const baseX = offsetX + c * s;
      const baseY = offsetY + r * s;
      const jx = (Math.random() * 2 - 1) * cfg.jitter;
      const jy = (Math.random() * 2 - 1) * cfg.jitter;
      const x = baseX + jx, y = baseY + jy;
      nodes.push({ x, y, bx: x, by: y });
    }
  }

  const maxDist = s * cfg.maxDistFactor;

  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d > 0 && d <= maxDist) dists.push({ j, d });
    }
    dists.sort((A, B) => A.d - B.d);

    let added = 0;
    for (const { j } of dists) {
      if (added >= cfg.kNearest) break;
      const e: Edge = i < j ? [i, j] : [j, i];
      if (edgeExists(edges, e)) continue;
      if (!intersectsAnyExistingEdge(e, edges)) {
        edges.push(e);
        added++;
      }
    }
  }
}
function edgeExists(list: Edge[], [u, v]: Edge) {
  for (let k = 0; k < list.length; k++) {
    const [a, b] = list[k];
    if ((a === u && b === v) || (a === v && b === u)) return true;
  }
  return false;
}
function intersectsAnyExistingEdge(e: Edge, list: Edge[]) {
  const [u, v] = e;
  const A = nodes[u], B = nodes[v];
  for (let k = 0; k < list.length; k++) {
    const [m, n] = list[k];
    if (u === m || u === n || v === m || v === n) continue;
    const C = nodes[m], D = nodes[n];
    if (segmentsIntersect(A, B, C, D)) return true;
  }
  return false;
}
function segmentsIntersect(a: Vec, b: Vec, c: Vec, d: Vec) {
  const o1 = orient(a, b, c), o2 = orient(a, b, d);
  const o3 = orient(c, d, a), o4 = orient(c, d, b);
  if (o1 === 0 && onSegment(a, c, b)) return true;
  if (o2 === 0 && onSegment(a, d, b)) return true;
  if (o3 === 0 && onSegment(c, a, d)) return true;
  if (o4 === 0 && onSegment(c, b, d)) return true;
  return (o1 > 0 && o2 < 0 || o1 < 0 && o2 > 0) &&
         (o3 > 0 && o4 < 0 || o3 < 0 && o4 > 0);
}
function orient(p: Vec, q: Vec, r: Vec) {
  return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}
function onSegment(p: Vec, q: Vec, r: Vec) {
  return Math.min(p.x, r.x) <= q.x && q.x <= Math.max(p.x, r.x) &&
         Math.min(p.y, r.y) <= q.y && q.y <= Math.max(p.y, r.y);
}

/** ---------- Canvas & DPR ---------- */
function resize() {
  if (!canvas.value) return;
  const { clientWidth, clientHeight } = canvas.value;
  dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.value.width  = Math.floor(clientWidth * dpr);
  canvas.value.height = Math.floor(clientHeight * dpr);
  ctx = canvas.value.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  center = { x: clientWidth / 2, y: clientHeight / 2 };
  buildMeshIrregular(clientWidth, clientHeight);
}

/** ---------- Hüllkurven ---------- */
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
function render(t: number) {
  if (!ctx || !canvas.value) return;
  const time = t / 1000;
  const w = canvas.value.clientWidth;
  const h = canvas.value.clientHeight;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = cfg.bg;
  ctx.fillRect(0, 0, w, h);

  const { amplitude } = cfg.wave;
  const driftX = cfg.subtleDrift ? Math.sin(time * 0.3) * cfg.subtleDrift : 0;
  const driftY = cfg.subtleDrift ? Math.cos(time * 0.27) * cfg.subtleDrift : 0;

  // Knoten aktualisieren (nur Welle + Drift; Cursor hellt nur, verschiebt nicht)
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    const dx = (n.bx + driftX) - center.x;
    const dy = (n.by + driftY) - center.y;
    const dist = Math.hypot(dx, dy) || 1;
    const dirX = dx / dist, dirY = dy / dist;

    const env = prefersReducedMotion ? 0 : waveEnvelope(dist, time);
    const disp = Math.min(1, env) * amplitude;
    n.x = n.bx + dirX * disp;
    n.y = n.by + dirY * disp;
  }

  // Linien zeichnen
  ctx.lineWidth = cfg.lineWidth;
  for (let e = 0; e < edges.length; e++) {
    const [ai, bi] = edges[e];
    const a = nodes[ai], b = nodes[bi];

    // Wellen-Intensität (Endpunkte)
    const da = Math.hypot(a.x - center.x, a.y - center.y);
    const db = Math.hypot(b.x - center.x, b.y - center.y);
    const iw = Math.min(1, Math.max(waveEnvelope(da, time), waveEnvelope(db, time)));

    // Cursor-Intensität (Endpunkte)
    let ic = 0;
    if (mouse.active) {
      const dam = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      const dbm = Math.hypot(b.x - mouse.x, b.y - mouse.y);
      ic = Math.max(cursorEnvelope(dam), cursorEnvelope(dbm)); // 0..1
      ic = Math.min(1, ic * (1 + cfg.cursor.boost));          // Boost
    }

    // kombinieren: max (kein „grau durch Überlagerung“)
    const inten = Math.min(1, Math.max(iw, ic));
    ctx.strokeStyle = mixRGBA(cfg.lineBase, cfg.linePeak, inten);

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
}

/** ---------- RAF Loop ---------- */
function animate(ts: number) {
  render(ts);
  raf = requestAnimationFrame(animate);
}

/** ---------- Farbe utils ---------- */
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
  const nums = s.match(/[\d.]+/g)?.map(Number) ?? [255,255,255,1];
  if (nums.length === 3) nums.push(1);
  return nums as [number, number, number, number];
}

/** ---------- Events ---------- */
function onPointerMove(e: PointerEvent) {
  if (!canvas.value) return;
  const rect = canvas.value.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
  mouse.active = true;

  // Reduced Motion: nur bei Bewegung neu zeichnen
  if (prefersReducedMotion) render(performance.now());
}
function onPointerLeave() {
  mouse.active = false;
  if (prefersReducedMotion) render(performance.now());
}

/** ---------- Lifecycle ---------- */
onMounted(() => {
  resize();
  window.addEventListener("resize", resize, { passive: true });
  canvas.value?.addEventListener("pointermove", onPointerMove, { passive: true });
  canvas.value?.addEventListener("pointerleave", onPointerLeave, { passive: true });

  if (!prefersReducedMotion) raf = requestAnimationFrame(animate);
  else render(performance.now());
});
onUnmounted(() => {
  window.removeEventListener("resize", resize);
  canvas.value?.removeEventListener("pointermove", onPointerMove);
  canvas.value?.removeEventListener("pointerleave", onPointerLeave);
  cancelAnimationFrame(raf);
});
</script>

<style scoped>
.section-welcome-services{
  position: relative;
  height: 100vh;
  background: var(--background-color);
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
  margin-block:1rem;
}
.headline h1{
    font-size: calc(var(--h1-size)*1.1);
}
.headline-image{
    height:100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    margin-inline-start: 2rem;
}


.mesh-canvas{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 0;
  /* optional: Touch-Pan verhindern, damit der Cursor-Spot „klebt“ */
  /* touch-action: none; */
}
</style>
