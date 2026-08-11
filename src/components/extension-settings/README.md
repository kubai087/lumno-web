# Lumno settings component kit

Website-safe React components derived from the extension settings UI. The kit owns presentation and local interaction only; browser APIs, extension storage, and settings persistence stay in the consuming feature.

```tsx
import {
  SettingsRow,
  SettingsSection,
  SettingsSurface,
  SettingsSwitch,
} from "./extension-settings/SettingsKit";

<SettingsSurface ariaLabel="Appearance settings">
  <SettingsSection title="Global">
    <SettingsRow title="Motion effects" description="Animate panels and transitions">
      <SettingsSwitch label="Motion effects" checked={enabled} onCheckedChange={setEnabled} />
    </SettingsRow>
  </SettingsSection>
</SettingsSurface>;
```

All form components support controlled and uncontrolled usage. Place the kit inside a React island when it needs to be interactive on an Astro page.
