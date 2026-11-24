"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export interface RoleRotatorProps {
  /** Array of roles to cycle through */
  roles?: string[];
  /** Seconds each role stays before the next edit (defaults to 4s) */
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

export type EditState = "idle" | "navigating" | "selecting" | "selected" | "typing";

// Persistent background timeline state across SPA route transitions
let globalRoleIndex = 0;
let globalCycleStartTime = 0;
let globalDisplayText = DEFAULT_ROLES[0];

/**
 * RoleRotator
 *
 * 1:1 reproduction of the Snapline/Framer multiplayer role title editor.
 *
 * Mechanism:
 *   1. Idle (4s hold): Role text displayed at rest with Lena PM floating ambiently nearby
 *   2. Navigating (420ms): Caret appears at the START of the word; Lena glides to the first letter
 *   3. Selecting (520ms): Lena drags the cursor from left to right across the word, pulling the
 *      lime highlight background (#D6FF3F) in 1:1 synchronization with the cursor tip
 *   4. Selected (200ms): Full word briefly held in full selection highlight
 *   5. Typing: Word deleted, caret reset to start, humanized stochastic typing (40-90ms/char)
 *      with Lena and caret riding along with each newly appeared character
 *   6. Dynamic RAF lerp cursor physics with 120px pointer proximity evasion
 *   7. Persistent Background Simulation: Continues timing in background across page navigation
 *      and browser tab switches with zero animation freezing or stuck caret artifacts.
 */
export function RoleRotator({
  roles = DEFAULT_ROLES,
  hold = 4,
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
  const [editState, setEditState] = useState<EditState>("idle");

  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef(editState);
  const roleIdxRef = useRef(0);
  const selectionStartTimeRef = useRef(0);

  useEffect(() => {
    stateRef.current = editState;
  }, [editState]);

  // Phase 1: Typing & Selection Timing State Machine with Tab-Switch Self-Healing
  useEffect(() => {
    const currentRoles = rolesRef.current;
    if (
      currentRoles.length < 2 ||
      (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      return;
    }

    let isActive = true;
    const timers: NodeJS.Timeout[] = [];

    const schedule = (fn: () => void, delay: number) => {
      timers.push(setTimeout(() => isActive && fn(), delay));
    };

    // Synchronize from persistent timeline on mount
    if (globalCycleStartTime > 0) {
      const elapsed = (Date.now() - globalCycleStartTime) / 1000;
      const cycleLength = hold + 2.2;
      const cyclesElapsed = Math.floor(elapsed / cycleLength);
      if (cyclesElapsed > 0) {
        roleIdxRef.current = (globalRoleIndex + cyclesElapsed) % currentRoles.length;
        globalRoleIndex = roleIdxRef.current;
        globalDisplayText = currentRoles[globalRoleIndex];
        schedule(() => setDisplayText(globalDisplayText), 0);
      }
    } else {
      globalCycleStartTime = Date.now();
      globalDisplayText = currentRoles[0];
    }

    const typeNextCharacter = (targetWord: string, charIndex: number) => {
      setDisplayText(targetWord.slice(0, charIndex));
      if (charIndex < targetWord.length) {
        schedule(
          () => typeNextCharacter(targetWord, charIndex + 1),
          40 + Math.random() * 50
        );
      } else {
        // Finished typing word: immediately return to idle (no settling pause at word end)
        setEditState("idle");
        globalCycleStartTime = Date.now();
        schedule(startSelectionCycle, hold * 1000);
      }
    };

    const startSelectionCycle = () => {
      // Step A: Move cursor to the beginning of the word (navigating)
      setEditState("navigating");

      // Step B: After reaching the start, begin dragging the highlight across (selecting)
      schedule(() => {
        selectionStartTimeRef.current = performance.now();
        setEditState("selecting");

        // Step C: Full selection brief hold (selected)
        schedule(() => {
          setEditState("selected");

          // Step D: Delete word and begin typing new role
          schedule(() => {
            setEditState("typing");
            setDisplayText("");
            const availableRoles = rolesRef.current;
            roleIdxRef.current = (roleIdxRef.current + 1) % availableRoles.length;
            globalRoleIndex = roleIdxRef.current;
            schedule(() => typeNextCharacter(availableRoles[roleIdxRef.current], 1), 220);
          }, 200);
        }, 520);
      }, 420);
    };

    // Tab-Switch & Page Focus Visibility Listener
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab hidden: cancel micro-timers to avoid browser background timer throttling
        timers.forEach(clearTimeout);
        timers.length = 0;
      } else {
        // Tab became visible again: advance role according to background elapsed time
        const rolesList = rolesRef.current;
        if (globalCycleStartTime > 0) {
          const elapsed = (Date.now() - globalCycleStartTime) / 1000;
          const cycleLength = hold + 2.2;
          const cyclesElapsed = Math.floor(elapsed / cycleLength);
          if (cyclesElapsed > 0) {
            roleIdxRef.current = (roleIdxRef.current + cyclesElapsed) % rolesList.length;
            globalRoleIndex = roleIdxRef.current;
            const newText = rolesList[roleIdxRef.current];
            globalDisplayText = newText;
            setDisplayText(newText);
          }
        }
        globalCycleStartTime = Date.now();

        // Always reset to a pristine idle state: caret hidden, no partial highlight
        setEditState("idle");
        if (textRef.current) {
          textRef.current.style.backgroundSize = "0% 100%";
        }

        // Schedule next selection cycle after standard hold duration
        schedule(startSelectionCycle, hold * 1000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial hold before first collaborative edit cycle begins (4000ms idle)
    schedule(startSelectionCycle, hold * 1000);

    return () => {
      isActive = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      timers.forEach(clearTimeout);
    };
  }, [rolesKey, hold]);

  // Phase 2: Programmatic Cursor & Caret Physics (60fps RAF Lerp Loop)
  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    const caretEl = caretRef.current;
    const cursorEl = cursorRef.current;
    if (!container || !textEl || !caretEl || !cursorEl) return;

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
      const height = container.offsetHeight || 72;
      const currentState = stateRef.current;

      const target = { x: 0, y: height * 0.55 };
      let caretX = 0;
      let caretVisible = false;

      if (currentState === "idle") {
        // Idle: Caret hidden; Lena gently wanders below/after the title
        target.x = textEl.offsetLeft + textEl.offsetWidth + 14 + 12 * Math.sin(elapsed * 0.5);
        target.y = height * 0.82 + 6 * Math.sin(elapsed * 0.8 + 1);
        caretVisible = false;
        textEl.style.backgroundSize = "0% 100%";
      } else if (currentState === "navigating") {
        // Navigating: Caret appears at START of word; Lena glides to first letter
        target.x = textEl.offsetLeft;
        target.y = height * 0.55;
        caretX = textEl.offsetLeft;
        caretVisible = true;
        textEl.style.backgroundSize = "0% 100%";
      } else if (currentState === "selecting") {
        // Selecting: Lena drags across the word from left to right, pulling highlight along
        const duration = 520;
        const progress = Math.min(1, Math.max(0, (now - selectionStartTimeRef.current) / duration));
        // Smooth ease-out drag curve
        const eased = 1 - Math.pow(1 - progress, 2.2);

        target.x = textEl.offsetLeft + textEl.offsetWidth * eased;
        target.y = height * 0.55;
        caretX = textEl.offsetLeft + textEl.offsetWidth * eased;
        caretVisible = true;

        textEl.style.backgroundSize = `${(eased * 100).toFixed(1)}% 100%`;
      } else if (currentState === "selected") {
        // Selected: Entire word highlighted in lime, cursor rests at word end
        target.x = textEl.offsetLeft + textEl.offsetWidth + 2;
        target.y = height * 0.55;
        caretX = textEl.offsetLeft + textEl.offsetWidth;
        caretVisible = true;
        textEl.style.backgroundSize = "100% 100%";
      } else if (currentState === "typing") {
        // Typing: Word cleared, Lena and caret ride along with newly typed letters
        target.x = textEl.offsetLeft + textEl.offsetWidth + 2;
        target.y = height * 0.55;
        caretX = textEl.offsetLeft + textEl.offsetWidth;
        caretVisible = true;
        textEl.style.backgroundSize = "0% 100%";
      }

      // Update Caret Position & Opacity
      caretEl.style.opacity = caretVisible ? "1" : "0";
      caretEl.style.transform = `translate3d(${caretX.toFixed(1)}px, 0, 0)`;

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

      // Smooth friction lerp interpolation (0.07 factor for responsive tracking)
      current.x += (target.x - current.x) * 0.07;
      current.y += (target.y - current.y) * 0.07;

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

    const onVisibilityChange = () => {
      if (!document.hidden && isIntersecting && !rafId) {
        rafId = requestAnimationFrame(updateFrame);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
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
        data-state={editState}
        className="inline-block rounded-[4px] px-1 font-heading font-semibold text-[#0A0A0A] [background:linear-gradient(var(--hl),var(--hl))_0_0/0%_100%_no-repeat]"
      >
        {displayText || "\u00A0"}
      </span>

      {/* State-Driven Caret synchronized with selection drag and typing */}
      <span
        ref={caretRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[12%] bottom-[12%] w-[2.5px] bg-[#0A0A0A] opacity-0 transition-opacity duration-150 not-italic select-none"
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
          className="absolute left-[16px] top-[18px] inline-flex items-center gap-[5px] rounded-[7px_7px_7px_2px] bg-[var(--t)] px-[10px] py-[4px] font-sans text-[12.5px] font-semibold leading-[1.2] text-[var(--tt)] whitespace-nowrap tracking-normal antialiased select-none shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
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
