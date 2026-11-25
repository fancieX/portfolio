"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { CollaboratorCursorBadge } from "./CollaboratorCursors";

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
 * Architecture (matches reference .snp-re / .snp-re-txt / .snp-re-caret):
 *   1. Idle (4s hold): Role text at rest, caret hidden, Lena drifts below
 *   2. Navigating (420ms): Lena glides toward the word start
 *   3. Selecting (520ms): CSS background-size transitions 0%→100% via data-sel="1"
 *      and cubic-bezier(0.16, 1, 0.3, 1). Lena tracks across the word.
 *   4. Selected (200ms hold): Full lime highlight, brief hold
 *   5. Typing: Word deleted all at once, caret resets, humanized stochastic
 *      typing (40–90ms/char). Caret is an inline-flow element so it is always
 *      physically flush with the last character — no lag, no letter overlap.
 *   6. Post-typing caret hold (~450ms) + 200ms opacity fade-out in place
 *   7. Dynamic RAF lerp cursor physics (Lena), 120px pointer proximity evasion
 *   8. Persistent background simulation across page navigation and tab switches
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
  // dataSel drives CSS background-size transition via attribute, matching reference .snp-re-txt[data-sel="1"]
  const [dataSel, setDataSel] = useState<"0" | "1">("0");
  // caretOn drives CSS opacity transition via attribute, matching reference .snp-re-caret[data-on="1"]
  const [caretOn, setCaretOn] = useState<"0" | "1">("0");

  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef(editState);
  const roleIdxRef = useRef(0);

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
        // Finished typing: hold caret visible at word end ~450ms, then fade out before going idle
        schedule(() => {
          setCaretOn("0"); // Triggers CSS opacity 0.2s transition — caret fades in place
          schedule(() => {
            setEditState("idle");
            setDataSel("0");
            globalCycleStartTime = Date.now();
            schedule(startSelectionCycle, hold * 1000);
          }, 220);
        }, 450);
      }
    };

    const startSelectionCycle = () => {
      // Step A: Lena navigates to word start
      setEditState("navigating");
      setDataSel("0");
      setCaretOn("1");

      // Step B: CSS transition sweeps highlight 0%→100% (data-sel="1")
      schedule(() => {
        setEditState("selecting");
        setDataSel("1"); // ← triggers CSS background-size: 0.4s cubic-bezier(0.16,1,0.3,1)

        // Step C: Full selection brief hold
        schedule(() => {
          setEditState("selected");

          // Step D: Instant delete, caret stays on, type new role
          schedule(() => {
            setEditState("typing");
            setDataSel("0"); // ← CSS instantly resets background-size to 0% 100%
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
        timers.forEach(clearTimeout);
        timers.length = 0;
      } else {
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
        setEditState("idle");
        setDataSel("0");
        setCaretOn("0");
        schedule(startSelectionCycle, hold * 1000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial hold before first collaborative edit cycle begins
    schedule(startSelectionCycle, hold * 1000);

    return () => {
      isActive = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      timers.forEach(clearTimeout);
    };
  }, [rolesKey, hold]);

  // Phase 2: Programmatic Cursor (Lena) Physics — RAF Lerp Loop
  // Note: Caret is now inline-flow, so this loop only drives the Lena cursor position.
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
      const height = container.offsetHeight || 72;
      const currentState = stateRef.current;

      const target = { x: 0, y: height * 0.55 };

      if (currentState === "idle") {
        // Idle: Lena drifts below/after the role text with gentle sinusoidal wander
        const rawIdleX = textEl.offsetLeft + textEl.offsetWidth + 14 + 12 * Math.sin(elapsed * 0.5);
        const containerLeft = container.getBoundingClientRect().left;
        const viewportW = document.documentElement.clientWidth || window.innerWidth;
        const maxIdleX = Math.max(24, viewportW - containerLeft - 104);
        target.x = Math.min(rawIdleX, maxIdleX);
        target.y = height * 0.82 + 6 * Math.sin(elapsed * 0.8 + 1);
      } else if (currentState === "navigating") {
        // Navigating: Lena glides toward the start of the word
        target.x = textEl.offsetLeft;
        target.y = height * 0.55;
      } else if (currentState === "selecting") {
        // Selecting: Lena sweeps across the word left-to-right
        // Use elapsed-since-select for smooth cursor travel
        const selectProgress = Math.min(1, (now - (now - 520)) / 520);
        // Approximate: use textEl.offsetWidth since CSS handles the highlight
        target.x = textEl.offsetLeft + textEl.offsetWidth * Math.min(1, selectProgress + 0.1);
        target.y = height * 0.55;
      } else if (currentState === "selected") {
        target.x = textEl.offsetLeft + textEl.offsetWidth + 2;
        target.y = height * 0.55;
      } else if (currentState === "typing") {
        target.x = textEl.offsetLeft + textEl.offsetWidth + 2;
        target.y = height * 0.55;
      }

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

      // Smooth friction lerp interpolation (0.07 factor)
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
        ["--cc" as string]: "#2A2926",
        ["--t" as string]: "#D6FF3F",
        ["--tt" as string]: "#2A2926",
      }}
    >
      {/*
        Text span with CSS-driven background-size transition.
        data-sel="1" triggers background-size: 100% 100% via CSS class.
        CSS handles the transition reliably (no RAF race condition).
        Matching reference .snp-re-txt architecture.
      */}
      <span
        ref={textRef}
        data-sel={dataSel}
        data-state={editState}
        className={[
          "inline-block rounded-[4px] px-[2px] font-heading font-semibold text-[#2A2926]",
          // CSS background-size transition: 0% when data-sel="0", 100% when data-sel="1"
          // Transition matches reference: 0.4s cubic-bezier(0.16, 1, 0.3, 1)
          "[background:linear-gradient(var(--hl),var(--hl))_0_0/0%_100%_no-repeat]",
          "data-[sel=1]:[background-size:100%_100%]",
          "[transition:background-size_0.4s_cubic-bezier(0.16,1,0.3,1)]",
        ].join(" ")}
      >
        {displayText || "\u00A0"}
      </span>

      {/*
        Inline-flow caret — immediately follows the text span in normal document flow.
        Because it is an inline element (not absolutely positioned), the browser
        layout engine places it perfectly flush against the last typed character
        every render frame with zero JS offset math and zero lag.
        Matching reference .snp-re-caret architecture (display: inline-block; margin-left: 0.04em).
        data-on="1" = visible, data-on="0" = opacity 0 (CSS transition 200ms).
      */}
      <span
        data-on={caretOn}
        aria-hidden="true"
        className={[
          "inline-block align-middle",
          "ml-[0.04em] -translate-y-[0.05em]",
          "w-[2px] h-[0.88em]",
          "bg-[#2A2926]",
          "opacity-0 data-[on=1]:opacity-100",
          "[transition:opacity_0.2s_ease]",
          "pointer-events-none select-none",
        ].join(" ")}
      />

      {/* Simulated Collaborator Cursor ("Lena · PM") Driven by RAF Lerp Physics */}
      <span
        ref={cursorRef}
        aria-hidden="true"
        data-testid="role-lena-cursor"
        className="pointer-events-none absolute left-0 top-0 z-20 select-none will-change-transform"
        style={{ letterSpacing: "0px" }}
      >
        <CollaboratorCursorBadge
          name="Lena"
          role="PM"
          variant="lime"
          tagAs="b"
        />
      </span>
    </span>
  );
}
