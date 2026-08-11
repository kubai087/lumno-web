export interface LumnoBuiltinSiteSearchProvider {
  action?: string;
  category?: string;
  key: string;
  name: string;
  template: string;
}

interface LumnoSiteSearchPayload {
  items?: unknown[];
}

const LUMNO_REPOSITORY_RAW_ROOT =
  "https://raw.githubusercontent.com/kubai087/lumno-extension/main";

export const LUMNO_SITE_SEARCH_ICON_ROOT =
  `${LUMNO_REPOSITORY_RAW_ROOT}/assets/images/site-search`;

const LUMNO_SITE_SEARCH_DATA_URL =
  `${LUMNO_REPOSITORY_RAW_ROOT}/assets/data/site-search.json`;

let providerRequest: Promise<LumnoBuiltinSiteSearchProvider[]> | null = null;

function normalizeProvider(value: unknown): LumnoBuiltinSiteSearchProvider | null {
  if (!value || typeof value !== "object") {
    return null;
  }
  const provider = value as Record<string, unknown>;
  const key = String(provider.key || "").trim();
  const name = String(provider.name || "").trim();
  const template = String(provider.template || "").trim();
  if (!key || !name || !template) {
    return null;
  }
  return {
    action: String(provider.action || "").trim() || undefined,
    category: String(provider.category || "").trim() || undefined,
    key,
    name,
    template,
  };
}

export function getLumnoBuiltinSiteSearchProviders() {
  if (!providerRequest) {
    providerRequest = fetch(LUMNO_SITE_SEARCH_DATA_URL, {
      signal: AbortSignal.timeout(8_000),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Lumno site-search data returned ${response.status}`);
        }
        const payload = (await response.json()) as LumnoSiteSearchPayload;
        return (Array.isArray(payload.items) ? payload.items : [])
          .map(normalizeProvider)
          .filter((provider): provider is LumnoBuiltinSiteSearchProvider => Boolean(provider));
      })
      .catch((error) => {
        console.warn("Unable to load Lumno built-in site-search providers", error);
        return [];
      });
  }
  return providerRequest;
}
