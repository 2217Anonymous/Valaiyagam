"use client";

import { Menu } from "lucide-react";
import { LogoutButton } from "./LogoutButton";
import { BRAND_SHORT } from "@/app/lib/themes";

interface AdminTopbarProps {
  onMenuClick: () => void;
}

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  return (
    <header className="z-30 flex h-14 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 sm:h-16 sm:px-6 lg:hidden">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-primary transition-colors hover:bg-primary/10"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <span className="truncate text-sm font-bold tracking-tight text-slate-900">
          {BRAND_SHORT} Admin
        </span>
      </div>

      <LogoutButton className="p-2 text-red-500 transition-colors hover:text-red-600" />
    </header>
  );
}
