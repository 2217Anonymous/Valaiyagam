/**
 * Verifies static export routes (trailingSlash: false — no trailing slash in URLs).
 */
import { existsSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");

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
  const segment = route.replace(/^\//, "");
  return `${segment}.html`;
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

const notFoundHtml = join(OUT, "404.html");
if (!existsSync(notFoundHtml)) {
  console.error("Static export verification FAILED: out/404.html is missing.");
  process.exit(1);
}

console.log(
  `Static export OK — ${REQUIRED_ROUTES.length} routes + custom 404.html.`,
);
