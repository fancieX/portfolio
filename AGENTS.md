# Project Instructions & Git/GitHub Workflow Guidelines

## Core Workflow Mandates (Non-Negotiable)
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
  - `task/2.3-audio-context`
  - `task/2.4-window-manager`
  - `task/3.1-design-tokens`

---

## Branch Creation & Execution Rules

1. **Strict Lineage:** All task branches must be branched from the latest, up-to-date `stage-1` branch (`git checkout stage-1 && git pull origin stage-1 && git checkout -b task/...`).
2. **One Task Per Branch:** Implement ONLY the specific numbered task assigned to that branch. Never combine multiple tasks into one branch.
3. **No Direct Commits:** Never implement or commit directly to `main` or `stage-1`.
4. **Just-In-Time Creation:** Do NOT create all task branches upfront. Create a branch only immediately before starting work on that specific task.
5. **Dependency Verification:** Before starting any task branch, verify that all prerequisite tasks and dependencies have been completed, tested, reviewed, and merged into `stage-1`.
6. **No Auto-Merging:** Never merge Pull Requests automatically. Always wait for explicit user review and approval before merging.

---

## 12-Step Standard Task Workflow

For every single numbered task, execute this exact sequence:

1. **Step 1 - Inspect:** Inspect current Git branch and working tree (`git status`).
2. **Step 2 - Checkout Base:** Switch to the `stage-1` integration branch (`git checkout stage-1`).
3. **Step 3 - Pull Updates:** Pull the latest changes from remote (`git pull origin stage-1`).
4. **Step 4 - Create Task Branch:** Create and switch to the task branch (`git checkout -b task/<num>-<slug>`).
5. **Step 5 - Implement:** Implement ONLY the scoped files and code for that numbered task.
6. **Step 6 - Verify & Test:** Run tests, typechecking, linting, and build validation (`npm run test`, `npm run build`).
7. **Step 7 - Inspect Diff:** Review `git diff` and `git status` to ensure zero unrelated changes or unintended files are tracked.
8. **Step 8 - Conventional Commit:** Commit changes using Conventional Commits format (e.g. `feat(setup): scaffold Next.js application`).
9. **Step 9 - Push Branch:** Push the task branch to GitHub (`git push -u origin task/<num>-<slug>`).
10. **Step 10 - Create Pull Request:** Create a Pull Request targeting `stage-1` via GitHub CLI (`gh pr create --base stage-1 --head task/<num>-<slug> --title "..." --body "..."`).
11. **Step 11 - Await Approval:** Stop and inform the user. Wait for the user's manual review and approval. Do not merge automatically.
12. **Step 12 - Transition to Next Task:** Once the user reviews and merges the PR into `stage-1`, update `docs/implementation-plan.md`, switch back to `stage-1`, pull, and prepare the subsequent task branch.

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
- **Branch Name:** `task/<num>-<slug>`
- **Status:** `NOT STARTED` | `IN PROGRESS` | `IMPLEMENTED` | `TESTED` | `PR CREATED` | `MERGED`
- **GitHub Pull Request:** Link or PR number
- **Merge Status:** `Unmerged` | `Merged into stage-1`
- **Commit Reference:** Git commit SHA

---

## Task-Based Development Workflow

This section codifies the autonomous execution protocol for all future task requests (e.g., "Do Task 1.4", "Implement Task 2.1"). When a short task instruction is received, automatically execute this complete lifecycle without requiring repeated procedural explanations.

### 1. Autonomous Task Discovery
Upon receiving a task prompt (e.g., "Do Task X"):
1. **Locate Task Specification:** Find the exact entry for Task X in `docs/implementation-plan.md`. Read its objective, scope, affected files, dependencies, responsive baseline, and acceptance criteria.
2. **Discover Architecture & Context:** Read `docs/project-structure-analysis.md` and related architectural documentation.
3. **Inspect Snapline Research & References:** Read relevant documents under `docs/research/snapline/`:
   - `design-tokens.json` (exact hex codes, typography scale, spacing, radii, shadows, breakpoints).
   - `PAGE_TOPOLOGY.md` (route hierarchy, metadata, layout structure, interaction models).
   - `asset-inventory.csv` (asset paths, dimensions, provenance, and descriptions).
   - `interaction-matrix.md` & `responsive-analysis.md` (motion curves, hover behaviors, responsive layout shifts).
   - View matching reference screenshots in `docs/research/snapline/screenshots/`.
4. **Inspect Relevant Skills:** For reverse-engineering, cloning, or component architecture, inspect `.agent/skills/clone-website/SKILL.md` and related domain skills.
5. **Inspect Existing Code:** Examine the current codebase to understand existing components, data schemas, and styles before writing code.
6. **Strict Task Isolation:** Implement ONLY the scoped requirements of Task X. Never implement future or unrequested tasks prematurely. Never skip requirements simply because they were omitted from the user's short prompt.

### 2. Automatic Git Branch Management
1. **Inspect Working Tree & Remote:** Run `git status` and `git fetch origin` to inspect the active state and remote changes.
2. **Determine Parent Branch:** Identify the correct parent branch from the task dependencies in `docs/implementation-plan.md`. If all prerequisites are merged, the parent is the latest `stage-1`. If a prerequisite is on an unmerged dependency branch, maintain that dependency lineage.
3. **Branch Resolution & Creation:**
   - If the task branch already exists locally, switch to and reuse it (`git checkout <task-branch>`).
   - If the task branch exists only remotely, check it out with tracking (`git checkout --track origin/<task-branch>`).
   - If the task branch does not exist, switch to the parent branch, pull remote updates, and cut the new task branch (`git checkout -b task/<milestone>.<num>-<slug>`).
   - Never create duplicate branches or modify existing task commit histories.
   - If a branch has diverged from remote, inspect and report the divergence; never force-reset.
   - **Never implement tasks directly on `stage-1` or `main`.**

### 3. Protection of Existing Work (Non-Negotiable)
- **Zero Data Loss:** Never discard uncommitted modifications or delete untracked files without explicit consent.
- **No Destructive Operations:** Never run `git reset --hard`, `git clean`, `git checkout -- .`, or `git push --force`.
- **Preserve System & Config Files:** Safeguard `package-lock.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.gitignore`, and Next.js internal files.
- **Working Tree Collision Guard:** If uncommitted changes exist that conflict with branch switching, halt and ask for guidance rather than overwriting or stashing without permission.

### 4. Implementation Standards & Visual Fidelity
1. **Architecture & Conventions:** Strictly adhere to Next.js 16 App Router, TypeScript strict mode, and Tailwind CSS v4 styling rules.
2. **Research-Driven Accuracy:** Use exact token values from `design-tokens.json` and layout parameters from `PAGE_TOPOLOGY.md`. Never invent design values or guess dimensions when documented references exist.
3. **Motion & Interaction Models:** Adhere to `interaction-matrix.md` (distinguish scroll-driven vs. click-driven behaviors, use specified spring curves and transitions).
4. **Responsive Integrity:** Verify mobile (390px), tablet (768px), and desktop (1200px/1440px) breakpoints where applicable.
5. **Minimal Footprint:** Avoid unnecessary third-party dependencies, bloatware, or editing unrelated files.

### 5. Mandatory Verification & Quality Gates
Before declaring a task ready for review, run and pass every relevant gate:
1. **TypeScript Strict Typecheck:** `npx tsc --noEmit` must exit with code 0 (zero errors).
2. **ESLint Validation:** `npm run lint` must exit with code 0 (zero errors, zero warnings).
3. **Production Build:** `npm run build` must compile successfully via Turbopack and prerender all static routes with exit code 0.
4. **Runtime Dev Server Test:** Start `npm run dev` and test locally (e.g. `Invoke-WebRequest http://localhost:3000`) to confirm HTTP 200 and visual functionality.
5. **Acceptance Criteria Verification:** Systematically check every acceptance criterion defined for the task in `docs/implementation-plan.md`.
6. **Self-Healing:** Diagnose and fix any type errors, lint warnings, or build issues introduced during implementation prior to presenting the report.
7. **Plan Tracking:** Update the task's status in `docs/implementation-plan.md` to `IMPLEMENTED` only after all verification gates have passed.

### 6. User Control Gate (Commit, Push & PR Policy)
Once implementation and verification are complete:
- **Do NOT commit automatically without user approval.**
- **Do NOT push automatically without user approval.**
- **Do NOT open Pull Requests automatically without user approval.**
- **Do NOT merge branches automatically without user approval.**
- Leave all modified and created files cleanly prepared in the working tree on the task branch, ready for user review.

### 7. Standardized 12-Point Final Report
Every task execution concludes with a standardized report covering:
1. **Task Number & Task Name**
2. **Documentation Files Inspected** (Plans, tokens, topology, research, skills)
3. **Dependencies Identified** (Prerequisites and merge status)
4. **Parent Branch**
5. **Task Branch**
6. **Files Created or Modified**
7. **Features Implemented**
8. **Tests Performed & Results** (`tsc`, `lint`, `build`, runtime)
9. **Acceptance Criteria Completed** (Explicit checklist)
10. **Remaining Issues / Notes** (If any)
11. **Manual Testing Instructions** (Step-by-step URLs, actions, expected behavior)
12. **Current Git Status** (Branch, uncommitted changes, ready for commit approval)

### 8. Interaction Protocol
- When given a short prompt like "Do Task X", autonomously execute steps 1 through 7 and present the final report.
- Do not ask routine procedural questions.
- Interrupt only for genuine blockers: an unmerged prerequisite branch requiring a merge decision, an unresolved merge conflict, a potentially destructive operation, or a major design ambiguity.
- Never automatically proceed to the next task until the user approves and directs the next step.
