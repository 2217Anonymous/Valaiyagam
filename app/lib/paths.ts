/**
 * Path helpers — URLs without trailing slash (trailingSlash: false).
 */

const TRAILING_SLASH = false;

export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}

/** Normalize an app path for static hosting. */
export function appPath(path: string): string {
  const base = getBasePath().replace(/\/$/, "");
  let normalized = path.startsWith("/") ? path : `/${path}`;

  if (TRAILING_SLASH && normalized !== "/" && !normalized.endsWith("/")) {
    normalized = `${normalized}/`;
  }

  if (!TRAILING_SLASH && normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  return `${base}${normalized}`;
}

export const ADMIN_ROUTES = {
  root: "/admin",
  login: "/admin/login",
  dashboard: "/admin/dashboard",
  employees: "/admin/employees",
  employeesNew: "/admin/employees/new",
  teams: "/admin/teams",
  jobs: "/admin/jobs",
  jobsNew: "/admin/jobs/new",
  gallery: "/admin/gallery",
} as const;
