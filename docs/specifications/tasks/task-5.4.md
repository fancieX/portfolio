# Task Specification: 5.4 Client Logos Social Proof Section

## 1. Task Overview
Task 5.4 implements the Homepage Social Proof Client Logos block (`src/components/home/ClientLogos.tsx`), matching the `Trust` (`framer-6lxo89`) and `Client Row` (`framer-1dnbg79`) structure of `https://snapline.framer.website/`. Positioned inside the Hero Left Column immediately beneath the `"View my work"` and `"Say hello"` CTA row, it displays the uppercase `"TRUSTED BY 50+ TEAMS"` eyebrow above a responsive wrapped row of the 5 client partnership wordmarks (`Northwind`, `Lumen&Co`, `Parcelly`, `Ostra`, `Halcyon`).

---

## 2. Objective
Create `src/components/home/ClientLogos.tsx`, export it via `src/components/home/index.ts`, and wire it into `src/components/home/HeroSection.tsx` so that:
1. All 5 verified client partnership wordmarks (`Northwind`, `Lumen&Co`, `Parcelly`, `Ostra`, `Halcyon`) and the `"Trusted by 50+ teams"` eyebrow render directly below the Hero CTA buttons on Desktop, Tablet, and Mobile.
2. Visual typography, spacing, uppercase eyebrow letter spacing (`0.14em`), muted gray tint, smooth hover contrast transitions, and `[0.16, 1, 0.3, 1]` entrance motion match the live reference 1:1.
3. On narrower/mobile viewports (`390px`), the 5 client items wrap naturally across 2 horizontal rows with zero horizontal overflow.

---

## 3. Scope
- **New Component (`src/components/home/ClientLogos.tsx`):**
  - Renders the `"Trusted by 50+ teams"` eyebrow (`11px` uppercase, `0.14em` tracking, `#8A8A8A`) and the 5 client partnership wordmarks (`Northwind`, `Lumen&Co`, `Parcelly`, `Ostra`, `Halcyon`).
  - Supports customizable `eyebrow`, `clients`, and `className` props with verified defaults so future Stage 2 personalization remains trivial.
  - Implements smooth muted-to-ink color transitions (`#8A8A8A` / `#605F5F` → `#2A2926`) on hover (`200ms ease-out`).
  - Implements the verified Framer entrance animation (`opacity: 0 → 1`, `translateY(24px) → 0`, `0.9s`, `0.4s` delay, `cubic-bezier(0.16, 1, 0.3, 1)`) respecting `prefers-reduced-motion`.
- **Homepage Hero Integration (`src/components/home/HeroSection.tsx` & `src/components/home/index.ts`):**
  - Mount `<ClientLogos />` inside the Hero Left Column (`Copy`) directly beneath the Dual Action Buttons (`View my work` / `Say hello`), matching the reference DOM placement.
  - Export `ClientLogos`, `ClientLogosProps`, `ClientLogoItem`, and `DEFAULT_CLIENT_LOGOS` from `src/components/home/index.ts`.
- **Stylesheet Addition (`src/styles/globals.css`):**
  - Add reusable `heroTrustEnter` CSS keyframe rule (`0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both`) gated by `@media (prefers-reduced-motion: no-preference)`.

---

## 4. Out-of-Scope Features
- **Click-Through Navigation / Client Case Study Routing on Logos:** Client wordmarks on `https://snapline.framer.website/` are static non-linked RichText showcase labels with subtle visual hover emphasis (no `href` routes). Clicking client case studies belongs strictly to Milestone 6 (`Work` grid) and Milestone 7 (`/work/[slug]`).
- **4-Step Process Section & Featured Works Grid:** Implemented separately in Tasks 5.5 and 5.6.
- **Right-Column Interactive Hero Portrait (`HeroPortrait.tsx`):** Implemented in Tasks 5.2/5.3; remains untouched.

---

## 5. Reference Website & Screenshots
- **Reference URL:** `https://snapline.framer.website/` (Hero Copy Column → `data-framer-name="Trust"` `.framer-6lxo89` & `data-framer-name="Client Row"` `.framer-1dnbg79`)
- **Local Visual Evidence:**
  - `docs/research/snapline/screenshots/tablet/home-tablet-768px.png` (clearly shows `TRUSTED BY 50+ TEAMS` and `Northwind  Lumen&Co  Parcelly  Ostra  Halcyon` immediately below CTAs and above portrait)
  - `docs/research/snapline/screenshots/desktop/home-desktop-initial.png`

---

## 6. Component Hierarchy
```text
HeroSection.tsx (src/components/home/HeroSection.tsx)
└── Left Column (flex-col items-start)
    ├── AvailabilityBadge ("Booking projects for January")
    ├── Composite Display Headline + RoleRotator
    ├── Subhead Description
    ├── Dual Action Buttons ("View my work", "Say hello")
    └── ClientLogos (src/components/home/ClientLogos.tsx) [data-testid="client-logos"]
        ├── <p data-testid="client-logos-eyebrow"> ("Trusted by 50+ teams" / uppercase)
        └── <ul role="list" data-testid="client-logos-row">
            ├── <li data-testid="client-logo-northwind">Northwind</li>
            ├── <li data-testid="client-logo-lumen-co">Lumen&Co</li>
            ├── <li data-testid="client-logo-parcelly">Parcelly</li>
            ├── <li data-testid="client-logo-ostra">Ostra</li>
            └── <li data-testid="client-logo-halcyon">Halcyon</li>
```

---

## 7. Detailed Visual Specifications

| Element | Property | Measured / Target Value | Evidence Classification | Source |
| :--- | :--- | :--- | :--- | :--- |
| **Wrapper (`Trust`)** | `padding-top` / `gap` | `padding-top: 18px` (`pt-[18px]`), vertical `gap: 12px` (`gap-3`), parent column spacing `mt-2 sm:mt-3` (with flex column layout) | Measured Value | `.framer-y4RDb .framer-6lxo89` |
| **Eyebrow** | Content / Case | `"Trusted by 50+ teams"`, CSS `uppercase` | Verified Observation | `framer-1wss2kb` |
| **Client Row (`Client Row`)** | `display` / `wrap` / `gap` | `display: flex; flex-wrap: wrap; justify-content: flex-start; align-items: center; gap: 16px 26px` (`gap-x-[26px] gap-y-3` wrapping cleanly into 2 rows at 390px) | Measured Value | `.framer-mF4g0.framer-1dnbg79` |
| **Client Items** | Labels (5) | `Northwind`, `Lumen&Co`, `Parcelly`, `Ostra`, `Halcyon` | Verified Observation | Live Framer SSR DOM |

---

## 8. Layout & Positioning Specifications
- Mounted as the bottom block inside Hero Left Column (`flex flex-col items-start`), spanning `w-full`.
- Hero outer 2-column wrapper uses `lg:items-start` so that on desktop (`≥1024px`) the right-column `HeroPortrait` top border remains anchored at `30px` below the bottom edge of the top-right `"Get in touch"` CTA (`6px` bottom half of `h-14` header + `24px` `pt-6` on HeroSection), matching the `30px` top margin above `"Get in touch"` (`24px` `pt-6` on `<main>` + `6px` top half of `h-14` header) identically (`30px === 30px`).
- `padding: 18px 0 0 0` (`pt-[18px]`) plus top separation from Dual Action Buttons (`mt-6 sm:mt-7` total visual gap matching Framer's `26px` column gap + `18px` padding-top = `~44px` separation between CTA buttons and eyebrow).
- `justify-start items-start` container alignment; `flex-wrap justify-start items-center` logo row alignment so items sit flush-left aligned with the hero headline, description, and CTA buttons.

---

## 9. Typography Specifications

| Element | Font Family | Size | Weight | Line Height | Letter Spacing | Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | `font-sans` (`Geist`) | `11px` | `400` (`font-normal`) | `1.2` (`13.2px`) | `0.14em` | `uppercase` |
| **Client Wordmarks** | `font-sans` (`Geist-Medium` 500) | `15px` | `500` (`font-medium`) | `1.55` (`23.25px`) | `-0.02em` | `none` (`whitespace-nowrap`) |

*(Implementation Note: Local font manifest in [fonts.ts](file:///d:/portfolio/src/styles/fonts.ts) bundles `Geist` in `400`/`500`/`600` and `Inter` in `700` only; using `font-sans font-medium` ensures authentic `500` weight rendering rather than unintended `700` bold fallback.)*

---

## 10. Colour & Styling Specifications
- **Eyebrow Text Color:** `#8A8A8A` (`--token-pBlEYyBMu`, Faint Text).
- **Client Wordmark Color (Rest):** `#605F5F` (`--token-xMAbJWAhJ`, Muted Gray Tint — note `docs/implementation-plan.md` cited `#8A8A8A` in early milestone notes; `#605F5F` is verified from the live DOM CSS variable `--extracted-1w3ko1f: var(--token-xMAbJWAhJ)` matching `home-tablet-768px.png`, with subtle opacity `opacity-85 hover:opacity-100` bridging smoothly from lighter gray to `#2A2926` dark ink on hover).
- **Client Wordmark Color (Hover):** `#2A2926` (`--color-text-primary` Ink), `opacity-100`.
- **Container Background / Border:** Transparent (`none`), sitting directly on the `#F4F4F4` resting canvas.

---

## 11. Asset Requirements
- No external bitmap images or `.svg` files required. The live reference renders all 5 client brand marks as pure crisp typographic wordmarks (`Inter-Medium` / `Geist-Medium` `500`, `15px`, `-0.02em` tracking).

---

## 12. Animation Specifications
- **Entrance / Appear Animation (Matched to Framer `Y` / `_r`):**
  - **Element:** Root `<div data-testid="client-logos">`
  - **Initial State:** `opacity: 0; transform: translateY(24px);`
  - **Final State:** `opacity: 1; transform: translateY(0);`
  - **Trigger:** Mount / viewport entry
  - **Duration:** `0.9s` (`900ms`)
  - **Delay:** `0.4s` (`400ms`)
  - **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`
  - **Fill Mode:** `both`
  - **Reduced Motion:** Under `@media (prefers-reduced-motion: reduce)`, animation is skipped and element renders immediately at `opacity: 1; transform: none;`.

---

## 13. Interaction Specifications
- **Hover State on Each Client Wordmark:**
  - Rest: `text-[#605F5F]/85` (visually balanced `#706F6F`–`#8A8A8A` muted gray).
  - Hover (`hover:`): transitions smoothly to `text-[#2A2926]` (100% opacity dark ink) over `200ms ease-out`.
  - Cursor: `cursor-default` (non-navigating display wordmarks, `select-none`).

---

## 14. Transition Specifications
- Color & opacity hover transition on client items: `transition-colors duration-200 ease-out` (plus `transition-[color,opacity]`).
- Entrance animation keyframe class `.animate-hero-trust`: `animation: heroTrustEnter 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both`.

---

## 15. Responsive Behaviour

| Viewport Tier | Width | Layout Structure | Wrapping & Alignment |
| :--- | :--- | :--- | :--- |
| **Desktop** | `1440×900` (`≥ 1200px`) | Bottom of Hero Left Column beside `HeroPortrait` | All 5 logos sit in **1 single horizontal row**, flush-left aligned (`gap-x-[26px]`). |
| **Laptop** | `1024×768` | Left Column beside `HeroPortrait` (`lg:flex-row`) | All 5 logos remain in **1 horizontal row** (`454px+` column width easily accommodates `~397px` total width). |
| **Tablet** | `768×1024` | Hero stacks vertically; `ClientLogos` sits directly below CTAs and above `HeroPortrait` | All 5 logos fit in **1 horizontal row**, matching `home-tablet-768px.png`. |
| **Mobile** | `390×844` | Single vertical stack (`px-4`, `358px` available width) | `flex-wrap` wraps the 5 logos cleanly into **2 rows** (`Northwind`, `Lumen&Co`, `Parcelly` on Row 1; `Ostra`, `Halcyon` on Row 2) with `gap-y-2.5` and zero overflow. |

---

## 16. Accessibility Requirements
- Root wrapper uses `role="region"` with `aria-labelledby={eyebrowId}` (or `aria-label="Trusted clients"`).
- Eyebrow uses `<p id={eyebrowId}>` and client items render inside semantic `<ul role="list">` / `<li>` so screen readers announce the exact list count (`5 items`).
- Text contrast on hover reaches `#2A2926` against `#F4F4F4` (~13:1 AAA contrast).
- `prefers-reduced-motion: reduce` disables entrance translation cleanly.

---

## 17. Technical Implementation Requirements
- **Component Path:** `src/components/home/ClientLogos.tsx` (supports SSR/RSC cleanly — no mandatory browser-only hooks needed; optional props allow pure declarative rendering or Stage 2 data swapping).
- **Exports:** Export `ClientLogos`, `ClientLogosProps`, `ClientLogoItem`, and `DEFAULT_CLIENT_LOGOS` via `src/components/home/index.ts`.
- **Integration:** Import and render `<ClientLogos className="mt-6 sm:mt-7" />` inside `src/components/home/HeroSection.tsx` right after the CTA buttons block.
- **CSS Keyframes:** Define `@keyframes heroTrustEnter` inside `src/styles/globals.css` wrapped in `@media (prefers-reduced-motion: no-preference)`.

---

## 18. Dependencies
- **Prerequisite Tasks:** Task 5.1 (`MERGED`), Task 5.2 (`MERGED`), Task 5.3 (`MERGED`).
- **Packages / Styling:** React 19, Tailwind CSS v4 (`@tailwindcss/postcss`), local Geist fonts (`var(--font-geist)`). No new npm dependencies required.

---

## 19. Edge Cases
- **Custom / Empty `clients` Prop:** If an empty array is passed, render safely or fall back gracefully (`if (items.length === 0) return null`).
- **Very Long Client Names / Small 320px Viewports:** `flex-wrap` ensures items wrap cleanly to additional lines instead of causing horizontal page overflow (`overflow-x`).
- **Reduced Motion Users:** Content remains immediately readable (`opacity: 1`) without waiting 400ms.

---

## 20. Detailed Acceptance Criteria
- [ ] `src/components/home/ClientLogos.tsx` exists and exports `ClientLogos` + `DEFAULT_CLIENT_LOGOS` via `src/components/home/index.ts`.
- [ ] Homepage hero renders `"TRUSTED BY 50+ TEAMS"` eyebrow (`11px`, `0.14em` tracking, `#8A8A8A`) directly below `"View my work"` and `"Say hello"` buttons.
- [ ] All 5 verified partner names render in exact order: `Northwind`, `Lumen&Co`, `Parcelly`, `Ostra`, `Halcyon` (`15px`, medium weight `500`, `-0.02em` tracking).
- [ ] Wordmarks render with muted gray tint (`#605F5F`/muted opacity) at rest and smoothly transition to dark ink (`#2A2926`) on hover.
- [ ] Desktop (`1440px`) and Tablet (`768px`) display all 5 logos in a single horizontal row; Mobile (`390px`) wraps cleanly across 2 rows with zero horizontal overflow.
- [ ] Entrance motion (`opacity: 0 → 1`, `translateY(24px) → 0`, `0.9s`, `0.4s` delay, `cubic-bezier(0.16, 1, 0.3, 1)`) plays once on load and disables cleanly under `prefers-reduced-motion: reduce`.
- [ ] Zero TypeScript errors (`npx tsc --noEmit`), zero ESLint errors (`npx eslint src`), successful Turbopack production build (`npm run build`), and HTTP 200 verification on `/`.

---

## 21. Testing Requirements
1. Run `npx tsc --noEmit` -> exit code `0`.
2. Run `npx eslint src` -> exit code `0`.
3. Run `npm run build` -> exit code `0`.
4. Verify `http://localhost:3000/` responds HTTP `200`, renders `[data-testid="client-logos"]` and all 5 client items cleanly across Desktop (`1440×900`), Tablet (`768×1024`), and Mobile (`390×844`) with zero console errors or horizontal overflow.
