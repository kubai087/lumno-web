const CHROME_EXTENSION_ID = "nggfkkbmogmadfoikakkfegkoilfcfao";
const CHROME_PRODUCT_VERSION = "131.0.0.0";
const EDGE_EXTENSION_ID = "pfbklkaefmfamjpibfiapaiihlddhchc";
const VERSION_PATTERN = /^[0-9]+(?:\.[0-9A-Za-z_-]+)+$/;
const REQUEST_TIMEOUT_MS = 8_000;

export interface StoreVersions {
  chrome: string;
  edge: string;
}

type StoreVersionOverrides = Partial<StoreVersions>;

const versionRequests = new Map<string, Promise<StoreVersions>>();

function normalizeVersion(version: unknown) {
  const normalized = String(version || "").trim().replace(/^v/i, "");
  return VERSION_PATTERN.test(normalized) ? normalized : "";
}

function getChromeUpdateUrl() {
  const query = new URLSearchParams({
    response: "updatecheck",
    prodversion: CHROME_PRODUCT_VERSION,
    acceptformat: "crx2,crx3",
    x: `id=${CHROME_EXTENSION_ID}&uc`,
  });

  return `https://clients2.google.com/service/update2/crx?${query.toString()}`;
}

function getEdgeProductDetailsUrl() {
  const url = new URL(
    `/addons/getproductdetailsbycrxid/${EDGE_EXTENSION_ID}`,
    "https://microsoftedge.microsoft.com",
  );
  url.searchParams.set("hl", "en-US");
  url.searchParams.set("gl", "US");
  return url;
}

async function fetchChromeStoreVersion() {
  const response = await fetch(getChromeUpdateUrl(), {
    headers: { Accept: "application/xml,text/xml;q=0.9,*/*;q=0.8" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Chrome Web Store returned ${response.status}`);
  }

  const xml = await response.text();
  const match = xml.match(/<updatecheck\b[^>]*\bversion="([0-9A-Za-z._-]+)"/i);
  const version = normalizeVersion(match?.[1]);

  if (!version) {
    throw new Error("Chrome Web Store response did not contain a version");
  }

  return version;
}

async function fetchEdgeStoreVersion() {
  const response = await fetch(getEdgeProductDetailsUrl(), {
    headers: {
      Accept: "application/json",
      "User-Agent": "lumno-web-store-version-check/1.0",
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Microsoft Edge Add-ons returned ${response.status}`);
  }

  const product = await response.json();
  const version = normalizeVersion(product?.version);

  if (!version) {
    throw new Error("Microsoft Edge Add-ons response did not contain a version");
  }

  return version;
}

async function resolveVersion(
  storeName: "Chrome" | "Edge",
  override: string,
  fetchVersion: () => Promise<string>,
) {
  if (override) return override;

  try {
    return await fetchVersion();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[store-versions] ${storeName} version unavailable: ${message}`);
    return "";
  }
}

/**
 * Resolves store versions during Astro rendering. CI-provided versions win, while
 * local development and ordinary static builds fall back to the live stores.
 */
export function getStoreVersions(overrides: StoreVersionOverrides = {}) {
  const chromeOverride = normalizeVersion(overrides.chrome);
  const edgeOverride = normalizeVersion(overrides.edge);
  const cacheKey = `${chromeOverride}|${edgeOverride}`;
  const cachedRequest = versionRequests.get(cacheKey);

  if (cachedRequest) return cachedRequest;

  const request = Promise.all([
    resolveVersion("Chrome", chromeOverride, fetchChromeStoreVersion),
    resolveVersion("Edge", edgeOverride, fetchEdgeStoreVersion),
  ]).then(([chrome, edge]) => {
    if (!chrome || !edge) versionRequests.delete(cacheKey);
    return { chrome, edge };
  });

  versionRequests.set(cacheKey, request);
  return request;
}
