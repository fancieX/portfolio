# Project Instructions & Git/GitHub Workflow Guidelines

## Core Workflow Mandates (Non-Negotiable)
- **Documentation-First Mandate:** Never begin coding any task until research is conducted, documentation is updated, a comprehensive task specification (`docs/specifications/tasks/task-X.Y.md`) is authored across all 21 standardized sections, and the documentation validation gate passes.
- **Stable Branch Baseline:** `main` is the stable, production-ready baseline branch.
- **Stage 1 Integration Branch:** `stage-1` is the integration branch for all Stage 1 implementation tasks. All task PRs must target `stage-1`.
- **One Unique Branch Per Task:** Every numbered task requires one unique branch (`task/<milestone>.<task-number>-<short-slug>`).
- **Strict Lineage:** All task branches must be created from the latest, up-to-date `stage-1` branch (`git checkout stage-1 && git pull origin stage-1 && git checkout -b task/...`).
- **No Direct Commits:** Never implement or commit code directly on `main` or `stage-1`.
- **Atomic Tasks:** Never combine numbered tasks into a single branch. Implement ONLY the scoped files and code for that specific numbered task.
- **Zero Data Loss:** Never overwrite uncommitted changes or discard user modifications.
- **No Force Operations:** Never run `git push --force` or `git push -f`.
- **Approval Gate:** Never merge Pull Requests automatically without explicit user review and approval.
- **Pre-PR Quality Gate:** Always test, typecheck, lint, build, and inspect changes (`git diff` and `git status`) before creating a Pull Request.

---

## Project Overview & Objectives
- **Project Name:** Snapline Developer Portfolio
- **Reference Target:** `https://snapline.framer.website/`
- **Stage 1 (Current):** Faithfully recreate the Snapline reference website (`https://snapline.framer.website/`) 1:1 using Next.js 16, TypeScript, Tailwind CSS v4, Lucide React, and Framer Motion. Keep the project strictly local/private.
- **Stage 2 (Future):** Personalize the completed recreation into a personal developer portfolio (`stage-2-personalization`) (replacing case studies, bio, links, and assets).

---

## Git Branch Architecture

### Core Permanent Branches
- `main`: Production-ready, stable project baseline.
- `stage-1`: Integration branch for all Stage 1 implementation tasks. All task PRs must target `stage-1`.
- `stage-2-personalization`: Future integration branch for Stage 2 personalization. **Do not create this branch until Stage 1 is fully complete and approved.**

### Task Branch Naming Convention
Every numbered task in `docs/implementation-plan.md` has its own dedicated Git branch cut from the latest `stage-1`:
- Format: `task/<milestone>.<task-number>-<short-slug>`
- Examples:
  - `task/1.1-nextjs-scaffold`
  - `task/1.2-static-assets`
  - `task/1.3-font-integration`
  - `task/2.1-domain-types`
  - `task/2.2-mock-data`
  - `task/3.1-design-tokens`
  - `task/3.6-figma-selection-overlay`
  - `task/4.1-hero-section`

---

## Branch Creation & Execution Rules

1. **Strict Lineage:** All task branches must be branched from the latest, up-to-date `stage-1` branch (`git checkout stage-1 && git pull origin stage-1 && git checkout -b task/...`).
2. **One Task Per Branch:** Implement ONLY the specific numbered task assigned to that branch. Never combine multiple tasks into one branch.
3. **No Direct Commits:** Never implement or commit directly to `main` or `stage-1`.
4. **Just-In-Time Creation:** Do NOT create task branches upfront. Create a branch only immediately before starting Phase 6 implementation for that specific task.
5. **Dependency Verification:** Before starting any task branch, verify that all prerequisite tasks and dependencies have been completed, tested, reviewed, and merged into `stage-1`.
6. **No Auto-Merging:** Never merge Pull Requests automatically. Always wait for explicit user review and approval before merging.

---

## Safety & Governance Rules

- **Zero Data Loss:** Never overwrite uncommitted changes or discard user modifications.
- **No Force Operations:** Never run `git push --force` or `git push -f`.
- **No Branch Deletions/Resets Without Consent:** Never reset (`git reset --hard`) or delete branches without explicit user permission.
- **No Unauthorized Deployments:** Do not deploy Stage 1 to public hosting platforms (Vercel, Netlify, Cloudflare) because Stage 1 contains copyrighted third-party assets used exclusively for local reverse-engineering.
- **Authentication Transparency:** If GitHub authentication or remote configuration is missing or encounters errors, report the exact issue immediately to the user rather than assuming success.
- **Accidental Data Loss Prevention:** Before running any destructive commands (deletions, truncations, resets), halt and obtain user confirmation.

---

## Implementation Plan Tracking Protocol

Maintain and update `docs/implementation-plan.md` as work progresses. Each task entry must track:
- **Branch Name:** `task/<milestone>.<num>-<slug>`
- **Status:** `NOT STARTED` | `IN PROGRESS` | `IMPLEMENTED` | `TESTED` | `PR CREATED` | `MERGED`
- **GitHub Pull Request:** Link or PR number
- **Merge Status:** `Unmerged` | `Merged into stage-1`
- **Commit Reference:** Git commit SHA
- **Task Specification Link:** `docs/specifications/tasks/task-X.Y.md`

---

## Autonomous Documentation-First Development Workflow

This lifecycle codifies the autonomous, documentation-first execution protocol for all task requests (e.g., "Do Task 1.1", "Do Task 4.1"). When a short prompt is received, automatically execute all 8 phases below in sequence without asking routine procedural questions.

```
+-----------------------------------------------------------------------------------+
|               8-PHASE DOCUMENTATION-FIRST DEVELOPMENT LIFECYCLE                  |
+-----------------------------------------------------------------------------------+
|  Phase 1: Discover All Relevant Documentation                                     |
|  Phase 2: Conduct Detailed Research (Visual, Motion, Interactions, Responsive)    |
|  Phase 3: Update Markdown Documentation (Plan, Research & 21-Section Task Spec)   |
|  Phase 4: Documentation Validation Gate (Zero Code Until Validated)               |
|  Phase 5: Git Branch Preparation (Cut from stage-1 Just-In-Time)                  |
|  Phase 6: Implement Strictly According to Documentation                           |
|  Phase 7: Visual and Functional Verification (tsc, lint, build, runtime)         |
|  Phase 8: Standardized 14-Point Final Report & Await User Control Gate            |
+-----------------------------------------------------------------------------------+
```

---

### PHASE 1: DISCOVER ALL RELEVANT DOCUMENTATION

Upon receiving a short task prompt (e.g. "Do Task X.Y"):
1. **Identify Task:** Locate the exact task entry in `docs/implementation-plan.md`. Read its full description, scope, and acceptance criteria.
2. **Identify Prerequisites:** Verify all prerequisite tasks, dependencies, and their merge status on `stage-1`.
3. **Read Project Instructions:** Read `AGENTS.md` and any relevant nested instruction files.
4. **Inspect Architecture:** Read `docs/project-structure-analysis.md`.
5. **Explore Documentation:** Explore all relevant Markdown files under `docs/` and `docs/research/`.
6. **Examine Snapline Research:** Review:
   - `docs/research/snapline/design-tokens.json` (exact hex codes, typography scale, spacing, radii, shadows, breakpoints).
   - `docs/research/snapline/PAGE_TOPOLOGY.md` (route hierarchy, metadata, layout structure, interaction models).
   - `docs/research/snapline/asset-inventory.csv` (asset paths, dimensions, provenance, descriptions).
   - `docs/research/snapline/interaction-matrix.md` & `responsive-analysis.md` (motion curves, hover behaviors, responsive layout shifts).
7. **Examine Screenshots & Visual References:** Inspect reference screenshots in `docs/research/snapline/screenshots/` (desktop, tablet, mobile, interactions).
8. **Inspect Relevant Skills:** Review `.agent/skills/clone-website/SKILL.md` and related UI/motion skills.
9. **Inspect Existing Code:** Examine existing source code under `src/` to understand component schemas, styles, and shared state before designing changes.
10. **Follow Links:** Never assume the implementation plan is the sole source; follow all relevant documentation links and cross-references.

---

### PHASE 2: CONDUCT DETAILED RESEARCH

Before writing any specification or code, thoroughly investigate what the requested task should look and behave like using the live reference target (`https://snapline.framer.website/`), screenshots, assets, and cloning skills.

Investigate and document every detail across five areas:

#### A. Visual Design
- Component hierarchy and visual grouping
- Element dimensions (exact or estimated)
- Container max-widths and responsive constraints
- Horizontal and vertical alignment
- Margins, padding, and spacing
- Typography: font families, font sizes, weights, line heights, letter spacing, text alignment
- Text colors and background colors
- Gradients, blurs, and decorative effects
- Borders, corner radii, and box shadows
- Image dimensions, aspect ratios, object-fit, and cropping
- Icon sizes and alignment
- Layering and z-index ordering
- Positioning models (static, relative, absolute, fixed, sticky)

#### B. Animations & Motion
Investigate all animations (entrance, character/word, reveals, fade, slide, scale, rotate, hover, click, scroll-triggered, section transitions, staggered sequences, loading/transition states, background animations).
For each animation, document:
- Animated element
- Trigger condition (mount, hover, click, in-view, scroll-scrub)
- Initial state and final state
- Direction of movement
- Transform values (x, y, scale, rotate)
- Opacity transitions
- Duration and delay
- Easing function (cubic-bezier or spring parameters)
- Stagger interval for child elements
- Repeat / reversal behavior
- Scroll-dependency
- Mobile behavior (reduced motion / adaptation)

#### C. Interactions & Transitions
- Hover behavior and cursor styling
- Mouse movement and parallax interactions
- Click and press states
- Button states (idle, hover, active, disabled)
- Navigation and dropdown behaviors
- Card interactions and tilt effects
- Link destinations and navigation models
- Active and selected states
- Keyboard interactions and focus indicators
- Scroll behavior and sticky anchors
- Page-to-page transitions and loading states
- Error and empty states

#### D. Responsive Design
Document layouts across Desktop (1200px/1440px), Laptop (1024px), Tablet (768px), and Mobile (390px):
- Verified breakpoints
- Grid column and layout direction changes
- Typography scaling across viewports
- Element resizing, re-wrapping, and hugging
- Image cropping and aspect ratio shifts
- Mobile navigation transitions
- Spacing and padding adjustments
- Elements hidden, swapped, or repositioned

#### E. Technical Expectations
- Component hierarchy and file locations
- Shared and reusable component abstractions
- Asset dependencies and local paths
- Expected route paths and URL structures
- Data models and TypeScript types
- State management requirements (React state, Context, or Zustand)
- Event handling and callbacks
- External libraries and dependencies
- Accessibility requirements (ARIA roles, labels, keyboard navigation)
- Performance considerations (Turbopack, image optimization, repaint minimization)

**Evidence Classification:** Clearly distinguish between:
1. *Verified observations* (confirmed via live DOM/CSS inspection)
2. *Measured values* (exact pixel/rem/token metrics)
3. *Reasonable approximations* (calibrated visual estimates)
4. *Implementation decisions* (technical architecture choices)
5. *Unknown details* (requiring further investigation)

---

### PHASE 3: UPDATE THE MARKDOWN DOCUMENTATION (BEFORE CODING)

Documentation must be formally updated and saved BEFORE any implementation code is written.

#### A. Update `docs/implementation-plan.md`
For the requested task:
- Refine task description and scope
- Specify visual, motion, interaction, responsive, and technical requirements
- Specify prerequisite dependencies and verify merge status
- Define testable acceptance criteria
- Link the detailed task specification: `docs/specifications/tasks/task-X.Y.md`

#### B. Create or Update Detailed Task Specification
Create the task specification file at:
`docs/specifications/tasks/task-X.Y.md` (e.g. `docs/specifications/tasks/task-3.6.md`, `docs/specifications/tasks/task-4.1.md`)

Every task specification must contain the following **21 standardized sections**:
1. **Task Overview:** High-level summary of the task and its role in the application.
2. **Objective:** Concrete goal and value delivered.
3. **Scope:** Exhaustive list of what is included.
4. **Out-of-Scope Features:** Explicit boundaries of what is excluded.
5. **Reference Website & Screenshots:** Links to live reference URLs and local screenshot files.
6. **Component Hierarchy:** Detailed tree diagram / structure of React components.
7. **Detailed Visual Specifications:** Layout grids, container constraints, padding, margins.
8. **Layout & Positioning Specifications:** Flex/grid properties, coordinates, z-indices.
9. **Typography Specifications:** Font families, sizes, weights, line-heights, letter-spacing.
10. **Colour & Styling Specifications:** Hex colors, background tokens, borders, shadows, radii.
11. **Asset Requirements:** Image paths, icons, dimensions, format, source references.
12. **Animation Specifications:** Springs, easings, durations, delays, stagger, triggers.
13. **Interaction Specifications:** Hover, active, focus, click behaviors and cursor styling.
14. **Transition Specifications:** Duration, timing curves, state-to-state mappings.
15. **Responsive Behaviour:** Layout and styling across Desktop, Tablet, and Mobile.
16. **Accessibility Requirements:** Semantic tags, ARIA roles, labels, keyboard support.
17. **Technical Implementation Requirements:** State management, props, file paths, Turbopack rules.
18. **Dependencies:** Required packages, prerequisite tasks, components, and utilities.
19. **Edge Cases:** Overflow handling, long strings, missing assets, viewport resizing.
20. **Detailed Acceptance Criteria:** Testable, verifiable checklist of every requirement.
21. **Testing Requirements:** Commands and verification procedures for verification.

Use tables where appropriate for token mappings, animation curves, interaction states, and breakpoint rules.

#### C. Update Relevant Research Documents
When new design patterns, tokens, or interactions are uncovered:
- Update files under `docs/research/snapline/` (`design-tokens.json`, `interaction-matrix.md`, `responsive-analysis.md`).
- Document newly discovered asset paths or screenshot references.

#### D. Update Architecture Documentation When Necessary
- Update `docs/project-structure-analysis.md` only when the task introduces a new architectural pattern, directory structure, or global state.

---

### PHASE 4: DOCUMENTATION VALIDATION GATE

Before touching any application code:
1. Verify task specification is complete across all 21 standardized sections.
2. Verify all design references and local screenshot paths are linked.
3. Verify all animations and motion properties are explicitly defined.
4. Verify all interaction states (hover, focus, active, mobile) are documented.
5. Verify responsive behavior is specified across mobile (390px), tablet (768px), and desktop (1200px+).
6. Verify acceptance criteria are unambiguous and testable.
7. Verify zero contradictions with existing architecture or design tokens.
8. Verify `docs/implementation-plan.md` properly links to the task specification.

**Gate Enforcement:** If any requirement cannot be validated, halt and resolve it using evidence-based research. Do not write a single line of component code until the documentation validation gate passes.

---

### PHASE 5: GIT BRANCH PREPARATION

Once documentation is validated:
1. **Inspect Working Tree & Remote:** Run `git status` and `git fetch origin`.
2. **Verify Lineage:** Identify parent branch. If all prerequisites are merged, checkout and pull latest `stage-1` (`git checkout stage-1 && git pull origin stage-1`). If a prerequisite is on an unmerged dependency branch, maintain that dependency lineage.
3. **Branch Resolution & Creation:**
   - If the task branch already exists locally, switch to it (`git checkout task/<milestone>.<num>-<slug>`).
   - If it exists only remotely, checkout with tracking (`git checkout --track origin/task/<milestone>.<num>-<slug>`).
   - If it does not exist, cut it just-in-time from the parent (`git checkout -b task/<milestone>.<num>-<slug>`).
4. **Never implement tasks directly on `stage-1` or `main`.**
5. **Zero Data Loss:** Never run `git reset --hard` or overwrite uncommitted changes without explicit user approval.

---

### PHASE 6: IMPLEMENT STRICTLY ACCORDING TO DOCUMENTATION

1. **Strict Fidelity:** Implement ONLY the scoped requirements detailed in `docs/specifications/tasks/task-X.Y.md`.
2. **Follow Specifications:** Adhere strictly to the researched tokens, typography, dimensions, colors, animations, and responsive rules.
3. **No Undocumented Additions:** Never add unrequested features or alter specifications during coding. If an adjustment is needed, update the documentation first.
4. **Preserve System Configs:** Safeguard `package-lock.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, and `.gitignore`.

---

### PHASE 7: VISUAL AND FUNCTIONAL VERIFICATION

Run and pass all quality gates prior to declaring the task complete:
1. **TypeScript Strict Typecheck:** `npx tsc --noEmit` must exit with code 0 (zero errors).
2. **ESLint Validation:** `npm run lint` must exit with code 0 (zero errors, zero warnings).
3. **Production Build:** `npm run build` must compile successfully via Turbopack with exit code 0.
4. **Runtime Dev Server Test:** Start `npm run dev` and test locally (e.g. `Invoke-WebRequest http://localhost:3000`) to confirm HTTP 200 and visual functionality.
5. **Acceptance Criteria Verification:** Explicitly verify every acceptance criterion defined in the task specification and implementation plan.
6. **Self-Healing:** Diagnose and fix any type errors, lint warnings, or visual regressions before reporting.
7. **Plan Tracking:** Update the task status in `docs/implementation-plan.md` to `IMPLEMENTED`.

---

### PHASE 8: STANDARDIZED 14-POINT FINAL REPORT

Every task execution concludes with a standardized 14-point report:
1. **Task Number & Task Name**
2. **Documentation Files Inspected** (Plans, tokens, topology, research, skills)
3. **Documentation Files Created or Updated** (Task spec path, plan updates, research updates)
4. **Research Findings** (Key visual, motion, and interaction insights discovered)
5. **Important Visual Specifications Established** (Dimensions, typography, colors, layout)
6. **Animations and Interactions Documented** (Spring curves, triggers, states)
7. **Git Parent Branch and Task Branch** (Lineage and branch names)
8. **Files Created or Modified During Implementation** (Explicit list with file links)
9. **Implementation Summary** (Detailed breakdown of components and logic built)
10. **Tests and Build Results** (`tsc`, `lint`, Turbopack `build`, runtime HTTP status)
11. **Acceptance Criteria Completed** (Explicit checklist with pass status)
12. **Remaining Limitations / Notes** (Any approximations, known boundaries, or follow-ups)
13. **Manual Testing Instructions** (Step-by-step URLs, actions, viewport widths, expected behaviors)
14. **Current Git Status** (Working tree status, uncommitted changes ready for user commit review)

---

## User Control & Permissions Protocol (Non-Negotiable)

- **User Directs Every Task:** The user personally selects each task and provides a short prompt (e.g., "Do Task 1.1", "Do Task 4.1").
- **Autonomous Execution:** Upon receiving a task prompt, the agent automatically executes Phases 1 through 8 without prompting for routine procedural directions.
- **Zero Routine Questions:** Do not ask the user which documents to read, how to configure branch names, or what design tokens to use.
- **Strict Approval Gate:**
  - **Do NOT commit automatically without user approval.**
  - **Do NOT push automatically without user approval.**
  - **Do NOT open Pull Requests automatically without user approval.**
  - **Do NOT merge branches automatically without user approval.**
  - Leave all modified and created files cleanly prepared in the working tree on the task branch, ready for user review.
- **No Automatic Continuation:** Never proceed to the next task until the user explicitly reviews, approves, merges, and issues the next task prompt.
- **Accidental Data Loss Prevention:** Never run destructive Git commands (`git reset --hard`, `git clean`, `git push --force`).
