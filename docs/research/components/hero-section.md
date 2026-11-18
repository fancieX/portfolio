# Component Specification: Hero Section & Ambient Typography

**Component ID:** `hero-section`  
**Reference Target:** [https://retro-pc.framer.website/](https://retro-pc.framer.website/)  
**Inspection Date:** November 18, 2026  
**Implementation Status:** Specification Only (Not Implemented)

---

## 1. Appearance
The Hero Section serves as the ambient wallpaper typography for the CRT desktop operating system:
- **Hero Headline:** Giant, glowing phosphor amber pixelated typography displaying the creator's name: `"Milo Varga"`.
- **Ambient Narrative Paragraph:** A tight, 4-line monospace description positioned directly above the headline describing the studio's craft and location, ending with a persistent blinking terminal block cursor `▋`.
- **Desktop Hint Prompt:** A subtle instruction line above the dock bar reading: `"Open an icon to see a page"`.

---

## 2. Dimensions & Bounding Boxes

### Desktop Viewport (1440 × 900)
| Element | Computed Width | Computed Height | Exact Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **Hero Container** | `822.3px` | `144.4px` | `(x=363.0px, y=582.4px)` |
| **Hero Headline Text** | `822.3px` | `80.0px` (font-size 100-120px) | Inside hero container |
| **Ambient Bio Paragraph Box**| `381.1px` | `115.3px` | `(x=804.3px, y=441.0px)` |
| **Desktop Hint Prompt** | `234.6px` | `18.8px` | `(x=228.6px, y=746.1px)` |

### Tablet Viewport (768 × 1024)
| Element | Computed Width | Computed Height | Exact Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **Hero Headline (Stacked)** | `432.9px` | `219.3px` | `(x=448.7px, y=332.4px)` |
| **Ambient Bio Paragraph** | `245.3px` | `99.4px` | `(x=636.3px, y=214.2px)` |

---

## 3. Layout Structure
```
+-------------------------------------------------------------------------+
| CRT Screen Canvas                                                       |
|                                                                         |
|                                  +------------------------------------+ |
|                                  | Ambient Bio Paragraph:             | |
|                                  | "Designer and creative developer   | |
|                                  | in Tallinn. Identities, packaging  | |
|                                  | and websites for brands that want  | |
|                                  | to be remembered." ▋               | |
|                                  +------------------------------------+ |
|                                                                         |
|          +------------------------------------------------------------+ |
|          | Milo Varga                                                 | |
|          +------------------------------------------------------------+ |
|                                                                         |
| "Open an icon to see a page"                                            |
| [=========================== BOTTOM DOCK =============================] |
+-------------------------------------------------------------------------+
```

---

## 4. Typography

### A. Hero Headline ("Milo Varga")
- **Font Family:** `'Jersey 10', monospace`
- **Font Size:** `100px` (Framer preset `framer-styles-preset-1yq52s8`) up to `120px`
- **Line Height:** `80px`
- **Font Weight:** `400`
- **Letter Spacing:** `-1.0px`
- **Text Transform:** None
- **Phosphor Bloom:** `text-shadow: 0 0 8px rgba(255, 182, 72, 0.6), 0 0 20px rgba(255, 182, 72, 0.25)`

### B. Ambient Bio Paragraph
- **Font Family:** `'Chivo Mono', monospace`
- **Font Size:** `17px` (Desktop) / `14px` (Tablet/Mobile)
- **Line Height:** `25px`
- **Font Weight:** `400`
- **Letter Spacing:** `-0.4px`
- **Terminal Cursor:** `▋` appended after the final period with infinite step blink.

### C. Desktop Instruction Prompt
- **Font Family:** `'Chivo Mono', monospace`
- **Font Size:** `14px`
- **Line Height:** `20px`
- **Font Weight:** `400`
- **Letter Spacing:** `-0.3px`

---

## 5. Colors & Tokens
- **Headline Text:** `var(--token-dFSgQDg3U, #ffb648)`
- **Headline Glow:** `var(--token-FJWaywfAR, #ffdba4)` at 60% opacity.
- **Ambient Paragraph Text:** `var(--token-dFSgQDg3U, #ffb648)` with subtle 40% glow.
- **Desktop Instruction Prompt:** `rgba(255, 182, 72, 0.65)` (slightly muted amber).
- **Terminal Cursor:** `#ffb648`.

---

## 6. Assets
- **Web Fonts:** WOFF2 files for `'Jersey 10'` and `'Chivo Mono'`.
- No image files; the entire hero section is rendered via pure CSS and SVG scanline raster.

---

## 7. Hover Behavior
- **Hero Headline & Paragraph:**
  - Non-interactive ambient background elements.
  - Hovering displays the standard pixel arrow cursor (`default`).
  - Selection is either disabled (`user-select: none`) or produces a retro amber text selection highlight (`::selection { background: #ffb648; color: #020b14; }`).

---

## 8. Click Behavior
- Non-interactive background layer. Clicking on the hero text focuses the desktop background and brings any floating window behind the active focus.

---

## 9. Animation Behavior
- **Terminal Cursor Blink:**
  ```css
  @keyframes typed-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .terminal-cursor {
    display: inline-block;
    animation: typed-blink 1s step-end infinite;
  }
  ```
- **CRT Scanline Intersection:**
  - As scanline raster overlays the text, characters exhibit an authentic horizontal interlaced texture.

---

## 10. Responsive Behavior
- **Desktop (1440×900):**
  - Hero headline spans `822px` on a single horizontal line at `100px - 120px`.
  - Ambient paragraph wraps into 4 lines in the upper right.
  - Desktop instruction prompt is visible above the dock.
- **Tablet (768×1024):**
  - Hero headline scales down to `~96px` and wraps into two stacked lines:
    ```
    Milo
    Varga
    ```
  - Instruction prompt is hidden to optimize space.
- **Mobile (390×844):**
  - Hero headline scales down to `~48px - 56px` centered horizontally.
  - Bio paragraph scales to `13px - 14px` centered above the headline.
  - Instruction prompt is hidden.
