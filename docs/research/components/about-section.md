# Component Specification: About Me Interface

**Component ID:** `about-section`  
**Reference Target:** [https://retro-pc.framer.website/about](https://retro-pc.framer.website/about)  
**Inspection Date:** November 18, 2026  
**Implementation Status:** Specification Only (Not Implemented)

---

## 1. Appearance
The About Me component presents the designer's personal studio practice inside an authentic vintage application window:
- **Header:** Retro titlebar displaying breadcrumb path `Desktop / About me` and window controls (`Maximize`, `Close`).
- **Avatar & Bio:** 1-bit amber pixel-art avatar portrait of Milo Varga paired with an autobiographical narrative outlining design philosophy, boutique studio work in Tallinn, and craft values.
- **Competencies:** Structured list of studio capabilities (*Brand Identity*, *Bespoke Packaging*, *Custom Framer Websites*).
- **Client Roster & Honors:** High-contrast lists of boutique clients, design awards (Awwwards, FWA, Type Directors Club), and an engineering colophon detailing typography, shaders, and hosting.

---

## 2. Dimensions & Bounding Boxes

| Element | Computed Width | Computed Height | Exact Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **About Window (Standard)** | `788.3px` | `520.0px` | `(x=429.1px, y=137.1px)` |
| **Titlebar Header Bar** | `788.3px` | `32.0px` | Top edge of window |
| **Pixel Avatar Portrait** | `140.0px` | `140.0px` | Upper left of bio section |
| **Studio Narrative Column** | `~460.0px` | Auto | Beside avatar portrait |
| **Selected Clients Column** | `~340.0px` | Auto | Lower-left quadrant |
| **Recognition & Colophon Box** | `~340.0px` | Auto | Lower-right quadrant |

---

## 3. Layout Structure
```
+-------------------------------------------------------------------------+
| [=] Desktop / About me                                        [ [ ] ] [X] |
+-------------------------------------------------------------------------+
|                                                                         |
|  +---------------+  +-------------------------------------------------+ |
|  | [Pixel Avatar]|  | "I design brand identities, packaging, and      | |
|  |  Milo Varga   |  | websites for founders and independent studios." | |
|  |  (140 x 140)  |  |                                                 | |
|  +---------------+  | Based in Kalamaja, Tallinn, Estonia.            | |
|                     +-------------------------------------------------+ |
|                                                                         |
|  +-------------------------------+   +-------------------------------+  |
|  | SELECTED CLIENTS              |   | RECOGNITION & COLOPHON        |  |
|  | • Studio Nord (Helsinki)      |   | • Awwwards Site of the Day    |  |
|  | • Leaven Bakery (Tartu)       |   | • FWA of the Day              |  |
|  | • Bolt Design System          |   | • Type Directors Club (2024)  |  |
|  | • Kiosk Press (Berlin)        |   | • Colophon: Jersey 10 & Chivo |  |
|  +-------------------------------+   +-------------------------------+  |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## 4. Typography
- **Window Title / Breadcrumb:** `'Chivo Mono', monospace`, `14px`, `line-height: 20px`, `font-weight: 600`, color `#020b14`.
- **Bio Headline:** `'Chivo Mono', monospace`, `20px`, `line-height: 28px`, `font-weight: 600`, color `#ffb648`.
- **Bio Body Paragraphs:** `'Chivo Mono', monospace`, `14px`, `line-height: 22px`, `font-weight: 400`, color `rgba(255, 182, 72, 0.90)`.
- **Section Headers ("SELECTED CLIENTS"):** `'Chivo Mono', monospace`, `14px`, `line-height: 20px`, `font-weight: 600`, uppercase, color `#ffb648`.
- **List Items & Accolades:** `'Chivo Mono', monospace`, `13px`, `line-height: 20px`, `font-weight: 400`, color `rgba(255, 182, 72, 0.80)`.
- **Colophon Code Notes:** `'Chivo Mono', monospace`, `12px`, `line-height: 18px`, `font-weight: 400`.

---

## 5. Colors & Tokens
- **Window Background:** `rgba(2, 11, 20, 0.94)`
- **Header Titlebar Fill:** `var(--token-dFSgQDg3U, #ffb648)`
- **Header Titlebar Text:** `#020b14`
- **Section Dividers:** `1px solid rgba(255, 182, 72, 0.28)`
- **Avatar Silhouette Fill:** Amber phosphor `#ffb648` over `#020b14` canvas.
- **Link Text:** `#ffb648` with hover underline.

---

## 6. Assets
- **Pixel Avatar:** 1-bit retro monochrome bitmap avatar illustration of Milo Varga (rendered as SVG or crisp WebP).
- **Client & Award Glyphs:** Vector monochrome glyphs for external awards (Awwwards, FWA).

---

## 7. Hover Behavior
- **External Client & Award Links:**
  - Cursor switches to pixel hand pointer.
  - Text underlines (`text-decoration: underline`).
  - Text-shadow bloom flares to `0 0 8px rgba(255, 182, 72, 0.8)`.
- **Avatar Image:** Subtle phosphor scanline glow effect on hover.

---

## 8. Click Behavior
- **Clicking Client / Award Links:** Opens destination site/profile in a new browser tab (`target="_blank"`).
- **Clicking Close Button (`[X]`):** Closes window and navigates back to `/`.
- **Clicking Maximize Button (`[ ]`):** Expands window to fill the entire active CRT display canvas.

---

## 9. Animation Behavior
- **Window Open Spring:** Framer Motion spring physics (`stiffness: 300, damping: 30`).
- **Tab & Section Fade:** Smooth cross-fade when switching sub-sections.
- **Scroll Momentum:** Custom amber scrollbar with smooth touch/mouse-wheel momentum.

---

## 10. Responsive Behavior
- **Desktop (1440×900):** Side-by-side split layout (avatar + bio on top, 2-column client/awards grid below).
- **Tablet (768×1024):** Bio and lists stack vertically with 100% width.
- **Mobile (390×844):** Single-column vertical layout. Avatar scales to `100px × 100px` centered above the bio. All lists stack with touch-friendly spacing.
