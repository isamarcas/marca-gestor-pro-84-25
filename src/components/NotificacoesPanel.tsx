
import { useState } from 'react';
import { Bell, Check, X, Archive, Eye, Clock, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotificacoes } from '@/hooks/useNotificacoes';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Notificacao } from '@/types';

interface NotificacoesPanelProps {
  clienteId?: string;
}

const tipoConfig = {
  info: {
    icon: Info,
    colors: 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-800',
    badgeColors: 'bg-blue-500 text-white',
    iconColors: 'text-blue-600',
  },
  warning: {
    icon: AlertTriangle,
    colors: 'bg-gradient-to-r from-amber-50 to-yellow-100 border-amber-200 text-amber-800',
    badgeColors: 'bg-amber-500 text-white',
    iconColors: 'text-amber-600',
  },
  success: {
    icon: CheckCircle,
    colors: 'bg-gradient-to-r from-emerald-50 to-green-100 border-emerald-200 text-emerald-800',
    badgeColors: 'bg-emerald-500 text-white',
    iconColors: 'text-emerald-600',
  },
  error: {
    icon: AlertCircle,
    colors: 'bg-gradient-to-r from-red-50 to-rose-100 border-red-200 text-red-800',
    badgeColors: 'bg-red-500 text-white',
    iconColors: 'text-red-600',
  },
};

const tipoLabels = {
  info: 'Informação',
  warning: 'Atenção',
  success: 'Sucesso',
  error: 'Urgente',
};

export function NotificacoesPanel({ clienteId }: NotificacoesPanelProps) {
  const { notificacoes, naoLidas, marcarComoLida } = useNotificacoes(clienteId);
  const [open, setOpen] = useState(false);
  const [selectedNotificacao, setSelectedNotificacao] = useState<Notificacao | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMarcarTodasLidas = () => {
    notificacoes.filter(n => !n.lida).forEach(n => marcarComoLida(n.id));
  };

  const handleNotificacaoClick = (notificacao: Notificacao) => {
    setSelectedNotificacao(notificacao);
    setModalOpen(true);
    
    // Marcar como lida se ainda não foi lida
    if (!notificacao.lida) {
      marcarComoLida(notificacao.id);
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="relative hover:bg-white/80 hover:scale-105 transition-all duration-200 rounded-xl p-3 group">
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
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0 bg-white border-0 shadow-2xl z-50 rounded-2xl overflow-hidden" align="end">
          {/* Header Premium */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">Notificações</h3>
              <Bell className="h-5 w-5 text-blue-300" />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-blue-100 text-sm">
                {naoLidas > 0 ? `${naoLidas} não lida(s) de ${notificacoes.length}` : 'Todas as notificações lidas'}
              </p>
              {naoLidas > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleMarcarTodasLidas}
                  className="text-white hover:bg-white/20 text-xs"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Marcar todas
                </Button>
              )}
            </div>
          </div>
          
          {/* Conteúdo das notificações */}
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
                {notificacoes.map((notificacao) => {
                  const config = tipoConfig[notificacao.tipo];
                  const IconComponent = config.icon;
                  
                  return (
                    <div
                      key={notificacao.id}
                      onClick={() => handleNotificacaoClick(notificacao)}
                      className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-lg group cursor-pointer ${
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
                            
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3 text-slate-400" />
                              <span className="text-xs text-slate-400">Clique para ver mais</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
          
          {/* Footer Premium */}
          {notificacoes.length > 0 && (
            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-slate-600 hover:text-slate-900 hover:bg-white/80 rounded-lg"
                onClick={() => setOpen(false)}
              >
                Fechar Painel
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* Modal de detalhes da notificação */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg bg-white">
          {selectedNotificacao && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    tipoConfig[selectedNotificacao.tipo].badgeColors
                  }`}>
                    {(() => {
                      const IconComponent = tipoConfig[selectedNotificacao.tipo].icon;
                      return <IconComponent className="h-6 w-6 text-white" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <Badge className={`${tipoConfig[selectedNotificacao.tipo].badgeColors} text-xs font-medium px-2 py-1 mb-1`}>
                      {tipoLabels[selectedNotificacao.tipo]}
                    </Badge>
                    <DialogTitle className="text-xl font-bold text-slate-900">
                      {selectedNotificacao.titulo}
                    </DialogTitle>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4">
                <DialogDescription className="text-base text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedNotificacao.mensagem}
                </DialogDescription>
                
                <div className="flex items-center gap-2 text-sm text-slate-500 pt-4 border-t border-slate-200">
                  <Clock className="h-4 w-4" />
                  <span>
                    {format(selectedNotificacao.createdAt, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <DialogClose asChild>
                  <Button variant="outline">Fechar</Button>
                </DialogClose>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
