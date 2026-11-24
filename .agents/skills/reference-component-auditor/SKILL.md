---
name: reference-component-auditor
description: Audits a component, group of components, section, or whole page of the local website against the reference website (default https://snapline.framer.website/) and produces a read-only difference report covering appearance, layout, typography, animations, transitions, hover, click, scroll, component states, responsive behaviour and timing. Use this whenever the user asks to audit, compare, diff, check, verify, review or "see if it matches" any part of the local build against the reference site, for example "audit the Hero Section", "compare the project cards including hover animations", "does the navbar match the reference", or "compare the entire homepage". Use it even if the user does not name the skill. Reports only. It never edits code, never fixes differences, and never touches git.
---

# Reference Component Auditor

Answers one question: **what exactly is different between my implementation of this component and the corresponding component in the reference website, and what needs to change to make them match?**

The reference website is the source of truth. The goal is to reproduce it, not improve it.

## Mode: AUDIT AND REPORT ONLY

This version never fixes anything. If the user asks you to fix, implement, or apply corrections while this skill is active, decline that part, deliver the report, and tell them fixes need a separate, explicit step.

### Hard rules (always)

1. Never modify application source: no HTML, CSS, JS, TS, JSX/TSX, config, assets, lockfiles, or env files.
2. Never write any file inside the project directory. Keep screenshots and sampled data in the agent's artifact or scratch location outside the project (or only in the conversation).
3. Only run read-only shell commands (`ls`, `cat`, `grep`/`rg`, `find`, `git status`, `git diff`, `git log`, `git show`). Never run installs, builds, formatters, linters with `--fix`, codegen, migrations, or anything that writes to the project.
4. Never run `git add/commit/push/checkout/switch/stash/reset/merge/rebase/branch/config`.
5. If the local dev server is not running, say so and ask the user to start it. Do not start it yourself unless they explicitly tell you to (dev servers can write cache files into the project).
6. Never redesign. Never propose alternative animations, layouts, or interactions. Every recommendation must be "make local do what the reference does".
7. Never claim to have verified something you could not inspect. Never invent implementation details. State assumptions as assumptions.
8. Do not leave the browser tabs in a changed state that matters: restore scroll position, close menus you opened, and do not submit forms or trigger real side effects (purchases, emails, sign-ups).

## Evidence tags (use on every finding)

- **[M] Measured**: read directly from computed styles, geometry, the Web Animations API, or sampled frames.
- **[O] Observed**: seen in screenshots or live interaction but not numerically measured.
- **[E] Estimate**: derived from sampling or visual comparison; give a ± range.
- **[U] Unverified**: could not be inspected; say why.

Root-cause tags: **Confirmed** (seen in local source and consistent with measurements), **Likely** (plausible, needs verification), **Undetermined** (cannot be known from browser inspection alone).

When something is measurable, report both numbers and the delta ("reference 320px, local 300px, difference 20px"). Never write "looks slightly off" when a measurement is possible.

## Scope resolution

| User says | Audit |
|---|---|
| A named component ("Hero Section", "navbar", "project cards", "footer", "loading screen") | That component plus the code and shared styles that influence it |
| Several named components | Each one, then interactions between them (shared sticky offsets, z-index stacking, scroll hand-off) |
| A section | Every component in that section |
| "entire homepage", "whole page", or no component named | Every component currently implemented locally, top to bottom |
| A behaviour only ("hover animations on the cards") | That behaviour on the named component, still checking its dependencies |

Do not audit unrelated components. Audit dependencies (shared tokens, global CSS, fonts, scroll libraries, layout wrappers) only when they influence the target.

For whole-page audits, audit only what exists locally. Sections present in the reference but not yet built locally go in one line under "Not yet implemented locally", not as defects.

If the user supplies a different reference URL, use theirs instead of the default.

## Workflow

### Phase 0: Preflight (read-only)

1. Inspect project structure: package manager files, framework (Next/Vite/Astro/plain), entry points, component and style directories, animation libraries in `package.json` (framer-motion/motion, gsap, lenis, locomotive, react-spring, etc.).
2. Inspect agent configuration and conventions (`AGENTS.md`, `GEMINI.md`, `.agents/`, `.agent/`, rules files) and note anything that restricts what you may do. Project rules that conflict with this skill's read-only rules lose: the stricter rule wins.
3. Find the local URL. Confirm the dev server responds. If it does not, stop and ask.
4. Confirm browser tooling: can you (a) navigate, (b) resize the viewport, (c) take screenshots, (d) hover/click/scroll with real input, (e) evaluate JavaScript in the page? Note any gap; it limits evidence to [O]/[E] for the affected checks and must appear under limitations.

### Phase 1: Identify the target (STEP 1)

Locate the local component and everything that shapes it: component files, CSS/Tailwind/styled files and tokens, animation code, hooks and utilities, assets (images, fonts, video, SVG), and dependencies (parent layouts, providers, scroll libraries). Do not assume one file holds everything. Record `path:line` for the pieces that matter.

Locate the matching region in the reference page and give it a stable description (position on page, visible text, `data-framer-name` if present).

### Phase 2: Parity setup (STEP 3 conditions, do this before inspecting either site)

Both sites must be compared under identical conditions:

- Same viewport. Primary: 1440x900. Responsive set: 1024x768, 768x1024, 390x844. Locate breakpoints by sweeping widths and recording where layout changes (to within about 10px). Framer sites commonly switch around 1200px and 810px, but verify rather than assume.
- Same device pixel ratio, same color scheme, `prefers-reduced-motion` off, same zoom (100%).
- Fresh load for each state test. Wait for fonts and images (`scripts/parity-check.js` reports loaded fonts, image failures, DPR, overflow). Dismiss cookie banners or overlays the same way on both.
- Same scroll position, same pointer position, same interaction sequence, same wait time before capture.
- Compare like with like: never compare one site's pre-animation state with the other's post-animation state.
- Time-driven content (auto-play carousels, marquees, videos): compare by phase or speed, not by a single frame.
- Local dev-mode caveats (React StrictMode double effects, HMR overlay, unminified fonts loading late) are environment effects; flag them rather than reporting them as component defects.

Run `scripts/parity-check.js` on both sites and record the output in the report overview.

### Phase 3: Inspect the reference (STEP 2)

Understand how the component works, not just how it first looks. Capture, with screenshots plus measurements:

- Initial state before anything animates (screenshot burst at roughly 0, 150, 300, 600, 1000, 2000 ms after load if the tool allows).
- Default, hover, active/pressed, focus, click result, loading, open/closed, selected states as applicable.
- Scroll-triggered and scroll-linked behaviour (`scripts/scroll-sweep.js`).
- Animation sequences, transitions between states, mouse-leave behaviour, and moving between adjacent elements.
- Responsive behaviour at each viewport.

Use real pointer input (hover, click, scroll) from the browser tool. Synthetic JS events do not trigger CSS `:hover` and often miss framework handlers.

### Phase 4: Inspect the local component (STEP 3)

Repeat Phase 3 exactly, in the same order, under the same conditions. Then read the local source files identified in Phase 1.

### Phase 5: Find exact differences (STEP 4)

Go beyond the obvious visual diffs. Compare each of the categories below and drill into the underlying values.

**Visual and layout**: width, height, aspect ratio, x/y position, margins, padding, gap, alignment, flex/grid behaviour, overflow, z-index and stacking, borders, radius, shadows, backgrounds, gradients, images (source, crop, object-fit), icons, opacity.

**Typography**: font family (and whether the actual font file loaded), size, weight, style, line-height, letter-spacing, transform, color, wrapping and line breaks, text-align, truncation.

**Animations**: type, trigger (load, scroll-into-view, hover, click, scroll-linked), start and end transform, translation distance, scale, rotation, opacity, clip/mask, duration, delay, easing or spring, stagger, sequence order, overlap, once vs repeat, reverse on leave, mobile behaviour.

**Transitions**: which properties transition, duration, delay, easing, behaviour on enter versus leave, behaviour between states.

**Interactions**: hover trigger area, enter and leave behaviour, child element changes, cursor, click result, keyboard focus styles, behaviour when sliding between adjacent items.

**Scroll**: sticky or fixed behaviour, parallax rates, scroll-linked progress mapping, reveal thresholds, scroll-snap, smooth-scroll library presence.

**States and responsive**: every state present in the reference exists locally; layout at each breakpoint; hidden/shown elements per breakpoint; touch versus pointer behaviour where testable.

**Timing and sequencing**: ordering and offsets between elements, total sequence length, whether anything overlaps.

#### Measuring animation (most important part)

Use the scripts in `scripts/`. Each is a page-context snippet: open it, replace the `REPLACE_ME` selector (and the labelled constants), and pass it to the browser tool's JavaScript evaluation. They only read the page. The one runtime side effect is that `sample-animation.js` stores its recorder on `window.__refAuditSampler` in the tab, cleared on reload or on `MODE = "stop"`. If the tool cannot evaluate JavaScript, fall back to screenshot bursts and tag everything [O]/[E].

| Script | Use for |
|---|---|
| `parity-check.js` | Environment parity (viewport, DPR, fonts, overflow, reduced-motion, counts) |
| `measure-element.js` | Geometry and a broad set of computed styles for one or more elements |
| `list-animations.js` | CSS animations, CSS transitions, and Web Animations API animations: exact duration, delay, easing, keyframes [M] |
| `sample-animation.js` | Frame-by-frame opacity/transform/geometry/color for JS-driven motion; reconstructs start/end values, duration, delay (from the event log), easing shape [M for values, E for easing] |
| `scroll-sweep.js` | Scroll-linked and scroll-triggered behaviour across a range of scroll positions |

Procedure for an interaction animation (hover, click, mouse-leave):

1. Run `list-animations.js` on the element and its children right after triggering the interaction. Anything listed has exact timing [M].
2. For motion not listed (JS-driven), run `sample-animation.js` with `MODE = "start"`, perform the real interaction with the browser tool, then run it again with `MODE = "stop"`. Use `LIMIT` greater than 1 to sample siblings and measure stagger. Burst duration, start/end values, and delay (burst start minus the matching event time) come from the output.
3. Easing: compare the sampled progress curve against known curves (linear, ease, ease-in-out, cubic-bezier families). Overshoot beyond the end value, or a duration that varies with distance, indicates a spring; report stiffness/damping/bounce only as [E] with a range.
4. Repeat on the local site with identical steps and compare burst by burst.

Procedure for entrance animations: a fresh load is required. If the tool can inject a script before page scripts run, start the sampler then; otherwise use `list-animations.js` immediately after load plus the screenshot burst, and tag timing [E] where JS-driven.

Procedure for scroll behaviour: run `scroll-sweep.js` on both sites at the same viewport and compare per-position values (opacity, transform, viewport top, position). Report the scroll range where the behaviour occurs and how values map to scroll progress.

Notes specific to Framer reference sites:

- Published Framer pages use generated, hashed class names; prefer `data-framer-name` attributes and visible text to identify layers, never class names.
- Framer motion is often driven by JavaScript (inline styles updated per frame) or by Web Animations (appear effects). A computed `transition` of `none` does **not** mean there is no animation. Always check `list-animations.js` and sample.
- You can only inspect runtime behaviour of the reference. Authoring-time settings (the exact spring config, effect presets) are not visible; estimate from samples and tag [E].
- Minified bundles and the lack of source maps mean you cannot cite reference source lines. Do not pretend to.

If exact parameters cannot be extracted, describe observable behaviour, give an estimate with a range, and tag it [E].

### Phase 6: Root cause (STEP 5)

For each important difference, inspect the local source to find the cause: incorrect CSS properties or units, missing animation definitions or variants, wrong trigger (e.g. animates on mount instead of on view), wrong transition values or missing `transition` on the base state (so leave doesn't animate), missing event handlers, wrong state management, wrong DOM structure, missing or wrong assets or fonts, wrong breakpoint rules, a shared style overriding the component.

Classify each cause as Confirmed, Likely, or Undetermined. Record `file:line` where identifiable. Do not guess line numbers.

### Phase 7: Write the report

Follow `resources/report-template.md`. Required sections: A Audit Overview, B Detailed Difference Report, C Animation and Transition Differences, D Missing Behaviour, E Recommended Corrections (ordered by impact), F Final Matching Assessment.

Report quality rules:

- Accuracy over length. Fewer, well-evidenced findings beat many vague ones.
- One entry per distinct difference. If one root cause explains several symptoms, report the cause once and list the symptoms inside it. Do not repeat a difference across sections B, C, and D except by ID reference.
- Every difference entry has the 11 fields from the template, with evidence tags and the priority (Critical, High, Medium, Low).
- Distinguish visual differences from functional differences.
- Recommendations are property/value or behaviour statements ("reference translates up about 24px while fading 0 to 1 on entering the viewport; local has no entrance animation, so add a viewport-triggered translate-and-fade; duration and easing still need verification"). They are never applied and never a redesign.
- Include "What already matches". A correct match is a finding.
- Do not claim pixel-perfect accuracy unless every compared value was measured and equal; otherwise say "no differences found in what was measured" and list what was not measured.

BAD: "The card animation is wrong."
GOOD: "The reference card moves up about 24px [E] while fading from opacity 0 to 1 [M] when it enters the viewport. The local card appears immediately. The local implementation needs a viewport-triggered translate-and-fade; duration and easing need verification."

### Phase 8: Self-check before sending

- [ ] Both sites were compared at the same viewport, state, scroll position, and wait time.
- [ ] Hover, click, scroll, and entrance behaviour were tested with real interaction, not assumed.
- [ ] Every measurable difference has numbers for both sides and a delta.
- [ ] Every finding has an evidence tag and, for causes, a root-cause tag.
- [ ] No difference is reported twice.
- [ ] Responsive viewports were checked or listed as not tested.
- [ ] Unverifiable items and tool limitations are listed explicitly.
- [ ] No project file was created or changed; no git state changed.

## Common limits to disclose, not hide

Authentication or geo walls, cookie or consent overlays, A/B or randomized content, auto-playing video or WebGL canvas content (screenshot-only comparison), cross-origin iframes, lazy-loaded content that never loaded, reference behaviour that varies run to run, and any browser-tool limitation found in Phase 0.

## Invocation examples

- `/reference-component-auditor audit the Hero Section`
- "Use reference-component-auditor to compare the project cards, including all hover animations and transitions."
- "Audit the Navigation Bar, including scrolling behaviour, dropdowns, and responsive behaviour."
- "Compare the entire homepage against the reference website."
