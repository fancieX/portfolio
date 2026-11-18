# Component Specification: Main Computer Desktop Interface

**Component ID:** `desktop-interface`  
**Reference Target:** [https://retro-pc.framer.website/](https://retro-pc.framer.website/)  
**Inspection Date:** November 18, 2026  
**Implementation Status:** Specification Only (Not Implemented)

---

## 1. Appearance
The Main Computer Desktop Interface creates a dual-perspective retro personal computing environment:
1. **Full Desk Environment (Zoomed Out):** A 3D workstation scene composed of a warm wooden desk surface, a beige mechanical keyboard with dark keycaps, a beige two-button ball mouse, a vertical desktop computer chassis, and dramatic Venetian blind sunlight streaks.
2. **Monitor Close-Up (Zoomed In, Default):** The camera frames the vintage beige CRT monitor. The screen displays an amber monochrome phosphor operating system with curved glass corners, an ambient scanline overlay, an inner tube shadow vignette, specular glass reflections, and glowing phosphor pixel graphics.

---

## 2. Dimensions & Bounding Boxes

| Element | Computed Width | Computed Height | Exact Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **Desk Viewport Container** | `100vw` (1440px) | `100vh` (900px) | Full browser viewport |
| **CRT Outer Chassis** | `1036px` | `693.6px` | Centered horizontally & vertically |
| **Active CRT Glass Screen** | `808px` | `568.5px` | `(x=114px, y=62.5px)` relative to chassis |
| **Camera Controls Box** | `44px` | `82px` | `(x=24px, y=794px)` bottom-left corner |
| **Zoom In Button** | `36px` | `36px` | Top button in camera control pill |
| **Zoom Out Button** | `36px` | `36px` | Bottom button in camera control pill |
| **Bottom Dock Bar** | `808px` (matches CRT) | `48px` | Pinned to bottom edge of active CRT screen |

---

## 3. Layout Structure
```
+-------------------------------------------------------------------------+
| Browser Viewport (1440x900)                                             |
|                                                                         |
|       +---------------------------------------------------------+       |
|       | CRT Monitor Chassis (1036 x 693.6)                      |       |
|       |  +---------------------------------------------------+  |       |
|       |  | Active CRT Glass Screen (808 x 568.5)             |  |       |
|       |  | [Icons Grid]                  [Bio Paragraph]     |  |       |
|       |  |                               [Headline Hero]     |  |       |
|       |  |                                                   |  |       |
|       |  | +-----------------------------------------------+ |  |       |
|       |  | | Bottom Dock Bar (Quick Icons / Status / Clock)| |  |       |
|       |  | +-----------------------------------------------+ |  |       |
|       |  +---------------------------------------------------+  |       |
|       |                             [Power Switch & Green LED]  |       |
|       +---------------------------------------------------------+       |
|                                                                         |
| [Camera Controls]                                                       |
+-------------------------------------------------------------------------+
```

---

## 4. Typography
- **Desktop Status & Prompt:** `'Chivo Mono', monospace`, `14px`, `line-height: 20px`, `font-weight: 400`, color `#ffb648`.
- **Camera Control Labels:** Monospace tooltips (`"Zoom in"`, `"Zoom out"`).
- **Casing Branding / Badging:** Debossed or printed retro badge on chassis bezel (optional retro logo).

---

## 5. Colors & Tokens
- **CRT Phosphor Dark:** `#020b14` (`var(--token-ARramzYvx)`)
- **Phosphor Amber Highlight:** `#ffb648` (`var(--token-dFSgQDg3U)`)
- **Bezel Base Plastic:** `#d2c8b4` (`--casing-beige-base`)
- **Bezel Highlight Edge:** `#e8e2d2` (`--casing-beige-highlight`)
- **Bezel Recessed Shadow:** `#8f8572` (`--casing-beige-shadow`)
- **Camera Pill Container:** `rgba(2, 11, 20, 0.85)` with `1px solid rgba(255, 182, 72, 0.28)`.

---

## 6. Assets
- **Desk Environment Background:** High-resolution pre-rendered or 3D canvas of the wooden desk, keyboard, and mouse.
- **CRT Monitor Bezel:** High-fidelity textured bezel with rounded corners and molded plastic cooling vents.
- **Scanline Pattern:** Repeating CSS gradient (`.crt-sc`).
- **Glass Glare Overlay:** Multi-stop linear gradient (`.crt-gl`) with `mix-blend-mode: overlay`.

---

## 7. Hover Behavior
- **CRT Screen Surface:** Default retro 1-bit pixel arrow cursor.
- **Camera Zoom Buttons:**
  - Cursor switches to pixel hand pointer.
  - Button icon background brightens from transparent to `rgba(255, 182, 72, 0.15)`.
  - Amber border highlights to 100% opacity.
- **Power Button:** Highlight ring appears around the circular bezel socket.

---

## 8. Click Behavior
- **Zoom Out Button:**
  - Smoothly pans camera back from the close-up monitor view to reveal the full wooden desk, keyboard, and mouse.
  - Zoom In button becomes enabled; Zoom Out becomes disabled or switches state.
- **Zoom In Button:**
  - Smoothly drives camera forward to frame the CRT screen face.
- **Clicking Desktop Canvas:** De-focuses any active selection or window z-index.

---

## 9. Animation Behavior
- **Camera Zoom Transition:**
  ```css
  .camera-zoom-transition {
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                filter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  ```
- **CRT Glass Scanline Scroll (Subtle CRT Jitter):**
  - Optional minute vertical sub-pixel drift (0.5px over 10s) recreating subtle electromagnetic analog refresh jitter.

---

## 10. Responsive Behavior
- **Desktop (1440×900, Aspect Ratio >= 1.2):**
  - Full desk environment and camera zoom controls are fully functional.
  - CRT centered at `1036px × 693.6px`.
- **Tablet (768×1024, Aspect Ratio < 1.2):**
  - Desk environment is hidden.
  - Camera zoom controls are hidden.
  - CRT monitor expands to 100% of tablet width with scaled bezel.
- **Mobile (390×844):**
  - Desk environment and camera controls completely hidden.
  - Container collapses into a single-column portrait CRT container (`@media (max-width: 809.98px)`).
  - Preserves scanline overlay and amber bloom.
