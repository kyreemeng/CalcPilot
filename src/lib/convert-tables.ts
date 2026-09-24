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

/**
 * Further exact definitions quoted in page titles.
 *
 * Every value below is exact by definition (not a measurement), so a title
 * stating them cannot drift: the inch, foot, mile, acre and US gallon are all
 * fixed ratios in SI terms. Sources: SI Brochure (BIPM) and NIST SP 811.
 */
export const IN_PER_FT = 12;
export const CM_PER_IN = 2.54;
export const M_PER_FT = 0.3048;
export const KM_PER_MILE = 1.609344;
export const M2_PER_ACRE = 4046.8564224;
export const L_PER_US_GAL = 3.785411784;
/** Binary convention used site-wide; the decimal 1,000 basis is documented on the page. */
export const MB_PER_GB = 1024;

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

/**
 * Converted value formatted for use inside a <title>.
 *
 * Page titles are the highest-visibility line in a search result, so the
 * answer earns its space there — but only if it stays short. A fixed 4-decimal
 * result reads well at "2.2046 lb" and badly at "132.2774 lb". Scaling the
 * decimals by magnitude keeps every title in the 40–60 character band:
 * values at or above 100 use 2 decimals, everything smaller uses 4.
 *
 * Always pair this with "≈" rather than "=" in consumer-facing copy: the
 * displayed figure is rounded, while the factor itself (2.2046226218) is exact.
 * See docs/COMPETITOR-ANALYSIS-coolconversion-2026-09-24.md.
 */
export function headlineValue(value: number, digits?: number): string {
  return fmt(value, digits ?? (Math.abs(value) >= 100 ? 2 : 4));
}

/** Fixed-decimal formatting with trailing zeros trimmed ("0.06", not "0.060000"). */
export function fmtTrim(value: number, maxDigits = 6): string {
  return round(value, maxDigits).toLocaleString('en-US', {
    maximumFractionDigits: maxDigits,
    useGrouping: true,
  });
}

export const G_PER_KG = 1000;
export const TONNE_PER_KG = 0.001;
/** 1 international avoirdupois ounce = 28.349523125 g exactly. */
export const G_PER_OZ = 28.349523125;
export const OZ_PER_KG = G_PER_KG / G_PER_OZ;

export interface SameMagnitudeRow {
  /** Unit name as it reads in a table cell, e.g. "Stones (st)". */
  label: string;
  /** This magnitude expressed in that unit. */
  value: string;
}

/**
 * The same mass written out in every unit the site covers.
 *
 * Value pages are otherwise a single number and a table of neighbours, which
 * gives a crawler and a reader very little to work with. Restating the one
 * magnitude across the family adds substance the page can be judged on, and
 * mirrors the "is also equal to" block used by established conversion sites
 * (see docs/COMPETITOR-ANALYSIS-coolconversion-2026-09-24.md).
 */
export function sameMagnitude(kg: number): SameMagnitudeRow[] {
  return [
    { label: 'Pounds (lb)', value: fmtTrim(kg * LB_PER_KG, 4) },
    { label: 'Stones (st)', value: fmtTrim(kg / KG_PER_STONE, 4) },
    { label: 'Stones and pounds (st + lb)', value: stonesAndPounds(kg) },
    { label: 'Grams (g)', value: fmtTrim(kg * G_PER_KG, 0) },
    { label: 'Ounces (oz)', value: fmtTrim(kg * OZ_PER_KG, 4) },
    { label: 'Metric tonnes (t)', value: fmtTrim(kg * TONNE_PER_KG, 4) },
  ];
}

/** Body-weight phrasing used in the UK: "9 st 6.3 lb". */
export function stonesAndPounds(kg: number): string {
  const totalLb = kg * LB_PER_KG;
  const wholeStones = Math.floor(totalLb / 14);
  const remainderLb = totalLb - wholeStones * 14;
  return `${wholeStones} st ${fmtTrim(remainderLb, 1)} lb`;
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
