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
      color: "from-blue-500 to-indigo-500",
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
      color: "from-violet-500 to-purple-500",
    },
    {
      label: "Total Applications",
      value: 124,
      icon: Activity,
      trend: "+24%",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back to the command center.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="glass-card p-6 rounded-2xl relative overflow-hidden group bg-card border border-border"
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
                <div className="text-muted-foreground font-medium text-sm">
                  {stat.label}
                </div>
                <div className="text-3xl font-bold text-foreground mt-1">
                  {stat.value}
                </div>
                <div className="text-xs text-primary mt-2 flex items-center gap-1 bg-primary/10 w-fit px-2 py-1 rounded-full">
                  {stat.trend}{" "}
                  <span className="text-muted-foreground ml-1">
                    since last month
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-8 rounded-2xl bg-card border border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">
              System Status: Optimal
            </h3>
            <p className="text-muted-foreground">
              All services are running smoothly. JSON Database is active.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
