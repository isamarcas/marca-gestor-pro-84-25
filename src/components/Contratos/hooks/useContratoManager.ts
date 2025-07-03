
import { useState } from 'react';
import { ContratoData } from '@/types/contratos';
import { toast } from '@/hooks/use-toast';
import { useContratos } from '@/hooks/useContratos';
import { ContratoManagerState, ContratoManagerActions } from '../types';
import { contratoTexto } from '../constants';

export function useContratoManager(): ContratoManagerState & ContratoManagerActions {
  const [versao, setVersao] = useState<'original' | 'premium'>('original');
  const [step, setStep] = useState<'versao' | 'dados' | 'contrato' | 'assinatura' | 'finalizado'>('versao');
  const [nomeCliente, setNomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [leituraCompleta, setLeituraCompleta] = useState(false);
  const [assinaturaBase64, setAssinaturaBase64] = useState('');
  const [contratoFinalizado, setContratoFinalizado] = useState<ContratoData | null>(null);
  const [dadosValidacaoPremium, setDadosValidacaoPremium] = useState<any>(null);

  const { salvarContrato, obterInfoDispositivo, obterIP, gerarHashContrato, isLoading } = useContratos();

  const handleMudarVersao = (novaVersao: 'original' | 'premium') => {
    setVersao(novaVersao);
    setStep('dados');
    // Reset states when changing version
    setLeituraCompleta(false);
    setAssinaturaBase64('');
    setDadosValidacaoPremium(null);
  };

  const handleVoltarParaSelecao = () => {
    setStep('versao');
    setVersao('original');
    setNomeCliente('');
    setEmailCliente('');
    setLeituraCompleta(false);
    setAssinaturaBase64('');
    setDadosValidacaoPremium(null);
  };

  const handleProximoStep = () => {
    if (step === 'dados' && nomeCliente.trim()) {
      setStep('contrato');
    } else if (step === 'contrato' && leituraCompleta) {
      setStep('assinatura');
    }
  };

  const handleValidacaoPremiumCompleta = (dados: any) => {
    setDadosValidacaoPremium(dados);
  };

  const handleAssinaturaCompleta = async (dadosAssinatura: any) => {
    try {
      console.log('Processando assinatura:', dadosAssinatura);
      
      const assinatura = typeof dadosAssinatura === 'string' ? dadosAssinatura : dadosAssinatura.assinatura;
      setAssinaturaBase64(assinatura);
      
      const agora = new Date();
      const contratoTextoFinal = contratoTexto.replace('[Nome do Cliente]', nomeCliente);
      
      // Gerar hash SHA256 do contrato
      const hashDocumento = await gerarHashContrato(contratoTextoFinal);
      
      const contrato: ContratoData = {
        id: `contrato_${Date.now()}`,
        nomeCliente,
        email: emailCliente || undefined,
        dataAceite: agora.toLocaleDateString('pt-BR'),
        horaAceite: agora.toLocaleTimeString('pt-BR'),
        ipAddress: await obterIP(),
        dispositivo: obterInfoDispositivo(),
        assinatura,
        contratoTexto: contratoTextoFinal,
        status: 'aceito'
      };

      // Adicionar dados premium se disponíveis
      if (versao === 'premium' && typeof dadosAssinatura === 'object') {
        (contrato as any).dadosPremium = {
          selfie: dadosAssinatura.selfie,
          metricas: dadosAssinatura.metricas,
          validacoes: {
            ...dadosAssinatura.validacoes,
            hashDocumento
          },
          versao: 'premium'
        };
      } else {
        (contrato as any).dadosPremium = { 
          versao: 'original',
          validacoes: {
            hashDocumento
          }
        };
      }

      console.log('Salvando contrato com hash:', hashDocumento);
      const sucesso = await salvarContrato(contrato);
      
      if (sucesso) {
        setContratoFinalizado(contrato);
        setStep('finalizado');
        toast({
          title: `Contrato ${versao === 'premium' ? 'Premium' : 'Original'} Aceito com Sucesso! ✅`,
          description: `Obrigado ${nomeCliente}! Seu contrato foi registrado em ${contrato.dataAceite} às ${contrato.horaAceite}.`,
        });
      }
    } catch (error) {
      console.error('Erro ao processar assinatura:', error);
      toast({
        title: "Erro ao processar contrato",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return {
    versao,
    step,
    nomeCliente,
    emailCliente,
    leituraCompleta,
    assinaturaBase64,
    contratoFinalizado,
    dadosValidacaoPremium,
    handleMudarVersao,
    handleVoltarParaSelecao,
    handleProximoStep,
    handleValidacaoPremiumCompleta,
    handleAssinaturaCompleta,
    setNomeCliente,
    setEmailCliente,
    setLeituraCompleta
  };
}
