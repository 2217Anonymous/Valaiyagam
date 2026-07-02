"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Network,
  Image as ImageIcon,
  ChevronRight,
  Activity,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { LogoutButton } from "./LogoutButton";
import { Logo } from "../ui/Logo";
import { BRAND_SHORT, BRAND_TAGLINE } from "@/app/lib/themes";

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/employees", label: "Employees", icon: Users },
  { href: "/admin/teams", label: "Teams", icon: Network },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "z-50 flex h-full w-72 shrink-0 flex-col border-r border-slate-100 bg-white transition-transform duration-300",
        "fixed inset-y-0 left-0 lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      <div className="flex h-24 items-center border-b border-slate-100 px-5">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0" />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate text-sm font-bold leading-none text-slate-900">
              {BRAND_SHORT}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              Admin Portal
            </span>
            <span className="truncate text-[10px] text-slate-400">
              {BRAND_TAGLINE}
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3">
        <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-primary" />
        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
          Connected
        </span>
        <Activity className="ml-auto h-3 w-3 shrink-0 text-primary opacity-60" />
      </div>

      <nav className="custom-scrollbar flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin/dashboard" &&
              pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "admin-nav-link",
                isActive && "admin-nav-link-active",
              )}
            >
              <span
                className={cn(
                  "admin-nav-icon",
                  !isActive && "bg-primary/10 text-primary",
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="flex-1 text-sm font-medium leading-none">
                {item.label}
              </span>
              {isActive && (
                <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-white/90" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-3">
        <LogoutButton
          className="flex w-full min-h-[44px] items-center gap-3 rounded-xl px-3 py-2.5 text-red-500 transition-colors hover:bg-red-50"
          label="Sign out"
        />
      </div>
    </aside>
  );
}
