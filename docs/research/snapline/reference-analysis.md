# Comprehensive Reference Analysis: Snapline Developer Portfolio

**Reference Website:** [https://snapline.framer.website/](https://snapline.framer.website/)  
**Document Link:** [reference-analysis.md](./reference-analysis.md)  
**Status:** Completed Phase 1 Reconnaissance  
**Scratch Directory:** `docs/research/snapline`

---

## 1. Executive Overview

Snapline is a premium, design-centric portfolio template representing the studio of **Maya Ortiz**, an independent Product Designer in Lisbon, Portugal. 

Unlike conventional flat landing pages, the website embodies a **Figma-inspired visual design canvas**:
1. **Artboards in 2D Space:** Pages are treated as discrete, high-craft white artboard containers arranged across an off-white canvas (`#F4F4F4`) detailed with an authentic subtle dot grid.
2. **Canvas Navigation Dynamics:** Switching between pages (Home, Work, About, Journal, Contact) executes an interactive canvas panning and zooming motion, seamlessly navigating between artboard coordinates.
3. **Figma UI Metaphors & Interactions:** Containers (hero portrait, project covers, 404 Polaroid images) feature interactive Figma inspection frames with 8 resize handles, layer names (e.g. `# maya-portrait.webp`), hot-pink typographic baseline guides (`#FF3B5C`), and neon lime dimension badges (e.g. `380 × 475`).
4. **Simulated Multiplayer Presence:** Features simulated collaborative team cursors ("Lena · PM" highlighting copy, "Sam · Dev" placing comment pins) that bring the portfolio to life.
5. **Persistent Bottom Dock:** A fixed, glassmorphic floating dock (`width: ~300px`, `z-index: 500`) provides effortless 1-click access to all 5 core routes across all viewports.

---

## 2. Complete Route Inventory

| Route | Page Type | Page Title | Primary Purpose & Content | Dynamic / Static |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Core Page | `Maya Ortiz \| Product Designer in Lisbon` | Homepage featuring interactive hero portrait, social proof, process steps, featured works, and inquiry footer. | Static |
| `/work` | Catalog Page | `Work \| Maya Ortiz` | Portfolio showcase containing 6 case studies with category filtering (All, Web app, Mobile app, Design system, Brand) and Grid/List toggle. | Static / List |
| `/work/orbit` | Detail Case Study | `Orbit \| Maya Ortiz` | Orbit Finance: Web application cash flow planning case study with 4-column meta, approach screenshots, metrics, and testimonial. | Dynamic CMS |
| `/work/pilot` | Detail Case Study | `Pilot \| Maya Ortiz` | Pilot Health: Mobile app medication companion case study for senior users. | Dynamic CMS |
| `/work/kite` | Detail Case Study | `Kite \| Maya Ortiz` | Kite Logistics: Real-time supply chain tracking platform. | Dynamic CMS |
| `/work/grid` | Detail Case Study | `Grid \| Maya Ortiz` | Grid Design System: Cross-platform enterprise design system case study. | Dynamic CMS |
| `/work/bloom` | Detail Case Study | `Bloom \| Maya Ortiz` | Bloom Skincare: Visual identity, packaging, and brand system. | Dynamic CMS |
| `/work/tidal` | Detail Case Study | `Tidal \| Maya Ortiz` | Tidal Surf Forecast: Real-time marine wave conditions mobile app. | Dynamic CMS |
| `/about` | Core Page | `About \| Maya Ortiz` | Biography, 4-stat metrics grid, chronological experience timeline, 6-tool software stack, and 5-item interactive FAQ accordion. | Static |
| `/journal` | Catalog Page | `Journal \| Maya Ortiz` | Editorial writing index with category filters, featured article banner, and 5 article cards. | Static / List |
| `/journal/constraints` | Article Page | `Why constraints are the foundation of great design \| Maya Ortiz` | Longform editorial article with reading time, pull-quotes, and related article links. | Dynamic CMS |
| `/contact` | Core Page | `Contact \| Maya Ortiz` | Dark-themed inquiry card (`#161616`) with project form inputs, budget/timeline selectors, and Lisbon availability status. | Static Form |
| `/privacy` | Legal Page | `Privacy Policy \| Maya Ortiz` | Standard privacy and data collection policy layout. | Static |
| `/terms` | Legal Page | `Terms of Service \| Maya Ortiz` | Terms of service and engagement terms. | Static |
| `/404` | Error Recovery | `Page not found \| Maya Ortiz` | Interactive error recovery canvas with 3 draggable Polaroid photo cards. | Dynamic Interactive |

---

## 3. Page-by-Page Findings

### A. Homepage (`/`)
- **Top Navigation:** Brand mark `"Maya."` on left, `"Get in touch"` outline pill button on right.
- **Hero Section:**
  - Status pill with pulsing green dot: `"Booking projects for January"`.
  - Typewriter animated cycling role text: `[Product Designer]` $\rightarrow$ `[Design Lead]` $\rightarrow$ `[Systems Thinker]`.
  - Interactive portrait card (`380 × 475px`) displaying `# maya-portrait.webp` label and 8 handles.
  - Hot-pink measurement baseline guide line (`#FF3B5C`) underlying headline typography.
  - Trusted client logos: Northwind, Lumen&Co, Parcelly, Ostra, Halcyon.
- **Process Cards Section:**
  - 4 cards: `01 / RESEARCH`, `02 / DESIGN`, `03 / DEVELOP`, `04 / HANDOFF`.
- **Footer Block:**
  - Dark container card (`#161616`) with inquiry callout, Lisbon live time (`11:17 in Lisbon`), sitemap links, and `"Back to top ↑"` smooth scroll trigger.

### B. Work Page (`/work`)
- **Category Filter Tabs:**
  - `All · 6`, `Web app · 2`, `Mobile app · 2`, `Design system · 1`, `Brand · 1`.
- **View Toggle Controls:**
  - `Grid`: 2-column large visual cards with image covers, category tag, year, and description.
  - `List`: Editorial table rows with index numbers (`01`–`06`), project title, category, and year.

### C. Project Detail Pages (`/work/[slug]`)
- **Header & Meta:** Large display title, client, role, type, year, and engagement duration.
- **Structured Storytelling:** Overview, Challenge, Approach, Results (3 stat cards), Client Testimonial, and Next Project sequential link.

### D. About Page (`/about`)
- **Bio & Metrics:** Summary bio with `"Download resume"` button and 4 metric cards (`10+ Years`, `60+ Projects`, `50+ Teams`, `4 Awards`).
- **Experience Timeline:** Detailed history across 4 design roles.
- **Tool Stack:** 6 interactive cards for Figma, Framer, Notion, Linear, Maze, and Spline.
- **FAQ Accordion:** 5 collapsible items with spring-animated circular `+`/`x` toggle icons.

### E. Contact Page (`/contact`)
- **Theme:** Dark container card (`#161616`) centered on the `#F4F4F4` canvas.
- **Form Controls:** Name, Email, Company, Project Type, Budget, Timeline, Project Notes, and neon lime `"Send enquiry"` CTA button.

### F. 404 Error Page (`/404`)
- **Interactive Element:** 3 Polaroid photo cards that can be grabbed and dragged freely across the canvas with real-time coordinate badges and `# Layer 01` frame handles.

---

## 4. Reusable Component Inventory

1. `CanvasShell.tsx`: 2D infinite workspace container with `#F4F4F4` background and dot grid pattern.
2. `FloatingDock.tsx`: Fixed bottom glassmorphic dock bar with 5 navigation icons, active indicator pill, and zoom badge.
3. `Header.tsx`: Minimal top header with `"Maya."` logo and `"Get in touch"` pill button.
4. `FigmaFrame.tsx`: Reusable selection wrapper providing 8 resize handles, layer tag (`# name`), and dimension pill.
5. `MultiplayerCursor.tsx`: Simulated virtual collaborator cursors ("Lena · PM" and "Sam · Dev") with SVG paths and speech bubbles.
6. `ProjectCard.tsx`: Dual-mode project card supporting both Grid (image card) and List (table row) layouts.
7. `CategoryFilter.tsx`: Horizontal scrollable filter pill bar with animated active tab indicator.
8. `FaqAccordion.tsx`: Smooth spring height-expanding accordion with rotating circular `+`/`x` toggle button.
9. `LisbonClock.tsx`: Live updating 24-hour time clock formatted to `Europe/Lisbon`.
10. `DraggablePolaroid.tsx`: Framer Motion drag component with inertia, boundaries, and lift drop shadows.
11. `FooterCta.tsx`: Reusable dark-themed inquiry block with sitemap and back-to-top trigger.

---

## 5. Design Token Findings

- **Background Palette:** Canvas `#F4F4F4`, Surface Light `#FFFFFF`, Surface Dark `#161616`, Input Surface `#ECECEC`.
- **Text Palette:** Primary `#0A0A0A`, Secondary `#3A3A3A`, Muted `#605F5F`, Faint `#8A8A8A`, Inverse `#FFFFFF`.
- **Accent Palette:** Neon Lime `#D6FF3F` / `#CCFF00`, Guideline Hot Pink `#FF3B5C`, Pulse Green `#22C55E`.
- **Typography:** Primary font is **`Geist`** (Google Fonts / local WOFF2) across weights 400, 500, 600; **`Inter`** (700) for metrics; **`Geist Mono`** for coordinate badges and dimensions.
- **Border Radii:** Inputs/chips `8px`–`12px`, Cards `16px`–`24px`, Pills/Dock `9999px`.
- **Full JSON Spec:** See [design-tokens.json](./design-tokens.json).

---

## 6. Interaction Matrix Summary

- **Canvas Experience:** 2D pan transition coordinated via React state and History API.
- **Hero Portrait:** 8 handles with mouse-drag capability.
- **Work Filters:** Instant spring layout reflow across 6 projects.
- **View Toggle:** Seamless Grid $\leftrightarrow$ List cross-fade.
- **FAQ Accordion:** Height animation with spring easing (`stiffness: 300, damping: 25`).
- **404 Polaroid Drag:** Free-form drag with inertia and drop shadow elevation.
- **Full Matrix Spec:** See [interaction-matrix.md](./interaction-matrix.md).

---

## 7. Responsive Analysis Summary

- **Desktop (1440px):** Full 2-column hero, 2-column project cards, full dock.
- **Tablet (768px):** Portrait stacks below headline; top navigation simplifies; dock remains primary navigation.
- **Mobile (390px):** Single-column vertical stacking throughout; filter pills wrap into 3 rows; dock scales to 280px with 44px tap targets; multiplayer cursors hidden.
- **Full Responsive Spec:** See [responsive-analysis.md](./responsive-analysis.md).

---

## 8. Asset Inventory Summary

- **Total Media Assets:** 24 key cataloged items (hero portrait, 6 project covers, 3 Polaroid images, article cover, 4 web fonts, and 8 inline SVG icon primitives).
- **Hosting Origin:** `https://framerusercontent.com/` and Google Fonts.
- **Full Asset CSV:** See [asset-inventory.csv](./asset-inventory.csv).

---

## 9. Performance & Accessibility Observations

- **Performance:** Framer loads initial critical content cleanly. Canvas transitions leverage GPU-accelerated CSS transforms (`translate3d`).
- **Semantic Structure:** Clear hierarchical heading structure (`h1` through `h3`) on all pages.
- **Interactive Affordance:** Focus rings on inputs and distinct hover states on all interactive triggers.
- **Reduced Motion:** All spring animations and simulated cursors must be gracefully disabled or simplified when `prefers-reduced-motion: reduce` is enabled.

---

## 10. Unverified Behaviors & Research Gaps

1. **Live Form Submission Endpoint:** In accordance with safety rules, the contact form was inspected for input validation and focus states only; no live submission was dispatched.
2. **WebGL Canvas vs Pure CSS/SVG:** The canvas dot grid is rendered via lightweight CSS repeated background pattern rather than heavy Three.js canvas shaders.
3. **Framer CMS Backend:** The reference site uses Framer's proprietary CMS collections for project pages; in our Next.js recreation, this is mapped to a type-safe static TypeScript data layer (`src/data/projects.ts` and `src/data/journal.ts`).

---

## 11. Technical Challenges for Implementation

1. **Canvas Zoom & Pan Coordination:** Replicating the smooth artboard-to-artboard panning during page navigation without triggering React Server Component page flashes.
2. **8-Handle Interactive Resize Wrapper:** Implementing a robust Framer Motion component that tracks drag handles and updates coordinate pills in real time.
3. **Simulated Multiplayer Presence:** Coordinating the automated path movements of virtual cursors without blocking user clicks or degrading FPS.
4. **Grid $\leftrightarrow$ List View Transition:** Ensuring smooth layout transitions between 2-column image cards and tabular rows using Framer Motion's `layout` prop.

---

## 12. Recommendations for Faithful Implementation

1. **Stack Alignment:** Standardize on **Next.js 16 (App Router)**, **TypeScript (Strict)**, **Tailwind CSS v4**, and **Framer Motion**.
2. **Typography Setup:** Utilize `next/font/google` for `Geist` (and `Geist Mono`), providing 100% fidelity with zero layout shift.
3. **State Architecture:** Create a `CanvasNavigationContext` to manage active artboard coordinates, current view mode (Grid vs List), and active category filters with History API synchronization.
4. **Component Isolation:** Build modular primitives (`FigmaFrame`, `FloatingDock`, `CategoryFilter`, `ProjectCard`, `FaqAccordion`) before assembling master pages.

---

## 13. Supplemental Validation and Outstanding Limitations

### 1. Verified Findings That Altered Earlier Assumptions
1. **Universal Floating Dock vs Mobile Hamburger Menu:**
   - *Previous Assumption:* Standard mobile responsive patterns usually deploy a hamburger drawer menu on screens $<768px$.
   - *Verified Reality:* Snapline **does not use a hamburger menu** on tablet or mobile. The floating bottom dock (`width: ~280px`, `z-index: 1000`) remains persistently visible across desktop, tablet (768px), and mobile (390px), acting as the universal app navigation bar.
2. **Project Card Hover Animation Metaphor:**
   - *Previous Assumption:* Project cards were assumed to apply CSS zoom (`scale: 1.02`) on hover.
   - *Verified Reality:* Images do not zoom. Instead, hovering activates a Figma artboard selection frame overlay (hairline border, top tag `# Project / Cover`, 8 square corner/midpoint resize handles, and neon lime dimension badge `454 × 341`).
3. **Template Regularity across Project Pages:**
   - *Previous Assumption:* Project case studies might feature distinct bespoke layouts per client.
   - *Verified Reality:* All 6 project pages (`/work/orbit`, `/work/pilot`, `/work/kite`, `/work/grid`, `/work/bloom`, `/work/tidal`) use a **100% identical layout template**: Header with backlink and hot-pink baseline line, 5-column metadata bar (`CLIENT`, `ROLE`, `TYPE`, `YEAR`, `DURATION`), Hero artwork, Overview, The challenge, The approach, 3 metric cards, Next Project circular navigation card, and dark footer CTA.
4. **Complete Route & Journal Article Inventory:**
   - *Previous Assumption:* Earlier report summarized 15 routes and highlighted 1 journal article.
   - *Verified Reality:* The site hosts **5 distinct journal articles** and **2 distinct live legal pages** (`/privacy` and `/terms`), bringing the comprehensive verified route count to **19 routes**.
5. **Exact Canvas Dot Grid CSS:**
   - *Previous Assumption:* Dot grid was approximated as `rgba(0,0,0,0.07)` on `#F4F4F4`.
   - *Verified Reality:* The computed CSS rule is `#E6E6E3 radial-gradient(circle, #C3C3BF 1px, transparent 1.3px) 0 0 / 22px 22px`.

### 2. Form Submission Behavior Limitations (Halted Before Transmission)
- **Constraint:** To strictly adhere to web safety rules and avoid sending fake inquiries or spamming the live portfolio owner, form submission testing was intentionally halted before data transmission.
- **Verified Behavior:**
  - Focusing inputs activates a 2px solid neon lime border (`#D6FF3F`).
  - Clicking "Send enquiry" with empty fields triggers the browser's native HTML5 constraint validation popup ("Please fill out this field") on the first required input (`Name`).
  - Select comboboxes (`Service needed`, `Budget`, `Timeline`) are custom styled dropdowns.
- **Unverified Aspect:** The backend endpoint (e.g. Framer form webhook, Formspree, or custom API), the JSON response payload, and the post-submission success/error state UI (e.g. toast vs inline success card) could not be observed without transmitting real data. In Stage 1 recreation, this will be implemented with a local mock success state.

### 3. Asset Licensing & Production Replacement Requirements
- All imagery on `https://snapline.framer.website/` consists of Framer demonstration mockup assets and Unsplash photography.
- **Stage 1 (Current):** Assets are mirrored strictly for local reverse-engineering and verification. The site must remain local/private with no public deployment.
- **Stage 2 (Future Personalization):** All mockup covers, hero portrait, case study texts, and Polaroid images must be completely replaced with genuine developer portfolio content, personal projects, and original assets.

### 4. Third-Party Scripts & Telemetry Observations
- **Verified on `/privacy`:** The privacy policy explicitly affirms: "03 Analytics: I use privacy-friendly analytics that don't use cookies and don't collect personal data."
- **Network Inspection:** No intrusive tracking scripts, marketing pixels, or third-party ad beacons were observed loading during reconnaissance.
