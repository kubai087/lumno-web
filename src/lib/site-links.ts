import { getStoreVersions } from "./store-versions";

export { CHROME_STORE_URL } from "./seo";

export const EDGE_STORE_URL = "https://microsoftedge.microsoft.com/addons/detail/pfbklkaefmfamjpibfiapaiihlddhchc";
export const GITHUB_URL = "https://github.com/kubai087/lumno-extension";
export const GITHUB_ISSUE_URL = `${GITHUB_URL}/issues/new/choose`;
export const GITHUB_PULL_REQUEST_URL = `${GITHUB_URL}/compare`;
export const LICENSE_URL = `${GITHUB_URL}/blob/main/LICENSE`;

/** Store versions for the install menu, preferring the ones CI resolved before the build. */
export function getSiteStoreVersions() {
  return getStoreVersions({
    chrome: import.meta.env.PUBLIC_CHROME_STORE_VERSION || import.meta.env.CHROME_STORE_VERSION,
    edge: import.meta.env.PUBLIC_EDGE_STORE_VERSION || import.meta.env.EDGE_STORE_VERSION,
  });
}
