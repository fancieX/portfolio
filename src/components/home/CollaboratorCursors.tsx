"use client";

import { useState, useEffect, useRef } from "react";

export type CollaboratorBadgeVariant = "lime" | "dark";

export interface CollaboratorCursorBadgeProps {
  /** Collaborator first name (e.g. "Lena" or "Sam") */
  name: string;
  /** Collaborator role (e.g. "PM" or "Dev") */
  role: string;
  /** Badge visual theme ("lime" for Lena · PM, "dark" for Sam · Dev) */
  variant?: CollaboratorBadgeVariant;
  /** Semantic tag used for pill label */
  tagAs?: "b" | "span";
}

const VARIANT_STYLES: Record<
  CollaboratorBadgeVariant,
  { pill: string; dot: string }
> = {
  lime: {
    pill: "bg-[#D6FF3F] text-[#2A2926] shadow-[0_2px_8px_rgba(0,0,0,0.18)]",
    dot: "bg-[#2A2926]/75",
  },
  dark: {
    pill: "bg-[#2A2926] text-[#FFFFFF] shadow-[0_2px_8px_rgba(0,0,0,0.22)]",
    dot: "bg-white/75",
  },
};

/**
 * CollaboratorCursorBadge
 *
 * Shared Figma multiplayer cursor arrow (20×24px) and collaborator label pill
 * matched 1:1 to Snapline tokens (`padding: 4px 9px`, `12px` semibold,
 * `border-radius: 7px 7px 7px 2px`).
 */
export function CollaboratorCursorBadge({
  name,
  role,
  variant = "lime",
  tagAs = "b",
}: CollaboratorCursorBadgeProps) {
  const styles = VARIANT_STYLES[variant];
  const LabelTag = tagAs;

  return (
    <>
      <svg
        viewBox="0 0 20 24"
        className="block h-[24px] w-[20px] shrink-0 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
      >
        <path
          d="M2 1.5v18l5-4.7 3.4 7.4 3.2-1.4-3.4-7.2 6.8-.2z"
          fill="#2A2926"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>

      <LabelTag
        className={[
          "absolute left-[16px] top-[18px] inline-flex items-center gap-[5px] rounded-[7px_7px_7px_2px] px-[9px] py-[4px] font-sans text-[12px] font-semibold leading-[1.2] whitespace-nowrap tracking-normal antialiased select-none",
          styles.pill,
        ].join(" ")}
        style={{ letterSpacing: "0em" }}
      >
        <span>{name}</span>
        <span
          aria-hidden="true"
          className={[
            "inline-block h-[3px] w-[3px] rounded-full shrink-0",
            styles.dot,
          ].join(" ")}
        />
        <span>{role}</span>
      </LabelTag>
    </>
  );
}

const SAM_WAYPOINTS: Array<{ x: number; y: number }> = [
  { x: 0.44, y: 0.54 },
  { x: 0.62, y: 0.42 },
  { x: 0.48, y: 0.34 },
  { x: 0.68, y: 0.72 },
  { x: 0.32, y: 0.46 },
  { x: 0.56, y: 0.64 },
];

const SAM_COMMENTS = [
  "Love this crop",
  "Can we test this with users?",
  "Add it to the design system?",
  "Ship it Friday?",
  "Pixel perfect",
];

export interface PortraitCollaboratorCursorProps {
  /** Live rendered width of enclosing portrait frame */
  frameWidth: number;
  /** Live rendered height of enclosing portrait frame */
  frameHeight: number;
}

/**
 * PortraitCollaboratorCursor
 *
 * Simulated "Sam · Dev" multiplayer cursor wandering autonomously within the
 * hero portrait bounds while periodically popping spring-animated comment bubbles.
 * Matches Snapline across desktop, tablet, and mobile viewports (no pointer evasion).
 */
export function PortraitCollaboratorCursor({
  frameWidth,
  frameHeight,
}: PortraitCollaboratorCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef({ w: frameWidth, h: frameHeight });
  const [commentIndex, setCommentIndex] = useState(0);
  const [commentOpen, setCommentOpen] = useState(false);

  useEffect(() => {
    sizeRef.current = { w: frameWidth, h: frameHeight };
  }, [frameWidth, frameHeight]);

  // Smooth RAF waypoint gliding mapped proportionally to active portrait dimensions
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let waypointIdx = 0;
    const current = {
      x: sizeRef.current.w * SAM_WAYPOINTS[0].x,
      y: sizeRef.current.h * SAM_WAYPOINTS[0].y,
    };
    let rafId = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const { w, h } = sizeRef.current;
      const elapsed = (now - startTime) / 1000;
      const wp = SAM_WAYPOINTS[waypointIdx];

      const driftX = reducedMotion ? 0 : Math.sin(elapsed * 0.9) * 10;
      const driftY = reducedMotion ? 0 : Math.cos(elapsed * 0.7) * 8;

      const maxCursorX = w < 360 ? w - 148 : w - 108;
      const targetX = Math.max(24, Math.min(maxCursorX, w * wp.x + driftX));
      const targetY = Math.max(48, Math.min(h - 48, h * wp.y + driftY));

      if (reducedMotion) {
        current.x = targetX;
        current.y = targetY;
      } else {
        current.x += (targetX - current.x) * 0.032;
        current.y += (targetY - current.y) * 0.032;
      }

      el.style.transform = `translate3d(${current.x.toFixed(1)}px, ${current.y.toFixed(1)}px, 0)`;
      rafId = requestAnimationFrame(step);
    };

    const waypointTimer = setInterval(() => {
      if (!document.hidden && !reducedMotion) {
        waypointIdx = (waypointIdx + 1) % SAM_WAYPOINTS.length;
      }
    }, 3400);

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(waypointTimer);
    };
  }, []);

  // Periodic spring-popping comment bubble cycle
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let active = true;
    const timers: NodeJS.Timeout[] = [];
    const schedule = (fn: () => void, ms: number) => {
      timers.push(setTimeout(() => active && fn(), ms));
    };

    const runCycle = (idx: number) => {
      setCommentIndex(idx);
      setCommentOpen(true);

      schedule(() => {
        setCommentOpen(false);
        schedule(() => {
          runCycle((idx + 1) % SAM_COMMENTS.length);
        }, 2800);
      }, 3000);
    };

    schedule(() => runCycle(0), 1600);

    return () => {
      active = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      data-testid="portrait-sam-cursor"
      className="pointer-events-none absolute top-0 left-0 z-[25] select-none will-change-transform"
      style={{
        transform: `translate3d(${Math.round(frameWidth * 0.44)}px, ${Math.round(frameHeight * 0.54)}px, 0)`,
      }}
    >
      {/* Spring Comment Bubble (.snp-cmt) */}
      <div
        data-testid="portrait-sam-comment"
        data-open={commentOpen ? "1" : "0"}
        className="pointer-events-none absolute bottom-[calc(100%+4px)] left-[18px] min-w-[144px] max-w-[210px] border border-black/10 bg-white px-[12px] py-[9px] select-none"
        style={{
          borderRadius: "14px 14px 14px 4px",
          boxShadow: "0 16px 34px -18px rgba(0, 0, 0, 0.4)",
          transformOrigin: "0% 100%",
          transform: commentOpen ? "scale(1)" : "scale(0.3)",
          opacity: commentOpen ? 1 : 0,
          transition:
            "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
        }}
      >
        <span className="block font-sans text-[11px] font-medium leading-tight text-[#8A8A8A]">
          Sam · Dev
        </span>
        <span className="mt-0.5 block font-sans text-[12.5px] font-medium leading-snug text-[#2A2926]">
          {SAM_COMMENTS[commentIndex]}
        </span>
      </div>

      <CollaboratorCursorBadge
        name="Sam"
        role="Dev"
        variant="dark"
        tagAs="span"
      />
    </div>
  );
}
