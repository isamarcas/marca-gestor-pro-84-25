
import { Documento, AlertaPrazo, Oposicao } from '@/types';

interface MarcasHandlersProps {
  marcaParaGestao: string | null;
  setDocumentos: React.Dispatch<React.SetStateAction<Record<string, Documento[]>>>;
  setAlertasPrazos: React.Dispatch<React.SetStateAction<Record<string, AlertaPrazo[]>>>;
  setOposicoes: React.Dispatch<React.SetStateAction<Record<string, Oposicao[]>>>;
}

export function useMarcasHandlers({
  marcaParaGestao,
  setDocumentos,
  setAlertasPrazos,
  setOposicoes,
}: MarcasHandlersProps) {
  const handleUploadDocumento = (documento: Omit<Documento, 'id'>) => {
    if (!marcaParaGestao) return;
    
    const novoDocumento: Documento = {
      ...documento,
      id: Math.random().toString(36).slice(2, 10)
    };
    
    setDocumentos(prev => ({
      ...prev,
      [marcaParaGestao]: [...(prev[marcaParaGestao] || []), novoDocumento]
    }));
  };

  const handleDeleteDocumento = (documentoId: string) => {
    if (!marcaParaGestao) return;
    
    setDocumentos(prev => ({
      ...prev,
      [marcaParaGestao]: (prev[marcaParaGestao] || []).filter(doc => doc.id !== documentoId)
    }));
  };

  const handleAdicionarAlerta = (alerta: Omit<AlertaPrazo, 'id' | 'createdAt'>) => {
    if (!marcaParaGestao) return;
    
    const novoAlerta: AlertaPrazo = {
      ...alerta,
      id: Math.random().toString(36).slice(2, 10),
      createdAt: new Date()
    };
    
    setAlertasPrazos(prev => ({
      ...prev,
      [marcaParaGestao]: [...(prev[marcaParaGestao] || []), novoAlerta]
    }));
  };

  const handleResolverAlerta = (alertaId: string) => {
    if (!marcaParaGestao) return;
    
    setAlertasPrazos(prev => ({
      ...prev,
      [marcaParaGestao]: (prev[marcaParaGestao] || []).map(alerta =>
        alerta.id === alertaId ? { ...alerta, status: 'resolvido' as const } : alerta
      )
    }));
  };

  const handleAdiarAlerta = (alertaId: string, novaData: Date) => {
    if (!marcaParaGestao) return;
    
    setAlertasPrazos(prev => ({
      ...prev,
      [marcaParaGestao]: (prev[marcaParaGestao] || []).map(alerta =>
        alerta.id === alertaId ? { ...alerta, dataVencimento: novaData } : alerta
      )
    }));
  };

  const handleAdicionarOposicao = (oposicao: Omit<Oposicao, 'id'>) => {
    if (!marcaParaGestao) return;
    
    const novaOposicao: Oposicao = {
      ...oposicao,
      id: Math.random().toString(36).slice(2, 10)
    };
    
    setOposicoes(prev => ({
      ...prev,
      [marcaParaGestao]: [...(prev[marcaParaGestao] || []), novaOposicao]
    }));
  };

  const handleAtualizarStatusOposicao = (oposicaoId: string, novoStatus: Oposicao['status']) => {
    if (!marcaParaGestao) return;
    
    setOposicoes(prev => ({
      ...prev,
      [marcaParaGestao]: (prev[marcaParaGestao] || []).map(oposicao =>
        oposicao.id === oposicaoId ? { ...oposicao, status: novoStatus } : oposicao
      )
    }));
  };

  return {
    handleUploadDocumento,
    handleDeleteDocumento,
    handleAdicionarAlerta,
    handleResolverAlerta,
    handleAdiarAlerta,
    handleAdicionarOposicao,
    handleAtualizarStatusOposicao,
  };
}
