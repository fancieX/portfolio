# Project Structure & Architecture Analysis: Snapline Recreation

**Document Link:** [project-structure-analysis.md](file:///d:/portfolio/docs/project-structure-analysis.md)  
**Author:** AI Technical Architect  
**Date:** 2026-11-18  
**Context:** Option B — Stage 1 (1:1 Faithful Snapline Recreation)  
**Current Branch:** `docs/snapline-task-matrix`  

---

## 1. Executive Summary

This architecture assessment evaluates the current repository state, historical commit artifacts, the legacy `task/1.1-nextjs-scaffold` branch, and the technical requirements for faithfully recreating the **Snapline reference website** ([https://snapline.framer.website/](https://snapline.framer.website/)).

### Core Conclusions:
1. **Current Working Tree Baseline:** The active working tree (on `docs/snapline-task-matrix`) contains no application code, no `package.json`, and no active build configurations. It contains only documentation (`AGENTS.md`, `docs/implementation-plan.md`, `docs/archive/`, and `docs/research/snapline/`).
2. **Legacy Branch Inspection (`task/1.1-nextjs-scaffold`):** Read-only Git inspection reveals that `task/1.1-nextjs-scaffold` was cut from commit `5822a48` (the documentation merge of PR #1) and contains **zero application code commits**. Task 1.1 was never implemented or committed.
3. **Historical Commit Inspection (`ec0894e` & `5fb0c65`):** Early repository commits (`7cf592d` through `ec0894e`) utilized a Vite + React 19 + Tailwind CSS v4 single-page setup for an earlier project. In commit `5fb0c65` (`clean: remove all files for fresh start`), all source code was intentionally removed to provide a clean baseline for structured, task-driven development.
4. **Architectural Recommendation:** In full alignment with `AGENTS.md` and `docs/implementation-plan.md`, the recommended architecture for the 1:1 Snapline recreation is **Next.js (App Router) + TypeScript (Strict) + Tailwind CSS v4 + Framer Motion + Lucide React**. Next.js App Router natively supports Snapline's 18 fixed/dynamic content routes, dynamic parameter generation via `generateStaticParams` for the 11 dynamic routes (6 projects, 5 articles), custom 404 recovery handling via `not-found.tsx`, local WOFF2 font loading without layout shift, and standard development/production build workflows (`npm run dev`, `npm run build`, `npm run start`). Static export (`output: 'export'`) is treated as an optional future deployment decision rather than a mandatory foundation constraint.

---

## 2. Historical & Current Git State Inspection

### A. Commit Lineage Analysis
A chronological review of the Git history reveals the following evolution:
```
7cf592d  Initial commit: Set up portfolio website (Vite + React 19)
  │
ec0894e  feat: add core portfolio structure with 3D scroll animations
  │
5fb0c65  clean: remove all files for fresh start (Repository cleaned)
  │
086249d  docs: add comprehensive component specifications, research documentation
  │
a4e9e0f  chore(git): configure task-based branch workflow
  │
5822a48  Merge pull request #1 from fancieX/chore/git-workflow-setup
  │   └── [Branch: task/1.1-nextjs-scaffold was cut here, 0 commits added]
  │
6930600  docs: prepare Snapline recreation plan
  │
28f4894  Merge pull request #2 from fancieX/chore/snapline-project-planning (stage-1 HEAD)
  │
  └── [Branch: docs/snapline-task-matrix cut here]
```

### B. Legacy Branch Inspection: `task/1.1-nextjs-scaffold`
A read-only inspection was executed without switching or modifying branches:
- **HEAD Commit of `task/1.1-nextjs-scaffold`:** `5822a48`
- **Diff against `5822a48`:** Exactly zero bytes (`git diff 5822a48 task/1.1-nextjs-scaffold` returns empty).
- **Files Present on Branch:**
  - `AGENTS.md`
  - `docs/implementation-plan.md`
  - `docs/research/` (Retro PC research documents and screenshots)
- **Findings:**
  - No Next.js application scaffold exists on `task/1.1-nextjs-scaffold`.
  - No `package.json`, `tsconfig.json`, `next.config.js`, or `src/` directories exist on that branch.
  - The branch was initialized as a placeholder prior to the strategy shift to Snapline and contains no reusable code.

### C. Pre-Clean Architecture Inspection (Commit `ec0894e`)
Inspection of the repository prior to clean commit `5fb0c65`:
- **Framework:** Vite 8.2.2 + React 19.2.8 (Single-Page Application).
- **Styling:** `@tailwindcss/vite` 4.3.3 + `tailwindcss` 4.3.3.
- **Motion:** `framer-motion` 13.1.1 + `lenis` 1.3.26.
- **Linter / Typechecker:** `oxlint` 1.79.0 + `typescript` 6.0.2.
- **Reusability Assessment:**
  - The components in `ec0894e` (`Hero.tsx`, `BioSection.tsx`, `StatementSection.tsx`) belonged to an unrelated design concept.
  - While the dependencies confirm that Tailwind CSS v4 and Framer Motion run cleanly in this environment, none of the application code or component JSX is reusable for the 1:1 Snapline recreation.

---

## 3. Technology Evaluation for Snapline Recreation

| Architectural Criterion | Snapline Reference Requirement | Next.js App Router | Vite + React SPA |
|:---|:---|:---:|:---:|
| **Route Architecture** | 19 distinct routes (`/`, `/work`, 6 projects, `/about`, `/journal`, 5 articles, `/contact`, `/privacy`, `/terms`, `/404`) | **Native File-Based Routing** (`app/work/[slug]/page.tsx`, `app/journal/[slug]/page.tsx`) | Requires client-side routing library (`react-router-dom`) |
| **Prerendering & Dynamic Generation** | Fast initial page loads with pre-rendered HTML across 18 content pages + custom 404 | **Static Prerendering + `generateStaticParams`** for the 6 project slugs and 5 article slugs; standard static pre-rendering for fixed pages | Client-side only (requires manual SSG setup if needed) |
| **SEO & Meta Tags** | Dynamic page titles (`Orbit \| Maya Ortiz`, etc.) and OpenGraph metadata | **Native Metadata API** (`export const metadata = ...`) | Requires `react-helmet-async` or manual document.title updates |
| **Font Optimization** | Geist & Inter WOFF2 fonts with zero Layout Shift (CLS) | **`next/font/local`** automatically optimizes and preloads fonts | Requires manual `@font-face` CSS management |
| **Custom 404 Architecture** | Direct `/404` page + unknown URL fallback | **`src/app/404/page.tsx` + `not-found.tsx`** sharing a reusable `NotFoundCanvas` component | Requires manual wildcard route matching |
| **Virtual 2D Canvas Motion** | Spatial canvas panning between artboards | **Client Components (`"use client"`)** running Framer Motion | Fully supported |
| **Standard Alignment** | Mandated in `AGENTS.md` and approved `docs/implementation-plan.md` | **Mandated Standard Stack** | Deviates from approved project guidelines |

**Verdict:** Next.js (App Router) is the optimal and formally mandated technology stack for this project.

---

## 4. Recommended Project Directory Layout

The implementation will establish a clean, standard Next.js directory structure inside `src/`:

```
portfolio/
├── .agent/                             # Local agent configurations (untracked)
├── docs/                               # Project architecture, master plans, and research
│   ├── archive/                        # Preserved Retro PC documentation
│   ├── project-structure-analysis.md   # This architecture assessment
│   ├── implementation-plan.md          # Active master implementation plan & task matrix
│   └── research/                       # Research dossiers
│       ├── components/                 # Preserved Retro PC component research
│       ├── screenshots/                # Preserved Retro PC screenshots
│       └── snapline/                   # Approved Snapline research archive (54 screenshots, tokens, CSV)
├── public/                             # Static public assets
│   ├── fonts/                          # Local Geist & Inter WOFF2 font files
│   └── images/                         # Mirrored project covers, hero portrait, Polaroid assets
├── src/
│   ├── app/                            # Next.js App Router route handlers
│   │   ├── layout.tsx                  # Root layout (fonts, canvas background, metadata)
│   │   ├── page.tsx                    # Route 1: Homepage (/)
│   │   ├── not-found.tsx               # Global fallback for arbitrary invalid URLs
│   │   ├── 404/
│   │   │   └── page.tsx                # Route 19: Explicit direct route for /404
│   │   ├── about/
│   │   │   └── page.tsx                # Route 9: About (/about)
│   │   ├── contact/
│   │   │   └── page.tsx                # Route 16: Contact (/contact)
│   │   ├── journal/
│   │   │   ├── page.tsx                # Route 10: Journal Catalog (/journal)
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Routes 11-15: Journal Articles (/journal/[slug])
│   │   ├── privacy/
│   │   │   └── page.tsx                # Route 17: Privacy Policy (/privacy)
│   │   ├── terms/
│   │   │   └── page.tsx                # Route 18: Terms of Service (/terms)
│   │   └── work/
│   │       ├── page.tsx                # Route 2: Work Catalog (/work)
│   │       └── [slug]/
│   │           └── page.tsx            # Routes 3-8: Project Detail Pages (/work/[slug])
│   ├── components/                     # Modular component architecture
│   │   ├── canvas/                     # Canvas coordinate engine, pan transitions, dot-grid
│   │   ├── navigation/                 # Persistent top header, bottom floating dock, Lisbon clock
│   │   ├── primitives/                 # Atomic UI primitives (buttons, pills, cards, inputs, overlays)
│   │   ├── home/                       # Homepage-specific components (hero, portrait, process)
│   │   ├── work/                       # Work-specific components (grid, list, category filters)
│   │   ├── project/                    # Reusable project detail components (meta bar, metrics, next card)
│   │   ├── about/                      # About-specific components (stats, timeline, tools, FAQ accordion)
│   │   ├── journal/                    # Journal-specific components (cards, editorial reader)
│   │   ├── contact/                    # Contact-specific components (inquiry form, selectors)
│   │   └── legal/                      # Reusable legal layout with tab navigation
│   ├── data/                           # Structured TypeScript data models (6 projects, 5 articles)
│   ├── hooks/                          # Custom React hooks (canvas coordinates, viewport, Lisbon clock)
│   ├── styles/                         # Global styles (Tailwind v4 theme directives)
│   └── types/                          # Strict TypeScript domain interfaces
├── AGENTS.md                           # Master workflow mandates & Git rules
├── next.config.ts                      # Next.js configuration
├── package.json                        # Node dependencies and build scripts
├── postcss.config.mjs                  # PostCSS configuration for Tailwind CSS v4
├── tsconfig.json                       # Strict TypeScript configuration
└── tailwind.config.ts / @theme         # Tailwind CSS v4 design token configuration
```

---

## 5. Summary of Architectural Tasks for Milestone 1

Based on this assessment, Milestone 1 will initialize the project foundation cleanly and conservatively without bloat:
1. **Task 1.1 (`task/1.1-nextjs-app-foundation`):** Initialize the minimal Next.js App Router scaffold with TypeScript strict mode (preserving the legacy `task/1.1-nextjs-scaffold` branch untouched).
2. **Task 1.2:** Configure Tailwind CSS v4 with design tokens mapped directly from `docs/research/snapline/design-tokens.json`.
3. **Task 1.3:** Download and stage the 4 verified WOFF2 fonts (`Geist` Regular, Medium, SemiBold and `Inter` Bold) into `public/fonts/` with `next/font/local`.
4. **Task 1.4:** Organize and stage the 28 project assets into `public/images/` adhering to `asset-inventory.csv`.
5. **Task 1.5:** Construct the shared root layout (`src/app/layout.tsx`) embedding the global background tone (`#E6E6E3`), the repeating dot-grid pattern, and SEO metadata.

This foundation establishes zero technical debt and enables all subsequent milestones to proceed with high precision.
