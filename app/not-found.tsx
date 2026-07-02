import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/app/lib/seo";
import { BRAND_NAME } from "@/app/lib/themes";

export const metadata: Metadata = createPageMetadata({
  title: "Page Not Found",
  description: `The page you requested could not be found on ${BRAND_NAME}.`,
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-primary font-mono text-sm uppercase tracking-widest mb-4">
        404
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for may have been moved or no longer exists.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="text-primary font-semibold hover:underline">
          Home
        </Link>
        <Link href="/services/" className="text-primary font-semibold hover:underline">
          Services
        </Link>
        <Link href="/careers/" className="text-primary font-semibold hover:underline">
          Careers
        </Link>
        <Link href="/teams/" className="text-primary font-semibold hover:underline">
          Team
        </Link>
      </div>
    </div>
  );
}
