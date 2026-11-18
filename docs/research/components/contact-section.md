# Component Specification: Contact Interface

**Component ID:** `contact-section`  
**Reference Target:** [https://retro-pc.framer.website/contact](https://retro-pc.framer.website/contact)  
**Inspection Date:** November 18, 2026  
**Implementation Status:** Specification Only (Not Implemented)

---

## 1. Appearance
The Contact component is designed as a vintage desktop email composer application:
- **Titlebar:** Displays `"New message"` and breadcrumb `Desktop / Contact`.
- **Form Layout:** Authentic early email client fields:
  - `To:` Static pre-filled amber field reading `Milo Varga`.
  - `From:` Single-line text input with placeholder `"Your name"`.
  - `Email:` Single-line email input with placeholder `"you@company.com"`.
  - `About:` Retro dropdown select menu (`Pick one`, `Identity`, `Packaging`, `Website`, `Something else`).
  - `Message:` Multi-line message composer textarea.
  - `Send:` 3D physical push button with beveled edges.
- **Sidebar Details:** Studio address (Kalamaja, Tallinn, Estonia), direct mailto link (`hello@milovarga.ee`), booking terms, and social links (Instagram, Behance, LinkedIn).

---

## 2. Dimensions & Bounding Boxes

| Element | Computed Width | Computed Height | Exact Coordinates / Position |
| :--- | :--- | :--- | :--- |
| **Contact Window (Standard)**| `788.3px` | `520.0px` | `(x=429.1px, y=137.1px)` |
| **Titlebar Header Bar** | `788.3px` | `32.0px` | Top edge of window |
| **Email Composer Column** | `~460.0px` | `440.0px` | Left side (60% width) |
| **Studio Sidebar Column** | `~260.0px` | `440.0px` | Right side (40% width) |
| **Form Input Row (Each)** | `100%` (~460px) | `36.0px` | Stacked vertically |
| **Textarea Composer** | `100%` (~460px) | `140.0px` | Lower portion of form |
| **3D Send Button** | `120.0px` | `36.0px` | Bottom-left of composer |

---

## 3. Layout Structure
```
+-------------------------------------------------------------------------+
| [=] Desktop / Contact                                         [ [ ] ] [X] |
+-------------------------------------------------------------------------+
|                                                                         |
|  +-----------------------------------+   +----------------------------+ |
|  | To:      Milo Varga               |   | STUDIO                     | |
|  | From:    [Your name             ] |   | Kalamaja, Tallinn, Estonia | |
|  | Email:   [you@company.com       ] |   | hello@milovarga.ee         | |
|  | About:   [Pick one            v ] |   |                            | |
|  | --------------------------------- |   | BOOKING                    | |
|  | Message:                          |   | New projects from March.   | |
|  | [What you make, what you need,  ] |   | Four a season.             | |
|  | [and when you want it done...   ] |   |                            | |
|  |                                   |   | REPLIES                    | |
|  | [ Send Message ]                  |   | Within two working days.   | |
|  +-----------------------------------+   +----------------------------+ |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## 4. Typography
- **Window Title / Breadcrumb:** `'Chivo Mono', monospace`, `14px`, `line-height: 20px`, `font-weight: 600`, color `#020b14`.
- **Field Labels (`To:`, `From:`, `Email:`, `About:`):** `'Chivo Mono', monospace`, `14px`, `line-height: 20px`, `font-weight: 500`, color `#ffb648`.
- **Input Text & Placeholders:** `'Chivo Mono', monospace`, `14px`, `line-height: 20px`, `font-weight: 400`, color `#ffb648` (input), `rgba(255, 182, 72, 0.40)` (placeholder).
- **Sidebar Headers:** `'Chivo Mono', monospace`, `13px`, `line-height: 18px`, `font-weight: 600`, uppercase, color `#ffb648`.
- **Sidebar Body:** `'Chivo Mono', monospace`, `13px`, `line-height: 20px`, `font-weight: 400`, color `rgba(255, 182, 72, 0.80)`.
- **3D Send Button:** `'Chivo Mono', monospace`, `13px`, `line-height: 16px`, `font-weight: 600`, color `#020b14`.

---

## 5. Colors & Tokens
- **Window Background:** `rgba(2, 11, 20, 0.94)`
- **Header Titlebar Fill:** `var(--token-dFSgQDg3U, #ffb648)`
- **Input Row Dividers:** `1px solid rgba(255, 182, 72, 0.28)`
- **Input Background (Focused):** `rgba(255, 182, 72, 0.08)`
- **3D Send Button Face:** `#ffb648`
- **Button Bevel High:** `--as-hi: color-mix(in srgb, #ffffff 45%, #ffb648)`
- **Button Bevel Shadow:** `--as-dark: color-mix(in srgb, #000000 48%, #ffb648)`

---

## 6. Assets
- Retro paperclip attachment icon (SVG).
- Envelope stamp glyph.
- Custom 1-bit I-beam text input cursor SVG.

---

## 7. Hover Behavior
- **Input Fields:**
  - Cursor changes to 1-bit pixel I-beam.
  - Row border-bottom brightens to 100% solid amber (`#ffb648`).
- **3D Send Button:**
  - Cursor switches to pixel hand pointer.
  - Button face brightens with amber highlight bloom.
- **Sidebar Email & Social Links:**
  - Underline appears on hover with amber glow.

---

## 8. Click Behavior
- **Focusing an Input:**
  - Displays a solid amber blinking block caret `▋`.
  - Focused field receives an active amber underline.
- **Selecting Dropdown (`About`):**
  - Opens a native retro monospace select menu with amber borders.
- **Clicking `Send Message` Button:**
  - Executes tactile button depression:
    ```css
    .send-btn:active {
      border-top: 2px solid var(--as-dark);
      border-left: 2px solid var(--as-dark);
      border-right: 2px solid var(--as-hi);
      border-bottom: 2px solid var(--as-hi);
      transform: translateY(1px);
    }
    ```
  - Triggers form validation and shows retro terminal status message: `"Sending message..." -> "Message sent successfully!"`

---

## 9. Animation Behavior
- **Window Open Spring:** Framer Motion spring (`stiffness: 300, damping: 30`).
- **Input Caret Blink:** 1s step-end infinite blink.
- **Success State Banner:** Slide-down confirmation bar inside composer window.

---

## 10. Responsive Behavior
- **Desktop (1440×900):** Side-by-side 2-column layout (form 60%, studio sidebar 40%).
- **Tablet (768×1024):** Form and sidebar adjust proportionally.
- **Mobile (390×844):** Single-column vertical layout:
  - Email composer occupies top half with full-width inputs.
  - Studio information and social links stack underneath the Send button.
  - 3D Send button expands to full width for convenient mobile thumb submission.
