import * as OpenCC from "opencc-js";

export type ReleaseItem = {
  id: number;
  name: string;
  tag: string;
  url: string;
  date: string;
  body: string;
  prerelease: boolean;
};

export type ReleaseLocaleContent = {
  summary: string;
  features: string[];
  bugFixes: string[];
};

export type ParsedReleaseBody = {
  tags: string[];
  locales: {
    "zh-CN": ReleaseLocaleContent;
    "zh-TW": ReleaseLocaleContent;
    en: ReleaseLocaleContent;
  };
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
const cnToTw = OpenCC.Converter({ from: "cn", to: "tw" });

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

function parseInlineTags(raw: string): string[] {
  return raw
    .split(/[,|/]/g)
    .map((item) => item.trim().replace(/^#/, ""))
    .filter(Boolean);
}

function toListItem(raw: string): string {
  return raw.replace(/^[-*]\s+/, "").trim();
}

function appendListItem(list: string[], line: string): void {
  const trimmed = line.trim();
  if (!trimmed) return;

  if (/^[-*]\s+/.test(trimmed) || list.length === 0) {
    list.push(toListItem(trimmed));
    return;
  }

  list[list.length - 1] = `${list[list.length - 1]} ${trimmed}`.trim();
}

function detectLanguageFromHeading(heading: string): "zh-CN" | "en" | null {
  const lower = heading.trim().toLowerCase();

  if (
    lower === "中文" ||
    lower === "简体中文" ||
    lower === "簡體中文" ||
    lower.includes("chinese") ||
    lower.includes("zh-cn")
  ) {
    return "zh-CN";
  }

  if (
    lower === "english" ||
    lower === "en" ||
    lower === "英文" ||
    lower.includes("english")
  ) {
    return "en";
  }

  return null;
}

function detectSectionFromHeading(
  heading: string,
): "summary" | "features" | "bugFixes" | null {
  const lower = heading.trim().toLowerCase();

  if (lower.includes("summary") || lower.includes("摘要")) {
    return "summary";
  }

  if (
    lower.includes("feature") ||
    lower.includes("enhancement") ||
    lower.includes("improvement") ||
    lower.includes("新功能") ||
    lower.includes("特性")
  ) {
    return "features";
  }

  if (lower.includes("bug") || lower.includes("fix") || lower.includes("hotfix") || lower.includes("修复") || lower.includes("修正")) {
    return "bugFixes";
  }

  return null;
}

function createEmptyLocaleContent(): ReleaseLocaleContent {
  return {
    summary: "",
    features: [],
    bugFixes: [],
  };
}

function convertLocaleContentToTraditional(content: ReleaseLocaleContent): ReleaseLocaleContent {
  return {
    summary: content.summary ? cnToTw(content.summary) : "",
    features: content.features.map((item) => cnToTw(item)),
    bugFixes: content.bugFixes.map((item) => cnToTw(item)),
  };
}

export function parseReleaseBody(body: string): ParsedReleaseBody {
  const lines = body.split(/\r?\n/);
  const summaryLines: Record<"zh-CN" | "en", string[]> = {
    "zh-CN": [],
    en: [],
  };
  const features: Record<"zh-CN" | "en", string[]> = {
    "zh-CN": [],
    en: [],
  };
  const bugFixes: Record<"zh-CN" | "en", string[]> = {
    "zh-CN": [],
    en: [],
  };

  let tags: string[] = [];
  let locale: "zh-CN" | "en" = "zh-CN";
  let section: "summary" | "features" | "bugFixes" = "summary";
  let sawZhFeatures = false;
  let sawZhBugFixes = false;
  let inHtmlComment = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("<!--")) {
      inHtmlComment = !trimmed.includes("-->");
      continue;
    }
    if (inHtmlComment) {
      if (trimmed.includes("-->")) inHtmlComment = false;
      continue;
    }

    const tagsMatch = trimmed.match(/^tags?\s*[:：]\s*(.+)$/i);
    if (tagsMatch && tags.length === 0) {
      tags = parseInlineTags(tagsMatch[1]);
      continue;
    }

    const summaryLabelMatch = trimmed.match(/^(summary|摘要)\s*[:：]\s*(.+)$/i);
    if (summaryLabelMatch) {
      summaryLines[locale].push(summaryLabelMatch[2].trim());
      continue;
    }

    // Preferred delimiter between Chinese and English blocks.
    if (/^-{2,}$/.test(trimmed)) {
      locale = "en";
      section = "summary";
      continue;
    }

    const headingMatch = trimmed.match(/^##+\s+(.+)$/);
    if (headingMatch) {
      const heading = headingMatch[1].trim();
      const localeHeading = detectLanguageFromHeading(heading);
      if (localeHeading) {
        locale = localeHeading;
        section = "summary";
        continue;
      }

      const sectionHeading = detectSectionFromHeading(heading);
      if (sectionHeading) {
        // No explicit locale heading: infer English block on the second Features/Bug Fixes section.
        if (
          locale === "zh-CN" &&
          sawZhFeatures &&
          sawZhBugFixes &&
          sectionHeading === "features" &&
          features.en.length === 0 &&
          bugFixes.en.length === 0
        ) {
          locale = "en";
          section = "summary";
          continue;
        }

        section = sectionHeading;
        if (locale === "zh-CN" && sectionHeading === "features") sawZhFeatures = true;
        if (locale === "zh-CN" && sectionHeading === "bugFixes") sawZhBugFixes = true;
      }
      continue;
    }

    if (!trimmed) {
      if (section === "summary" && summaryLines[locale].length > 0) {
        summaryLines[locale].push("");
      }
      continue;
    }

    if (section === "features") {
      appendListItem(features[locale], line);
      continue;
    }

    if (section === "bugFixes") {
      appendListItem(bugFixes[locale], line);
      continue;
    }

    summaryLines[locale].push(line);
  }

  const parsed: ParsedReleaseBody = {
    tags,
    locales: {
      "zh-CN": createEmptyLocaleContent(),
      "zh-TW": createEmptyLocaleContent(),
      en: createEmptyLocaleContent(),
    },
  };

  parsed.locales["zh-CN"].summary = summaryLines["zh-CN"].join("\n").trim();
  parsed.locales["zh-CN"].features = features["zh-CN"];
  parsed.locales["zh-CN"].bugFixes = bugFixes["zh-CN"];

  parsed.locales.en.summary = summaryLines.en.join("\n").trim();
  parsed.locales.en.features = features.en;
  parsed.locales.en.bugFixes = bugFixes.en;

  if (!parsed.locales["zh-CN"].summary && !parsed.locales["zh-CN"].features.length && !parsed.locales["zh-CN"].bugFixes.length) {
    const fallback = body
      .split(/\r?\n/)
      .find((line) => line.trim() && !/^tags?\s*:/i.test(line.trim()) && !/^##+\s+/.test(line.trim()))
      ?.trim();
    if (fallback) {
      parsed.locales["zh-CN"].summary = fallback;
    }
  }

  parsed.locales["zh-TW"] = convertLocaleContentToTraditional(parsed.locales["zh-CN"]);

  return parsed;
}
