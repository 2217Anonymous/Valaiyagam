import { readJSON, FILES } from "@/app/lib/db";
import { Job } from "@/app/lib/types";
import { JobsList } from "@/app/components/admin/JobsList";

export default async function JobsAdminPage() {
  const jobs = await readJSON<Job>(FILES.JOBS);
  return <JobsList initialJobs={jobs} />;
}
