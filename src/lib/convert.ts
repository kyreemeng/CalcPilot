// Unit converter engines (pure, client-safe).

export interface ConverterSpec {
  id: string;
  /** multiply a → b (b = a * factor + offset) */
  factor: number;
  /** offset for temperature-style conversions (e.g. °F = °C * 9/5 + 32) */
  offset?: number;
}

/** Generic linear + offset conversion in both directions. */
export function toB(a: number, spec: ConverterSpec): number {
  return a * spec.factor + (spec.offset ?? 0);
}

export function toA(b: number, spec: ConverterSpec): number {
  return (b - (spec.offset ?? 0)) / spec.factor;
}

/** Convert between units whose factors express one unit in a shared base unit. */
export function convertViaBase(value: number, fromFactor: number, toFactor: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(fromFactor) || !Number.isFinite(toFactor) || toFactor === 0) {
    return 0;
  }
  return (value * fromFactor) / toFactor;
}

export const specs: Record<string, ConverterSpec> = {
  weight: { id: 'weight', factor: 2.2046226218 }, // kg → lb
  length: { id: 'length', factor: 3.280839895 }, // m → ft
  temperature: { id: 'temperature', factor: 9 / 5, offset: 32 }, // °C → °F
  time: { id: 'time', factor: 60 }, // hr → min
  data: { id: 'data', factor: 1 / 1024 }, // MB → GB (base-2)
};
