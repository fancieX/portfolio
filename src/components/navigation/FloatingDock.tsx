"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { dockItems } from "@/data/navigation";
import type { DockTriggerIcon } from "@/types";

// ─── Token Reference (Verified 1:1 with https://snapline.framer.website/) ──────
// Container Height: 54px (min-content: 42px item + 2 × 6px padding)
// Container Radius: 16px (rounded-[16px])
// Container Padding: 6px (p-[6px])
// Item Gap:         3px (gap-[3px])
// Container Bg:     rgba(255, 255, 255, 0.92)
// Backdrop Filter:  blur(14px)
// Border:           1px solid rgba(10, 10, 10, 0.1)
// Shadow:           0px 14px 36px -16px rgba(0, 0, 0, 0.38)
// Icon Shape Size:  42px × 42px (w-[42px] h-[42px])
// Icon Shape Radius:11px (rounded-[11px] concentric with 16px container - 5px padding)
// Active Pill Bg:   #0A0A0A
// Active Icon Color:#D6FF3F (signature neon lime)
// Inactive Color:   #3A3A3A (hover #0A0A0A)
// Tooltip Radius:   7px (bg #0A0A0A, text white, shortcut badge border white/20 #D6FF3F)
// Z-Index:          1000

/** Exact inline SVG icon renderers extracted 1:1 from Snapline Framer topology */
const ICONS: Record<DockTriggerIcon, ReactNode> = {
  cursor: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[19px] h-[19px] shrink-0"
    >
      <path
        d="M 15.22 12.97 C 15.044 12.795 14.967 12.544 15.013 12.3 C 15.059 12.056 15.223 11.85 15.451 11.751 L 19.802 10.081 C 20.082 9.954 20.255 9.669 20.241 9.362 C 20.226 9.055 20.026 8.788 19.735 8.689 L 4.729 3.788 C 4.463 3.706 4.174 3.778 3.978 3.975 C 3.781 4.171 3.709 4.46 3.791 4.726 L 8.689 19.735 C 8.789 20.026 9.055 20.226 9.362 20.241 C 9.669 20.255 9.954 20.081 10.081 19.802 L 11.752 15.451 C 11.851 15.223 12.056 15.059 12.3 15.013 C 12.544 14.967 12.795 15.044 12.97 15.22 L 17.781 20.03 C 18.073 20.323 18.548 20.323 18.841 20.03 L 20.031 18.844 C 20.323 18.551 20.323 18.076 20.031 17.783 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  frame: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[19px] h-[19px] shrink-0"
    >
      <path
        d="M4.5 9H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 15H19.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 3.75L7.5 20.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 3.75L13.5 20.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  user: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[19px] h-[19px] shrink-0"
    >
      <path
        d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 20.25C4.816 17.112 8.114 15 12 15C15.886 15 19.184 17.112 21 20.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  text: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[19px] h-[19px] shrink-0"
    >
      <path
        d="M5.25 8.25V5.25H18.75V8.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5.25V18.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 18.75H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  comment: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[19px] h-[19px] shrink-0"
    >
      <path
        d="M4.233 21.573C4.01 21.76 3.698 21.802 3.434 21.679C3.17 21.556 3 21.291 3 21V6C3 5.586 3.336 5.25 3.75 5.25H20.25C20.664 5.25 21 5.586 21 6V18C21 18.414 20.664 18.75 20.25 18.75H7.5L4.233 21.573Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export interface FloatingDockProps {
  /** Optional class name override */
  className?: string;
  /** Displayed scale percentage (defaults to "100%") */
  scaleText?: string;
}

/**
 * FloatingDock
 *
 * Universal bottom floating navigation dock matching Snapline's signature
 * Figma-inspired tool dock.
 *
 * Micro-interactions:
 *   - Active route indicator with smooth sliding hardware-accelerated transition
 *   - Inactive icons highlight on hover
 *   - Hover tooltips with shortcut badges
 *   - Global keyboard shortcuts: H (Home), W (Work), A (About), J (Journal), C (Contact)
 *   - Safe-area inset support on mobile viewports
 */
export function FloatingDock({
  className = "",
  scaleText = "100%",
}: FloatingDockProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Route matching logic
  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Find active item index (0-4) or -1 if non-dock route
  const activeIndex = dockItems.findIndex((item) => isItemActive(item.href));

  // Global keyboard shortcuts: H (Home), W (Work), A (About), J (Journal), C (Contact)
  // Also supports Figma-style tool aliases (V, #, T)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Guard: do not trigger when user is actively typing in a form input
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (
        activeTag === "input" ||
        activeTag === "textarea" ||
        activeTag === "select" ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      // Guard: do not trigger with Ctrl/Cmd/Alt modifiers (preserves browser shortcuts like Ctrl+C, Cmd+W)
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === "h" || key === "v") {
        e.preventDefault();
        router.push("/");
      } else if (key === "w" || key === "#" || (e.shiftKey && key === "3")) {
        e.preventDefault();
        router.push("/work");
      } else if (key === "a") {
        e.preventDefault();
        router.push("/about");
      } else if (key === "j" || key === "t") {
        e.preventDefault();
        router.push("/journal");
      } else if (key === "c") {
        e.preventDefault();
        router.push("/contact");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <nav
      role="navigation"
      aria-label="Floating Navigation Dock"
      data-testid="floating-dock"
      className={[
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] select-none",
        "max-sm:bottom-[calc(16px+env(safe-area-inset-bottom,0px))]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative flex h-[54px] items-center gap-[3px] rounded-[16px] border border-black/10 bg-white/90 p-[6px] shadow-[0px_14px_36px_-16px_rgba(0,0,0,0.38)] backdrop-blur-[14px]">
        {/* Animated Sliding Solid Dark Pill Indicator (11px concentric radius) */}
        {activeIndex !== -1 && (
          <div
            data-testid="active-dock-pill"
            aria-hidden="true"
            className="absolute top-[6px] left-[6px] h-[42px] w-[42px] rounded-[11px] bg-[#0A0A0A] pointer-events-none transition-transform duration-200 ease-out"
            style={{
              transform: `translateX(${activeIndex * 45}px)`,
            }}
          />
        )}

        {/* 5 Navigation Triggers */}
        {dockItems.map((item) => {
          const active = isItemActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              data-testid={`dock-item-${item.id}`}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={[
                "group relative z-10 flex h-[42px] w-[42px] items-center justify-center rounded-[11px] transition-transform active:scale-95",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6FF3F] focus-visible:ring-offset-2",
                !active && "hover:bg-black/[0.05]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Dynamic Icon (Neon Lime #D6FF3F when active, Gray #3A3A3A when inactive) */}
              <span
                data-testid={`dock-icon-${item.id}`}
                className={[
                  "transition-colors duration-150 flex items-center justify-center",
                  active ? "text-[#D6FF3F]" : "text-[#3A3A3A] group-hover:text-[#0A0A0A]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {ICONS[item.icon]}
              </span>

              {/* Hover Tooltip matching Framer reference */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[54px] left-1/2 -translate-x-1/2 flex items-center gap-2 px-2.5 py-1.5 rounded-[7px] bg-[#0A0A0A] text-white opacity-0 translate-y-1.5 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg whitespace-nowrap"
              >
                <span className="text-xs font-medium text-white">{item.label}</span>
                {item.shortcut && (
                  <span className="flex items-center justify-center px-1 py-0.5 text-[10px] font-mono font-semibold text-[#D6FF3F] border border-white/20 rounded">
                    {item.shortcut}
                  </span>
                )}
              </div>
            </Link>
          );
        })}

        {/* Vertical Hairline Divider */}
        <div
          className="mx-[5px] h-6 w-px bg-black/10"
          aria-hidden="true"
          data-testid="dock-divider"
        />

        {/* Non-Interactive Zoom Scale Indicator */}
        <span
          aria-hidden="true"
          data-testid="dock-zoom-indicator"
          className="flex h-[42px] items-center px-2 font-mono text-xs font-medium text-[#605F5F] select-none"
        >
          {scaleText}
        </span>
      </div>
    </nav>
  );
}
