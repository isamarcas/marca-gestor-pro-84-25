
export interface NovaTarefaData {
  titulo: string;
  descricao: string;
  marcaId: string;
  responsavel: string;
  prazo: Date;
  prioridade: 'alta' | 'media' | 'baixa';
  tipoTarefa: 'resposta_exigencia' | 'renovacao' | 'defesa_oposicao' | 'documentacao' | 'acompanhamento' | 'outros';
  status: 'pendente';
  tempoEstimado?: number;
  anexos: string[];
  comentarios: any[];
}

export interface NovaTarefaModalProps {
  onAddTarefa: (tarefa: NovaTarefaData) => void;
}

export interface TarefaFormData {
  titulo: string;
  descricao: string;
  marcaId: string;
  responsavel: string;
  prazo: string;
  prioridade: 'alta' | 'media' | 'baixa';
  tipoTarefa: 'resposta_exigencia' | 'renovacao' | 'defesa_oposicao' | 'documentacao' | 'acompanhamento' | 'outros';
  tempoEstimado: number;
}
