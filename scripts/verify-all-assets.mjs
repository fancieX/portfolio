import fs from "node:fs";
import sharp from "sharp";

const assets = [
  { id: "AST-01", path: "public/images/hero-portrait.webp", expectedW: 1200, expectedH: 1800 },
  { id: "AST-02", path: "public/images/work/orbit.jpg", expectedW: 1920, expectedH: 1080 },
  { id: "AST-03", path: "public/images/work/pilot.webp", expectedW: 1920, expectedH: 1080 },
  { id: "AST-04", path: "public/images/work/kite.webp", expectedW: 1920, expectedH: 1080 },
  { id: "AST-05", path: "public/images/work/grid.webp", expectedW: 1920, expectedH: 1080 },
  { id: "AST-06", path: "public/images/work/bloom.webp", expectedW: 1920, expectedH: 1080 },
  { id: "AST-07", path: "public/images/work/tidal.webp", expectedW: 1920, expectedH: 1080 },
  { id: "AST-08", path: "public/images/journal/constraints.webp", expectedW: 1600, expectedH: 900 },
  { id: "AST-09", path: "public/images/polaroids/polaroid-01.webp", expectedW: 600, expectedH: 720 },
  { id: "AST-10", path: "public/images/polaroids/polaroid-02.webp", expectedW: 600, expectedH: 720 },
  { id: "AST-11", path: "public/images/polaroids/polaroid-03.webp", expectedW: 600, expectedH: 720 },
  { id: "AST-25", path: "public/images/journal/white-space.webp", expectedW: 1600, expectedH: 900 },
  { id: "AST-26", path: "public/images/journal/design-system.webp", expectedW: 1600, expectedH: 900 },
  { id: "AST-27", path: "public/images/journal/typography-brand.webp", expectedW: 1600, expectedH: 900 },
  { id: "AST-28", path: "public/images/journal/handoff.webp", expectedW: 1600, expectedH: 900 },
];

let allPassed = true;

for (const a of assets) {
  if (!fs.existsSync(a.path)) {
    console.error(`FAIL: ${a.id} missing at ${a.path}`);
    allPassed = false;
    continue;
  }
  const meta = await sharp(a.path).metadata();
  const match = meta.width === a.expectedW && meta.height === a.expectedH;
  if (!match) {
    console.error(`FAIL: ${a.id} dimensions ${meta.width}x${meta.height} do not match expected ${a.expectedW}x${a.expectedH}`);
    allPassed = false;
  } else {
    console.log(`PASS: ${a.id} [${meta.format}] ${meta.width}x${meta.height} (${(fs.statSync(a.path).size / 1024).toFixed(1)} KB) -> ${a.path}`);
  }
}

const icons = [
  "public/icons/cursor.svg",
  "public/icons/frame.svg",
  "public/icons/user.svg",
  "public/icons/text.svg",
  "public/icons/comment.svg",
  "public/icons/accordion-toggle.svg",
  "public/icons/grid-view.svg",
  "public/icons/list-view.svg",
];

for (const icon of icons) {
  if (!fs.existsSync(icon)) {
    console.error(`FAIL: icon missing at ${icon}`);
    allPassed = false;
  } else {
    console.log(`PASS: Icon staged at ${icon}`);
  }
}

if (!allPassed) {
  process.exit(1);
} else {
  console.log("\nAll 15 images and 8 icons verified successfully with exact dimensions!");
}
