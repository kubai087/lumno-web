const REPO_OWNER = "kubai087";
const REPO_NAME = "lumno-extension";

let starsRequest: Promise<number | null> | null = null;

/**
 * The extension repository's star count, read once per build (every locale's
 * homepage shows it). null when GitHub can't be reached: the hero then shows
 * the open source pill without a number, and the next page retries.
 */
export function fetchGitHubStars(): Promise<number | null> {
  starsRequest ??= requestStars().then((stars) => {
    if (stars === null) starsRequest = null;
    return stars;
  });
  return starsRequest;
}

async function requestStars(): Promise<number | null> {
  try {
    const owner = import.meta.env.GITHUB_RELEASES_OWNER || REPO_OWNER;
    const repo = import.meta.env.GITHUB_RELEASES_REPO || REPO_NAME;
    const token = import.meta.env.GITHUB_RELEASES_TOKEN;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return null;
    }

    const { stargazers_count: stars } = (await response.json()) as { stargazers_count?: unknown };
    return typeof stars === "number" && Number.isFinite(stars) && stars > 0 ? stars : null;
  } catch {
    return null;
  }
}

/** 286 → "286", 1234 → "1.2K" in English, 12345 → "1.2万" in Chinese. */
export function formatStarCount(stars: number, locale: string): string {
  return new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }).format(stars);
}
