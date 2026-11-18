# Component Specification: CV Interaction

**Component ID:** `cv-interaction`  
**Reference Target:** [https://retro-pc.framer.website/](https://retro-pc.framer.website/)  
**Inspection Date:** November 18, 2026  
**Implementation Status:** Specification Only (Not Implemented)

---

## 1. Appearance
The CV component is intentionally modeled as a vintage **3.5-inch magnetic floppy diskette** desktop icon:
- **Icon Graphic:** Crisp pixel-art representation of a 3.5" diskette showing the square plastic housing, sliding metal protective shutter, circular magnetic hub, and write-protect notch.
- **Label:** Monospace text label centered directly beneath the floppy disk graphic reading `"CV"`.
- **Contrast with Other Icons:** While other desktop icons (`Work`, `About`, `Services`, `Journal`, `Contact`) spawn internal desktop windows, the CV icon acts as a direct external resource link to download or view the creator's curriculum vitae PDF.

---

## 2. Dimensions & Bounding Boxes

### Desktop Viewport (1440 × 900)
| Element | Computed Width | Computed Height | Exact Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **CV Icon Item (Bounding Box)**| `120.3px` | `111.0px` | `(x=332.9px, y=357.1px)` |
| **Floppy Disk Pixel Glyph** | `48.0px` | `48.0px` | Centered within icon bounding box |
| **CV Label Box** | `40.0px` | `20.0px` | Positioned 8px beneath floppy disk |

### Tablet Viewport (768 × 1024)
| Element | Computed Width | Computed Height | Exact Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **CV Icon Item (Tablet)** | `86.6px` | `79.9px` | `(x=227.9px, y=274.2px)` |
| **Floppy Disk Pixel Glyph** | `36.0px` | `36.0px` | Centered in touch container |

---

## 3. Layout Structure
```
Desktop Icon Grid (Column 2, Row 3):

  Col 1                       Col 2
  +--------------+            +--------------+
  |     Work     |            |   About me   |   Row 1
  +--------------+            +--------------+
  |   Services   |            |   Journal    |   Row 2
  +--------------+            +--------------+
  |   Contact    |            | +----------+ |
  +--------------+            | | [Floppy] | |
                              | |    CV    | |   Row 3: (x=332.9, y=357.1)
                              | +----------+ |
                              +--------------+
```

---

## 4. Typography
- **Label Text:** `"CV"`
- **Font Family:** `'Chivo Mono', monospace`
- **Font Size:** `14px`
- **Line Height:** `20px`
- **Font Weight:** `400`
- **Letter Spacing:** `-0.3px`
- **Color:** `#ffb648` (`var(--token-dFSgQDg3U)`)

---

## 5. Colors & Tokens
- **Floppy Disk Housing Fill:** `rgba(255, 182, 72, 0.32)` (translucent amber body)
- **Metal Shutter & Outlines:** `#ffb648` (solid 100% amber phosphor)
- **Hover Boundary Box:** `border: 1px dashed #ffb648`
- **Hover Glow Bloom:** `filter: drop-shadow(0 0 6px rgba(255, 182, 72, 0.75))`

---

## 6. Assets (Inline SVG Pixel Art Floppy Disk)
```xml
<svg viewBox="0 0 16 16" width="48" height="48" shape-rendering="crispEdges">
  <!-- Semi-translucent Disk Housing Fill -->
  <g style="fill: #ffb648; opacity: 0.32;">
    <rect x="2" y="2" width="12" height="12" />
  </g>
  <!-- Solid Shutter, Bevel & Magnetic Hub Details -->
  <g style="fill: #ffb648; opacity: 1.0;">
    <!-- Outer Border -->
    <rect x="2" y="1" width="11" height="1" />
    <rect x="13" y="2" width="1" height="1" />
    <rect x="14" y="3" width="1" height="11" />
    <rect x="1" y="2" width="1" height="12" />
    <rect x="2" y="14" width="12" height="1" />
    <!-- Metal Sliding Shutter -->
    <rect x="4" y="1" width="7" height="6" />
    <rect x="6" y="3" width="2" height="3" fill="#020b14" />
    <!-- Write Protect Notch -->
    <rect x="2" y="12" width="1" height="1" fill="#020b14" />
  </g>
</svg>
```

---

## 7. Hover Behavior
- **Pointer Cursor:** Switches from default arrow to pixel pointing hand cursor (`pointer`).
- **Focus Border:** Dashed amber highlight box (`1px dashed #ffb648`) wraps around the floppy disk glyph and label.
- **Phosphor Bloom:** Floppy disk gains intense amber drop-shadow glow.

---

## 8. Click Behavior
- **Action Type:** External hyperlink navigation.
- **DOM Element:** An anchor tag (`<a>`) wrapping the icon container:
  ```html
  <a 
    href="https://framerusercontent.com/assets/NuMiMkt5u6yyMoFLqnZJemKpCFs.pdf" 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label="Download CV as PDF"
  >
  ```
- **Execution:** Clicking immediately opens the PDF resume in a new browser tab or triggers native PDF download, without closing or resetting the desktop state.

---

## 9. Animation Behavior
- **Click Feedback:** Brief scale depression (`transform: scale(0.94)`) for 80ms on mouse-down.
- **Hover Transition:** Smooth 150ms border opacity and filter transition.

---

## 10. Responsive Behavior
- **Desktop (1440×900):** Resides in Column 2, Row 3 of the desktop grid at `(x=332.9px, y=357.1px)`.
- **Tablet (768×1024):** Resides in Row 2, Column 3 of the 3×2 tablet top grid at `(x=227.9px, y=274.2px)`.
- **Mobile (390×844):** Placed in the compact 3×2 grid above the hero headline. Maintains `> 44px` touch hit area for mobile fingertips.
