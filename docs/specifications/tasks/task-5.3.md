# Task Specification: 5.3 Simulated Multiplayer Collaborator Cursors

## 1. Task Overview
Task 5.3 consolidates and refines the Snapline homepage's simulated multiplayer presence (`"Lena · PM"` and `"Sam · Dev"`) inside a shared architectural module (`src/components/home/CollaboratorCursors.tsx`) matching `https://snapline.framer.website/` 1:1 in DOM tokens, pill geometry, pointer evasion behavior, comment bubble cycling, and responsive visibility across desktop, tablet, and mobile viewports.

---

## 2. Objective
Create `src/components/home/CollaboratorCursors.tsx` to provide:
1. **`CollaboratorCursorBadge`:** Shared pointer arrow SVG (`20×24`, `#2A2926` fill, `#FFFFFF` `1.2px` stroke) and collaborator tag pill (`padding: 4px 9px`, `Inter` `12px` `font-semibold`, `line-height: 1.2`, `border-radius: 7px 7px 7px 2px`) parameterized across `"lime"` (`#D6FF3F` / `#2A2926`) and `"dark"` (`#2A2926` / `#FFFFFF`), eliminating duplicated SVG/badge code across `RoleRotator.tsx` and `HeroPortrait.tsx`.
2. **`PortraitCollaboratorCursor`:** Refactored `"Sam · Dev"` autonomous cursor and periodic `.snp-cmt` spring comment bubble inside the hero portrait (`max-w-[210px]`, `padding: 9px 12px`, `border: 1px solid rgba(42, 41, 38,0.1)`, `border-radius: 14px 14px 14px 4px`, `box-shadow: 0 16px 34px -18px rgba(0,0,0,0.4)`), including all 5 observed Snapline comment phrases (`"Love this crop"`, `"Can we test this with users?"`, `"Add it to the design system?"`, `"Ship it Friday?"`, `"Pixel perfect"`).
3. **`CollaboratorCursors` Coordination & Responsive Parity:** Ensure both cursors match verified Reference rules—visible and smoothly animated (`pointer-events: none`) across Desktop (`1440×900`), Tablet (`768×1024`), and Mobile (`390×844`), with `Lena · PM` performing `120px` user mouse repulsion while `Sam · Dev` glides smoothly without user mouse repulsion.

---

## 3. Scope
- **Shared Collaborator Module (`src/components/home/CollaboratorCursors.tsx`):**
  - `CollaboratorCursorBadge`: Reusable pointer SVG (`20×24`) + pill badge (`variant="lime" | "dark"`, `name`, `role`).
  - `PortraitCollaboratorCursor`: `"Sam · Dev"` RAF waypoint wandering + periodic `.snp-cmt` spring comment bubble inside portrait bounds (`aria-hidden="true"`, `pointer-events-none`).
- **Consumer Refactors (`src/components/home/RoleRotator.tsx` & `src/components/home/HeroPortrait.tsx`):**
  - Replace duplicate inline cursor SVG + pill badge in `RoleRotator.tsx` with `<CollaboratorCursorBadge name="Lena" role="PM" variant="lime" />`.
  - Replace inline `SamDevCursor` definition in `HeroPortrait.tsx` with `<PortraitCollaboratorCursor frameWidth={width} frameHeight={height} />`.
- **Module Exports (`src/components/home/index.ts`):**
  - Export `CollaboratorCursorBadge` and `PortraitCollaboratorCursor` from `src/components/home/index.ts`.

---

## 4. Out-of-Scope Features
- **3rd / Global Canvas-Wide Cursors Outside Hero Headline & Portrait:** Empirical DOM scan of `https://snapline.framer.website/` (359KB HTML, hero to footer) verified zero other collaborator cursors exist on the site.
- **Real WebSocket Live Presence:** Cursors remain client-side deterministic/sinusoidal simulations (`aria-hidden="true"`).

---

## 5. Reference Website & Screenshots
- **Reference Target:** `https://snapline.framer.website/`
- **Visual & DOM Evidence:**
  - `docs/research/snapline/screenshots/desktop/home-desktop-initial.png` (`Lena · PM`)
  - `docs/research/snapline/screenshots/interactions/home-desktop-portrait-resize-drag.png` (`Sam · Dev` + comment)
  - `docs/research/snapline/screenshots/tablet/home-tablet-768px.png` (`Lena · PM` + `Sam · Dev` at 768px)

---

## 6. Component Hierarchy
```text
CollaboratorCursors.tsx
├── CollaboratorCursorBadge (props: name, role, variant="lime" | "dark")
│   ├── <svg viewBox="0 0 20 24" className="h-[24px] w-[20px] drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
│   └── <b className="left-[16px] top-[18px] px-[9px] py-[4px] rounded-[7px_7px_7px_2px] text-[12px] font-semibold ...">
└── PortraitCollaboratorCursor (props: frameWidth, frameHeight)
    ├── <div data-testid="portrait-sam-comment" className="max-w-[210px] px-[12px] py-[9px] ...">
    └── <CollaboratorCursorBadge name="Sam" role="Dev" variant="dark" />

Consumers:
├── RoleRotator.tsx -> wraps <CollaboratorCursorBadge name="Lena" role="PM" variant="lime" />
└── HeroPortrait.tsx -> wraps <PortraitCollaboratorCursor frameWidth={width} frameHeight={height} />
```

---

## 7. Detailed Visual Specifications

| Element | Property | Measured / Target Value | Evidence Classification | Token / Source |
| :--- | :--- | :--- | :--- | :--- |
| **Pointer SVG** | `width` × `height` / `fill` / `stroke` | `20px × 24px`, `fill: #2A2926`, `stroke: #FFFFFF` `1.2px`, shadow `0 2px 3px rgba(0,0,0,0.25)` | Measured Value | `.snp-re-cur svg`, `.snp-pl-cur svg` |
| **Pill Positioning** | `left` / `top` | `left: 16px; top: 18px` | Measured Value | `.snp-re-cur b`, `.snp-pl-cur span` |
| **Pill Geometry** | `padding` / `borderRadius` | `padding: 4px 9px`, `borderRadius: 7px 7px 7px 2px` | Measured Value | `.snp-re-cur b`, `.snp-pl-cur span` |
| **Lena · PM Colors** | `background` / `color` | `#D6FF3F` bg, `#2A2926` text | Measured Value | `.snp-re` `--t`, `--tt` |
| **Sam · Dev Colors** | `background` / `color` | `#2A2926` bg, `#FFFFFF` text | Measured Value | `.snp-pl` `--t`, `--tt` |
| **Comment Bubble** | `maxWidth` / `padding` / `border` / `shadow` | `max-width: 210px`, `padding: 9px 12px`, `border: 1px solid rgba(42, 41, 38,0.1)`, `radius: 14px 14px 14px 4px`, `shadow: 0 16px 34px -18px rgba(0,0,0,0.4)` | Measured Value | `.snp-cmt` `<style>` |

---

## 8. Layout & Positioning Specifications
- `CollaboratorCursorBadge` renders as an unpositioned pointer SVG + absolutely positioned pill (`left-[16px] top-[18px]`) inside its caller's moving wrapper (`cursorRef`).
- `PortraitCollaboratorCursor` positions `absolute top-0 left-0 z-[25]` inside `hero-portrait-frame`, clamped safely within portrait `[28..w-96]` × `[48..h-48]` bounds.

---

## 9. Typography Specifications
- **Cursor Label Pill (`Lena · PM` / `Sam · Dev`):** `font-sans` (`Inter`/`Geist`), `12px`, `font-semibold` (`600`), `leading-[1.2]`, `tracking-normal`.
- **Comment Author Header:** `11px` medium `#8A8A8A`.
- **Comment Message Copy:** `12.5px` medium `#2A2926`, `leading-snug`.

---

## 10. Colour & Styling Specifications
- **Lime Pill (`Lena · PM`):** `bg-[#D6FF3F] text-[#2A2926]`, middle dot `bg-[#2A2926]/75`.
- **Dark Pill (`Sam · Dev`):** `bg-[#2A2926] text-[#FFFFFF]`, middle dot `bg-white/75`.
- **Comment Card:** `bg-white border border-black/10`.
- **Base Canvas & Page Background (Resting):** `#F4F4F4` solid with **no visible dot grid** during normal resting/scrolling page states.
- **2D Spatial View Transition Artboard Canvas:** `#E6E6E3` with 22px repeating dot grid (`#C3C3BF` 1px dots) displayed via `::view-transition` behind flying artboard cards (`scale(0.44)` / `scale(0.6)`).

---

## 11. Asset Requirements
- Inline SVG arrow path (`M2 1.5v18l5-4.7 3.4 7.4 3.2-1.4-3.4-7.2 6.8-.2z`) rendered cleanly via React SVG without external asset requests.

---

## 12. Animation Specifications
- **`Lena · PM` Motion (`RoleRotator.tsx`):** Compound sine wander + target tracking across `navigating`/`selecting`/`selected`/`typing` + `120px` user mouse repulsion (`0.07` lerp factor).
- **`Sam · Dev` Motion (`PortraitCollaboratorCursor`):** Autonomous RAF waypoint lerp (`0.032` factor, `3.4s` waypoint step) with sinusoidal micro-drift inside active portrait bounds; ignores user mouse proximity (verified against Reference).
- **`.snp-cmt` Spring Popup:** Cycles every ~5.8s (open `3.0s`, closed `2.8s`) across 5 phrases (`"Love this crop"`, `"Can we test this with users?"`, `"Add it to the design system?"`, `"Ship it Friday?"`, `"Pixel perfect"`), scaling `0.3 -> 1` via `0.55s cubic-bezier(0.34, 1.56, 0.64, 1)` with `transform-origin: 0% 100%` and `opacity` `0.3s ease`.

---

## 13. Interaction Specifications
- Strictly `pointer-events-none` across cursor arrows, pills, and comment bubbles so clicks, selections, and portrait handle drags are never intercepted on mouse or touch.

---

## 14. Transition Specifications
- Comment bubble entrance/exit: `transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease`.
- Cursors smoothly interpolate `translate3d(x, y, 0)` every animation frame (`will-change: transform`).

---

## 15. Responsive Behaviour
- **Desktop (`1440×900`):** Both `"Lena · PM"` and `"Sam · Dev"` (with comment popups) active.
- **Tablet (`768×1024`):** Both active cleanly within stacked headline and portrait frames.
- **Mobile (`390×844`):** Both active cleanly with `pointer-events: none` and `Sam · Dev` clamped inside `[28..w-96]` × `[48..h-48]` portrait bounds (verified against Reference `final_step_28.png`).

---

## 16. Accessibility Requirements
- Decorative overlays set `aria-hidden="true"` and `select-none`.
- When `prefers-reduced-motion: reduce` is active, both cursors lock statically at clean resting coordinates and comment cycling pauses.

---

## 17. Technical Implementation Requirements
- Pure React + CSS/RAF animations with clean `cancelAnimationFrame`, `clearInterval`, and `clearTimeout` teardown on unmount.
- Zero ESLint warnings and strict TypeScript props interfaces.

---

## 18. Dependencies
- `react` (`useState`, `useEffect`, `useRef`)
- Consumers: `src/components/home/RoleRotator.tsx`, `src/components/home/HeroPortrait.tsx`.

---

## 19. Edge Cases
- **Very Narrow Viewports (`300px` portrait):** Waypoint clamping (`Math.max(28, Math.min(w - 96, ...))`) prevents `"Sam · Dev"` pill or `.snp-cmt` card (`max-w-[210px]`) from overflowing off-screen.
- **Tab Backgrounding:** `if (!document.hidden)` skips waypoint increments while hidden.

---

## 20. Detailed Acceptance Criteria
1. `src/components/home/CollaboratorCursors.tsx` exports `CollaboratorCursorBadge` and `PortraitCollaboratorCursor`.
2. Shared pointer SVG (`20×24`) and collaborator pill (`4px 9px` padding, `12px` semibold, `7px 7px 7px 2px` radius) eliminate duplication between `RoleRotator.tsx` and `HeroPortrait.tsx`.
3. `"Sam · Dev"` displays `#2A2926` pill / `#FFFFFF` text, cycles all 5 verified comments (including `"Ship it Friday?"`) using `.snp-cmt` specs (`max-w-[210px]`, `px-[12px] py-[9px]`, `border-black/10`), and ignores mouse repulsion.
4. `"Lena · PM"` displays `#D6FF3F` pill / `#2A2926` text and retains `120px` pointer evasion and typewriter collaboration.
5. Both cursors remain visible and `pointer-events: none` across `1440px`, `768px`, and `390px` viewports, honoring `prefers-reduced-motion: reduce`.
6. `npx tsc --noEmit`, `npx eslint src`, and `npm run build` pass cleanly with zero errors/warnings.

---

## 21. Testing Requirements
- `npx tsc --noEmit`
- `npx eslint src`
- `npm run build`
- Runtime verification across Desktop (`1440×900`), Tablet (`768×1024`), and Mobile (`390×844`) on `http://localhost:3000/`.
