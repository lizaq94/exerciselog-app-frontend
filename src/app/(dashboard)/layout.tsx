import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarRail } from '@/app/(dashboard)/_components/sidebar-rail';
import { TopBar } from '@/app/(dashboard)/_components/top-bar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <div className="grid h-full max-h-screen w-full grid-cols-1 lg:grid-cols-[auto_1fr]">
        <SidebarRail />
        <div className="flex h-full w-full min-w-0 flex-col">
          <TopBar />
          <div className="md:p-5">{children}</div>
        </div>
      </div>
    </TooltipProvider>
  );
}
