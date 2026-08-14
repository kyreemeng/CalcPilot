// Donut chart geometry (client-safe). Renders segments as SVG stroke arcs.

export interface DonutArc {
  dash: string;
  offset: number;
}

/** Compute stroke-dasharray + offset for a set of segment values (radius in px). */
export function donutArcs(values: number[], radius = 64): DonutArc[] {
  const C = 2 * Math.PI * radius;
  const total = values.reduce((a, b) => a + (Number.isFinite(b) ? Math.max(0, b) : 0), 0) || 1;
  let acc = 0;
  return values.map((v) => {
    const val = Number.isFinite(v) ? Math.max(0, v) : 0;
    const len = (val / total) * C;
    const offset = -(acc / total) * C;
    acc += val;
    return { dash: `${len} ${C}`, offset };
  });
}
