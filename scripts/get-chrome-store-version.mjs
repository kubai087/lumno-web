const extensionId = process.env.CHROME_EXTENSION_ID || "nggfkkbmogmadfoikakkfegkoilfcfao";
const productVersion = process.env.CHROME_PRODUCT_VERSION || "131.0.0.0";

function getUpdateUrl(id, prodVersion) {
  const query = new URLSearchParams({
    response: "updatecheck",
    prodversion: prodVersion,
    acceptformat: "crx2,crx3",
    x: `id=${id}&uc`,
  });
  return `https://clients2.google.com/service/update2/crx?${query.toString()}`;
}

async function main() {
  const endpoint = getUpdateUrl(extensionId, productVersion);
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/xml,text/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch update XML (${response.status})`);
  }

  const xml = await response.text();
  const match = xml.match(/<updatecheck\b[^>]*\bversion="([0-9A-Za-z._-]+)"/i);

  if (!match?.[1]) {
    throw new Error("Could not parse version from update XML");
  }

  process.stdout.write(match[1]);
}

main().catch((error) => {
  process.stderr.write(`[get-chrome-store-version] ${error.message}\n`);
  process.exit(1);
});
