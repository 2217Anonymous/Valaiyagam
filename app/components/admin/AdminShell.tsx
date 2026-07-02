"use client";

import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/app/components/admin/Sidebar";
import { AdminTopbar } from "@/app/components/admin/AdminTopbar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => {
      if (mq.matches) setSidebarOpen(false);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="flex h-screen bg-[#19272b] overflow-hidden text-foreground">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-label="Close sidebar"
          onClick={closeSidebar}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.08)_0%,transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[#243135] opacity-[0.03] pointer-events-none mix-blend-overlay" />

          <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto pb-32 min-h-full relative z-10 transition-all">
            {children}
          </div>
        </main>
      </div>

      <div className="fixed bottom-0 right-0 left-0 lg:left-72 bg-black/80 backdrop-blur-xl border-t border-primary/20 h-10 flex items-center px-4 sm:px-10 gap-4 sm:gap-8 z-50">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-widest">
            System Ready
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground uppercase opacity-50">
            Encrypted: AES-256
          </span>
        </div>
        <div className="ml-auto text-[10px] font-mono text-muted-foreground opacity-50 uppercase hidden sm:block">
          Session Active
        </div>
      </div>
    </div>
  );
}
