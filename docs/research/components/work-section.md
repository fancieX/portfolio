# Component Specification: Work & Projects Interface

**Component ID:** `work-section`  
**Reference Target:** [https://retro-pc.framer.website/work](https://retro-pc.framer.website/work)  
**Inspection Date:** November 18, 2026  
**Implementation Status:** Specification Only (Not Implemented)

---

## 1. Appearance
The Work & Projects component functions as a full-featured retro desktop application window:
- **Window Frame:** A beveled vintage GUI window floating inside the CRT screen canvas. It features a horizontal-striped header titlebar, breadcrumb path indicator (`Desktop / Work`), and top-right window action buttons (Maximize and Close).
- **Project Grid:** Displays 10 curated design and packaging projects in a 3-column retro grid. Each project card features an amber dithered/duotone thumbnail image, project title, year, and service tags.
- **Detail Case Study View (`/work/[slug]`):** Clicking any project card opens a focused project window with high-resolution imagery, client briefs, year, services, deliverables, and gallery views.

---

## 2. Dimensions & Bounding Boxes

### Desktop Viewport (1440 × 900)
| Element | Computed Width | Computed Height | Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **Work Window (Standard)** | `788.3px` | `41.6px` (header) / ~480px body | `(x=429.1px, y=137.1px)` |
| **Work Window (Maximized)**| `808.0px` | `520.0px` | Expands to full active CRT bounds |
| **Titlebar Header Bar** | `788.3px` | `32.0px` | Top edge of window |
| **Window Action Buttons** | `32.1px` | `32.1px` each | Maximize `x=1139.2px`, Close `x=1179.3px` |
| **Project Card (e.g. Bolo)**| `240.0px` | `251.4px` | `(x=447.2px, y=198.8px)` |
| **Project Thumbnail Image**| `240.0px` | `180.0px` | Top portion of card |
| **Project Card Meta Box** | `240.0px` | `71.4px` | Bottom portion of card |

### Tablet Viewport (768 × 1024)
| Element | Computed Width | Computed Height | Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **Work Window Header** | `607.5px` | `29.9px` | `(x=297.2px, y=115.9px)` |
| **Project Card (Tablet)** | `191.0px` | `194.6px` | 2-column grid |
| **Close Button (Tablet)** | `23.1px` | `23.1px` | `(x=877.3px, y=89.2px)` |

---

## 3. Layout Structure
```
+-------------------------------------------------------------------------+
| [=] Desktop / Work                                            [ [ ] ] [X] |
+-------------------------------------------------------------------------+
|                                                                         |
|  +--------------------+  +--------------------+  +--------------------+ |
|  | [Thumbnail Image]  |  | [Thumbnail Image]  |  | [Thumbnail Image]  | |
|  | Bolo 2025          |  | Last Light 2025    |  | Rumo 2025          | |
|  | Cake packaging     |  | Press box & launch |  | Meal pouches (03)  | |
|  +--------------------+  +--------------------+  +--------------------+ |
|                                                                         |
|  +--------------------+  +--------------------+  +--------------------+ |
|  | [Thumbnail Image]  |  | [Thumbnail Image]  |  | [Thumbnail Image]  | |
|  | Recibo 2025        |  | Kopje 2024         |  | Vidro 2024         | |
|  | Q2 financial report|  | Cup carrier & bag  |  | Glass specimen book| |
|  +--------------------+  +--------------------+  +--------------------+ |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## 4. Typography
- **Window Title / Breadcrumb:** `'Chivo Mono', monospace`, `14px`, `line-height: 20px`, `font-weight: 500-600`, color `#020b14` (dark on amber header).
- **Project Card Title:** `'Chivo Mono', monospace`, `16px`, `line-height: 22px`, `font-weight: 600`, color `#ffb648`.
- **Project Year & Category:** `'Chivo Mono', monospace`, `12px`, `line-height: 16px`, `font-weight: 400`, color `rgba(255, 182, 72, 0.75)`.
- **Case Study Detail Headers:** `'Chivo Mono', monospace`, `22px`, `line-height: 28px`, `font-weight: 600`.
- **Case Study Body Text:** `'Chivo Mono', monospace`, `14px`, `line-height: 22px`, `font-weight: 400`.

---

## 5. Colors & Tokens
- **Window Body Background:** `rgba(2, 11, 20, 0.94)`
- **Window Titlebar Header:** `var(--token-dFSgQDg3U, #ffb648)`
- **Titlebar Text:** `#020b14` (deep charcoal navy)
- **Window Outer Border:** `1px solid rgba(255, 182, 72, 0.28)`
- **Project Card Background:** `rgba(255, 182, 72, 0.10)`
- **Project Card Border:** `1px solid rgba(255, 182, 72, 0.28)`
- **Project Card Hover Border:** `1px solid #ffb648`
- **Thumbnail Filter:** Amber tint with `mix-blend-mode: luminosity` or SVG amber duotone matrix.

---

## 6. Assets (10 Project Showcase Items)
1. **Bolo (2025):** Cake packaging design.
2. **Last Light (2025):** Game launch kit and press box with USB drive.
3. **Rumo (2025):** Meal pouches (03) branding.
4. **Recibo (2025):** Q2 financial report editorial design.
5. **Kopje (2024):** Cup carrier and branded takeout bag.
6. **Vidro (2024):** Glass specimen book.
7. **Cais (2024):** Granite trail cards.
8. **Corte (2023):** Gift box and cards.
9. **Viga (2023):** Steel beam business card.
10. **Dobra (2023):** Photo gallery tablet UI.

---

## 7. Hover Behavior
- **Project Cards:**
  - Cursor changes to pixel hand pointer.
  - Card frame brightens with amber glow: `box-shadow: 0 0 12px rgba(255, 182, 72, 0.25)`.
  - Border transitions from `28%` opacity to `100%` solid amber (`#ffb648`).
  - Slight scale-up: `transform: translateY(-2px)`.
- **Window Action Buttons (`Maximize`, `Close`):**
  - Background inverts from solid amber to dark navy, or bevel inverts.

---

## 8. Click Behavior
- **Clicking a Project Card:** Navigates to `/work/[slug]` (e.g. `/work/bolo`), transitioning the window into the case study reader view.
- **Clicking Maximize Button (`[ ]`):**
  - Toggles window dimensions between floating box (`788px`) and full CRT canvas (`808px`).
  - Maximize icon switches to restore icon (overlapping windows).
- **Clicking Close Button (`[X]`):**
  - Closes window with a quick scale-fade out animation and returns route to `/` (clean desktop).

---

## 9. Animation Behavior
- **Window Open Transition:**
  ```javascript
  // Framer Motion Spring Config
  initial={{ opacity: 0, scale: 0.92, y: 12 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
  ```
- **Internal Scrolling:**
  - Overflow is contained within `.window-body`. Custom amber scrollbars (`8px`) handle vertical scrolling smoothly.

---

## 10. Responsive Behavior
- **Desktop (1440×900):** 3-column project grid with `240px` card widths and `16px` gaps.
- **Tablet (768×1024):** Responsive 2-column grid with `191px` card widths.
- **Mobile (390×844):** 1-column (or 2-column compact) vertical stack. Window fills 100% of mobile CRT bounds, occluding desktop background icons.
