"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export interface RoleRotatorProps {
  /** Array of roles to cycle through */
  roles?: string[];
  /** Seconds each role stays before the next edit (defaults to 3s) */
  hold?: number;
  /** Optional class name override */
  className?: string;
}

const DEFAULT_ROLES = [
  "Product Designer",
  "Design Lead",
  "UX Researcher",
  "Prototyper",
];

/**
 * RoleRotator
 *
 * 1:1 reproduction of the Snapline/Framer multiplayer role title editor.
 *
 * Mechanism:
 *   - 3-phase cycle: Idle (3s hold) -> Selected (750ms lime gradient sweep) -> Typing (humanized stochastic typing 40-100ms/char)
 *   - Caret visibility: Hidden in idle (opacity: 0), visible during selection and typing (opacity: 1)
 *   - Dynamic RAF lerp cursor physics:
 *     - When idle: ambient sine-wave wandering below the title
 *     - When editing: locks directly to the text caret and rides along as characters appear
 *     - Pointer evasion: glides smoothly away if user mouse approaches within 120px
 *   - Collaborator cursor ("Lena · PM") with Figma badge geometry and discrete centered dot
 */
export function RoleRotator({
  roles = DEFAULT_ROLES,
  hold = 3,
  className = "",
}: RoleRotatorProps) {
  const validRoles = useMemo(() => {
    const filtered = roles.filter(Boolean);
    return filtered.length > 0 ? filtered : DEFAULT_ROLES;
  }, [roles]);

  const rolesKey = useMemo(() => validRoles.join("|"), [validRoles]);
  const rolesRef = useRef(validRoles);

  useEffect(() => {
    rolesRef.current = validRoles;
  }, [validRoles]);

  const [displayText, setDisplayText] = useState(() => validRoles[0] || DEFAULT_ROLES[0]);
  const [editState, setEditState] = useState<"idle" | "selected" | "typing">("idle");

  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef(editState);

  useEffect(() => {
    stateRef.current = editState;
  }, [editState]);

  // Phase 1: Typing & Selection Timing State Machine
  useEffect(() => {
    const currentRoles = rolesRef.current;
    if (
      currentRoles.length < 2 ||
      (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      return;
    }

    let roleIdx = 0;
    let isActive = true;
    const timers: NodeJS.Timeout[] = [];

    const schedule = (fn: () => void, delay: number) => {
      timers.push(setTimeout(() => isActive && fn(), delay));
    };

    const typeNextCharacter = (targetWord: string, charIndex: number) => {
      setDisplayText(targetWord.slice(0, charIndex));
      if (charIndex < targetWord.length) {
        schedule(
          () => typeNextCharacter(targetWord, charIndex + 1),
          40 + Math.random() * 60
        );
      } else {
        schedule(() => {
          setEditState("idle");
          schedule(startSelectionPhase, hold * 1000);
        }, 500);
      }
    };

    const startSelectionPhase = () => {
      setEditState("selected");
      schedule(() => {
        setEditState("typing");
        setDisplayText("");
        const availableRoles = rolesRef.current;
        roleIdx = (roleIdx + 1) % availableRoles.length;
        schedule(() => typeNextCharacter(availableRoles[roleIdx], 1), 260);
      }, 750);
    };

    // Initial hold before first collaborative edit cycle begins
    schedule(startSelectionPhase, 2600);

    return () => {
      isActive = false;
      timers.forEach(clearTimeout);
    };
  }, [rolesKey, hold]);

  // Phase 2: Programmatic Cursor Physics (Idle Wander, Typing Lock-on, Mouse Evasion)
  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    const cursorEl = cursorRef.current;
    if (!container || !textEl || !cursorEl) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pointer = { x: -9999, y: -9999 };
    const current = { x: 0, y: 0 };
    let rafId = 0;
    let isIntersecting = false;
    let initialized = false;
    const startTime = performance.now();

    const updateFrame = (now: number) => {
      rafId = 0;
      if (!isIntersecting) return;

      const elapsed = reducedMotion ? 0 : (now - startTime) / 1000;
      const height = container.offsetHeight || 65;

      // Coordinate Target Solver:
      // When Idle: Ambient sine-wave floating alongside the title
      // When Selected / Typing: Locks directly to text boundary with height offset
      const target =
        stateRef.current === "idle"
          ? {
              x: textEl.offsetLeft + textEl.offsetWidth + 14 + 12 * Math.sin(elapsed * 0.5),
              y: height * 0.82 + 6 * Math.sin(elapsed * 0.8 + 1),
            }
          : {
              x: textEl.offsetLeft + textEl.offsetWidth + height * 0.12,
              y: height * 0.55,
            };

      // Mouse Proximity Evasion (120px repulsion vector)
      const dx = target.x - pointer.x;
      const dy = target.y - pointer.y;
      const distance = Math.hypot(dx, dy) || 1;
      if (distance < 120) {
        target.x += (dx / distance) * (120 - distance) * 1.3;
        target.y += (dy / distance) * (120 - distance) * 1.3;
      }

      if (!initialized) {
        current.x = target.x;
        current.y = target.y;
        initialized = true;
      }

      // Smooth friction lerp interpolation (0.06 factor)
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;

      cursorEl.style.transform = `translate3d(${current.x.toFixed(1)}px, ${current.y.toFixed(1)}px, 0)`;
      rafId = requestAnimationFrame(updateFrame);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting && !rafId) {
        rafId = requestAnimationFrame(updateFrame);
      }
    });
    observer.observe(container);

    const onPointerMove = (evt: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = evt.clientX - rect.left;
      pointer.y = evt.clientY - rect.top;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className={[
        "relative inline-block whitespace-nowrap select-none align-baseline",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        ["--hl" as string]: "#D6FF3F",
        ["--cc" as string]: "#0A0A0A",
        ["--t" as string]: "#D6FF3F",
        ["--tt" as string]: "#0A0A0A",
      }}
    >
      {/* Dynamic Typewriter Text with Left-to-Right Selection Gradient Sweep */}
      <span
        ref={textRef}
        data-sel={editState === "selected" ? "1" : "0"}
        className="inline-block rounded-[4px] px-1 font-heading font-semibold text-[#0A0A0A] [background:linear-gradient(var(--hl),var(--hl))_0_0/0%_100%_no-repeat] transition-[background-size] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] data-[sel=1]:[background-size:100%_100%]"
      >
        {displayText || "\u00A0"}
      </span>

      {/* State-Driven Caret (Hidden when idle, visible during selection and typing) */}
      <i
        aria-hidden="true"
        data-on={editState === "idle" ? "0" : "1"}
        className="inline-block w-[max(2px,0.04em)] h-[0.82em] ml-[0.04em] -mb-[0.04em] align-middle bg-[var(--cc)] opacity-0 transition-opacity duration-200 data-[on=1]:opacity-100 not-italic"
      />

      {/* Simulated Collaborator Cursor ("Lena · PM") Driven by RAF Lerp Physics */}
      <span
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 select-none will-change-transform"
        style={{ letterSpacing: "0px" }}
      >
        {/* Exact Snapline Cursor SVG */}
        <svg
          viewBox="0 0 20 24"
          className="h-[24px] w-[20px] block shrink-0 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
        >
          <path
            d="M2 1.5v18l5-4.7 3.4 7.4 3.2-1.4-3.4-7.2 6.8-.2z"
            fill="#0A0A0A"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>

        {/* Clear, High-Contrast Collaborator Name Badge */}
        <b
          className="absolute left-[16px] top-[18px] inline-flex items-center gap-[5px] rounded-[7px_7px_7px_2px] bg-[var(--t)] px-[9px] py-[4px] font-sans text-[12px] font-semibold leading-[1.2] text-[var(--tt)] whitespace-nowrap tracking-normal antialiased select-none shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
          style={{ letterSpacing: "0em" }}
        >
          <span className="tracking-normal font-semibold">Lena</span>
          <span
            aria-hidden="true"
            className="inline-block h-[3.5px] w-[3.5px] rounded-full bg-[#0A0A0A] opacity-75 shrink-0"
          />
          <span className="tracking-normal font-semibold">PM</span>
        </b>
      </span>
    </span>
  );
}
