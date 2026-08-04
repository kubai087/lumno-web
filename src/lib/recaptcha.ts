const SCRIPT_ID = 'lumno-recaptcha-v3';
const SCRIPT_TIMEOUT_MS = 10_000;

type RecaptchaApi = {
  execute(siteKey: string, options: { action: string }): Promise<string>;
  ready(callback: () => void): void;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
  }
}

let loader: Promise<RecaptchaApi> | null = null;

function loadRecaptcha(siteKey: string): Promise<RecaptchaApi> {
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha);
  if (loader) return loader;

  loader = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const script = existingScript || document.createElement('script');
    let settled = false;
    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      if (error || !window.grecaptcha) {
        loader = null;
        reject(error || new Error('recaptcha_unavailable'));
        return;
      }
      resolve(window.grecaptcha);
    };
    const timeoutId = window.setTimeout(
      () => finish(new Error('recaptcha_timeout')),
      SCRIPT_TIMEOUT_MS,
    );
    script.addEventListener('load', () => finish(), { once: true });
    script.addEventListener('error', () => finish(new Error('recaptcha_unavailable')), { once: true });
    if (!existingScript) {
      script.id = SCRIPT_ID;
      script.async = true;
      script.defer = true;
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}&trustedtypes=true`;
      document.head.append(script);
    }
  });
  return loader;
}

export async function getOAuthCaptchaToken(siteKey: string, action: string): Promise<string> {
  if (!siteKey) throw new Error('recaptcha_not_configured');
  const recaptcha = await loadRecaptcha(siteKey);
  await new Promise<void>((resolve) => recaptcha.ready(resolve));
  const token = String(await recaptcha.execute(siteKey, { action })).trim();
  if (!token) throw new Error('recaptcha_empty_token');
  return token;
}
