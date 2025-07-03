
import { useState, useEffect } from 'react';
import { useAlertasAutomaticos } from '@/hooks/useAlertasAutomaticos';
import { useLicencas } from '@/hooks/useLicencas';
import { useNotificacoes } from '@/hooks/useNotificacoes';
import { Alerta } from './types';

export function useAlertas() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const { verificarECriarAlertas } = useAlertasAutomaticos();
  const { licencas, alertasLicencas } = useLicencas();
  const { notificacoes } = useNotificacoes();

  useEffect(() => {
    const carregarAlertas = () => {
      try {
        // Carregar alertas de marcas
        const alertasStorage = localStorage.getItem('alertas');
        let alertasMarcas: Alerta[] = [];
        
        if (alertasStorage) {
          alertasMarcas = JSON.parse(alertasStorage)
            .filter((alerta: Alerta) => alerta.status === 'ativo')
            .map((alerta: Alerta) => ({ ...alerta, categoria: 'marca' as const }));
        }

        // Converter alertas de licenças para o formato do painel
        const alertasLicencasAtivos: Alerta[] = alertasLicencas
          .filter(alerta => alerta.ativo && !alerta.lido)
          .map(alerta => {
            // Garantir que prioridade seja do tipo correto
            let prioridade: 'alta' | 'media' | 'baixa' = 'baixa';
            if (alerta.tipo === 'vencida') {
              prioridade = 'alta';
            } else if (alerta.diasRestantes <= 3) {
              prioridade = 'alta';
            } else if (alerta.diasRestantes <= 7) {
              prioridade = 'media';
            }

            return {
              id: alerta.id,
              marca: `Licença ${alerta.licencaId.substring(0, 8)}...`,
              tipo: 'prazo', // Converter para tipo compatível
              titulo: alerta.titulo,
              descricao: alerta.mensagem,
              prazo: alerta.dataVencimento.toISOString(),
              prioridade,
              status: 'ativo' as const,
              createdAt: alerta.dataAlerta.toISOString(),
              cliente: alerta.clienteId,
              categoria: 'licenca' as const
            };
          });

        // Converter notificações não lidas de tipo warning/error para alertas
        const alertasNotificacoes: Alerta[] = notificacoes
          .filter(notif => !notif.lida && (notif.tipo === 'warning' || notif.tipo === 'error'))
          .filter(notif => notif.categoria === 'prazo')
          .map(notif => {
            // Garantir que prioridade seja do tipo correto
            const prioridade: 'alta' | 'media' | 'baixa' = notif.tipo === 'error' ? 'alta' : 'media';

            return {
              id: notif.id,
              marca: `Notificação ${notif.clienteId}`,
              tipo: 'prazo', // Converter para tipo compatível
              titulo: notif.titulo,
              descricao: notif.mensagem,
              prazo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Default 7 dias
              prioridade,
              status: 'ativo' as const,
              createdAt: notif.createdAt.toISOString(),
              cliente: notif.clienteId,
              categoria: 'licenca' as const
            };
          });

        // Combinar todos os alertas
        const todosAlertas = [...alertasMarcas, ...alertasLicencasAtivos, ...alertasNotificacoes];

        // Ordenar por prioridade e data
        const alertasOrdenados = todosAlertas
          .sort((a: Alerta, b: Alerta) => {
            const prioridadeOrder = { alta: 3, media: 2, baixa: 1 };
            const prioridadeA = prioridadeOrder[a.prioridade] || 0;
            const prioridadeB = prioridadeOrder[b.prioridade] || 0;
            
            if (prioridadeA !== prioridadeB) {
              return prioridadeB - prioridadeA;
            }
            
            return new Date(a.prazo).getTime() - new Date(b.prazo).getTime();
          })
          .slice(0, 3); // Mostrar apenas os 3 mais críticos

        setAlertas(alertasOrdenados);
      } catch (error) {
        console.error('Erro ao carregar alertas:', error);
        setAlertas([]);
      }
    };

    // Verificar e criar alertas automáticos
    verificarECriarAlertas();
    
    // Carregar alertas
    carregarAlertas();

    // Atualizar alertas a cada 5 minutos
    const interval = setInterval(carregarAlertas, 300000);

    return () => clearInterval(interval);
  }, [verificarECriarAlertas, alertasLicencas, notificacoes]);

  const handleMarcarResolvido = (alertaId: string) => {
    const alerta = alertas.find(a => a.id === alertaId);
    
    if (alerta?.categoria === 'marca') {
      // Resolver alerta de marca
      try {
        const alertasStorage = localStorage.getItem('alertas');
        if (alertasStorage) {
          const todosAlertas = JSON.parse(alertasStorage);
          const alertasAtualizados = todosAlertas.map((a: Alerta) =>
            a.id === alertaId ? { ...a, status: 'resolvido' } : a
          );
          localStorage.setItem('alertas', JSON.stringify(alertasAtualizados));
        }
      } catch (error) {
        console.error('Erro ao resolver alerta de marca:', error);
      }
    }
    
    // Remover da lista local
    setAlertas(prev => prev.filter(alerta => alerta.id !== alertaId));
  };

  return {
    alertas,
    handleMarcarResolvido
  };
}
