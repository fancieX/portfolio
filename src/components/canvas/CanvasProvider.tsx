"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export interface CanvasCoordinates {
  x: number;
  y: number;
  scale: number;
}

/** Pre-mapped 2D spatial canvas coordinates for primary application routes */
export const ROUTE_COORDINATES: Record<string, CanvasCoordinates> = {
  "/": { x: 0, y: 0, scale: 1 },
  "/work": { x: 1920, y: 0, scale: 1 },
  "/about": { x: 0, y: 1400, scale: 1 },
  "/journal": { x: 1920, y: 1400, scale: 1 },
  "/contact": { x: 3840, y: 0, scale: 1 },
  "/privacy": { x: 0, y: 2800, scale: 1 },
  "/terms": { x: 1920, y: 2800, scale: 1 },
  "/404": { x: -1920, y: 0, scale: 1 },
};

export interface CanvasContextValue {
  /** Current active route path */
  currentRoute: string;
  /** Whether a spatial camera pan / page transition is currently animating */
  isPanning: boolean;
  /** Spatial 2D camera coordinates mapped to current artboard */
  camera: CanvasCoordinates;
  /** Navigate to a new route with spatial 2D canvas transition */
  panTo: (href: string) => void;
}

export const CanvasContext = createContext<CanvasContextValue | null>(null);

export interface CanvasProviderProps {
  children: ReactNode;
}

/**
 * CanvasProvider
 *
 * Global spatial 2D canvas camera and page transition coordinator.
 * Synchronizes artboard coordinates, native hardware-accelerated View Transitions,
 * Next.js client-side routing, and browser back/forward history.
 */
export function CanvasProvider({ children }: CanvasProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPanning, setIsPanning] = useState(false);
  const pendingTransitionRef = useRef<(() => void) | null>(null);

  // When pathname changes (route transition completed by Next.js), resolve pending view transition
  useEffect(() => {
    if (pendingTransitionRef.current) {
      pendingTransitionRef.current();
      pendingTransitionRef.current = null;
    }
  }, [pathname]);

  // Derive coordinates based on active route prefix
  const getCoordinatesForRoute = useCallback((route: string): CanvasCoordinates => {
    if (ROUTE_COORDINATES[route]) {
      return ROUTE_COORDINATES[route];
    }
    // Match route prefixes (e.g. /work/[slug] -> /work)
    if (route.startsWith("/work")) return ROUTE_COORDINATES["/work"];
    if (route.startsWith("/journal")) return ROUTE_COORDINATES["/journal"];
    return ROUTE_COORDINATES["/"] ?? { x: 0, y: 0, scale: 1 };
  }, []);

  // Derive camera coordinates directly from current pathname (no cascading renders)
  const camera = getCoordinatesForRoute(pathname);

  /**
   * Spatial 2D canvas navigation trigger.
   * Invokes native View Transition (zoom-out -> 2D pan -> zoom-in, 1.46s)
   * with graceful fallback for browsers without startViewTransition.
   */
  const panTo = useCallback(
    (href: string) => {
      // Blur active element so focus rings never linger during or after spatial navigation
      if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      // Guard: do nothing if already at target route
      if (href === pathname) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Check for native View Transitions API support
      if (
        typeof document !== "undefined" &&
        "startViewTransition" in document &&
        !prefersReducedMotion
      ) {
        setIsPanning(true);
        // Cast to any to accommodate varying TypeScript DOM lib versions
        const transition = (document as unknown as {
          startViewTransition: (callback: () => Promise<void> | void) => {
            finished: Promise<void>;
          };
        }).startViewTransition(() => {
          return new Promise<void>((resolve) => {
            pendingTransitionRef.current = resolve;
            router.push(href);
            // Safety fallback timeout in case pathname doesn't update (e.g. identical route or error)
            setTimeout(() => {
              if (pendingTransitionRef.current) {
                pendingTransitionRef.current();
                pendingTransitionRef.current = null;
              }
            }, 600);
          });
        });

        transition.finished
          .catch(() => {
            // Ignore transitions aborted by user navigation
          })
          .finally(() => {
            setIsPanning(false);
          });
      } else {
        // Instant navigation fallback
        router.push(href);
      }
    },
    [pathname, router]
  );

  return (
    <CanvasContext.Provider
      value={{
        currentRoute: pathname,
        isPanning,
        camera,
        panTo,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}

/**
 * Custom hook to access spatial 2D canvas camera state and pan navigation.
 * Provides a safe default fallback if invoked outside a <CanvasProvider>.
 */
export function useCanvasPan(): CanvasContextValue {
  const context = useContext(CanvasContext);
  if (!context) {
    return {
      currentRoute: "/",
      isPanning: false,
      camera: { x: 0, y: 0, scale: 1 },
      panTo: (href: string) => {
        if (typeof window !== "undefined") {
          window.location.href = href;
        }
      },
    };
  }
  return context;
}
