const addonId = process.env.FIREFOX_ADDON_ID || "lumno@kubai087";

// AMO only serves approved listed versions publicly; before that it answers 401.
async function main() {
  const response = await fetch(
    `https://addons.mozilla.org/api/v5/addons/addon/${encodeURIComponent(addonId)}/`,
    { headers: { Accept: "application/json" } },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch add-on details (${response.status})`);
  }

  const addon = await response.json();
  const version = String(addon?.current_version?.version || "").trim();

  if (!/^[0-9]+(?:\.[0-9A-Za-z_-]+)+$/.test(version)) {
    throw new Error("Could not parse version from add-on details");
  }

  process.stdout.write(version);
}

main().catch((error) => {
  process.stderr.write(`[get-firefox-store-version] ${error.message}\n`);
  process.exit(1);
});
