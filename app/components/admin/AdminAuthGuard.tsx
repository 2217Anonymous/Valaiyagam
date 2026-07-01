"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAdminAuthenticated } from "@/app/lib/client-actions/auth";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  return <>{children}</>;
}
