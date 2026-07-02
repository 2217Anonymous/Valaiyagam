import { AdminAuthGuard } from "@/app/components/admin/AdminAuthGuard";
import { AdminShell } from "@/app/components/admin/AdminShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <AdminShell>{children}</AdminShell>
    </AdminAuthGuard>
  );
}
