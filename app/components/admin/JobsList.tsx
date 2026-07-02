"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { Plus, Briefcase, MapPin, Trash, EyeOff, Eye } from "lucide-react";
import type { Job } from "@/app/lib/types";
import {
  deleteJob,
  mergeJobs,
  toggleJobStatus,
} from "@/app/lib/client-actions/jobs";

export function JobsList({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState(() => mergeJobs(initialJobs));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="admin-page-title">Jobs & Careers</h1>
        <Link href="/admin/jobs/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {jobs.length === 0 ? (
          <div className="admin-card p-12 text-center">
            <p className="text-slate-500">No jobs posted yet.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="admin-card p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{job.title}</h3>
                  <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">
                    {job.code}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${
                      job.status === "Open"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> {job.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {job.location}
                  </span>
                  <span>{job.type}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  title="Toggle Status"
                  onClick={() =>
                    setJobs(toggleJobStatus(job.id, initialJobs))
                  }
                >
                  {job.status === "Open" ? (
                    <Eye className="w-4 h-4 text-primary" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-slate-500" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                  onClick={() => setJobs(deleteJob(job.id, initialJobs))}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
