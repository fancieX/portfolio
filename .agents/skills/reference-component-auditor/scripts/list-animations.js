(() => {
  const SELECTOR = "REPLACE_ME";
  const roots = [...document.querySelectorAll(SELECTOR)];
  if (!roots.length) return JSON.stringify({ error: "no element matches selector", selector: SELECTOR });
  const label = el => {
    if (!el) return null;
    const name = el.getAttribute && el.getAttribute("data-framer-name");
    return `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${name ? `[data-framer-name="${name}"]` : ""}`;
  };
  const kind = a => {
    if (typeof CSSTransition !== "undefined" && a instanceof CSSTransition) return "CSSTransition";
    if (typeof CSSAnimation !== "undefined" && a instanceof CSSAnimation) return "CSSAnimation";
    return "WebAnimation";
  };
  const all = document.getAnimations ? document.getAnimations() : [];
  const rows = all
    .filter(a => {
      const t = a.effect && a.effect.target;
      return t && roots.some(root => root === t || root.contains(t));
    })
    .map(a => {
      const timing = a.effect.getComputedTiming();
      let keyframes = [];
      try { keyframes = a.effect.getKeyframes(); } catch (e) { keyframes = [{ error: String(e) }]; }
      return {
        target: label(a.effect.target),
        kind: kind(a),
        name: a.animationName || a.transitionProperty || a.id || null,
        playState: a.playState,
        currentTimeMs: a.currentTime,
        timing: {
          delay: timing.delay,
          duration: timing.duration,
          endDelay: timing.endDelay,
          iterations: timing.iterations,
          direction: timing.direction,
          fill: timing.fill,
          easing: timing.easing
        },
        keyframes
      };
    });
  return JSON.stringify({
    selector: SELECTOR,
    note: "Only CSS animations, CSS transitions and Web Animations API animations appear here. JS-driven motion (per-frame inline styles) does not; use sample-animation.js for that.",
    animationCount: rows.length,
    animations: rows
  }, null, 2);
})()
