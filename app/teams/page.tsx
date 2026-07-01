import { readJSON, FILES } from "@/app/lib/db";
import { Team, Employee } from "@/app/lib/types";
import { Users } from "lucide-react";

export default async function TeamsPage() {
  const teams = await readJSON<Team>(FILES.TEAMS);
  const employees = await readJSON<Employee>(FILES.EMPLOYEES);

  // Group employees by team or attach to team if we have real relationships.
  // For now, simpler: Just show employees as a single "Team" if no specific teams defined,
  // or logic to map them. Since no UI to create "Teams" yet, I will display "Our Leadership" & "The Crew" mock style if empty,
  // or just lists of employees as "Our Brilliant Minds".

  // Let's display all employees in a nice grid for now, categorized by Department if possible.

  const departments = employees.reduce((acc, emp) => {
    if (emp.status !== "Active") return acc;
    if (!acc[emp.department]) acc[emp.department] = [];
    acc[emp.department].push(emp);
    return acc;
  }, {} as Record<string, Employee[]>);

  return (
    <div className="pt-24 min-h-screen pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            Meet the Minds
          </h1>
          <p className="text-lg text-slate-400">
            The architects, engineers, and visionaries behind Valaiyagam
            Technologies.
          </p>
        </div>

        {Object.keys(departments).length === 0 ? (
          <div className="text-center py-20 px-6 glass-card rounded-3xl border border-dashed border-slate-700">
            <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-300">
              The team is growing.
            </h3>
            <p className="text-slate-500 mt-2">
              Check back soon to see our updated roster.
            </p>
          </div>
        ) : (
          Object.entries(departments).map(([dept, members]) => (
            <div key={dept} className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-white uppercase tracking-wider">
                  {dept}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map((member) => (
                  <div key={member.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-md opacity-25 group-hover:opacity-50 transition-opacity" />
                    <div className="relative glass-card p-6 rounded-2xl flex flex-col items-center text-center h-full hover:scale-[1.02] transition-transform duration-300">
                      <div className="w-24 h-24 mb-4 rounded-full bg-slate-800 border-2 border-indigo-500/30 flex items-center justify-center font-bold text-2xl text-indigo-300 overflow-hidden">
                        {/* Ensure we handle uploaded images correctly or fallback */}
                        {member.documents.find((d) =>
                          d.type.startsWith("image")
                        ) ? (
                          <img
                            src={
                              member.documents.find((d) =>
                                d.type.startsWith("image")
                              )?.url
                            }
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-indigo-400 text-sm font-medium mb-2">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
