"use client";

import { useState, useRef, useId, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export interface HangingBadgeProps {
  /** Person name displayed on the badge front */
  name?: string;
  /** Role subtitle displayed below name */
  role?: string;
  /** Portrait image path */
  src?: string;
  /** Accessible image alt text */
  alt?: string;
  /** Neon yellow top-right badge tag text */
  accessTag?: string;
  /** Location / status pill text on front bottom-left */
  statusText?: string;
  /** Repeating text woven along the neon yellow lanyard strap */
  strapText?: string;
  /** Optional wrapper class name */
  className?: string;
}

interface CardDimensions {
  width: number;
  height: number;
  strapWidth: number;
  slotHeadroom: number;
  isStacked: boolean;
}

const DEFAULT_STRAP_TEXT =
  "MAYA ORTIZ \u2726 PRODUCT DESIGN \u2726 FIGMA \u2726 DESIGN SYSTEMS \u2726 UI CRAFT \u2726 MAYA ORTIZ \u2726 PRODUCT DESIGN \u2726 FIGMA \u2726 DESIGN SYSTEMS \u2726 ";

const BARCODE_BARS: Array<{ x: number; w: number }> = [
  { x: 0, w: 2 },
  { x: 4, w: 1 },
  { x: 7, w: 3 },
  { x: 12, w: 1 },
  { x: 15, w: 2 },
  { x: 19, w: 1 },
  { x: 22, w: 1 },
  { x: 25, w: 3 },
  { x: 30, w: 1.5 },
  { x: 33, w: 1 },
  { x: 36, w: 2.5 },
  { x: 40, w: 1 },
  { x: 43, w: 2 },
  { x: 47, w: 1 },
  { x: 50, w: 3 },
  { x: 55, w: 1 },
  { x: 58, w: 2 },
  { x: 62, w: 1.5 },
  { x: 65, w: 1 },
  { x: 68, w: 2.5 },
  { x: 72, w: 2 },
];

function resolveCardDimensions(): CardDimensions {
  if (typeof window === "undefined") {
    return {
      width: 322,
      height: 450,
      strapWidth: 26,
      slotHeadroom: 40,
      isStacked: false,
    };
  }
  const vw = document.documentElement.clientWidth || window.innerWidth;
  const vh = window.innerHeight;

  if (vw < 640) {
    const mobileW = Math.min(288, Math.max(248, vw - 40));
    return {
      width: mobileW,
      height: Math.round(mobileW * 1.4),
      strapWidth: 22,
      slotHeadroom: 88,
      isStacked: true,
    };
  }
  if (vw < 1024) {
    return {
      width: 320,
      height: 448,
      strapWidth: 24,
      slotHeadroom: 92,
      isStacked: true,
    };
  }
  if (vw < 1400 || vh < 780) {
    return {
      width: 322,
      height: 450,
      strapWidth: 26,
      slotHeadroom: 38,
      isStacked: false,
    };
  }
  return {
    width: 348,
    height: 486,
    strapWidth: 26,
    slotHeadroom: 46,
    isStacked: false,
  };
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * HangingBadge
 *
 * Interactive 3D-flippable hanging ID badge on a physics-driven neon yellow (#D6FF3F)
 * lanyard strap at the top-right corner of the homepage hero.
 *
 * Powered by GSAP (`@gsap/react` useGSAP, gsap.timeline, gsap.ticker,
 * gsap.quickSetter, gsap.matchMedia) for 60fps coupled pendulum motion,
 * dynamic curved SVG lanyard ribbon bending, pointer throw momentum,
 * and snappy 3D Y-axis card flip.
 */
export function HangingBadge({
  name = "Maya Ortiz",
  role = "Product Designer",
  src = "/images/hero-portrait.webp",
  alt = "Maya Ortiz — Product Designer in Lisbon",
  accessTag = "ALL ACCESS",
  statusText = "LISBON, PORTUGAL",
  strapText = DEFAULT_STRAP_TEXT,
  className = "",
}: HangingBadgeProps) {
  const uid = useId().replace(/:/g, "");
  const strapPathId = `lanyard-curve-${uid}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const flipperRef = useRef<HTMLDivElement>(null);
  const strapOuterRef = useRef<SVGPathElement>(null);
  const strapMainRef = useRef<SVGPathElement>(null);
  const strapHighlightRef = useRef<SVGPathElement>(null);
  const strapTextPathRef = useRef<SVGPathElement>(null);

  const [dims, setDims] = useState<CardDimensions>(() => ({
    width: 322,
    height: 450,
    strapWidth: 26,
    slotHeadroom: 38,
    isStacked: false,
  }));
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dimsRef = useRef(dims);
  const isFlippedRef = useRef(false);
  const reduceMotionRef = useRef(false);

  // Mutable 60fps physics state (updated inside gsap.ticker without React re-renders)
  const physicsRef = useRef({
    dx: 0,
    dy: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    omega: 0,
    anchorTopY: -104,
    isDragging: false,
    active: false,
    entranceOffsetY: 0,
  });

  // Pointer tracking for drag + release velocity calculation
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    startDx: 0,
    startDy: 0,
    travel: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    vx: 0,
    vy: 0,
  });

  // QuickSetters initialized inside useGSAP
  const settersRef = useRef<{
    x?: (v: number) => void;
    y?: (v: number) => void;
    rotation?: (v: number) => void;
  }>({});

  const contextSafeFlipRef = useRef<((forceNext?: boolean) => void) | null>(null);

  const syncAnchorAndDimensions = useCallback(() => {
    const nextDims = resolveCardDimensions();
    dimsRef.current = nextDims;
    setDims(nextDims);

    const slot = containerRef.current;
    if (!slot || typeof window === "undefined") return;

    if (nextDims.isStacked) {
      physicsRef.current.anchorTopY = 0;
    } else {
      const rect = slot.getBoundingClientRect();
      const pageTop = rect.top + window.scrollY;
      // Extend strap all the way to the top edge (y = 0) of the document
      physicsRef.current.anchorTopY = -Math.max(40, Math.round(pageTop));
    }
  }, []);

  // Helper to apply current physics state to rig transform & curved SVG strap paths
  const applyVisualState = useCallback(() => {
    const p = physicsRef.current;
    const d = dimsRef.current;

    const totalY = p.dy + p.entranceOffsetY;
    settersRef.current.x?.(p.dx);
    settersRef.current.y?.(totalY);
    settersRef.current.rotation?.(p.angle);

    const anchorX = d.width / 2;
    const anchorY = p.anchorTopY;

    // Hinge origin at rest is (anchorX, d.slotHeadroom).
    // Clip entry sits 18px above the rotated hinge origin along the card axis.
    const rad = (p.angle * Math.PI) / 180;
    const clipX = anchorX + p.dx + 18 * Math.sin(rad);
    const clipY = Math.max(
      anchorY + 24,
      d.slotHeadroom + totalY - 18 * Math.cos(rad)
    );

    // Quadratic curve control point lags slightly behind midpoint for natural ribbon bow
    const midX = (anchorX + clipX) * 0.5;
    const midY = (anchorY + clipY) * 0.5;
    const strapAngle = (Math.atan2(-(clipX - anchorX), Math.max(24, clipY - anchorY)) * 180) / Math.PI;
    const bendOffsetX = p.vx * 0.022 + (p.angle - strapAngle) * 0.65;
    const ctrlX = midX + bendOffsetX;
    const ctrlY = midY;

    const pathD = `M ${anchorX.toFixed(1)} ${anchorY.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${clipX.toFixed(1)} ${clipY.toFixed(1)}`;
    strapOuterRef.current?.setAttribute("d", pathD);
    strapMainRef.current?.setAttribute("d", pathD);
    strapHighlightRef.current?.setAttribute("d", pathD);
    strapTextPathRef.current?.setAttribute("d", pathD);
  }, []);

  useGSAP(
    (_context, contextSafe) => {
      syncAnchorAndDimensions();

      if (!rigRef.current || !flipperRef.current) return;

      settersRef.current = {
        x: gsap.quickSetter(rigRef.current, "x", "px") as (v: number) => void,
        y: gsap.quickSetter(rigRef.current, "y", "px") as (v: number) => void,
        rotation: gsap.quickSetter(rigRef.current, "rotation", "deg") as (v: number) => void,
      };

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          fullMotion: "(prefers-reduced-motion: no-preference)",
        },
        (cond) => {
          const reduce = Boolean(cond.conditions?.reduceMotion);
          reduceMotionRef.current = reduce;

          if (reduce) {
            physicsRef.current.dx = 0;
            physicsRef.current.dy = 0;
            physicsRef.current.vx = 0;
            physicsRef.current.vy = 0;
            physicsRef.current.angle = 0;
            physicsRef.current.omega = 0;
            physicsRef.current.entranceOffsetY = 0;
            physicsRef.current.active = false;
            gsap.set(rigRef.current, { opacity: 1 });
            applyVisualState();
          } else {
            // Entrance drop & gentle initial pendulum swing via GSAP timeline
            const stacked = dimsRef.current.isStacked;
            physicsRef.current.entranceOffsetY = stacked ? -36 : -64;
            physicsRef.current.angle = stacked ? -3.5 : -6;
            physicsRef.current.vx = stacked ? 85 : 210;
            physicsRef.current.omega = stacked ? -14 : -32;
            physicsRef.current.active = true;

            const entranceTl = gsap.timeline({
              defaults: { overwrite: "auto" },
            });

            entranceTl
              .fromTo(
                rigRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: "power2.out" },
                0
              )
              .to(
                physicsRef.current,
                {
                  entranceOffsetY: 0,
                  duration: 0.75,
                  ease: "back.out(1.25)",
                  onUpdate: () => {
                    physicsRef.current.active = true;
                  },
                },
                0
              );
          }
        }
      );

      // Context-safe 3D flip animation + gentle physical click impulse
      const performFlip = (forceNext?: boolean) => {
        if (!flipperRef.current) return;
        const nextFlipped =
          typeof forceNext === "boolean" ? forceNext : !isFlippedRef.current;
        isFlippedRef.current = nextFlipped;
        setIsFlipped(nextFlipped);

        const reduce = reduceMotionRef.current;
        if (reduce) {
          gsap.set(flipperRef.current, {
            rotationY: nextFlipped ? 180 : 0,
            scale: 1,
          });
          return;
        }

        const flipTl = gsap.timeline({ defaults: { overwrite: "auto" } });
        flipTl
          .to(
            flipperRef.current,
            {
              rotationY: nextFlipped ? 180 : 0,
              duration: 0.52,
              ease: "back.out(1.28)",
            },
            0
          )
          .to(
            flipperRef.current,
            {
              scale: 1.038,
              duration: 0.16,
              ease: "power2.out",
            },
            0
          )
          .to(
            flipperRef.current,
            {
              scale: 1,
              duration: 0.36,
              ease: "power2.inOut",
            },
            0.16
          );

        // Subtle click kick matching the reference video physics
        physicsRef.current.vx += nextFlipped ? 120 : -120;
        physicsRef.current.omega += nextFlipped ? -24 : 24;
        physicsRef.current.active = true;
      };

      contextSafeFlipRef.current = contextSafe
        ? contextSafe(performFlip)
        : performFlip;

      // 60fps coupled spring-pendulum physics ticker (sub-stepped at 120Hz for framerate stability)
      const tick = (_time: number, deltaTime: number) => {
        const p = physicsRef.current;
        const d = dimsRef.current;

        if (!p.active && !p.isDragging) return;

        const totalDt = Math.min(deltaTime / 1000, 0.1);
        const anchorToHingeY = Math.max(80, d.slotHeadroom - p.anchorTopY);

        if (p.isDragging) {
          // While dragging, card smoothly trails strap tension angle + pointer momentum
          const strapRad = Math.atan2(-p.dx, Math.max(40, anchorToHingeY + p.dy));
          const strapDeg = clamp((strapRad * 180) / Math.PI, -48, 48);
          const velocityLean = clamp(-dragRef.current.vx * 0.014, -14, 14);
          const targetAngle = strapDeg + velocityLean;

          p.angle += (targetAngle - p.angle) * Math.min(1, totalDt * 16);
          p.vx += (dragRef.current.vx * 0.35 - p.vx) * Math.min(1, totalDt * 10);
          applyVisualState();
          return;
        }

        // Underdamped pendulum + vertical bungee restoring forces (zeta ~ 0.18 for lively multi-swing)
        const kX = 95;
        const cX = 3.6;
        const kY = 220;
        const cY = 12;
        const kAng = 160;
        const cAng = 6.0;

        let remaining = totalDt;
        const fixedStep = 1 / 120;
        while (remaining > 0.0001) {
          const dt = Math.min(remaining, fixedStep);
          remaining -= dt;

          const ax = -kX * p.dx - cX * p.vx;
          const ay = -kY * p.dy - cY * p.vy;

          p.vx += ax * dt;
          p.vy += ay * dt;
          p.dx += p.vx * dt;
          p.dy += p.vy * dt;

          // Coupled rotational pivot around the silver clip
          const strapRad = Math.atan2(-p.dx, Math.max(40, anchorToHingeY + p.dy));
          const strapDeg = (strapRad * 180) / Math.PI;
          const inertiaTorque = clamp(-ax * 0.015, -26, 26);
          const targetAngle = clamp(strapDeg + inertiaTorque, -54, 54);

          const alpha = kAng * (targetAngle - p.angle) - cAng * p.omega;
          p.omega += alpha * dt;
          p.angle += p.omega * dt;
        }

        applyVisualState();

        const settled =
          Math.abs(p.dx) < 0.06 &&
          Math.abs(p.dy) < 0.06 &&
          Math.abs(p.vx) < 0.4 &&
          Math.abs(p.vy) < 0.4 &&
          Math.abs(p.angle) < 0.05 &&
          Math.abs(p.omega) < 0.4 &&
          Math.abs(p.entranceOffsetY) < 0.05;

        if (settled) {
          p.dx = 0;
          p.dy = 0;
          p.vx = 0;
          p.vy = 0;
          p.angle = 0;
          p.omega = 0;
          p.active = false;
          applyVisualState();
        }
      };

      gsap.ticker.add(tick);

      const handleResize = () => {
        syncAnchorAndDimensions();
        applyVisualState();
      };
      window.addEventListener("resize", handleResize);
      if (typeof document !== "undefined" && document.fonts?.ready) {
        document.fonts.ready.then(handleResize);
      }

      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener("resize", handleResize);
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Allow Flip button to handle its own accessible click cleanly without dragging
    if ((e.target as HTMLElement).closest("[data-badge-flip-btn]")) {
      return;
    }

    e.preventDefault();
    const target = e.currentTarget;
    try {
      target.setPointerCapture(e.pointerId);
    } catch {
      // Synthetic events in tests may not carry an active pointerId
    }

    const now = performance.now();
    physicsRef.current.isDragging = true;
    physicsRef.current.active = true;
    setIsDragging(true);

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startDx: physicsRef.current.dx,
      startDy: physicsRef.current.dy,
      travel: 0,
      lastX: e.clientX,
      lastY: e.clientY,
      lastTime: now,
      vx: 0,
      vy: 0,
    };

    const onPointerMove = (moveEvent: PointerEvent) => {
      const nowMove = performance.now();
      const rawDx = moveEvent.clientX - dragRef.current.startX;
      const rawDy = moveEvent.clientY - dragRef.current.startY;
      dragRef.current.travel = Math.max(
        dragRef.current.travel,
        Math.hypot(rawDx, rawDy)
      );

      // Estimate instantaneous release velocity
      const dtMs = Math.max(8, nowMove - dragRef.current.lastTime);
      const instVx = ((moveEvent.clientX - dragRef.current.lastX) / dtMs) * 1000;
      const instVy = ((moveEvent.clientY - dragRef.current.lastY) / dtMs) * 1000;
      dragRef.current.vx = dragRef.current.vx * 0.45 + instVx * 0.55;
      dragRef.current.vy = dragRef.current.vy * 0.45 + instVy * 0.55;
      dragRef.current.lastX = moveEvent.clientX;
      dragRef.current.lastY = moveEvent.clientY;
      dragRef.current.lastTime = nowMove;

      // Soft elastic bounds so the lanyard feels tethered at the top anchor
      const maxPullX = dimsRef.current.isStacked ? 110 : 250;
      const nextDx = clamp(dragRef.current.startDx + rawDx, -maxPullX, maxPullX);
      const nextDy = clamp(dragRef.current.startDy + rawDy, -32, 105);

      physicsRef.current.dx = nextDx;
      physicsRef.current.dy = nextDy;
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      try {
        target.releasePointerCapture(upEvent.pointerId);
      } catch {
        // Ignore if already released
      }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);

      physicsRef.current.isDragging = false;
      setIsDragging(false);

      if (dragRef.current.travel < 6) {
        // Clean click/tap on the card flips front <-> back
        contextSafeFlipRef.current?.();
        return;
      }

      // Throw release: transfer clamped pointer velocity into pendulum physics
      physicsRef.current.vx = clamp(dragRef.current.vx, -1650, 1650);
      physicsRef.current.vy = clamp(dragRef.current.vy, -1200, 1200);
      physicsRef.current.active = true;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  const handleFlipButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    contextSafeFlipRef.current?.();
  };

  const flipButtonMarkup = (isFaceHidden: boolean) => (
    <button
      type="button"
      data-badge-flip-btn="true"
      data-testid={isFaceHidden ? undefined : "badge-flip-button"}
      tabIndex={isFaceHidden ? -1 : 0}
      aria-label={
        isFlipped ? "Flip badge to front view" : "Flip badge to back stats"
      }
      aria-pressed={isFlipped}
      onClick={handleFlipButtonClick}
      className={[
        "absolute -bottom-3.5 right-3.5 z-30 inline-flex items-center gap-1.5",
        "rounded-full border border-black/10 bg-[#FFFFFF] px-3.5 py-1.5",
        "font-mono text-[11.5px] font-medium text-[#2A2926]",
        "shadow-[0_6px_16px_rgba(0,0,0,0.14)]",
        "transition-transform duration-150 ease-out hover:scale-105 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6FF3F] focus-visible:ring-offset-2",
        isFaceHidden ? "pointer-events-none" : "cursor-pointer",
      ].join(" ")}
    >
      <span>Flip</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="w-3 h-3 shrink-0"
      >
        <path
          d="M13.5 8a5.5 5.5 0 1 1-1.38-3.65M13.5 2.75v2.9h-2.9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  return (
    <div
      ref={containerRef}
      data-testid="hanging-badge-slot"
      data-flipped={isFlipped ? "1" : "0"}
      className={["relative select-none shrink-0", className]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: `${dims.width}px`,
        height: `${dims.slotHeadroom + dims.height + 20}px`,
      }}
    >
      {/* Subtle mount grommet shown only when hero stacks vertically (<1024px) */}
      {dims.isStacked && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-10 h-1.5 w-10 rounded-full bg-[#2A2926]/15"
        />
      )}

      {/* Dynamic Bending Neon Yellow Lanyard Strap SVG */}
      <svg
        aria-hidden="true"
        data-testid="lanyard-strap-svg"
        width={dims.width}
        height={dims.slotHeadroom}
        className="pointer-events-none absolute top-0 left-0 z-20 overflow-visible"
      >
        <defs>
          <path
            id={strapPathId}
            ref={strapTextPathRef}
            d={`M ${dims.width / 2} -104 Q ${dims.width / 2} -33 ${dims.width / 2} ${dims.slotHeadroom - 18}`}
            fill="none"
          />
        </defs>

        {/* Subtle ribbon edge contrast outline on light canvas */}
        <path
          ref={strapOuterRef}
          d={`M ${dims.width / 2} -104 Q ${dims.width / 2} -33 ${dims.width / 2} ${dims.slotHeadroom - 18}`}
          fill="none"
          stroke="#2A2926"
          strokeOpacity="0.16"
          strokeWidth={dims.strapWidth + 2}
          strokeLinecap="butt"
        />

        {/* Neon Yellow Main Strap */}
        <path
          ref={strapMainRef}
          d={`M ${dims.width / 2} -104 Q ${dims.width / 2} -33 ${dims.width / 2} ${dims.slotHeadroom - 18}`}
          fill="none"
          stroke="#D6FF3F"
          strokeWidth={dims.strapWidth}
          strokeLinecap="butt"
        />

        {/* Woven Center Highlight */}
        <path
          ref={strapHighlightRef}
          d={`M ${dims.width / 2} -104 Q ${dims.width / 2} -33 ${dims.width / 2} ${dims.slotHeadroom - 18}`}
          fill="none"
          stroke="#ECFF96"
          strokeOpacity="0.45"
          strokeWidth={Math.max(8, dims.strapWidth - 10)}
          strokeLinecap="butt"
        />

        {/* Repeating Curved Lanyard Typography */}
        <text
          fill="#2A2926"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="0.14em"
          fontFamily="var(--font-mono), monospace"
        >
          <textPath
            href={`#${strapPathId}`}
            startOffset="8"
            dominantBaseline="central"
          >
            {strapText}
          </textPath>
        </text>
      </svg>

      {/* Swinging Card Rig (hinge origin at top-center where clip joins card) */}
      <div
        ref={rigRef}
        data-testid="hanging-badge-rig"
        onPointerDown={handlePointerDown}
        className={[
          "absolute left-0 z-30 select-none touch-none will-change-transform",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        ].join(" ")}
        style={{
          top: `${dims.slotHeadroom}px`,
          width: `${dims.width}px`,
          height: `${dims.height}px`,
          transformOrigin: "50% 0px",
        }}
      >
        {/* Silver Metallic Swivel Clamp Clip (stays 2D facing viewer during 3D flip) */}
        <div
          aria-hidden="true"
          data-testid="lanyard-silver-clip"
          className="pointer-events-none absolute -top-[28px] left-1/2 -translate-x-1/2 z-40 h-[42px] w-[32px] rounded-t-[4px] rounded-b-[9px] border border-black/15 shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
          style={{
            background:
              "linear-gradient(90deg, #8B8F96 0%, #CFD2D8 26%, #F3F4F6 50%, #C3C6CD 75%, #777B82 100%)",
          }}
        >
          {/* Top clamp inner shadow lip */}
          <div className="mx-auto mt-[2px] h-[3px] w-[24px] rounded-full bg-black/15" />
          {/* Bottom metallic crimp highlight */}
          <div className="absolute inset-x-[4px] bottom-[5px] h-[2px] rounded-full bg-white/60" />
        </div>

        {/* 3D Perspective Container */}
        <div
          className="relative h-full w-full"
          style={{ perspective: "1200px" }}
        >
          {/* 3D Flipper Container */}
          <div
            ref={flipperRef}
            data-testid="hanging-badge-flipper"
            className="relative h-full w-full will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* ─── FRONT FACE: Maya Ortiz Identity Badge (Neon Yellow Accents) ─── */}
            <div
              data-testid="hanging-badge-front"
              aria-hidden={isFlipped}
              className={[
                "absolute inset-0 flex flex-col rounded-[20px] border border-black/[0.08] bg-[#FFFFFF] p-4 sm:p-[18px]",
                "shadow-[0_24px_48px_-16px_rgba(0,0,0,0.16),0_6px_18px_-6px_rgba(0,0,0,0.08)]",
                isFlipped ? "pointer-events-none" : "pointer-events-auto",
              ].join(" ")}
              style={{
                transform: "rotateY(0deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {/* Top Row: Left Cutout Slot + Right Neon Yellow ALL ACCESS Pill */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-[9px] w-[44px] rounded-full border border-black/[0.06] bg-[#EAEAE6] shadow-[inset_0_1px_2px_rgba(0,0,0,0.14)]"
                />
                <span
                  data-testid="badge-access-tag"
                  className="inline-flex items-center rounded-full border border-[#2A2926]/12 bg-[#D6FF3F] px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#2A2926] shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                >
                  {accessTag}
                </span>
              </div>

              {/* Portrait Picture Frame */}
              <div className="relative flex-1 min-h-0 w-full overflow-hidden rounded-[14px] border border-black/[0.05] bg-[#ECECEC]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority
                  draggable={false}
                  className="object-cover object-[50%_26%] select-none pointer-events-none"
                  sizes="(max-width: 640px) 288px, 348px"
                />
              </div>

              {/* Name, Role, Location Tag & Barcode */}
              <div className="pt-3.5">
                <h2 className="font-heading text-[26px] xl:text-[29px] font-bold leading-[1.06] tracking-[-0.03em] text-[#1A1A1A]">
                  {name}
                </h2>
                <p className="mt-0.5 font-mono text-[12px] font-normal tracking-[-0.01em] text-[#605F5F]">
                  {role}
                </p>

                <div className="mt-3 flex items-center justify-between gap-2 pb-1">
                  {/* Status / Location Pill */}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-[#FAFAFA] px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-[#605F5F]">
                    <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-55" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                    </span>
                    <span className="truncate">{statusText}</span>
                  </span>

                  {/* Crisp Barcode SVG */}
                  <svg
                    width="74"
                    height="22"
                    viewBox="0 0 74 22"
                    fill="none"
                    aria-hidden="true"
                    className="h-[22px] w-[74px] shrink-0"
                  >
                    {BARCODE_BARS.map((bar, idx) => (
                      <rect
                        key={idx}
                        x={bar.x}
                        y={0}
                        width={bar.w}
                        height={22}
                        fill="#1A1A1A"
                      />
                    ))}
                  </svg>
                </div>
              </div>

              {flipButtonMarkup(isFlipped)}
            </div>

            {/* ─── BACK FACE: Red/Blue Spider-Man Theme Matching Reference Video ─── */}
            <div
              data-testid="hanging-badge-back"
              aria-hidden={!isFlipped}
              className={[
                "absolute inset-0 flex flex-col rounded-[20px] border-[4px] border-[#0645A1] bg-[#9D0316] p-4 sm:p-[18px] text-white",
                "shadow-[0_24px_48px_-16px_rgba(0,0,0,0.22),0_6px_18px_-6px_rgba(0,0,0,0.1)]",
                isFlipped ? "pointer-events-auto" : "pointer-events-none",
              ].join(" ")}
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                backgroundImage:
                  "radial-gradient(rgba(0, 0, 0, 0.22) 0.75px, transparent 0.75px)",
                backgroundSize: "4px 4px",
              }}
            >
              {/* Top Row: Left White Slot + Dark "#1 SPIDER-MAN FAN" Pill */}
              <div className="flex items-center justify-between gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-[9px] w-[42px] rounded-full bg-white/95 shadow-inner"
                />
                <span className="inline-flex items-center rounded-full bg-[#161618] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
                  #1 SPIDER-MAN FAN
                </span>
              </div>

              {/* 2×2 Bold White Stats Grid */}
              <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3.5">
                <div>
                  <div className="font-heading text-[28px] xl:text-[31px] font-extrabold leading-none tracking-[-0.03em] text-white">
                    4
                  </div>
                  <div className="mt-1 font-sans text-[10.5px] font-medium leading-[1.25] text-white/90">
                    Years shipping for the web
                  </div>
                </div>
                <div>
                  <div className="font-heading text-[28px] xl:text-[31px] font-extrabold leading-none tracking-[-0.03em] text-white">
                    50+
                  </div>
                  <div className="mt-1 font-sans text-[10.5px] font-medium leading-[1.25] text-white/90">
                    Projects completed
                  </div>
                </div>
                <div>
                  <div className="font-heading text-[28px] xl:text-[31px] font-extrabold leading-none tracking-[-0.03em] text-white">
                    36
                  </div>
                  <div className="mt-1 font-sans text-[10.5px] font-medium leading-[1.25] text-white/90">
                    Live sites in this portfolio
                  </div>
                </div>
                <div>
                  <div className="font-heading text-[28px] xl:text-[31px] font-extrabold leading-none tracking-[-0.03em] text-white">
                    30+
                  </div>
                  <div className="mt-1 font-sans text-[10.5px] font-medium leading-[1.25] text-white/90">
                    Technologies in rotation
                  </div>
                </div>
              </div>

              {/* Bold Spider Emblem SVG */}
              <div className="flex flex-1 items-center justify-center py-2">
                <svg
                  viewBox="0 0 120 140"
                  fill="none"
                  aria-hidden="true"
                  className="h-[108px] w-[94px] sm:h-[122px] sm:w-[106px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                >
                  {/* Head & Abdomen */}
                  <ellipse cx="60" cy="54" rx="7" ry="10" fill="#0A0A0A" />
                  <path
                    d="M60 63 C67 63 70 74 67 88 C65 98 62 106 60 112 C58 106 55 98 53 88 C50 74 53 63 60 63 Z"
                    fill="#0A0A0A"
                  />
                  {/* Upper Left Legs (1 & 2) */}
                  <path
                    d="M55 52 L35 34 L34 6 L40 31 L56 49 Z"
                    fill="#0A0A0A"
                  />
                  <path
                    d="M54 57 L26 42 L20 14 L30 39 L55 54 Z"
                    fill="#0A0A0A"
                  />
                  {/* Lower Left Legs (3 & 4) */}
                  <path
                    d="M54 63 L28 74 L22 114 L33 77 L55 66 Z"
                    fill="#0A0A0A"
                  />
                  <path
                    d="M55 68 L36 86 L34 128 L42 88 L56 72 Z"
                    fill="#0A0A0A"
                  />
                  {/* Upper Right Legs (1 & 2) */}
                  <path
                    d="M65 52 L85 34 L86 6 L80 31 L64 49 Z"
                    fill="#0A0A0A"
                  />
                  <path
                    d="M66 57 L94 42 L100 14 L90 39 L65 54 Z"
                    fill="#0A0A0A"
                  />
                  {/* Lower Right Legs (3 & 4) */}
                  <path
                    d="M66 63 L92 74 L98 114 L87 77 L65 66 Z"
                    fill="#0A0A0A"
                  />
                  <path
                    d="M65 68 L84 86 L86 128 L78 88 L64 72 Z"
                    fill="#0A0A0A"
                  />
                </svg>
              </div>

              {/* Footer Serial Line */}
              <div className="pb-1 font-mono text-[9.5px] font-medium tracking-[0.02em] text-white/90">
                MO-0036 · valid anywhere with Wi-Fi
              </div>

              {flipButtonMarkup(!isFlipped)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
