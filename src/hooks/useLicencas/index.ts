
import { useState, useEffect } from 'react';
import { Licenca, HistoricoRenovacao, AlertaLicenca } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { adicionarAtividade } from '@/hooks/useAtividades';
import { loadFromStorage, saveToStorage, storageKeys } from './storage';
import { verificarStatusAcesso } from './access';
import { verificarAlertasAutomaticos } from './alerts';
import { criarNovaLicenca, criarHistoricoRenovacao } from './operations';

export function useLicencas() {
  const [licencas, setLicencas] = useState<Licenca[]>([]);
  const [historicoRenovacoes, setHistoricoRenovacoes] = useState<HistoricoRenovacao[]>([]);
  const [alertasLicencas, setAlertasLicencas] = useState<AlertaLicenca[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Carregar dados do localStorage
  useEffect(() => {
    console.log('useLicencas: Carregando dados do localStorage...');
    
    const loadedLicencas = loadFromStorage(storageKeys.LICENCAS, []);
    const loadedHistorico = loadFromStorage(storageKeys.HISTORICO, []);
    const loadedAlertas = loadFromStorage(storageKeys.ALERTAS, []);

    console.log('useLicencas: Licenças carregadas:', loadedLicencas);

    setLicencas(loadedLicencas);
    setHistoricoRenovacoes(loadedHistorico);
    setAlertasLicencas(loadedAlertas);
    setIsLoading(false);

    // Verificar alertas apenas se houver licenças
    if (loadedLicencas.length > 0) {
      const novosAlertas = verificarAlertasAutomaticos(loadedLicencas, loadedAlertas);
      if (novosAlertas.length > 0) {
        setAlertasLicencas(prev => [...prev, ...novosAlertas]);
      }
    }
  }, []);

  // Salvar alterações no localStorage
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(storageKeys.LICENCAS, licencas);
    }
  }, [licencas, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      saveToStorage(storageKeys.HISTORICO, historicoRenovacoes);
    }
  }, [historicoRenovacoes, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      saveToStorage(storageKeys.ALERTAS, alertasLicencas);
    }
  }, [alertasLicencas, isLoading]);

  // Criar nova licença
  const criarLicenca = (novaLicenca: Omit<Licenca, 'id' | 'createdAt' | 'updatedAt'>) => {
    const licenca = criarNovaLicenca(novaLicenca);

    setLicencas(prev => {
      const novasLicencas = [...prev, licenca];
      console.log('useLicencas: Lista atualizada de licenças:', novasLicencas);
      return novasLicencas;
    });

    toast({
      title: "Licença criada com sucesso!",
      description: `Licença ${licenca.numeroLicenca} foi adicionada ao sistema.`,
    });

    return licenca;
  };

  // Atualizar status da licença
  const atualizarStatusLicenca = (licencaId: string, novoStatus: Licenca['status']) => {
    setLicencas(prev => prev.map(licenca => {
      if (licenca.id === licencaId) {
        return { ...licenca, status: novoStatus, updatedAt: new Date() };
      }
      return licenca;
    }));

    toast({
      title: "Status atualizado",
      description: `Status da licença atualizado para: ${novoStatus}`,
    });
  };

  // Renovar licença
  const renovarLicenca = (licencaId: string, mesesRenovacao: number = 12, valorPago: number) => {
    const licenca = licencas.find(l => l.id === licencaId);
    if (!licenca) return;

    const hoje = new Date();
    const dataVencimentoAnterior = new Date(licenca.dataVencimento);
    const novaDataVencimento = new Date(hoje);
    novaDataVencimento.setMonth(novaDataVencimento.getMonth() + mesesRenovacao);

    // Atualizar licença
    setLicencas(prev => prev.map(l => {
      if (l.id === licencaId) {
        return {
          ...l,
          dataVencimento: novaDataVencimento,
          dataPagamento: hoje,
          status: 'ativa' as const,
          updatedAt: hoje,
        };
      }
      return l;
    }));

    // Adicionar ao histórico
    const novaRenovacao = criarHistoricoRenovacao(licencaId, mesesRenovacao, valorPago);
    novaRenovacao.dataVencimentoAnterior = dataVencimentoAnterior;

    setHistoricoRenovacoes(prev => [...prev, novaRenovacao]);

    // Registrar atividade
    adicionarAtividade({
      tipo: 'cliente',
      titulo: `Licença renovada: ${licenca.numeroLicenca}`,
      descricao: `Licença renovada até ${novaDataVencimento.toLocaleDateString()}`,
      cliente: licenca.clienteId
    });

    toast({
      title: "Licença renovada com sucesso!",
      description: `Nova data de vencimento: ${novaDataVencimento.toLocaleDateString()}`,
    });
  };

  // Verificar alertas automáticos
  const verificarAlertasAutomaticosManual = () => {
    const novosAlertas = verificarAlertasAutomaticos(licencas, alertasLicencas);
    if (novosAlertas.length > 0) {
      setAlertasLicencas(prev => [...prev, ...novosAlertas]);
    }
  };

  // Obter licença do cliente
  const getLicencaCliente = (clienteId: string): Licenca | undefined => {
    return licencas.find(l => l.clienteId === clienteId);
  };

  // Obter alertas do cliente
  const getAlertasCliente = (clienteId: string): AlertaLicenca[] => {
    return alertasLicencas.filter(a => a.clienteId === clienteId && a.ativo);
  };

  // Marcar alerta como lido
  const marcarAlertaComoLido = (alertaId: string) => {
    setAlertasLicencas(prev => prev.map(alerta => {
      if (alerta.id === alertaId) {
        return { ...alerta, lido: true };
      }
      return alerta;
    }));
  };

  // Verificar status de acesso para um cliente
  const verificarStatusAcessoCliente = (clienteId: string) => {
    const statusAcesso = verificarStatusAcesso(licencas, clienteId);
    
    // Se a licença estiver vencida, atualizar o status automaticamente
    if (!statusAcesso.permitido && statusAcesso.licencaStatus === 'vencida') {
      const licencaVencida = licencas.find(l => l.clienteId === clienteId && l.status === 'ativa');
      if (licencaVencida) {
        atualizarStatusLicenca(licencaVencida.id, 'vencida');
      }
    }
    
    return statusAcesso;
  };

  return {
    licencas,
    historicoRenovacoes,
    alertasLicencas,
    isLoading,
    verificarStatusAcesso: verificarStatusAcessoCliente,
    verificarAlertasAutomaticos: verificarAlertasAutomaticosManual,
    criarLicenca,
    atualizarStatusLicenca,
    renovarLicenca,
    getLicencaCliente,
    getAlertasCliente,
    marcarAlertaComoLido,
  };
}
