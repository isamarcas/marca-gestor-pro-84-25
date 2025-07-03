
import { useState, useEffect, useMemo, useCallback } from 'react';
import { ContratoData } from '@/types/contratos';
import { useContratos } from '@/hooks/useContratos';
import { gerarPDFContrato, downloadPDF } from '@/utils/pdfUtils';
import { toast } from '@/hooks/use-toast';

export function useGestaoContratos() {
  const [contratos, setContratos] = useState<ContratoData[]>([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [contratoSelecionado, setContratoSelecionado] = useState<ContratoData | null>(null);
  const { buscarContratos } = useContratos();

  useEffect(() => {
    const carregarContratos = async () => {
      try {
        const contratosCarregados = await buscarContratos();
        setContratos(contratosCarregados);
      } catch (error) {
        console.error('Erro ao carregar contratos:', error);
        toast({
          title: "Erro",
          description: "Erro ao carregar contratos",
          variant: "destructive"
        });
      }
    };
    
    carregarContratos();
  }, [buscarContratos]);

  const contratosFiltrados = useMemo(() => 
    contratos.filter(contrato =>
      contrato.nomeCliente.toLowerCase().includes(filtroNome.toLowerCase())
    ), [contratos, filtroNome]
  );

  const handleDownload = useCallback((contrato: ContratoData) => {
    const htmlContent = gerarPDFContrato(contrato);
    downloadPDF(htmlContent, `contrato_${contrato.nomeCliente}_${contrato.dataAceite.replace(/\//g, '-')}`);
    
    toast({
      title: "Download iniciado",
      description: `Baixando contrato de ${contrato.nomeCliente}`,
    });
  }, []);

  const handleCopyToClipboard = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${label} copiado para a área de transferência`,
    });
  }, []);

  const formatarDataHora = useCallback((data: string, hora: string) => {
    return `${data} às ${hora}`;
  }, []);

  const obterVersaoContrato = useCallback((contrato: ContratoData) => {
    return contrato.dadosPremium?.versao === 'premium' ? 'Premium' : 'Original';
  }, []);

  const estatisticas = useMemo(() => ({
    total: contratos.length,
    premium: contratos.filter(c => c.dadosPremium?.versao === 'premium').length,
    aceitos: contratos.filter(c => c.status === 'aceito').length
  }), [contratos]);

  return {
    contratos: contratosFiltrados,
    filtroNome,
    setFiltroNome,
    contratoSelecionado,
    setContratoSelecionado,
    estatisticas,
    handleDownload,
    handleCopyToClipboard,
    formatarDataHora,
    obterVersaoContrato
  };
}
