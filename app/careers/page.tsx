import { readJSON, FILES } from "@/app/lib/db";
import { Job } from "@/app/lib/types";
import { Button } from "@/app/components/ui/Button";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function CareersPage() {
  const jobs = await readJSON<Job>(FILES.JOBS);
  const openJobs = jobs.filter((j) => j.status === "Open");

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4 sm:mb-6">
            Join the Revolution
          </h1>
          <p className="text-base sm:text-lg text-slate-400">
            We are looking for brilliant minds to help us build the future.
            Remote-friendly culture, top-tier compensation, and challenging
            problems.
          </p>
        </div>

        {openJobs.length === 0 ? (
          <div className="text-center py-24 glass-card rounded-3xl border border-dashed border-slate-700">
            <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-300">
              No open positions right now.
            </h3>
            <p className="text-slate-500 mt-2">
              But we're always hiring great talent. Email us your resume.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {openJobs.map((job) => (
              <div
                key={job.id}
                className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 transition-colors group"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {job.title}
                    </h2>
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                      {job.code}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      {job.department}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      {job.type}
                    </div>
                  </div>
                </div>

                <Link href={`/careers/${job.code}`}>
                  <Button className="rounded-full px-8 btn-primary-cta border-0 shadow-lg shadow-primary/20 group-hover:scale-105 transition-all">
                    Apply Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
