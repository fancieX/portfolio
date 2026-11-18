# Snapline Reference Research & Reverse-Engineering Deliverables

**Target Website:** [https://snapline.framer.website/](https://snapline.framer.website/)  
**Studio Identity:** Maya Ortiz — Product Designer in Lisbon  
**Workflow Context:** Option B — Stage 1 (1:1 Faithful Recreation)  
**Research Location:** `docs/research/snapline/`  
**Status:** Approved Master Research Archive  

---

## 1. Directory Structure

```
docs/research/snapline/
├── README.md                   # This directory guide
├── reference-analysis.md       # Comprehensive 13-section architectural and design analysis
├── PAGE_TOPOLOGY.md            # Topology of all 19 verified routes & 8 template schemas
├── interaction-matrix.md       # Empirical verification of 9 priority interactions vs implementation hypotheses
├── responsive-analysis.md      # Multi-breakpoint analysis across Desktop (1440px), Tablet (768px), and Mobile (390px)
├── design-tokens.json          # Machine-readable design tokens with measurement provenance (v1.1.0)
├── asset-inventory.csv         # Complete inventory of 28 assets (images, fonts, SVGs, background pattern)
└── screenshots/                # 54 original-quality reference screenshots
    ├── desktop/                # 28 desktop (1440px) initial loads, page flows, and project details
    ├── interactions/           # 8 interaction states (active drags, FAQ expansions, filter transitions)
    ├── tablet/                 # 9 tablet (768px) template captures
    └── mobile/                 # 9 mobile (390px) template captures
```

---

## 2. Core Research Deliverables Overview

1. **[reference-analysis.md](./reference-analysis.md):**
   - The primary reference dossier.
   - Contains executive overview, complete 19-route catalog, page-by-page inspection, component breakdowns, performance audits, technical challenges, and Section 13 (Supplemental Validation & Outstanding Limitations).

2. **[PAGE_TOPOLOGY.md](./PAGE_TOPOLOGY.md):**
   - Structural map of the virtual 2D design workspace canvas.
   - Documents the universal z-index stacking model, persistent top header (`56px`), bottom floating dock (`width: ~280px`, `z-index: 1000`), Lisbon clock sync, and deep-dive template architectures:
     - 6 project detail pages (`/work/orbit`, `/work/pilot`, `/work/kite`, `/work/grid`, `/work/bloom`, `/work/tidal`) sharing a **100% identical template schema**.
     - 5 journal articles (`constraints`, `white-space`, `design-system`, `typography-brand`, `handoff`).
     - 2 legal pages (`/privacy`, `/terms`) with tab toggle.
     - Custom error recovery canvas (`/404`) with interactive Polaroid cards.

3. **[interaction-matrix.md](./interaction-matrix.md):**
   - Strict matrix separating **Verified Observable Behavior** from **Implementation Hypotheses**.
   - Covers all 9 priority interactions:
     1. Navigation Dock Hover & Active States
     2. Work Card Hover Selection (Figma frame overlay, not CSS zoom)
     3. Filter Buttons & View Toggle on `/work`
     4. Journal Article Hover
     5. Contact Form Focus & Native HTML5 Validation
     6. Social Link Hovers
     7. Mobile Navigation (Persistent dock, absence of hamburger menu)
     8. Scroll-Triggered Entrance Animations
     9. Spatial 2D Canvas Pan Page Transitions

4. **[responsive-analysis.md](./responsive-analysis.md):**
   - Exhaustive breakdown of layout reflow, typography scaling, and component adaptations across:
     - **Desktop ($\ge 1200	ext{px}$, test 1440px):** 2-column layouts, 4-column stats, 72px H1 display headings.
     - **Tablet ($768	ext{px} - 1199	ext{px}$, test 768px):** Single-column stacked hero, 2x2 stats, 52px H1 display headings.
     - **Mobile ($< 768	ext{px}$, test 390px):** Single-column vertical flow, 38px H1 display headings, 16px lateral padding.
   - Confirms the **universality of the bottom floating dock** across all viewports.

5. **[design-tokens.json](./design-tokens.json):**
   - W3C DTCG-compliant design system specification (v1.1.0).
   - Enriched with measurement provenance: `sourceElement`, `sourcePage`, `property`, `viewport`, `measurementMethod`.
   - Captures exact colors (`#E6E6E3` canvas, `#FFFFFF` surface, `#161616` dark card, `#D6FF3F` neon lime, `#FF3B5C` guideline pink), typography (`Geist` Regular/Medium/SemiBold, `Inter` Bold), exact font URLs, and the exact repeating background dot grid CSS rule.

6. **[asset-inventory.csv](./asset-inventory.csv):**
   - 28 cataloged assets covering:
     - 1 interactive hero portrait (`AST-01`)
     - 6 case study covers (`AST-02` to `AST-07`)
     - 5 journal article covers (`AST-08`, `AST-25` to `AST-28`)
     - 3 custom 404 Polaroid images (`AST-09` to `AST-11`)
     - 4 WOFF2 web fonts (`AST-12` to `AST-15`)
     - 8 inline SVG icons (`AST-16` to `AST-23`)
     - 1 CSS dot grid pattern (`AST-24`)

---

## 3. Preservation & Usage Protocol

- **Stage 1 (Current):** These deliverables serve as the authoritative reference specifications for our 1:1 faithful recreation of Snapline on Next.js 16, TypeScript, Tailwind CSS v4, Lucide React, and Framer Motion.
- **Stage 2 (Future):** When transitioning to `stage-2-personalization`, this directory remains preserved as the historical reverse-engineering benchmark.
