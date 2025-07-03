
export function useTarefasHandlers(
  todasTarefas: any[], 
  tarefas: any[], 
  marcarTarefaGeralConcluida: (id: string) => void,
  handleMarcarConcluida: (id: string) => void,
  handleVisualizarTarefa: (tarefa: any) => void,
  handleVerDetalhes: (tarefa: any) => void,
  handleEditarTarefa: (tarefa: any) => void
) {
  const handleMarcarTarefaConcluida = (id: number) => {
    const tarefa = todasTarefas.find(t => t.id === id);
    
    if (tarefa?.isTarefaGeral) {
      marcarTarefaGeralConcluida(id.toString());
    } else {
      handleMarcarConcluida(id.toString());
    }
  };

  const handleVerDetalhesTarefa = (tarefa: any) => {
    if (!tarefa.isTarefaGeral) {
      const tarefaOriginal = tarefas.find(t => t.id === tarefa.id.toString());
      
      if (tarefaOriginal) {
        handleVisualizarTarefa(tarefaOriginal);
      }
    } else {
      handleVerDetalhes(tarefa);
    }
  };

  const handleEditarTarefaCard = (tarefa: any) => {
    if (!tarefa.isTarefaGeral) {
      const tarefaOriginal = tarefas.find(t => t.id === tarefa.id.toString());
      
      if (tarefaOriginal) {
        handleEditarTarefa(tarefaOriginal);
      }
    } else {
      const tarefaGeralParaEdicao = {
        id: tarefa.id.toString(),
        titulo: tarefa.titulo,
        descricao: tarefa.descricao || '',
        marcaId: '',
        responsavel: 'Sistema',
        prazo: new Date(tarefa.prazo),
        status: tarefa.status === 'concluido' ? 'concluida' : tarefa.status === 'em_andamento' ? 'em_andamento' : 'pendente',
        prioridade: tarefa.prioridade,
        tipoTarefa: tarefa.tipo || 'outros',
        tempoEstimado: 0,
        createdAt: new Date(),
        anexos: [],
        comentarios: [],
        isTarefaGeral: true
      };
      handleEditarTarefa(tarefaGeralParaEdicao);
    }
  };

  return {
    handleMarcarTarefaConcluida,
    handleVerDetalhesTarefa,
    handleEditarTarefaCard
  };
}
