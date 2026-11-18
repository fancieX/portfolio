# Component Specification: Journal Interface

**Component ID:** `journal-section`  
**Reference Target:** [https://retro-pc.framer.website/journal](https://retro-pc.framer.website/journal)  
**Inspection Date:** November 18, 2026  
**Implementation Status:** Specification Only (Not Implemented)

---

## 1. Appearance
The Journal component functions as an editorial reading application window:
- **Index View:** A retro list of design articles displaying publication years, essay titles, and estimated reading times separated by subtle amber horizontal dividers.
- **Reader Modal View (`/journal/[slug]`):** Selecting an essay opens an immersive long-form reader with article title, date banner, back button, formatted body paragraphs, blockquotes, and retro section breaks.

---

## 2. Dimensions & Bounding Boxes

| Element | Computed Width | Computed Height | Exact Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **Journal Window (Standard)** | `788.3px` | `520.0px` | `(x=429.1px, y=137.1px)` |
| **Titlebar Header Bar** | `788.3px` | `32.0px` | Top edge of window |
| **Article Row Item** | `740.0px` | `64.0px` | Vertically stacked in index |
| **Article Year / Date Tag** | `60.0px` | `20.0px` | Left side of article row |
| **Article Title Box** | `~560.0px` | `24.0px` | Center of article row |
| **Article Read Time Tag** | `80.0px` | `20.0px` | Right side of article row |
| **Reader View Prose Column** | `680.0px` | Auto | Centered in reader modal |

---

## 3. Layout Structure
```
+-------------------------------------------------------------------------+
| [=] Desktop / Journal                                         [ [ ] ] [X] |
+-------------------------------------------------------------------------+
|                                                                         |
|  2025   Put your brief on one page                              4 min   |
|  ---------------------------------------------------------------------  |
|  2024   Dielines that printers will actually like               6 min   |
|  ---------------------------------------------------------------------  |
|  2024   What four years of solo practice taught me              8 min   |
|  ---------------------------------------------------------------------  |
|  2023   A website is not a brochure                             5 min   |
|  ---------------------------------------------------------------------  |
|  2023   Stop using 12 column grids for everything               7 min   |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## 4. Typography
- **Window Title / Breadcrumb:** `'Chivo Mono', monospace`, `14px`, `line-height: 20px`, `font-weight: 600`, color `#020b14`.
- **Article Row Title:** `'Chivo Mono', monospace`, `16px`, `line-height: 24px`, `font-weight: 500`, color `#ffb648`.
- **Article Year & Read Time:** `'Chivo Mono', monospace`, `13px`, `line-height: 18px`, `font-weight: 400`, color `rgba(255, 182, 72, 0.65)`.
- **Reader Article Title:** `'Chivo Mono', monospace`, `24px`, `line-height: 32px`, `font-weight: 600`, color `#ffb648`.
- **Reader Body Prose:** `'Chivo Mono', monospace`, `15px`, `line-height: 26px`, `font-weight: 400`, color `rgba(255, 182, 72, 0.90)`.
- **Reader Blockquote:** `'Chivo Mono', monospace`, `15px`, `line-height: 24px`, `font-style: italic`, border-left amber line.

---

## 5. Colors & Tokens
- **Window Background:** `rgba(2, 11, 20, 0.94)`
- **Header Titlebar Fill:** `var(--token-dFSgQDg3U, #ffb648)`
- **Row Hover Fill:** `rgba(255, 182, 72, 0.08)`
- **Horizontal Row Dividers:** `1px solid rgba(255, 182, 72, 0.20)`
- **Active / Hover Text Bloom:** `text-shadow: 0 0 8px rgba(255, 182, 72, 0.65)`

---

## 6. Assets (5 Curated Articles)
1. *"Put your brief on one page"* (2025) · 4 min
2. *"Dielines that printers will actually like"* (2024) · 6 min
3. *"What four years of solo practice taught me"* (2024) · 8 min
4. *"A website is not a brochure"* (2023) · 5 min
5. *"Stop using 12 column grids for everything"* (2023) · 7 min

---

## 7. Hover Behavior
- **Article Rows:**
  - Cursor switches to pixel hand pointer.
  - Background transitions to `rgba(255, 182, 72, 0.08)`.
  - Title text glows with amber phosphor bloom.
  - Optional retro pointer arrow `→` appears at row edge.

---

## 8. Click Behavior
- **Clicking an Article Row:**
  - Opens the article reader modal view (`/journal/[slug]`).
  - Window breadcrumb updates to `Desktop / Journal / [Article Slug]`.
- **Clicking Reader Back Button (`← Journal`):**
  - Restores the article index list without closing the window.

---

## 9. Animation Behavior
- **Row Highlight:** 100ms smooth CSS transition on hover.
- **Article Reader Slide:** Slide-in from right (`x: 20px -> 0px, opacity: 0 -> 1`) with spring damping.
- **Scrollbar:** Custom amber thumb with smooth reading scroll.

---

## 10. Responsive Behavior
- **Desktop (1440×900):** Full horizontal row layout with year on left, title in center, and read time on right.
- **Tablet (768×1024):** Title wraps cleanly; year and read time maintain alignment.
- **Mobile (390×844):** Rows stack vertically: Year and read time render on a top line in smaller monospace text (`11px`), with article title rendered prominently below.
