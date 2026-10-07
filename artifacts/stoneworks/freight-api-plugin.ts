import type { IncomingMessage, ServerResponse } from 'http';
import type { Plugin } from 'vite';

type LiveFreightQuote = {
  lowUsd: number;
  highUsd: number;
  vendorName: string;
  asOf: string;
  currency: 'USD';
  mode: 'air' | 'sea' | 'land';
};

type FreightLiveResponse = {
  ok: boolean;
  quote?: LiveFreightQuote;
  reason?: 'no-keys' | 'unavailable' | 'invalid';
};

type ConnectNext = (error?: unknown) => void;

/**
 * Optional live freight proxy. Keys stay on the server (FREIGHTOS_*, SEARATES_*),
 * never VITE_-prefixed. Without keys the handler returns { ok: false, reason: 'no-keys' }
 * so the client keeps INDICATIVE corridor bands — it will not invent a carrier quote.
 */
export function freightApiPlugin(): Plugin {
  const handle = async (req: IncomingMessage, res: ServerResponse, next: ConnectNext) => {
    const url = req.url ?? '';
    if (!url.startsWith('/api/freight')) {
      next();
      return;
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');

    if (req.method !== 'GET') {
      res.statusCode = 405;
      res.end(JSON.stringify({ ok: false, reason: 'invalid' } satisfies FreightLiveResponse));
      return;
    }

    const query = new URL(url, 'http://stoneworks.local').searchParams;
    const mode = query.get('mode') ?? 'sea';
    const destCode = (query.get('destCode') ?? '').trim();
    const destAirport = (query.get('destAirport') ?? '').trim();
    const destPort = (query.get('destPort') ?? '').trim();
    const seaBox = query.get('seaBox') === '40ft' ? '40ft' : '20ft';
    const containers = Number(query.get('containers') ?? '1');
    const kg = Number(query.get('crates') ?? '1') * Number(query.get('kgEach') ?? '120');

    const freightos = readKey('FREIGHTOS_API_KEY', 'FREIGHTOS_AERO_API_KEY');
    const searates = readKey('SEARATES_API_KEY');

    if (!freightos && !searates) {
      res.statusCode = 200;
      res.end(JSON.stringify({ ok: false, reason: 'no-keys' } satisfies FreightLiveResponse));
      return;
    }

    try {
      const quote =
        (searates ? await quoteSeaRates(searates, { mode, destCode, destPort, seaBox, containers, kg }) : null) ??
        (freightos ? await quoteFreightos(freightos, { mode, destCode, destAirport, destPort, seaBox, containers, kg }) : null);

      if (!quote) {
        res.statusCode = 200;
        res.end(JSON.stringify({ ok: false, reason: 'unavailable' } satisfies FreightLiveResponse));
        return;
      }

      res.statusCode = 200;
      res.end(JSON.stringify({ ok: true, quote } satisfies FreightLiveResponse));
    } catch {
      res.statusCode = 200;
      res.end(JSON.stringify({ ok: false, reason: 'unavailable' } satisfies FreightLiveResponse));
    }
  };

  return {
    name: 'stoneworks-freight-api',
    configureServer(server) {
      server.middlewares.use(handle);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle);
    },
  };
}

function readKey(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return '';
}

type QuoteInput = {
  mode: string;
  destCode: string;
  destAirport?: string;
  destPort: string;
  seaBox: '20ft' | '40ft';
  containers: number;
  kg: number;
};

async function quoteSeaRates(apiKey: string, input: QuoteInput): Promise<LiveFreightQuote | null> {
  if (input.mode !== 'sea' && input.mode !== 'air') return null;
  const endpoint = new URL('https://sirius.searates.com/api/v2/rates');
  endpoint.searchParams.set('api_key', apiKey);
  endpoint.searchParams.set('origin', 'PKBQM');
  endpoint.searchParams.set('destination', input.destCode || input.destPort);
  endpoint.searchParams.set('container', input.seaBox === '40ft' ? '40ST' : '20ST');
  endpoint.searchParams.set('mode', input.mode === 'air' ? 'air' : 'ocean');
  if (input.mode === 'air') endpoint.searchParams.set('weight', String(Math.max(1, input.kg)));

  const data = await getJson(endpoint, { Authorization: `Bearer ${apiKey}` });
  const band = readMoneyBand(data);
  if (!band) return null;
  const qty = input.mode === 'sea' ? Math.max(1, input.containers) : 1;
  return {
    lowUsd: band.low * qty,
    highUsd: band.high * qty,
    vendorName: 'SeaRates',
    asOf: new Date().toISOString().slice(0, 10),
    currency: 'USD',
    mode: input.mode === 'air' ? 'air' : 'sea',
  };
}

async function quoteFreightos(apiKey: string, input: QuoteInput): Promise<LiveFreightQuote | null> {
  const aero = input.mode === 'air';
  const url = aero ? 'https://api.freightos.com/aero/v1/quotes' : 'https://api.freightos.com/api/v1/quotes';
  const body = aero
    ? {
        origin: { airport: 'KHI' },
        destination: { airport: input.destAirport || input.destCode },
        weightKg: Math.max(1, input.kg),
      }
    : {
        origin: { port: 'PKBQM' },
        destination: { port: input.destCode || input.destPort },
        equipment: input.seaBox === '40ft' ? '40GP' : '20GP',
        quantity: Math.max(1, input.containers),
      };

  const data = await postJson(url, body, {
    Authorization: `Bearer ${apiKey}`,
    'X-API-Key': apiKey,
  });
  const band = readMoneyBand(data);
  if (!band) return null;
  return {
    lowUsd: band.low,
    highUsd: band.high,
    vendorName: aero ? 'Freightos Aero' : 'Freightos',
    asOf: new Date().toISOString().slice(0, 10),
    currency: 'USD',
    mode: aero ? 'air' : 'sea',
  };
}

function readMoneyBand(data: unknown): { low: number; high: number } | null {
  if (!data || typeof data !== 'object') return null;
  const values = collectUsd(data);
  if (values.length === 0) return null;
  const low = Math.min(...values);
  const high = Math.max(...values);
  if (!Number.isFinite(low) || low <= 0) return null;
  return { low, high: Math.max(high, low) };
}

function collectUsd(value: unknown, acc: number[] = []): number[] {
  if (typeof value === 'number' && Number.isFinite(value) && value > 20 && value < 250_000) {
    acc.push(value);
    return acc;
  }
  if (!value || typeof value !== 'object') return acc;
  if (Array.isArray(value)) {
    for (const item of value) collectUsd(item, acc);
    return acc;
  }
  const record = value as Record<string, unknown>;
  const keys = ['totalUsd', 'total_usd', 'priceUsd', 'usd', 'amount', 'total', 'min', 'max', 'low', 'high'];
  for (const key of keys) {
    const raw = record[key];
    if (typeof raw === 'number') collectUsd(raw, acc);
  }
  if (typeof record.currency === 'string' && record.currency.toUpperCase() === 'USD') {
    collectUsd(record.value ?? record.price ?? record.rate, acc);
  }
  for (const nested of Object.values(record)) {
    if (nested && typeof nested === 'object') collectUsd(nested, acc);
  }
  return acc;
}

async function getJson(url: URL, headers: Record<string, string>) {
  const response = await fetch(url, { headers: { Accept: 'application/json', ...headers }, signal: AbortSignal.timeout(8_000) });
  if (!response.ok) return null;
  return response.json();
}

async function postJson(url: string, body: unknown, headers: Record<string, string>) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) return null;
  return response.json();
}
