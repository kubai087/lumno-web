export type ReleaseItem = {
  id: number;
  name: string;
  tag: string;
  url: string;
  date: string;
  body: string;
  prerelease: boolean;
};

export type ParsedReleaseBody = {
  tags: string[];
  summary: string;
  features: string[];
  bugFixes: string[];
  notes: string;
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
const REPO_NAME = "lumno-extension";

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

function normalizeHeading(heading: string): "features" | "bugFixes" | "notes" | null {
  const lower = heading.trim().toLowerCase();

  if (
    lower.includes("feature") ||
    lower.includes("enhancement") ||
    lower.includes("improvement")
  ) {
    return "features";
  }

  if (lower.includes("bug") || lower.includes("fix") || lower.includes("hotfix")) {
    return "bugFixes";
  }

  if (
    lower.includes("note") ||
    lower.includes("detail") ||
    lower.includes("changes") ||
    lower.includes("misc")
  ) {
    return "notes";
  }

  return null;
}

function parseInlineTags(raw: string): string[] {
  return raw
    .split(/[,|/]/g)
    .map((item) => item.trim().replace(/^#/, ""))
    .filter(Boolean);
}

function toListItem(raw: string): string {
  return raw.replace(/^[-*]\s+/, "").trim();
}

export function parseReleaseBody(body: string): ParsedReleaseBody {
  const lines = body.split(/\r?\n/);
  const features: string[] = [];
  const bugFixes: string[] = [];
  const notesLines: string[] = [];
  let section: "features" | "bugFixes" | "notes" | null = null;
  let summary = "";
  let tags: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    const tagsMatch = trimmed.match(/^tags?\s*:\s*(.+)$/i);
    if (tagsMatch && tags.length === 0) {
      tags = parseInlineTags(tagsMatch[1]);
      continue;
    }

    const summaryMatch = trimmed.match(/^summary\s*:\s*(.+)$/i);
    if (summaryMatch && !summary) {
      summary = summaryMatch[1].trim();
      continue;
    }

    const headingMatch = trimmed.match(/^##+\s+(.+)$/);
    if (headingMatch) {
      section = normalizeHeading(headingMatch[1]);
      continue;
    }

    if (!trimmed) {
      if (section === "notes") {
        notesLines.push("");
      }
      continue;
    }

    if (section === "features") {
      if (/^[-*]\s+/.test(trimmed) || features.length === 0) {
        features.push(toListItem(trimmed));
      } else {
        features[features.length - 1] = `${features[features.length - 1]} ${trimmed}`.trim();
      }
      continue;
    }

    if (section === "bugFixes") {
      if (/^[-*]\s+/.test(trimmed) || bugFixes.length === 0) {
        bugFixes.push(toListItem(trimmed));
      } else {
        bugFixes[bugFixes.length - 1] = `${bugFixes[bugFixes.length - 1]} ${trimmed}`.trim();
      }
      continue;
    }

    if (section === "notes") {
      notesLines.push(line);
    }
  }

  if (!summary) {
    summary = body.split(/\r?\n/).find((line) => line.trim())?.trim() || "";
  }

  const notes = notesLines.join("\n").trim();
  const hasStructuredContent = features.length > 0 || bugFixes.length > 0 || notes.length > 0;

  return {
    tags,
    summary,
    features,
    bugFixes,
    notes: hasStructuredContent ? notes : body.trim(),
  };
}
