# Report template

Use this structure exactly. Keep the section numbers and order so reports from different tasks are easy to compare over time.

## Header (before section 1)

- **Scope:** what was compared (e.g. "Hero Section", "Complete homepage")
- **Reference:** URL and page
- **Local:** URL and, if known, the main files involved
- **Viewports:** e.g. Desktop 1440×900, Tablet 810×1080, Mobile 390×844
- **Browser / tooling:** what was used
- **Evidence folder:** scratch path where screenshots were saved
- **Not tested:** anything that could not be checked (states, viewports, interactions) and why

---

## 1. Overall Comparison

Two to four sentences: how closely the local implementation matches the reference within scope, the number of differences by severity (e.g. "0 Critical, 2 High, 5 Medium, 3 Low"), and how many are Confirmed vs Needs investigation. Do not claim pixel-perfect accuracy unless it was actually verified.

## 2. Differences Identified

One entry per difference, in this format:

```
### D-001: <short title>
- Page / section:
- Element / component:
- Category: visual | layout | typography | animation | interaction | responsive | asset | other
- Reference:   <behaviour or appearance, with measured values where possible>
- Local:       <behaviour or appearance, with measured values where possible>
- Exact difference: <what differs, where, and by how much>
- Severity: Critical | High | Medium | Low
- Confidence: Confirmed | Needs investigation
- Evidence: <screenshot filenames and/or measurement values>
- Local source: <file and component, or "not established">
- Recommended correction: <what should change; do not apply it>
```

IDs are sequential (D-001, D-002, ...) and stay stable across sections 3 to 6, which refer back to them instead of repeating details.

## 3. Missing Elements

Bullet list of elements, animations, interactions, or sections present in the reference but absent locally, within scope. Each item references its Difference ID.

Then a separate short list:

**Not yet implemented (out of scope):** reference sections or features with no local counterpart that fall outside the requested scope. Informational only; not counted above.

## 4. Incorrect Implementations

Bullet list of elements that exist locally but are implemented wrongly or behave differently, each referencing its Difference ID.

## 5. Responsive Differences

Three sub-sections: **Desktop**, **Tablet**, **Mobile**. List the Difference IDs that occur at each viewport with a one-line summary. Include breakpoint observations (the widths at which each site changes layout) and any difference in where those breakpoints fall. If a viewport had no differences, say "No differences found at <size>".

## 6. Recommended Fix Order

Ordered list of Difference IDs, highest severity and broadest visual impact first, with a one-line reason for the ordering. Group differences that share a root cause (for example, one wrong container padding that explains several spacing differences) so they can be fixed together.

## 7. Final Assessment

The few most important things to address next, in plain language, followed by one line confirming that no project files were modified and no git state changed.
