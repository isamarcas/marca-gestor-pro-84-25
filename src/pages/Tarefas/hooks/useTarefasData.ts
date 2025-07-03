
import { useTarefas } from '@/hooks/useTarefas';
import { useTarefasGerais } from '@/hooks/useTarefasGerais';
import { useMarcas } from '@/hooks/useMarcas';
import { useClientes } from '@/hooks/useClientes';
import { 
  formatTarefasForComponent, 
  formatTarefasGeraisForComponent, 
  calculateCombinedStats,
  formatTarefaSelecionada,
  formatTarefaSelecionadaDetalhada
} from '../utils/tarefasFormatters';

export function useTarefasData() {
  const {
    tarefas,
    filtroStatus,
    stats,
    tarefaSelecionada,
    modalDetalhesAberto,
    modalVisualizacaoAberto,
    modalEdicaoAberto,
    handleMarcarConcluida,
    handleVerDetalhes,
    handleVisualizarTarefa,
    handleEditarTarefa,
    handleFecharDetalhes,
    handleFecharVisualizacao,
    handleFecharEdicao,
    handleSalvarEdicao,
    adicionarTarefa,
    handleFiltrar,
    handleAlterarStatus
  } = useTarefas();

  const { 
    tarefasGerais, 
    adicionarTarefaGeral, 
    marcarTarefaGeralConcluida,
    atualizarTarefaGeral
  } = useTarefasGerais();

  const { marcas } = useMarcas();
  const { clientes } = useClientes();

  const tarefasFormatadas = formatTarefasForComponent(tarefas, marcas, clientes);
  const tarefasGeraisFormatadas = formatTarefasGeraisForComponent(tarefasGerais);
  const todasTarefas = [...tarefasFormatadas, ...tarefasGeraisFormatadas];

  const tarefasFiltradas = filtroStatus === 'todas' 
    ? todasTarefas 
    : todasTarefas.filter(tarefa => {
        if (filtroStatus === 'concluidas') return tarefa.status === 'concluido';
        return tarefa.status === filtroStatus;
      });

  const statsAtualizadas = calculateCombinedStats(todasTarefas);

  const tarefaSelecionadaFormatada = formatTarefaSelecionada(tarefaSelecionada, marcas, clientes);
  const tarefaSelecionadaDetalhada = formatTarefaSelecionadaDetalhada(tarefaSelecionada, marcas, clientes);

  const handleSalvarEdicaoCompleto = (id: string, dadosAtualizados: any) => {
    if (dadosAtualizados.isTarefaGeral) {
      let statusMapeado: 'pendente' | 'concluida';
      
      if (dadosAtualizados.status === 'concluida' || dadosAtualizados.status === 'concluida') {
        statusMapeado = 'concluida';
      } else if (dadosAtualizados.status === 'em_andamento') {
        statusMapeado = 'pendente';
      } else {
        statusMapeado = 'pendente';
      }
      
      const dadosTarefaGeral = {
        titulo: dadosAtualizados.titulo,
        descricao: dadosAtualizados.descricao || '',
        prazo: dadosAtualizados.prazo,
        status: statusMapeado,
        prioridade: dadosAtualizados.prioridade,
        categoria: dadosAtualizados.tipoTarefa || 'outros'
      };
      atualizarTarefaGeral(id, dadosTarefaGeral);
    } else {
      handleSalvarEdicao(id, dadosAtualizados);
    }
  };

  return {
    todasTarefas,
    tarefasFiltradas,
    statsAtualizadas,
    tarefaSelecionadaFormatada,
    tarefaSelecionadaDetalhada,
    filtroStatus,
    modalDetalhesAberto,
    modalVisualizacaoAberto,
    modalEdicaoAberto,
    tarefas,
    tarefaSelecionada,
    marcas,
    clientes,
    marcarTarefaGeralConcluida,
    handleMarcarConcluida,
    handleVerDetalhes,
    handleVisualizarTarefa,
    handleEditarTarefa,
    handleFecharDetalhes,
    handleFecharVisualizacao,
    handleFecharEdicao,
    handleSalvarEdicao: handleSalvarEdicaoCompleto,
    adicionarTarefa,
    adicionarTarefaGeral,
    handleFiltrar,
    handleAlterarStatus
  };
}
