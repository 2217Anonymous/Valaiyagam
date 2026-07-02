/**
 * Verifies static export output contains expected route folders.
 * Run after `npm run build` — also wired into amplify.yml pre-deploy check.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");

const REQUIRED = [
  "index.html",
  "services/index.html",
  "teams/index.html",
  "careers/index.html",
  "admin/index.html",
  "admin/login/index.html",
  "admin/dashboard/index.html",
  "admin/employees/index.html",
  "admin/employees/new/index.html",
  "admin/teams/index.html",
  "admin/jobs/index.html",
  "admin/jobs/new/index.html",
  "admin/gallery/index.html",
  "404.html",
];

const missing = REQUIRED.filter((route) => !existsSync(join(OUT, route)));

if (missing.length > 0) {
  console.error("Static export verification FAILED. Missing routes:");
  missing.forEach((r) => console.error(`  - out/${r}`));
  process.exit(1);
}

console.log(`Static export OK — ${REQUIRED.length} required routes present.`);
