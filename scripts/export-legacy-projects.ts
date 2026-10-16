import { copyFile } from "node:fs/promises";
import { caseStudies } from "../src/content/case-studies.ts";

// Full HTML compatibility files work on static hosts without redirect rules.
// All generated links and asset paths are root-relative, so these copies work
// at both URLs without JavaScript or a second rendering pipeline.
for (const { slug } of caseStudies) {
  const directory = new URL(`../out/projects/${slug}/index.html`, import.meta.url);
  const legacy = new URL(`../out/projects/${slug}.html`, import.meta.url);
  await copyFile(directory, legacy);
}
console.log(`Exported ${caseStudies.length} legacy project HTML entries.`);
