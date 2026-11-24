(() => {
  const MODE = "start";
  const SELECTOR = "REPLACE_ME";
  const LIMIT = 1;
  const MAX_MS = 5000;
  const KEYS = ["opacity", "transform", "color", "backgroundColor", "filter", "clipPath"];
  const prev = window.__refAuditSampler;

  const stopSampler = s => {
    cancelAnimationFrame(s.rafId);
    s.listeners.forEach(([type, fn]) => window.removeEventListener(type, fn, true));
  };

  if (MODE === "start") {
    if (prev) stopSampler(prev);
    const els = [...document.querySelectorAll(SELECTOR)].slice(0, LIMIT);
    if (!els.length) return JSON.stringify({ error: "no element matches selector", selector: SELECTOR });
    const s = { selector: SELECTOR, t0: performance.now(), rafId: 0, events: [], listeners: [], lastEventAt: {}, tracks: els.map(() => []) };
    ["pointerover", "pointerout", "pointerdown", "click", "scroll", "wheel", "keydown"].forEach(type => {
      const fn = e => {
        const t = Math.round((e.timeStamp - s.t0) * 10) / 10;
        if (s.lastEventAt[type] !== undefined && t - s.lastEventAt[type] < 250) return;
        s.lastEventAt[type] = t;
        if (s.events.length < 60) s.events.push({ type: e.type, t });
      };
      window.addEventListener(type, fn, true);
      s.listeners.push([type, fn]);
    });
    const tick = now => {
      const t = Math.round((now - s.t0) * 10) / 10;
      els.forEach((el, i) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const row = { t, x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
        KEYS.forEach(k => { row[k] = cs[k]; });
        s.tracks[i].push(row);
      });
      if (now - s.t0 < MAX_MS) s.rafId = requestAnimationFrame(tick);
    };
    s.rafId = requestAnimationFrame(tick);
    window.__refAuditSampler = s;
    return `sampling started for ${els.length} element(s); run interaction now, then rerun with MODE = "stop"`;
  }

  if (!prev) return JSON.stringify({ error: 'no sampler running; run with MODE = "start" first' });
  stopSampler(prev);
  const sig = r => KEYS.map(k => r[k]).join("|") + `|${r.x}|${r.y}|${r.w}|${r.h}`;
  const tracks = prev.tracks.map((rows, index) => {
    const changed = rows.map((r, j) => j > 0 && sig(r) !== sig(rows[j - 1]));
    const samples = rows.filter((r, j) => changed[j] || changed[j + 1] || j === 0 || j === rows.length - 1);
    const bursts = [];
    changed.forEach((c, j) => {
      if (!c) return;
      const t = rows[j].t;
      const last = bursts[bursts.length - 1];
      if (last && t - last.endMs <= 100) last.endMs = t;
      else bursts.push({ startMs: t, endMs: t });
    });
    bursts.forEach(b => { b.durationMs = +(b.endMs - b.startMs).toFixed(1); });
    return { index, bursts, samples };
  });
  const first = prev.tracks[0] || [];
  const avgFrameMs = first.length > 1 ? +((first[first.length - 1].t - first[0].t) / (first.length - 1)).toFixed(2) : null;
  window.__refAuditSampler = undefined;
  return JSON.stringify({
    selector: prev.selector,
    frameCount: first.length,
    avgFrameMs,
    resolutionNote: "Burst start/end times are accurate to about one frame (avgFrameMs). Subtract the matching event time from events[] to get trigger-to-first-change latency.",
    events: prev.events,
    tracks
  }, null, 2);
})()
