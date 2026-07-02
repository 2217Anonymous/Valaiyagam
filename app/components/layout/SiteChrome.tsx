"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "@/app/components/ui/NavBar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <NavBar />}
      <main id="main-content" className="flex-1">
        {children}
      </main>
    </>
  );
}
