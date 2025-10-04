/// <reference lib="webworker" />
// src/workers/meshWorker.ts
// Baut ein unregelmäßiges, planres Netz OFF-THREAD und liefert
// Nodes (bx/by) + Edges als Typed Arrays (Transferables).
// Tipp: tsconfig.json → { "compilerOptions": { "lib": ["ES2020","DOM","WebWorker"] } }

export type BuildMsg = {
  type: "build";
  w: number; h: number;
  spacing: number; jitter: number;
  kNearest: number; maxDistFactor: number;
  seq?: number; // Build-ID zur Entschärfung von „stale“ Antworten
};

type Vec = { x: number; y: number };
type Node = { x: number; y: number };
type Edge = [number, number];

declare const self: DedicatedWorkerGlobalScope;
export {};

self.onmessage = (e: MessageEvent<BuildMsg>) => {
  const msg = e.data;
  if (!msg || msg.type !== "build") return;

  const { w, h, spacing, jitter, kNearest, maxDistFactor } = msg;

  // 1) Punkte erzeugen: jittered Grid mit Randpuffer
  const s = spacing;
  const cols = Math.ceil(w / s) + 2;
  const rows = Math.ceil(h / s) + 2;
  const offsetX = -s;
  const offsetY = -s;

  const nodes: Node[] = new Array(rows * cols);
  let p = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++, p++) {
      const baseX = offsetX + c * s;
      const baseY = offsetY + r * s;
      const jx = (Math.random() * 2 - 1) * jitter;
      const jy = (Math.random() * 2 - 1) * jitter;
      nodes[p] = { x: baseX + jx, y: baseY + jy };
    }
  }

  // 2) Kanten: k-nächste Nachbarn innerhalb maxDist, ohne Kreuzungen
  const edges: Edge[] = [];
  const maxDist = s * maxDistFactor;

  // kleines O(n^2) reicht hier (läuft im Worker)
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    // Nachbarschaft sammeln (nur in Reichweite)
    const neigh: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d = Math.hypot(dx, dy);
      if (d > 0 && d <= maxDist) neigh.push({ j, d });
    }
    neigh.sort((A, B) => A.d - B.d);

    let added = 0;
    for (let n = 0; n < neigh.length && added < kNearest; n++) {
      const j = neigh[n]!.j;
      const e: Edge = i < j ? [i, j] : [j, i];
      if (edgeExists(edges, e)) continue;
      if (!intersectsAnyExistingEdge(e, edges, nodes)) {
        edges.push(e);
        added++;
      }
    }
  }

  // 3) Typed Arrays packen (Transfer → zero-copy)
  const nodeCount = nodes.length;
  const nodesBase = new Float32Array(nodeCount * 2);
  for (let i = 0; i < nodeCount; i++) {
    const n = nodes[i]!;
    nodesBase[i * 2] = n.x;
    nodesBase[i * 2 + 1] = n.y;
  }
  const edgesIdx = new Uint32Array(edges.length * 2);
  for (let i = 0; i < edges.length; i++) {
    edgesIdx[i * 2] = edges[i]![0];
    edgesIdx[i * 2 + 1] = edges[i]![1];
  }

  self.postMessage(
    { type: "mesh", nodes: nodesBase.buffer, edges: edgesIdx.buffer, seq: msg.seq ?? 0 },
    [nodesBase.buffer, edgesIdx.buffer]
  );
};

/** ---------- Helpers ---------- */

function edgeExists(list: Edge[], [u, v]: Edge) {
  for (let k = 0; k < list.length; k++) {
    const [a, b] = list[k]!;
    if ((a === u && b === v) || (a === v && b === u)) return true;
  }
  return false;
}

function intersectsAnyExistingEdge(e: Edge, list: Edge[], nodes: Node[]) {
  const [u, v] = e;
  const A = nodes[u]!, B = nodes[v]!;
  for (let k = 0; k < list.length; k++) {
    const [m, n] = list[k]!;
    // gemeinsame Endpunkte sind erlaubt
    if (u === m || u === n || v === m || v === n) continue;
    const C = nodes[m]!, D = nodes[n]!;
    if (segmentsIntersect(A, B, C, D)) return true;
  }
  return false;
}

function segmentsIntersect(a: Vec, b: Vec, c: Vec, d: Vec) {
  const o1 = orient(a, b, c), o2 = orient(a, b, d);
  const o3 = orient(c, d, a), o4 = orient(c, d, b);

  // Kollinear + auf Segment → gilt hier als Schnitt (wir vermeiden Überlappungen)
  if (o1 === 0 && onSegment(a, c, b)) return true;
  if (o2 === 0 && onSegment(a, d, b)) return true;
  if (o3 === 0 && onSegment(c, a, d)) return true;
  if (o4 === 0 && onSegment(c, b, d)) return true;

  return (o1 > 0 && o2 < 0 || o1 < 0 && o2 > 0) &&
         (o3 > 0 && o4 < 0 || o3 < 0 && o4 > 0);
}

function orient(p: Vec, q: Vec, r: Vec) {
  // >0: linksdrehend, <0: rechtsdrehend, 0: kollinear
  return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

function onSegment(p: Vec, q: Vec, r: Vec) {
  return Math.min(p.x, r.x) <= q.x && q.x <= Math.max(p.x, r.x) &&
         Math.min(p.y, r.y) <= q.y && q.y <= Math.max(p.y, r.y);
}
