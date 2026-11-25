"use client";

import { useState, useRef, useCallback, useEffect, RefObject } from "react";

export type ResizeHandle =
  | "tl"
  | "tc"
  | "tr"
  | "ml"
  | "mr"
  | "bl"
  | "bc"
  | "br";

export interface FrameSize {
  width: number;
  height: number;
}

export interface UseResizableFrameOptions {
  /** Fallback default width before viewport sync (defaults to 420) */
  defaultWidth?: number;
  /** Fallback default height before viewport sync (defaults to 525) */
  defaultHeight?: number;
  /** Minimum width constraint in px (defaults to 140 matching Snapline) */
  minWidth?: number;
  /** Minimum height constraint in px (defaults to 170 matching Snapline) */
  minHeight?: number;
  /** Underdamped spring stiffness (defaults to 160 matching Snapline bounce) */
  stiffness?: number;
  /** Underdamped spring damping (defaults to 13 matching ~12% overshoot) */
  damping?: number;
  /** Reference to the fixed layout slot wrapping the resizing frame */
  slotRef?: RefObject<HTMLDivElement | null>;
  /** Whether interactions are disabled */
  disabled?: boolean;
}

export interface UseResizableFrameReturn {
  /** Current animated width in px */
  width: number;
  /** Current animated height in px */
  height: number;
  /** Responsive resting size for the fixed outer layout slot */
  restingSize: FrameSize;
  /** Whether the screen width is below desktop inline-hint threshold (<1024px) */
  isNarrow: boolean;
  /** Current 2D translation offset (x, y) relative to fixed slot origin */
  position: { x: number; y: number };
  /** Whether the user is actively dragging a resize handle */
  isResizing: boolean;
  /** Whether the frame is currently springing back to rest */
  isSpringing: boolean;
  /** Whether the user has touched any handle at least once */
  isTouched: boolean;
  /** Which handle is currently being dragged */
  activeHandle: ResizeHandle | null;
  /** Formatted live dimension string (e.g. "460 × 575") */
  dimensions: string;
  /** PointerDown handler factory for the 8 resize handles */
  handlePointerDown: (handle: ResizeHandle) => (e: React.PointerEvent) => void;
  /** Cancel spring and restore resting dimensions immediately */
  reset: () => void;
}

function resolveRestingSize(fallbackW: number, fallbackH: number): {
  size: FrameSize;
  narrow: boolean;
} {
  if (typeof window === "undefined") {
    return { size: { width: fallbackW, height: fallbackH }, narrow: false };
  }
  const vw = document.documentElement.clientWidth || window.innerWidth;
  const vh = window.innerHeight;

  if (vw < 640) {
    const mobileW = Math.min(300, Math.max(220, vw - 32));
    return {
      size: { width: mobileW, height: Math.round(mobileW * 1.25) },
      narrow: true,
    };
  }
  if (vw < 1024) {
    return { size: { width: 380, height: 475 }, narrow: true };
  }
  // Keep compact laptop proportions on viewports <1400px or short (<780px) windows
  // so hero CTAs & portrait remain visible above the fold; use full 460×575 at 1440×900+.
  if (vw < 1400 || vh < 780) {
    return { size: { width: 420, height: 525 }, narrow: false };
  }
  return { size: { width: 460, height: 575 }, narrow: false };
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * useResizableFrame
 *
 * Manages direct-manipulation 8-handle resizing (free two-axis on corners,
 * single-axis on edges) isolated from document flow via a fixed slot wrapper,
 * followed by an underdamped harmonic spring return upon pointer release.
 */
export function useResizableFrame({
  defaultWidth = 420,
  defaultHeight = 525,
  minWidth = 140,
  minHeight = 170,
  stiffness = 160,
  damping = 13,
  slotRef,
  disabled = false,
}: UseResizableFrameOptions = {}): UseResizableFrameReturn {
  const [restingSize, setRestingSize] = useState<FrameSize>({
    width: defaultWidth,
    height: defaultHeight,
  });
  const [isNarrow, setIsNarrow] = useState(false);
  const [size, setSize] = useState<FrameSize>({
    width: defaultWidth,
    height: defaultHeight,
  });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [isSpringing, setIsSpringing] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [activeHandle, setActiveHandle] = useState<ResizeHandle | null>(null);

  const defaultSizeRef = useRef<FrameSize>({
    width: defaultWidth,
    height: defaultHeight,
  });
  const springRafRef = useRef<number | null>(null);
  const isResizingRef = useRef(false);

  // Sync resting dimensions to viewport breakpoints and window resizes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncViewportSize = () => {
      const { size: nextSize, narrow } = resolveRestingSize(
        defaultWidth,
        defaultHeight
      );
      defaultSizeRef.current = nextSize;
      setRestingSize(nextSize);
      setIsNarrow(narrow);

      if (!isResizingRef.current) {
        if (springRafRef.current !== null) {
          cancelAnimationFrame(springRafRef.current);
          springRafRef.current = null;
          setIsSpringing(false);
        }
        setSize(nextSize);
        setPosition({ x: 0, y: 0 });
      }
    };

    const rafId = requestAnimationFrame(syncViewportSize);
    window.addEventListener("resize", syncViewportSize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", syncViewportSize);
    };
  }, [defaultWidth, defaultHeight]);

  // Clean up active animation frame on unmount
  useEffect(() => {
    return () => {
      if (springRafRef.current !== null) {
        cancelAnimationFrame(springRafRef.current);
      }
    };
  }, []);

  const startSpringReturn = useCallback(
    (startW: number, startH: number, startX: number, startY: number) => {
      if (springRafRef.current !== null) {
        cancelAnimationFrame(springRafRef.current);
      }

      const targetW = defaultSizeRef.current.width;
      const targetH = defaultSizeRef.current.height;

      const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        setSize({ width: targetW, height: targetH });
        setPosition({ x: 0, y: 0 });
        setIsSpringing(false);
        return;
      }

      setIsSpringing(true);

      let w = startW;
      let h = startH;
      let x = startX;
      let y = startY;
      let vW = 0;
      let vH = 0;
      let vX = 0;
      let vY = 0;
      let lastTime = performance.now();

      const step = (now: number) => {
        const dt = Math.min((now - lastTime) / 1000, 0.032);
        lastTime = now;

        const aW = -stiffness * (w - targetW) - damping * vW;
        const aH = -stiffness * (h - targetH) - damping * vH;
        const aX = -stiffness * x - damping * vX;
        const aY = -stiffness * y - damping * vY;

        vW += aW * dt;
        vH += aH * dt;
        vX += aX * dt;
        vY += aY * dt;

        w = Math.max(40, w + vW * dt);
        h = Math.max(40, h + vH * dt);
        x += vX * dt;
        y += vY * dt;

        const settled =
          Math.abs(w - targetW) < 0.15 &&
          Math.abs(vW) < 0.5 &&
          Math.abs(h - targetH) < 0.15 &&
          Math.abs(vH) < 0.5 &&
          Math.abs(x) < 0.15 &&
          Math.abs(vX) < 0.5 &&
          Math.abs(y) < 0.15 &&
          Math.abs(vY) < 0.5;

        if (settled) {
          setSize({ width: targetW, height: targetH });
          setPosition({ x: 0, y: 0 });
          setIsSpringing(false);
          springRafRef.current = null;
        } else {
          setSize({ width: w, height: h });
          setPosition({ x, y });
          springRafRef.current = requestAnimationFrame(step);
        }
      };

      springRafRef.current = requestAnimationFrame(step);
    },
    [stiffness, damping]
  );

  const reset = useCallback(() => {
    if (springRafRef.current !== null) {
      cancelAnimationFrame(springRafRef.current);
      springRafRef.current = null;
    }
    isResizingRef.current = false;
    setSize(defaultSizeRef.current);
    setPosition({ x: 0, y: 0 });
    setIsResizing(false);
    setIsSpringing(false);
    setActiveHandle(null);
  }, []);

  const handlePointerDown = useCallback(
    (handle: ResizeHandle) => (e: React.PointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();

      if (springRafRef.current !== null) {
        cancelAnimationFrame(springRafRef.current);
        springRafRef.current = null;
        setIsSpringing(false);
      }

      const target = e.currentTarget;
      try {
        target.setPointerCapture(e.pointerId);
      } catch {
        // Synthetic or unsupported pointer capture fallback
      }

      const slotRect = slotRef?.current?.getBoundingClientRect();
      const slotLeft = slotRect ? slotRect.left : 0;
      const slotTop = slotRect ? slotRect.top : 104;
      const clientW =
        typeof document !== "undefined"
          ? document.documentElement.clientWidth || window.innerWidth
          : 1440;
      const viewportH = typeof window !== "undefined" ? window.innerHeight : 900;

      const startPointerX = e.clientX;
      const startPointerY = e.clientY;
      const startW = size.width;
      const startH = size.height;
      const startX = position.x;
      const startY = position.y;
      const fixedRightOffset = startX + startW;
      const fixedBottomOffset = startY + startH;

      const vpPad = 14;
      const minTopScreenY = 26;

      isResizingRef.current = true;
      setIsResizing(true);
      setIsTouched(true);
      setActiveHandle(handle);

      let latestW = startW;
      let latestH = startH;
      let latestX = startX;
      let latestY = startY;

      const affectsLeft = handle === "tl" || handle === "ml" || handle === "bl";
      const affectsRight = handle === "tr" || handle === "mr" || handle === "br";
      const affectsTop = handle === "tl" || handle === "tc" || handle === "tr";
      const affectsBottom = handle === "bl" || handle === "bc" || handle === "br";

      const onPointerMove = (moveEvent: PointerEvent) => {
        const dx = moveEvent.clientX - startPointerX;
        const dy = moveEvent.clientY - startPointerY;

        let nextW = startW;
        let nextX = startX;
        if (affectsRight) {
          const maxWRight = slotRect
            ? Math.max(startW, clientW - vpPad - (slotLeft + startX))
            : 720;
          nextW = clamp(startW + dx, minWidth, maxWRight);
        } else if (affectsLeft) {
          const maxWLeft = slotRect
            ? Math.max(startW, slotLeft + fixedRightOffset - vpPad)
            : 720;
          nextW = clamp(startW - dx, minWidth, maxWLeft);
          nextX = fixedRightOffset - nextW;
        }

        let nextH = startH;
        let nextY = startY;
        if (affectsBottom) {
          const effectiveBottomLimit = Math.max(
            viewportH - vpPad,
            slotTop + defaultSizeRef.current.height + 140
          );
          const maxHBottom = slotRect
            ? Math.max(startH, effectiveBottomLimit - (slotTop + startY))
            : 760;
          nextH = clamp(startH + dy, minHeight, maxHBottom);
        } else if (affectsTop) {
          const maxHTop = slotRect
            ? Math.max(startH, slotTop + fixedBottomOffset - minTopScreenY)
            : 760;
          nextH = clamp(startH - dy, minHeight, maxHTop);
          nextY = fixedBottomOffset - nextH;
        }

        latestW = Math.round(nextW);
        latestH = Math.round(nextH);
        latestX = Math.round(nextX);
        latestY = Math.round(nextY);

        setSize({ width: latestW, height: latestH });
        setPosition({ x: latestX, y: latestY });
      };

      const onPointerUp = (upEvent: PointerEvent) => {
        try {
          target.releasePointerCapture(upEvent.pointerId);
        } catch {
          // Pointer capture already released
        }
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);

        isResizingRef.current = false;
        setIsResizing(false);
        setActiveHandle(null);
        startSpringReturn(latestW, latestH, latestX, latestY);
      };

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
    },
    [disabled, size, position, minWidth, minHeight, slotRef, startSpringReturn]
  );

  return {
    width: size.width,
    height: size.height,
    restingSize,
    isNarrow,
    position,
    isResizing,
    isSpringing,
    isTouched,
    activeHandle,
    dimensions: `${Math.round(size.width)} × ${Math.round(size.height)}`,
    handlePointerDown,
    reset,
  };
}
