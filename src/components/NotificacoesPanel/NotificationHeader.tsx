
import { Bell, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationHeaderProps {
  naoLidas: number;
  totalNotificacoes: number;
  onMarcarTodasLidas: () => void;
  onDeletarTodas?: () => void;
}

export function NotificationHeader({ naoLidas, totalNotificacoes, onMarcarTodasLidas, onDeletarTodas }: NotificationHeaderProps) {
  return (
    <div className="p-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">Notificações</h3>
        <Bell className="h-5 w-5 text-blue-300" />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-blue-100 text-sm">
          {naoLidas > 0 ? `${naoLidas} não lida(s) de ${totalNotificacoes}` : 'Todas as notificações lidas'}
        </p>
        <div className="flex items-center gap-2">
          {naoLidas > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onMarcarTodasLidas}
              className="text-white hover:bg-white/20 text-xs"
            >
              <Check className="h-3 w-3 mr-1" />
              Marcar todas
            </Button>
          )}
          {totalNotificacoes > 0 && onDeletarTodas && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDeletarTodas}
              className="text-red-300 hover:bg-red-500/20 text-xs hover:text-red-200"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Apagar todas
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
