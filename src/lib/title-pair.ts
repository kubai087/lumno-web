/**
 * A "\n" in a title splits it into a roman lead line and an italic accent line,
 * the editorial pair the hero slogan uses. Copy without one renders as is.
 */
export function splitTitlePair(title: string): { lead: string; accent: string } | null {
  const index = title.indexOf("\n");
  if (index < 0) return null;
  return { lead: title.slice(0, index), accent: title.slice(index + 1) };
}
