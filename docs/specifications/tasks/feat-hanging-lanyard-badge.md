# Task Specification: Custom Feature — Homepage Hanging Lanyard Badge & Header CTA Removal

**Feature ID:** `custom-hanging-lanyard-badge`  
**Branch Name:** `feat/hanging-lanyard-badge`  
**Base / Integration Branch:** `stage-1`  
**Implementation Plan Link:** [implementation-plan.md (Custom Feature Extensions)](file:///d:/portfolio/docs/implementation-plan.md#L1575)  
**Status:** IMPLEMENTED  

---

## 1. Task Overview
This feature customizes the Maya Ortiz portfolio homepage (`/`) in two coordinated ways:
1. Removes the `"Get in touch"` call-to-action pill button from the top-right corner of the Homepage header (`/` only, preserving `"Get in touch"` on all secondary routes).
2. Replaces the existing `HeroPortrait` (`# maya-portrait.webp` resizable Figma box) in the top-right hero column with an interactive **3D Flippable Hanging Lanyard ID Badge** (`HangingBadge.tsx`) powered by GSAP (`gsap` + `@gsap/react`), matching the hanging lanyard, pendulum drag/swing physics, silver clip, and 3D flip behavior from the user-supplied reference recording (`createdbywilliam.co.za`), adapted with **neon yellow (`#D6FF3F`)** lanyard strap & front pill tag instead of pink, Maya Ortiz's front identity, and the red/blue Spider-Man themed back side matching the reference recording.

---

## 2. Objective
Deliver a tactile, 60fps GSAP-powered interactive hanging ID badge at the top-right corner of the homepage while clearing the top-right `"Get in touch"` button on `/` so the neon yellow lanyard strap drops cleanly from the top edge of the site without header occlusion or sibling layout shift (`0.000px`).

---

## 3. Scope
- **Dependencies Installation:**
  - Install `gsap` (`^3.15.1`) and `@gsap/react` (`^2.1.2`) in `package.json`.
- **Homepage Header Adjustment (`src/components/navigation/Header.tsx` & `src/app/page.tsx`):**
  - Add optional `showCta?: boolean` prop (default `true`) to `HeaderProps`.
  - Pass `showCta={false}` from `src/app/page.tsx` so `"Get in touch"` is omitted strictly on `/` while remaining active on `/work`, `/about`, `/journal`, and `/contact`.
- **GSAP Hanging Lanyard Badge (`src/components/home/HangingBadge.tsx`):**
  - **Dynamic SVG Lanyard Strap:** Neon yellow (`#D6FF3F`) woven ribbon hanging from the top edge of the homepage (`y = 0` on desktop `>= 1024px`, top slot mount on `< 1024px`), dynamically bending along a quadratic Bezier path with repeating dark ink (`#2A2926`) uppercase text (`MAYA ORTIZ ✦ PRODUCT DESIGN ✦ FIGMA ✦ DESIGN SYSTEMS ✦`) via SVG `<textPath>`.
  - **Silver Metallic Swivel Clip:** Brushed metallic cylindrical clamp connecting the lanyard strap to the top-center slot of the card.
  - **Front Face (Maya Ortiz):** Matte white (`#FFFFFF`) card with top-left recessed slot cutout, top-right **neon yellow (`#D6FF3F`) `ALL ACCESS` pill**, portrait photo (`/images/hero-portrait.webp`), bold `"Maya Ortiz"` name, `"Product Designer"` subtitle, bottom-left `"LISBON, PORTUGAL"` live green-dot pill, crisp black barcode SVG, and overlapping `"Flip ↻"` pill button.
  - **Back Face (Spider-Man Theme matching Reference Video):** Crimson-red (`#9D0316`) micro-dotted card enclosed in a royal blue (`#0645A1`) `4px` border, top-left white slot, top-right dark `#1 SPIDER-MAN FAN` pill, 2×2 bold white metrics (`4 Years shipping for the web`, `50+ Projects completed`, `36 Live sites in this portfolio`, `30+ Technologies in rotation`), bold black spider emblem SVG, bottom footer code (`MO-0036 · valid anywhere with Wi-Fi`), and `"Flip ↻"` pill button.
  - **GSAP Motion & Coupled Pendulum Physics:**
    - Entrance drop + gentle pendulum settle via `gsap.timeline()` inside `useGSAP()`.
    - Smooth 60fps pointer drag (`grab` / `grabbing`) with bounded elastic strap stretch, live Bezier curvature, and double-pendulum card tilt driven via `gsap.ticker` + `gsap.quickSetter()`.
    - Natural underdamped pendulum swing + bounce back upon pointer release using release velocity.
    - Snappy 3D `rotateY` (`0deg <-> 180deg`) card flip + scale pop + subtle physical swing impulse on clean click or `"Flip ↻"` button activation (using `contextSafe`).
    - Responsive layout & `prefers-reduced-motion` handling via `gsap.matchMedia()`.
- **Homepage Integration (`src/components/home/HeroSection.tsx` & `src/components/home/index.ts`):**
  - Replace `<HeroPortrait />` usage in `HeroSection.tsx` with `<HangingBadge />`.
  - Preserve `HeroPortrait.tsx` cleanly in `src/components/home/HeroPortrait.tsx` so no existing exports break.

---

## 4. Out-of-Scope Features
- Removing `"Get in touch"` from secondary routes (`/work`, `/about`, `/journal`, `/contact`).
- Adding the hanging badge on secondary routes (`/work`, `/about`, `/journal`, `/contact`).
- Replicating unrelated features from `createdbywilliam.co.za` (e.g., falling hero physics shapes, bops counter, top multi-link nav bar, Hall of Fame button, William Sham copy/photo).
- Re-enabling `HeroPortrait`'s 8-handle Figma resize interaction on `/` (explicitly replaced per user request).

---

## 5. Reference Website & Visual Evidence
- **Primary Portfolio Context:** [https://snapline.framer.website/](https://snapline.framer.website/)
- **Local Screenshot Evidence (Current Top-Right Corner):**
  - [media_1795603932844_8d11f1c8.png](file:///C:/Users/E%20L%20I%20T%20E%20B%20O%20O%20K/.gemini/antigravity/brain/c4e8e085-ade3-4b57-be6b-295d8ab7361b/.user_uploaded/media_1795603932844_8d11f1c8.png)
- **Reference Animation Video (`createdbywilliam.co.za`):**
  - [media_1795604033761_d41646ef.mp4](file:///C:/Users/E%20L%20I%20T%20E%20B%20O%20O%20K/.gemini/antigravity/brain/c4e8e085-ade3-4b57-be6b-295d8ab7361b/.user_uploaded/media_1795604033761_d41646ef.mp4)
- **Extracted Full-HD Frame Evidence (Scratch):**
  - `full_f000.png` (dragged left `-35deg` pendulum tilt)
  - `full_f154.png` (resting front card & vertical strap)
  - `badge_t02.80s.png` (curved SVG lanyard strap bowing during pendulum swing)
  - `flip2_f362_t12.07s.png` (edge-on 3D card flip beneath stationary vertical silver clip)
  - `full_f410.png` (flipped crimson-red / blue-border Spider-Man card back)

---

## 6. Component Hierarchy
```text
Home (src/app/page.tsx)
├── Header (src/components/navigation/Header.tsx) [showCta={false} on /]
│   └── <div className="flex h-14 w-full items-center justify-between">
│       ├── Link ("Maya." -> "/")
│       └── Right action slot (empty on "/" when showCta={false})
├── HeroSection (src/components/home/HeroSection.tsx)
│   └── <div className="flex flex-col lg:flex-row lg:items-end justify-between ...">
│       ├── Left Column (AvailabilityBadge, "Hello, I am / Maya Ortiz, / a [RoleRotator]", Copy, Dual CTAs)
│       └── Right Column (Fixed Footprint Slot)
│           └── HangingBadge (src/components/home/HangingBadge.tsx) [NEW]
│               ├── <svg> Dynamic Curved Lanyard Strap (#D6FF3F ribbon + <textPath>)
│               └── Card Rig (ref={rigRef}, positioned/tilted via GSAP quickSetter)
│                   ├── Silver Metallic Clamp Clip (stays 2D facing viewer during flip)
│                   └── 3D Perspective Container (perspective: 1200px)
│                       └── 3D Flipper (ref={flipperRef}, preserve-3d, rotateY 0 <-> 180)
│                           ├── Front Face (backface-hidden):
│                           │   ├── Slot cutout + Neon Yellow "ALL ACCESS" Pill (#D6FF3F)
│                           │   ├── Portrait Image (/images/hero-portrait.webp)
│                           │   ├── "Maya Ortiz" + "Product Designer"
│                           │   ├── "LISBON, PORTUGAL" status pill + Barcode SVG
│                           │   └── "Flip ↻" Button
│                           └── Back Face (backface-hidden, rotateY(180deg)):
│                               ├── Slot cutout + Dark "#1 SPIDER-MAN FAN" Pill
│                               ├── 2×2 White Metrics Grid (4 / 50+ / 36 / 30+)
│                               ├── Black Spider Emblem SVG
│                               ├── "MO-0036 · valid anywhere with Wi-Fi"
│                               └── "Flip ↻" Button
└── Footer (src/components/navigation/Footer.tsx)
```

---

## 7. Detailed Visual Specifications

| Element | Property | Measured / Target Value | Evidence Classification | Reference / Token |
| :--- | :--- | :--- | :--- | :--- |
| **Header CTA on `/`** | Visibility | Omitted (`showCta={false}`) | Implementation Decision | User Request + Answer A3 |
| **Header CTA on Other Routes** | Visibility | Preserved (`showCta={true}`) | Implementation Decision | Answer A3 |
| **Lanyard Strap Width** | `strokeWidth` | `26px` desktop (`22px` mobile) | Measured Value (scaled 1440px from 31px@1920) | `full_f154.png` |
| **Lanyard Strap Color** | `fill` / `stroke` | `#D6FF3F` (neon yellow-lime, replacing `#CD0668` pink) | Implementation Decision | User Request + `design-tokens.json` |
| **Strap Repeating Text** | `font` / `color` | `9.5px` bold uppercase mono `#2A2926`, `0.14em` tracking | Calibrated Value | `full_f154.png` |
| **Silver Metallic Clip** | `width × height` | `32px × 44px`, metallic horizontal gradient, `rounded-b-[10px]` | Measured Value | `full_f154.png` |
| **Badge Card Dimensions** | `width × height` | Desktop `>=1400×780`: `348px × 486px`; Laptop: `326px × 456px`; Mobile: `288px × 404px` | Measured Proportions (`~1:1.40`) | `full_f154.png` (`382×522` at 1920) |
| **Badge Corner Radius** | `borderRadius` | `20px` (`rounded-[20px]`) | Calibrated Observation | `full_f154.png` |
| **ALL ACCESS Pill (Front)** | `bg` / `color` | `#D6FF3F` bg, `#2A2926` text, `10px` bold uppercase tracking | Implementation Decision | User Request (neon yellow tag) |
| **Front Portrait Box** | `radius` / `fit` | `rounded-[14px]`, `object-cover object-[50%_26%]`, `/images/hero-portrait.webp` | Verified Asset | `full_f154.png` + `public/images/hero-portrait.webp` |
| **Back Card Background** | `background` | `#9D0316` with subtle `4px` micro-dot texture | Measured Value | `full_f410.png` |
| **Back Card Outer Border** | `border` | `4px solid #0645A1` | Measured Value | `full_f410.png` |
| **Flip Button** | `position` / `style` | Bottom-right corner overlap (`-bottom-3.5 right-3.5`), white pill, subtle border & shadow | Measured Observation | `full_f154.png`, `full_f410.png` |

---

## 8. Layout & Positioning Specifications
- **Slot Isolation (`0.000px` Sibling Shift):** `<HangingBadge />` renders inside an explicit fixed-dimension outer slot (`width` & `height` matching the resting badge + bottom flip button clearance) in `HeroSection`'s right flex column so swinging, dragging, or flipping NEVER shifts the left hero copy, CTAs, or `Footer`.
- **Desktop Ceiling Anchor (`>= 1024px`):** The lanyard SVG wrapper extends upward from the right column slot to `y = 0` of `<main>` (measured via `getBoundingClientRect()` relative to `<main>` or top viewport edge, cleanly cleared because `Header` on `/` omits the `"Get in touch"` CTA).
- **Stacked Mobile/Tablet Mount (`< 1024px`):** When `HeroSection` stacks into 1 column, the badge slot adds `pt-[88px]` top clearance and mounts the lanyard top anchor cleanly at the top edge of the badge slot with a discreet matte ceiling grommet (`w-10 h-1.5 rounded-full bg-[#2A2926]/20`), preventing overlap with the headline/buttons above.
- **Z-Index Order:** Badge rig sits at `z-30` inside the hero (`Header` left `"Maya."` is on the far left and unaffected; `FloatingDock` remains `z-[1000]` above everything).

---

## 9. Typography Specifications
- **Front Name (`Maya Ortiz`):** `font-heading font-bold text-[28px] xl:text-[31px] leading-[1.08] tracking-[-0.03em] text-[#1A1A1A]`.
- **Front Role (`Product Designer`):** `font-mono text-[12px] font-normal text-[#605F5F] tracking-[-0.01em]`.
- **Front Pill (`ALL ACCESS`):** `font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#2A2926]`.
- **Front Location Tag (`LISBON, PORTUGAL`):** `font-mono text-[9.5px] font-medium uppercase tracking-[0.08em] text-[#605F5F]`.
- **Back Tag (`#1 SPIDER-MAN FAN`):** `font-mono text-[9.5px] font-bold uppercase tracking-[0.12em] text-white`.
- **Back Stat Numbers (`4`, `50+`, `36`, `30+`):** `font-heading font-extrabold text-[28px] sm:text-[32px] leading-none tracking-[-0.03em] text-white`.
- **Back Stat Labels:** `font-sans text-[11px] font-medium leading-[1.25] text-white/90`.
- **Back Footer Code (`MO-0036 · valid anywhere with Wi-Fi`):** `font-mono text-[9.5px] tracking-[0.02em] text-white/85`.
- **Flip Button (`Flip ↻`):** `font-mono text-[11.5px] font-medium text-[#2A2926]`.

---

## 10. Colour & Styling Specifications
- **Neon Yellow Lanyard & Pill Tag:** `#D6FF3F` (highlight `#E5FF7A`, edge `#BBE622` for ribbon depth; ink `#2A2926`).
- **Front Card Surface:** `#FFFFFF`, hairline border `rgba(42, 41, 38, 0.08)`, shadow `0 24px 48px -16px rgba(0, 0, 0, 0.16), 0 6px 18px -6px rgba(0, 0, 0, 0.08)`.
- **Live Green Dot (`LISBON, PORTUGAL`):** `#22C55E` with soft halo `#22C55E/25`.
- **Silver Clip Gradient:** `linear-gradient(90deg, #8F9399 0%, #D2D5DB 28%, #F4F5F7 50%, #C4C7CE 76%, #7B7F86 100%)`.
- **Back Card Surface:** `#9D0316` with `radial-gradient(rgba(0,0,0,0.16) 0.75px, transparent 0.75px)` at `4px × 4px`.
- **Back Card Border:** `4px solid #0645A1`.
- **Back Pill (`#1 SPIDER-MAN FAN`):** `#161618` background, `#FFFFFF` text.

---

## 11. Asset Requirements
- **Portrait Image:** `/images/hero-portrait.webp` (already verified & staged in `public/images/hero-portrait.webp`).
- **Barcode Graphic:** Inline precision SVG Code-128 style bar array (zero external asset requests).
- **Spider Emblem Graphic:** Inline high-detail sharp geometric Spider-Man chest emblem SVG (`#0A0A0A`) matching `full_f410.png`.
- **Lanyard Strap & Flip Arrow:** Inline SVG `<path>` + `<textPath>` and crisp `12px` circular arrow icon.

---

## 12. Animation Specifications (GSAP Core, React, Timeline, Performance)
- **GSAP Setup (`gsap` + `@gsap/react`):**
  - Register `useGSAP` at module scope (`gsap.registerPlugin(useGSAP)`).
  - Run all setup inside `useGSAP((context, contextSafe) => { ... }, { scope: containerRef })` for automatic cleanup on unmount.
- **1. Initial Entrance (`gsap.timeline`):**
  - Timeline drops the badge from `entranceOffsetY: -64px` (`-36px` mobile), `opacity: 0`, `rotation: -6°` (`-3.5°` mobile) into rest (`duration: 0.75s`, `ease: "back.out(1.25)"`) while injecting an initial gentle pendulum swing impulse (`vx = 210` desktop / `85` mobile, `omega = -32` / `-14`) so the strap stays cleanly taut downward (`clipY >= anchorY + 24px`) with zero kinking.
- **2. 60fps Coupled Pendulum & Bending Ribbon (`gsap.ticker` + `gsap.quickSetter`):**
  - `gsap.quickSetter(rigRef.current, "x", "px")`, `quickSetter(..., "y", "px")`, `quickSetter(..., "rotation", "deg")` update the card rig without touching React state.
  - Updates SVG strap `<path>` `d` attribute directly (`M anchorX anchorY Q ctrlX ctrlY hingeX hingeY`) every active physics tick so the ribbon dynamically bends and carries `<textPath>` smoothly.
  - Sub-stepped `120Hz` physics integrator (`fixedStep = 1/120`, `totalDt` capped at `0.1s`) ensures true wall-clock swing speed across variable display refresh rates:
    - Horizontal restoring stiffness `kX = 95`, damping `cX = 3.6` ($\zeta \approx 0.18$, producing 4–5 natural pendulum swings across zero).
    - Vertical restoring stiffness `kY = 220`, damping `cY = 12` (quick elastic bounce settle).
    - Card hinge rotational stiffness `kAng = 160`, damping `cAng = 6.0`, coupling horizontal acceleration (`-ax * 0.015`) for authentic double-pendulum tip lag.
    - Auto-sleeps physics ticker updates once settled (`|dx| < 0.06 && |vx| < 0.4 && |dy| < 0.06 && |omega| < 0.4`) for zero idle CPU overhead.
- **3. 3D Flip Tween (`contextSafe`):**
  - `gsap.timeline()` on `flipperRef.current`:
    - `rotationY`: `0 -> 180` (or `180 -> 0`) over `0.52s` with `ease: "back.out(1.25)"`.
    - Micro scale pulse: `scale: 1 -> 1.04 (0.16s, power2.out)` -> `1 (0.36s, power2.inOut)`.
    - Injects gentle pendulum click kick (`vx += ±120`, `omega += ∓24`) matching frames `f363..f396` of the reference video.
- **4. Accessibility (`gsap.matchMedia()`):**
  - When `(prefers-reduced-motion: reduce)` matches, skips drop/pendulum oscillation (immediate rest at `(0, 0, 0deg)`) and reduces flip duration to `0.01s`.

---

## 13. Interaction Specifications
- **Cursor States:** Resting/hover over badge uses `cursor-grab`; active pointer capture uses `cursor-grabbing`; `"Flip ↻"` button uses `cursor-pointer`.
- **Pointer Drag vs Click Disambiguation:**
  - `pointerdown` captures pointer (`setPointerCapture`) and begins tracking recent pointer timestamps/coordinates for release velocity.
  - Dragging pulls the badge within bounded elastic limits (`maxRadius ~ 280px` horizontal, `[-40px, +110px]` vertical relative to rest).
  - On `pointerup`: if total travel `< 6px` and not started inside `"Flip ↻"` button (which handles its own click), triggers `toggleFlip()`; otherwise releases with measured throw velocity `(vx, vy)` into the pendulum simulator!
- **Mobile Touch Support:** Uses `touch-none` on the card drag surface so horizontal/diagonal swinging does not hijack the gesture, while areas outside the card retain smooth vertical page scrolling (`touch-pan-y`).

---

## 14. Transition Specifications
- **Entrance:** `0.85s` `back.out(1.15)` drop + ~1.8s natural pendulum settle.
- **3D Flip:** `0.52s` `back.out(1.25)` `rotateY` with `perspective: 1200px` and `transformStyle: "preserve-3d"`.
- **Flip Button Hover:** `150ms ease-out` `scale(1.04)` + subtle shadow lift.

---

## 15. Responsive Behaviour

| Viewport | Card Dimensions | Lanyard Anchor & Strap | Layout Position |
| :--- | :--- | :--- | :--- |
| **Desktop (`>= 1400×780`)** | `348px × 486px` | Anchor at `y = 0` top edge of page (~`148px` strap) | Right column of 2-col hero, clear top-right corner |
| **Laptop (`1024px–1399px` or `< 780px` tall)** | `322px × 450px` | Anchor at `y = 0` top edge of page (~`128px` strap) | Right column of 2-col hero, stays cleanly above fold |
| **Tablet (`640px–1023px`)** | `320px × 448px` | Top mount inside `pt-[88px]` headroom (`96px` strap) | Centered below stacked hero CTAs |
| **Mobile (`< 640px`, e.g. `390px`)** | `284px × 398px` | Top mount inside `pt-[84px]` headroom (`90px` strap) | Centered below stacked hero CTAs, bounded drag within viewport |

---

## 16. Accessibility Requirements
- Badge container exposes clear accessible region/label; `"Flip ↻"` button is a native `<button type="button">` with `aria-label` (`"Flip badge to see stats back"` / `"Flip badge to front"`) and `aria-pressed={isFlipped}` + visible `focus-visible:ring-2 focus-visible:ring-[#D6FF3F]`.
- Hidden face uses `aria-hidden` (`aria-hidden={isFlipped}` on front, `aria-hidden={!isFlipped}` on back) and `inert` / `pointer-events-none` on the rear face so screen readers and clicks only interact with the visible side!
- Decorative SVG barcode, spider graphic, and strap text carry `aria-hidden="true"`.
- Full `prefers-reduced-motion: reduce` support via `gsap.matchMedia()`.

---

## 17. Technical Implementation Requirements
- Client component (`"use client"`) using `gsap`, `@gsap/react` (`useGSAP`), `next/image`.
- Zero SSR DOM queries (`window`, `document`, `getBoundingClientRect` strictly inside `useGSAP` / `useEffect` / pointer handlers).
- All transforms animated via GPU-accelerated properties (`x`, `y`, `rotation`, `rotationY`, `scale`) with `will-change: transform`.
- Clean `Header.tsx` prop `showCta?: boolean` defaulting to `true` (backwards-compatible across all existing pages).

---

## 18. Dependencies
- `gsap` (`^3.15.1`)
- `@gsap/react` (`^2.1.2`)
- `next/image`
- Existing `Header` (`src/components/navigation/Header.tsx`) and `HeroSection` (`src/components/home/HeroSection.tsx`)

---

## 19. Edge Cases
- **Mid-Swing Re-Grab:** Clicking/grabbing the badge while swinging mid-pendulum immediately freezes velocity and seamlessly transfers control to the user's pointer without snapping.
- **Rapid Double-Flip:** Rapidly clicking `Flip ↻` uses `overwrite: "auto"` on the GSAP `rotationY` tween so mid-flip reversals remain smooth and never lock at `90deg`.
- **Window Resize:** Recomputes ceiling anchor offset cleanly on resize without breaking strap attachment.
- **Narrow Mobile Viewports (`390px`):** Drag clamping keeps the card inside safe screen margins and avoids horizontal page overflow (`overflow-x-hidden` on `#canvas-root`).

---

## 20. Detailed Acceptance Criteria
1. `"Get in touch"` button is completely removed from the top-right corner of the Homepage (`/`), while remaining present on `/work`, `/about`, `/journal`, and `/contact`.
2. `HeroPortrait` is replaced on `/` by `<HangingBadge />` in the top-right hero area, with zero layout shift (`0.000px`) on left hero copy, `"View my work"`, `"Say hello"`, or `Footer` during drag/swing/flip.
3. Lanyard strap and front `"ALL ACCESS"` tag use neon yellow (`#D6FF3F`) with high-contrast dark ink (`#2A2926`), replacing pink.
4. Front card displays Maya Ortiz's photo (`/images/hero-portrait.webp`), `"Maya Ortiz"`, `"Product Designer"`, `"LISBON, PORTUGAL"` live-dot pill, barcode, and `"Flip ↻"` button.
5. Flipped back card displays the red (`#9D0316`) + blue-bordered (`#0645A1`) Spider-Man fan design (`#1 SPIDER-MAN FAN`, 4 bold stats, spider emblem, Wi-Fi footer tag, `"Flip ↻"` button).
6. Dragging and releasing the badge produces realistic curved SVG strap bending, double-pendulum tilt, and smooth damped swing oscillations powered by GSAP (`useGSAP` + `gsap.ticker` + `gsap.quickSetter`).
7. Clicking the card or `"Flip ↻"` flips the badge 180° in 3D (`rotateY`) with subtle pendulum kick.
8. `npx tsc --noEmit`, `npm run lint`, and `npm run build` exit with code `0`, and runtime browser verification confirms visual & animation accuracy across Desktop (`1440×900`) and Mobile (`390×844`).

---

## 21. Testing Requirements
- `npx tsc --noEmit` (Exit code 0)
- `npm run lint` (Exit code 0)
- `npm run build` (Exit code 0)
- Live browser visual & motion inspection on `http://localhost:3000/` (verifying header CTA removal on `/`, preservation on `/about`, desktop ceiling strap alignment, drag/swing physics, 3D flip back card, and mobile `390×844` layout)
