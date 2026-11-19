# Measurement snippets

Run these in the page context (browser console, or `page.evaluate` in Playwright) on **both** sites with the same viewport, then compare the outputs. They only read the page; none of them change the project.

Contents:
1. Computed styles and box for a selector
2. Section map (order, position, size)
3. Font check
4. Animation sampling
5. Scroll-triggered animation check
6. Hover state comparison
7. Tips for Framer-built references

## 1. Computed styles and box for a selector

```js
(sel) => {
  const props = ['display','position','width','height','marginTop','marginRight','marginBottom','marginLeft',
    'paddingTop','paddingRight','paddingBottom','paddingLeft','gap','rowGap','columnGap','flexDirection',
    'alignItems','justifyContent','gridTemplateColumns','color','backgroundColor','backgroundImage',
    'borderTopWidth','borderTopStyle','borderTopColor','borderRadius','boxShadow','opacity','transform',
    'fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','textAlign','textTransform',
    'objectFit','objectPosition','aspectRatio','overflow','transition','zIndex'];
  return [...document.querySelectorAll(sel)].slice(0, 20).map(el => {
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    return {
      text: (el.innerText || '').trim().slice(0, 40),
      box: { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) },
      style: Object.fromEntries(props.map(p => [p, cs[p]]))
    };
  });
}
```

Selectors will differ between the sites (the reference uses generated Framer class names). Find the equivalent element by role and visible text, then measure each with its own selector.

## 2. Section map (order, position, size)

```js
() => [...document.querySelectorAll('header, nav, main > *, section, footer')].map(el => {
  const r = el.getBoundingClientRect();
  return { tag: el.tagName.toLowerCase(), id: el.id, label: (el.getAttribute('aria-label') || el.innerText || '').trim().slice(0, 30),
    top: Math.round(r.top + scrollY), height: Math.round(r.height), width: Math.round(r.width) };
})
```

Use this first to align sections between the sites before measuring details.

## 3. Font check

```js
async () => {
  await document.fonts.ready;
  return {
    loaded: [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight} ${f.style}`),
    failed: [...document.fonts].filter(f => f.status === 'error').map(f => f.family)
  };
}
```

If the local site is using a fallback font, many size and wrapping differences are downstream of it. Report the font mismatch as the root cause and mention the dependent differences.

## 4. Animation sampling

Motion libraries commonly animate through inline `style` changes, so sample the element's computed opacity and transform every frame rather than relying on `getAnimations()`.

```js
(sel, ms = 2000) => new Promise(resolve => {
  const el = document.querySelector(sel); const t0 = performance.now(); const out = [];
  const tick = now => {
    const cs = getComputedStyle(el);
    out.push({ t: Math.round(now - t0), opacity: cs.opacity, transform: cs.transform, filter: cs.filter });
    now - t0 < ms ? requestAnimationFrame(tick) : resolve(out);
  };
  requestAnimationFrame(tick);
})
```

To read the numbers: first frame where values leave the start state is the **delay**; the span until values stop changing is the **duration**; compare the shape of the values (even steps vs fast-then-slow) to judge **easing**. Run the sampler right after load for entrance animations. For stagger, sample sibling elements in the same run and compare their start times.

Also check `document.getAnimations().map(a => ({target: a.effect?.target?.tagName, ...a.effect?.getComputedTiming()}))` for CSS animations and transitions; it complements, not replaces, the sampler.

## 5. Scroll-triggered animation check

1. Load the page at the top and scroll to just above the target element; confirm its start state (opacity, offset).
2. Scroll smoothly into view and run the sampler on the element at the moment it crosses the viewport.
3. Note the scroll position at which the animation triggers (distance from the viewport bottom) on both sites.
4. Scroll away and back to see whether it replays or runs once.
5. For scroll-linked (scrubbed) effects such as parallax, sample the transform at several fixed scroll offsets (for example every 100px) and compare the values.

## 6. Hover state comparison

Measure the default state with snippet 1, hover with the automation tool's hover action, wait about 500ms, then measure again. Report the property changes and the `transition` value (duration, easing, properties). Repeat for focus where the element is focusable.

## 7. Tips for Framer-built references

- The reference is a published Framer site. Class names and DOM structure are generated, so match by visual role and text, not selector.
- Fonts, spacing and colours are best read from computed styles, not from source.
- Entrance effects ("appear") often start only once the element is in view and the page has hydrated. Wait a moment after load before declaring a missing animation.
- Some content and breakpoints depend on viewport width at load; reload after resizing rather than resizing a loaded page, and compare both ways if results look inconsistent.
- The reference may show an "Edit with Framer" or similar badge that is not part of the design; ignore it.
