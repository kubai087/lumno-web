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
const FIREFOX_LOGO = { name: "Firefox", src: "/assets/browser-logos/firefox.webp" };

const BUTTERFLY_PATH_REST =
  "M4.3248 17.7823C1.22382 14.6398 -0.116749 10.2475 0.824858 6.7097C1.02033 5.97529 1.95363 5.98287 2.27212 6.67289L4.16024 10.7637C4.38415 11.2488 4.50011 11.7767 4.50011 12.311L4.50011 16L6.24277 16C7.66705 16 9.01155 16.6576 9.88596 17.7819L11.0831 19.3211C11.5044 19.8627 11.2076 20.6668 10.5235 20.7201C8.63849 20.8671 6.85452 20.3459 4.3248 17.7823Z";
const BUTTERFLY_PATH_OPEN =
  "M4.32468 17.7823C-1.04106 11.6456 2.30784 4.56298 5.14393 1.13518C5.48929 0.717757 6.11849 0.734355 6.47527 1.14207L10.4328 5.66451C11.4105 6.78177 11.6239 8.37593 10.9745 9.71102L8.61264 14.567L11.5238 13.9636C13.2202 13.612 14.9706 14.24 16.0565 15.5899L18.7241 18.9056C19.0394 19.2975 18.9857 19.8717 18.5688 20.1531C15.6258 22.1399 9.6385 23.8596 4.32468 17.7823Z";
const BUTTERFLY_PATH_VALUES = `${BUTTERFLY_PATH_OPEN};${BUTTERFLY_PATH_REST};${BUTTERFLY_PATH_OPEN}`;

const HERO_BUTTERFLY_MARK = (
  <span className="hero-install-butterfly" aria-hidden="true">
    <span className="hero-install-butterfly-wing hero-install-butterfly-wing-back">
      <svg viewBox="0 0 23 25" fill="none" focusable="false">
        <path fill="currentColor" d={BUTTERFLY_PATH_REST}>
          <animate
            attributeName="d"
            dur="2800ms"
            begin="120ms"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
            values={BUTTERFLY_PATH_VALUES}
          />
        </path>
      </svg>
    </span>
    <span className="hero-install-butterfly-wing hero-install-butterfly-wing-front">
      <svg viewBox="0 0 23 25" fill="none" focusable="false">
        <path fill="currentColor" d={BUTTERFLY_PATH_REST}>
          <animate
            attributeName="d"
            dur="2800ms"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
            values={BUTTERFLY_PATH_VALUES}
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="2800ms"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
            values="-1.5 5.5 15.5;0 5.5 15.5;-1.5 5.5 15.5"
          />
        </path>
      </svg>
    </span>
  </span>
);

interface Props {
  label: string;
  ariaLabel: string;
  href: string;
  tooltipLabel: string;
  /** The hero's button keeps the default id: the nav install pill watches it scroll away. */
  id?: string;
  analyticsLabel?: string;
  /** Adds Firefox after Edge once Firefox Add-ons lists Lumno. */
  showFirefox?: boolean;
}

export function HeroInstallTooltip({
  label,
  ariaLabel,
  href,
  tooltipLabel,
  id = "hero-install-primary",
  analyticsLabel = "home_hero_install",
  showFirefox = false,
}: Props) {
  const browserLogos = showFirefox
    ? BROWSER_LOGOS.flatMap((logo) => (logo.name === "Edge" ? [logo, FIREFOX_LOGO] : [logo]))
    : BROWSER_LOGOS;
  return (
    <TooltipProvider delayDuration={180} skipDelayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SettingsButton
            as="a"
            id={id}
            variant="primary"
            className="hero-actions-button"
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={ariaLabel}
            data-analytics-event="open_chrome_web_store"
            data-analytics-category="conversion"
            data-analytics-label={analyticsLabel}
          >
            {label}
            {HERO_BUTTERFLY_MARK}
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
              {browserLogos.map(({ name, src }) => (
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
