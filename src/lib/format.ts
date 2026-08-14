// Number & currency formatting helpers (client-safe, no server dependency).

export type CurrencyCode = 'USD' | 'GBP' | 'CAD' | 'AUD' | 'EUR';

const FALLBACK_SYMBOL: Record<CurrencyCode, string> = {
  USD: '$',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'A$',
  EUR: '€',
};

/** Format a monetary amount, rounded to whole units by default. */
export function money(n: number, currency: CurrencyCode = 'USD', decimals = 0): string {
  const safe = Number.isFinite(n) ? n : 0;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(safe);
  } catch {
    return `${FALLBACK_SYMBOL[currency] ?? '$'}${safe.toLocaleString('en-US', {
      maximumFractionDigits: decimals,
    })}`;
  }
}

/** Format a plain number with a bounded number of decimals (conversion results). */
export function number(n: number, decimals = 4): string {
  const safe = Number.isFinite(n) ? n : 0;
  return safe.toLocaleString('en-US', { maximumFractionDigits: decimals });
}

/** Format a percentage value. */
export function percent(n: number, decimals = 2): string {
  return `${(Number.isFinite(n) ? n : 0).toFixed(decimals)}%`;
}
