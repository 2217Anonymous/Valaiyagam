"use client";

import { createJob } from "@/app/lib/client-actions/jobs";
import { Button } from "@/app/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

export default function NewJobPage() {
  const [state, action, isPending] = useActionState(createJob, null);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/jobs">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="admin-page-title">Post New Job</h1>
      </div>

      <div className="admin-card p-8">
        <form action={action} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="admin-label">
                Job Title
              </label>
              <input
                name="title"
                required
                className="admin-input"
                placeholder="e.g. Senior Frontend Engineer"
              />
            </div>

            <div className="space-y-2">
              <label className="admin-label">
                Job Code
              </label>
              <input
                name="code"
                required
                className="admin-input"
                placeholder="e.g. ENG-01"
              />
            </div>

            <div className="space-y-2">
              <label className="admin-label">
                Department
              </label>
              <input
                name="department"
                required
                className="admin-input"
                placeholder="e.g. Engineering"
              />
            </div>

            <div className="space-y-2">
              <label className="admin-label">
                Location
              </label>
              <input
                name="location"
                required
                className="admin-input"
                placeholder="e.g. Remote / New York"
              />
            </div>

            <div className="space-y-2">
              <label className="admin-label">Type</label>
              <select
                name="type"
                className="admin-input appearance-none"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="admin-label">
              Job Description
            </label>
            <textarea
              name="description"
              required
              rows={4}
              className="admin-input min-h-[120px] resize-y"
              placeholder="Describe the role..."
            />
          </div>

          <div className="space-y-2">
            <label className="admin-label">
              Requirements (One per line)
            </label>
            <textarea
              name="requirements"
              required
              rows={4}
              className="admin-input min-h-[120px] resize-y"
              placeholder="- 5+ years of React experience&#10;- Knowledge of Next.js"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Posting..." : "Create Job Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
