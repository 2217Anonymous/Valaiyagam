"use client";

import { ADMIN_ROUTES, appPath } from "@/app/lib/paths";

const SESSION_KEY = "vantage_admin_session";

export function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem(SESSION_KEY));
}

export async function loginAction(
  _prevState: { error?: string } | null,
  formData: FormData,
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === "admin" && password === "admin123") {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: "1", username }));
    window.location.href = appPath(ADMIN_ROUTES.dashboard);
    return null;
  }

  return { error: "Invalid username or password" };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = appPath("/");
}
