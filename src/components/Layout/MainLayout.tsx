
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset style={{ backgroundColor: '#f9fafb' }} className="flex-1 w-full">
          {/* Header com trigger do sidebar sempre visível */}
          <header className="flex h-14 items-center gap-2 px-4 lg:h-[60px] lg:px-6 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 relative z-40">
            <SidebarTrigger />
            <div className="flex-1">
              <Header />
            </div>
          </header>
          
          <main className="flex-1 overflow-auto w-full">
            <div className="w-full">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
