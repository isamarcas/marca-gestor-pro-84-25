
import { ContratoData } from '@/types/contratos';

export interface ContratoManagerState {
  versao: 'original' | 'premium';
  step: 'versao' | 'dados' | 'contrato' | 'assinatura' | 'finalizado';
  nomeCliente: string;
  emailCliente: string;
  leituraCompleta: boolean;
  assinaturaBase64: string;
  contratoFinalizado: ContratoData | null;
  dadosValidacaoPremium: any;
}

export interface ContratoManagerActions {
  handleMudarVersao: (novaVersao: 'original' | 'premium') => void;
  handleVoltarParaSelecao: () => void;
  handleProximoStep: () => void;
  handleValidacaoPremiumCompleta: (dados: any) => void;
  handleAssinaturaCompleta: (dadosAssinatura: any) => Promise<void>;
  setNomeCliente: (nome: string) => void;
  setEmailCliente: (email: string) => void;
  setLeituraCompleta: (completa: boolean) => void;
}
