# Task Specification: 5.5 4-Step Process Section

## 1. Task Overview
Task 5.5 implements the **4-Step Process Section** (`src/components/home/ProcessSection.tsx`) and its interactive scroll-driven **Figma Prototype Flow Connector Overlay** (`src/components/home/PrototypeFlowOverlay.tsx`), recreating the `Process` (`framer-histfi`) and `Flow` (`framer-1lg0bx3`) section of `https://snapline.framer.website/`. Mounted below the Hero section inside `src/app/page.tsx`, it presents the heading `"How I shape every design project"`, subtitle `"A clear path from the first conversation to a product that is ready to ship, wired up like a prototype."`, and 4 alternating staggered step cards (`01 / RESEARCH`, `02 / DESIGN`, `03 / DEVELOP`, `04 / HANDOFF`) connected dynamically by scroll-scrubbed prototype noodles with traveling neon lime dots (`#D6FF3F`) and `"On click"` pills.

---

## 2. Objective
Create `src/components/home/ProcessSection.tsx` (and sub-primitive `src/components/home/PrototypeFlowOverlay.tsx`), stage the 4 verified reference step illustrations into `public/images/process/`, export from `src/components/home/index.ts`, and mount `<ProcessSection />` inside `src/app/page.tsx` with 1:1 visual, behavioral, and responsive parity.

---

## 3. Scope
- **New Component (`src/components/home/ProcessSection.tsx`):**
  - Renders the Process section header (`"How I shape every design project"` with word-by-word masked reveal + signature `#FF3B5C` Figma baseline guideline rule & vertical tick + subtitle `"A clear path from the first conversation to a product that is ready to ship, wired up like a prototype."`).
  - Renders 4 staggered rows (`01 / RESEARCH`, `02 / DESIGN`, `03 / DEVELOP`, `04 / HANDOFF`) inside a `Flow` container.
  - Alternating desktop layout (`min-[861px]`): Row 1 & Row 3 align left (`justify-start`), Row 2 & Row 4 align right (`justify-end`), each card occupying `44%` width with sharp `0px` (`rounded-none`) paper surface (`#FFFFFF`) and horizontal 50/50 internal split (`Text` left, `Pic` right).
  - Mobile/Tablet layout (`<= 860px`): cards span `100%` width and internal layout switches to Stacked variant (text above, `200px` tall image strip below) with `70px` row spacing so vertical prototype connectors draw cleanly between stacked rows.
  - Press micro-interaction on cards (`active:scale-[0.97]` with `0.5s cubic-bezier(0.34, 1.56, 0.64, 1)` spring feel).
- **Prototype Connector Overlay (`src/components/home/PrototypeFlowOverlay.tsx`):**
  - Reproduces Snapline's `.snp-pf` SVG overlay (`position: absolute; inset: 0; pointer-events: none; z-index: 3` above card borders so circular start ports sit crisp and unclipped while clicks pass through seamlessly) matching live reference `wn` component logic.
  - Strict Mode safe SVG lifecycle: clears `svgEl.replaceChildren()` on mount/unmount and guards async `document.fonts.ready` resolution with a `cancelled` flag so duplicate/orphan connector groups never persist.
  - Applies initial `strokeDasharray`, `strokeDashoffset`, `#D6FF3F` dot coordinates/opacity, and arrowhead opacity immediately on mount/measure (so unreached off-screen wires never appear pre-drawn at `scrollY = 0`).
  - Uses an `IntersectionObserver`-gated continuous `requestAnimationFrame` loop reading live card/host `getBoundingClientRect()` positions directly against `window.innerHeight * 0.72` with zero stacked damping lag on top of Lenis inertial scroll.
- **Global Smooth Scrolling (`src/components/canvas/SmoothScrollProvider.tsx` + `lenis` & `src/app/layout.tsx`):**
  - Installs `lenis` (`^1.3.29`) integrated cleanly in root `layout.tsx` (`lerp: 0.085`, `smoothWheel: true`, `autoRaf: true`, automatic route-change reset `scrollTo(0, { immediate: true })`, disabled automatically when `prefers-reduced-motion: reduce`), plus `overflow-x-clip` on `#canvas-root` so no implicit `overflow-y: auto` scroll container forms.
- **Staged Local Assets (`public/images/process/`):**
  - `step-01-research.webp`, `step-02-design.webp`, `step-03-develop.webp`, `step-04-handoff.webp` downloaded directly from the reference CDN URLs.
- **Homepage Integration (`src/app/page.tsx` & `src/components/home/index.ts`):**
  - Render `<ProcessSection />` between `<HeroSection />` and `<Footer />` in `src/app/page.tsx`.

---

## 4. Out-of-Scope Features
- **Featured Works & Journal Teaser Sections on Homepage:** Scoped strictly to Task 5.6.
- **About / Services Sections on Homepage:** Not part of Task 5.5 scope.
- **Modal / Route Transitions when Clicking Process Cards:** Reference process cards have `cursor: pointer` + `scale: 0.97` press tactile feedback without external route links.

---

## 5. Reference Website & Screenshots
- **Reference URL:** `https://snapline.framer.website/` (`data-framer-name="Process"`, `.framer-histfi`, `.framer-1lg0bx3`, `.framer-TEu6n`, `.snp-pf`)
- **Research References:** `docs/research/snapline/responsive-analysis.md`, `docs/research/snapline/interaction-matrix.md`, `docs/research/snapline/asset-inventory.csv`

---

## 6. Component Hierarchy
```text
src/app/page.tsx
└── <main>
    ├── <Header />
    ├── <HeroSection />
    ├── <ProcessSection /> (src/components/home/ProcessSection.tsx)
    │   ├── <div data-testid="process-header">
    │   │   ├── <h2>How I shape every design project</h2> (word-by-word reveal)
    │   │   └── <p>A clear path from the first conversation...</p>
    │   └── <div data-testid="process-flow" className="relative flex flex-col gap-[70px] min-[861px]:gap-[46px] xl:gap-[70px]">
    │       ├── Row 1 (justify-start) -> ProcessStepCard ("01 / RESEARCH") [data-process-step]
    │       ├── Row 2 (min-[861px]:justify-end) -> ProcessStepCard ("02 / DESIGN") [data-process-step]
    │       ├── Row 3 (justify-start) -> ProcessStepCard ("03 / DEVELOP") [data-process-step]
    │       ├── Row 4 (min-[861px]:justify-end) -> ProcessStepCard ("04 / HANDOFF") [data-process-step]
    │       └── <PrototypeFlowOverlay /> (src/components/home/PrototypeFlowOverlay.tsx)
    └── <Footer />
```

---

## 7. Detailed Visual Specifications

| Element | Property | Measured / Target Value | Evidence Classification | Reference Token / Selector |
| :--- | :--- | :--- | :--- | :--- |
| **Section Wrapper (`Process`)** | `padding` / `gap` | Vertical padding `py-[70px] md:py-[72px] lg:py-[108px] xl:py-[130px]`, header-to-flow `gap-12 sm:gap-[56px]`, `w-full` | Measured Value | `.framer-histfi` |
| **Header Block (`Head`)** | `gap` | `14px` vertical (`gap-[14px]`) | Measured Value | `.framer-478m0l` |
| **Flow Stack (`Flow`)** | `gap` | `70px` stacked (`<=860px`), `46px` (`861–1439px`), `70px` (`>=1440px`) | Measured Value | `.framer-1lg0bx3` |
| **Step Row** | `width` / `alignment` | Row 1 & 3: `justify-start`; Row 2 & 4: `min-[861px]:justify-end` | Measured Value | `.framer-11u1hmg`, `.framer-hl3mea` |
| **Step Card (`Wide`)** | `width` / `minHeight` / `radius` | `w-full min-[861px]:w-[44%]`, `min-h-[250px]`, `rounded-none` (`0px` corners), `bg-[#FFFFFF]`, `flex-row` | Measured Value | `.framer-TEu6n.framer-v-1mxgnlj`, `.framer-52mmlc` |
| **Step Card (`Stacked` <=860px)** | `direction` / image height | `flex-col`, text full-width top, image strip `h-[200px]` bottom, `rounded-none` | Measured Value | `.framer-TEu6n.framer-v-lra1gg` |
| **Heading Guideline** | `#FF3B5C` baseline + tick | Horizontal baseline rule spanning full container with matching ~5–6px clearance below heading baseline and ~5–6px left of `'H'` vertical stem | Measured Value | `ref_process_10.png`, `final_step_14.png` |
| **Card Text Pane** | `padding` / `justify` | `p-6` (`24px`), `justify-between`, copy inner `gap-[10px]` | Measured Value | `.framer-1m3keqv`, `.framer-6zvgtl` |

---

## 8. Layout & Positioning Specifications
- Mounted cleanly inside `<main>` flow in `src/app/page.tsx` between `<HeroSection />` and `<Footer />`.
- Horizontal page padding inherited consistently from `<main>` (`px-4 sm:px-8 lg:px-14 xl:px-[72px]`, `max-w-[1776px]`).
- `PrototypeFlowOverlay` sits `pointer-events-none absolute inset-0 z-[3]` over the `Flow` container while cards sit at `z-[2]` (`relative`), ensuring SVG prototype wires never block card pointer interaction while keeping start-port circles unclipped along card edges (`overflow-visible` SVG).

---

## 9. Typography Specifications

| Element | Font Family | Sizes (Mobile -> Tablet -> Desktop -> XL) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Section Heading** | `font-heading` (`Geist`) | `34px` -> `34px` -> `43px` -> `52px` | `600` (`font-semibold`) | `1.08` | `-0.045em` |
| **Section Subtitle** | `font-sans` (`Geist`) | `15px` (all breakpoints) | `400` (`font-normal`) | `1.55` | `0em` |
| **Step Index Label** | `font-mono` / `font-sans` | `11px`, uppercase (`01 / RESEARCH`..`04 / HANDOFF`) | `500` (`font-medium`) | `1.2` | `0.14em` |
| **Card Title** | `font-heading` (`Geist`) | `19px` (`<1200px`) -> `20px` (`>=1200px`) | `600` (`font-semibold`) | `1.25` | `-0.03em` |
| **Card Body Copy** | `font-sans` (`Geist`) | `13px` | `400` (`font-normal`) | `1.5` | `0em` |
| **Connector `"On click"` Tag** | `font-sans` | `11px` | `500` | `1em` | `0em` |

*(Acceptance Criterion 1 compliance: step indices `01`, `02`, `03`, `04` render cleanly in monospace `font-mono` tabular style within `01 / RESEARCH`..`04 / HANDOFF`.)*

---

## 10. Colour & Styling Specifications
- **Heading & Card Titles:** `#2A2926` (Primary Ink)
- **Heading Baseline Guideline:** `#FF3B5C` (`opacity-80` 1px horizontal baseline rule + vertical tick left of `'H'`)
- **Subtitle, Card Description, `"On click"` Connector Text:** `#605F5F` (Muted Body Ink)
- **Step Label (`01 / RESEARCH` etc.):** `#8A8A8A` (Faint Label Ink)
- **Card Surface:** `#FFFFFF` (`rounded-none`, subtle borderless artboard styling)
- **Image Frame Placeholder Backing:** `#ECECEC`
- **Connector Wire Stroke & Arrowhead & Start Stroke:** `#0A0A0A` (`1.6px`, `strokeLinecap="round"`)
- **Start Port Fill:** `#FFFFFF` (`r=4` / `r=5`, `#0A0A0A` stroke)
- **Traveling Pulse Dot:** `#D6FF3F` (Neon Lime fill, `#0A0A0A` `1.5px` stroke)

---

## 11. Asset Requirements
Staged locally in `public/images/process/` from the verified Framer CDN sources:
1. `/images/process/step-01-research.webp` (`nbzOR4Y2CnY0rDNRpz81Pm7n7b8.webp`, Step 01)
2. `/images/process/step-02-design.webp` (`ETTOdGhH4S9J4yleQbG0Inbi0.webp`, Step 02)
3. `/images/process/step-03-develop.webp` (`GR0CsvOIEO2bUzD9HTHeCKPgcU4.webp`, Step 03)
4. `/images/process/step-04-handoff.webp` (`JIidvP0MuTNYUZZr0VAwe5EWH78.webp`, Step 04)

---

## 12. Animation Specifications
1. **Heading Word Reveal:** Each word animates from `opacity: 0; translateY(30px)` -> `opacity: 1; translateY(0)` over `0.6s cubic-bezier(0.16, 1, 0.3, 1)` with `40ms` per-word stagger and `50ms` initial delay, triggered once via `IntersectionObserver` (`threshold: 0.15`).
2. **Subtitle Reveal:** `opacity: 0; translateY(24px)` -> `opacity: 1; translateY(0)` over `0.9s cubic-bezier(0.16, 1, 0.3, 1)`, triggered once via `IntersectionObserver`.
3. **Prototype Wire Scroll-Scrub Draw (`.snp-pf`):**
   - Strictly clears `svgEl.replaceChildren()` on effect mount & cleanup and guards async `document.fonts?.ready?.then` callbacks with a `cancelled` flag to prevent duplicate React Strict Mode connector groups.
   - Executes initial geometry measurement & `strokeDashoffset` / `dot` / `arrow` assignment synchronously on mount so unreached wires remain hidden (`strokeDashoffset = totalLength`) before scrolling.
   - Runs an `IntersectionObserver`-gated continuous `requestAnimationFrame` loop while intersecting, reading live card & host `getBoundingClientRect()` positions directly against `window.innerHeight * 0.72`: `progress = clamp(0, 1, (window.innerHeight * 0.72 - topInViewport) / (verticalSpan + 120))` (zero additional smoothing lag stacked atop Lenis `lerp: 0.085`).
   - `#D6FF3F` pulse dot displays strictly while drawing (`0.01 < p < 0.99`) and arrowhead reveals cleanly at completion (`p >= 0.99`).
   - Reduced Motion: immediately sets `p = 1` so full connectors and arrowheads are static without animation, and disables Lenis smooth wheel.

---

## 13. Interaction Specifications
- **Card Press Tactile Response:** Each step card has `cursor-pointer select-none` and scales smoothly to `scale-[0.97]` while pressed (`active:scale-[0.97]`), springing back cleanly via `transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]`.
- **Keyboard Focus:** Step cards support `tabIndex={0}` with visible `#D6FF3F` `focus-visible` ring.

---

## 14. Transition Specifications
- Card press transform: `transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]`
- Arrowhead reveal: `transition-opacity duration-200`
- Subtitle & heading word entrance: `cubic-bezier(0.16, 1, 0.3, 1)`

---

## 15. Responsive Behaviour

| Viewport Tier | Width | Card Width & Alignment | Card Internal Layout | Connector Wire Geometry |
| :--- | :--- | :--- | :--- | :--- |
| **XL Desktop** | `1440px+` | `44%` width; Row 1/3 left, Row 2/4 right | Horizontal 50/50 split (`min-h-[250px]`), gap `70px` | Orthogonal cubic Bezier curve from inner edge center to top center of next card (`M sx,sy C ex,sy ex,sy ex,ey`) |
| **Desktop / Laptop** | `861px–1439px` | `44%` width; alternating left/right | Horizontal 50/50 split (`min-h-[250px]`), gap `46px` | Same alternating Bezier wire |
| **Tablet / Narrow** | `768px–860px` | `100%` width stacked | Stacked (text top, `200px` image bottom), gap `70px` | Straight centered vertical line (`M sx,sy L ex,ey`) with `"On click"` badge |
| **Mobile** | `390px` | `100%` width stacked | Stacked (`19px` card heading, `13px` body, `200px` image strip), zero horizontal overflow | Straight vertical connector + `#D6FF3F` pulse dot |

---

## 16. Accessibility Requirements
- Semantic `<section aria-labelledby={headingId} data-testid="process-section">` wrapper.
- Step list rendered with clean semantic headings/paragraphs; SVG prototype overlay strictly marked `aria-hidden="true"` and `pointer-events-none`.
- All 4 images carry descriptive `alt` text (`alt=""` decorative or descriptive alt text per step) with `next/image` `sizes`.
- Complete `prefers-reduced-motion: reduce` support: reveals appear instantly (`opacity: 1`) and connectors render completed (`p = 1`).

---

## 17. Technical Implementation Requirements
- **Files:**
  - `src/components/home/ProcessSection.tsx`
  - `src/components/home/PrototypeFlowOverlay.tsx`
  - `src/components/home/index.ts` (export `ProcessSection`, `PrototypeFlowOverlay`, `DEFAULT_PROCESS_STEPS`, and types)
  - `src/components/canvas/SmoothScrollProvider.tsx` & `src/components/canvas/index.ts` (Lenis smooth scroll provider)
  - `src/app/layout.tsx` (wrap app inside `<SmoothScrollProvider>`)
  - `src/components/navigation/Footer.tsx` (`Back to top ↑` synced cleanly with Lenis `scrollTo(0)`)
  - `src/app/page.tsx` (mount `<ProcessSection />` below `<HeroSection />`)
  - `public/images/process/step-01-research.webp` .. `step-04-handoff.webp`
- Follow strict TypeScript (`tsc --noEmit` 0 errors) and React 19 ESLint rules (no `setState` synchronously inside `useEffect` body).

---

## 18. Dependencies
- **Prerequisite Tasks:** Task 3.2 (`MERGED`), Task 5.1–5.4 (`MERGED`).
- **Libraries:** `lenis` (`^1.3.29`), Next.js `next/image`, React 19, Tailwind CSS v4.

---

## 19. Edge Cases
- Dynamic height changes (fonts loading / image loading / window resize) cancel stale mount promises (`cancelled = true`) and recalculate SVG paths accurately on resize without duplicating connector `<g>` nodes.
- `#canvas-root` uses `overflow-x-clip` instead of `overflow-x-hidden` so CSS does not compute an implicit `overflow-y: auto` nested scroll container alongside Lenis `window` scrolling.
- `prefers-reduced-motion: reduce` renders full drawn wires and visible text immediately.
- Mobile narrow viewports (`<= 390px`) stack cleanly with `min-[861px]:w-[44%]` avoiding cramped 2-column wrapping.

---

## 20. Detailed Acceptance Criteria
- [ ] `ProcessSection.tsx` and `PrototypeFlowOverlay.tsx` implemented and exported cleanly via `src/components/home/index.ts`.
- [ ] Section renders `"How I shape every design project"` headline framed by the signature `#FF3B5C` baseline guideline + vertical tick, and subtitle `"A clear path from the first conversation to a product that is ready to ship, wired up like a prototype."`.
- [ ] All 4 steps render with monospace numbers (`01 / RESEARCH`, `02 / DESIGN`, `03 / DEVELOP`, `04 / HANDOFF`), sharp `0px` (`rounded-none`) rectangular card corners, verified titles/descriptions, and local WebP artwork (`/images/process/step-01..04*.webp`).
- [ ] Desktop (`> 860px`) renders `44%` alternating left/right stepped rows wired with cubic Bezier prototype noodles (`#0A0A0A`, `#D6FF3F` dot active only during draw `0.01 < p < 0.99`, zero pre-drawn duplicate ghost lines).
- [ ] Tablet/Mobile (`<= 860px`) stack cleanly at `100%` width (`Stacked` variant with `200px` bottom image) wired with vertical lines and zero horizontal scroll.
- [ ] Mounted cleanly inside `src/app/page.tsx` below `<HeroSection />`.
- [ ] Zero TypeScript errors, zero ESLint errors, passing Turbopack `npm run build`, and `HTTP 200` on `/`.

---

## 21. Testing Requirements
1. Run `npx tsc --noEmit` -> exit code `0`.
2. Run `npx eslint src` -> exit code `0`.
3. Run `npm run build` -> exit code `0`.
4. Verify `http://localhost:3000/` returns `HTTP 200` containing `How I shape every design project`, `01`, `RESEARCH`, `02`, `DESIGN`, `03`, `DEVELOP`, `04`, `HANDOFF`, and all 4 staged image assets return `HTTP 200`.
