export type BrandTheme = "green" | "lavender";

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  deep: string;
  gradient: string;
  heroGradient: string;
  highlightGradient: string;
  logoGradientStart: string;
  logoGradientEnd: string;
  primaryHsl: string;
  ringHsl: string;
}

export const themes: Record<BrandTheme, ThemeConfig> = {
  green: {
    primary: "#00A63E",
    secondary: "#16A34A",
    accent: "#22C55E",
    deep: "#006F1D",
    gradient: "linear-gradient(135deg, #00A63E, #16A34A, #22C55E)",
    heroGradient: "linear-gradient(135deg, #009f2d, #00A63E, #16A34A, #006f1d)",
    highlightGradient: "linear-gradient(90deg, #009f2d, #006f1d)",
    logoGradientStart: "#00A63E",
    logoGradientEnd: "#16A34A",
    primaryHsl: "142 100% 33%",
    ringHsl: "142 100% 33%",
  },
  lavender: {
    primary: "#8B5CF6",
    secondary: "#A78BFA",
    accent: "#7C3AED",
    deep: "#6D28D9",
    gradient: "linear-gradient(135deg, #A78BFA, #8B5CF6, #7C3AED, #6D28D9)",
    heroGradient: "linear-gradient(135deg, #A78BFA, #8B5CF6, #7C3AED, #6D28D9)",
    highlightGradient: "linear-gradient(90deg, #A78BFA, #8B5CF6, #6D28D9)",
    logoGradientStart: "#A78BFA",
    logoGradientEnd: "#6D28D9",
    primaryHsl: "258 90% 66%",
    ringHsl: "258 90% 66%",
  },
};

export function getActiveTheme(): BrandTheme {
  const raw =
    process.env.NEXT_PUBLIC_THEME ||
    process.env.VITE_THEME ||
    "green";
  return raw === "lavender" ? "lavender" : "green";
}

export const BRAND_NAME = "Valaiyagam Solution";
export const BRAND_SHORT = "Valaiyagam";
export const BRAND_TAGLINE = "CONNECT • INNOVATE • GROW";

export const LOGO_ICON = "/logo.png";
export const LOGO_FULL = "/logo-full.png";
