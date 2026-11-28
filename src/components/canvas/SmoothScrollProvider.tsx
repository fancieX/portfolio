"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis, { type ScrollToOptions } from "lenis";

export interface SmoothScrollContextValue {
  /** Scroll smoothly via active Lenis instance, falling back to native window.scrollTo */
  scrollTo: (target: number | string | HTMLElement, options?: ScrollToOptions) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * SmoothScrollProvider
 *
 * Global Lenis inertial smooth scrolling wrapper aligned with Snapline
 * canvas motion aesthetics. Automatically disables smooth-wheel physics when
 * `prefers-reduced-motion: reduce` is enabled and resets scroll position on route switches.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      autoRaf: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll offset immediately across spatial view transitions
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  const scrollTo = useCallback(
    (target: number | string | HTMLElement, options?: ScrollToOptions) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
        return;
      }

      if (typeof window !== "undefined" && typeof target === "number") {
        window.scrollTo({
          top: target,
          behavior: options?.immediate ? "auto" : "smooth",
        });
      }
    },
    []
  );

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

/**
 * Access global Lenis smooth scrolling utilities cleanly inside Client Components.
 */
export function useSmoothScroll(): SmoothScrollContextValue {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) {
    return {
      scrollTo: (target, options) => {
        if (typeof window !== "undefined" && typeof target === "number") {
          window.scrollTo({
            top: target,
            behavior: options?.immediate ? "auto" : "smooth",
          });
        }
      },
    };
  }
  return ctx;
}

export default SmoothScrollProvider;
