import { useState } from "react";
import {
  SettingsBadge,
  SettingsButton,
  SettingsDivider,
  SettingsRow,
  SettingsSection,
  SettingsSegmentedControl,
  SettingsSelect,
  SettingsSurface,
  SettingsSwitch,
  SettingsTabs,
  ShortcutKeys,
} from "./SettingsKit";

type ShowcaseLocale = "zh-CN" | "zh-TW" | "en";
type ShowcaseTab = "general" | "appearance" | "labs";
type ColorMode = "system" | "light" | "dark";

const copy = {
  "zh-CN": {
    ariaLabel: "Lumno 设置组件示例",
    tabsLabel: "设置分类",
    tabs: { general: "常规", appearance: "外观", labs: "实验室" },
    sectionGlobal: "全局",
    sectionNewTab: "新标签页",
    sectionQuickActions: "快捷操作",
    sectionBrowser: "浏览器",
    language: "语言",
    languageDescription: "选择 Lumno 的界面语言",
    updateNotice: "更新提示",
    updateNoticeDescription: "更新到新版本时显示新功能组件",
    autoPip: "视频自动画中画",
    autoPipDescription: "切换标签页时，让正在播放的视频保持可见",
    tabSwitcher: "标签切换器",
    tabSwitcherDescription: "快速查看并切换最近使用的标签页",
    shortcutLabel: "标签切换器快捷键",
    colorMode: "深浅色模式",
    colorModeDescription: "跟随系统，或固定使用浅色、深色外观",
    modeSystem: "跟随系统",
    modeLight: "浅色",
    modeDark: "深色",
    dynamicEffects: "动态效果",
    dynamicEffectsDescription: "如遇卡顿，或偏好更利落的唤起方式，可关闭",
    shortcuts: "快捷方式",
    shortcutsDescription: "在新标签页展示常用网站入口",
    siteCards: "快捷方式样式",
    siteCardsDescription: "选择图标、卡片或紧凑布局",
    icon: "图标",
    card: "卡片",
    compact: "紧凑",
    focusSize: "聚焦浮层尺寸",
    focusSizeDescription: "调整命令栏展开后的内容宽度",
    small: "小",
    medium: "中",
    large: "大",
    selectionActions: "划词快捷操作",
    selectionActionsDescription: "选中文字后显示搜索、翻译与 AI 操作",
    aiProvider: "AI 快捷操作",
    aiProviderDescription: "选择默认打开的 AI 服务",
    documentPip: "网页剪裁",
    documentPipDescription: "将网页中的视频或内容固定在画中画窗口",
    pinnedRestore: "恢复置顶标签页",
    pinnedRestoreDescription: "浏览器启动时恢复上次固定的标签页",
    experimental: "实验性",
    reset: "恢复默认",
  },
  "zh-TW": {
    ariaLabel: "Lumno 設定元件示例",
    tabsLabel: "設定分類",
    tabs: { general: "一般", appearance: "外觀", labs: "實驗室" },
    sectionGlobal: "全域",
    sectionNewTab: "新分頁",
    sectionQuickActions: "快捷操作",
    sectionBrowser: "瀏覽器",
    language: "語言",
    languageDescription: "選擇 Lumno 的介面語言",
    updateNotice: "更新提示",
    updateNoticeDescription: "更新至新版本時顯示新功能元件",
    autoPip: "影片自動畫中畫",
    autoPipDescription: "切換分頁時，讓播放中的影片保持可見",
    tabSwitcher: "分頁切換器",
    tabSwitcherDescription: "快速檢視並切換最近使用的分頁",
    shortcutLabel: "分頁切換器快捷鍵",
    colorMode: "深淺色模式",
    colorModeDescription: "跟隨系統，或固定使用淺色、深色外觀",
    modeSystem: "跟隨系統",
    modeLight: "淺色",
    modeDark: "深色",
    dynamicEffects: "動態效果",
    dynamicEffectsDescription: "若遇到卡頓，或偏好更俐落的喚起方式，可將其關閉",
    shortcuts: "快捷方式",
    shortcutsDescription: "在新分頁顯示常用網站入口",
    siteCards: "快捷方式樣式",
    siteCardsDescription: "選擇圖示、卡片或緊湊版面",
    icon: "圖示",
    card: "卡片",
    compact: "緊湊",
    focusSize: "聚焦浮層尺寸",
    focusSizeDescription: "調整命令列展開後的內容寬度",
    small: "小",
    medium: "中",
    large: "大",
    selectionActions: "選字快捷操作",
    selectionActionsDescription: "選取文字後顯示搜尋、翻譯與 AI 操作",
    aiProvider: "AI 快捷操作",
    aiProviderDescription: "選擇預設開啟的 AI 服務",
    documentPip: "網頁剪裁",
    documentPipDescription: "將網頁中的影片或內容固定在畫中畫視窗",
    pinnedRestore: "還原置頂分頁",
    pinnedRestoreDescription: "瀏覽器啟動時還原上次固定的分頁",
    experimental: "實驗性",
    reset: "還原預設值",
  },
  en: {
    ariaLabel: "Lumno settings component showcase",
    tabsLabel: "Settings categories",
    tabs: { general: "General", appearance: "Appearance", labs: "Labs" },
    sectionGlobal: "Global",
    sectionNewTab: "New tab",
    sectionQuickActions: "Quick actions",
    sectionBrowser: "Browser",
    language: "Language",
    languageDescription: "Choose the language used across Lumno",
    updateNotice: "What’s new",
    updateNoticeDescription: "Show new features after Lumno is updated",
    autoPip: "Automatic picture in picture",
    autoPipDescription: "Keep playing videos visible when you switch tabs",
    tabSwitcher: "Tab switcher",
    tabSwitcherDescription: "See and switch between recently used tabs",
    shortcutLabel: "Tab switcher shortcut",
    colorMode: "Appearance",
    colorModeDescription: "Follow your system or keep Lumno light or dark",
    modeSystem: "System",
    modeLight: "Light",
    modeDark: "Dark",
    dynamicEffects: "Motion effects",
    dynamicEffectsDescription: "Turn these off for a faster, more direct opening experience",
    shortcuts: "Shortcuts",
    shortcutsDescription: "Show frequently used sites on the new tab page",
    siteCards: "Shortcut style",
    siteCardsDescription: "Choose an icon, card, or compact layout",
    icon: "Icon",
    card: "Card",
    compact: "Compact",
    focusSize: "Focus overlay size",
    focusSizeDescription: "Adjust the width of the expanded command bar",
    small: "Small",
    medium: "Medium",
    large: "Large",
    selectionActions: "Selection actions",
    selectionActionsDescription: "Show search, translate, and AI actions for selected text",
    aiProvider: "AI quick action",
    aiProviderDescription: "Choose which AI service opens by default",
    documentPip: "Web clipping",
    documentPipDescription: "Pin video or page content in a picture-in-picture window",
    pinnedRestore: "Restore pinned tabs",
    pinnedRestoreDescription: "Restore previously pinned tabs when the browser starts",
    experimental: "Experimental",
    reset: "Reset defaults",
  },
} as const;

export default function ExtensionSettingsShowcase({ locale = "zh-CN" }: { locale?: ShowcaseLocale }) {
  const messages = copy[locale];
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("appearance");
  const [colorMode, setColorMode] = useState<ColorMode>("light");
  const [dynamicEffects, setDynamicEffects] = useState(true);
  const [shortcuts, setShortcuts] = useState(true);
  const [updates, setUpdates] = useState(true);
  const [autoPip, setAutoPip] = useState(false);
  const [selectionActions, setSelectionActions] = useState(true);
  const [documentPip, setDocumentPip] = useState(false);
  const [pinnedRestore, setPinnedRestore] = useState(true);

  return (
    <SettingsSurface theme={colorMode === "dark" ? "dark" : "light"} ariaLabel={messages.ariaLabel}>
      <SettingsTabs
        items={[
          { value: "general", label: messages.tabs.general, iconClass: "ri-settings-3-line" },
          { value: "appearance", label: messages.tabs.appearance, iconClass: "ri-palette-line" },
          { value: "labs", label: messages.tabs.labs, iconClass: "ri-flask-line" },
        ]}
        value={activeTab}
        onValueChange={setActiveTab}
        ariaLabel={messages.tabsLabel}
      />

      <div className="lumno-settings-showcase-panel" role="tabpanel">
        {activeTab === "general" ? (
          <SettingsSection title={messages.sectionGlobal}>
            <SettingsRow title={messages.language} description={messages.languageDescription}>
              <SettingsSelect
                label={messages.language}
                defaultValue={locale}
                items={[
                  { value: "zh-CN", label: "简体中文" },
                  { value: "zh-TW", label: "繁體中文" },
                  { value: "en", label: "English" },
                ]}
              />
            </SettingsRow>
            <SettingsDivider />
            <SettingsRow title={messages.updateNotice} description={messages.updateNoticeDescription}>
              <SettingsSwitch label={messages.updateNotice} checked={updates} onCheckedChange={setUpdates} />
            </SettingsRow>
            <SettingsDivider />
            <SettingsRow title={messages.autoPip} description={messages.autoPipDescription}>
              <SettingsSwitch label={messages.autoPip} checked={autoPip} onCheckedChange={setAutoPip} />
            </SettingsRow>
            <SettingsDivider />
            <SettingsRow title={messages.tabSwitcher} description={messages.tabSwitcherDescription}>
              <ShortcutKeys keys={["⌘", "⇧", "K"]} label={messages.shortcutLabel} />
            </SettingsRow>
          </SettingsSection>
        ) : null}

        {activeTab === "appearance" ? (
          <>
            <SettingsSection title={messages.sectionGlobal}>
              <SettingsRow title={messages.colorMode} description={messages.colorModeDescription}>
                <SettingsSegmentedControl
                  label={messages.colorMode}
                  value={colorMode}
                  onValueChange={setColorMode}
                  items={[
                    { value: "system", label: messages.modeSystem, iconClass: "ri-computer-line" },
                    { value: "light", label: messages.modeLight, iconClass: "ri-sun-line" },
                    { value: "dark", label: messages.modeDark, iconClass: "ri-moon-line" },
                  ]}
                />
              </SettingsRow>
              <SettingsDivider />
              <SettingsRow title={messages.dynamicEffects} description={messages.dynamicEffectsDescription}>
                <SettingsSwitch
                  label={messages.dynamicEffects}
                  checked={dynamicEffects}
                  onCheckedChange={setDynamicEffects}
                />
              </SettingsRow>
            </SettingsSection>

            <SettingsSection
              title={messages.sectionNewTab}
              action={<SettingsButton variant="ghost">{messages.reset}</SettingsButton>}
            >
              <SettingsRow title={messages.shortcuts} description={messages.shortcutsDescription}>
                <SettingsSwitch label={messages.shortcuts} checked={shortcuts} onCheckedChange={setShortcuts} />
              </SettingsRow>
              <SettingsDivider />
              <SettingsRow title={messages.siteCards} description={messages.siteCardsDescription}>
                <SettingsSegmentedControl
                  label={messages.siteCards}
                  defaultValue="card"
                  items={[
                    { value: "icon", label: messages.icon, iconClass: "ri-layout-grid-line" },
                    { value: "card", label: messages.card, iconClass: "ri-layout-4-line" },
                    { value: "compact", label: messages.compact, iconClass: "ri-list-check" },
                  ]}
                />
              </SettingsRow>
              <SettingsDivider />
              <SettingsRow title={messages.focusSize} description={messages.focusSizeDescription}>
                <SettingsSegmentedControl
                  label={messages.focusSize}
                  defaultValue="medium"
                  items={[
                    { value: "small", label: messages.small, iconClass: "ri-contract-left-right-line" },
                    { value: "medium", label: messages.medium, iconClass: "ri-expand-left-right-line" },
                    { value: "large", label: messages.large, iconClass: "ri-fullscreen-line" },
                  ]}
                />
              </SettingsRow>
            </SettingsSection>
          </>
        ) : null}

        {activeTab === "labs" ? (
          <>
            <SettingsSection
              title={messages.sectionQuickActions}
              action={<SettingsBadge tone="accent">{messages.experimental}</SettingsBadge>}
            >
              <SettingsRow title={messages.selectionActions} description={messages.selectionActionsDescription}>
                <SettingsSwitch
                  label={messages.selectionActions}
                  checked={selectionActions}
                  onCheckedChange={setSelectionActions}
                />
              </SettingsRow>
              <SettingsDivider />
              <SettingsRow title={messages.aiProvider} description={messages.aiProviderDescription}>
                <SettingsSelect
                  label={messages.aiProvider}
                  defaultValue="chatgpt"
                  items={[
                    { value: "chatgpt", label: "ChatGPT" },
                    { value: "claude", label: "Claude" },
                    { value: "gemini", label: "Gemini" },
                  ]}
                />
              </SettingsRow>
              <SettingsDivider />
              <SettingsRow title={messages.documentPip} description={messages.documentPipDescription}>
                <SettingsSwitch label={messages.documentPip} checked={documentPip} onCheckedChange={setDocumentPip} />
              </SettingsRow>
            </SettingsSection>

            <SettingsSection title={messages.sectionBrowser}>
              <SettingsRow title={messages.pinnedRestore} description={messages.pinnedRestoreDescription}>
                <SettingsSwitch
                  label={messages.pinnedRestore}
                  checked={pinnedRestore}
                  onCheckedChange={setPinnedRestore}
                />
              </SettingsRow>
            </SettingsSection>
          </>
        ) : null}
      </div>
    </SettingsSurface>
  );
}
