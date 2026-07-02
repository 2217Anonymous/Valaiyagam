/**
 * Path helpers for static export (trailingSlash: true) on Amplify / CloudFront.
 * Always use these for window.location and manual redirects in production.
 */

const TRAILING_SLASH = true;

export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}

/** Normalize an app path for static hosting with trailing slashes. */
export function appPath(path: string): string {
  const base = getBasePath().replace(/\/$/, "");
  let normalized = path.startsWith("/") ? path : `/${path}`;

  if (TRAILING_SLASH && normalized !== "/" && !normalized.endsWith("/")) {
    normalized = `${normalized}/`;
  }

  return `${base}${normalized}`;
}

export const ADMIN_ROUTES = {
  root: "/admin/",
  login: "/admin/login/",
  dashboard: "/admin/dashboard/",
  employees: "/admin/employees/",
  employeesNew: "/admin/employees/new/",
  teams: "/admin/teams/",
  jobs: "/admin/jobs/",
  jobsNew: "/admin/jobs/new/",
  gallery: "/admin/gallery/",
} as const;
