
export interface Licenca {
  id: string;
  clienteId: string;
  numeroLicenca: string;
  dataEmissao: Date;
  dataVencimento: Date;
  dataPagamento?: Date;
  status: 'ativa' | 'vencida' | 'pendente' | 'suspensa';
  plano: 'basico' | 'premium' | 'enterprise';
  valor: number;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HistoricoRenovacao {
  id: string;
  licencaId: string;
  dataRenovacao: Date;
  dataVencimentoAnterior: Date;
  novaDataVencimento: Date;
  valorPago: number;
  formaPagamento: string;
  statusPagamento: 'aprovado' | 'pendente' | 'rejeitado';
  observacoes?: string;
}

export interface AlertaLicenca {
  id: string;
  licencaId: string;
  clienteId: string;
  tipo: 'vencimento_proximo' | 'vencida' | 'renovacao_necessaria' | 'pagamento_pendente';
  titulo: string;
  mensagem: string;
  dataAlerta: Date;
  dataVencimento: Date;
  diasRestantes: number;
  lido: boolean;
  ativo: boolean;
}

export interface StatusAcesso {
  permitido: boolean;
  motivoBloqueio?: string;
  diasRestantes?: number;
  dataVencimento?: Date;
  licencaStatus: 'ativa' | 'vencida' | 'pendente' | 'suspensa';
}
