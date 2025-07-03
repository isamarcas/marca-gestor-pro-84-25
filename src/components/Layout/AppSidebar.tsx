
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { AppSidebarHeader } from './AppSidebar/SidebarHeader';
import { NavigationMenu } from './AppSidebar/NavigationMenu';
import { AppSidebarFooter } from './AppSidebar/SidebarFooter';
import { useState, useEffect } from 'react';

export function AppSidebar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setIsDark(event.detail.isDark);
    };

    window.addEventListener('sidebar-theme-change', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebar-theme-change', handleThemeChange as EventListener);
    };
  }, []);

  return (
    <Sidebar 
      className="border-r-0"
      variant="sidebar"
      collapsible="offcanvas"
      side="left"
    >
      <div className={`h-full border-r shadow-sm transition-all duration-300 ${
        isDark 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-white border-gray-100'
      }`}>
        <SidebarHeader>
          <AppSidebarHeader />
        </SidebarHeader>
        
        <SidebarContent>
          <NavigationMenu isDark={isDark} />
        </SidebarContent>
        
        <SidebarFooter>
          <AppSidebarFooter isDark={isDark} />
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
