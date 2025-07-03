
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Notificacao } from '@/types';
import { tipoConfig, tipoLabels } from './notificationConfig';

interface NotificationModalProps {
  notificacao: Notificacao | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationModal({ notificacao, open, onOpenChange }: NotificationModalProps) {
  if (!notificacao) return null;

  const config = tipoConfig[notificacao.tipo];
  const IconComponent = config.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.badgeColors}`}>
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <Badge className={`${config.badgeColors} text-xs font-medium px-2 py-1 mb-1`}>
                {tipoLabels[notificacao.tipo]}
              </Badge>
              <DialogTitle className="text-xl font-bold text-slate-900">
                {notificacao.titulo}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <DialogDescription className="text-base text-slate-700 leading-relaxed whitespace-pre-wrap">
            {notificacao.mensagem}
          </DialogDescription>
          
          <div className="flex items-center gap-2 text-sm text-slate-500 pt-4 border-t border-slate-200">
            <Clock className="h-4 w-4" />
            <span>
              {format(notificacao.createdAt, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
            </span>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
