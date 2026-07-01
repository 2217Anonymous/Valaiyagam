"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Network,
  Search,
  Filter,
  Users,
  Edit3,
  Settings,
  MoreVertical,
  Activity,
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/app/lib/utils";

interface ProjectTeam {
  id: string;
  name: string;
  count: number;
  lead: string;
  status: "ACTIVE" | "ON_HOLD" | "PLANNING";
  performance: number;
}

const mockTeams: ProjectTeam[] = [
  {
    id: "1",
    name: "Core Infrastructure",
    count: 8,
    lead: "Sarah Chen",
    status: "ACTIVE",
    performance: 98,
  },
  {
    id: "2",
    name: "User Experience",
    count: 5,
    lead: "James Wilson",
    status: "ACTIVE",
    performance: 92,
  },
  {
    id: "3",
    name: "IoT Integration",
    count: 12,
    lead: "Maria Garcia",
    status: "ON_HOLD",
    performance: 85,
  },
];

export default function TeamsAdmin() {
  const [teams, setTeams] = useState<ProjectTeam[]>(mockTeams);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-mono">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Network className="w-4 h-4" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              Resource Management
            </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            PROJECT_UNITS
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">
            Configure and monitor development squads.
          </p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="rounded-lg px-8 py-6 bg-primary text-black font-black hover:scale-[1.05] transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)]"
        >
          <Plus className="w-5 h-5 mr-2" />
          GENERATE_SQUAD
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Summary */}
        <div className="glass-card p-6 rounded-xl border-primary/20 bg-primary/5">
          <p className="text-[10px] text-muted-foreground uppercase mb-1">
            Total_Manpower
          </p>
          <p className="text-3xl font-black text-white">
            25 <span className="text-primary text-sm">Units</span>
          </p>
          <div className="h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[75%]" />
          </div>
        </div>
        <div className="glass-card p-6 rounded-xl border-primary/20 bg-primary/5">
          <p className="text-[10px] text-muted-foreground uppercase mb-1">
            Squad_Efficiency
          </p>
          <p className="text-3xl font-black text-white">
            91.4<span className="text-primary text-sm">%</span>
          </p>
          <div className="h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[91%]" />
          </div>
        </div>
        <div className="glass-card p-6 rounded-xl border-primary/20 bg-primary/5">
          <p className="text-[10px] text-muted-foreground uppercase mb-1">
            Operational_Units
          </p>
          <p className="text-3xl font-black text-white">
            03 <span className="text-primary text-sm">Active</span>
          </p>
          <div className="h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[100%]" />
          </div>
        </div>
      </div>

      <div className="glass-card border-primary/20 rounded-xl overflow-hidden bg-black/40">
        <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-primary/5">
          <div className="flex items-center gap-4">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">
              Active_Tactical_Units
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 border border-primary/20"
            >
              <Search className="w-3 h-3 text-primary" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 border border-primary/20"
            >
              <Filter className="w-3 h-3 text-primary" />
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/60 border-b border-primary/20">
              <tr>
                <th className="px-8 py-5 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                  Squad_ID
                </th>
                <th className="px-8 py-5 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                  Unit_Name
                </th>
                <th className="px-8 py-5 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                  Commander
                </th>
                <th className="px-8 py-5 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                  Personnel
                </th>
                <th className="px-8 py-5 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                  Status
                </th>
                <th className="px-8 py-5 text-[10px] font-bold text-primary uppercase tracking-[0.2em] text-right">
                  Ops
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              <AnimatePresence>
                {teams.map((team) => (
                  <motion.tr
                    key={team.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-primary/5 transition-colors group cursor-crosshair"
                  >
                    <td className="px-8 py-5 font-bold text-xs text-muted-foreground">
                      #UNIT-0{team.id}
                    </td>
                    <td className="px-8 py-5 font-black text-white text-sm">
                      {team.name}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-[10px] text-primary">
                          {team.lead.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">
                          {team.lead}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-white">
                        {team.count}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={cn(
                          "px-3 py-1 rounded text-[10px] font-black border",
                          team.status === "ACTIVE"
                            ? "bg-primary/10 text-primary border-primary/30"
                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
                        )}
                      >
                        {team.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-primary/20 rounded border border-transparent hover:border-primary/30 transition-all">
                          <Edit3 className="w-4 h-4 text-primary" />
                        </button>
                        <button className="p-2 hover:bg-red-500/20 rounded border border-transparent hover:border-red-500/30 transition-all">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
