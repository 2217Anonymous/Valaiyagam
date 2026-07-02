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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col justify-between items-start sm:items-end gap-4 sm:flex-row">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Network className="w-4 h-4" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              Team Management
            </span>
          </div>
          <h1 className="admin-page-title">Project Teams</h1>
          <p className="text-sm text-slate-500">
            Configure and monitor development squads.
          </p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="rounded-full px-8 py-6 btn-primary-cta border-0 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Team
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="admin-stat-card">
          <p className="text-[10px] uppercase text-slate-500 mb-1">
            Total Manpower
          </p>
          <p className="text-3xl font-bold text-slate-900">
            25 <span className="text-primary text-sm">Units</span>
          </p>
          <div className="h-1 bg-slate-200 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[75%]" />
          </div>
        </div>
        <div className="admin-stat-card">
          <p className="text-[10px] uppercase text-slate-500 mb-1">
            Squad Efficiency
          </p>
          <p className="text-3xl font-bold text-slate-900">
            91.4<span className="text-primary text-sm">%</span>
          </p>
          <div className="h-1 bg-slate-200 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[91%]" />
          </div>
        </div>
        <div className="admin-stat-card">
          <p className="text-[10px] uppercase text-slate-500 mb-1">
            Operational Units
          </p>
          <p className="text-3xl font-bold text-slate-900">
            03 <span className="text-primary text-sm">Active</span>
          </p>
          <div className="h-1 bg-slate-200 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[100%]" />
          </div>
        </div>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <div className="flex items-center gap-3">
            <Activity className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
              Active Teams
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 border border-slate-100 p-0"
            >
              <Search className="h-3 w-3 text-slate-400" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 border border-slate-100 p-0"
            >
              <Filter className="h-3 w-3 text-slate-400" />
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto bg-white">
          <table className="w-full min-w-[720px] border-collapse bg-white text-left">
            <thead className="admin-table-head">
              <tr>
                <th className="admin-table-th">Squad ID</th>
                <th className="admin-table-th">Team Name</th>
                <th className="admin-table-th">Lead</th>
                <th className="admin-table-th">Members</th>
                <th className="admin-table-th">Status</th>
                <th className="admin-table-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <AnimatePresence>
                {teams.map((team) => (
                  <motion.tr
                    key={team.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="admin-table-row group"
                  >
                    <td className="admin-table-td text-xs font-medium text-slate-500">
                      #UNIT-0{team.id}
                    </td>
                    <td className="admin-table-td font-semibold text-slate-900">
                      {team.name}
                    </td>
                    <td className="admin-table-td">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {team.lead.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-600">
                          {team.lead}
                        </span>
                      </div>
                    </td>
                    <td className="admin-table-td font-semibold text-slate-900">
                      {team.count}
                    </td>
                    <td className="admin-table-td">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase",
                          team.status === "ACTIVE"
                            ? "bg-primary/10 text-primary"
                            : "bg-amber-50 text-amber-700",
                        )}
                      >
                        {team.status}
                      </span>
                    </td>
                    <td className="admin-table-td text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          className="rounded-lg p-2 transition-colors hover:bg-slate-50"
                        >
                          <Edit3 className="h-4 w-4 text-slate-500" />
                        </button>
                        <button
                          type="button"
                          className="rounded-lg p-2 transition-colors hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
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
