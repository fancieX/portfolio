# Responsive Viewport Analysis: Snapline Developer Portfolio

**Reference Website:** [https://snapline.framer.website/](https://snapline.framer.website/)  
**Document Link:** [responsive-analysis.md](./responsive-analysis.md)  
**Status:** Comprehensive Multi-Viewport Verified (1440px Desktop, 768px Tablet, 390px Mobile)

---

## 1. Breakpoint Architecture & Layout Shift Summary

| Viewport Tier | Width Range | Target Test Width | Primary Layout Configuration |
| :--- | :--- | :--- | :--- |
| **Desktop** | $\ge 1200	ext{px}$ | `1440px` | 2-column hero with interactive side portrait; 2-column project cards; full horizontal navigation. |
| **Tablet** | `768px – 1199px` | `768px` | Single-column stacked hero with portrait below headline; 2-column project grid continues; top navigation simplifies to logo + CTA; floating dock handles all primary routing. |
| **Mobile** | $< 768px$ | `390px` | Full single-column vertical flow; filter pills wrap into compact rows; floating dock scales to `280px` fixed at bottom; touch-friendly 44px minimum tap targets. |

---

## 2. Universal Navigation Across Breakpoints

One of the most critical structural findings of this reconnaissance is the **universal navigation model**:
- **No Hamburger Drawer:** The website does **NOT** introduce a hamburger menu or mobile navigation drawer at smaller viewports.
- **Top Header Simplification:** At desktop, tablet (768px), and mobile (390px), the top bar consistently renders only the `Maya.` brand on the left and the `Get in touch` pill button on the right (`height: 56px`).
- **Persistent Bottom Floating Dock:** Across all three viewports (Desktop, Tablet, Mobile), the floating dock acts as the universal bottom navigation bar (`width: ~280px`, `z-index: 1000`, `bottom: 24px` desktop / `16px` mobile). It houses all 5 core routes (`Home`, `Work`, `About`, `Journal`, `Contact`) and the `100%` zoom indicator.

---

## 3. Template-by-Template Viewport Breakdown

### 1. Homepage (`/`)
- **Desktop (1440px):**
  - Hero: Asymmetrical 2 columns (60% typography / 40% draggable portrait).
  - Headline: `72px` (`line-height: 1.05`, `letter-spacing: -0.03em`).
  - Client Row (`Trust`): `"Trusted by 50+ teams"` eyebrow + 5 client wordmarks (`Northwind`, `Lumen&Co`, `Parcelly`, `Ostra`, `Halcyon`) in 1 horizontal row (`gap: 26px`) beneath hero CTAs.
  - Process: 4 columns side by side across `1200px`.
  - Evidence: `screenshots/desktop/home-desktop-initial.png`
- **Tablet (768px):**
  - Hero: Single column stack; client logos row sits beneath CTA buttons and above centered portrait (`maxWidth: 420px`) on a single horizontal row (`home-tablet-768px.png`).
  - Headline: Scales down to `52px` (`line-height: 1.10`).
  - Process: 2x2 grid.
  - Evidence: `screenshots/tablet/home-tablet-768px.png`
- **Mobile (390px):**
  - Hero: Full-width single column with `16px` lateral margins.
  - Client Row (`Trust`): Wraps cleanly across 2 rows via `flex-wrap` (`gap: 26px` horizontal) beneath CTAs.
  - Headline: Scales down to `38px` (`line-height: 1.15`).
  - Process: 4 stacked vertical rows.
  - Simulated multiplayer cursors (`"Lena · PM"` and `"Sam · Dev"` + comment bubbles) remain visible and animate smoothly inside their respective headline and portrait bounds on mobile (`pointer-events: none` prevents touch scroll conflict).
  - Evidence: `screenshots/mobile/home-mobile-390px.png`

### 2. Work Catalog (`/work`)
- **Desktop (1440px):**
  - Header: Title on left, filter pills and Grid/List toggle on right.
  - Grid: 2 columns (`gap: 32px`), card width `568px`.
  - Evidence: `screenshots/desktop/work-desktop-grid-view.png`
- **Tablet (768px):**
  - Filter pills wrap into 2 rows; 2-column project grid continues with `24px` gap.
  - Evidence: `screenshots/tablet/work-tablet-768px.png`
- **Mobile (390px):**
  - Filter pills wrap into 3 compact rows (`All · 6`, `Web app · 2`, `Mobile app · 2`, etc.).
  - Grid: Reflows to a single column (`width: 100%`, `358px` card width).
  - List View: Retains Index, Name, and Year columns; hides secondary metadata.
  - Evidence: `screenshots/mobile/work-mobile-390px.png`

### 3. Project Detail Template (`/work/[slug]` - e.g. `/work/orbit`)
- **Desktop (1440px):**
  - Metadata: 5 columns (`CLIENT`, `ROLE`, `TYPE`, `YEAR`, `DURATION`) displayed in a horizontal bar.
  - Hero Mockup: Large full-bleed presentation banner.
  - Metrics: 3 columns side by side.
  - Evidence: `screenshots/desktop/project-orbit-desktop-overview.png`
- **Tablet (768px):**
  - Metadata: 5 columns wrap gracefully or convert into a compact 2-row grid.
  - Metrics: 3 columns remain readable or reflow to 2+1 layout.
  - Evidence: `screenshots/tablet/project-orbit-tablet-768px.png`
- **Mobile (390px):**
  - Metadata: Converts into compact 2-column or stacked vertical rows with `12px` typography.
  - Metrics: 3 impact metrics stack into single vertical rows.
  - Next Project Card: Spans full width (`100%`).
  - Evidence: `screenshots/mobile/project-orbit-mobile-390px.png`

### 4. About Page (`/about`)
- **Desktop (1440px):**
  - Stats: 4 columns (`10+ Years`, `60+ Projects`, `50+ Teams`, `4 Awards`).
  - Experience: 2-column row layout (dates left `200px`, role/company right).
  - Tools: 3 columns x 2 rows (6 software cards).
  - Evidence: `screenshots/desktop/about-desktop-initial.png`
- **Tablet (768px):**
  - Stats: Reflow to 2x2 grid.
  - Tools: Reflow to 2 columns x 3 rows.
  - Evidence: `screenshots/tablet/about-tablet-768px.png`
- **Mobile (390px):**
  - Stats: Compact 2x2 grid with `12px` gap.
  - Experience: Dates stack directly above company titles.
  - FAQ Accordion: Full touch targets (`min-height: 56px`) with fluid height expansion.
  - Evidence: `screenshots/mobile/about-mobile-390px.png`

### 5. Journal Catalog (`/journal`) & Post (`/journal/constraints`)
- **Desktop (1440px):**
  - Catalog: Spacious editorial index with category filters and article cards.
  - Article: Centered readable measure (`maxWidth: 720px`), large hero banner, and pull quotes.
  - Evidence: `screenshots/desktop/journal-desktop-initial.png`, `journal-constraints-article-desktop.png`
- **Tablet (768px):**
  - Article: Full-width container with `32px` side margins; typography scales to `17px` (`line-height: 1.6`).
  - Evidence: `screenshots/tablet/journal-tablet-768px.png`, `journal-constraints-tablet-768px.png`
- **Mobile (390px):**
  - Catalog: Single-column vertical list with compact category tags.
  - Article: `15px` body typography (`line-height: 1.55`), `16px` page margins.
  - Evidence: `screenshots/mobile/journal-mobile-390px.png`, `journal-constraints-mobile-390px.png`

### 6. Contact Page (`/contact`)
- **Desktop (1440px):**
  - Centered dark container card (`#161616`, `maxWidth: 640px`) with 2-column input rows for Name/Email and Selects.
  - Evidence: `screenshots/desktop/contact-desktop-initial.png`
- **Tablet (768px):**
  - Card scales to fill width within `32px` page margins.
  - Evidence: `screenshots/tablet/contact-tablet-768px.png`
- **Mobile (390px):**
  - Multi-column input rows stack vertically.
  - Card padding reduces from `48px` to `20px`.
  - Submit button spans `100%` width with `48px` tap height.
  - Evidence: `screenshots/mobile/contact-mobile-390px.png`

### 7. Legal Pages (`/privacy` & `/terms`)
- **Desktop (1440px):**
  - Centered legal reading card with tab pill toggle at top (`[Privacy]`, `[Terms]`).
  - Evidence: `screenshots/desktop/privacy-desktop-initial.png`, `terms-desktop-initial.png`
- **Tablet (768px):**
  - Container scales with `32px` side margins.
  - Evidence: `screenshots/tablet/privacy-tablet-768px.png`
- **Mobile (390px):**
  - Container spans full width (`16px` margins), numbered clauses stack cleanly.
  - Evidence: `screenshots/mobile/privacy-mobile-390px.png`

### 8. Custom 404 Page (`/404`)
- **Desktop (1440px):**
  - Huge `404` watermark with 3 draggable Polaroid cards fanned out across canvas.
  - Evidence: `screenshots/desktop/404-desktop-initial.png`
- **Tablet (768px):**
  - Polaroid cards scale down slightly to fit narrower canvas width.
  - Evidence: `screenshots/tablet/404-tablet-768px.png`
- **Mobile (390px):**
  - Polaroid cards stack with touch-drag enabled; bounds constrained to `390px` viewport.
  - Evidence: `screenshots/mobile/404-mobile-390px.png`
