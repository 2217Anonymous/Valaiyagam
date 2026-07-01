"use client";

import { User, Sun, Moon, RefreshCw, Grid } from "lucide-react";
import { LogoutButton } from "./LogoutButton";
import { Button } from "../ui/Button";

export function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Left side empty or breadcrumbs if needed */}
      </div>

      <div className="flex items-center gap-6">
        {/* User Sync Widget */}
        <div className="hidden md:flex items-center gap-3 bg-primary/10 px-4 py-1.5 rounded-md border border-primary/20">
          <RefreshCw className="w-4 h-4 text-primary animate-spin-slow" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-primary">User Sync</span>
            <span className="text-[10px] text-primary/80">3 hours ago</span>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3 text-slate-400">
          <button className="hover:text-slate-600 transition-colors">
            <User className="w-5 h-5" />
          </button>
          <button className="hover:text-slate-600 transition-colors">
            <Sun className="w-5 h-5" />
          </button>
          <button className="hover:text-slate-600 transition-colors">
            <Grid className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex flex-col text-right mr-2">
          <span className="text-sm font-bold text-slate-700">
            Venkateshwaran
          </span>
          <span className="text-xs text-slate-500">
            venkateshwaran@valaiyagam.com
          </span>
        </div>

        {/* Logout */}
        <LogoutButton
          className="text-slate-400 hover:text-red-500 transition-colors"
        />
      </div>
    </header>
  );
}
