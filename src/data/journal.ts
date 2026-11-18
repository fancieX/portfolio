import type { ArticleCategory, JournalArticle } from "@/types";

/**
 * Structured dataset for Snapline portfolio editorial journal articles.
 * Exactly 5 verified articles matching the reference topology:
 * 1. constraints ("Why constraints are the foundation of great design")
 * 2. white-space ("The art of white space in modern interfaces")
 * 3. design-system ("Building a design system from scratch")
 * 4. typography-brand ("Typography choices that define brand identity")
 * 5. handoff ("A handoff engineers actually thank you for")
 */
export const articles: JournalArticle[] = [
  {
    slug: "constraints",
    title: "Why constraints are the foundation of great design",
    category: "Design",
    date: "Oct 14, 2026",
    readTime: "6 min read",
    excerpt:
      "How artificial boundaries, strict token systems, and engineering limitations unlock creative clarity instead of restricting it.",
    heroImage: "/images/journal/constraints.webp",
    author: "Maya Ortiz",
    featured: true,
    order: 1,
    content: `## The Paradox of Creative Freedom

When designers are given total freedom—infinite canvases, limitless color choices, arbitrary typography scales—the natural outcome is hesitation, inconsistency, and cognitive friction. A blank slate feels liberating for about ten seconds, after which it becomes paralyzing.

The best digital products in history were not born out of unconstrained artistic license; they were forged within strict, unforgiving boundaries.

> "Constraints are not the enemy of creativity; they are its single most reliable catalyst. Without limits, there are no decisions—only endless preferences."

## Digital Architecture Requires Boundaries

In digital product design, constraints emerge from three distinct vectors:

1. **Systemic Constraints:** Design tokens, grid increments, spatial rhythm, and component libraries.
2. **Technical Constraints:** Network latency, mobile screen dimensions, hardware rendering limitations, and bundle sizes.
3. **Cognitive Constraints:** Human short-term memory, visual hierarchy scanning speeds, and thumb reach zones.

When you deliberately embrace these constraints early in the design cycle, you eliminate thousands of redundant micro-decisions. You no longer debate whether a margin should be 19px or 23px—your 8px spatial grid makes the choice evident.

## The 8-Point Grid as a Creative Engine

Consider the humble 8-point spatial system. Critics often assume that locking all padding, margins, and component heights to multiples of 8 creates repetitive, boring layouts. In practice, the opposite occurs.

By automating the mechanical arithmetic of spatial geometry, designers liberate mental bandwidth to focus on what genuinely matters: narrative progression, interactive delight, typographic expression, and emotional resonance.

## Embracing Technical Reality

The most effective product designers do not view engineering limitations as obstacles to be fought. A 60fps animation budget, offline-first data sync states, and responsive reflow boundaries are creative materials to be sculpted.

When you design with technical realities in mind from day one, you build interfaces that feel effortless, resilient, and enduring.`,
  },
  {
    slug: "white-space",
    title: "The art of white space in modern interfaces",
    category: "Design",
    date: "Sep 30, 2026",
    readTime: "5 min read",
    excerpt:
      "Negative space is not empty space. Exploring the intentional mechanics of rhythm, breathing room, and typographic hierarchy.",
    heroImage: "/images/journal/white-space.webp",
    author: "Maya Ortiz",
    featured: false,
    order: 2,
    content: `## Space as an Active Material

In visual design, negative space is frequently misunderstood as emptiness—an absence waiting to be filled with another banner, a tertiary CTA, or an explanatory tooltip. In truth, white space is an active, structural material with tangible mass and gravitas.

Just as silence between musical notes defines rhythm and melody, spatial intervals between interface elements dictate how users comprehend information.

> "White space is like oxygen in an interface: when there is enough of it, you barely notice; when it is deprived, everything begins to suffocate."

## Micro Space vs Macro Space

Understanding negative space requires distinguishing between two complementary layers:

- **Micro Space:** The precise intervals between typographic lines (line-height), letter pairs (tracking), form labels, and input fields. Micro space directly governs legibility and scannability.
- **Macro Space:** The generous valleys between major page sections, container cards, and global navigation rails. Macro space communicates grouping, pacing, and visual confidence.

Luxury brands and premium editorial sites understand this intuitively. Cheap interfaces cram as much content as possible above the fold; confident products allow content to breathe.

## Typographic Hierarchy and Visual Density

When designing complex dashboard interfaces or data-heavy applications, the instinctive reaction is to reduce font sizes to fit more data on screen. This almost always degrades comprehension.

Instead of reducing typography scale, increasing the contrast of white space around primary numbers allows the eye to isolate critical telemetry instantly. Space acts as a natural spotlight.`,
  },
  {
    slug: "design-system",
    title: "Building a design system from scratch",
    category: "Systems",
    date: "Sep 12, 2026",
    readTime: "8 min read",
    excerpt:
      "From foundational design tokens to multi-brand component architectures that scale seamlessly across 40+ engineering teams.",
    heroImage: "/images/journal/design-system.webp",
    author: "Maya Ortiz",
    featured: false,
    order: 3,
    content: `## Beyond the Component Library

The most pervasive misconception about design systems is that they are simply a collection of styled buttons, modal dialogues, and input fields in Figma. A component library is just an artifact; a true design system is an institutional contract between design, product, and engineering.

It establishes shared vocabulary, governance protocols, token synchronization pipelines, and accessibility guarantees that persist long after individual designers move on.

> "A design system without governance is not a system—it is an overgrown sticker sheet destined to decay."

## The Three Tiers of Design Tokens

Every resilient design system begins with a tiered design token hierarchy:

1. **Global (Primitive) Tokens:** Literal raw values that do not convey intent (\`blue-500: #2563EB\`, \`space-16: 16px\`).
2. **Semantic (System) Tokens:** Contextual tokens describing functional role (\`color-brand-primary\`, \`surface-card-background\`, \`border-interactive-focus\`).
3. **Component Tokens:** Scoped variables tied to specific widget implementations (\`button-primary-bg\`, \`dock-pill-radius\`).

By isolating raw values from semantic intent, multi-brand theming and dark mode conversions become deterministic configuration changes rather than multi-week engineering refactors.

## Driving Adoption Across 40+ Teams

Building the system is only 20% of the battle; driving active adoption across dozens of cross-functional feature teams is the remaining 80%.

To succeed, the system must make the right path the path of least resistance. Components must be fully typed in TypeScript, battle-tested for accessibility compliance (WCAG 2.1 AA), accompanied by interactive documentation, and continuously synced via automated GitHub pull request pipelines.`,
  },
  {
    slug: "typography-brand",
    title: "Typography choices that define brand identity",
    category: "Branding",
    date: "Aug 28, 2026",
    readTime: "4 min read",
    excerpt:
      "Pairing editorial sans-serifs with mono data layers to craft a recognizable typographic identity across digital touchpoints.",
    heroImage: "/images/journal/typography-brand.webp",
    author: "Maya Ortiz",
    featured: false,
    order: 4,
    content: `## The Voice You Read Before You Listen

Typography is the physical voice of digital products. Long before a user parses the semantic meaning of a sentence, the weight, proportions, and letterforms have already established the brand's tone: authoritative or playful, industrial or artisanal, unhurried or urgent.

In an era where interface layouts increasingly converge toward standardized patterns, typography remains one of the few pure frontiers for distinct brand expression.

> "You can strip away every photograph and background graphic from an interface, and if the typography is exceptional, the brand remains instantly identifiable."

## The Editorial Pairing Strategy

In my studio practice, I often employ a deliberate dual-font architecture:

- **The Narrative Layer (Geist Sans):** A pristine, geometric sans-serif characterized by neutral grotesque proportions, high x-height, and razor-sharp terminals. It conveys modern clarity across long-form essays, headlines, and interface controls.
- **The Metric Layer (Inter / Mono):** High-contrast numerical weights and monospaced timestamps that evoke architectural blueprints, engineering schematics, and financial ledgers.

This tension between warm editorial prose and cold technical data creates a signature visual rhythm that feels simultaneously human and rigorous.`,
  },
  {
    slug: "handoff",
    title: "A handoff engineers actually thank you for",
    category: "Process",
    date: "Aug 9, 2026",
    readTime: "5 min read",
    excerpt:
      "Bridging the gap between Figma artboards and production pull requests with token alignment, component states, and edge-case specs.",
    heroImage: "/images/journal/handoff.webp",
    author: "Maya Ortiz",
    featured: false,
    order: 5,
    content: `## The Myth of the "Handoff"

The term "handoff" implies a relay race: a designer finishes their leg, tosses a Figma URL over an imaginary wall, and walks away while engineers struggle to implement it. This mental model is broken.

Great digital products are built through continuous dialogue, not transactional handoffs. When designers treat engineers as co-authors of the user experience, the quality of the shipped product rises dramatically.

> "A design in Figma is not the product; it is a hypothesis. The only product that matters is the one running on customer devices."

## Five Things Engineers Actually Need

When preparing interface specifications for implementation, high-fidelity static mockups are rarely enough. Engineers need clarity on:

1. **State Completeness:** Explicit visual specs for default, hover, active, focus-visible, disabled, loading skeleton, and error validation states.
2. **Dynamic Content Limits:** What happens when a user's name is 42 characters long? How does a title wrap on a 320px mobile viewport?
3. **Responsive Breakpoint Behavior:** Fluid scaling rules vs discrete layout shifts across 390px, 768px, and 1200px.
4. **Token Parity:** Color, spacing, and elevation variables named identically in both Figma styles and CSS theme files.
5. **Motion Specifications:** Exact easing curves, durations (in milliseconds), and trigger conditions rather than vague hand-wavy descriptions.

## Designing in the Medium

The ultimate shortcut to frictionless collaboration is designers developing foundational literacy in the medium they design for: HTML, CSS flexbox/grid, and DOM rendering mechanics.

When you understand how layout engines calculate box models, you stop creating layouts that are technically impossible or prohibitively expensive to maintain.`,
  },
];

/**
 * Retrieve an article by its URL slug.
 */
export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return articles.find((article) => article.slug === slug);
}

/**
 * Retrieve all articles, optionally filtered by category.
 */
export function getArticlesByCategory(
  category: ArticleCategory | "All"
): JournalArticle[] {
  if (category === "All") {
    return articles;
  }
  return articles.filter((article) => article.category === category);
}

/**
 * Retrieve the featured article for the journal header banner.
 */
export function getFeaturedArticle(): JournalArticle | undefined {
  return articles.find((article) => article.featured);
}

/**
 * Retrieve all articles in sequence order.
 */
export function getAllArticles(): JournalArticle[] {
  return [...articles].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
