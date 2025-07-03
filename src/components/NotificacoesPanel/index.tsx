
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useNotificacoes } from '@/hooks/useNotificacoes';
import { Notificacao } from '@/types';
import { NotificationIcon } from './NotificationIcon';
import { NotificationHeader } from './NotificationHeader';
import { NotificationsList } from './NotificationsList';
import { NotificationModal } from './NotificationModal';
import { useToast } from '@/hooks/use-toast';

interface NotificacoesPanelProps {
  clienteId?: string;
}

export function NotificacoesPanel({ clienteId }: NotificacoesPanelProps) {
  const { 
    notificacoes, 
    naoLidas, 
    marcarComoLida, 
    deletarNotificacao,
    deletarTodasNotificacoesCliente,
    deletarTodasNotificacoesSistema 
  } = useNotificacoes(clienteId);
  const [open, setOpen] = useState(false);
  const [selectedNotificacao, setSelectedNotificacao] = useState<Notificacao | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const handleMarcarTodasLidas = () => {
    notificacoes.filter(n => !n.lida).forEach(n => marcarComoLida(n.id));
    toast({
      title: "Notificações marcadas como lidas",
      description: "Todas as notificações foram marcadas como lidas.",
    });
  };

  const handleDeletarTodas = () => {
    if (clienteId) {
      deletarTodasNotificacoesCliente(clienteId);
      toast({
        title: "Notificações deletadas",
        description: "Todas as notificações do cliente foram removidas.",
      });
    } else {
      deletarTodasNotificacoesSistema();
      toast({
        title: "Notificações deletadas",
        description: "Todas as notificações do sistema foram removidas.",
      });
    }
    setOpen(false);
  };

  const handleDeletarNotificacao = (notificacaoId: string) => {
    deletarNotificacao(notificacaoId);
    toast({
      title: "Notificação removida",
      description: "A notificação foi removida com sucesso.",
    });
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
          <div>
            <NotificationIcon naoLidas={naoLidas} onClick={() => setOpen(!open)} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0 bg-white border-0 shadow-2xl z-50 rounded-2xl overflow-hidden" align="end">
          {/* Header Premium */}
          <NotificationHeader
            naoLidas={naoLidas}
            totalNotificacoes={notificacoes.length}
            onMarcarTodasLidas={handleMarcarTodasLidas}
            onDeletarTodas={handleDeletarTodas}
          />
          
          {/* Lista de notificações */}
          <NotificationsList
            notificacoes={notificacoes}
            onNotificacaoClick={handleNotificacaoClick}
            onDeleteNotificacao={handleDeletarNotificacao}
          />
          
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
      <NotificationModal
        notificacao={selectedNotificacao}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
