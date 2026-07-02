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
  Shield,
  Terminal,
  Activity,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { LogoutButton } from "./LogoutButton";
import { motion } from "framer-motion";
import { ThemeToggle } from "../ThemeToggle";
import { Logo } from "../ui/Logo";
import { BRAND_SHORT } from "@/app/lib/themes";

const menuItems = [
  { href: "/admin/dashboard", label: "Control Center", icon: LayoutDashboard },
  { href: "/admin/employees", label: "Resource Pool", icon: Users },
  { href: "/admin/teams", label: "Project Units", icon: Network },
  { href: "/admin/jobs", label: "Talent Pipeline", icon: Briefcase },
  { href: "/admin/gallery", label: "Asset Library", icon: ImageIcon },
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
        "w-72 bg-[#19272b] border-r border-primary/20 flex flex-col h-full shrink-0 transition-transform duration-300 font-mono z-50",
        "fixed inset-y-0 left-0 lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      {/* Brand Section */}
      <div className="h-24 flex items-center px-8 border-b border-primary/10 bg-[#243135]">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <Logo className="h-10 w-10" />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-black text-white leading-none tracking-tighter truncate">
              {BRAND_SHORT.toUpperCase()}
            </span>
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
              Solution
            </span>
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
              Sys_Admin v4.0
            </span>
          </div>
        </Link>
      </div>

      {/* Connection Status */}
      <div className="px-8 py-4 flex items-center gap-3 bg-primary/5 border-b border-primary/10">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
        <span className="text-[10px] text-blue-300 font-bold uppercase tracking-tighter">
          Uplink: STABLE
        </span>
        <Activity className="w-3 h-3 text-primary ml-auto opacity-50" />
      </div>

      <nav className="flex-1 p-6 space-y-3 overflow-y-auto custom-scrollbar">
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
                "flex items-center gap-4 px-5 py-3.5 rounded-lg transition-all duration-300 group relative overflow-hidden group border",
                isActive
                  ? "bg-primary text-black border-primary shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                  : "text-muted-foreground border-transparent hover:border-primary/30 hover:bg-primary/5",
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive
                    ? "text-black"
                    : "text-primary/70 group-hover:scale-110",
                )}
              />
              <span className="font-bold text-sm tracking-tight">
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="admin-sidebar"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-white"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto text-black" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-6 border-t border-primary/20 space-y-4 bg-primary/5">
        <div className="flex items-center justify-between px-2 bg-black/40 p-2 rounded-lg border border-primary/10">
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-primary" />
            <span className="text-[10px] text-muted-foreground uppercase">
              Protocols
            </span>
          </div>
          <ThemeToggle />
        </div>

        <LogoutButton
          className="flex items-center gap-3 px-5 py-3.5 w-full rounded-lg text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/30 group"
          label="TERMINATE_SESSION"
        />
      </div>
    </aside>
  );
}
