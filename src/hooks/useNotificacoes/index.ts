
import { useState, useEffect, useMemo } from 'react';
import { Notificacao } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
  getGlobalNotificacoes,
  setGlobalNotificacoes,
  addSubscriber,
  removeSubscriber,
  marcarNotificacaoComoLida,
  deletarNotificacao as deletarNotificacaoGlobal,
  deletarTodasNotificacoesCliente as deletarTodasNotificacoesClienteGlobal,
  deletarTodasNotificacoesSistema as deletarTodasNotificacoesSistemaGlobal,
  adicionarNovaNotificacao,
} from './globalState';
import { loadAllNotificacoesFromStorage } from './storage';

export function useNotificacoes(clienteId?: string) {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadNotificacoes();
    
    const updateNotificacoes = () => {
      const globalNotificacoes = getGlobalNotificacoes();
      
      if (clienteId) {
        setNotificacoes(globalNotificacoes[clienteId] || []);
      } else {
        // Se não há clienteId, retorna todas as notificações
        const todasNotificacoes = Object.values(globalNotificacoes).flat();
        setNotificacoes(todasNotificacoes);
      }
    };

    addSubscriber(updateNotificacoes);
    updateNotificacoes();

    return () => {
      removeSubscriber(updateNotificacoes);
    };
  }, [clienteId]);

  const loadNotificacoes = async () => {
    try {
      setIsLoading(true);
      const globalNotificacoes = await loadAllNotificacoesFromStorage();
      setGlobalNotificacoes(globalNotificacoes);
      
      if (clienteId) {
        setNotificacoes(globalNotificacoes[clienteId] || []);
      } else {
        const todasNotificacoes = Object.values(globalNotificacoes).flat();
        setNotificacoes(todasNotificacoes);
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const adicionarNotificacao = (dadosNotificacao: Omit<Notificacao, 'id' | 'createdAt'>) => {
    try {
      adicionarNovaNotificacao(dadosNotificacao);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar notificação:', error);
      toast({
        title: "Erro",
        description: "Falha ao enviar notificação",
        variant: "destructive"
      });
      return false;
    }
  };

  const marcarComoLida = (notificacaoId: string) => {
    try {
      marcarNotificacaoComoLida(notificacaoId);
      return true;
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
      return false;
    }
  };

  const deletarNotificacao = (notificacaoId: string) => {
    try {
      deletarNotificacaoGlobal(notificacaoId);
      return true;
    } catch (error) {
      console.error('Erro ao deletar notificação:', error);
      return false;
    }
  };

  const deletarTodasNotificacoesCliente = (clienteId: string) => {
    try {
      deletarTodasNotificacoesClienteGlobal(clienteId);
      return true;
    } catch (error) {
      console.error('Erro ao deletar todas as notificações do cliente:', error);
      return false;
    }
  };

  const deletarTodasNotificacoesSistema = () => {
    try {
      deletarTodasNotificacoesSistemaGlobal();
      return true;
    } catch (error) {
      console.error('Erro ao deletar todas as notificações do sistema:', error);
      return false;
    }
  };

  const removerNotificacao = (notificacaoId: string) => {
    return deletarNotificacao(notificacaoId);
  };

  const getNotificacoesPorCliente = (clienteId: string) => {
    const globalNotificacoes = getGlobalNotificacoes();
    return globalNotificacoes[clienteId] || [];
  };

  const getEstatisticas = () => {
    const total = notificacoes.length;
    const naoLidas = notificacoes.filter(n => !n.lida).length;
    const porTipo = notificacoes.reduce((acc, n) => {
      acc[n.tipo] = (acc[n.tipo] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      naoLidas,
      lidas: total - naoLidas,
      porTipo
    };
  };

  // Computed property for naoLidas
  const naoLidas = useMemo(() => {
    return notificacoes.filter(n => !n.lida).length;
  }, [notificacoes]);

  return {
    notificacoes,
    naoLidas,
    isLoading,
    adicionarNotificacao,
    marcarComoLida,
    removerNotificacao,
    deletarNotificacao,
    deletarTodasNotificacoesCliente,
    deletarTodasNotificacoesSistema,
    getNotificacoesPorCliente,
    getEstatisticas,
    loadNotificacoes
  };
}
