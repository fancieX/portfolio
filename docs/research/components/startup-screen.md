# Component Specification: Startup Screen & Power System

**Component ID:** `startup-screen`  
**Reference Target:** [https://retro-pc.framer.website/](https://retro-pc.framer.website/)  
**Inspection Date:** November 18, 2026  
**Implementation Status:** Specification Only (Not Implemented)

---

## 1. Appearance
The Startup Screen simulates the physical power and boot state of a vintage 1980s personal computer CRT monitor:
- **Powered-Off State:** Pitch-black screen (`#000000`) within the beige CRT bezel. A retro blinking command prompt is centered or positioned on the display reading: `"Press any key or the power button"`. The hardware power LED on the lower-right bezel glows standby amber (`#ff9900`).
- **Powering-On State:** Screen collapses/expands with an intense amber scanline phosphor flash. The physical power LED switches to solid bright green (`#22c55e`).
- **Powered-On (Ready) State:** Full desktop GUI appears with amber phosphor scanlines and curved tube vignette.

---

## 2. Dimensions & Bounding Boxes

| Element | Width | Height | Coordinates / Placement |
| :--- | :--- | :--- | :--- |
| **CRT Outer Bezel** | `1036px` | `693.6px` | Centered in viewport |
| **CRT Glass Display Surface** | `808px` | `568.5px` | Inset at `(x=114px, y=62.5px)` |
| **Power Standby Text Prompt** | `320px` | `24px` | Centered on unlit CRT display |
| **Physical Rocker Power Switch** | `20px` | `20px` | Lower-right monitor bezel `(x=984px, y=650px)` |
| **Hardware LED Indicator** | `8px` | `8px` | Immediately adjacent to power switch |

---

## 3. Layout Structure
```
+-------------------------------------------------------------+
| CRT Outer Bezel (Beige Plastic Enclosure)                   |
|  +-------------------------------------------------------+  |
|  | CRT Glass Display Canvas (#000000 / #020b14)          |  |
|  |                                                       |  |
|  |       "Press any key or the power button" ▋          |  |
|  |                                                       |  |
|  +-------------------------------------------------------+  |
|                                       [LED] (o) [POWER] (O) |
+-------------------------------------------------------------+
```
- Standby message centered vertically and horizontally within the CRT glass boundaries.
- Power switch and LED indicator reside outside the glass canvas on the molded plastic bezel face.

---

## 4. Typography
- **Prompt String:** `"Press any key or the power button"`
- **Font Family:** `'Chivo Mono', monospace`
- **Font Size:** `14px` (Desktop) / `12px` (Mobile)
- **Line Height:** `20px`
- **Font Weight:** `400`
- **Letter Spacing:** `0px`
- **Text Transform:** None
- **Cursor Character:** Solid amber block `▋` with CSS step blinking.

---

## 5. Colors & Tokens
- **Screen Canvas (Off):** `#000000` (deep pitch black)
- **Screen Canvas (On):** `#020b14` (`var(--token-ARramzYvx)`)
- **Prompt Text:** `#ffb648` (`var(--token-dFSgQDg3U)`)
- **Prompt Text Glow:** `text-shadow: 0 0 8px rgba(255, 182, 72, 0.7)`
- **LED Standby:** `#ff9900` (`box-shadow: 0 0 6px #ff9900`)
- **LED Active Power:** `#22c55e` (`box-shadow: 0 0 8px #22c55e`)
- **Power Switch Button:** `#d2c8b4` (casing base) with `#8f8572` inset shadow ring.

---

## 6. Assets
- **Audio SFX 1:** `switch.mp3` — High-tactile mechanical rocker switch click on press.
- **Audio SFX 2:** `beep.mp3` — Single retro motherboard POST / boot confirmation chime (~850 Hz, 120ms duration).
- **Bezel Graphic:** Pre-rendered beige plastic bezel texture with circular debossed power switch socket.

---

## 7. Hover Behavior
- **Screen Canvas:** Cursor displays default pixel arrow cursor.
- **Physical Power Switch:**
  - Cursor changes to pixel hand pointer (`pointer`).
  - Bezel switch face gains a subtle 10% brightness highlight.
  - Optional tooltip: `"Power off"` / `"Power on"`.

---

## 8. Click & Keyboard Behavior
- **Keyboard Trigger:** Pressing **any key** on the keyboard (e.g. `Space`, `Enter`, letters) while the screen is off triggers immediate power-on.
- **Mouse / Touch Trigger:** Clicking the physical power switch button triggers toggle:
  - If screen is **Off** -> Triggers `switch.mp3`, plays `beep.mp3`, switches LED to green, executes power-on animation, and reveals desktop.
  - If screen is **On** -> Triggers `switch.mp3`, switches LED to amber standby, collapses CRT screen to black, displays standby prompt.

---

## 9. Animation Behavior

### Power-On Phosphor Bloom (`@keyframes crt-power-on`)
```css
@keyframes crt-power-on {
  0% {
    transform: scale(1, 0.005);
    filter: brightness(25);
    opacity: 0.1;
  }
  35% {
    transform: scale(1, 0.005);
    filter: brightness(18);
    opacity: 1;
  }
  65% {
    transform: scale(1, 1);
    filter: brightness(2.2);
    opacity: 0.95;
  }
  100% {
    transform: scale(1, 1);
    filter: brightness(1);
    opacity: 1;
  }
}
```
- **Duration:** `0.4s`
- **Timing Function:** `cubic-bezier(0.16, 1, 0.3, 1)`

### Power-Off Scan Beam Collapse (`@keyframes crt-power-off`)
```css
@keyframes crt-power-off {
  0% {
    transform: scale(1, 1);
    filter: brightness(1);
    opacity: 1;
  }
  30% {
    transform: scale(1, 0.005);
    filter: brightness(12);
    opacity: 0.8;
  }
  100% {
    transform: scale(0, 0);
    filter: brightness(0);
    opacity: 0;
  }
}
```
- **Duration:** `0.35s`
- **Timing Function:** `cubic-bezier(0.7, 0, 0.84, 0)`

### Blinking Terminal Cursor
```css
@keyframes typed-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.cursor { animation: typed-blink 1s step-end infinite; }
```

---

## 10. Responsive Behavior
- **Desktop (1440×900):** Bezel is centered with outer shadows and ambient room illumination; power switch visible on bezel.
- **Tablet (768×1024):** Bezel scales to fit tablet width. Power switch remains accessible on bottom bezel bar.
- **Mobile (390×844):** Outer room is hidden. CRT bezel scales to portrait screen width. Power switch is pinned to the bottom control row alongside the screen power state. Tap anywhere on screen wakes up the system.
