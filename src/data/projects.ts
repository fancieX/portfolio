import type { ProjectCategory, ProjectItem } from "@/types";

/**
 * Structured dataset for Snapline portfolio work case studies.
 * Exactly 6 verified projects matching the reference architecture:
 * 1. Orbit Finance (Web app)
 * 2. Pilot Health (Mobile app)
 * 3. Kite Logistics (Web app)
 * 4. Parcelly Grid (Design system)
 * 5. Bloom Studio (Brand)
 * 6. Tidal Surf Co. (Mobile app)
 */
export const projects: ProjectItem[] = [
  {
    slug: "orbit",
    title: "Orbit",
    premise: "Cash flow forecasting web app for high-growth tech enterprises.",
    client: "Orbit Finance",
    role: "Lead Product Designer",
    type: "Web app",
    year: "2025",
    duration: "14 weeks",
    heroImage: "/images/work/orbit.jpg",
    coverImage: "/images/work/orbit.jpg",
    overview:
      "Orbit Finance provides treasury and cash flow visibility for multi-currency technology businesses. As lead product designer, I reimagined the core forecasting engine, transforming dense financial ledger exports into intuitive visual runway projections, scenario modeling tools, and automated bank reconciliation workflows.",
    challenge:
      "High-growth CFOs and finance leaders were spending 15+ hours weekly manually reconciling disparate bank accounts and spreadsheet models. The existing interface suffered from cognitive overload, fragmented reporting tables, and lack of real-time variance detection across international payment rails.",
    approach:
      "We established a modern financial interface architecture grounded in progressive disclosure. We designed interactive liquidity timeline graphs, unified multi-bank connection hubs, and real-time scenario simulation sandboxes, backed by a high-contrast financial typography scale and WCAG 2.1 AA accessible charts.",
    metrics: [
      {
        label: "+34%",
        value: "Forecasting accuracy",
        description: "Predictive precision measured across 90-day cash cycles.",
      },
      {
        label: "4.2x",
        value: "Faster reconciliations",
        description: "Automated bank feed and ledger matching speed.",
      },
      {
        label: "18",
        value: "Enterprise pilots",
        description: "Secured within the first 60 days following public launch.",
      },
    ],
    testimonial: {
      quote:
        "Maya transformed our dense treasury tooling into an interface our finance team genuinely loves using every morning. The runway modeling alone closed our Series A leads.",
      author: "Marcus Vance",
      role: "VP Product, Orbit Finance",
    },
    nextSlug: "pilot",
    featured: true,
    order: 1,
  },
  {
    slug: "pilot",
    title: "Pilot",
    premise: "Senior medication companion mobile app with voice-guided scheduling.",
    client: "Pilot Health",
    role: "Product Designer",
    type: "Mobile app",
    year: "2026",
    duration: "10 weeks",
    heroImage: "/images/work/pilot.webp",
    coverImage: "/images/work/pilot.webp",
    overview:
      "Pilot Health is a human-centric mobile companion designed to simplify complex daily medication regimens for seniors and caregivers. The app pairs high-legibility typography with ambient voice reminders, smart blister-pack tracking, and family health circle coordination.",
    challenge:
      "Over 40% of seniors managing three or more chronic prescriptions report missing doses due to confusing dosage schedules, tiny medical packaging typography, and stressful alarm interfaces that cause alert fatigue.",
    approach:
      "We conducted participatory design sessions with senior participants (ages 68–84) to develop an interface prioritizing 48px minimum touch targets, high-contrast typography, clear chronological schedule cards, and non-judgmental positive reinforcement notifications.",
    metrics: [
      {
        label: "98.4%",
        value: "Adherence rate",
        description: "Measured daily medication dosage compliance among trial cohorts.",
      },
      {
        label: "4.9★",
        value: "App store rating",
        description: "Maintained across 12,000+ active senior reviews.",
      },
      {
        label: "-62%",
        value: "Missed doses",
        description: "Reduction compared to standard phone alarm baselines.",
      },
    ],
    testimonial: {
      quote:
        "The thoughtful design eliminated our patients' anxiety around medication schedules. The simplicity is extraordinary.",
      author: "Dr. Elena Rostova",
      role: "Chief Medical Officer, Pilot Health",
    },
    nextSlug: "kite",
    featured: true,
    order: 2,
  },
  {
    slug: "kite",
    title: "Kite",
    premise: "Real-time supply chain platform providing automated dispatch logistics.",
    client: "Kite Logistics",
    role: "Lead Product Designer",
    type: "Web app",
    year: "2025",
    duration: "16 weeks",
    heroImage: "/images/work/kite.webp",
    coverImage: "/images/work/kite.webp",
    overview:
      "Kite Logistics is an enterprise freight and maritime supply chain intelligence platform. I led the end-to-end design of the central dispatch console, route optimization engine, and incident resolution center utilized by freight forwarders across 3 continents.",
    challenge:
      "Dispatch operators navigated across 6 disconnected legacy systems to monitor vessel locations, container customs milestones, and terrestrial fleet schedules, leading to delayed incident response times and costly port demurrage fees.",
    approach:
      "We synthesized the operational workflow into a unified geospatial canvas workspace. Combining real-time GPS telemetry, weather route overlays, and predictive ETA exception alerts, operators gained immediate context and 1-click automated re-routing capabilities.",
    metrics: [
      {
        label: "45 min",
        value: "Mean response time",
        description: "Reduced from 4.5 hours for freight exception handling.",
      },
      {
        label: "99.1%",
        value: "On-time delivery",
        description: "Sustained route precision across peak maritime seasons.",
      },
      {
        label: "$2.4M",
        value: "Annual savings",
        description: "In route fuel efficiency and port dwell charge reduction.",
      },
    ],
    testimonial: {
      quote:
        "Kite consolidated our entire global fleet operations into one cohesive, lightning-fast workspace. Maya's attention to workflow density is unmatched.",
      author: "Henrik Lindqvist",
      role: "Head of Operations, Kite Logistics",
    },
    nextSlug: "grid",
    featured: true,
    order: 3,
  },
  {
    slug: "grid",
    title: "Grid",
    premise: "Enterprise cross-platform design system scaling cohesive UI across 40+ teams.",
    client: "Parcelly",
    role: "Design System Lead",
    type: "Design system",
    year: "2025",
    duration: "6 months",
    heroImage: "/images/work/grid.webp",
    coverImage: "/images/work/grid.webp",
    overview:
      "Parcelly Grid is an enterprise design system uniting web, mobile, and scanner hardware applications across 40+ product teams. I architected the design token hierarchy, component anatomy, cross-framework code parity pipelines, and governance documentation.",
    challenge:
      "Rapid expansion had created 7 divergent component libraries, inconsistent accessibility standards, and slow engineering handoff cycles where developers rebuilt existing UI elements repeatedly.",
    approach:
      "We established a single source of truth powered by multi-tier design tokens (global, semantic, component) with automated export pipelines to Figma, React, and React Native. Every component was verified for WCAG 2.1 AA accessibility and packaged with usage guidelines.",
    metrics: [
      {
        label: "64%",
        value: "Faster feature handoff",
        description: "Measured from approved Figma designs to production pull requests.",
      },
      {
        label: "140+",
        value: "Figma components",
        description: "Maintained with 100% React and React Native implementation parity.",
      },
      {
        label: "0",
        value: "Accessibility regressions",
        description: "Full compliance verified across all customer-facing touchpoints.",
      },
    ],
    testimonial: {
      quote:
        "Grid unified our engineering and design teams around a shared language. The speed and visual craft of our shipping cycles doubled within three months.",
      author: "Sofia Alencar",
      role: "VP Design Systems, Parcelly",
    },
    nextSlug: "bloom",
    featured: false,
    order: 4,
  },
  {
    slug: "bloom",
    title: "Bloom",
    premise: "Brand identity, packaging system, and bespoke e-commerce store for organic botanicals.",
    client: "Bloom Studio",
    role: "Brand & Web Designer",
    type: "Brand",
    year: "2024",
    duration: "8 weeks",
    heroImage: "/images/work/bloom.webp",
    coverImage: "/images/work/bloom.webp",
    overview:
      "Bloom Studio crafts organic, sustainably sourced botanical skincare formulations. I directed the comprehensive visual identity relaunch, custom packaging typography, sustainable glass packaging materials, and bespoke digital shopping experience.",
    challenge:
      "The brand needed to transition from boutique local market distribution to a premium global DTC brand without losing its authentic artisanal heritage or alienating early loyalists.",
    approach:
      "We developed a minimalist visual identity blending editorial serif typography with warm organic color tones, custom debossed packaging guidelines, and an unhurried, tactile e-commerce interface with transparent ingredient provenance storytelling.",
    metrics: [
      {
        label: "+82%",
        value: "Direct sales growth",
        description: "Recorded in the first quarter following brand relaunch.",
      },
      {
        label: "3.8%",
        value: "Conversion rate",
        description: "Benchmark exceeding luxury beauty industry averages by 1.6x.",
      },
      {
        label: "2",
        value: "Design awards",
        description: "Honored in Brand New Identity Awards and Pentawards 2024.",
      },
    ],
    testimonial: {
      quote:
        "Maya captured the quiet elegance of our skincare line flawlessly. The brand feels timeless, confident, and deeply grounded.",
      author: "Camille Laurent",
      role: "Founder & Creative Director, Bloom Studio",
    },
    nextSlug: "tidal",
    featured: false,
    order: 5,
  },
  {
    slug: "tidal",
    title: "Tidal",
    premise: "Real-time marine surf forecast mobile app visualizing swell, period, and wind vectors.",
    client: "Tidal Surf Co.",
    role: "Product Designer",
    type: "Mobile app",
    year: "2024",
    duration: "9 weeks",
    heroImage: "/images/work/tidal.webp",
    coverImage: "/images/work/tidal.webp",
    overview:
      "Tidal Surf Co. is a real-time marine meteorology and wave condition tracker engineered for surfers and coastal navigators. I led the mobile product design, creating dynamic swell vector visualizations, tide curve charts, and personal break alert triggers.",
    challenge:
      "Standard marine forecast apps present confusing tabular weather tables that require complex manual interpretation while surfers are checking conditions in bright sunlight.",
    approach:
      "We engineered an outdoor-optimized high-contrast interface featuring dynamic 3D wave direction vectors, hourly daylight tide progression sliders, and rapid favorite-break condition summaries designed for 1-handed thumb navigation.",
    metrics: [
      {
        label: "140k+",
        value: "Active surfers",
        description: "Tracking daily breaks across Europe and North America.",
      },
      {
        label: "92%",
        value: "Forecast accuracy",
        description: "Validated against offshore buoy telemetry and camera feeds.",
      },
      {
        label: "4.8★",
        value: "App store rating",
        description: "Featured in Apple App Store Sports & Weather categories.",
      },
    ],
    testimonial: {
      quote:
        "The cleanest, most intuitive surf forecast tool ever created. It lets surfers understand complex ocean mechanics in three seconds.",
      author: "Kai Thorne",
      role: "Co-Founder, Tidal Surf Co.",
    },
    nextSlug: "orbit",
    featured: false,
    order: 6,
  },
];

/**
 * Retrieve a project by its URL slug.
 */
export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Retrieve all projects, optionally filtered by category.
 */
export function getProjectsByCategory(category: ProjectCategory): ProjectItem[] {
  if (category === "All") {
    return projects;
  }
  return projects.filter((project) => project.type === category);
}

/**
 * Retrieve featured projects for the homepage.
 */
export function getFeaturedProjects(): ProjectItem[] {
  return projects.filter((project) => project.featured);
}
