
import { CheckCircle, Sparkles } from 'lucide-react';
import { SidebarFooter } from '@/components/ui/sidebar';

interface AppSidebarFooterProps {
  isDark: boolean;
}

export function AppSidebarFooter({ isDark }: AppSidebarFooterProps) {
  return (
    <SidebarFooter className={`border-t transition-all duration-300 ${
      isDark 
        ? 'border-gray-700 bg-gray-900' 
        : 'border-gray-100 bg-white'
    }`}>
      <div className="flex items-center gap-3 px-6 py-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 shadow-sm">
          <CheckCircle className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className={`text-sm font-semibold transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Sistema Online
          </div>
          <div className="text-xs text-green-600">Conectado com segurança</div>
        </div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      
      {/* Premium badge */}
      <div className={`mx-6 mb-4 px-4 py-3 rounded-xl border transition-all duration-300 ${
        isDark 
          ? 'bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-700/50'
          : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
      }`}>
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className={`h-4 w-4 transition-colors duration-300 ${
            isDark ? 'text-amber-400' : 'text-amber-500'
          }`} />
          <span className={`font-semibold transition-colors duration-300 ${
            isDark ? 'text-amber-300' : 'text-amber-700'
          }`}>
            Versão Premium
          </span>
        </div>
      </div>
    </SidebarFooter>
  );
}
