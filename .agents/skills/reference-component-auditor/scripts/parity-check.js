(async () => {
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  const fonts = document.fonts
    ? [...new Set([...document.fonts].filter(f => f.status === "loaded").map(f => `${f.family}|${f.weight}|${f.style}`))]
    : [];
  const root = document.documentElement;
  const imgs = [...document.images];
  return JSON.stringify({
    href: location.href,
    readyState: document.readyState,
    viewport: {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      dpr: window.devicePixelRatio,
      pageZoom: window.visualViewport ? window.visualViewport.scale : null
    },
    scroll: { y: Math.round(window.scrollY), maxY: Math.max(0, root.scrollHeight - window.innerHeight) },
    documentHeight: root.scrollHeight,
    horizontalOverflow: root.scrollWidth > window.innerWidth,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    loadedFonts: fonts,
    counts: {
      images: imgs.length,
      imagesNotLoaded: imgs.filter(i => i.complete && i.naturalWidth === 0).length,
      videos: document.querySelectorAll("video").length,
      canvases: document.querySelectorAll("canvas").length,
      iframes: document.querySelectorAll("iframe").length,
      framerNamedLayers: document.querySelectorAll("[data-framer-name]").length
    },
    runningAnimations: document.getAnimations ? document.getAnimations().filter(a => a.playState === "running").length : null
  }, null, 2);
})()
