"use client";

import { Menu } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { LogoutButton } from "./LogoutButton";
import { BRAND_SHORT } from "@/app/lib/themes";

interface AdminTopbarProps {
  onMenuClick: () => void;
}

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  return (
    <header className="h-14 sm:h-16 bg-[#19272b] border-b border-primary/20 flex items-center justify-between px-4 sm:px-6 shrink-0 z-30 lg:hidden">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-sm font-black text-white tracking-tighter truncate">
          {BRAND_SHORT.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LogoutButton className="p-2 text-red-400 hover:text-red-500 transition-colors" />
      </div>
    </header>
  );
}
