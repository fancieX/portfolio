(async () => {
  const SELECTOR = "REPLACE_ME";
  const STEPS = 16;
  const SETTLE_MS = 500;
  const el = document.querySelector(SELECTOR);
  if (!el) return JSON.stringify({ error: "no element matches selector", selector: SELECTOR });
  const wait = ms => new Promise(res => setTimeout(res, ms));
  const originalY = window.scrollY;
  const r0 = el.getBoundingClientRect();
  const docTop = r0.top + window.scrollY;
  const docBottom = docTop + r0.height;
  const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const from = Math.max(0, docTop - window.innerHeight);
  const to = Math.min(maxY, docBottom);
  const rows = [];
  for (let i = 0; i <= STEPS; i++) {
    const y = Math.round(from + (to - from) * (i / STEPS));
    window.scrollTo({ top: y, behavior: "instant" });
    await wait(SETTLE_MS);
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    rows.push({
      requestedScrollY: y,
      actualScrollY: Math.round(window.scrollY),
      viewportTop: +r.top.toFixed(2),
      viewportBottom: +r.bottom.toFixed(2),
      width: +r.width.toFixed(2),
      height: +r.height.toFixed(2),
      position: cs.position,
      opacity: cs.opacity,
      transform: cs.transform,
      filter: cs.filter,
      clipPath: cs.clipPath
    });
  }
  window.scrollTo({ top: originalY, behavior: "instant" });
  return JSON.stringify({
    selector: SELECTOR,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    elementDocTop: Math.round(docTop),
    elementHeight: Math.round(r0.height),
    settleMs: SETTLE_MS,
    rows
  }, null, 2);
})()
