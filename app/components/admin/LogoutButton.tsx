"use client";

import { logout } from "@/app/lib/client-actions/auth";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  className?: string;
  label?: string;
}

export function LogoutButton({ className, label }: LogoutButtonProps) {
  return (
    <button type="button" onClick={logout} className={className}>
      <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      {label && <span className="font-bold text-sm">{label}</span>}
    </button>
  );
}
