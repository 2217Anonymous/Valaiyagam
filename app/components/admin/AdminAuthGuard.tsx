"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAdminAuthenticated } from "@/app/lib/client-actions/auth";
import { ADMIN_ROUTES } from "@/app/lib/paths";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace(ADMIN_ROUTES.login);
    }
  }, [pathname, router]);

  return <>{children}</>;
}
