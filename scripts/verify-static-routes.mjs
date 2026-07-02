/**
 * Verifies static export routes exist as folder/index.html (clean URLs, no .html in paths).
 */
import { existsSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");

/** Public URL paths — no .html extension */
const REQUIRED_ROUTES = [
  "/",
  "/services",
  "/teams",
  "/careers",
  "/admin",
  "/admin/login",
  "/admin/dashboard",
  "/admin/employees",
  "/admin/employees/new",
  "/admin/teams",
  "/admin/jobs",
  "/admin/jobs/new",
  "/admin/gallery",
  "/404",
];

function resolveExportFile(route) {
  if (route === "/404") return "404.html";
  if (route === "/") return "index.html";
  const folder = route.replace(/^\//, "");
  return join(folder, "index.html");
}

const missing = REQUIRED_ROUTES.filter((route) => {
  const file = resolveExportFile(route);
  return !existsSync(join(OUT, file));
});

if (missing.length > 0) {
  console.error("Static export verification FAILED. Missing routes:");
  missing.forEach((route) => console.error(`  - ${route}`));
  process.exit(1);
}

console.log(
  `Static export OK — ${REQUIRED_ROUTES.length} routes verified (${REQUIRED_ROUTES.join(", ")}).`,
);
