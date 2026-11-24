# Task 4.3: 2D Canvas Camera, Pan/Zoom & Page Transitions

## 1. Task Overview
Task 4.3 implements the signature spatial 2D canvas camera navigation and page transition engine for the Snapline developer portfolio. In the Snapline reference topology, pages do not simply disappear or reload; the entire viewport acts as an infinite Figma-style canvas where individual pages exist as discrete artboard cards on a repeating dot-grid plane (`#E6E6E3` with `#C3C3BF` 22px radial dots). Navigating between routes triggers an artboard zoom-out (`scale(0.44)`), a 2D spatial pan across the canvas, and a zoom-in (`scale(1)`) into the target artboard over `1.46s`.

---

## 2. Objective
Architect and implement `CanvasProvider.tsx` and the `useCanvasPan.ts` hook, configuring native hardware-accelerated View Transitions and 2D canvas coordinates that synchronize with Next.js client-side routing, browser history (`popstate`), and keyboard hotkeys, while strictly eliminating scrollbars and supporting `prefers-reduced-motion`.

---

## 3. Scope
- **Canvas State Engine (`CanvasProvider.tsx`):**
  - Context provider managing current artboard coordinates, active route, and transition states (`isPanning`).
  - Spatial coordinates mapped to all 19 application routes (Home, Work, About, Journal, Contact, Legal, Projects, Articles, 404).
  - Native `document.startViewTransition` integration with fallback for unsupported environments.
  - Browser history synchronization (`popstate` and `usePathname`).
- **Hook Abstraction (`useCanvasPan.ts`):**
  - Exposes `panTo(href: string)`, `currentRoute`, `isPanning`, and `camera` coordinates.
- **View Transition Stylesheet (`src/styles/globals.css`):**
  - Full implementation of Snapline's exact `::view-transition` CSS rules.
  - Keyframes `snp-out` and `snp-in` with cubic-bezier easing curves.
  - Responsive media query adaptation for mobile (`max-width: 699px`).
  - Reduced-motion query guard (`prefers-reduced-motion: no-preference`).
- **Root Layout Integration (`src/app/layout.tsx`):**
  - Wrap root layout children with `<CanvasProvider>`.
- **Navigation Dock & Header Integration:**
  - Update `FloatingDock.tsx` and `Header.tsx` to leverage `useCanvasPan().panTo` for seamless animated transitions.

---

## 4. Out-of-Scope Features
- **Simulated Multiplayer Cursors:** Handled in Milestone 5 Task 5.3 (`MultiplayerCursors.tsx`).
- **Lisbon Live Footer Clock:** Handled in Task 4.4 (`GlobalFooter.tsx`).
- **Interactive Polaroid Photo Dragging on `/404`:** Handled in Milestone 11 Task 11.1.

---

## 5. Reference Website & Screenshots
- **Reference Target:** `https://snapline.framer.website/`
- **Transition Evidence:** [canvas-transition-home-to-work.png](file:///d:/portfolio/docs/research/snapline/screenshots/interactions/canvas-transition-home-to-work.png)
- **DOM Research Evidence:** Extracted Framer keyframe definitions in `snapline_home.html` (lines 526657–527730).

---

## 6. Component Hierarchy
```text
RootLayout (src/app/layout.tsx)
└── <CanvasProvider>
    ├── <DotGridBackground position="fixed" />
    ├── <Header /> (navigates via useCanvasPan)
    ├── <main className="relative z-10 w-full overflow-x-hidden">
    │   └── {children} (Active Page Artboard Card)
    └── <FloatingDock /> (navigates via useCanvasPan)
```

---

## 7. Detailed Visual Specifications

| Property | Measured / Target Value | Evidence Classification | Token / Source Reference |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#E6E6E3` with `#C3C3BF` 22px radial dots | Measured Value | `design-tokens.json` & `globals.css` |
| **Transition Duration**| `1.46s` (`1460ms`) | Measured Value | Verified from Framer CSS (`animation-duration: 1.46s`) |
| **Zoom-Out Scale** | `scale(0.44)` (Desktop/Tablet), `scale(0.60)` (Mobile) | Measured Value | Verified from Framer `@keyframes snp-out` |
| **Artboard Card Radius**| `34px` during flight | Measured Value | Verified from Framer `@keyframes snp-out` (`border-radius: 34px`) |
| **Flight Box Shadow** | `0 60px 140px -40px rgba(0,0,0,.28), 0 0 0 1px rgba(0,0,0,.06)` | Measured Value | Verified from Framer `::view-transition-old(root)` |
| **Desktop Pan Travel** | `translateX(-51vw)` (exit) / `translateX(51vw)` (entry) | Measured Value | Verified from Framer `@keyframes snp-out/snp-in` |
| **Mobile Pan Travel** | `translateX(calc(-60vw - 48px))` (exit) | Measured Value | Verified from Framer `@media (max-width: 699px)` |

---

## 8. Layout & Positioning Specifications
- **Canvas Wrapper:** Outer viewport wrapper enforces `overflow-x: hidden; width: 100%; min-height: 100vh; position: relative;`.
- **View Transition Isolation:** `::view-transition-image-pair(root) { isolation: auto; }`.
- **Z-Index Layering:**
  - `::view-transition`: Viewport layer
  - Floating dock: `z-index: 1000` (remains pinned and stable above transition)
  - Top header: `z-index: 400`
  - Artboard content: `z-index: 100-200`

---

## 9. Typography Specifications
- During transition, typography scales proportionately with the artboard matrix transform. Text font-family remains `Geist` and `Inter` throughout.

---

## 10. Colour & Styling Specifications
- **Canvas Plane:** `#E6E6E3`
- **Dot Grid Tone:** `#C3C3BF`
- **Flight Elevation Shadow:** `0 60px 140px -40px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.06)`
- **Artboard Flight Corner Radius:** `34px`

---

## 11. Asset Requirements
- No external binary assets required; utilizes native browser View Transitions API and GPU compositor acceleration.

---

## 12. Animation Specifications

### Exit Keyframes (`snp-out`)
```css
@keyframes snp-out {
  0% { transform: none; border-radius: 0; animation-timing-function: cubic-bezier(.87, 0, .13, 1); }
  38% { transform: translateX(-6vw) scale(0.44); border-radius: 34px; animation-timing-function: cubic-bezier(.65, 0, .35, 1); }
  67%, 100% { transform: translateX(-51vw) scale(0.44); border-radius: 34px; }
}
```

### Entry Keyframes (`snp-in`)
```css
@keyframes snp-in {
  0%, 19% { transform: translateX(51vw) scale(0.44); border-radius: 34px; opacity: 0; }
  36% { transform: translateX(47vw) scale(0.44); opacity: 1; animation-timing-function: cubic-bezier(.65, 0, .35, 1); }
  59% { transform: translateX(1.5vw) scale(0.44); border-radius: 34px; animation-timing-function: cubic-bezier(.87, 0, .13, 1); }
  100% { transform: none; border-radius: 0; opacity: 1; }
}
```

### Mobile Keyframes (`@media (max-width: 699px)`)
- Scales to `0.60` with translated horizontal coordinates `calc(60vw + 48px)` and `calc(1.8vw + 1px)`.

---

## 13. Interaction Specifications
- **Route Navigation:** Triggered by clicks on dock items, header brand mark / CTA, or keyboard hotkeys (`H`, `W`, `A`, `J`, `C`).
- **Duplicate Navigation Guard:** If the requested route equals the current `pathname`, transition does not fire.
- **Browser History:** Back and forward button clicks seamlessly transition between canvas coordinates.

---

## 14. Transition Specifications
- **Timing:** 1.46s linear root group with piecewise cubic-bezier easing.
- **Fallback:** If `document.startViewTransition` is unavailable (e.g. older browsers), standard client-side `router.push` executes instantly.

---

## 15. Responsive Behaviour
- **Desktop (>= 1200px):** Full 1.46s pan/zoom animation at `scale(0.44)`.
- **Tablet (768px - 1199px):** Identical `scale(0.44)` pan/zoom animation.
- **Mobile (< 700px):** Calibrated `scale(0.60)` with increased margin padding.

---

## 16. Accessibility Requirements
- `@media (prefers-reduced-motion: no-preference)` wraps all view transition animations.
- When `prefers-reduced-motion: reduce` is enabled, zero zooming or panning occurs.

---

## 17. Technical Implementation Requirements
- Use React Context in `src/components/canvas/CanvasProvider.tsx`.
- Create custom hook `src/hooks/useCanvasPan.ts`.
- Ensure strict TypeScript types with zero `any`.
- Safeguard against SSR mismatch with `'use client'`.

---

## 18. Dependencies
- Next.js `next/navigation` (`usePathname`, `useRouter`).
- React 19 / Next.js 16 native client components.

---

## 19. Edge Cases
- Rapid successive clicking: guarded by `isPanning` lock to avoid overlapping view transitions.
- External links (e.g. LinkedIn, Dribbble): bypassed by `isExternal` checks.
- View Transitions API unsupported: graceful zero-error fallback to `router.push`.

---

## 20. Detailed Acceptance Criteria
- [ ] `CanvasProvider.tsx` implemented and exported from `src/components/canvas/`.
- [ ] `useCanvasPan.ts` hook created in `src/hooks/`.
- [ ] Exact Snapline 1.46s `::view-transition` CSS rules and keyframes (`snp-out`, `snp-in`) added to `src/styles/globals.css`.
- [ ] Mobile breakpoint rules (`@media (max-width: 699px)`) calibrated to `scale(0.60)`.
- [ ] Reduced motion guarded via `@media (prefers-reduced-motion: no-preference)`.
- [ ] Root layout wraps application with `<CanvasProvider>`.
- [ ] `FloatingDock.tsx` and `Header.tsx` trigger `panTo()` on route changes.
- [ ] Zero unwanted horizontal scrollbars appear during transition (`overflow-x: hidden`).
- [ ] `npx tsc --noEmit` exits with status code 0.
- [ ] `npm run lint` exits with status code 0.
- [ ] `npm run build` compiles with Turbopack with status code 0.

---

## 21. Testing Requirements
- **Typecheck:** `npx tsc --noEmit`
- **Lint Check:** `npm run lint`
- **Build Validation:** `npm run build`
- **Runtime Dev Server Test:** Start `npm run dev` and test `localhost:3000`:
  1. Click dock items to verify 1.46s canvas zoom-out, pan, and zoom-in.
  2. Test keyboard hotkeys `H`, `W`, `A`, `J`, `C`.
  3. Verify back/forward browser history.
  4. Inspect viewport bounds at 1440px and 390px.
