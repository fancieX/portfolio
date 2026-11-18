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
- **Project Name:** Retro PC Developer Portfolio
- **Stage 1 (Current):** Faithfully recreate the reference website (`https://retro-pc.framer.website/`) 1:1 using Next.js 16, TypeScript, Tailwind CSS v4, Lucide React, and Framer Motion. Keep the project strictly local/private.
- **Stage 2 (Future):** Personalize the completed recreation into a personal developer portfolio (replacing case studies, bio, links, and assets).

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
