(() => {
  const SELECTOR = "REPLACE_ME";
  const MAX_ELEMENTS = 20;
  const PROPS = [
    "display", "position", "top", "right", "bottom", "left", "z-index",
    "width", "height", "min-width", "max-width", "min-height", "max-height",
    "margin", "padding", "gap", "row-gap", "column-gap",
    "flex-direction", "flex-wrap", "flex-grow", "flex-shrink", "justify-content", "align-items", "align-self",
    "grid-template-columns", "grid-template-rows", "overflow", "object-fit", "aspect-ratio",
    "font-family", "font-size", "font-weight", "font-style", "line-height", "letter-spacing",
    "text-transform", "text-align", "text-decoration", "white-space",
    "color", "background-color", "background-image", "border", "border-radius", "outline",
    "box-shadow", "opacity", "transform", "transform-origin", "filter", "backdrop-filter",
    "clip-path", "mix-blend-mode", "cursor", "pointer-events", "will-change",
    "transition", "animation"
  ];
  const els = [...document.querySelectorAll(SELECTOR)];
  if (!els.length) return JSON.stringify({ error: "no element matches selector", selector: SELECTOR });
  const describe = el => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const styles = {};
    PROPS.forEach(p => { styles[p] = cs.getPropertyValue(p); });
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      className: typeof el.className === "string" ? el.className.slice(0, 120) : null,
      framerName: el.getAttribute("data-framer-name"),
      text: (el.textContent || "").trim().slice(0, 60),
      childElementCount: el.childElementCount,
      rect: {
        docX: +(r.x + window.scrollX).toFixed(2),
        docY: +(r.y + window.scrollY).toFixed(2),
        viewportX: +r.x.toFixed(2),
        viewportY: +r.y.toFixed(2),
        width: +r.width.toFixed(2),
        height: +r.height.toFixed(2)
      },
      styles
    };
  };
  return JSON.stringify({
    selector: SELECTOR,
    matchCount: els.length,
    viewport: { width: window.innerWidth, height: window.innerHeight, dpr: window.devicePixelRatio, scrollY: Math.round(window.scrollY) },
    elements: els.slice(0, MAX_ELEMENTS).map(describe)
  }, null, 2);
})()
