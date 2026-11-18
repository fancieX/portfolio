# Component Specification: Sound Controls & Clock System

**Component ID:** `sound-controls`  
**Reference Target:** [https://retro-pc.framer.website/](https://retro-pc.framer.website/)  
**Inspection Date:** November 18, 2026  
**Implementation Status:** Specification Only (Not Implemented)

---

## 1. Appearance
The Sound Controls & Clock System is housed on the right side of the bottom dock bar:
- **Sound Control Button:** A square 3D beveled retro push button displaying a pixel-art speaker glyph with soundwaves (when unmuted) or a speaker with a slash/cross (when muted).
- **Audio Tooltip:** An amber monospace tooltip bubble that floats directly above the button on hover, displaying `"Sound on"` or `"Sound off"`.
- **Live Digital Clock:** An authentic 24-hour digital clock display (`HH:MM`) positioned immediately adjacent to the sound toggle button, synchronized continuously with the client system's local time.

---

## 2. Dimensions & Bounding Boxes

### Desktop Viewport (1440 × 900)
| Element | Computed Width | Computed Height | Exact Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **Sound Toggle Button** | `36.1px` | `36.1px` | `(x=1097.9px, y=789.0px)` |
| **Speaker Pixel Glyph** | `18.0px` | `18.0px` | Centered within button face |
| **Hover Tooltip Bubble** | `76.0px` | `24.0px` | Positioned 8px above button |
| **Live Digital Clock** | `45.1px` | `18.4px` | `(x=1164.1px, y=799.6px)` |

### Tablet Viewport (768 × 1024)
| Element | Computed Width | Computed Height | Exact Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **Sound Toggle Button (Tablet)**| `26.0px` | `26.0px` | `(x=801.6px, y=592.1px)` |
| **Live Digital Clock (Tablet)** | `32.5px` | `12.8px` | `(x=849.2px, y=599.8px)` |

---

## 3. Layout Structure
```
+-------------------------------------------------------------------------+
| BOTTOM DOCK BAR (Right Quadrant)                                        |
|                                                                         |
|                     +-----------+                                       |
|                     | Sound off |  <-- Hover Tooltip                    |
|                     +-----+-----+                                       |
|                           |                                             |
|        [• Booking from March]     [ [Speaker] ]     22:30               |
|                                   (36 x 36)         (45 x 18)           |
+-------------------------------------------------------------------------+
```

---

## 4. Typography
- **Clock Digits:** `'Chivo Mono', monospace`, `14px`, `line-height: 20px`, `font-weight: 400`, color `#ffb648`. Configured with `font-variant-numeric: tabular-nums` to prevent layout jitter when digits update.
- **Sound Tooltip Text:** `'Chivo Mono', monospace`, `11px`, `line-height: 14px`, `font-weight: 500`, color `#020b14` (dark text on amber tooltip pill).

---

## 5. Colors & Tokens
- **Button Face (Unpressed):** `var(--token-dFSgQDg3U, #ffb648)`
- **Button Bevel High:** `--as-hi: color-mix(in srgb, #ffffff 45%, #ffb648)`
- **Button Bevel Dark:** `--as-dark: color-mix(in srgb, #000000 48%, #ffb648)`
- **Speaker Icon Glyph:** `#020b14` (dark contrast on amber button face)
- **Tooltip Background:** `#ffb648` with `#020b14` text and `border-radius: 2px`
- **Clock Digits:** `#ffb648` with subtle phosphor bloom (`text-shadow: 0 0 6px rgba(255, 182, 72, 0.5)`)

---

## 6. Assets & Audio Files
- **Audio File 1:** `switch.mp3` — High-tactile mechanical switch sound triggered on CRT power toggle and physical clicks.
- **Audio File 2:** `beep.mp3` — 850Hz vintage BIOS / terminal alert beep.
- **Audio File 3 (Ambient):** Subtle low-frequency 50Hz CRT transformer hum / floppy drive spin sound (optional loop).
- **Inline SVG:** Pixel-art speaker icon (16×16 grid) with toggleable soundwave lines.

---

## 7. Hover Behavior
- **Sound Toggle Button:**
  - Cursor changes to pixel hand pointer (`pointer`).
  - Button face brightens with lighter amber tint.
  - Tooltip bubble pops up above the button: `"Sound on"` (if currently muted) or `"Sound off"` (if currently active).
- **Digital Clock:**
  - Non-interactive display indicator; cursor remains default pixel arrow.

---

## 8. Click Behavior
- **Clicking Sound Button:**
  - Toggles global audio state between active and muted:
    - If unmuted: Plays short click, mutes all web audio, updates icon to muted state, sets `aria-label="Turn the sound on"`.
    - If muted: Unmutes audio, plays short confirmation chirp, updates icon, sets `aria-label="Turn the sound off"`.
  - Persists audio preference to `localStorage.getItem("retro_pc_sound")`.
- **Button Press Interaction:**
  ```css
  .sound-btn:active {
    border-top: 2px solid var(--as-dark);
    border-left: 2px solid var(--as-dark);
    border-right: 2px solid var(--as-hi);
    border-bottom: 2px solid var(--as-hi);
    transform: translateY(1px);
  }
  ```

---

## 9. Animation & Timing Behavior
- **Clock Refresh Cycle:**
  - Polled via `setInterval` or `requestAnimationFrame` every 1,000ms.
  - Updates string `HH:MM` in 24-hour format matching local client time.
- **Tooltip Fade:** 120ms fade-in / slide-up (`y: 4px -> 0px, opacity: 0 -> 1`).

---

## 10. Responsive Behavior
- **Desktop (1440×900):**
  - Sound button is `36.1px × 36.1px`. Clock text is `14px`. Both placed at far right of dock bar.
- **Tablet (768×1024):**
  - Sound button scales to `26px × 26px`. Clock text scales to `12px`.
  - Availability badge is hidden, allowing sound button and clock ample room on the right.
- **Mobile (390×844):**
  - Sound button and clock remain pinned to the bottom right of the mobile dock bar with touch targets accessible.
