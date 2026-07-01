"use client";

import { v4 as uuidv4 } from "uuid";
import type { Job } from "@/app/lib/types";

const STORAGE_KEY = "vantage_static_jobs";

function readJobs(): Job[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function writeJobs(jobs: Job[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function mergeJobs(initial: Job[]): Job[] {
  const stored = readJobs();
  if (stored.length === 0) return initial;
  const ids = new Set(stored.map((j) => j.id));
  return [...stored, ...initial.filter((j) => !ids.has(j.id))];
}

export async function createJob(
  _prevState: { error?: string } | null,
  formData: FormData,
) {
  try {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    const department = formData.get("department") as string;
    const location = formData.get("location") as string;
    const type = formData.get("type") as Job["type"];
    const description = formData.get("description") as string;
    const requirementsRaw = formData.get("requirements") as string;
    const requirements = requirementsRaw
      .split("\n")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const jobs = readJobs();
    jobs.push({
      id: uuidv4(),
      code,
      title,
      department,
      location,
      type,
      description,
      requirements,
      postedDate: new Date().toISOString(),
      status: "Open",
    });
    writeJobs(jobs);
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/admin/jobs`;
    return null;
  } catch {
    return { error: "Failed to create job" };
  }
}

export function deleteJob(id: string, initial: Job[]) {
  const jobs = mergeJobs(initial).filter((j) => j.id !== id);
  writeJobs(jobs);
  return jobs;
}

export function toggleJobStatus(id: string, initial: Job[]) {
  const jobs = mergeJobs(initial).map((job) =>
    job.id === id
      ? { ...job, status: job.status === "Open" ? "Closed" : "Open" }
      : job,
  ) as Job[];
  writeJobs(jobs);
  return jobs;
}
