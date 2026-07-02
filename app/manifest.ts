import type { MetadataRoute } from "next";
import { BRAND_NAME, BRAND_SHORT, LOGO_ICON } from "@/app/lib/themes";
import { SITE_CONFIG, absoluteUrl } from "@/app/lib/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND_NAME,
    short_name: BRAND_SHORT,
    description: SITE_CONFIG.description,
    start_url: absoluteUrl("/"),
    scope: absoluteUrl("/"),
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00A63E",
    lang: SITE_CONFIG.language,
    orientation: "portrait-primary",
    icons: [
      {
        src: absoluteUrl(LOGO_ICON),
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: absoluteUrl(LOGO_ICON),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
