import { readJSON, FILES } from "@/app/lib/db";
import { Employee, Job, Team } from "@/app/lib/types";
import { Users, Briefcase, Network, Activity } from "lucide-react";

export default async function DashboardPage() {
  const employees = await readJSON<Employee>(FILES.EMPLOYEES);
  const jobs = await readJSON<Job>(FILES.JOBS);
  const teams = await readJSON<Team>(FILES.TEAMS);

  const stats = [
    {
      label: "Total Employees",
      value: employees.length,
      icon: Users,
      trend: "+12%",
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Open Positions",
      value: jobs.filter((j) => j.status === "Open").length,
      icon: Briefcase,
      trend: "+4",
      color: "from-[var(--primary-color)] to-[var(--secondary-color)]",
    },
    {
      label: "Active Teams",
      value: teams.length,
      icon: Network,
      trend: "Stable",
      color: "from-emerald-500 to-green-600",
    },
    {
      label: "Total Applications",
      value: 124,
      icon: Activity,
      trend: "+24%",
      color: "from-lime-500 to-primary",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="mt-2 text-slate-500">
          Welcome back to the command center.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="admin-stat-card group relative overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${stat.color} rounded-bl-3xl`}
              >
                <Icon className="w-16 h-16 text-foreground" />
              </div>

              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-medium text-slate-500">
                  {stat.label}
                </div>
                <div className="mt-1 text-3xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <div className="mt-2 flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                  {stat.trend}{" "}
                  <span className="ml-1 text-slate-400">
                    since last month
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="admin-card p-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">
              System Status: Optimal
            </h3>
            <p className="text-slate-500">
              All services are running smoothly. JSON Database is active.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
