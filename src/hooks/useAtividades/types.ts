
export interface AtividadeRecente {
  id: string;
  tipo: 'marca' | 'cliente' | 'tarefa' | 'contrato' | 'documento' | 'status';
  titulo: string;
  descricao: string;
  data: Date;
  marca?: string;
  cliente?: string;
  detalhes?: Record<string, any>;
}

export type AtividadesGlobais = AtividadeRecente[];
