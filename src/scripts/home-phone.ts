/*
 * Phone behaviour for the homepage demos: screens with no hover, and windows
 * as narrow as a phone's (the 760px gutter step in home.css), so narrowing a
 * desktop window previews the phone page. Desktop keeps its hover behaviour.
 *
 * Read it when it matters (an event, a finished pass) rather than once at
 * load, or listen for changes: resizing the window switches it live.
 */
export const PHONE_QUERY = "(hover: none), (max-width: 760px)";

let query: MediaQueryList | null = null;
const phoneQuery = () => (query ??= window.matchMedia(PHONE_QUERY));

export const isPhone = () => phoneQuery().matches;

export function onPhoneChange(listener: (phone: boolean) => void) {
  phoneQuery().addEventListener("change", (event) => listener(event.matches));
}
