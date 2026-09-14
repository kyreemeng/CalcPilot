// Conversion-table builders for SEO landing pages.
//
// Every row is computed at build time and emitted as plain HTML by Astro's
// static output — no client-side rendering, no "show more" pagination. That
// matters: content injected by front-end JS after load is not reliably
// discovered or indexed, so a table that only exists after an "expand" click
// is invisible to crawlers. See docs/SEO-SPRINT-2026-09.md.

export interface ConversionRow {
  /** Left cell, e.g. "60 kg". */
  from: string;
  /** Right cell, e.g. "132.28 lb". */
  to: string;
  /** Third column: the same magnitude read in the opposite direction. */
  reverse: string;
}

/** Exact international definitions used across the site. */
export const LB_PER_KG = 2.2046226218;
export const KG_PER_LB = 0.45359237;
export const KG_PER_STONE = 6.35029318;

/** Round half-away-from-zero to a fixed number of decimals. */
export function round(value: number, digits: number): number {
  const f = 10 ** digits;
  return Math.round((value + Number.EPSILON) * f) / f;
}

/** Fixed-decimal, thousands-grouped formatting (US English). */
export function fmt(value: number, digits = 2): string {
  return round(value, digits).toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: true,
  });
}

export interface FactorTableSpec {
  /** Input magnitudes, already sorted the way they should read. */
  values: number[];
  /** to = from × factor. */
  factor: number;
  fromUnit: string;
  toUnit: string;
  /** Decimals used when printing the "from" magnitude (0 = integer scale). */
  fromDigits?: number;
  /** Decimals used when printing the converted value. */
  toDigits?: number;
  /** Decimals used in the third (reverse-direction) column. */
  reverseDigits?: number;
}

/**
 * Build a three-column table: `from → to` plus the inverse reading of the same
 * magnitude. The third column lets one table cover both directions of a query
 * pair ("60 kg to lbs" and "60 lbs to kg") without a second table.
 */
export function makeFactorRows(spec: FactorTableSpec): ConversionRow[] {
  const { values, factor, fromUnit, toUnit, fromDigits = 0, toDigits = 2, reverseDigits = 4 } = spec;
  const inverse = 1 / factor;
  return values.map((v) => {
    const label = `${fmt(v, fromDigits)} ${fromUnit}`;
    return {
      from: label,
      to: `${fmt(v * factor, toDigits)} ${toUnit}`,
      reverse: `${label.replace(fromUnit, toUnit)} = ${fmt(v * inverse, reverseDigits)} ${fromUnit}`,
    };
  });
}

/** Ascending integer range, inclusive. */
export function range(from: number, to: number, step = 1): number[] {
  const out: number[] = [];
  for (let v = from; v <= to + 1e-9; v += step) out.push(round(v, 6));
  return out;
}
