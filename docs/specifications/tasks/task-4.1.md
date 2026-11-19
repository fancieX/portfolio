# Task Specification: Task 4.1 — Persistent Top Header with Brand Mark & Contact CTA

**Task ID:** `4.1`  
**Milestone:** `M4 — Canvas & Navigation Architecture`  
**Task Branch:** `task/4.1-top-header`  
**Target Integration Branch:** `stage-1`  
**Implementation Plan Link:** [implementation-plan.md (Task 4.1)](file:///d:/portfolio/docs/implementation-plan.md#L466)  
**Status:** IMPLEMENTED  

---

## 1. Task Overview
Task 4.1 implements the persistent top header component (`Header.tsx`) for the Snapline developer portfolio. Positioned persistently at the top of the viewport above the `#E6E6E3` canvas, the header provides the universal top navigation anchor across all 19 application routes. It features two primary slots: the brand mark `"Maya."` on the far left, and the primary call-to-action `"Get in touch"` on the far right.

---

## 2. Objective
Create a lightweight, reusable, and responsive navigation header (`Header.tsx`) matching the Snapline reference design (`https://snapline.framer.website/`), integrating it into the root application shell (`layout.tsx`), and removing the temporary inline header placeholder from `src/app/page.tsx` with zero visual regressions.

---

## 3. Scope
- Author `src/components/navigation/Header.tsx` as a semantic `<header>` component.
- Export `Header` from `src/components/navigation/index.ts`.
- Integrate `Header` at the top of page artboard containers (`ArtboardContainer.tsx`), matching the reference site structure.
- Left slot: `Maya.` brand mark linking to the root path (`/`).
- Right slot: `Get in touch` call-to-action button linking to `/contact`, utilizing the existing `Button` primitive (`variant="primary" size="sm"`).
- Pure transparent background (`bg-transparent`) with ZERO glassmorphism, ZERO blur, and ZERO borders, inheriting the clean white `#FFFFFF` artboard surface.
- Clean layout matching exact Desktop (1440px), Tablet (768px), and Mobile (390px) responsive padding schedules.
- Remove the inline temporary header placeholder from `src/app/page.tsx`.

---

## 4. Out-of-Scope Features
- **Bottom Navigation Dock:** Handled in Task 4.2 (`FloatingDock.tsx`).
- **Canvas Camera Pan Transitions:** Handled in Task 4.3 (`CanvasProvider.tsx`).
- **Lisbon Clock & Footer:** Handled in Task 4.4 (`GlobalFooter.tsx`).
- **Mobile Hamburger Drawer:** Explicitly non-existent on the reference website; primary route navigation is handled universally by the floating bottom dock across all viewports.

---

## 5. Reference Website & Screenshots
- **Live Reference Target:** [https://snapline.framer.website/](https://snapline.framer.website/)
- **Desktop Reference Screenshot:** [home-desktop-nav-extracted.png](file:///d:/portfolio/docs/research/snapline/screenshots/desktop/home-desktop-nav-extracted.png)
- **Desktop Initial Screenshot:** [home-desktop-initial.png](file:///d:/portfolio/docs/research/snapline/screenshots/desktop/home-desktop-initial.png)
- **Contact Desktop Screenshot:** [contact-desktop-initial.png](file:///d:/portfolio/docs/research/snapline/screenshots/desktop/contact-desktop-initial.png)
- **Mobile Viewport Screenshot:** [home-mobile-390px.png](file:///d:/portfolio/docs/research/snapline/screenshots/mobile/home-mobile-390px.png)
- **Research Analysis:** [PAGE_TOPOLOGY.md (Section 2)](file:///d:/portfolio/docs/research/snapline/PAGE_TOPOLOGY.md) & [responsive-analysis.md (Section 2)](file:///d:/portfolio/docs/research/snapline/responsive-analysis.md)

---

## 6. Component Hierarchy
```
Page (src/app/page.tsx)
└── ArtboardContainer (src/components/primitives/ArtboardContainer.tsx)
    ├── Header (src/components/navigation/Header.tsx) [NEW]
    │   └── <header className="w-full bg-transparent ...">
    │       └── <div className="flex h-14 w-full items-center justify-between">
    │           ├── Brand Link (<Link href="/">)
    │           │   └── <span className="font-heading font-bold text-lg ...">Maya.</span>
    │           └── CTA Slot
    │               └── Button (<Button variant="primary" size="sm" href="/contact">)
    │                   └── "Get in touch"
    ├── AvailabilityBadge ("Booking projects for January")
    ├── Hero Content (Headline, Bio, Action Buttons)
    └── Hero Portrait with FigmaSelectionOverlay
```

---

## 7. Detailed Visual Specifications

| Property | Measured / Target Value | Evidence Classification | Token / Source Reference |
| :--- | :--- | :--- | :--- |
| **Header Height** | `56px` (`3.5rem` / `h-14`) | Measured Value | `PAGE_TOPOLOGY.md` Section 2 |
| **Max Container Width** | `100%` of parent artboard (`1200px`) | Measured Value | `design-tokens.json` (layout.container) |
| **Z-Index** | `relative` / `z-[400]` | Verified Observation | `PAGE_TOPOLOGY.md` Stacking Order |
| **Brand Mark Font** | `Inter Bold` / `Geist` (`font-heading font-bold`) | Verified Observation | `design-tokens.json` |
| **Brand Mark Size** | `18px` (`text-lg`, `leading-none`) | Measured Value | Computed styles |
| **Brand Mark Color** | `#0A0A0A` (`text-text-primary`) | Measured Value | `design-tokens.json` |
| **Brand Mark Tracking** | `-0.02em` (`tracking-tight`) | Calibrated Approximation | Visual inspection |
| **CTA Button Variant** | Primary black pill (`variant="primary"`) | Verified Observation | `home-desktop-nav-extracted.png` |
| **CTA Button Height** | `36px` (`size="sm"`, `h-9`) | Measured Value | `Button.tsx` token scale |
| **CTA Background** | `#0A0A0A` (`bg-[#0A0A0A]`) | Measured Value | `design-tokens.json` |
| **CTA Text Color** | `#FFFFFF` (`text-white`) | Measured Value | `design-tokens.json` |
| **CTA Border Radius** | `9999px` (`rounded-full`) | Measured Value | `design-tokens.json` |
| **Background Fill** | `transparent` (`bg-transparent`) | Verified Observation | Reference screenshots (No glassmorphism) |
| **Backdrop Filter** | `none` (Zero blur, zero glassmorphism) | Verified Observation | Reference screenshots (No blur) |
| **Border Bottom** | `none` (Zero border) | Verified Observation | Reference screenshots |

---

## 8. Layout & Positioning Specifications
- **Positioning:** `sticky top-0` (or `fixed top-0 left-0 right-0`) with `z-index: 400`. Sticky positioning provides natural document flow while ensuring the header remains permanently visible when scrolling long case studies or editorial articles.
- **Flex Alignment:** `flex items-center justify-between`.
- **Inner Wrapper:** `w-full max-w-[1200px] mx-auto` centering the navigation content within the global grid alignment.
- **Padding Schedule:**
  - Desktop (≥1200px): `px-8` (or `px-12` matching main canvas)
  - Tablet (≥768px): `px-6`
  - Mobile (<768px): `px-4`

---

## 9. Typography Specifications
- **Brand Text:**
  - Content: `"Maya."`
  - Font Family: `var(--font-heading)` (`Inter`, sans-serif)
  - Weight: `700` (`font-bold`)
  - Size: `18px` (`text-lg`)
  - Tracking: `-0.02em` (`tracking-tight`)
  - Color: `#0A0A0A` (`text-[#0A0A0A]`)
- **CTA Button Text:**
  - Content: `"Get in touch"`
  - Font Family: `var(--font-sans)` (`Geist`, sans-serif)
  - Weight: `600` (`font-semibold`)
  - Size: `13px` (`text-xs`)
  - Color: `#FFFFFF` (`text-white`)

---

## 10. Colour & Styling Specifications
- **Canvas Base Tone:** `#E6E6E3`
- **Header Background:** `rgba(230, 230, 227, 0.85)` (`bg-[#E6E6E3]/85`)
- **Brand Hover:** Text tone transitions to `#3A3A3A` on hover (`hover:opacity-80 transition-opacity`).
- **CTA Hover:** Button transitions from `#0A0A0A` to `#202020` with active scale compression `scale(0.98)` (handled by `Button.tsx`).
- **Focus Ring:** `focus-visible:ring-2 focus-visible:ring-[#D6FF3F] focus-visible:ring-offset-2`.

---

## 11. Asset Requirements
- No external image assets or SVGs are required for the top header.
- The brand mark is pure text (`"Maya."`).
- The CTA uses the existing `Button` component from `@/components/primitives`.

---

## 12. Animation Specifications
- **Brand Hover Animation:**
  - Property: `opacity`
  - Duration: `150ms`
  - Timing: `ease-out`
  - States: `opacity: 1.0` (idle) $\rightarrow$ `opacity: 0.8` (hover)
- **CTA Tap / Active Animation:**
  - Handled by `Button.tsx`: `active:scale-[0.98] transition-all duration-150 ease-out`.
- **Scroll Pinning:**
  - Smooth native GPU-composited sticky positioning (`will-change: transform`).

---

## 13. Interaction Specifications
- **Left Brand Click:**
  - Destination: `/` (Homepage)
  - Cursor: `pointer`
  - Keyboard: Tab focusable with visible focus ring.
- **Right CTA Click:**
  - Destination: `/contact` (Contact Page)
  - Cursor: `pointer`
  - Keyboard: Tab focusable with visible focus ring.

---

## 14. Transition Specifications
- Hover transitions utilize `duration-150 ease-out`.
- Page route transitions maintain the sticky header in place without unmounting or flickering across route transitions.

---

## 15. Responsive Behaviour

| Viewport | Container Width | Lateral Padding | Height | Displayed Elements | Navigation Mechanism |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Desktop (1440px)** | `1200px` max | `32px` / `48px` | `56px` | Brand `"Maya."` + `"Get in touch"` button | Top header + Bottom Floating Dock |
| **Tablet (768px)** | `100%` | `24px` | `56px` | Brand `"Maya."` + `"Get in touch"` button | Top header + Bottom Floating Dock |
| **Mobile (390px)** | `100%` | `16px` | `56px` | Brand `"Maya."` + `"Get in touch"` button | Top header + Bottom Floating Dock |

*Crucial Design Decision (Verified):* There is NO hamburger icon, slide-out drawer, or full-screen menu overlay on mobile. The header retains its clean 2-element layout across all screen sizes.

---

## 16. Accessibility Requirements
- Semantic HTML `<header>` tag wrapping navigation bar.
- Semantic `<nav aria-label="Main Navigation">` or semantic landmark.
- Brand logo wrapped in an accessible `<Link href="/" aria-label="Maya Ortiz homepage">`.
- CTA wrapped in `<Button href="/contact" aria-label="Get in touch">`.
- Keyboard accessible via `Tab` key with standard `focus-visible:ring-2 focus-visible:ring-[#D6FF3F]`.
- Text contrast ratio: `#0A0A0A` on `#E6E6E3` = `12.1:1` (exceeds WCAG AAA requirements).
- White text `#FFFFFF` on `#0A0A0A` = `18.5:1` (exceeds WCAG AAA requirements).

---

## 17. Technical Implementation Requirements
- **Component File:** `src/components/navigation/Header.tsx`
- **Export File:** `src/components/navigation/index.ts`
- **Shell Integration:** `src/app/layout.tsx`
- **Props Interface:**
  ```typescript
  export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    /** Custom brand label (defaults to "Maya.") */
    brandLabel?: string;
    /** Custom brand link destination (defaults to "/") */
    brandHref?: string;
    /** Custom CTA label (defaults to "Get in touch") */
    ctaLabel?: string;
    /** Custom CTA destination (defaults to "/contact") */
    ctaHref?: string;
    /** Optional extra actions or availability badge to render alongside CTA */
    children?: React.ReactNode;
  }
  ```
- **SSR Compatibility:** Fully functional as a React Server Component or client component without Hydration mismatches.

---

## 18. Dependencies
- **Task 3.4:** `Button.tsx` primitive (available at `src/components/primitives/Button.tsx`).
- **Task 2.4:** `headerNav` dataset in `src/data/navigation.ts`.
- **Next.js:** `next/link` for client-side routing.

---

## 19. Edge Cases
- **Mobile Viewport (320px–390px):** Ensure brand name and CTA button never collide or wrap onto two lines. At 56px height, `"Maya."` (approx 55px wide) and `"Get in touch"` (approx 105px wide) consume ~160px total, comfortably fitting inside 320px with 32px lateral padding.
- **Page Scroll Collision:** Header backdrop blur and subtle background tint prevent text overlap when high-contrast content scrolls beneath.
- **Deep Routing:** Clicking the brand logo from a nested route (e.g. `/work/orbit` or `/journal/constraints`) seamlessly returns to `/`.

---

## 20. Detailed Acceptance Criteria
- [ ] `Header.tsx` is implemented under `src/components/navigation/Header.tsx`.
- [ ] `Header` is exported from `src/components/navigation/index.ts`.
- [ ] `Header` is integrated into `src/app/layout.tsx` above page content.
- [ ] Left slot renders `"Maya."` linking to `/`.
- [ ] Right slot renders `"Get in touch"` linking to `/contact` using `Button` primitive.
- [ ] Height measures exactly `56px` (`h-14`) with vertical centering.
- [ ] Layout is responsive across Desktop (`px-8`), Tablet (`px-6`), and Mobile (`px-4`).
- [ ] No hamburger menu exists across any breakpoint.
- [ ] Temporary header placeholder in `src/app/page.tsx` is cleanly removed without regressions.
- [ ] `npx tsc --noEmit` exits with status code 0.
- [ ] `npm run lint` exits with status code 0.
- [ ] `npm run build` compiles with Turbopack with status code 0.

---

## 21. Testing Requirements
- **Typecheck:** `npx tsc --noEmit`
- **Lint Check:** `npm run lint`
- **Build Validation:** `npm run build`
- **Runtime Dev Server Test:** Start `npm run dev` and test `localhost:3000` to verify:
  1. Header presence at top of viewport.
  2. Brand link directs to `/`.
  3. CTA button directs to `/contact`.
  4. Behavior across 1440px, 768px, and 390px viewport widths.
