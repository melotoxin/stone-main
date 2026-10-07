import type { SeaBox, ShippingDraft, ShippingMode } from '@/data/shipping';
import { destinationPortLabel, getPresetDestination, resolveLane } from '@/data/shipping';

export type LiveFreightQuote = {
  lowUsd: number;
  highUsd: number;
  vendorName: string;
  asOf: string;
  currency: 'USD';
  mode: ShippingMode;
};

export type FreightLiveResponse = {
  ok: boolean;
  quote?: LiveFreightQuote;
  reason?: 'no-keys' | 'unavailable' | 'invalid';
};

export function freightQueryFromDraft(draft: ShippingDraft) {
  const preset = getPresetDestination(draft.destinationId);
  const { lane } = resolveLane(draft);
  return {
    mode: draft.mode,
    destinationId: draft.destinationId,
    destPort: destinationPortLabel(draft),
    destCode: preset?.portCode ?? '',
    destAirport: preset?.airportCode ?? '',
    customPort: draft.customPort,
    lane,
    crates: draft.crates,
    kgEach: draft.kgEach,
    cbmEach: draft.cbmEach,
    seaBox: draft.seaBox,
    containers: draft.containers,
    trucks: draft.trucks,
  };
}

export async function fetchLiveFreight(draft: ShippingDraft, signal?: AbortSignal): Promise<FreightLiveResponse> {
  const params = new URLSearchParams();
  const query = freightQueryFromDraft(draft);
  for (const [key, value] of Object.entries(query)) {
    params.set(key, String(value));
  }
  try {
    const response = await fetch(`/api/freight?${params.toString()}`, {
      headers: { Accept: 'application/json' },
      signal,
    });
    if (response.status === 404) return { ok: false, reason: 'unavailable' };
    if (!response.ok) return { ok: false, reason: 'unavailable' };
    const body = (await response.json()) as FreightLiveResponse;
    if (!body?.ok || !body.quote) return { ok: false, reason: body.reason ?? 'unavailable' };
    if (!Number.isFinite(body.quote.lowUsd) || !Number.isFinite(body.quote.highUsd)) {
      return { ok: false, reason: 'invalid' };
    }
    return body;
  } catch {
    return { ok: false, reason: 'unavailable' };
  }
}

export type FreightRequest = {
  mode: ShippingMode;
  destCode: string;
  destAirport: string;
  destPort: string;
  customPort: string;
  seaBox: SeaBox;
  containers: number;
  crates: number;
  kgEach: number;
  cbmEach: number;
};
