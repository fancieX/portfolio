# Component Specification: Services Interface

**Component ID:** `services-section`  
**Reference Target:** [https://retro-pc.framer.website/services](https://retro-pc.framer.website/services)  
**Inspection Date:** November 18, 2026  
**Implementation Status:** Specification Only (Not Implemented)

---

## 1. Appearance
The Services component functions as a pricing and project scoping application window:
- **Overview Narrative:** Introduction stating studio workflow: *"Four things I do, alone or together. Most projects use two. Prices are where projects usually start."*
- **4 Service Packages:**
  1. **Identity:** Brand identities and guidelines.
  2. **Packaging:** Bespoke packaging dielines and print artwork.
  3. **Websites:** Custom Framer websites and CMS builds.
  4. **Launch kits:** Game launch kits, press boxes, and key art.
- **Each Package Card Contains:** Title, starting price, delivery timeline, bulleted deliverables list, and a prominent 3D beveled booking button.
- **Footer Status:** Booking availability reminder (`"Services · Booking from March"`).

---

## 2. Dimensions & Bounding Boxes

| Element | Computed Width | Computed Height | Exact Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **Services Window (Standard)**| `788.3px` | `540.0px` | `(x=429.1px, y=137.1px)` |
| **Titlebar Header Bar** | `788.3px` | `32.0px` | Top edge of window |
| **Overview Text Box** | `740.0px` | `48.0px` | Top of content area |
| **Service Package Block** | `354.0px` | `280.0px` | 2-column grid layout |
| **3D Booking Button** | `~160.0px` | `36.0px` | Bottom of each service card |
| **Availability Footer Banner** | `740.0px` | `32.0px` | Bottom of services list |

---

## 3. Layout Structure
```
+-------------------------------------------------------------------------+
| [=] Desktop / Services                                        [ [ ] ] [X] |
+-------------------------------------------------------------------------+
|                                                                         |
| "Four things I do, alone or together. Most projects use two.             |
|  Prices are where projects usually start."                              |
|                                                                         |
|  +-------------------------------+   +-------------------------------+  |
|  | IDENTITY                      |   | PACKAGING                     |  |
|  | From €4,000 · 4 to 6 weeks    |   | From €3,000 · 3 to 5 weeks    |  |
|  | • Logo and wordmark           |   | • Dielines in every size      |  |
|  | • Type and colour guide       |   | • Artwork per flavour         |  |
|  | • Files for print and screen  |   | • Press check & handover      |  |
|  | [ Book an identity ]          |   | [ Book packaging ]            |  |
|  +-------------------------------+   +-------------------------------+  |
|                                                                         |
|  +-------------------------------+   +-------------------------------+  |
|  | WEBSITES                      |   | LAUNCH KITS                   |  |
|  | From €3,500 · 3 to 5 weeks    |   | From €5,000 · 6 to 8 weeks    |  |
|  | • Design and build in Framer  |   | • Key art and store assets    |  |
|  | • CMS and search integration  |   | • Custom physical press box   |  |
|  | • Handover tutorial call      |   | • Trailer edit & promo clips  |  |
|  | [ Book a website ]            |   | [ Book a launch kit ]         |  |
|  +-------------------------------+   +-------------------------------+  |
|                                                                         |
| Services · Booking from March                                           |
+-------------------------------------------------------------------------+
```

---

## 4. Typography
- **Window Title / Breadcrumb:** `'Chivo Mono', monospace`, `14px`, `line-height: 20px`, `font-weight: 600`, color `#020b14`.
- **Introductory Statement:** `'Chivo Mono', monospace`, `16px`, `line-height: 24px`, `font-weight: 400`, color `rgba(255, 182, 72, 0.90)`.
- **Service Package Title:** `'Chivo Mono', monospace`, `18px`, `line-height: 24px`, `font-weight: 600`, color `#ffb648`.
- **Price & Timeline Badge:** `'Chivo Mono', monospace`, `13px`, `line-height: 18px`, `font-weight: 500`, color `rgba(255, 182, 72, 0.85)`.
- **Deliverables List Items:** `'Chivo Mono', monospace`, `13px`, `line-height: 20px`, `font-weight: 400`, color `rgba(255, 182, 72, 0.75)`.
- **3D Button Face Text:** `'Chivo Mono', monospace`, `13px`, `line-height: 16px`, `font-weight: 600`, color `#020b14`.

---

## 5. Colors & Tokens
- **Window Body:** `rgba(2, 11, 20, 0.94)`
- **Header Titlebar:** `var(--token-dFSgQDg3U, #ffb648)`
- **Card Frames:** `1px solid rgba(255, 182, 72, 0.28)`
- **Card Background:** `rgba(255, 182, 72, 0.06)`
- **3D Button Face:** `#ffb648`
- **3D Button Bevel Highlight:** `--as-hi: color-mix(in srgb, #ffffff 45%, #ffb648)`
- **3D Button Bevel Shadow:** `--as-dark: color-mix(in srgb, #000000 48%, #ffb648)`

---

## 6. Assets
- Vector bullet points and retro checkmark indicators.
- 3D physical button styling implemented with pure CSS border-bevel tricks.

---

## 7. Hover Behavior
- **Service Cards:**
  - Border transitions to solid amber (`1px solid #ffb648`).
  - Subtle background glow: `rgba(255, 182, 72, 0.12)`.
- **3D Booking Buttons (`[Book an identity]`, etc.):**
  - Cursor switches to pixel hand pointer.
  - Button face brightens with lighter amber bloom.
  - Slight scale up or button face highlight.

---

## 8. Click Behavior
- **Clicking a Booking Button:**
  - Immediately navigates to `/contact` with the requested service pre-selected in the `About` dropdown menu (e.g. pre-selecting `"Identity"` or `"Packaging"`).
- **Active Button Press:**
  - Borders invert to simulate physical button depression:
    ```css
    .retro-button-3d:active {
      border-top: 2px solid var(--as-dark);
      border-left: 2px solid var(--as-dark);
      border-right: 2px solid var(--as-hi);
      border-bottom: 2px solid var(--as-hi);
      transform: translateY(1px);
    }
    ```

---

## 9. Animation Behavior
- **Window Entrance:** Framer Motion spring (`stiffness: 300, damping: 30`).
- **Button Click Tactile Feedback:** 60ms immediate transition on active press.
- **Scroll Momentum:** Custom amber scrollbar with smooth touch scrolling.

---

## 10. Responsive Behavior
- **Desktop (1440×900):** 2-column grid of service package cards (`354px` each).
- **Tablet (768×1024):** 2-column grid with adapted card padding.
- **Mobile (390×844):** Single-column vertical stack. Service cards expand to 100% container width; buttons span full width of each card for effortless thumb tapping.
