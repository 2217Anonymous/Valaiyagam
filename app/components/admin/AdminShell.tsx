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
    <div className="flex h-screen overflow-hidden bg-white text-slate-800">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          aria-label="Close sidebar"
          onClick={closeSidebar}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="relative flex-1 overflow-y-auto custom-scrollbar bg-white">
          <div
            className="pointer-events-none absolute inset-0 hero-diagonal-primary opacity-40"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 hero-diagonal-secondary"
            aria-hidden
          />

          <div className="relative z-10 mx-auto min-h-full max-w-7xl p-4 pb-28 transition-all sm:p-6 lg:p-10">
            {children}
          </div>
        </main>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-10 items-center gap-4 border-t border-slate-100 bg-white px-4 sm:gap-8 sm:px-10 lg:left-72">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            System Ready
          </span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="text-[10px] uppercase text-slate-400">
            Valaiyagam Admin
          </span>
        </div>
        <div className="ml-auto hidden text-[10px] uppercase text-slate-400 sm:block">
          Session Active
        </div>
      </div>
    </div>
  );
}
