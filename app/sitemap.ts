import type { MetadataRoute } from "next";
import { readJSON, FILES } from "@/app/lib/db";
import type { Job } from "@/app/lib/types";
import { absoluteUrl, PUBLIC_ROUTES } from "@/app/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobs = await readJSON<Job>(FILES.JOBS);
  const openJobs = jobs.filter((job) => job.status === "Open");

  const staticEntries: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const jobEntries: MetadataRoute.Sitemap = openJobs.map((job) => ({
    url: absoluteUrl(`/careers/${job.code}`),
    lastModified: job.postedDate ? new Date(job.postedDate) : new Date(),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticEntries, ...jobEntries];
}

export const dynamic = "force-static";
