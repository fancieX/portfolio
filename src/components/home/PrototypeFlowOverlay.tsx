"use client";

import { useEffect, useRef, RefObject } from "react";

export interface PrototypeFlowOverlayProps {
  /** Ref to the container wrapping the connected step cards */
  containerRef: RefObject<HTMLElement | null>;
  /** CSS selector locating ordered step cards inside containerRef */
  stepSelector?: string;
  /** Interaction label placed beside each connector origin */
  label?: string;
  /** Viewport width threshold (> wideBreakpoint uses side-to-top Bezier curves; <= uses vertical lines) */
  wideBreakpoint?: number;
  /** Connector line & arrowhead color */
  lineColor?: string;
  /** Scroll-traveling pulse dot fill */
  dotColor?: string;
  /** Start port circle fill */
  startColor?: string;
  /** Connector label text fill */
  textColor?: string;
}

interface ConnectorNodes {
  group: SVGGElement;
  path: SVGPathElement;
  start: SVGCircleElement;
  arrow: SVGPathElement;
  dot: SVGCircleElement;
  tag: SVGTextElement;
}

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * PrototypeFlowOverlay
 *
 * Reproduces Snapline's `.snp-pf` SVG prototype connector system directly
 * matching the Framer reference `wn` runtime: an IntersectionObserver-gated
 * continuous requestAnimationFrame loop computes live Bezier/vertical paths
 * and scroll progress against `window.innerHeight * 0.72` with zero lag
 * stacked onto Lenis smooth scroll, guarded cleanly against React Strict Mode
 * duplicate mounts.
 */
export function PrototypeFlowOverlay({
  containerRef,
  stepSelector = '[data-process-step="true"]',
  label = "On click",
  wideBreakpoint = 860,
  lineColor = "#0A0A0A",
  dotColor = "#D6FF3F",
  startColor = "#FFFFFF",
  textColor = "#605F5F",
}: PrototypeFlowOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const overlayEl = overlayRef.current;
    const svgEl = svgRef.current;
    const flowRoot = containerRef.current;
    if (!overlayEl || !svgEl || !flowRoot) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cancelled = false;
    let connectors: ConnectorNodes[] = [];
    let isIntersecting = false;
    let rafId = 0;

    // Ensure clean slate across Strict Mode re-mounts or fast refreshes
    svgEl.replaceChildren();

    const createSvgEl = <K extends keyof SVGElementTagNameMap>(
      tag: K,
      attrs: Record<string, string>
    ): SVGElementTagNameMap[K] => {
      const node = document.createElementNS(SVG_NS, tag);
      for (const [k, v] of Object.entries(attrs)) {
        node.setAttribute(k, v);
      }
      return node;
    };

    const syncConnectorCount = (targetCount: number) => {
      while (connectors.length < targetCount) {
        const group = createSvgEl("g", {});
        const path = createSvgEl("path", {
          fill: "none",
          stroke: lineColor,
          "stroke-width": "1.6",
          "stroke-linecap": "round",
        });
        const start = createSvgEl("circle", {
          r: "4.5",
          fill: startColor,
          stroke: lineColor,
          "stroke-width": "1.6",
        });
        const arrow = createSvgEl("path", {
          fill: lineColor,
          style: "opacity: 0; transition: opacity 0.2s ease;",
        });
        const dot = createSvgEl("circle", {
          r: "5",
          fill: dotColor,
          stroke: lineColor,
          "stroke-width": "1.5",
          style: "opacity: 0; transition: opacity 0.15s ease;",
        });
        const tag = createSvgEl("text", {
          fill: textColor,
          style:
            "font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0em;",
        });
        tag.textContent = label;
        group.append(path, start, arrow, dot, tag);
        svgEl.append(group);
        connectors.push({
          group,
          path,
          start,
          arrow,
          dot,
          tag,
        });
      }
      while (connectors.length > targetCount) {
        connectors.pop()?.group.remove();
      }
    };

    const renderFrame = () => {
      if (cancelled) return;

      const cards = Array.from(
        flowRoot.querySelectorAll<HTMLElement>(stepSelector)
      ).filter((el) => el.getClientRects().length > 0);

      syncConnectorCount(Math.max(0, cards.length - 1));
      if (connectors.length === 0) return;

      // Batch DOM geometry reads before mutations to avoid layout thrashing
      const hostRect = overlayEl.getBoundingClientRect();
      const cardRects = cards.map((card) => card.getBoundingClientRect());
      const viewportHeight = window.innerHeight;
      const isWide = window.innerWidth > wideBreakpoint;

      connectors.forEach((conn, idx) => {
        const fromRect = cardRects[idx];
        const toRect = cardRects[idx + 1];

        const endX = toRect.left + toRect.width / 2 - hostRect.left;
        const endY = toRect.top - hostRect.top - 9;

        let startX: number;
        let startY: number;
        let d: string;

        if (isWide) {
          startX =
            (fromRect.left < toRect.left ? fromRect.right : fromRect.left) -
            hostRect.left;
          startY = fromRect.top + fromRect.height / 2 - hostRect.top;
          d = `M${startX},${startY} C${endX},${startY} ${endX},${startY} ${endX},${endY}`;
        } else {
          startX = fromRect.left + fromRect.width / 2 - hostRect.left;
          startY = fromRect.bottom - hostRect.top;
          d = `M${startX},${startY} L${endX},${endY}`;
        }

        conn.path.setAttribute("d", d);
        const totalLength = conn.path.getTotalLength() || 1;
        const pathTop = hostRect.top + Math.min(startY, endY);
        const verticalSpan = Math.abs(endY - startY);

        const progress = reducedMotion
          ? 1
          : Math.min(
              1,
              Math.max(0, (viewportHeight * 0.72 - pathTop) / (verticalSpan + 120))
            );

        conn.path.style.strokeDasharray = `${totalLength}`;
        conn.path.style.strokeDashoffset = `${(totalLength * (1 - progress)).toFixed(1)}`;

        const point = conn.path.getPointAtLength(totalLength * progress);
        conn.dot.setAttribute("cx", point.x.toFixed(1));
        conn.dot.setAttribute("cy", point.y.toFixed(1));
        conn.dot.style.opacity =
          !reducedMotion && progress > 0.01 && progress < 0.99 ? "1" : "0";

        conn.start.setAttribute("cx", `${startX}`);
        conn.start.setAttribute("cy", `${startY}`);

        conn.arrow.setAttribute(
          "d",
          `M${endX - 6},${endY - 2} L${endX},${endY + 7} L${endX + 6},${endY - 2}Z`
        );
        conn.arrow.style.opacity = progress >= 0.99 ? "1" : "0";

        const labelWidth = conn.tag.getComputedTextLength
          ? conn.tag.getComputedTextLength()
          : 46;
        const labelX = isWide
          ? endX > startX
            ? startX + 14
            : startX - 14 - labelWidth
          : startX + 12;
        const labelY = isWide ? startY - 10 : startY + 18;
        conn.tag.setAttribute("x", `${labelX}`);
        conn.tag.setAttribute("y", `${labelY}`);
      });
    };

    const tick = () => {
      rafId = 0;
      if (cancelled || !isIntersecting) return;
      renderFrame();
      if (!reducedMotion) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const startLoop = () => {
      if (cancelled || rafId || !isIntersecting) return;
      rafId = requestAnimationFrame(tick);
    };

    // Synchronously initialize dash offsets & positions so off-screen wires stay undrawn
    renderFrame();

    const resizeObserver = new ResizeObserver(() => {
      renderFrame();
    });
    resizeObserver.observe(flowRoot);
    Array.from(flowRoot.querySelectorAll<HTMLElement>(stepSelector)).forEach((card) =>
      resizeObserver.observe(card)
    );

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          renderFrame();
          startLoop();
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { rootMargin: "80px 0px" }
    );
    intersectionObserver.observe(overlayEl);

    const handleResize = () => renderFrame();
    window.addEventListener("resize", handleResize);
    document.fonts?.ready?.then(() => {
      if (!cancelled) renderFrame();
    });

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      svgEl.replaceChildren();
      connectors = [];
    };
  }, [
    containerRef,
    stepSelector,
    label,
    wideBreakpoint,
    lineColor,
    dotColor,
    startColor,
    textColor,
  ]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      data-testid="process-prototype-flow-overlay"
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full overflow-visible"
      />
    </div>
  );
}

export default PrototypeFlowOverlay;
