# Visual Design System Specification: Retro PC Portfolio

**Reference URL:** [https://retro-pc.framer.website/](https://retro-pc.framer.website/)  
**Template Author:** Julian Romli ("Nostalgia Computer Portfolio Template")  
**Inspection Date:** November 18, 2026  
**Document Purpose:** Complete, pixel-accurate documentation of the visual design system extracted directly from the DOM, computed styles, stylesheets, SVG assets, and CSS custom properties.

---

## 1. Background Colors

| Component / Layer | Computed CSS / Token | Hex / RGBA Equivalent | Notes & Usage Context |
| :--- | :--- | :--- | :--- |
| **CRT Screen Canvas** | `var(--token-ARramzYvx)` | `#020b14` | Deep charcoal-navy base canvas simulating unlit phosphor inside the CRT tube |
| **Page Body (Desk Environment)** | CSS background / WebP | 3D room texture | Pre-rendered workstation scene with wooden desk, keyboard, mouse, and Venetian blind shadows |
| **CRT Powered Down / Off** | `background-color` | `#000000` | Pitch black screen when powered off via the bezel switch |
| **Window Container Body** | `background-color` | `rgba(2, 11, 20, 0.94)` | Translucent dark background allowing scanlines to subtly bleed through |
| **Window Titlebar Header** | `var(--token-dFSgQDg3U)` | `#ffb648` | Solid amber header fill with `#020b14` text for high-contrast retro titlebar |
| **Window Breadcrumb / Active Tab**| `var(--token-dFSgQDg3U)` | `#ffb648` | Solid amber pill fill with dark text |
| **Bottom Dock Bar Container** | `background-color` | `rgba(2, 11, 20, 0.85)` | Glassmorphic dark terminal dock bar |
| **Dock Active Tab Pill** | `var(--token-dFSgQDg3U)` | `#ffb648` | Inverted amber button for the currently active window |
| **Project Cards (Work Grid)** | `var(--token-qs7EequQr)` | `rgba(255, 182, 72, 0.10)`| Subtle 10% amber fill with frosted contrast |
| **Form Inputs & Textarea** | `background-color` | `rgba(255, 182, 72, 0.05)`| Monospace terminal input fields with subtle amber tint |
| **3D Action Button (Face)** | `var(--token-dFSgQDg3U)` | `#ffb648` | Multi-bevel retro physical push button face |
| **Scrollbar Track & Thumb** | `display: none` / `transparent` | Hidden | Custom hidden scrollbars (`scrollbar-width: none`) to maintain authentic terminal aesthetic |

---

## 2. Primary, Secondary, and Accent Color Tokens

The visual design system is anchored by a high-contrast amber monochrome phosphor palette paired with hardware casing beige tones.

```css
:root {
  /* ==========================================================================
     PHOSPHOR AMBER COLOR PALETTE
     ========================================================================== */
  --token-dFSgQDg3U: #ffb648;          /* Primary Amber Phosphor (Base 100%) */
  --token-FJWaywfAR: #ffdba4;          /* Amber Highlight / Bloom Tint (Light) */
  --token-QCytVHSbN: rgba(255, 182, 72, 0.28); /* 28% Amber Phosphor (Frames, dividers, subtle borders) */
  --token-qs7EequQr: rgba(255, 182, 72, 0.10); /* 10% Amber Phosphor (Card fills, hover tints) */
  --token-Qxp27qGdB: #74582b;          /* Muted Amber Shadow / Secondary Dim */
  --token-ARramzYvx: #020b14;          /* CRT Void Charcoal / Deep Background */

  /* ==========================================================================
     DERIVED 3D RETRO BEVEL TOKENS (CSS color-mix)
     ========================================================================== */
  --as-hi: color-mix(in srgb, #ffffff 45%, var(--token-dFSgQDg3U));    /* Lit Top/Left Bevel */
  --as-lit: color-mix(in srgb, #ffffff 18%, var(--token-dFSgQDg3U));   /* Face Highlight */
  --as-side: color-mix(in srgb, #000000 24%, var(--token-dFSgQDg3U));  /* Shadow Right/Bottom Bevel */
  --as-dark: color-mix(in srgb, #000000 48%, var(--token-dFSgQDg3U));  /* Deep Inset Edge */

  /* ==========================================================================
     HARDWARE LED INDICATORS
     ========================================================================== */
  --led-powered-on: #22c55e;           /* Bright Phosphor Green LED */
  --led-standby: #ff9900;              /* Amber Standby / Sleeping LED */
  --led-off: #332200;                  /* Unlit Dark Amber */

  /* ==========================================================================
     HARDWARE CASING & BEZEL (1980s Vintage Computer Plastic)
     ========================================================================== */
  --casing-beige-highlight: #e8e2d2;   /* Top-lit plastic edge */
  --casing-beige-base: #d2c8b4;        /* Standard vintage beige chassis */
  --casing-beige-shadow: #8f8572;      /* Bezel recessed cooling slots & shadows */
}
```

---

## 3. Typography & Loaded `@font-face` Declarations

The typography relies on two distinct typefaces: **Jersey 10** for retro pixel display headlines and **Chivo Mono** for all UI, terminal, and monospace body text.

### Loaded `@font-face` Declarations

```css
/* Display Pixel Headline Font: Jersey 10 */
@font-face {
  font-family: 'Jersey 10';
  font-style: normal;
  font-weight: 400;
  src: url('https://framerusercontent.com/assets/26jTfM94uUuXG5y1tS7B86u7k.woff2') format('woff2');
  font-display: swap;
}

/* Monospace Interface & Body Font: Chivo Mono */
@font-face {
  font-family: 'Chivo Mono';
  font-style: normal;
  font-weight: 300 700;
  src: url('https://framerusercontent.com/assets/wccHG0r4gBDAIRhfHiOlq6oEkqw.woff2') format('woff2');
  font-display: swap;
}
```

### Computed Font Stacks by Element

| UI Element | Primary Font | Fallbacks | Notes |
| :--- | :--- | :--- | :--- |
| **Hero Title ("Milo Varga")** | `'Jersey 10'` | `monospace, sans-serif` | Pure pixel bitmap display appearance |
| **Ambient Paragraph / Bio** | `'Chivo Mono'` | `monospace` | Terminal style with typing block cursor |
| **Desktop Icon Labels** | `'Chivo Mono'` | `monospace` | Clear 14px monospace readability |
| **Dock Bar Status & Clock** | `'Chivo Mono'` | `monospace` | Tabular numbers for live clock digits |
| **Window Title & Breadcrumbs**| `'Chivo Mono'` | `monospace` | Capitalized / uppercase path string |
| **Project Card Titles & Tags**| `'Chivo Mono'` | `monospace` | Clean monospace labeling |
| **Journal Prose & Articles** | `'Chivo Mono'` | `monospace` | High-contrast monospace reading layout |
| **Form Inputs & Button Labels**| `'Chivo Mono'` | `monospace` | Terminal command prompt feel |

---

## 4. Font Sizes, Weights, Line Heights, and Letter Spacing

| Text Element | Framer Preset | Font Size | Line Height | Letter Spacing | Font Weight | Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Headline ("Milo Varga")** | `framer-styles-preset-1yq52s8` | `100px` | `80px` | `-1.0px` | `400` | None |
| **Hero (Tablet Portrait)** | Responsive breakpoint | `~96px` | `80px` | `-0.8px` | `400` | None |
| **Hero (Mobile)** | Responsive breakpoint | `~56px` | `56px` | `-0.5px` | `400` | None |
| **Ambient Bio Paragraph** | `framer-styles-preset-11u0j8x` | `17px` | `25px` | `-0.4px` | `400` | None |
| **Desktop Icon Labels** | `framer-styles-preset-jchyb7` | `14px` | `20px` | `-0.3px` | `400` | None |
| **Window Breadcrumbs / Path** | `framer-styles-preset-1gr52pg` | `14px` | `20px` | `-0.3px` | `600` | None |
| **Window Titlebar Header** | `framer-styles-preset-jchyb7` | `14px` | `20px` | `-0.3px` | `500` | None |
| **Project Card Title** | Card Title Component | `16px` | `22px` | `-0.2px` | `600` | None |
| **Project Card Tags / Year** | Card Meta Component | `12px` | `16px` | `0px` | `400` | None |
| **Dock Status & Clock** | `framer-styles-preset-jchyb7` | `14px` | `20px` | `-0.3px` | `400` | None |
| **Form Field Labels ("To", "From")**| `framer-styles-preset-jchyb7`| `14px` | `20px` | `-0.3px` | `400` | None |
| **Form Inputs & Textarea** | `.framer-form-input` | `14px` | `20px` | `0px` | `400` | None |
| **3D Buttons ("Send", "Book")** | Button Face Component | `13px` | `16px` | `-0.2px` | `600` | None |

---

## 5. Border Styles

```css
/* Window Container Outer Frame */
.retro-window {
  border-width: 1px;
  border-style: solid;
  border-color: var(--token-QCytVHSbN, rgba(255, 182, 72, 0.28));
}

/* Window Titlebar Header Bottom Divider */
.retro-window-header {
  border-bottom: 1px solid var(--token-dFSgQDg3U, #ffb648);
}

/* Bottom Dock Bar Top Divider */
.retro-dock {
  border-top: 1px solid var(--token-QCytVHSbN, rgba(255, 182, 72, 0.28));
}

/* 3D Physical Push Button (Unpressed State) */
.retro-button-3d {
  border-top: 2px solid var(--as-hi);
  border-left: 2px solid var(--as-hi);
  border-right: 2px solid var(--as-dark);
  border-bottom: 2px solid var(--as-dark);
}

/* 3D Physical Push Button (Pressed / Active State) */
.retro-button-3d:active {
  border-top: 2px solid var(--as-dark);
  border-left: 2px solid var(--as-dark);
  border-right: 2px solid var(--as-hi);
  border-bottom: 2px solid var(--as-hi);
}

/* Desktop Icon Selection / Hover Focus Box */
.desktop-icon:hover {
  border: 1px dashed var(--token-dFSgQDg3U, #ffb648);
  padding: 3px;
}

/* Form Input Rows */
.form-row {
  border-bottom: 1px solid var(--token-QCytVHSbN, rgba(255, 182, 72, 0.28));
}

/* Project Card Outer Frame */
.project-card {
  border: 1px solid var(--token-QCytVHSbN, rgba(255, 182, 72, 0.28));
}
```

---

## 6. Shadows and Highlights (Phosphor Bloom & Vignette)

```css
/* 1. Phosphor Bloom Glow on Typography */
.phosphor-glow-text {
  text-shadow: 
    0 0 8px color-mix(in srgb, var(--token-dFSgQDg3U) 60%, transparent),
    0 0 20px color-mix(in srgb, var(--token-dFSgQDg3U) 25%, transparent);
}

/* 2. Phosphor Drop Shadow on Icons & Graphics */
.phosphor-glow-icon {
  filter: drop-shadow(0 0 6px color-mix(in srgb, var(--token-dFSgQDg3U) 55%, transparent));
}

/* 3. CRT Tube Glass Curvature Vignette (Inner Depth) */
.crt-tube-vignette {
  box-shadow: 
    inset 0 0 60px rgba(0, 0, 0, 0.90),
    inset 0 0 15px rgba(255, 182, 72, 0.15);
}

/* 4. Retro Window Elevation Drop Shadow */
.retro-window-shadow {
  box-shadow: 
    0 8px 30px rgba(0, 0, 0, 0.70),
    0 0 16px rgba(255, 182, 72, 0.12);
}

/* 5. Physical Monitor Bezel Outer Shadow */
.monitor-bezel-shadow {
  box-shadow: 
    0 24px 48px -12px rgba(0, 0, 0, 0.65),
    0 4px 16px rgba(0, 0, 0, 0.40);
}
```

---

## 7. Spacing System

| Structural Context | Property | Value | Notes |
| :--- | :--- | :--- | :--- |
| **Desktop Icon Grid Container** | `top` / `left` / `gap` / `width` | `top: 72px; left: 64px; gap: 4px 54px; width: 166px;` | 2-column × 3-row layout |
| **Hero Title & Bio Container** | `bottom` / `right` / `gap` / `width` | `bottom: 118px; right: 96px; gap: 26px; width: 820px;` | Aligned to bottom-right quadrant |
| **Ambient Paragraph Container** | `width` / `margin` | `width: 380px; margin-bottom: 12px;` | Wrapped cleanly above hero title |
| **Bottom Dock Bar Padding** | `padding` / `gap` | `padding: 14px 96px 16px 70px; gap: 16px;` | Spans the active CRT width |
| **Window Frame Inset** | `top` / `left` / `right` / `bottom` | `top: 48px; left: 64px; right: 64px; bottom: 64px;` | Floating window padding inside CRT |
| **Window Header Height** | `height` / `padding` | `height: 32px; padding: 0 12px;` | Header bar height |
| **Window Body Content Padding** | `padding` | `padding: 24px;` | Content gutter inside windows |
| **Work Projects Grid Gap** | `gap` | `gap: 16px;` | Grid gap between project cards |
| **Contact Form Row Spacing** | `height` / `gap` / `padding` | `height: 36px; gap: 12px; padding: 6px 0;` | Monospace form rows |
| **Textarea Input Height** | `height` / `padding` | `height: 120px; padding: 8px 12px;` | Multi-line message composer |

---

## 8. Border Radii

| Component | `border-radius` | Visual Purpose |
| :--- | :--- | :--- |
| **CRT Tube Outer Glass** | `32px` | Soft spherical curved CRT tube corners |
| **Window Containers** | `4px` | Subtle rounded corners matching early 1980s GUIs |
| **Window Titlebar** | `3px 3px 0 0` | Top rounded corners on header strip |
| **3D Action Push Buttons** | `2px` | Crisp beveled mechanical button corners |
| **Dock Active Tab Pill** | `4px` | Rounded button pill inside dock |
| **Availability Badge Pill** | `9999px` | Fully rounded pill container for `"• Booking from March"` |
| **Form Inputs** | `2px` | Utilitarian terminal field radius |
| **Physical Power Button** | `50%` | Circular rocker button on monitor bezel |

---

## 9. Icon Styles (Pixel-Art SVG Assets)

All icons are constructed as crisp **16×16 bitmap grids** rendered via inline SVG using `<rect>` pixel primitives.

```xml
<!-- Example: Retro Folder (Work) Icon Architecture -->
<svg viewBox="0 0 16 16" width="32" height="32" shape-rendering="crispEdges">
  <!-- Semi-translucent body fill (32% opacity amber) -->
  <g style="fill: var(--token-dFSgQDg3U, #ffb648); opacity: 0.32;">
    <rect x="2" y="5" width="12" height="8" />
  </g>
  <!-- Crisp pixel borders and highlights (100% opacity amber) -->
  <g style="fill: var(--token-dFSgQDg3U, #ffb648); opacity: 1.0;">
    <rect x="2" y="3" width="5" height="2" />
    <rect x="1" y="4" width="14" height="1" />
    <rect x="1" y="5" width="1" height="9" />
    <rect x="14" y="5" width="1" height="9" />
    <rect x="1" y="13" width="14" height="1" />
  </g>
</svg>
```

### Icon Design Principles
- **Grid Resolution:** `16 × 16` pixel-perfect coordinate system.
- **Rendering Setting:** `shape-rendering="crispEdges"` to eliminate anti-aliasing blur.
- **Two-Tone Lighting:**
  - Base silhouette / fill: `opacity: 0.32`
  - Outline & highlight: `opacity: 1.0`
- **Icon Catalog:**
  1. `Work`: Retro folder with tab.
  2. `About me`: Dog-eared page with horizontal text lines.
  3. `Services`: Hard-shell briefcase with top handle.
  4. `Journal`: Open notebook with bookmark ribbon.
  5. `Contact`: Vintage sealed postal envelope.
  6. `CV`: 3.5" floppy diskette with metal slide shutter and label.

---

## 10. Retro Computer CRT Effects

### A. Phosphor Scanline Overlay (`.crt-sc`)
```css
.crt-sc {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.28) 0px,
    rgba(0, 0, 0, 0.28) 1.5px,
    transparent 1.5px,
    transparent 3px
  );
  mix-blend-mode: multiply;
  z-index: 99;
}
```

### B. Barrel Tube Curvature & Lens Distortion
- Implemented using an SVG filter definition applied to the CRT frame:
```xml
<filter id="crt-barrel-distortion">
  <feDisplacementMap in="SourceGraphic" scale="12" xChannelSelector="R" yChannelSelector="G" />
</filter>
```
- Augmented by radial vignette overlay:
```css
.crt-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at 50% 50%,
    transparent 65%,
    rgba(0, 0, 0, 0.75) 100%
  );
  z-index: 98;
}
```

### C. Glass Glare Specular Highlight (`.crt-gl`)
```css
.crt-gl {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.04) 25%,
    transparent 55%
  );
  mix-blend-mode: overlay;
  z-index: 100;
}
```

---

## 11. Screen Texture and Pixel Effects

### Blend Modes
- `mix-blend-mode: multiply` on the dark scanline layer.
- `mix-blend-mode: screen` on the amber phosphor text bloom layers.
- `mix-blend-mode: overlay` on the glass glare reflection layer.

### Custom Pixel Cursors (SVG Data-URIs)
```css
/* Standard Desktop Pointer: 1-Bit Pixel Arrow */
body, .crt-screen {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" shape-rendering="crispEdges"><path d="M0,0 L0,14 L4,10 L7,16 L9,15 L6,9 L11,9 Z" fill="%23ffb648"/></svg>'), auto;
}

/* Link / Button Hover Pointer: 1-Bit Pixel Hand Pointer */
a, button, [role="button"], .desktop-icon {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" shape-rendering="crispEdges"><path d="M6,1 L9,1 L9,5 L11,5 L11,7 L13,7 L13,11 L12,13 L8,15 L4,13 L4,7 L6,7 Z" fill="%23ffb648"/></svg>'), pointer;
}

/* Text Input Caret: 1-Bit Monospace I-Beam */
input, textarea {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" shape-rendering="crispEdges"><path d="M4,1 L12,1 M8,1 L8,15 M4,15 L12,15" stroke="%23ffb648" stroke-width="2"/></svg>'), text;
}
```

---

## 12. Animation Timing, Easing, and Keyframes

### A. Terminal Typing Cursor Blink
```css
@keyframes typed-blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.terminal-cursor {
  display: inline-block;
  animation: typed-blink 1s step-end infinite;
}
```

### B. CRT Screen Power Toggle Collapse / Expand
```css
/* Screen Power-On Flicker */
@keyframes crt-power-on {
  0% {
    transform: scale(1, 0.005);
    filter: brightness(30);
    opacity: 0.1;
  }
  40% {
    transform: scale(1, 0.005);
    filter: brightness(20);
    opacity: 1;
  }
  70% {
    transform: scale(1, 1);
    filter: brightness(2);
    opacity: 0.9;
  }
  100% {
    transform: scale(1, 1);
    filter: brightness(1);
    opacity: 1;
  }
}

/* Screen Power-Off Collapse */
@keyframes crt-power-off {
  0% {
    transform: scale(1, 1);
    filter: brightness(1);
    opacity: 1;
  }
  30% {
    transform: scale(1, 0.005);
    filter: brightness(10);
    opacity: 0.8;
  }
  100% {
    transform: scale(0, 0);
    filter: brightness(0);
    opacity: 0;
  }
}

.crt-screen-powering-on {
  animation: crt-power-on 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.crt-screen-powering-off {
  animation: crt-power-off 0.35s cubic-bezier(0.7, 0, 0.84, 0) forwards;
}
```

### C. Window Spring Transitions (Framer Motion Equivalent)
```javascript
// Window Scale & Position Spring Configuration
const windowSpringTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8
};
```

### D. CSS Transition Timings
- **Icon Hover Highlight:** `transition: border 0.15s ease, filter 0.15s ease;`
- **3D Button Press:** `transition: transform 0.06s ease, border 0.06s ease;`
- **Camera Zoom Transition:** `transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);`

---

## Summary & Implementation Checklist

| Design System Dimension | Reference Target Value | Implementation Recommendation |
| :--- | :--- | :--- |
| **Phosphor Palette** | `#ffb648`, `#ffdba4`, `#020b14` | Configure Tailwind CSS custom colors or CSS variables |
| **Typography** | `Jersey 10` (Headline), `Chivo Mono` (Body) | Load from `@fontsource/jersey-10` and `@fontsource/chivo-mono` or Google Fonts |
| **Scanlines** | `repeating-linear-gradient` (3px) | Implement reusable `<ScanlineOverlay />` component |
| **3D Buttons** | Inset/outset bevels using `color-mix` | Reusable `.btn-retro-3d` utility class |
| **Icons** | 16×16 inline SVGs with `crispEdges` | Lucide / custom retro pixel icon library |
| **Audio SFX** | `switch.mp3`, `beep.mp3` | HTML5 Audio controller with Web Audio API fallback |

---
*Documented and compiled by Antigravity Automation.*
