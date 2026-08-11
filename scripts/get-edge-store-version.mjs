const extensionId = process.env.EDGE_EXTENSION_ID || "pfbklkaefmfamjpibfiapaiihlddhchc";
const storeOrigin = "https://microsoftedge.microsoft.com";

function getProductDetailsUrl(id) {
  const url = new URL(`/addons/getproductdetailsbycrxid/${encodeURIComponent(id)}`, storeOrigin);
  url.searchParams.set("hl", "en-US");
  url.searchParams.set("gl", "US");
  return url;
}

async function main() {
  const response = await fetch(getProductDetailsUrl(extensionId), {
    headers: {
      Accept: "application/json",
      "User-Agent": "lumno-web-store-version-check/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product details (${response.status})`);
  }

  const product = await response.json();
  const version = String(product?.version || "").trim();

  if (!/^[0-9]+(?:\.[0-9A-Za-z_-]+)+$/.test(version)) {
    throw new Error("Could not parse version from product details");
  }

  process.stdout.write(version);
}

main().catch((error) => {
  process.stderr.write(`[get-edge-store-version] ${error.message}\n`);
  process.exit(1);
});
