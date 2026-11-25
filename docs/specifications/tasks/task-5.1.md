# Task 5.1: Hero Section Layout & Animated Role Rotator

## 1. Task Overview
Task 5.1 initiates Milestone 5 (Homepage Implementation) by constructing the true homepage hero section (`HeroSection.tsx`) and the animated role rotator component (`RoleRotator.tsx`). In the Snapline reference topology (`https://snapline.framer.website/`), the homepage hero features a striking asymmetric 2-column layout: on the left, an availability badge ("Booking projects for January"), a 3-line display headline with an animated role rotator cycling through professional titles (`[Product Designer]`, `[Design Lead]`, `[Systems Thinker]`), an architectural pink baseline guideline (`#FF3B5C`), verified subhead copy, and dual action buttons (`View my work`, `Say hello`). On the right, the interactive portrait with Figma selection overlay sits seamlessly within the continuous document flow, eliminating the temporary floating card wrapper.

---

## 2. Objective
Implement `HeroSection.tsx`, `RoleRotator.tsx`, and `PinkGuideline.tsx`, integrating them into `src/app/page.tsx` to replace the Milestone 3 temporary primitive showcase. The hero must feature accurate display typography (72px desktop / 52px tablet / 38px mobile), fluid upward role transition cycles every 3 seconds, verified subhead text, exact action buttons with smooth canvas pan routing, and an uncontained resting document architecture.

---

## 3. Scope
- **Hero Section Layout (`src/components/home/HeroSection.tsx`):**
  - Asymmetric 2-column container (60% typography copy on left, 40% portrait column on right).
  - Availability badge (`Booking projects for January`) positioned above headline.
  - 3-line headline with pink accent baseline (`#FF3B5C`).
  - Verified subhead copy ("I design digital products that feel simple to use and easy to trust, helping teams turn complex ideas into clear, calm interfaces.").
  - Dual action buttons: `View my work` (primary black pill with `panTo("/work")`) and `Say hello` (secondary white pill with `panTo("/contact")`).
- **Animated Role Rotator (`src/components/home/RoleRotator.tsx`):**
  - Rotates through 3 professional roles: `Product Designer`, `Design Lead`, `Systems Thinker`.
  - Upward sliding spring text transition every 3000ms inside an `overflow-hidden` container.
  - Includes simulated collaborator cursor pill ("Lena · PM" in `#D6FF3F` lime) riding with the active title.
  - Interactive selection highlight effect (`data-sel="1"` / lime highlight bar).
- **Pink Guideline Component (`src/components/home/PinkGuideline.tsx`):**
  - Architectural Figma baseline guideline rule (`#FF3B5C`, opacity 80%, height 1px) with left drafting overhang (22px–24px) extending to the left of the vertical tick.
  - Vertical alignment tick (1px) positioned 7px–10px to the left of `Maya Ortiz,`, crossing the horizontal baseline with 14px–18px bottom overhang (matching font descenders) and 96px–110px top extension (reaching up towards "Hello, I am").
  - Horizontal rule length dynamically measured to extend past the end of the longest role (`a Product Designer`) by ~36px (`textWidth + 68px`).
- **Homepage Integration (`src/app/page.tsx`):**
  - Remove temporary developer showcase primitives (`CATEGORY FILTER PILLS`, `< All works` backlinks, third button, and premature contact form `<DarkContainer>`).
  - Establish continuous document flow without artificial floating card gutters around resting sections.
- **Module Exports (`src/components/home/index.ts`):**
  - Clean barrel export for `HeroSection`, `RoleRotator`, `PinkGuideline`.

---

## 4. Out-of-Scope Features
- **Handle-Driven Interactive Portrait Resizing & Canvas Dragging:** Handled in Task 5.2 (`HeroPortrait.tsx`).
- **Autonomous Canvas Collaborator Cursors ("Sam · Dev"):** Handled in Task 5.3 (`CollaboratorCursors.tsx`).
- **Client Logos Social Proof Row:** Handled in Task 5.4 (`ClientLogos.tsx`).
- **4-Step Process Section:** Handled in Task 5.5 (`ProcessSection.tsx`).

---

## 5. Reference Website & Screenshots
- **Reference Target:** `https://snapline.framer.website/`
- **Visual Evidence:**
  - Live Reference Capture: [media_1795523179812_52f6f1f7.png](file:///C:/Users/E%20L%20I%20T%20E%20B%20O%20O%20K/.gemini/antigravity/brain/c11f6b27-ac5b-4866-9407-902893bde0c0/.user_uploaded/media_1795523179812_52f6f1f7.png)
  - Desktop Initial Hero: [home-desktop-initial.png](file:///d:/portfolio/docs/research/snapline/screenshots/desktop/home-desktop-initial.png)
  - DOM Extraction: `scratch/ref-diff-audit/ref.html` (lines 200–225)

---

## 6. Component Hierarchy
```text
<HeroSection className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-10">
└── <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
    ├── <div className="lg:col-span-7 flex flex-col items-start"> (Left Column - 60%)
    │   ├── <AvailabilityBadge statusText="Booking projects for January" />
    │   ├── <div className="relative mt-6"> (Headline Container)
    │   │   ├── <h1 className="font-heading tracking-tight leading-[1.08]">
    │   │   │   ├── <span className="text-[#8A8A8A] block text-4xl sm:text-5xl lg:text-[72px] font-medium">Hello, I am</span>
    │   │   │   ├── <span className="text-[#2A2926] block text-4xl sm:text-5xl lg:text-[72px] font-bold">Maya Ortiz,</span>
    │   │   │   └── <div className="flex items-center gap-3 text-4xl sm:text-5xl lg:text-[72px] font-bold">
    │   │   │       <span className="text-[#2A2926]">a</span>
    │   │   │       <RoleRotator roles={["Product Designer", "Design Lead", "Systems Thinker"]} />
    │   │   │   <PinkGuideline /> (1px #FF3B5C baseline rule + vertical tick)
    │   ├── <p className="mt-6 text-base sm:text-lg text-[#605F5F] max-w-xl leading-relaxed">
    │   └── <div className="mt-8 flex flex-wrap items-center gap-3">
    │       ├── <Button variant="primary" href="/work">View my work</Button>
    │       └── <Button variant="secondary" href="/contact">Say hello</Button>
    └── <div className="lg:col-span-5 flex justify-center lg:justify-end"> (Right Column - 40%)
        └── <FigmaSelectionOverlay layerName="maya-portrait.webp" dimensions="180 x 475">
            └── <Image src="/images/hero-portrait.webp" ... />
```

---

## 7. Detailed Visual Specifications

| Element | Property | Measured / Target Value | Evidence Classification | Token / Source |
| :--- | :--- | :--- | :--- | :--- |
| **"Hello, I am"** | `fontSize` / `color` | `72px`–`80px` desktop / `52px` tablet / `38px` mobile, `#8A8A8A` | Measured Value | `ref.html` / `var(--token-pBlEYyBMu)` |
| **"Maya Ortiz,"** | `fontSize` / `color` | `72px`–`80px` desktop / `52px` tablet / `38px` mobile, `#2A2926` | Measured Value | `ref.html` / `var(--token-pipoqxArs)` |
| **"a [Role]"** | `fontSize` / `weight`| `72px`–`80px` desktop / `52px` tablet / `38px` mobile, weight `600` | Measured Value | `ref.html` (`.snp-re`) |
| **Pink Baseline** | `borderColor` / `h` | `#FF3B5C` (opacity 80%), height 1px, left overhang 22px–24px past vertical tick (`-left-7 sm:-left-8`), total width extends ~36px past the end of the longest role (`textWidth + 68px`) | Measured Value | `ref.html` / `home-desktop-initial.png` |
| **Guideline Tick**| `height` / `width` | 1px width, positioned 7px–10px left of `Maya Ortiz,`, crosses baseline: extends 14px–18px below horizontal baseline and 96px–110px above (`h-[64px] sm:h-[80px] md:h-[96px] lg:h-[114px] xl:h-[128px]`, `-bottom-3.5 sm:-bottom-4 lg:-bottom-[18px]`) | Measured Value | `home-desktop-initial.png` (Y: 321 to 434) |
| **Subhead Text** | `fontSize` / `color` | `18.5px` desktop / `16px` mobile, color `#605F5F` (`--token-xMAbJWAhJ`) | Measured Value | `ref.html` / `design-tokens.json` |
| **Primary Button**| `background` / `color`| `#2A2926`, text `#FFFFFF`, rounded-pill | Measured Value | `Button.tsx` (`variant="primary"`) |
| **Secondary Button**| `background` / `border`| `#FFFFFF`, border `rgba(42, 41, 38,0.08)`, text `#2A2926` | Measured Value | `Button.tsx` (`variant="secondary"`) |
| **Hero Portrait Frame** | `width` / `height` | `420px × 525px` desktop (`aspect-ratio: 0.8`), `350px × 438px` tablet, `300px × 375px` mobile | Measured Value | `ref.html` (`.framer-2ibnfq`) |
| **Lena · PM Cursor**| `background` / `text` | `#D6FF3F` (neon lime), text `#2A2926` semibold `12.5px`, `letterSpacing: 0px`, geometric dot separator, `rounded-[7px_7px_7px_2px]` | Measured Value | `ref.html` (`.snp-re-cur b`) |

---

## 8. Layout & Positioning Specifications
- **Grid Layout:** 12-column asymmetric grid (`grid-cols-1 lg:grid-cols-12 lg:gap-12 xl:gap-[60px]`).
  - Left copy column: `lg:col-span-7` (~60% width).
  - Right portrait column: `lg:col-span-5` (~40% width).
- **Container Architecture:** Continuous document flow matching Snapline's root artboard geometry (`w-full max-w-[1776px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-[72px]`).
- **Vertical Spacing:** `pt-6 pb-8 sm:pb-12` (calibrated so that the distance from the top edge of the screen to the top line of the "Get in touch" pill is exactly 30px, and the distance from the bottom line of the "Get in touch" pill to the top line of the portrait picture is identically 30px, while keeping the entire hero section completely in view above the fold).

---

## 9. Typography Specifications
- **Display Heading:** Font `Geist`, weight `600`–`700`, size `72px`–`80px` desktop / `52px` tablet / `38px` mobile, line-height `1.08`, tracking `-0.045em`.
- **Subheadline:** Font `Inter`, weight `400`, size `18.5px` desktop / `16px` mobile, line-height `1.65`.
- **Buttons:** Font `Inter`, weight `600`, size `14px`, tracking `tight`.

---

## 10. Colour & Styling Specifications
- **Primary Text:** `#2A2926`
- **Secondary Gray:** `#605F5F`
- **Prefix Light Gray:** `#8A8A8A`
- **Pink Guideline:** `#FF3B5C`
- **Lime Accent:** `#D6FF3F`

---

## 11. Asset Requirements
- Portrait asset: `/images/hero-portrait.webp` (already staged at `public/images/hero-portrait.webp`).
- SVG collaborator cursor arrow icon.

---

## 12. Animation Specifications
- **Role Rotator Cycle & Timing:** 5-phase collaborative text selection & typewriter replacement simulation:
  1. `idle`: 4.0s (4000ms) hold with caret hidden (`opacity: 0`), Lena PM cursor floating ambiently nearby.
  2. `navigating`: 420ms pre-selection phase where caret appears at the **START** of the text (`textEl.offsetLeft`) and Lena's cursor glides smoothly from idle to the beginning of the word.
  3. `selecting`: 520ms drag-selection phase where Lena's cursor drags across the word from left to right (`textEl.offsetLeft + textEl.offsetWidth * eased`), with the caret and cursor tip pulling the neon lime (`#D6FF3F`) highlight background in 1:1 synchronization.
  4. `selected`: 200ms brief hold of full word selection highlight.
  5. `typing`: Word erased (`""`), highlight reset to `0%`, and character-by-character typewriter streaming at `40ms + Math.random() * 50ms` per character with Lena's cursor and caret riding along with each newly appeared character; as soon as the final character is typed, immediately transitions to `idle` (no end settling pause) and holds for 4000ms.
- **Collaborator Cursor Motion Physics:**
  - Continuous `requestAnimationFrame` lerp loop (`0.07` friction factor).
  - Idle state: programmatically floats and wanders below title using compound sine waves.
  - Navigating state: glides directly to the first letter (`textEl.offsetLeft`).
  - Selecting state: drags across the word synchronized with selection highlight progress.
  - Typing state: snaps to text boundary (`offsetLeft + offsetWidth`) and rides along dynamically with each typed character.
  - Pointer evasion: glides smoothly away if user cursor comes within `120px` radius along repulsion vector.
- **Roles Cycled:** Canonical 4 roles: `["Product Designer", "Design Lead", "UX Researcher", "Prototyper"]`.

---

## 13. Interaction Specifications
- `View my work` button triggers `panTo("/work")` with 1.46s spatial canvas view transition.
- `Say hello` button triggers `panTo("/contact")` with 1.46s spatial canvas view transition.
- Portrait retains Figma dimension badge `180 x 475`.

---

## 14. Transition Specifications
- Button tap scale: `scale(0.98)` on active press.
- Color transitions: `150ms ease-out`.

---

## 15. Responsive Behaviour
- **Desktop (1440px / 1200px):** 2-column side-by-side layout, 72px headline.
- **Tablet (768px):** Single-column stacked layout, portrait centered beneath CTA buttons, 52px headline.
- **Mobile (390px):** Single-column stacked layout, 38px headline, full-width button stack.

---

## 16. Accessibility Requirements
- Heading hierarchy: `<h1>` enclosing the composite title.
- Screen reader friendly text: Full sentence readable without interruption by animated role ticker (`aria-live="polite"` or visually-hidden complete title).
- Focus-visible ring on interactive buttons.

---

## 17. Technical Implementation Requirements
- Zero hydration errors or prerendering crashes in Next.js 16 App Router.
- Clean interval unmount in `RoleRotator.tsx`.

---

## 18. Dependencies
- `@/components/primitives/AvailabilityBadge`
- `@/components/primitives/Button`
- `@/components/primitives/FigmaSelectionOverlay`
- `@/hooks/useCanvasPan`

---

## 19. Edge Cases
- **Rapid Viewport Resizing:** Fluid font scaling via Tailwind responsive classes (`text-4xl sm:text-5xl lg:text-[72px]`).
- **Reduced Motion:** Rotator halts on static primary role ("Product Designer") if `prefers-reduced-motion: reduce` is active.

---

## 20. Detailed Acceptance Criteria
1. `HeroSection.tsx` implements 2-column asymmetric layout without outer floating card wrappers.
2. Headline displays 3-line composite structure: "Hello, I am" (`#8A8A8A`), "Maya Ortiz," (`#2A2926`), and "a [Role]".
3. `RoleRotator.tsx` cycles smoothly every 3s through `Product Designer`, `Design Lead`, `Systems Thinker`.
4. Attached collaborator cursor ("Lena · PM") renders in neon lime `#D6FF3F`.
5. Architectural pink guideline (`#FF3B5C`) renders beneath `Maya Ortiz,` matching the reference site: vertical tick crosses baseline with 14px–18px bottom overhang, horizontal rule has 22px–24px left overhang past the tick, and the horizontal line extends a bit past the length of the longest role (`Product Designer`).
6. Verified subhead copy and two action buttons (`View my work`, `Say hello`) render accurately.
7. Temporary developer showcase primitives (category filter pills and back links) removed from homepage.
8. All quality gates pass (`npx tsc --noEmit`, `npm run lint`, `npm run build`).

---

## 21. Testing Requirements
- Strict TypeScript verification (`npx tsc --noEmit`).
- Strict ESLint verification (`npm run lint`).
- Turbopack production build (`npm run build`).
- Browser verification at `http://localhost:3000/`.
