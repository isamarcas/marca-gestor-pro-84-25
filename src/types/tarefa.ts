
export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  marcaId: string;
  responsavel: string;
  prazo: Date;
  status: 'pendente' | 'em_andamento' | 'concluida';
  prioridade: 'baixa' | 'media' | 'alta';
  createdAt: Date;
  // Novos campos
  tipoTarefa: 'resposta_exigencia' | 'renovacao' | 'defesa_oposicao' | 'documentacao' | 'acompanhamento' | 'outros';
  tempoEstimado?: number;
  anexos: string[]; // Document IDs
  comentarios: ComentarioTarefa[];
}

export interface ComentarioTarefa {
  id: string;
  tarefaId: string;
  autor: string;
  comentario: string;
  dataComentario: Date;
  anexos?: string[]; // Document IDs
}
