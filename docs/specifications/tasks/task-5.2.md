# Task Specification: 5.2 Draggable & Resizable Hero Portrait

## 1. Task Overview
Task 5.2 transforms the homepage hero portrait (`# maya-portrait.webp`) into an interactive, direct-manipulation Figma image layer matching `https://snapline.framer.website/` 1:1 in geometry, handle kinetics, release spring physics, cross-component layout isolation, and integrated portrait collaborator presence (`"Sam · Dev"` cursor and comment bubbles).

---

## 2. Objective
Implement `useResizableFrame.ts` and `HeroPortrait.tsx` (and parent layout adjustments in `HeroSection.tsx` / `Header.tsx`) to reproduce the Snapline reference hero portrait animation and cross-component behaviour 1:1:
1. **Out-of-Flow Fixed-Footprint Resizing (`0.000px` Sibling Shift):** Resizing any handle expands the portrait layer over the canvas without shifting the left hero column, CTA buttons (`"View my work"`, `"Say hello"`), top Header, or Footer.
2. **Free Two-Axis / Single-Axis Handle Resizing:** Corner handles (`tl`, `tr`, `bl`, `br`) resize width and height independently without aspect-ratio lock; edge handles (`ml`, `mr`, `tc`, `bc`) resize along a single axis.
3. **Underdamped Spring-Back Return on Release:** Releasing any handle triggers a `requestAnimationFrame` harmonic spring (`stiffness: 160`, `damping: 13`) that returns `width`, `height`, and `translate3d(x, y, 0)` to rest with natural ~11%–13% underdamped overshoot and ~1.0s settle.
4. **Synchronized Handle Kinetics & Flush Frame Geometry:** `12px × 12px` handles (`1.5px solid #0A0A0A`, `-14px` hit inset) expand `scale(1.35)` simultaneously across all 8 handles during active drag (`data-drag="1"`) using `0.35s cubic-bezier(0.34, 1.56, 0.64, 1)` overshoot easing; sharp `0px` image corners sit flush against the `1.5px` selection border.
5. **Attached Dimension Badge & Desktop Baseline Hint:** Live neon lime dimension pill stays attached directly beneath the transformed frame bottom edge (`top: calc(100% + 12px)`); `"Drag a handle to resize me"` sits right-aligned on the same desktop baseline row and fades out (`opacity: 0` over `0.4s`) on first touch while staying mounted in DOM.
6. **Portrait Collaborator Companion (`"Sam · Dev"` + `.snp-cmt`):** Dark-pill `"Sam · Dev"` cursor glides inside the portrait bounds continuously through idle, hover, and resize states while popping periodic spring-animated comment tooltips.

---

## 3. Scope
- **Interactive Custom Hook (`src/hooks/useResizableFrame.ts`):**
  - Pointer capture (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`) across all 8 handles (`tl`, `tc`, `tr`, `ml`, `mr`, `bl`, `bc`, `br`).
  - Independent two-axis corner resizing and single-axis edge resizing with top/left opposite-edge translation anchoring (`translate3d`), minimum bounds (`140px × 170px`), and viewport-aware maximum clamping.
  - Underdamped `requestAnimationFrame` spring physics loop (`stiffness: 160`, `damping: 13`) returning `width`, `height`, and `(x, y)` cleanly on release, supporting instant mid-flight interruption on re-grab.
  - Responsive resting targets: `460 × 575` (desktop `>= 1400px` wide & `>= 780px` tall), `420 × 525` (compact laptop `1024px–1399px` or `< 780px` tall to keep full hero visible above fold), `380 × 475` (tablet `640px–1023px`), `300 × 375` (mobile `< 640px`).
  - Tracks `isResizing`, `isSpringing`, `isTouched`, and `activeHandle`.
- **Hero Portrait Component (`src/components/home/HeroPortrait.tsx`):**
  - Renders a fixed-size outer footprint slot (`w` × `h + 32px` bottom metadata row) so sibling/page layout never shifts during resize (`Δ = 0.000px`).
  - Inside the fixed slot, renders the active resizing layer (`position: absolute; top: 0; left: 0; z-index: 20`) with `border-[1.5px] border-[#0A0A0A]`, flush `0px` image corners (`bg-[#ECECEC]`), `# maya-portrait.webp` layer tag (`-top-5 left-0`), 8 `12px × 12px` interactive handles, live neon lime dimension badge attached below the resized frame, and `"Sam · Dev"` + `.snp-cmt` spring comment bubble.
  - Renders `"Drag a handle to resize me"` aligned right-of-badge on desktop (`lg:right-0 lg:bottom-0`) and centered below badge on narrow viewports (`< 1024px`), fading `opacity-100 -> opacity-0` (`duration-[400ms]`) once `isTouched` is true.
- **Hero Section & Header Stacking (`src/components/home/HeroSection.tsx` & `src/components/navigation/Header.tsx`):**
  - Ensure `<Header />` retains `z-30` above the canvas hero slot so `"Get in touch"` CTA never gets occluded if user pulls top handles high.
  - Maintain resting vertical alignment between Hero left column CTAs and HeroPortrait resting baseline row without coupling left-column `y` to dynamic portrait drag height.
- **Module Exports (`src/components/home/index.ts` & `src/hooks/index.ts`):**
  - Export `HeroPortrait` and `useResizableFrame`.

---

## 4. Out-of-Scope Features
- **Full-Page 4s `.snp-intro` Opacity Gate:** Omitted at component scope (`HeroPortrait` renders immediately; global preloader is separate).
- **Canvas-Wide Multi-Cursor Features (`"Sam · Dev"` outside portrait if any):** Additional global collaborator features remain scoped under Task 5.3 (`CollaboratorCursors.tsx`).
- **Persistent LocalStorage State of Resized Dimensions:** Resets on reload / release to resting state.

---

## 5. Reference Website & Screenshots
- **Reference Target:** `https://snapline.framer.website/`
- **Visual & Behaviour Audit Evidence:**
  - `docs/research/snapline/screenshots/desktop/home-desktop-portrait-handles.png`
  - `docs/research/snapline/screenshots/desktop/home-desktop-portrait-selection.png`
  - `docs/research/snapline/screenshots/interactions/home-desktop-portrait-resize-drag.png`
  - `docs/research/snapline/screenshots/tablet/home-tablet-768px.png`

---

## 6. Component Hierarchy
```text
<HeroSection>
└── <div className="flex flex-col lg:flex-row lg:items-end justify-between ...">
    ├── <div className="flex flex-col items-start ..."> (Left Column - stationary during resize)
    └── <div className="flex justify-center lg:justify-end shrink-0"> (Right Column)
        └── <HeroPortrait> (Fixed resting layout slot: width=defaultW, height=defaultH + 34px)
            ├── <div data-testid="hero-portrait-frame" (absolute top-0 left-0, live w/h/translate3d, z-20)
            │   ├── <div className="relative w-full h-full overflow-hidden rounded-none bg-[#ECECEC]">
            │   │   └── <Image src="/images/hero-portrait.webp" className="object-cover object-[50%_30%]" />
            │   ├── <SamDevPortraitCursor /> (autonomous RAF cursor + .snp-cmt comment spring popup)
            │   ├── <div data-testid="figma-selection-frame" className="border-[1.5px] border-[#0A0A0A]" />
            │   ├── <div data-testid="figma-layer-tag"># maya-portrait.webp</div>
            │   ├── <div data-testid="figma-handles-container"> (8 handles: 12×12px, 1.5px border, -14px hit inset)
            │   └── <span data-testid="figma-dimension-badge" (attached top-[calc(100%+12px)] left-1/2 -translate-x-1/2)>
            └── <span data-testid="figma-helper-text" (right-0 on desktop lg:, below badge on mobile/tablet)>
```

---

## 7. Detailed Visual Specifications

| Element | Property | Measured / Target Value | Evidence Classification | Token / Source |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop Dimensions (>=1400×780)** | `width` × `height` | `460px × 575px` | Measured Value | `snapline.framer.website` `.snp-pl` (`1440×900`) |
| **Compact Laptop Dimensions** | `width` × `height` | `420px × 525px` | Calibration Decision | User Task 5.1 viewport fit & bottom alignment |
| **Tablet / Narrow Dimensions** | `width` × `height` | `380px × 475px` (`300px × 375px` mobile) | Measured Value | `snapline.framer.website` `data-narrow="1"` |
| **Min Size Clamps** | `minWidth` / `minHeight` | `140px` / `170px` | Measured Value | `snapline.framer.website` handle bounds |
| **Image Corners** | `borderRadius` | `0px` (`rounded-none`, no inner shadow/gap) | Measured Value | `snapline.framer.website` `.snp-pl-layer` |
| **Selection Border** | `border` | `1.5px solid #0A0A0A` | Measured Value | `snapline.framer.website` `.snp-pl-layer` |
| **Resize Handles (8)** | `width` / `height` / `border` | `12px × 12px`, `1.5px solid #0A0A0A`, `#FFFFFF` (`#D6FF3F` hover), `-14px` hit inset | Measured Value | `snapline.framer.website` `.snp-pl-layer > i` |
| **Layer Tag** | `font` / `position` | Monospace `11px`, `#0A0A0A`, `-top-5 left-0` | Measured Value | `.snp-pl-name` |
| **Dimension Badge** | `style` / `anchor` | `#D6FF3F`, `#0A0A0A` `10px` bold mono, centered `top: calc(100% + 12px)` of active frame | Measured Value | `.snp-pl-size` |
| **Helper Caption** | `style` / `position` | `11px`, `#0A0A0A`/50%, right-aligned on desktop badge baseline row | Measured Value | `.snp-pl-hint` |
| **Sam · Dev Cursor & Bubble** | `colors` / `shadow` | Pill `#0A0A0A`/`#FFFFFF`; Comment `#FFFFFF` `14px 14px 14px 4px`, `0 16px 34px -18px rgba(0,0,0,0.4)` | Measured Value | `.snp-pl-cur` & `.snp-cmt` |

---

## 8. Layout & Positioning Specifications
- **Slot Isolation:** Outer `<HeroPortrait>` slot uses fixed responsive inline/CSS dimensions (`width: defaultW`, `height: defaultH + metadataBandH`) so CSS Flexbox row height never changes on drag (`0.000px` sibling displacement).
- **Absolute Active Artboard:** Inner `.hero-portrait-frame` is `position: absolute; top: 0; left: 0; z-index: 20` inside the fixed slot, expanding rightward/downward for `mr`/`bc`/`br` and translating via `translate3d(x, y, 0)` for `tl`/`tc`/`tr`/`ml`/`bl`.
- **Header Layer Priority:** `<Header />` renders at `relative z-30` above hero content so top header CTAs remain unobstructed.

---

## 9. Typography Specifications
- **Layer Name Tag:** `font-mono text-[11px] font-normal tracking-tight text-[#0A0A0A]`.
- **Dimension Badge:** `font-mono text-[10px] font-bold tracking-tight text-[#0A0A0A]`.
- **Helper Caption:** `font-sans text-[11px] font-normal leading-tight text-[#0A0A0A]/50`.
- **Sam · Dev Cursor:** `font-sans text-[12px] font-semibold tracking-normal text-[#FFFFFF]`.
- **Comment Bubble:** Author `11px` medium `#8A8A8A`; Message `12.5px` medium `#0A0A0A`.

---

## 10. Colour & Styling Specifications
- **Frame Line & Handle Border:** `#0A0A0A` (`1.5px`)
- **Handle Fill:** `#FFFFFF` default -> `#D6FF3F` on hover / active handle drag
- **Handle Hover Scale:** `1.35x` (`12px -> 16.2px`)
- **Image Container Bg:** `#ECECEC`
- **Dimension Badge:** `#D6FF3F` bg, `#0A0A0A` text
- **Sam · Dev Cursor Pill:** `#0A0A0A` bg, `#FFFFFF` text

---

## 11. Asset Requirements
- Portrait Image: `/images/hero-portrait.webp` (`object-cover object-[50%_30%]`).

---

## 12. Animation Specifications
- **Handle Hover & Active Scale:**
  - CSS: `transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease`.
  - Hover state: single hovered handle scales `1 -> 1.35` and shifts `#FFFFFF -> #D6FF3F`.
  - Active drag state (`data-drag="1"`): **all 8 handles simultaneously scale `1 -> 1.35`** while active handle stays `#D6FF3F`.
- **Free Resize Tracking:**
  - Corner handles update `width` and `height` independently; edge handles update single axis; opposite edges stay anchored via `translate3d`. Zero transition delay during active drag (`transition: none`).
- **Release Underdamped Spring-Back (`pointerup`):**
  - `requestAnimationFrame` harmonic spring simulation with `stiffness: 160`, `damping: 13` ($\zeta \approx 0.51$), settling threshold `< 0.15px` / `< 0.5px/s`.
  - Produces visible ~11%–13% underdamped overshoot past resting dimensions and settles in ~1.0s while live-updating the dimension badge every frame.
  - Grabbing a handle mid-spring cancels the RAF loop cleanly and resumes manual sizing seamlessly.
- **Helper Hint Fade-Out:**
  - `transition: opacity 0.4s ease`; `data-touched="1"` switches `opacity-100 -> opacity-0` while staying mounted in DOM.
- **Sam · Dev Cursor & Comment Bubble (`.snp-cmt`):**
  - Smooth `requestAnimationFrame` lerp motion wandering within portrait interior (`15%..80%` width, `20%..80%` height).
  - Comment popup cycles every ~5.5s (visible ~3.0s) through verified messages (`"Love this crop"`, `"Can we test this with users?"`, `"Add it to the design system?"`, `"Pixel perfect"`), animating `scale: 0.3 -> 1`, `opacity: 0 -> 1` via `transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease` with `transform-origin: 0 100%`.

---

## 13. Interaction Specifications
- Handles use `touch-action: none` with `14px` expanded hit area (`before:-inset-[14px]`).
- Body click/drag performs no movement or resize (`cursor-default`, matching Reference).
- Double-clicking/tapping body or dragging handles preserves smooth mobile vertical scroll (`touch-pan-y` outside handles).

---

## 14. Transition Specifications
- Handle hover/drag scale: `350ms cubic-bezier(0.34, 1.56, 0.64, 1)`.
- Handle fill: `200ms ease`.
- Hint fade: `400ms ease`.
- Comment bubble entrance/exit: `transform 550ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease`.

---

## 15. Responsive Behaviour
- **Desktop (`1440×900`, `>=1400px` wide & `>=780px` tall):** Resting `460 × 575`; hint right-aligned inline on same baseline row as centered badge.
- **Compact Laptop (`1024px–1399px` or `< 780px` tall):** Resting `420 × 525`; preserves full hero visibility above the fold and `30px` top/bottom header pill symmetry; hint inline right-aligned.
- **Tablet (`640px–1023px`):** Resting `380 × 475`; hint centered underneath badge.
- **Mobile (`< 640px`):** Resting `300 × 375` (bounded by viewport width); handles remain draggable with `touch-action: none` without blocking page vertical scroll.

---

## 16. Accessibility Requirements
- Descriptive image alt text, keyboard-focusable handles with explicit `aria-label` roles (`role="button"`).
- Non-interactive decorative collaborator cursor and comment bubble carry `aria-hidden="true"` and `pointer-events-none`.
- `prefers-reduced-motion: reduce` disables autonomous cursor drift/comment animation loop and snaps release cleanly.

---

## 17. Technical Implementation Requirements
- Pure PointerEvents (`onPointerDown`, `setPointerCapture`) attached cleanly to window listeners on drag.
- Viewport bounding checks clamp active drag dimensions/translations within `window.innerWidth` / `window.innerHeight` with `16px` margin so frame cannot disappear off-screen.
- Zero SSR/hydration mismatches (`useEffect` handles viewport sizing & RAF animations).

---

## 18. Dependencies
- `next/image`
- `react` (`useState`, `useEffect`, `useRef`, `useCallback`)

---

## 19. Edge Cases
- **Mid-Spring Interruption:** Grabbing any handle while `isSpringing` immediately cancels `springRafRef` and continues smoothly from current interpolated `(width, height, x, y)`.
- **Window Resize:** Automatically updates resting dimensions cleanly while resetting out-of-bounds overrides.
- **Viewport Clamping:** Ensures minimum `140 × 170` and prevents right/bottom/top expansion outside visible viewport bounds.

---

## 20. Detailed Acceptance Criteria
1. Resizing any handle produces **`0.000px` vertical or horizontal shift** in left hero copy, `"View my work"`, `"Say hello"`, Top Header, or Footer.
2. Corner handles resize `width` and `height` independently without fixed `4:5` aspect-ratio locking; edge handles resize strictly on their single axis; minimums enforce `140px × 170px`.
3. Releasing any handle triggers an underdamped spring return (`stiffness: 160, damping: 13`) with visible overshoot and smooth settle back to resting size/origin while live-updating the dimension pill.
4. All 8 handles render at `12 × 12px` with `1.5px solid #0A0A0A` border, `-14px` hit inset, `0.35s cubic-bezier(0.34, 1.56, 0.64, 1)` scale easing, simultaneous `1.35x` expansion of all 8 handles while dragging, and `#D6FF3F` active/hovered tint.
5. Image corners render sharp (`0px` radius) flush inside the `1.5px` black border with zero corner gaps.
6. Live dimension pill remains attached directly beneath the resized frame edge across all 8 handle drags (including `tl`/`tc`/`tr`), and `"Drag a handle to resize me"` sits inline right-aligned on desktop, fading smoothly (`opacity: 0` over `0.4s`) on touch while staying mounted in DOM.
7. `"Sam · Dev"` cursor and spring-animated `.snp-cmt` comment bubbles run smoothly inside the portrait frame without blocking handle interactions.
8. TypeScript (`npx tsc --noEmit`), ESLint (`npm run lint`), and Turbopack production build (`npm run build`) exit with code `0` (zero errors, zero warnings).

---

## 21. Testing Requirements
- `npx tsc --noEmit` (Exit code 0)
- `npm run lint` (Exit code 0)
- `npm run build` (Exit code 0)
- Live browser audit verification (`1440×900`) verifying `0.000px` sibling layout shift, free axis resize, all-8 handle drag scaling, underdamped overshoot spring return, attached badge, sharp frame borders, and `"Sam · Dev"` cursor/comment animations.
