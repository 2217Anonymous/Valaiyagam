import type { Metadata } from "next";
import { readJSON, FILES } from "@/app/lib/db";
import { Job } from "@/app/lib/types";
import { notFound } from "next/navigation";
import { ApplyForm } from "./ApplyForm";
import { Briefcase, MapPin, Clock, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import {
  createPageMetadata,
  jobPostingJsonLd,
  SITE_CONFIG,
} from "@/app/lib/seo";
import { JsonLd } from "@/app/components/seo/JsonLd";
import { Breadcrumbs } from "@/app/components/seo/Breadcrumbs";

interface PageProps {
  params: Promise<{ code: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const jobs = await readJSON<Job>(FILES.JOBS);
  return jobs.map((job) => ({ code: job.code }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code } = await params;
  const jobs = await readJSON<Job>(FILES.JOBS);
  const job = jobs.find((j) => j.code === code);

  if (!job) {
    return createPageMetadata({
      title: "Job Not Found",
      description: "This job posting could not be found.",
      path: `/careers/${code}`,
      noIndex: true,
    });
  }

  if (job.status !== "Open") {
    return createPageMetadata({
      title: `${job.title} — Position Closed`,
      description: `This ${job.title} role at ${SITE_CONFIG.name} is no longer accepting applications.`,
      path: `/careers/${job.code}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${job.title} — ${job.location}`,
    description: job.description.slice(0, 155),
    path: `/careers/${job.code}`,
    keywords: [job.title, job.department, job.location, "jobs", "careers"],
  });
}

export default async function JobDetailsPage({ params }: PageProps) {
  const { code } = await params;
  const jobs = await readJSON<Job>(FILES.JOBS);
  const job = jobs.find((j) => j.code === code);

  if (!job) {
    notFound();
  }

  const isOpen = job.status === "Open";

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 min-h-screen">
      {isOpen && <JsonLd data={jobPostingJsonLd(job)} />}
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Careers", href: "/careers/" },
            { label: job.title },
          ]}
        />
        <Link href="/careers/" className="inline-block mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 pl-0 hover:pl-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Button>
        </Link>

        {!isOpen && (
          <div className="glass-card rounded-2xl p-8 mb-8 border border-amber-500/30 bg-amber-500/5">
            <h1 className="text-2xl font-bold text-white mb-2">
              This position is closed
            </h1>
            <p className="text-slate-400">
              {job.title} ({job.code}) is no longer accepting applications.
              Browse{" "}
              <Link href="/careers/" className="text-primary hover:underline">
                current openings
              </Link>{" "}
              or email{" "}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-primary hover:underline"
              >
                {SITE_CONFIG.email}
              </a>
              .
            </p>
          </div>
        )}

        <article className="glass-card rounded-3xl overflow-hidden mb-12">
          <header className="p-6 sm:p-8 lg:p-10 border-b border-slate-800/50 bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    {job.department}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    {job.type}
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 font-mono text-primary">
                {job.code}
              </div>
            </div>
          </header>

          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">
                About the Role
              </h2>
              <div className="prose prose-invert prose-slate max-w-none text-slate-300">
                <p>{job.description}</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements?.map((req, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>

        {isOpen && (
          <section className="glass-card p-6 sm:p-8 lg:p-10 rounded-3xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">
                Apply for this position
              </h2>
              <p className="text-slate-400 mt-2">
                Submit your application below.
              </p>
            </div>

            <ApplyForm jobId={job.id} jobCode={job.code} />
          </section>
        )}
      </div>
    </div>
  );
}
