
export interface ConfiguracaoSistema {
  id: string;
  chave: string;
  valor: any;
  tipo: 'string' | 'number' | 'boolean' | 'json';
  descricao: string;
  categoria: 'geral' | 'inpi' | 'notificacoes' | 'relatorios';
  updatedAt: Date;
  updatedBy: string;
}

export interface IntegracaoINPI {
  ultimaConsulta: Date;
  statusConexao: 'ativo' | 'inativo' | 'erro';
  numeroConsultasDia: number;
  limiteConsultas: number;
  configuracoes: {
    urlBase: string;
    chaveApi?: string;
    intervaloPadrao: number;
  };
}
