
import { TarefasHeader } from '@/components/Tarefas/TarefasHeader';
import { StatsCards } from '@/components/Tarefas/StatsCards';
import { TarefasList } from '@/components/Tarefas/TarefasList';
import { DetalheTarefaModal } from '@/components/Tarefas/DetalheTarefaModal';
import { VisualizarTarefaModal } from '@/components/Tarefas/VisualizarTarefaModal';
import { EditarTarefaModal } from '@/components/Tarefas/EditarTarefaModal';
import { useTarefasData } from './hooks/useTarefasData';
import { useTarefasHandlers } from './hooks/useTarefasHandlers';
import { ComentarioTarefa } from '@/types/tarefa';

interface TarefaParaEdicao {
  id: string;
  titulo: string;
  descricao: string;
  marcaId: string;
  responsavel: string;
  prazo: Date;
  status: 'pendente' | 'em_andamento' | 'concluida';
  prioridade: 'baixa' | 'media' | 'alta';
  tipoTarefa: 'resposta_exigencia' | 'renovacao' | 'defesa_oposicao' | 'documentacao' | 'acompanhamento' | 'outros';
  tempoEstimado?: number;
  createdAt: Date;
  anexos: string[];
  comentarios: ComentarioTarefa[];
  isTarefaGeral?: boolean;
}

export default function TarefasPage() {
  const {
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
    marcarTarefaGeralConcluida,
    handleMarcarConcluida,
    handleVerDetalhes,
    handleVisualizarTarefa,
    handleEditarTarefa,
    handleFecharDetalhes,
    handleFecharVisualizacao,
    handleFecharEdicao,
    handleSalvarEdicao,
    adicionarTarefa,
    adicionarTarefaGeral,
    handleFiltrar,
    handleAlterarStatus
  } = useTarefasData();

  const {
    handleMarcarTarefaConcluida,
    handleVerDetalhesTarefa,
    handleEditarTarefaCard
  } = useTarefasHandlers(
    todasTarefas,
    tarefas,
    marcarTarefaGeralConcluida,
    handleMarcarConcluida,
    handleVisualizarTarefa,
    handleVerDetalhes,
    handleEditarTarefa
  );

  const convertTarefaDetalhadaToTarefaParaEdicao = (tarefaDetalhada: any): TarefaParaEdicao | null => {
    if (!tarefaDetalhada) return null;

    let prazoDate: Date;
    if (typeof tarefaDetalhada.prazo === 'string') {
      prazoDate = new Date(tarefaDetalhada.prazo);
    } else if (tarefaDetalhada.prazo instanceof Date) {
      prazoDate = tarefaDetalhada.prazo;
    } else if (tarefaDetalhada.prazo && typeof tarefaDetalhada.prazo === 'object' && tarefaDetalhada.prazo._type === 'Date') {
      prazoDate = new Date(tarefaDetalhada.prazo.value.iso || tarefaDetalhada.prazo.value.value);
    } else {
      prazoDate = new Date();
    }

    let createdAtDate: Date;
    if (typeof tarefaDetalhada.createdAt === 'string') {
      createdAtDate = new Date(tarefaDetalhada.createdAt);
    } else if (tarefaDetalhada.createdAt instanceof Date) {
      createdAtDate = tarefaDetalhada.createdAt;
    } else if (tarefaDetalhada.createdAt && typeof tarefaDetalhada.createdAt === 'object' && tarefaDetalhada.createdAt._type === 'Date') {
      createdAtDate = new Date(tarefaDetalhada.createdAt.value.iso || tarefaDetalhada.createdAt.value.value);
    } else {
      createdAtDate = new Date();
    }

    if (isNaN(prazoDate.getTime())) {
      prazoDate = new Date();
    }

    if (isNaN(createdAtDate.getTime())) {
      createdAtDate = new Date();
    }

    let isTarefaGeral: boolean = false;
    if (typeof tarefaDetalhada.isTarefaGeral === 'boolean') {
      isTarefaGeral = tarefaDetalhada.isTarefaGeral;
    } else if (tarefaDetalhada.isTarefaGeral && typeof tarefaDetalhada.isTarefaGeral === 'object') {
      if (tarefaDetalhada.isTarefaGeral.value === true || tarefaDetalhada.isTarefaGeral.value === 'true') {
        isTarefaGeral = true;
      }
    }

    return {
      id: tarefaDetalhada.id,
      titulo: tarefaDetalhada.titulo,
      descricao: tarefaDetalhada.descricao || '',
      marcaId: tarefaDetalhada.marcaId || '',
      responsavel: tarefaDetalhada.responsavel || (isTarefaGeral ? 'Sistema' : ''),
      prazo: prazoDate,
      status: tarefaDetalhada.status,
      prioridade: tarefaDetalhada.prioridade,
      tipoTarefa: tarefaDetalhada.tipoTarefa || 'outros',
      tempoEstimado: tarefaDetalhada.tempoEstimado || 0,
      createdAt: createdAtDate,
      anexos: tarefaDetalhada.anexos || [],
      comentarios: tarefaDetalhada.comentarios || [],
      isTarefaGeral: isTarefaGeral
    };
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8 max-w-7xl mx-auto min-h-full w-full" style={{ backgroundColor: '#f9fafb' }}>
      <TarefasHeader
        filtroStatus={filtroStatus}
        onFiltrar={handleFiltrar}
        onAddTarefa={adicionarTarefa}
        onAddTarefaGeral={adicionarTarefaGeral}
      />

      <StatsCards stats={statsAtualizadas} />

      <TarefasList
        tarefas={tarefasFiltradas}
        filtroStatus={filtroStatus}
        onMarcarConcluida={handleMarcarTarefaConcluida}
        onVerDetalhes={handleVerDetalhesTarefa}
        onEditarTarefa={handleEditarTarefaCard}
      />

      <DetalheTarefaModal
        tarefa={tarefaSelecionadaFormatada}
        open={modalDetalhesAberto}
        onOpenChange={handleFecharDetalhes}
        onAlterarStatus={(id: number, novoStatus: 'pendente' | 'em_andamento' | 'concluido') => {
          if (tarefaSelecionada) {
            handleAlterarStatus(novoStatus);
          }
        }}
      />

      <VisualizarTarefaModal
        tarefa={tarefaSelecionadaDetalhada}
        open={modalVisualizacaoAberto}
        onOpenChange={handleFecharVisualizacao}
        onEditarTarefa={(tarefa) => {
          handleFecharVisualizacao();
          const tarefaConvertida = convertTarefaDetalhadaToTarefaParaEdicao(tarefa);
          if (tarefaConvertida) {
            handleEditarTarefa(tarefaConvertida);
          }
        }}
      />

      <EditarTarefaModal
        tarefa={convertTarefaDetalhadaToTarefaParaEdicao(tarefaSelecionada)}
        open={modalEdicaoAberto}
        onOpenChange={handleFecharEdicao}
        onSalvarTarefa={handleSalvarEdicao}
      />
    </div>
  );
}
