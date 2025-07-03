
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ContratoData } from '@/types/contratos';
import { adicionarAtividade } from '@/hooks/useAtividades';
import { Contrato, AssinaturaContrato } from './types';
import { 
  saveContratosToStorage, 
  loadContratosFromStorage, 
  saveContratoAceitoToStorage, 
  loadContratosAceitosFromStorage 
} from './storage';
import { gerarSHA256 } from './crypto';

export function useContratosOperations() {
  const [contratos, setContratos] = useState<Contrato[]>(() => loadContratosFromStorage());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Carregar contratos do localStorage ao montar o hook
    const storedContratos = loadContratosFromStorage();
    setContratos(storedContratos);
  }, []);

  const adicionarContrato = useCallback((novoContrato: Omit<Contrato, 'id'>) => {
    const contrato: Contrato = {
      ...novoContrato,
      id: Date.now().toString(),
    };

    const novosContratos = [...contratos, contrato];
    setContratos(novosContratos);
    saveContratosToStorage(novosContratos);

    toast({
      title: "Contrato adicionado!",
      description: "Novo contrato foi adicionado com sucesso.",
    });
  }, [contratos, toast]);

  const atualizarContrato = useCallback((id: string, dadosAtualizados: Partial<Contrato>) => {
    const novosContratos = contratos.map(contrato => {
      if (contrato.id === id) {
        return { ...contrato, ...dadosAtualizados };
      }
      return contrato;
    });

    setContratos(novosContratos);
    saveContratosToStorage(novosContratos);

    toast({
      title: "Contrato atualizado!",
      description: "As informações do contrato foram atualizadas.",
    });
  }, [contratos, toast]);

  const removerContrato = useCallback((id: string) => {
    const novosContratos = contratos.filter(contrato => contrato.id !== id);
    setContratos(novosContratos);
    saveContratosToStorage(novosContratos);

    toast({
      title: "Contrato removido!",
      description: "O contrato foi removido do sistema.",
    });
  }, [contratos, toast]);

  const assinarContrato = useCallback((contratoId: string, assinatura: AssinaturaContrato) => {
    const novosContratos = contratos.map(contrato => {
      if (contrato.id === contratoId) {
        const contratoAtualizado = {
          ...contrato,
          assinado: true,
          dataAssinatura: new Date(),
          assinatura
        };

        // Registrar atividade
        adicionarAtividade({
          tipo: 'contrato',
          titulo: `Contrato assinado: ${contrato.titulo}`,
          descricao: `Contrato "${contrato.titulo}" foi assinado digitalmente`,
          cliente: contrato.cliente
        });

        return contratoAtualizado;
      }
      return contrato;
    });

    setContratos(novosContratos);
    saveContratosToStorage(novosContratos);

    toast({
      title: "Contrato assinado!",
      description: "O contrato foi assinado com sucesso.",
    });
  }, [contratos, toast]);

  const salvarContrato = useCallback(async (contrato: ContratoData): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Salvar no localStorage
      saveContratoAceitoToStorage(contrato);
      
      // Registrar atividade
      adicionarAtividade({
        tipo: 'contrato',
        titulo: `Contrato aceito: ${contrato.nomeCliente}`,
        descricao: `Contrato foi aceito digitalmente por ${contrato.nomeCliente}`,
        cliente: contrato.nomeCliente
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar contrato:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const buscarContratos = useCallback(async (): Promise<ContratoData[]> => {
    return loadContratosAceitosFromStorage();
  }, []);

  const obterInfoDispositivo = useCallback((): string => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    return `${platform} - ${userAgent.substring(0, 100)}...`;
  }, []);

  const obterIP = useCallback(async (): Promise<string> => {
    try {
      // Tentar múltiplos serviços para obter o IP real
      const servicos = [
        'https://api.ipify.org?format=json',
        'https://ipapi.co/json/',
        'https://api.my-ip.io/ip.json'
      ];

      for (const servico of servicos) {
        try {
          const response = await fetch(servico);
          const data = await response.json();
          
          // Diferentes APIs retornam o IP em campos diferentes
          const ip = data.ip || data.query || data.address;
          if (ip && ip !== 'undefined') {
            console.log('IP obtido com sucesso:', ip);
            return ip;
          }
        } catch (error) {
          console.warn(`Falha ao obter IP de ${servico}:`, error);
          continue;
        }
      }
      
      // Se todos os serviços falharem, usar fallback local
      console.warn('Todos os serviços de IP falharam, usando fallback');
      return 'IP-UNAVAILABLE-' + Date.now();
    } catch (error) {
      console.error('Erro ao obter IP:', error);
      return 'IP-ERROR-' + Date.now();
    }
  }, []);

  const gerarHashContrato = useCallback(async (contratoTexto: string): Promise<string> => {
    return await gerarSHA256(contratoTexto);
  }, []);

  return {
    contratos,
    adicionarContrato,
    atualizarContrato,
    removerContrato,
    assinarContrato,
    salvarContrato,
    buscarContratos,
    obterInfoDispositivo,
    obterIP,
    gerarHashContrato,
    isLoading
  };
}
