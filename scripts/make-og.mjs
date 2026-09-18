// Generates public/og-default.png (1200x630) from scripts/og-image.svg.
// Run: node scripts/make-og.mjs (requires devDependency `sharp`).
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const src = path.join(root, "scripts", "og-image.svg");
const out = path.join(root, "public", "og-default.png");

await sharp(src).png().toFile(out);
const meta = await sharp(out).metadata();
console.log(`og-default.png: ${meta.width}x${meta.height}`);
