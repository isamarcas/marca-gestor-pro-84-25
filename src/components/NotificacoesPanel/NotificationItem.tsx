
import { Clock, Eye, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Notificacao } from '@/types';
import { tipoConfig, tipoLabels } from './notificationConfig';

interface NotificationItemProps {
  notificacao: Notificacao;
  onClick: (notificacao: Notificacao) => void;
  onDelete?: (notificacaoId: string) => void;
}

export function NotificationItem({ notificacao, onClick, onDelete }: NotificationItemProps) {
  const config = tipoConfig[notificacao.tipo];
  const IconComponent = config.icon;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(notificacao.id);
    }
  };

  const handleClick = () => {
    onClick(notificacao);
  };

  return (
    <div
      onClick={handleClick}
      className={`group p-4 rounded-xl border transition-all duration-300 hover:shadow-lg cursor-pointer ${
        !notificacao.lida 
          ? config.colors + ' shadow-md hover:shadow-lg transform hover:-translate-y-1' 
          : 'bg-white border-slate-200 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Ícone da notificação */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          !notificacao.lida 
            ? config.badgeColors 
            : 'bg-slate-100'
        }`}>
          <IconComponent className={`h-5 w-5 ${
            !notificacao.lida 
              ? 'text-white' 
              : 'text-slate-400'
          }`} />
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Header da notificação */}
          <div className="flex items-center gap-2 mb-2">
            <Badge className={`${config.badgeColors} text-xs font-medium px-2 py-1`}>
              {tipoLabels[notificacao.tipo]}
            </Badge>
            {!notificacao.lida && (
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            )}
          </div>
          
          {/* Conteúdo */}
          <h4 className={`font-semibold text-sm mb-2 line-clamp-2 ${
            !notificacao.lida ? 'text-slate-900' : 'text-slate-600'
          }`}>
            {notificacao.titulo}
          </h4>
          
          <p className={`text-sm mb-3 line-clamp-3 ${
            !notificacao.lida ? 'text-slate-700' : 'text-slate-500'
          }`}>
            {notificacao.mensagem}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              {format(notificacao.createdAt, 'dd/MM/yyyy HH:mm', { locale: ptBR })}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-400">Ver mais</span>
              </div>
              
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
