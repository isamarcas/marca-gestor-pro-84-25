
export interface Marca {
  id: string;
  nome: string;
  numeroProcesso: string;
  titular: string;
  clienteId: string;
  dataDeposito: Date;
  status: 'em_analise' | 'deferido' | 'indeferido' | 'recurso' | 'renovacao' | 'oposicao' | 'deposito' | 'publicacao' | 'fase_oposicao' | 'exame_merito' | 'resposta_exigencia' | 'pagamento_taxa' | 'concessao' | 'vigencia' | 'nulidade' | 'caducidade' | 'exigencia_merito';
  classe: string;
  tipoMarca: 'mista' | 'nominativa' | 'figurativa';
  observacoes?: string;
  documentos: string[]; // Document IDs
  proximoPrazo?: Date;
  dataLimiteManifestacao?: Date;
  createdAt: Date;
  updatedAt: Date;
  // Novos campos detalhados
  descricaoProdutosServicos: string;
  prazoRenovacao?: Date;
  custosAssociados: CustoMarca[];
  statusDetalhado: string;
  historicoProcesso: HistoricoProcesso[];
  oposicoes: Oposicao[];
  licenciamentos: Licenciamento[];
  transferencias: TransferenciaTitularidade[];
}

export interface CustoMarca {
  id: string;
  tipo: 'registro' | 'renovacao' | 'taxa_inpi' | 'honorarios' | 'outros';
  valor: number;
  dataVencimento: Date;
  dataPagamento?: Date;
  status: 'pendente' | 'pago' | 'vencido';
  descricao: string;
}

export interface HistoricoProcesso {
  id: string;
  data: Date;
  evento: string;
  descricao: string;
  documentoGerado?: string;
  responsavel: string;
  status: string;
}

export interface Oposicao {
  id: string;
  marcaId: string;
  numeroProcesso: string;
  oponente: string;
  dataOposicao: Date;
  motivo: string;
  status: 'pendente' | 'deferida' | 'indeferida' | 'em_analise';
  prazoResposta?: Date;
  documentos: string[]; // Document IDs
  observacoes?: string;
}

export interface Licenciamento {
  id: string;
  marcaId: string;
  licenciado: string;
  dataInicio: Date;
  dataFim: Date;
  tipoLicenca: 'exclusiva' | 'nao_exclusiva' | 'sublicenciamento';
  valorRoyalty?: number;
  status: 'ativo' | 'suspenso' | 'finalizado';
  contratoUrl?: string;
  observacoes?: string;
}

export interface TransferenciaTitularidade {
  id: string;
  marcaId: string;
  titularAnterior: string;
  novoTitular: string;
  dataTransferencia: Date;
  numeroProcessoInpi?: string;
  documentoComprobatorio: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  observacoes?: string;
}

export interface AlertaPrazo {
  id: string;
  marcaId: string;
  tipo: 'renovacao' | 'oposicao' | 'resposta_exigencia' | 'pagamento_taxa' | 'outro' | 'prazo';
  titulo: string;
  descricao: string;
  dataVencimento: Date;
  diasAntecedencia: number;
  status: 'ativo' | 'resolvido' | 'adiado';
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
  responsavel?: string;
  acaoNecessaria: string;
  createdAt: Date;
}
