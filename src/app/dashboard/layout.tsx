import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import FloatingActionButton from "@/components/FloatingActionButton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar />
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </div>
      <FloatingActionButton />
    </div>
  );
}
