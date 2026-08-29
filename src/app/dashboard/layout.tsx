import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import FloatingActionButton from "@/components/FloatingActionButton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#030303] text-foreground relative overflow-hidden">
      {/* Premium Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-mint/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-violet/5 blur-[150px] rounded-full pointer-events-none" />
      
      <Sidebar />
      <div className="flex-1 min-w-0 relative z-10 flex flex-col h-screen overflow-y-auto">
        <Topbar />
        <main className="mx-auto max-w-7xl w-full px-6 py-10 flex-1">{children}</main>
      </div>
      <FloatingActionButton />
    </div>
  );
}
