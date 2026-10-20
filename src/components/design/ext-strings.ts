import { createContext, useContext } from "react";
import type { ExtensionStringKey } from "./extension/strings";

/*
 * The extension's own interface text for the visitor's language
 * (extension/strings.ts, generated from lumno-extension/_locales), so the
 * controls read exactly as they do in Lumno.
 */
export type ExtensionStrings = Record<ExtensionStringKey, string>;

export const ExtensionStringsContext = createContext<ExtensionStrings | null>(null);

export function useExtensionText() {
  const strings = useContext(ExtensionStringsContext);
  return (key: ExtensionStringKey, values?: Record<string, string>) => {
    let text = strings?.[key] ?? key;
    if (values) Object.entries(values).forEach(([name, value]) => (text = text.replace(`{${name}}`, value)));
    return text;
  };
}
