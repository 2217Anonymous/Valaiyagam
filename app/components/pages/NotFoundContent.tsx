import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  Home,
  Mail,
  Users,
  Wrench,
} from "lucide-react";
import { Logo } from "@/app/components/ui/Logo";
import { BRAND_NAME, BRAND_TAGLINE } from "@/app/lib/themes";
import { SITE_CONFIG } from "@/app/lib/seo";

const exploreLinks = [
  {
    label: "Services",
    description: "Technology & digital marketing solutions",
    href: "/services",
    icon: Wrench,
  },
  {
    label: "Our Team",
    description: "Meet the people behind our work",
    href: "/teams",
    icon: Users,
  },
  {
    label: "Careers",
    description: "Join our growing team",
    href: "/careers",
    icon: Briefcase,
  },
  {
    label: "Contact",
    description: "Start a conversation with us",
    href: "/#contact",
    icon: Mail,
  },
] as const;

export function NotFoundContent() {
  return (
    <section className="relative min-h-[calc(100dvh-var(--header-height,4.5rem))] overflow-hidden bg-white text-foreground">
      <div
        className="absolute inset-0 hero-diagonal-primary pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 hero-diagonal-secondary pointer-events-none"
        aria-hidden
      />

      <p
        className="pointer-events-none absolute -bottom-8 right-0 select-none font-bold leading-none text-[clamp(8rem,28vw,18rem)] text-primary/[0.06]"
        aria-hidden
      >
        404
      </p>

      <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 md:px-8 lg:px-12 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-8 lg:mb-10">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-slate-300">
              /
            </li>
            <li>
              <span className="font-medium text-slate-800" aria-current="page">
                Page not found
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 xl:gap-20">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
              Error 404
            </div>

            <div className="space-y-4">
              <h1 className="heading-hero text-[#1f2937]">
                This page
                <br />
                <span className="hero-highlight">doesn&apos;t exist</span>
              </h1>
              <p className="max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                We couldn&apos;t find the URL you were looking for on{" "}
                {BRAND_NAME}. Try heading home or pick one of the destinations
                on the right.
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                {BRAND_TAGLINE}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/"
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border-0 px-8 text-base font-bold btn-primary-cta shadow-xl shadow-primary/25 transition-transform hover:scale-[1.02] sm:w-auto sm:px-10"
              >
                <Home className="h-5 w-5" aria-hidden />
                Back to Home
              </Link>
              <Link
                href="/#contact"
                className="group flex h-14 w-full items-center justify-center gap-4 rounded-full btn-secondary-cta px-4 sm:w-auto sm:justify-start"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-current transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-bold">Contact support</span>
              </Link>
            </div>

            <p className="text-sm text-slate-500">
              Questions?{" "}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="font-semibold text-primary hover:underline"
              >
                {SITE_CONFIG.email}
              </a>
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 hidden opacity-[0.05] lg:block" aria-hidden>
              <Logo variant="watermark" className="!w-48 !h-48" />
            </div>

            <div className="relative space-y-3">
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                Where to next
              </p>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {exploreLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white/80 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/10 sm:p-5"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1 pt-0.5">
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                              {link.label}
                            </span>
                            <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                          </span>
                          <span className="mt-1 block text-sm leading-snug text-slate-500">
                            {link.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
