import type { Metadata } from "next";
import { NotFoundContent } from "@/app/components/pages/NotFoundContent";
import { createPageMetadata } from "@/app/lib/seo";
import { BRAND_NAME } from "@/app/lib/themes";

export const metadata: Metadata = createPageMetadata({
  title: "404 — Page Not Found",
  description: `The page you requested could not be found on ${BRAND_NAME}. Return home or explore our services, team, and careers.`,
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return <NotFoundContent />;
}
