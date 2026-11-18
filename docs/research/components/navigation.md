# Component Specification: Navigation & Dock

**Component ID:** `navigation`  
**Reference Target:** [https://retro-pc.framer.website/](https://retro-pc.framer.website/)  
**Inspection Date:** November 18, 2026  
**Implementation Status:** Specification Only (Not Implemented)

---

## 1. Appearance
The navigation system consists of two coordinated systems:
1. **Desktop Icons Grid:** 6 chunky retro pixel-art desktop icons with centered labels located on the left side of the CRT screen. Each icon represents a core portfolio application (`Work`, `About me`, `Services`, `Journal`, `Contact`, `CV`).
2. **Bottom Dock Bar:** A fixed bottom application dock strip spanning the active screen width. It houses 5 mini quick-launch icons on the left, an active window pill indicator, a studio availability badge, a sound toggle button, and a real-time 24-hour clock on the right.

---

## 2. Dimensions & Bounding Boxes

### Desktop Viewport (1440 × 900)
| Element | Width | Height | Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **Desktop Icon Item (Bounding Box)**| `120.3px` | `111.0px` | Col 1 `x=222.6px`, Col 2 `x=332.9px` |
| **Desktop Icon Pixel Glyph** | `48px` | `48px` | Centered within icon bounding box |
| **Desktop Icon Label** | `~100px` | `20px` | Positioned 8px beneath glyph |
| **Bottom Dock Container** | `808px` | `48px` | Pinned to bottom of active screen |
| **Dock Mini Icon** | `24px` | `24px` | Left dock area, `16px` gap |
| **Dock Active Window Pill** | Dynamic (`~72px`) | `28px` | Centered next to mini icons |
| **Studio Availability Badge** | `162.4px` | `18.8px` | `(x=909.4px, y=799.6px)` |
| **Sound Toggle Button** | `36.1px` | `36.1px` | `(x=1097.9px, y=789.0px)` |
| **Live Digital Clock** | `45.1px` | `18.4px` | `(x=1164.1px, y=799.6px)` |

### Tablet Viewport (768 × 1024)
| Element | Width | Height | Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **Desktop Icon Item** | `86.6px` | `79.9px` | 3-column top grid `(y=108.7px, y=191.4px)` |
| **Sound Button** | `26.0px` | `26.0px` | `(x=801.6px, y=592.1px)` |
| **Clock Text** | `32.5px` | `12.8px` | `(x=849.2px, y=599.8px)` |

---

## 3. Layout Structure

### Desktop Layout (2 Columns × 3 Rows)
```
  [Col 1: x≈222px]        [Col 2: x≈332px]
  +--------------+        +--------------+
  |  [Folder]    |        |  [Document]  |
  |     Work     |        |   About me   |   Row 1: y=127px
  +--------------+        +--------------+
  | [Briefcase]  |        |  [Notebook]  |
  |   Services   |        |   Journal    |   Row 2: y=242px
  +--------------+        +--------------+
  |  [Envelope]  |        |   [Floppy]   |
  |   Contact    |        |      CV      |   Row 3: y=357px
  +--------------+        +--------------+

+-----------------------------------------------------------------------+
| DOCK: [W] [A] [S] [J] [C]  [Active: Work]    [• Booking] [Speaker] 22:30 |
+-----------------------------------------------------------------------+
```

---

## 4. Typography
- **Desktop Icon Labels:** `'Chivo Mono', monospace`, `14px`, `line-height: 20px`, `letter-spacing: -0.3px`, `font-weight: 400`, color `#ffb648`.
- **Dock Status Text:** `'Chivo Mono', monospace`, `11px`, `line-height: 14px`, `font-weight: 400`.
- **Clock Text:** `'Chivo Mono', monospace`, `14px`, tabular figures (`font-variant-numeric: tabular-nums`).

---

## 5. Colors & Tokens
- **Icon Vector Fill:** `var(--token-dFSgQDg3U, #ffb648)` with `opacity: 0.32` on body, `opacity: 1.0` on strokes.
- **Icon Hover Outline:** `1px dashed #ffb648`.
- **Dock Bar Background:** `rgba(2, 11, 20, 0.85)` with `border-top: 1px solid rgba(255, 182, 72, 0.28)`.
- **Active Window Dock Pill:** Background `#ffb648`, text `#020b14` (inverted contrast).
- **Availability Indicator Dot:** `#22c55e` (live green phosphor).

---

## 6. Assets (Inline SVG Pixel Icons, 16×16 Grid)
All icons utilize inline SVG vectors with `shape-rendering="crispEdges"`:
1. `Work`: Retro file folder with protruding top tab.
2. `About me`: Document page with upper-right corner dog-ear fold and horizontal lines.
3. `Services`: Hard-shell rectangular briefcase with top handle.
4. `Journal`: Open notebook publication spread with bookmark ribbon.
5. `Contact`: Vintage post envelope with sealed flap geometry.
6. `CV`: 3.5" magnetic floppy disk with metal shutter slider and write-protect notch.

---

## 7. Hover Behavior
- **Desktop Icons:**
  - Cursor changes to pixel hand pointer (`pointer`).
  - A dashed amber border (`border: 1px dashed #ffb648`) wraps the icon item.
  - Phosphor bloom intensity increases via `filter: drop-shadow(0 0 6px rgba(255, 182, 72, 0.75))`.
- **Dock Mini Icons:**
  - Background gains a subtle amber highlight `rgba(255, 182, 72, 0.15)`.
  - Tooltip displays application name.
- **Availability Badge:**
  - Hover highlights badge pill border.

---

## 8. Click Behavior
- **Single Click on Desktop Icon:**
  - For `Work`, `About me`, `Services`, `Journal`, `Contact`: Spawns or restores the corresponding application window inside the CRT screen canvas and updates the URL route (`/work`, etc.).
  - For `CV`: Opens the resume PDF in a new browser tab (`target="_blank"`).
- **Click on Dock Mini Icon:**
  - If window is closed: Opens and focuses window.
  - If window is open & focused: Minimizes window or brings to top z-index.
- **Click on Active Window Tab Pill:** Restores or centers the active window.

---

## 9. Animation Behavior
- **Icon Selection Pulse:**
  - On click, icon briefly compresses scale (`transform: scale(0.95)`) for 80ms before opening window.
- **Dock Pill Appearance:**
  - Slide-up fade transition (`opacity: 0 -> 1, y: 10px -> 0px`) with Framer Motion spring (`stiffness: 350, damping: 25`).

---

## 10. Responsive Behavior
- **Desktop (1440×900):**
  - Icons positioned in 2 columns × 3 rows on the left.
  - Dock bar shows all 5 mini icons, active tab, availability badge, sound toggle, and clock.
- **Tablet (768×1024):**
  - Icons reorder into a **3-column × 2-row grid** across the top of the screen (`86.6px × 79.9px`).
  - Dock hides the availability badge (`"• Booking from March"`) to prevent dock overflow.
- **Mobile (390×844):**
  - Icons form a compact grid above the centered headline.
  - Dock pins 5 mini icons, active window pill badge, sound toggle, and clock to the bottom edge.
