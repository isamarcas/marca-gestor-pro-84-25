
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationIconProps {
  naoLidas: number;
  onClick: () => void;
}

export function NotificationIcon({ naoLidas, onClick }: NotificationIconProps) {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="relative hover:bg-white/80 hover:scale-105 transition-all duration-200 rounded-xl p-3 group"
      onClick={onClick}
    >
      <Bell className="h-5 w-5 text-slate-700 group-hover:text-blue-600 transition-colors" />
      {naoLidas > 0 && (
        <div className="absolute -top-1 -right-1 flex items-center justify-center">
          <div className="h-6 w-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <span className="text-white text-xs font-bold">
              {naoLidas > 9 ? '9+' : naoLidas}
            </span>
          </div>
        </div>
      )}
    </Button>
  );
}
