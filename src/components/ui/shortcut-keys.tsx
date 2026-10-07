import type { ShortcutKey } from "@/lib/shortcut-keys";
import { shortcutKeyId } from "@/lib/shortcut-keys";

interface ShortcutKeysProps {
  keys: readonly ShortcutKey[];
  className?: string;
}

export function ShortcutKeys({ keys, className }: ShortcutKeysProps) {
  return (
    <span className={className}>
      {keys.map((key) => (
        <kbd key={shortcutKeyId(key)} className="home-kbd">
          {typeof key === "string" ? (
            key
          ) : (
            <>
              <span data-key-mac>{key.mac}</span>
              <span data-key-other>{key.other}</span>
            </>
          )}
        </kbd>
      ))}
    </span>
  );
}
