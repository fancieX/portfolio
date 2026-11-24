# Task Specification: Task 4.2 — Universal Floating Bottom Dock Navigation

**Task ID:** `4.2`  
**Milestone:** `M4 — Canvas & Navigation Architecture`  
**Task Branch:** `task/4.2-floating-dock`  
**Target Integration Branch:** `stage-1`  
**Implementation Plan Link:** [implementation-plan.md (Task 4.2)](file:///d:/portfolio/docs/implementation-plan.md#L491)  
**Status:** IMPLEMENTED  

---

## 1. Task Overview
Task 4.2 implements the signature universal floating bottom navigation dock (`FloatingDock.tsx`) for the Snapline developer portfolio. Pinned permanently to the bottom center of the viewport at `z-index: 1000`, the dock acts as the primary navigation engine across all 19 application routes and all device form factors (Desktop, Tablet, Mobile). It embodies the Figma canvas toolbar aesthetic, featuring glassmorphism (`backdrop-filter: blur(12px)`), 5 core route triggers (`Home`, `Work`, `About`, `Journal`, `Contact`), a `100%` canvas zoom indicator, animated active pill indicator with signature neon lime icon highlights (`#D6FF3F`), and global keyboard shortcuts.

---

## 2. Objective
Build an accessible, high-performance, glassmorphic floating navigation dock (`FloatingDock.tsx`) matching the Snapline reference design (`https://snapline.framer.website/`), integrating it into the root application shell (`layout.tsx`), and supporting route synchronization, spring animations, and keyboard navigation.

---

## 3. Scope
- Author `src/components/navigation/FloatingDock.tsx` as a Client Component (`"use client"`).
- Export `FloatingDock` from `src/components/navigation/index.ts`.
- Integrate `FloatingDock` into `src/app/layout.tsx` to ensure persistent presence across all routes.
- Render 5 route triggers with corresponding SVG icons from `public/icons/`:
  1. `cursor`: Home (`/`)
  2. `frame`: Work (`/work`)
  3. `user`: About (`/about`)
  4. `text`: Journal (`/journal`)
  5. `comment`: Contact (`/contact`)
- Render non-interactive `100%` zoom badge on the right, separated by a vertical hairline divider.
- Active route highlighting: An animated dark pill container (`#0A0A0A`, `border-radius: 11px`, matching the exact Framer concentric geometry `rounded-[11px]`) smoothly moves behind the active icon with hardware-accelerated transition.
- Active icon tone: Neon lime (`#D6FF3F`).
- Inactive icon tone: Muted gray (`#666666`), highlighting with subtle background tint on hover.
- Keyboard navigation: Global keyboard shortcuts (`H` for Home, `W` for Work, `A` for About, `J` for Journal, `C` for Contact; plus Figma aliases `V`, `#`, `T`) when focus is outside form inputs (`INPUT`, `TEXTAREA`, `SELECT`).
- Mobile safe-area inset support: `calc(16px + env(safe-area-inset-bottom, 0px))`.

---

## 4. Out-of-Scope Features
- **Canvas Camera Pan & Zoom Transitions:** Handled in Task 4.3 (`CanvasProvider.tsx`).
- **Global Footer & Lisbon Time Clock:** Handled in Task 4.4 (`GlobalFooter.tsx`).
- **Top Header:** Handled and completed in Task 4.1 (`Header.tsx`).

---

## 5. Reference Website & Screenshots
- **Live Reference Target:** [https://snapline.framer.website/](https://snapline.framer.website/)
- **Extracted Nav Reference Screenshot:** [home-desktop-nav-extracted.png](file:///d:/portfolio/docs/research/snapline/screenshots/desktop/home-desktop-nav-extracted.png)
- **Mobile Viewport Screenshot:** [home-mobile-390px.png](file:///d:/portfolio/docs/research/snapline/screenshots/mobile/home-mobile-390px.png)
- **Research Analysis:** [PAGE_TOPOLOGY.md (Section 2)](file:///d:/portfolio/docs/research/snapline/PAGE_TOPOLOGY.md), [interaction-matrix.md (Interaction 1 & 7)](file:///d:/portfolio/docs/research/snapline/interaction-matrix.md), [design-tokens.json (dock tokens)](file:///d:/portfolio/docs/research/snapline/design-tokens.json).

---

## 6. Component Hierarchy
```
RootLayout (src/app/layout.tsx)
├── DotGridBackground
├── <div id="canvas-root">
│   └── Header & Page Content
└── FloatingDock (src/components/navigation/FloatingDock.tsx) [NEW]
    └── <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] ...">
        └── <div className="flex items-center gap-1 h-[52px] px-2 py-1.5 rounded-2xl bg-white/85 backdrop-blur-md border shadow-dock">
            ├── DockItem (Home /)
            │   ├── motion.div (active background pill #0A0A0A)
            │   └── CursorIcon (currentColor: #D6FF3F when active, #666666 when inactive)
            ├── DockItem (Work /work)
            ├── DockItem (About /about)
            ├── DockItem (Journal /journal)
            ├── DockItem (Contact /contact)
            ├── Vertical Divider (<div className="w-px h-5 bg-black/[0.08]" />)
            └── Zoom Status Badge (<span className="px-2 font-mono text-xs text-[#666666]">100%</span>)
```

---

## 7. Detailed Visual Specifications

| Property | Measured / Target Value | Evidence Classification | Token / Source Reference |
| :--- | :--- | :--- | :--- |
| **Dock Width** | `~280px` (`w-auto min-w-[270px] max-w-[290px]`) | Measured Value | `design-tokens.json` (dock.width) |
| **Dock Height** | `54px` (`h-[54px]`) | Measured Value | Verified from Framer DOM (`42px item + 2 × 6px padding`) |
| **Border Radius** | `16px` (`rounded-[16px]`) | Measured Value | Verified from Framer DOM (`border-radius: 16px`) |
| **Dock Padding** | `6px` (`p-[6px]`) | Measured Value | Verified from Framer DOM (`padding: 6px`) |
| **Dock Item Gap** | `3px` (`gap-[3px]`) | Measured Value | Verified from Framer DOM (`gap: 3px`) |
| **Dock Background** | `rgba(255, 255, 255, 0.92)` | Measured Value | Verified from Framer DOM (`rgba(255, 255, 255, 0.92)`) |
| **Backdrop Filter** | `blur(14px)` (`backdrop-blur-[14px]`) | Measured Value | Verified from Framer DOM (`backdrop-filter: blur(14px)`) |
| **Border** | `1px solid rgba(10, 10, 10, 0.1)` | Measured Value | Verified from Framer DOM (`--token-SDgZ8Hvxt`) |
| **Box Shadow** | `0px 14px 36px -16px rgba(0, 0, 0, 0.38)` | Measured Value | Verified from Framer DOM (`box-shadow`) |
| **Z-Index** | `1000` (`z-[1000]`) | Verified Observation | `PAGE_TOPOLOGY.md` Stacking Order |
| **Desktop Bottom Offset** | `24px` (`bottom-6`) | Measured Value | `design-tokens.json` (dock.bottomOffsetDesktop) |
| **Mobile Bottom Offset** | `16px` (`bottom-4` + safe-area) | Measured Value | `design-tokens.json` (dock.bottomOffsetMobile) |
| **Active Pill Background**| `#0A0A0A` (`bg-[#0A0A0A]`) | Measured Value | Verified from Framer DOM (`var(--token-pipoqxArs)`) |
| **Active Pill Radius** | `11px` (`rounded-[11px]`) | Measured Value | Verified from Framer DOM (`border-radius: 11px`, concentric geometry) |
| **Active Icon Color** | `#D6FF3F` (neon lime) | Measured Value | Verified from Framer DOM (`var(--token-thek6W29K)`) |
| **Inactive Icon Color** | `#3A3A3A` (dark gray) | Measured Value | Verified from Framer DOM (`var(--token-bXTCBW8oJ)`) |
| **Hover Background** | `rgba(0, 0, 0, 0.05)` | Calibrated Approximation | Visual inspection |
| **Divider Dimensions** | `1px wide × 24px high`, `rgba(10, 10, 10, 0.1)` | Measured Value | Verified from Framer DOM (`.framer-xk8v9o`) |
| **Zoom Indicator Font** | `font-mono text-xs text-[#605F5F]` | Measured Value | Verified from Framer DOM (`var(--token-xMAbJWAhJ)`) |

---

## 8. Layout & Positioning Specifications
- **Positioning:** Fixed at bottom center of viewport: `fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] max-sm:bottom-[calc(16px+env(safe-area-inset-bottom,0px))]`.
- **Flex Container:** `relative flex h-[54px] items-center gap-[3px] rounded-[16px] border border-black/10 bg-white/90 p-[6px] shadow-[0px_14px_36px_-16px_rgba(0,0,0,0.38)] backdrop-blur-[14px]`.
- **Item Bounding Box:** Each navigation trigger has an exact touch/click target of `42px × 42px` (`w-[42px] h-[42px]`) with `border-radius: 11px` (`rounded-[11px]`).
- **Icon Sizing:** Icons render at `19px × 19px` (`w-[19px] h-[19px]`) within a 24×24 SVG viewport, centered within the 42px trigger box.

---

## 9. Typography Specifications
- **Zoom Badge Text:**
  - Content: `"100%"`
  - Font Family: `var(--font-mono)` (`Geist Mono`, monospace)
  - Size: `12px` (`text-xs`)
  - Weight: `500` (`font-medium`)
  - Color: `#666666`
  - Alignment: Centered, non-interactive.

---

## 10. Colour & Styling Specifications
- **Active Trigger Background:** `#0A0A0A` solid dark pill container.
- **Active Trigger Icon:** `#D6FF3F` (neon lime).
- **Inactive Trigger Icon:** `#666666`.
- **Inactive Hover Fill:** `rgba(10, 10, 10, 0.06)` with smooth 150ms transition.
- **Focus Rings:** `focus-visible:ring-2 focus-visible:ring-[#D6FF3F] focus-visible:ring-offset-2`.

---

## 11. Asset Requirements
- Utilizes the 5 verified SVG icon assets from `public/icons/`:
  - `cursor.svg`: Home
  - `frame.svg`: Work
  - `user.svg`: About
  - `text.svg`: Journal
  - `comment.svg`: Contact
- All SVGs use `currentColor` to dynamically reflect active (`#D6FF3F`) and inactive (`#666666`) states.

---

## 12. Animation Specifications
- **Active Indicator Motion:**
  - Component: Framer Motion `<motion.div layoutId="activeDockIndicator" />`
  - Spring Curve: `stiffness: 380, damping: 30, mass: 1`
  - Micro-motion: Moving between routes causes the solid `#0A0A0A` pill container to fluidly glide across the dock to the new active item.
- **Icon Hover Animation:**
  - Transition: `transition-colors duration-150 ease-out`
  - Active Tap Compression: `active:scale-95 transition-transform duration-100`.

---

## 13. Interaction Specifications
- **Route Matching:**
  - Home: `pathname === "/"`
  - Work: `pathname.startsWith("/work")`
  - About: `pathname.startsWith("/about")`
  - Journal: `pathname.startsWith("/journal")`
  - Contact: `pathname.startsWith("/contact")`
- **Click Navigation:**
  - Clicking an item uses Next.js client-side navigation (`Link`).
- **Keyboard Shortcuts:**
  - `h` or `H` (or `v`/`V`): Navigates to `/` (Home)
  - `w` or `W` (or `#`/`Shift+3`): Navigates to `/work` (Work)
  - `a` or `A`: Navigates to `/about` (About)
  - `j` or `J` (or `t`/`T`): Navigates to `/journal` (Journal)
  - `c` or `C`: Navigates to `/contact` (Contact)
  - Listener guard: Ignores keydown events when `e.target` is an `HTMLInputElement`, `HTMLTextAreaElement`, or `HTMLSelectElement`, or when modifiers like `Ctrl`, `Cmd`, or `Alt` are pressed (preserving browser shortcuts like Ctrl+C, Cmd+W).

---

## 14. Transition Specifications
- Framer Motion `layoutId` ensures seamless, frame-perfect layout interpolation during route transitions.

---

## 15. Responsive Behaviour

| Viewport | Bottom Distance | Width | Height | Visible Items | Safe-Area Handling |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Desktop (1440px)** | `24px` (`bottom-6`) | `~280px` | `52px` | 5 icons + divider + `100%` | None needed |
| **Tablet (768px)** | `16px` (`bottom-4`) | `~280px` | `52px` | 5 icons + divider + `100%` | `env(safe-area-inset-bottom)` |
| **Mobile (390px)** | `16px` (`bottom-4`) | `~280px` | `52px` | 5 icons + divider + `100%` | `calc(16px + env(safe-area-inset-bottom))` |

---

## 16. Accessibility Requirements
- Semantic `<nav aria-label="Floating Navigation Dock">`.
- Each item has an explicit `aria-label` (`"Home"`, `"Work"`, `"About"`, `"Journal"`, `"Contact"`).
- Active item marked with `aria-current="page"`.
- Keyboard accessible via `Tab` key with standard `focus-visible:ring-2 focus-visible:ring-[#D6FF3F]`.
- Non-interactive zoom badge marked with `aria-hidden="true"`.

---

## 17. Technical Implementation Requirements
- **Component File:** `src/components/navigation/FloatingDock.tsx`
- **Export File:** `src/components/navigation/index.ts`
- **Shell Integration:** `src/app/layout.tsx`
- **State & Hooks:**
  - `"use client"` directive.
  - Next.js `usePathname()` for active route detection.
  - Next.js `useRouter()` for keyboard shortcut navigation.
  - `useEffect` for keyboard shortcut listeners.
  - Framer Motion `motion.div` for active indicator animation.

---

## 18. Dependencies
- **Task 2.4:** `dockItems` dataset in `src/data/navigation.ts`.
- **Framer Motion:** `motion.div` with `layoutId`.
- **Next.js:** `next/link`, `next/navigation` (`usePathname`, `useRouter`).

---

## 19. Edge Cases
- **Nested Routes:** Clicking on a case study like `/work/orbit` correctly keeps the `Work` icon highlighted.
- **Text Inputs Focus:** Typing "v", "c", or "t" in a contact form input will NOT trigger navigation due to input target guards.
- **Mobile Safe Area:** Devices with home indicator bars (e.g. iPhone) receive bottom safe-area margin to prevent touch collision.

---

## 20. Detailed Acceptance Criteria
- [ ] `FloatingDock.tsx` is implemented under `src/components/navigation/FloatingDock.tsx`.
- [ ] `FloatingDock` is exported from `src/components/navigation/index.ts`.
- [ ] `FloatingDock` is integrated into `src/app/layout.tsx` at the bottom of the body.
- [ ] Displays all 5 navigation icons (`Home`, `Work`, `About`, `Journal`, `Contact`) using local SVGs.
- [ ] Active route displays solid `#0A0A0A` dark pill container with neon lime `#D6FF3F` icon.
- [ ] Active pill smoothly animates between items using Framer Motion `layoutId="activeDockIndicator"`.
- [ ] Inactive icons display `#666666` and highlight on hover.
- [ ] Non-interactive `100%` zoom badge is rendered on the right side of a hairline vertical divider.
- [ ] Global keyboard shortcuts (`H`, `W`, `A`, `J`, `C`) trigger navigation when focus is outside inputs.
- [ ] Dock is fixed at bottom center (`z-index: 1000`) across Desktop, Tablet, and Mobile.
- [ ] `npx tsc --noEmit` exits with status code 0.
- [ ] `npm run lint` exits with status code 0.
- [ ] `npm run build` compiles with Turbopack with status code 0.

---

## 21. Testing Requirements
- **Typecheck:** `npx tsc --noEmit`
- **Lint Check:** `npm run lint`
- **Build Validation:** `npm run build`
- **Runtime Dev Server Test:** Start `npm run dev` and test `localhost:3000`:
  1. Verify floating dock visibility at bottom center.
  2. Verify Home icon is highlighted in neon lime on `/`.
  3. Verify keyboard shortcuts `H`, `W`, `A`, `J`, `C`.
  4. Verify mobile safe-area spacing and responsive positioning.
