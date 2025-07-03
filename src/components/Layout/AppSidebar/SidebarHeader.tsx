
import { Shield, Sparkles, Moon, Sun } from 'lucide-react';
import { SidebarHeader } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function AppSidebarHeader() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('sidebar-theme-change', { 
      detail: { isDark: !isDark } 
    }));
  };

  return (
    <SidebarHeader className={`border-b transition-all duration-300 ${
      isDark 
        ? 'border-gray-700 bg-gray-900' 
        : 'border-gray-100 bg-white'
    }`}>
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </div>
          <div className="grid flex-1 text-left">
            <span className={`font-bold text-xl transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              CRM INPI
            </span>
            <span className={`text-sm font-medium transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Sistema Premium de Marcas
            </span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className={`h-8 w-8 p-0 rounded-lg transition-all duration-300 ${
            isDark 
              ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
        >
          {isDark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </SidebarHeader>
  );
}
