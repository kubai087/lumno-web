import { getStoreVersions } from "./store-versions";

export { CHROME_STORE_URL, EDGE_STORE_URL, FIREFOX_STORE_URL } from "./seo";
/** The store an install button sends a visitor to; the homepage picks it from their browser. */
export type InstallStore = "chrome" | "edge" | "firefox";
export const GITHUB_URL = "https://github.com/kubai087/lumno-extension";
export const GITHUB_ISSUE_URL = `${GITHUB_URL}/issues/new/choose`;
export const GITHUB_PULL_REQUEST_URL = `${GITHUB_URL}/compare`;
export const LICENSE_URL = `${GITHUB_URL}/blob/main/LICENSE`;
/** This website's own repository, apart from the extension's. */
export const WEBSITE_GITHUB_URL = "https://github.com/kubai087/lumno-web";

/** The author's other sites, linked from the footer. */
export const KUBAI_ICONS_URL = "https://icons.kubai.design/";
export const AUTHOR_SITE_URL = "https://www.kubai.design/";
export const AUTHOR_SITE_EN_URL = "https://www.kubai.design/en/";
/** A friend's site. Plain http until its custom domain serves a valid certificate. */
export const FRIEND_LINKS = [{ label: "Karl Coding", href: "http://www.leekarl.com/" }] as const;

/** Store versions for the install menu, preferring the ones CI resolved before the build. */
export function getSiteStoreVersions() {
  return getStoreVersions({
    chrome: import.meta.env.PUBLIC_CHROME_STORE_VERSION || import.meta.env.CHROME_STORE_VERSION,
    edge: import.meta.env.PUBLIC_EDGE_STORE_VERSION || import.meta.env.EDGE_STORE_VERSION,
    firefox: import.meta.env.PUBLIC_FIREFOX_STORE_VERSION || import.meta.env.FIREFOX_STORE_VERSION,
  });
}
