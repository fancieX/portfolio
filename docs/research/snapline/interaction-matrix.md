# Interaction Matrix: Snapline Developer Portfolio

**Reference Website:** [https://snapline.framer.website/](https://snapline.framer.website/)  
**Document Link:** [interaction-matrix.md](./interaction-matrix.md)  
**Status:** Comprehensive Supplemental Verification (Distinguishing Verified Facts from Hypotheses)

---

## 1. Nine Priority Interactions — Observable Facts vs. Implementation Hypotheses

| # | Target Interaction | Verified Observable Behavior (Empirical Facts) | Implementation Hypothesis (Engineering Strategy) | Verification Status |
|---|---|---|---|---|
| **1** | **Navigation Dock Hover & Active States** | • Active tab displays a solid dark container (`#0A0A0A`, `border-radius: 16px`, matching the container roundness `rounded-2xl`) with icon in neon lime (`#D6FF3F`).<br>• Inactive icons render with muted gray stroke (`#666666`); hover illuminates light gray bounding area (`#EAEAEA`).<br>• Outer container corner radius is `16px` (`rounded-2xl`).<br>• Global keyboard hotkeys: `H` (Home `/`), `W` (Work `/work`), `A` (About `/about`), `J` (Journal `/journal`), `C` (Contact `/contact`).<br>• No floating text tooltips are rendered on hover (minimal Figma tool icons). | React state + sliding indicator with transition (`transform: translateX`). | **VERIFIED** |
| **2** | **Work Card Hover Preview & Selection** | • Hovering a project card in Grid view renders an active Figma frame selector: hairline border enclosing card, top tag `# Project / Cover`, 8 square corner/midpoint resize handles (`6px × 6px`), and neon lime dimension badge (e.g. `454 × 341`).<br>• Image does NOT zoom via CSS `scale`; visual metaphor is artboard selection. | CSS `opacity` transition on pseudo-elements or absolute overlay component driven by container hover state (`group-hover`). | **VERIFIED** |
| **3** | **Filter Buttons & View Toggle on `/work`** | • Active filter pill renders solid black (`#0A0A0A`) with white text and count indicator (e.g. `All · 6`).<br>• Inactive pills render white with hairline border (`rgba(0,0,0,0.08)`) and muted text.<br>• Clicking filter instantly updates visible cards.<br>• Grid vs List toggle is a 2-option segmented pill; switching to List replaces image cards with indexed tabular rows. | React state filter array (`selectedCategory`). Framer Motion `layout` prop on card container for fluid spring re-ordering. | **VERIFIED** |
| **4** | **Journal Article Hover on `/journal`** | • Hovering over an article row darkens title typography, triggers horizontal translation on arrow icon (`translateX(4px)`), and applies a subtle off-white background tint. | CSS `transition: all 0.2s ease` with Tailwind `group-hover:translate-x-1`. | **VERIFIED** |
| **5** | **Contact Form Focus & Validation** | • Form input focus applies a glowing neon lime border (`#D6FF3F`, `2px solid`).<br>• Comboboxes for `Service needed`, `Budget`, and `Timeline` are custom styled select dropdowns.<br>• Empty submission triggers browser native HTML5 validation popup on first empty required field (`Name`).<br>• Send inquiry button is full-width pill with `#D6FF3F` background and black bold text. | React controlled form state with native HTML5 `required` constraints. Client-side submit handler prevented during reconnaissance. | **VERIFIED** (Halted before submission) |
| **6** | **Social Link Hovers** | • Social links in footer and contact sidebar (`LinkedIn`, `Dribbble`, `Instagram`, `X`) are pill-shaped buttons with light border.<br>• Hover smoothly shifts background from off-white to solid dark/inverted fill with `150ms` transition. | CSS `transition: background-color 150ms ease, color 150ms ease`. | **VERIFIED** |
| **7** | **Mobile Navigation (390px)** | • Floating dock remains pinned at bottom (`bottom: 16px`, `width: 280px`, `backdrop-filter: blur(12px)`) across all pages.<br>• Top header height is `56px`, retaining `Maya.` on left and `Get in touch` button on right.<br>• **NO hamburger drawer menu** exists on mobile or tablet; universal dock handles all 5 primary page routes. | Universal fixed positioning `bottom: 16px; left: 50%; transform: translateX(-50%); z-index: 1000;`. | **VERIFIED** |
| **8** | **Scroll-Triggered Animations** | • Cards, project rows, and editorial text blocks fade in and translate upward (`opacity: 0 -> 1`, `translateY(16px) -> translateY(0)`) as they scroll into view. | Framer Motion `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true, margin: "-50px" }}`. | **VERIFIED** |
| **9** | **Page Transitions & Canvas Pan** | • Moving between routes triggers a 1.46s spatial canvas camera translation: zoom-out to artboard card (`scale: 0.44`, `border-radius: 34px`, flight shadow `0 60px 140px -40px rgba(0,0,0,0.28)`), horizontal pan across dot grid (`translateX(-51vw) / translateX(51vw)`), and zoom-in to target page.<br>• On mobile (<700px), scales to `0.60`.<br>• Fully disabled when `prefers-reduced-motion` is active. | Native CSS View Transitions API (`::view-transition-old/new(root)`) with custom piecewise keyframes `snp-out` / `snp-in` and Next.js `document.startViewTransition`. | **VERIFIED (Extracted 1:1 from live Framer DOM)** |

---

## 2. Additional Micro-Interactions Verified

### 1. Lisbon Clock Real-Time Sync
- **Observed Behavior:** 24-hour real-time clock in footer updates every second (`HH:MM in Lisbon`).
- **Implementation Hypothesis:** `setInterval` inside a React `useEffect`, formatting current time to `Europe/Lisbon` timezone.

### 2. Simulated Multiplayer Cursors (`.snp-re-cur` & `.snp-pl-cur`)
- **Verified Live Behavior:** Only two collaborator cursors exist on the homepage:
  1. `"Lena · PM"` (`.snp-re-cur` inside `.snp-re` on hero RoleRotator): `#D6FF3F` pill / `#0A0A0A` text (`12px` semibold, `4px 9px` padding, `7px 7px 7px 2px` radius), drifts near the role headline, collaborates on word selection/retyping, and evades the user's pointer within `120px`.
  2. `"Sam · Dev"` (`.snp-pl-cur` inside `.snp-pl` on hero portrait): `#0A0A0A` pill / `#FFFFFF` text (`12px` semibold, `4px 9px` padding, `7px 7px 7px 2px` radius), wanders strictly within the portrait frame bounds without pointer evasion, and periodically spawns white `.snp-cmt` comment bubbles (`scale: 0.3 -> 1`, `transition: scale .55s cubic-bezier(.34,1.56,.64,1), opacity .3s`).
- **Breakpoint Behavior:** Both `"Lena · PM"` and `"Sam · Dev"` (along with `.snp-cmt` popups) remain visible and animate smoothly across desktop (`1440×900`), tablet (`768×1024`), and mobile (`390×844`) with `pointer-events: none` so touch interactions are never blocked.

### 3. FAQ Accordions on `/about`
- **Observed Behavior:** Clicking an FAQ question smoothly expands container height from `0px` to `auto`. The `+` circular indicator turns neon lime and rotates 45° to form an `x`.
- **Implementation Hypothesis:** `AnimatePresence` with height spring animation (`stiffness: 300, damping: 25`).

### 4. Interactive 404 Polaroid Draggable Cards
- **Observed Behavior:** 3 photo cards fanned out on `/404` (`# Layer 01`, `# Layer 02`, `# Layer 03`) can be grabbed and dragged freely across the canvas with elevated shadow and boundary collision.
- **Implementation Hypothesis:** Framer Motion `drag` with `dragConstraints` and inertia spring physics.

### 5. Process Prototype Flow Connectors (`.snp-pf`) & Step Cards (`.framer-TEu6n`)
- **Verified Live Behavior:** In the homepage `"How I shape every design project"` section, 4 alternating left/right step cards (`01 / RESEARCH`, `02 / DESIGN`, `03 / DEVELOP`, `04 / HANDOFF`) are wired by an `SVG` prototype overlay (`stroke: #0A0A0A`, `1.6px`):
  - **Wide (`>860px`):** Cubic Bezier connector `M sx,sy C ex,sy ex,sy ex,ey` exiting inner side edge center to top center of the next card.
  - **Narrow (`<=860px`):** Vertical line `M sx,sy L ex,ey` connecting stacked cards.
  - **Scroll-Scrubbing:** Normalized scroll progress `clamp(0, 1, (innerHeight * 0.72 - top) / (span + 120))` drives `stroke-dashoffset`, moves the `#D6FF3F` (`r=5.5`) pulse dot along `getPointAtLength`, displays `"On click"` (`11px`, `#605F5F`) beside the `#FFFFFF` start port (`r=5`), and reveals the solid arrowhead when `progress >= 0.99`.
  - **Card Press Feedback:** Pressing any process card scales it to `0.97` (`0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`).
