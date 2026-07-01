import { Sidebar } from "@/app/components/admin/Sidebar";
import { AdminAuthGuard } from "@/app/components/admin/AdminAuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-[#19272b] overflow-hidden text-foreground">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.08)_0%,transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[#243135] opacity-[0.03] pointer-events-none mix-blend-overlay" />

          <div className="p-10 max-w-7xl mx-auto pb-32 min-h-full relative z-10 transition-all">
            {children}
          </div>
        </main>

        <div className="fixed bottom-0 right-0 left-72 bg-black/80 backdrop-blur-xl border-t border-primary/20 h-10 flex items-center px-10 gap-8 z-50">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-widest">
              System Ready
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase opacity-50">
              Encrypted: AES-256
            </span>
          </div>
          <div className="ml-auto text-[10px] font-mono text-muted-foreground opacity-50 uppercase">
            Session Active
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
