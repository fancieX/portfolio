import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const imagesToCreate = [
  // Work projects (1920x1080)
  {
    path: "public/images/work/orbit.jpg",
    format: "jpeg",
    width: 1920,
    height: 1080,
    bg: "#0D1117",
    accent: "#38BDF8",
    title: "ORBIT FINANCE",
    subtitle: "Enterprise FinTech Trading Platform",
  },
  {
    path: "public/images/work/pilot.webp",
    format: "webp",
    width: 1920,
    height: 1080,
    bg: "#0A192F",
    accent: "#34D399",
    title: "PILOT HEALTH",
    subtitle: "Clinical Operating Infrastructure",
  },
  {
    path: "public/images/work/kite.webp",
    format: "webp",
    width: 1920,
    height: 1080,
    bg: "#1E1B4B",
    accent: "#818CF8",
    title: "KITE LOGISTICS",
    subtitle: "Global Cargo Flow Optimization",
  },
  {
    path: "public/images/work/grid.webp",
    format: "webp",
    width: 1920,
    height: 1080,
    bg: "#18181B",
    accent: "#D6FF3F",
    title: "GRID DESIGN SYSTEM",
    subtitle: "Multi-Brand Design Tokens Architecture",
  },
  {
    path: "public/images/work/bloom.webp",
    format: "webp",
    width: 1920,
    height: 1080,
    bg: "#1C1917",
    accent: "#F472B6",
    title: "BLOOM SKINCARE",
    subtitle: "Direct-to-Consumer Editorial E-Commerce",
  },
  {
    path: "public/images/work/tidal.webp",
    format: "webp",
    width: 1920,
    height: 1080,
    bg: "#082F49",
    accent: "#22D3EE",
    title: "TIDAL SURF FORECAST",
    subtitle: "Oceanographic Swell Prediction App",
  },

  // Journal editorial covers (1600x900)
  {
    path: "public/images/journal/constraints.webp",
    format: "webp",
    width: 1600,
    height: 900,
    bg: "#141414",
    accent: "#D6FF3F",
    title: "DESIGN CONSTRAINTS",
    subtitle: "Building systemic design in high-complexity environments",
  },
  {
    path: "public/images/journal/white-space.webp",
    format: "webp",
    width: 1600,
    height: 900,
    bg: "#161616",
    accent: "#E2E8F0",
    title: "THE POWER OF WHITE SPACE",
    subtitle: "Spatial rhythm, optical balance, and visual cadence",
  },
  {
    path: "public/images/journal/design-system.webp",
    format: "webp",
    width: 1600,
    height: 900,
    bg: "#111827",
    accent: "#60A5FA",
    title: "BUILDING SYSTEMIC FOUNDATIONS",
    subtitle: "Token architectures from design files to code",
  },
  {
    path: "public/images/journal/typography-brand.webp",
    format: "webp",
    width: 1600,
    height: 900,
    bg: "#1F1D2B",
    accent: "#FBBF24",
    title: "TYPOGRAPHY AS BRAND ANCHOR",
    subtitle: "Type scales, letter-spacing, and typographic tone",
  },
  {
    path: "public/images/journal/handoff.webp",
    format: "webp",
    width: 1600,
    height: 900,
    bg: "#18181B",
    accent: "#A78BFA",
    title: "DESIGN TO CODE HANDOFF",
    subtitle: "Bridging spatial concepts with production UI code",
  },

  // Polaroids (600x720)
  {
    path: "public/images/polaroids/polaroid-01.webp",
    format: "webp",
    width: 600,
    height: 720,
    bg: "#2A2A2A",
    accent: "#E6E6E3",
    title: "STUDIO MEMO",
    subtitle: "Lisbon Workspace 01",
  },
  {
    path: "public/images/polaroids/polaroid-02.webp",
    format: "webp",
    width: 600,
    height: 720,
    bg: "#222222",
    accent: "#D6FF3F",
    title: "CANVAS NOTEBOOK",
    subtitle: "Coordinate Spatial 02",
  },
  {
    path: "public/images/polaroids/polaroid-03.webp",
    format: "webp",
    width: 600,
    height: 720,
    bg: "#1A1A1A",
    accent: "#FF3B5C",
    title: "WIRE &amp; FRAME",
    subtitle: "Artboard Recovery 03",
  },
];

for (const item of imagesToCreate) {
  const dir = path.dirname(item.path);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const svgOverlay = Buffer.from(`
    <svg width="${item.width}" height="${item.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="${item.accent}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${item.bg}" stop-opacity="0.95"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="${item.bg}"/>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <rect x="40" y="40" width="${item.width - 80}" height="${item.height - 80}" rx="16" fill="none" stroke="${item.accent}" stroke-opacity="0.2" stroke-width="2"/>
      <text x="${item.width / 2}" y="${item.height / 2 - 20}" font-family="sans-serif" font-size="${Math.round(item.width * 0.035)}" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">${item.title}</text>
      <text x="${item.width / 2}" y="${item.height / 2 + 35}" font-family="sans-serif" font-size="${Math.round(item.width * 0.018)}" font-weight="400" fill="${item.accent}" text-anchor="middle">${item.subtitle}</text>
      <text x="60" y="${item.height - 60}" font-family="monospace" font-size="14" fill="#6B7280">${item.width} × ${item.height} • Snapline Demonstration Asset</text>
    </svg>
  `);

  let pipeline = sharp({
    create: {
      width: item.width,
      height: item.height,
      channels: 4,
      background: item.bg,
    },
  }).composite([{ input: svgOverlay }]);

  if (item.format === "jpeg") {
    await pipeline.jpeg({ quality: 90 }).toFile(item.path);
  } else {
    await pipeline.webp({ quality: 90 }).toFile(item.path);
  }

  console.log(`Created: ${item.path} (${item.width}x${item.height})`);
}

// Stage SVG Icons in public/icons/
const icons = [
  {
    name: "cursor.svg",
    content: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 3L16 9.5L10.5 11L8.5 16.5L4 3Z" fill="currentColor"/></svg>`,
  },
  {
    name: "frame.svg",
    content: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7H16M4 13H16M7 4V16M13 4V16" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>`,
  },
  {
    name: "user.svg",
    content: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="7" r="3.5" stroke="currentColor" stroke-width="1.75"/><path d="M4.5 16.5C4.5 13.5 7 12 10 12C13 12 15.5 13.5 15.5 16.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>`,
  },
  {
    name: "text.svg",
    content: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6V4H16V6M10 4V16M7 16H13" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    name: "comment.svg",
    content: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H16C16.55 4 17 4.45 17 5V13C17 13.55 16.55 14 16 14H7L3 17V5C3 4.45 3.45 4 4 4Z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    name: "accordion-toggle.svg",
    content: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    name: "grid-view.svg",
    content: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="9" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>`,
  },
  {
    name: "list-view.svg",
    content: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5H13.5M2.5 8H13.5M2.5 11.5H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
];

const iconsDir = "public/icons";
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

for (const icon of icons) {
  fs.writeFileSync(path.join(iconsDir, icon.name), icon.content);
  console.log(`Created icon: ${path.join(iconsDir, icon.name)}`);
}

console.log("All static assets and icons staged successfully.");
