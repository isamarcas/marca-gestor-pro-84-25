
import { Bell } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Notificacao } from '@/types';
import { NotificationItem } from './NotificationItem';

interface NotificationsListProps {
  notificacoes: Notificacao[];
  onNotificacaoClick: (notificacao: Notificacao) => void;
  onDeleteNotificacao?: (notificacaoId: string) => void;
}

export function NotificationsList({ notificacoes, onNotificacaoClick, onDeleteNotificacao }: NotificationsListProps) {
  return (
    <ScrollArea className="h-96 bg-gradient-to-b from-slate-50 to-white">
      {notificacoes.length === 0 ? (
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="h-8 w-8 text-blue-500" />
          </div>
          <h4 className="font-semibold text-slate-700 mb-2">Nenhuma notificação</h4>
          <p className="text-slate-500 text-sm">Você está em dia! 🎉</p>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {notificacoes.map((notificacao) => (
            <NotificationItem
              key={notificacao.id}
              notificacao={notificacao}
              onClick={onNotificacaoClick}
              onDelete={onDeleteNotificacao}
            />
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
