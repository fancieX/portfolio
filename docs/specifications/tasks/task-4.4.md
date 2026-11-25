# Task 4.4: Global Page Footer & Lisbon Time Synchronization

## 1. Task Overview
Task 4.4 implements the global shared footer component (`Footer.tsx`) and the real-time Lisbon clock hook (`useLisbonTime.ts`) for the Snapline developer portfolio. In the reference topology (`https://snapline.framer.website/`), every primary artboard terminates in an elegant dark container (`#2A2926`) featuring an inquiry callout banner ("Let's work together."), a 3-column sitemap directory (`Pages`, `Info`, `Social`), a live synchronized local time indicator for Lisbon (`Europe/Lisbon`, e.g. `11:10 in Lisbon`), a smooth "Back to top ↑" trigger, and signature oversized watermark brand typography ("Maya Ortiz" with a neon lime initial "M").

---

## 2. Objective
Architect and implement `Footer.tsx` and `useLisbonTime.ts` to provide a high-craft, dark-themed footer container matching Snapline's exact design tokens. The footer must support full spatial navigation via `useCanvasPan`, hydration-safe Lisbon local time updates, external link safety, responsive 4-column to 2-column reflow, and fluid smooth scrolling to the top of the viewport.

---

## 3. Scope
- **Live Lisbon Time Hook (`src/hooks/useLisbonTime.ts`):**
  - Formats current time into the `Europe/Lisbon` timezone (Western European Time / WET / WEST) using `Intl.DateTimeFormat`.
  - Implements hydration-safe initialization to prevent SSR mismatch.
  - Updates on minute or second intervals via `setInterval` with automatic cleanup on unmount.
  - Formats output as `HH:MM in Lisbon`.
- **Global Footer Component (`src/components/navigation/Footer.tsx`):**
  - Dark container card wrapper (`#2A2926`, `border: 1px solid rgba(255, 255, 255, 0.12)`, `rounded-2xl sm:rounded-3xl`).
  - Optional CTA block ("Let's work together." headline, subhead, "Start a project" lime button, and "hello@mayaortiz.design" email pill).
  - 3-column sitemap navigation grid (`Pages`, `Info`, `Social`) consuming `footerSitemap` from `src/data/navigation.ts`.
  - Internal links navigate via `useCanvasPan().panTo` for 1.46s spatial view transitions.
  - External links (`LinkedIn`, `Dribbble`, `Instagram`, `X`) open safely in new tabs with `rel="noopener noreferrer"`.
  - Sub-footer row with copyright notice (`© 2026 Maya Ortiz`), live Lisbon time, and `"Back to top ↑"` smooth scroll trigger.
  - Giant watermark brand typography (`Maya Ortiz` with signature neon lime `#D6FF3F` initial `M`).
- **Module Exports (`src/components/navigation/index.ts`):**
  - Export `Footer` and `FooterProps`.
  - Export `useLisbonTime` from `src/hooks`.
- **Artboard Integration:**
  - Mount `<Footer />` across primary page templates (`/`, `/work`, `/about`, `/journal`, `/contact`).

---

## 4. Out-of-Scope Features
- **Interactive Form Inputs:** Handled in Milestone 10 (`ContactForm.tsx`).
- **Simulated Multiplayer Cursors:** Handled in Milestone 5 Task 5.3 (`MultiplayerCursors.tsx`).
- **Dynamic Case Study CMS Loading:** Handled in Milestone 7 (`/work/[slug]`).

---

## 5. Reference Website & Screenshots
- **Reference Target:** `https://snapline.framer.website/`
- **Screenshot Evidence:**
  - Desktop Footer: [project-orbit-desktop-footer.png](file:///d:/portfolio/docs/research/snapline/screenshots/desktop/project-orbit-desktop-footer.png)
  - About Page Bottom Flow: [about-desktop-faq-collapsed.png](file:///d:/portfolio/docs/research/snapline/screenshots/desktop/about-desktop-faq-collapsed.png)
  - Responsive Tablet Reference: [project-orbit-tablet-768px.png](file:///d:/portfolio/docs/research/snapline/screenshots/tablet/project-orbit-tablet-768px.png)
  - Responsive Mobile Reference: [project-orbit-mobile-390px.png](file:///d:/portfolio/docs/research/snapline/screenshots/mobile/project-orbit-mobile-390px.png)

---

## 6. Component Hierarchy
```text
<Footer className="...">
└── <DarkContainer className="relative overflow-hidden w-full bg-[#2A2926] p-8 sm:p-12 lg:p-16">
    ├── <FooterCtaSection> (Optional)
    │   ├── <PinkAccentGuideline /> (1px border-t border-[#FF3B5C]/60)
    │   ├── <h2> "Let's work together."
    │   ├── <p> "Have a product that needs to feel simpler?..."
    │   └── <ActionButtonsRow>
    │       ├── <Button variant="lime" href="/contact"> "Start a project"
    │       └── <Button variant="secondary" href="mailto:hello@mayaortiz.design"> "hello@mayaortiz.design"
    ├── <SitemapGrid className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-12 sm:mt-16">
    │   ├── <SitemapCol title="PAGES"> (Home, Work, About, Journal)
    │   ├── <SitemapCol title="INFO"> (Contact, Privacy, Terms, 404)
    │   └── <SitemapCol title="SOCIAL"> (LinkedIn, Dribbble, Instagram, X)
    ├── <SubFooterDivider className="border-t border-white/10 mt-12 sm:mt-16 pt-6" />
    ├── <SubFooterRow className="flex flex-col sm:flex-row items-center justify-between gap-4">
    │   ├── <span> "© 2026 Maya Ortiz"
    │   ├── <span> "{time} in Lisbon" (<LisbonClock />)
    │   └── <button onClick={scrollToTop}> "Back to top ↑"
    └── <BrandWatermark className="mt-8 sm:mt-12 select-none pointer-events-none">
        <span className="text-[#D6FF3F]">M</span>
        <span className="text-white/[0.07]">aya Ortiz</span>
```

---

## 7. Detailed Visual Specifications

| Element | Property | Measured / Target Value | Evidence Classification | Source Token |
| :--- | :--- | :--- | :--- | :--- |
| **Card Background** | `backgroundColor` | `#2A2926` | Measured Value | `DarkContainer` / `design-tokens.json` |
| **Card Border** | `border` | `1px solid rgba(255, 255, 255, 0.12)` | Measured Value | `DarkContainer` / `design-tokens.json` |
| **Card Radius** | `border-radius` | `24px` desktop / `16px` mobile | Measured Value | `rounded-large` / `rounded-2xl` |
| **Headline Size** | `fontSize` | `36px` sm / `48px` md / `56px` lg | Measured Value | `font-heading font-bold` |
| **Pink Guideline** | `border-top` | `1px solid #FF3B5C` | Measured Value | `design-tokens.json` pink accent |
| **Sitemap Headings**| `color` | `#888888` / `text-white/40` | Measured Value | Uppercase font-mono `11px` |
| **Sitemap Links** | `color` | `text-white/70 hover:text-white` | Measured Value | `14px` font-medium |
| **Lisbon Clock** | `color` | `#FFFFFF` / `text-white/80` | Measured Value | `13px` font-medium |
| **Watermark 'M'** | `color` | `#D6FF3F` (signature neon lime) | Measured Value | `project-orbit-desktop-footer.png` |
| **Watermark Text** | `color` | `rgba(255, 255, 255, 0.07)` | Measured Value | `project-orbit-desktop-footer.png` |

---

## 8. Layout & Positioning Specifications
- **Positioning:** Static inside page artboard flow at bottom of content.
- **Responsive Padding:** `p-6 sm:p-10 lg:p-14`.
- **Sitemap Grid:**
  - Desktop ($\ge 1024px$): 3 columns (`PAGES`, `INFO`, `SOCIAL`).
  - Tablet ($768px - 1023px$): 3 columns.
  - Mobile ($< 768px$): 2 columns (`PAGES`, `INFO`) with `SOCIAL` spanning full width or 3 compact rows.
- **Sub-footer Alignment:** Flex row on tablet/desktop with `justify-between`; vertically stacked on mobile ($< 640px$) with centered text.

---

## 9. Typography Specifications
- **Headline ("Let's work together."):** Font `Geist`, weight `700`, letter-spacing `-0.03em`.
- **Subhead:** Font `Inter`, weight `400`, size `16px`, line-height `1.6`.
- **Sitemap Section Headings:** Font `Inter` / Mono, weight `600`, size `11px`, letter-spacing `0.08em`, uppercase.
- **Sitemap Links:** Font `Inter`, weight `400` / `500`, size `14px`, transition color `150ms`.
- **Watermark Typography:** Font `Geist`, weight `800`, tracking `-0.04em`, leading `0.85`.

---

## 10. Colour & Styling Specifications
- **Dark Surface:** `#2A2926`
- **Border Tone:** `rgba(255, 255, 255, 0.12)`
- **Accent Pink:** `#FF3B5C` (thin top guideline)
- **Signature Lime:** `#D6FF3F` (Watermark `M` and Primary CTA)
- **Text Primary:** `#FFFFFF`
- **Text Secondary / Muted:** `#A0A0A0` / `#666666`

---

## 11. Asset Requirements
- No external raster image files needed; utilizes pure SVG arrows, Tailwind typography, and CSS borders.

---

## 12. Animation Specifications
- **Hover Micro-Interactions:**
  - Sitemap link hover: `transition-colors duration-150 ease-out hover:text-white`.
  - "Back to top ↑" button hover: `group-hover:-translate-y-0.5 transition-transform duration-200`.
- **Lisbon Clock Pulse:** Optional minute-pulse tick for clock display without triggering layout reflows.

---

## 13. Interaction Specifications
- **Sitemap Internal Links:** Intercept click with `panTo(href)` to invoke 1.46s spatial canvas view transition.
- **Sitemap External Links:** Standard browser navigation opening target in a new tab.
- **"Back to top ↑":**
  ```ts
  window.scrollTo({ top: 0, behavior: "smooth" });
  ```
- **Action Buttons:**
  - "Start a project" -> navigates to `/contact` via `panTo("/contact")`.
  - Email button -> launches default mail client via `mailto:hello@mayaortiz.design`.

---

## 14. Transition Specifications
- Link color transitions: `150ms ease-out`.
- Up-arrow translate: `200ms ease-out`.

---

## 15. Responsive Behaviour
- **Desktop (1440px / 1200px):**
  - Full 3-column sitemap grid (`grid-cols-3`).
  - Horizontal sub-footer (`© 2026 Maya Ortiz` left, `HH:MM in Lisbon` center, `Back to top ↑` right).
  - Watermark typography spans full container width.
- **Tablet (768px):**
  - Retains 3-column sitemap grid with reduced horizontal gaps (`gap-6`).
  - Sub-footer retains 3-item horizontal layout.
- **Mobile (390px):**
  - 2-column sitemap grid (`Pages` and `Info` on row 1, `Social` on row 2).
  - Sub-footer stacks vertically: copyright on top, Lisbon time in middle, back to top button at bottom.
  - Action buttons stack into full-width tap targets with `min-height: 44px`.

---

## 16. Accessibility Requirements
- Semantic HTML tags: `<footer>`, `<nav>`, `<button type="button">`.
- `aria-label` attributes for sitemap links and "Back to top" button.
- External links marked with `rel="noopener noreferrer"`.
- Keyboard accessible with clean focus rings.

---

## 17. Technical Implementation Requirements
- **Hydration Safety:** `useLisbonTime` must handle SSR gracefully without throwing `hydration mismatch` errors.
- **Clean Unmount:** Time ticker `setInterval` must clear on component unmount.
- **Turbopack & React 19 Compatibility:** Zero cascading render warnings (`react-hooks/set-state-in-effect`).

---

## 18. Dependencies
- `src/data/navigation.ts` (`footerSitemap`).
- `src/components/primitives/Button.tsx`.
- `src/components/canvas/CanvasProvider.tsx` (`useCanvasPan`).

---

## 19. Edge Cases
- **Server Timezone Discrepancy:** Handled via client-side mount synchronization and explicit `timeZone: "Europe/Lisbon"`.
- **Fast Clicking "Back to top":** Smooth window scroll handles multiple rapid clicks without error.
- **Browser without Smooth Scroll:** Browser falls back to instant scroll.

---

## 20. Detailed Acceptance Criteria
1. `useLisbonTime` formats accurate time to `Europe/Lisbon` (`HH:MM in Lisbon`) with zero hydration warnings.
2. `Footer.tsx` renders dark container card (`#2A2926`) with optional CTA block, 3-column sitemap, sub-footer, and watermark typography.
3. Internal sitemap links navigate via spatial `panTo(href)`.
4. External sitemap links open in new tabs with `noopener noreferrer`.
5. `"Back to top ↑"` smoothly scrolls viewport to `(0, 0)`.
6. Watermark renders giant `Maya Ortiz` with signature neon lime initial `M`.
7. Layout reflows cleanly across Desktop (1440px), Tablet (768px), and Mobile (390px).

---

## 21. Testing Requirements
- Strict TypeScript validation: `npx tsc --noEmit` -> code 0.
- Strict ESLint validation: `npm run lint` -> code 0.
- Production Turbopack build: `npm run build` -> code 0.
- Runtime server verification across `/`, `/work`, `/about`, `/journal`, and `/contact`.
