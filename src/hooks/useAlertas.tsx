
import { useState, useEffect, useCallback } from 'react';

interface Alerta {
  id: number;
  titulo: string;
  descricao: string;
  tipo: 'prazo' | 'renovacao' | 'oposicao' | 'recurso' | 'documentacao';
  prioridade: 'alta' | 'media' | 'baixa';
  marca: string;
  cliente: string;
  prazo: string;
  status: 'ativo' | 'resolvido' | 'adiado';
  createdAt: string;
}

export function useAlertas() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>('todas');
  const [alertaSelecionado, setAlertaSelecionado] = useState<Alerta | null>(null);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);

  const carregarAlertas = useCallback(() => {
    try {
      const alertasStorage = localStorage.getItem('alertas');
      if (alertasStorage) {
        const alertasData = JSON.parse(alertasStorage);
        // Converter formato de armazenamento para formato da UI
        const alertasConvertidos = alertasData.map((alerta: any, index: number) => ({
          id: index + 1,
          titulo: alerta.titulo || alerta.marca,
          descricao: alerta.descricao,
          tipo: alerta.tipo === 'prazo' ? 'prazo' : alerta.tipo,
          prioridade: alerta.prioridade,
          marca: alerta.marca,
          cliente: alerta.cliente,
          prazo: alerta.prazo,
          status: alerta.status,
          createdAt: alerta.createdAt
        }));
        setAlertas(alertasConvertidos);
      } else {
        setAlertas([]);
      }
    } catch (error) {
      console.error('Erro ao carregar alertas:', error);
      setAlertas([]);
    }
  }, []);

  useEffect(() => {
    carregarAlertas();
    
    // Atualizar alertas a cada 5 minutos
    const interval = setInterval(carregarAlertas, 300000);
    
    return () => clearInterval(interval);
  }, [carregarAlertas]);

  // Filtrar alertas
  const alertasFiltrados = alertas.filter(alerta => {
    const matchesTipo = filtroTipo === 'todos' || alerta.tipo === filtroTipo;
    const matchesPrioridade = filtroPrioridade === 'todas' || alerta.prioridade === filtroPrioridade;
    return matchesTipo && matchesPrioridade;
  });

  // Calcular estatísticas
  const stats = {
    total: alertas.length,
    ativos: alertas.filter(a => a.status === 'ativo').length,
    resolvidos: alertas.filter(a => a.status === 'resolvido').length,
    alta: alertas.filter(a => a.prioridade === 'alta' && a.status === 'ativo').length,
    media: alertas.filter(a => a.prioridade === 'media' && a.status === 'ativo').length,
    baixa: alertas.filter(a => a.prioridade === 'baixa' && a.status === 'ativo').length,
  };

  const handleMarcarResolvido = (id: number) => {
    try {
      const alertasStorage = localStorage.getItem('alertas');
      if (alertasStorage) {
        const alertasData = JSON.parse(alertasStorage);
        const alertaIndex = id - 1; // Converter ID de volta para índice
        if (alertaIndex >= 0 && alertaIndex < alertasData.length) {
          alertasData[alertaIndex].status = 'resolvido';
          localStorage.setItem('alertas', JSON.stringify(alertasData));
          carregarAlertas(); // Recarregar alertas
        }
      }
    } catch (error) {
      console.error('Erro ao marcar alerta como resolvido:', error);
    }
  };

  const handleVerDetalhes = (alerta: Alerta) => {
    setAlertaSelecionado(alerta);
    setModalDetalhesAberto(true);
  };

  const handleFecharDetalhes = () => {
    setModalDetalhesAberto(false);
    setAlertaSelecionado(null);
  };

  const handleFiltrarTipo = (tipo: string) => {
    setFiltroTipo(tipo);
  };

  const handleFiltrarPrioridade = (prioridade: string) => {
    setFiltroPrioridade(prioridade);
  };

  const handleAdiarAlerta = (id: number, novaDataString: string) => {
    try {
      const alertasStorage = localStorage.getItem('alertas');
      if (alertasStorage) {
        const alertasData = JSON.parse(alertasStorage);
        const alertaIndex = id - 1;
        if (alertaIndex >= 0 && alertaIndex < alertasData.length) {
          // Convert string to Date and then to ISO string
          const novaData = new Date(novaDataString);
          alertasData[alertaIndex].prazo = novaData.toISOString();
          alertasData[alertaIndex].status = 'adiado';
          localStorage.setItem('alertas', JSON.stringify(alertasData));
          carregarAlertas();
        }
      }
    } catch (error) {
      console.error('Erro ao adiar alerta:', error);
    }
  };

  return {
    alertas: alertasFiltrados,
    filtroTipo,
    filtroPrioridade,
    stats,
    alertaSelecionado,
    modalDetalhesAberto,
    handleMarcarResolvido,
    handleVerDetalhes,
    handleFecharDetalhes,
    handleFiltrarTipo,
    handleFiltrarPrioridade,
    handleAdiarAlerta,
  };
}
