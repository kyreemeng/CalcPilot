// Client-safe FX helpers. Primary: Frankfurter (ECB daily reference).
// Fallback: fawazahmed0/currency-api CDN (from public-apis). No API keys.

export interface FxQuote {
  rate: number;
  date: string;
  source: 'frankfurter' | 'currency-api';
  from: string;
  to: string;
}

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

async function fetchFrankfurter(from: string, to: string): Promise<FxQuote> {
  const url = `https://api.frankfurter.app/latest?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Frankfurter HTTP ${response.status}`);
  const data = (await response.json()) as { date?: string; rates?: Record<string, number> };
  const rate = data.rates?.[to];
  if (!Number.isFinite(rate) || (rate as number) <= 0) throw new Error('Frankfurter missing rate');
  return {
    rate: rate as number,
    date: data.date ?? 'unknown',
    source: 'frankfurter',
    from,
    to,
  };
}

async function fetchCurrencyApi(from: string, to: string): Promise<FxQuote> {
  const base = from.toLowerCase();
  const quote = to.toLowerCase();
  const urls = [
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.min.json`,
    `https://latest.currency-api.pages.dev/v1/currencies/${base}.min.json`,
  ];
  let lastError: unknown;
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`currency-api HTTP ${response.status}`);
      const data = (await response.json()) as { date?: string; [key: string]: unknown };
      const table = data[base] as Record<string, number> | undefined;
      const rate = table?.[quote];
      if (!Number.isFinite(rate) || (rate as number) <= 0) throw new Error('currency-api missing rate');
      return {
        rate: rate as number,
        date: typeof data.date === 'string' ? data.date : 'unknown',
        source: 'currency-api',
        from,
        to,
      };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error('currency-api failed');
}

/** Fetch 1 FROM = RATE TO. Same-currency returns 1. */
export async function fetchFxQuote(fromCode: string, toCode: string): Promise<FxQuote> {
  const from = normalizeCode(fromCode);
  const to = normalizeCode(toCode);
  if (!from || !to) throw new Error('Missing currency code');
  if (from === to) {
    return { rate: 1, date: new Date().toISOString().slice(0, 10), source: 'frankfurter', from, to };
  }
  try {
    return await fetchFrankfurter(from, to);
  } catch {
    return await fetchCurrencyApi(from, to);
  }
}

export function formatFxStatus(quote: FxQuote): string {
  if (quote.source === 'frankfurter') {
    return `ECB reference rate for ${quote.date} via Frankfurter. Not a bank quote; fees and spreads are excluded.`;
  }
  return `Community rate for ${quote.date} via currency-api. Not a bank quote; fees and spreads are excluded.`;
}
