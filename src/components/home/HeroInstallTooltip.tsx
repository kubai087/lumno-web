import { SettingsButton } from "../extension-settings/SettingsKit";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import "./hero-install-tooltip.css";

const BROWSER_LOGOS: ReadonlyArray<{
  name: string;
  src: string;
}> = [
  { name: "Chrome", src: "/assets/browser-logos/chrome.webp" },
  { name: "Edge", src: "/assets/browser-logos/edge.webp" },
  { name: "Perplexity Comet", src: "/assets/browser-logos/comet.webp" },
  { name: "Dia", src: "/assets/browser-logos/dia.webp" },
  { name: "Brave", src: "/assets/browser-logos/brave.webp" },
  { name: "Opera", src: "/assets/browser-logos/opera.webp" },
];

interface Props {
  label: string;
  ariaLabel: string;
  href: string;
  tooltipLabel: string;
}

export function HeroInstallTooltip({
  label,
  ariaLabel,
  href,
  tooltipLabel,
}: Props) {
  return (
    <TooltipProvider delayDuration={180} skipDelayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SettingsButton
            as="a"
            variant="primary"
            className="hero-actions-button"
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={ariaLabel}
            data-analytics-event="open_chrome_web_store"
            data-analytics-category="conversion"
            data-analytics-label="home_hero_install"
          >
            <span className="hero-install-butterfly" aria-hidden="true">
              <img
                src="/assets/lumno-selection-mark.png"
                alt=""
                width="18"
                height="18"
                decoding="async"
              />
            </span>
            {label}
          </SettingsButton>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="start"
          sideOffset={10}
          collisionPadding={12}
        >
          <div className="hero-browser-tooltip-content">
            <p className="hero-browser-tooltip-label">{tooltipLabel}</p>
            <ul className="hero-browser-tooltip-logos" aria-label={tooltipLabel}>
              {BROWSER_LOGOS.map(({ name, src }) => (
                <li
                  className="hero-browser-tooltip-logo"
                  data-browser-logo={name}
                  key={name}
                >
                  <img src={src} alt={name} width="24" height="24" />
                </li>
              ))}
              <li className="hero-browser-tooltip-more" aria-hidden="true">
                …
              </li>
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
