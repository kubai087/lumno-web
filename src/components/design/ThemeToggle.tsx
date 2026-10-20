import { useRef } from "react";
import { useSegmentedIndicator } from "./extension/segmented-indicator";
import { useDesignTheme, type ResolvedTheme } from "./theme";

/*
 * Light / dark as two icon-only tabs of the options page's tab strip
 * (settings-navigation.tsx markup), shown in the same frame as the filters.
 * Until a choice is made the page follows the system; the active icon shows
 * whichever theme is on.
 */
export function ThemeToggle({ label, lightLabel, darkLabel }: { label: string; lightLabel: string; darkLabel: string }) {
  const { resolved, setMode } = useDesignTheme();
  const indicatorRef = useRef<HTMLSpanElement>(null);
  useSegmentedIndicator(indicatorRef, resolved);

  const options: Array<{ value: ResolvedTheme; icon: string; label: string }> = [
    { value: "light", icon: "ri-sun-fill", label: lightLabel },
    { value: "dark", icon: "ri-moon-clear-fill", label: darkLabel },
  ];

  return (
    <div className="_x_extension_settings_tabs_2024_unique_ dg-theme-toggle" role="radiogroup" aria-label={label}>
      <span aria-hidden="true" className="_x_extension_tabs_indicator_2024_unique_" ref={indicatorRef} />
      {options.map((option) => (
        <button
          type="button"
          role="radio"
          className="_x_extension_settings_tab_button_2024_unique_"
          aria-checked={resolved === option.value}
          aria-label={option.label}
          title={option.label}
          data-active={resolved === option.value ? "true" : "false"}
          onClick={() => setMode(option.value)}
          key={option.value}
        >
          <i aria-hidden="true" className={`_x_extension_tab_icon_2024_unique_ ri-icon ${option.icon}`} />
        </button>
      ))}
    </div>
  );
}
