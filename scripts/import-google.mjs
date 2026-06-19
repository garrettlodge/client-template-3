#!/usr/bin/env node
/**
 * Usage:
 *   1. cp google-input.example.json google-input.json
 *   2. Paste the business's public Google info into google-input.json
 *   3. npm run import:google           (writes site.content.json)
 *
 * Optional args:  node scripts/import-google.mjs [inputPath] [outputPath]
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { buildContent } from "../lib/google-import.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const inputPath = process.argv[2] || join(root, "google-input.json");
const outPath = process.argv[3] || join(root, "site.content.json");

if (!existsSync(inputPath)) {
  console.error(`\n✗ No input file at ${inputPath}`);
  console.error("  Copy google-input.example.json → google-input.json, paste the");
  console.error("  business's Google info, then run `npm run import:google`.\n");
  process.exit(1);
}

const input = JSON.parse(readFileSync(inputPath, "utf8"));
const content = buildContent(input);
writeFileSync(outPath, JSON.stringify(content, null, 2) + "\n");

console.log(`\n✓ Wrote ${outPath.replace(root + "/", "")} for "${content.business.name}"`);
console.log(`  Industry: ${content.business.industry} → template: ${content.template}`);
console.log(
  `  ${content.services.length} services · ${content.reviews.items.length} reviews · rating ${content.reviews.rating}`
);
console.log("\nNext:");
console.log("  1. Review site.content.json — tweak copy, services, FAQ.");
console.log("  2. Drop real photos in /public; set portfolio/about photos.");
console.log('  3. npm run dev — preview. Change "template" to try any of the 7 looks.');
console.log("  4. Push + import the repo on Netlify.\n");
