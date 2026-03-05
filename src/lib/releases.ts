export type ReleaseItem = {
  id: number;
  name: string;
  tag: string;
  url: string;
  date: string;
  body: string;
  prerelease: boolean;
};

type GitHubRelease = {
  id: number;
  name: string | null;
  tag_name: string;
  html_url: string;
  published_at: string | null;
  body: string | null;
  prerelease: boolean;
};

const REPO_OWNER = "kubai087";
const REPO_NAME = "lumno-web";

export async function fetchReleases(): Promise<ReleaseItem[]> {
  try {
    const owner = import.meta.env.GITHUB_RELEASES_OWNER || REPO_OWNER;
    const repo = import.meta.env.GITHUB_RELEASES_REPO || REPO_NAME;
    const endpoint = `https://api.github.com/repos/${owner}/${repo}/releases`;
    const token = import.meta.env.GITHUB_RELEASES_TOKEN;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      headers,
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as GitHubRelease[];
    return data.slice(0, 12).map((item) => ({
      id: item.id,
      name: item.name || item.tag_name,
      tag: item.tag_name,
      url: item.html_url,
      date: item.published_at || "",
      body: (item.body || "").trim(),
      prerelease: item.prerelease,
    }));
  } catch {
    return [];
  }
}

export function formatDate(
  dateIso: string,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  },
): string {
  if (!dateIso) return "Unknown date";
  const dt = new Date(dateIso);
  if (Number.isNaN(dt.getTime())) return "Unknown date";

  return new Intl.DateTimeFormat(locale, options).format(dt);
}
