(function () {
  const userAgent = navigator.userAgent || "";
  const isSafari = /Safari\//.test(userAgent) && !/Chrome\/|Chromium\/|CriOS\/|Edg\/|OPR\/|Firefox\/|FxiOS\//.test(userAgent);
  const availabilityCache = new Map();
  const debugEnabled =
    /(?:^|[?&])debugSafariImages=1(?:&|$)/.test(location.search) ||
    window.localStorage.getItem("debugSafariImages") === "1";

  function debugLog(message, payload) {
    if (!debugEnabled) return;
    if (payload === undefined) {
      console.info(`[safari-png-fallback] ${message}`);
      return;
    }
    console.info(`[safari-png-fallback] ${message}`, payload);
  }

  function normalizePath(src) {
    return src.startsWith("./") || src.startsWith("../") || src.startsWith("/") ? src : `./${src}`;
  }

  function replaceSvgWithPng(src) {
    return src.replace(/\.svg(?=($|[?#]))/i, ".png");
  }

  function canLoadImage(src) {
    if (availabilityCache.has(src)) return availabilityCache.get(src);
    const task = new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = src;
    });
    availabilityCache.set(src, task);
    return task;
  }

  async function applySafariPngFallbackForSvgImages(options) {
    if (!isSafari) {
      debugLog("skip: current browser is not Safari");
      return;
    }
    const config = options || {};
    const selector = config.selector || "img[src$='.svg']";
    const removeClassName = config.removeClassName || "";
    const extraMap = config.extraMap || {};
    const root =
      config.root &&
      (config.root.nodeType === Node.DOCUMENT_NODE || config.root.nodeType === Node.ELEMENT_NODE) &&
      typeof config.root.querySelectorAll === "function"
        ? config.root
        : document;
    const markBodyClass = config.markBodyClass !== false;

    if (markBodyClass && document.body) {
      document.body.classList.add("is-safari");
    }

    const targets = Array.from(root.querySelectorAll(selector));
    debugLog("start", { targets: targets.length, selector });
    await Promise.all(
      targets.map(async (img) => {
        const src = img.getAttribute("src");
        if (!src) return;

        const normalizedSrc = normalizePath(src);
        const sameNameBitmap = replaceSvgWithPng(normalizedSrc);
        const mappedBitmap = extraMap[src] || extraMap[normalizedSrc];
        const candidates = [sameNameBitmap, mappedBitmap].filter((value, index, list) => Boolean(value) && list.indexOf(value) === index);

        for (const candidate of candidates) {
          if (candidate === normalizedSrc) continue;
          if (await canLoadImage(candidate)) {
            img.setAttribute("src", candidate);
            if (removeClassName) img.classList.remove(removeClassName);
            debugLog("replaced", { from: src, to: candidate });
            break;
          }
        }
        if (img.getAttribute("src") === src) {
          debugLog("kept-svg", { src });
        }
      })
    );
    debugLog("done");
  }

  window.applySafariPngFallbackForSvgImages = applySafariPngFallbackForSvgImages;
})();
