# Page Topology: Snapline Developer Portfolio

**Reference Website:** [https://snapline.framer.website/](https://snapline.framer.website/)  
**Document Link:** [PAGE_TOPOLOGY.md](./PAGE_TOPOLOGY.md)  
**Status:** Comprehensive Supplemental Reconnaissance Verified (19 Routes Verified)

---

## 1. Global Viewport & Canvas Layout Layering

The site is rendered as a virtual design workspace where individual pages act as artboards centered on an infinite canvas with a subtle dot grid pattern:

```
Z-INDEX STACKING ORDER:
┌────────────────────────────────────────────────────────┐
│ Z: 1000 — Persistent Floating Dock (Fixed Bottom)      │
├────────────────────────────────────────────────────────┤
│ Z: 800  — Simulated Multiplayer Cursors (Desktop only) │
├────────────────────────────────────────────────────────┤
│ Z: 400  — Top Navigation Bar ("Maya." + "Get in touch")│
├────────────────────────────────────────────────────────┤
│ Z: 200  — Active Page Artboard Container (White Card)  │
│           ├── Hero / Header Section                    │
│           ├── Body Content / Grids / Accordions        │
│           └── Footer & Lisbon Clock Section            │
├────────────────────────────────────────────────────────┤
│ Z: 100  — Adjacent Background Artboards (Panned Canvas)│
├────────────────────────────────────────────────────────┤
│ Z: 0    — Base Canvas Background (#E6E6E3 + Dot Grid)  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Global Persistent Components

### 1. Top Header (`Header.tsx`)
- **Positioning:** Fixed or sticky at top, padded `24px` from edges (`height: 56px`).
- **Left Slot:** Brand mark `"Maya."` (clicking navigates to `/` with canvas pan).
- **Right Slot:** `"Get in touch"` pill CTA button (light border with subtle hover fill; links to `/contact`).
- **Responsive Adaptation:** On desktop, tablet (768px), and mobile (390px), text navigation links are omitted in the header; the header strictly retains the `Maya.` logo on left and `Get in touch` button on right. No hamburger drawer menu exists on any breakpoint.

### 2. Floating Navigation Dock (`Dock.tsx`)
- **Positioning:** Fixed at bottom center, `24px` above bottom on desktop, `16px` on tablet/mobile.
- **Dimensions:** Width `280px`, height `52px`, `border-radius: 9999px`.
- **Glassmorphism:** `background: rgba(255, 255, 255, 0.85)`, `backdrop-filter: blur(12px)`, border `1px solid rgba(0, 0, 0, 0.08)`.
- **Z-Index:** `1000`.
- **Navigation Triggers (5 Icons + 1 Zoom Status):**
  1. **Cursor Arrow (V):** Home (`/`)
  2. **Frame Hash (#):** Work (`/work`)
  3. **User Profile:** About (`/about`)
  4. **Text Type (T):** Journal (`/journal`)
  5. **Comment Bubble (C):** Contact (`/contact`)
  6. **Canvas Scale Status:** Non-interactive `100%` scale indicator.
- **Active State Indicator:** A solid dark pill container (`#0A0A0A`, `border-radius: 8px`) highlights the active route, with the active icon colored neon lime (`#D6FF3F`).

### 3. Global Footer Component
- Rendered at the bottom of the active page artboard (or dark footer container on project/contact pages).
- **Lisbon Real-Time Clock:** Displays current local time in Lisbon (`HH:MM in Lisbon`) via GMT+0 timezone formatting.
- **Sitemap Links:**
  - `Pages`: Home (`/`), Work (`/work`), About (`/about`), Journal (`/journal`).
  - `Info`: Contact (`/contact`), Privacy (`/privacy`), Terms (`/terms`), 404 (`/404`).
  - `Social`: LinkedIn, Dribbble, Instagram, X.
- **Scroll to Top:** Smooth scroll trigger (`"Back to top ↑"`).

---

## 3. Comprehensive Route Catalog (19 Verified Routes)

The reference website contains **19 verified internal routes** organized across 8 primary template patterns:

| Route | Page Type | Template Pattern | Page Title | Primary Purpose & Content | Dynamic / Static |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Core Page | Homepage Template | `Maya Ortiz \| Product Designer in Lisbon` | Hero with interactive draggable portrait, client logos, 4-step process, featured work, footer. | Static |
| `/work` | Catalog Page | Catalog Template | `Work \| Maya Ortiz` | Catalog of 6 case studies with category filter pills (All, Web app, Mobile app, Design system, Brand) and Grid/List toggle. | Static / List |
| `/work/orbit` | Project Detail | Project Template | `Orbit \| Maya Ortiz` | Orbit Finance: Cash flow forecasting web app (2025, 14 weeks). | Dynamic CMS |
| `/work/pilot` | Project Detail | Project Template | `Pilot \| Maya Ortiz` | Pilot Health: Senior medication companion mobile app (2026, 10 weeks). | Dynamic CMS |
| `/work/kite` | Project Detail | Project Template | `Kite \| Maya Ortiz` | Kite Logistics: Real-time supply chain platform (2025, 16 weeks). | Dynamic CMS |
| `/work/grid` | Project Detail | Project Template | `Grid \| Maya Ortiz` | Parcelly: Enterprise cross-platform design system (2025, 6 months). | Dynamic CMS |
| `/work/bloom` | Project Detail | Project Template | `Bloom \| Maya Ortiz` | Bloom Studio: Brand identity & packaging system (2024, 8 weeks). | Dynamic CMS |
| `/work/tidal` | Project Detail | Project Template | `Tidal \| Maya Ortiz` | Tidal Surf Co.: Surf forecast mobile app (2024, 9 weeks). | Dynamic CMS |
| `/about` | Core Page | About Template | `About \| Maya Ortiz` | Bio, 4-metric statistics grid, chronological career timeline, 6 software stack cards, 5-item FAQ accordion. | Static |
| `/journal` | Catalog Page | Catalog Template | `Journal \| Maya Ortiz` | Editorial writing catalog with 5 articles and category tags. | Static / List |
| `/journal/constraints` | Article Page | Editorial Template | `Why constraints are the foundation of great design \| Maya Ortiz` | Article 1: Longform editorial on creative constraints (Oct 14, 2026 · 6 min read). | Dynamic CMS |
| `/journal/white-space` | Article Page | Editorial Template | `The art of white space in modern interfaces \| Maya Ortiz` | Article 2: Longform editorial on interface typography and negative space (Sep 30, 2026 · 5 min read). | Dynamic CMS |
| `/journal/design-system` | Article Page | Editorial Template | `Building a design system from scratch \| Maya Ortiz` | Article 3: Longform editorial on multi-brand tokens and component scaling (Sep 12, 2026 · 8 min read). | Dynamic CMS |
| `/journal/typography-brand`| Article Page| Editorial Template | `Typography choices that define brand identity \| Maya Ortiz` | Article 4: Longform editorial on brand typography pairings (Aug 28, 2026 · 4 min read). | Dynamic CMS |
| `/journal/handoff` | Article Page | Editorial Template | `A handoff engineers actually thank you for \| Maya Ortiz` | Article 5: Longform editorial on design tokens, PR reviews, and engineering collaboration (Aug 9, 2026 · 5 min read). | Dynamic CMS |
| `/contact` | Core Page | Contact Template | `Contact \| Maya Ortiz` | Dark-themed inquiry card (`#161616`) with inquiry form inputs, budget/timeline selectors, Lisbon availability badge. | Static Form |
| `/privacy` | Legal Page | Legal Tab Template | `Privacy \| Maya Ortiz` | Tab toggle between Privacy/Terms, 4 numbered privacy clauses (Last updated Nov 1, 2026). | Static |
| `/terms` | Legal Page | Legal Tab Template | `Terms \| Maya Ortiz` | Tab toggle between Privacy/Terms, 3 numbered terms of service clauses (Last updated Nov 1, 2026). | Static |
| `/404` | Error Recovery | Canvas 404 Template| `Page not found \| Maya Ortiz` | Large 404 watermark, recovery message, and 3 interactive mouse-draggable Polaroid photo cards. | Dynamic Interactive |

---

## 4. Deep-Dive Page Architectures

### Template 1: Project Detail Template (`/work/[slug]`)
Verified across all 6 project pages: `/work/orbit`, `/work/pilot`, `/work/kite`, `/work/grid`, `/work/bloom`, `/work/tidal`.
All 6 share a **100% IDENTICAL layout structure**:
1. **Header:** `← All works` backlink leading to `/work`.
2. **Title Block:** Project title with hot-pink baseline measurement line (`#FF3B5C`) + single-sentence narrative premise.
3. **5-Column Metadata Bar:**
   - `CLIENT` (e.g. Orbit Finance, Pilot Health, Kite Logistics, Parcelly, Bloom Studio, Tidal Surf Co.)
   - `ROLE` (Lead product designer, Product designer, Design system lead, Brand and web designer)
   - `TYPE` (Web app, Mobile app, Design system, Brand)
   - `YEAR` (2024, 2025, 2026)
   - `DURATION` (8 weeks to 6 months)
4. **Hero Artwork:** Full-bleed responsive mockup banner.
5. **Narrative Sections:**
   - `Overview`: Background, company context, and primary objective.
   - `The challenge`: Friction points, domain complexities, user research findings.
   - `The approach`: UX wireframes, architectural decisions, design system alignment.
6. **3 Impact Metric Cards:**
   - Standard 3-column card block showcasing quantitative outcomes (e.g. `+34% forecasting accuracy`, `4.2x faster reconciliations`, `18 Enterprise pilots`).
7. **Next Project Circular Navigation:**
   - Card linking to the next case study in sequence: Orbit $
ightarrow$ Pilot $
ightarrow$ Kite $
ightarrow$ Grid $
ightarrow$ Bloom $
ightarrow$ Tidal $
ightarrow$ Orbit.
8. **Dark Footer CTA Card:** ("Let's work together.").

### Template 2: Journal Article Template (`/journal/[slug]`)
Verified across `/journal/constraints` and `/journal/white-space`:
1. **Header:** `← Journal` backlink leading to `/journal`.
2. **Metadata Header:** Category pill tag (`Design`, `Process`, `Branding`) + Date + Read time inline.
3. **Display Title:** Headline with bold/medium emphasis words.
4. **Lead Excerpt:** Styled blockquote deck.
5. **Hero Banner:** Editorial illustration or 3D render.
6. **Body Content:**
   - H2 section headers with generous margins.
   - Pull-quote block with left border or quotes.
   - Editorial body copy (`font-size: 16px–18px`, `line-height: 1.6–1.7`).
7. **Footer CTA Block & Dock.**

### Template 3: Legal Pages (`/privacy` & `/terms`)
1. **Header Tabs:** Segmented pill toggle allowing users to toggle between `[Privacy]` and `[Terms]`.
2. **Header Title:** e.g. "Privacy policy" / "Terms of Service" with last updated date ("November 1, 2026") and contact email ("hello@mayaortiz.design").
3. **Numbered Section Clauses:**
   - On `/privacy`: 01 What I collect, 02 How I use it, 03 Analytics, 04 Your rights.
   - On `/terms`: 01 Content, 02 Enquiries, 03 Liability.
4. **Footer:** Standard global sitemap and dock.

### Template 4: Custom 404 Recovery Canvas (`/404`)
1. **Watermark:** Huge background `404` typography.
2. **Headline & Subtitle:** "This page wandered off. Shuffle the photos while you're here..."
3. **3 Interactive Draggable Polaroids:**
   - Layered cards `# Layer 01`, `# Layer 02`, `# Layer 03`.
   - Physics-based mouse drag with rotation, boundary constraints, and elevated drop shadow.
4. **Return Home CTA:** Button linking back to `/`.
