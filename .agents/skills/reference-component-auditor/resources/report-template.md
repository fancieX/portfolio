# Reference Component Audit: <component or scope>

Evidence tags: [M] measured · [O] observed · [E] estimate (give ± range) · [U] unverified (give reason)
Root-cause tags: Confirmed · Likely · Undetermined

## A. Audit Overview

- Audited component / scope:
- Reference page and location: <URL + where on the page, e.g. "Hero, top of page">
- Corresponding local component:
- Relevant local source files: <path:line-range for component, styles, animation code, hooks, assets>
- Local URL audited:
- Viewports tested: <e.g. 1440x900 (primary), 1024x768, 768x1024, 390x844>
- Parity conditions: <fresh load, DPR, fonts loaded, scroll positions, pointer positions, settle time>
- States and interactions tested: <default, hover, active/click, scroll, entrance, loading, responsive>
- Not tested (and why):
- Overall matching assessment: <Close match / Partial match / Significant gaps>, one sentence of justification

## B. Detailed Difference Report

One entry per distinct difference. Merge duplicates; reference the same root cause once.

### D-01 · <short title>

| Field | Value |
|---|---|
| Category | Visual / Layout / Typography / Animation / Transition / Hover / Click / Scroll / State / Responsive / Timing / Asset / Other |
| Element | <selector or data-framer-name, plus human description> |
| Reference | <behaviour or value> [tag] |
| Local | <behaviour or value> [tag] |
| Exact difference | <numbers where measurable, e.g. "320px vs 300px, -20px"> |
| Impact | <what the viewer sees or can no longer do> |
| Likely root cause | <Confirmed / Likely / Undetermined> + explanation |
| Recommended correction | <property/value or behaviour to reproduce; NOT applied> |
| Source location | <file:line, or "not identifiable"> |
| Priority | Critical / High / Medium / Low |
| Evidence | <screenshot names, measurement outputs, sampled frames> |

Priority guide:
- Critical: component is missing, broken, or its core behaviour is absent.
- High: clearly visible at normal viewing (layout, size, colour, typography, missing animation or hover).
- Medium: noticeable on close comparison (spacing of a few px, timing, easing).
- Low: subtle (sub-3px, minor colour shift, tiny timing delta).

## C. Animation and Transition Differences

| ID | Element | Trigger | Property | Reference (value, tag) | Local (value, tag) | Required correction |
|---|---|---|---|---|---|---|
| A-01 | | load / scroll-into-view / hover / mouse-leave / click / scroll-linked | | | | |

For each row, also state where relevant: start state, end state, duration, delay, easing (or spring behaviour), stagger, once vs repeat, reverses on leave, mobile behaviour.

## D. Missing Behaviour

- Missing animations:
- Missing transitions:
- Missing interaction states:
- Missing visual elements or assets:
- Missing responsive behaviour:
- Missing functionality:

## E. Recommended Corrections (ordered by impact)

1. <D-xx / A-xx>: <action>
2. ...

## F. Final Matching Assessment

- Already matches:
- Does not match:
- Missing:
- Correct first:
- Limitations and unverified items:
