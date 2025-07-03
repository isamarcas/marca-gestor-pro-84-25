
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tarefa } from '@/types';
import { saveTarefasToStorage, loadTarefasFromStorage } from '@/lib/storage';
import { useMarcas } from '@/hooks/useMarcas';
import { useClientes } from '@/hooks/useClientes';
import { adicionarAtividade } from '@/hooks/useAtividades';

export function useTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<string>('todas');
  const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(null);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [modalVisualizacaoAberto, setModalVisualizacaoAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const { toast } = useToast();
  const { marcas } = useMarcas();
  const { clientes } = useClientes();

  useEffect(() => {
    const storedTarefas = loadTarefasFromStorage();
    if (storedTarefas) {
      setTarefas(storedTarefas);
    }
  }, []);

  useEffect(() => {
    saveTarefasToStorage(tarefas);
  }, [tarefas]);

  const adicionarTarefa = (novaTarefa: Omit<Tarefa, 'id' | 'createdAt'>) => {
    const tarefa: Tarefa = {
      ...novaTarefa,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    const novasTarefas = [tarefa, ...tarefas];
    setTarefas(novasTarefas);

    // Encontrar a marca relacionada
    const marca = marcas.find(m => m.id === tarefa.marcaId);
    
    // Registrar atividade
    adicionarAtividade({
      tipo: 'tarefa',
      titulo: `Nova tarefa criada: ${tarefa.titulo}`,
      descricao: `Tarefa "${tarefa.titulo}" foi adicionada`,
      marca: marca?.nome,
      cliente: marca?.titular
    });

    toast({
      title: "Tarefa criada!",
      description: `A tarefa "${tarefa.titulo}" foi adicionada com sucesso.`,
    });
  };

  const marcarTarefaConcluida = (id: string) => {
    const novasTarefas = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        const tarefaAtualizada = { ...tarefa, status: 'concluida' as const };
        
        // Encontrar a marca relacionada
        const marca = marcas.find(m => m.id === tarefa.marcaId);
        
        // Registrar atividade
        adicionarAtividade({
          tipo: 'tarefa',
          titulo: `Tarefa concluída: ${tarefa.titulo}`,
          descricao: `Tarefa "${tarefa.titulo}" foi marcada como concluída`,
          marca: marca?.nome,
          cliente: marca?.titular
        });

        return tarefaAtualizada;
      }
      return tarefa;
    });

    setTarefas(novasTarefas);
    
    const tarefa = tarefas.find(t => t.id === id);
    toast({
      title: "Tarefa concluída!",
      description: `"${tarefa?.titulo}" foi marcada como concluída.`,
    });
  };

  const removerTarefa = (id: string) => {
    setTarefas(prev => prev.filter(tarefa => tarefa.id !== id));
    toast({
      title: "Tarefa removida!",
      description: "A tarefa foi removida com sucesso.",
    });
  };

  const getTarefa = (id: string) => {
    return tarefas.find(tarefa => tarefa.id === id);
  };

  const atualizarTarefa = (id: string, updates: Partial<Tarefa>) => {
    const novasTarefas = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        const tarefaAtualizada = { ...tarefa, ...updates };
        
        // Encontrar a marca relacionada
        const marca = marcas.find(m => m.id === tarefaAtualizada.marcaId);
        
        // Registrar atividade
        adicionarAtividade({
          tipo: 'tarefa',
          titulo: `Tarefa atualizada: ${tarefaAtualizada.titulo}`,
          descricao: `Tarefa "${tarefaAtualizada.titulo}" foi atualizada`,
          marca: marca?.nome,
          cliente: marca?.titular
        });

        return tarefaAtualizada;
      }
      return tarefa;
    });
    setTarefas(novasTarefas);
    toast({
      title: "Tarefa atualizada!",
      description: "A tarefa foi atualizada com sucesso.",
    });
  };

  const handleFiltrar = (status: string) => {
    setFiltroStatus(status);
  };

  const handleVerDetalhes = (tarefa: Tarefa) => {
    setTarefaSelecionada(tarefa);
    setModalDetalhesAberto(true);
  };

  const handleVisualizarTarefa = (tarefa: Tarefa) => {
    setTarefaSelecionada(tarefa);
    setModalVisualizacaoAberto(true);
  };

  const handleEditarTarefa = (tarefa: Tarefa) => {
    setTarefaSelecionada(tarefa);
    setModalEdicaoAberto(true);
  };

  const handleFecharDetalhes = () => {
    setModalDetalhesAberto(false);
    setTarefaSelecionada(null);
  };

  const handleFecharVisualizacao = () => {
    setModalVisualizacaoAberto(false);
    setTarefaSelecionada(null);
  };

  const handleFecharEdicao = () => {
    setModalEdicaoAberto(false);
    setTarefaSelecionada(null);
  };

  const handleSalvarEdicao = (id: string, dadosAtualizados: Partial<Tarefa>) => {
    atualizarTarefa(id, dadosAtualizados);
  };

  const handleAddTarefa = () => {
    // Implementar lógica para adicionar tarefa
    console.log('Adicionar nova tarefa');
  };

  const handleAlterarStatus = (novoStatus: string) => {
    if (tarefaSelecionada) {
      atualizarTarefa(tarefaSelecionada.id, { status: novoStatus as any });
    }
  };

  const tarefasFiltradas = filtroStatus === 'todas' 
    ? tarefas 
    : tarefas.filter(tarefa => tarefa.status === filtroStatus);

  const stats = {
    total: tarefas.length,
    pendentes: tarefas.filter(t => t.status === 'pendente').length,
    emAndamento: tarefas.filter(t => t.status === 'em_andamento').length,
    concluidas: tarefas.filter(t => t.status === 'concluida').length
  };

  return {
    tarefas: tarefasFiltradas,
    filtroStatus,
    stats,
    tarefaSelecionada,
    modalDetalhesAberto,
    modalVisualizacaoAberto,
    modalEdicaoAberto,
    adicionarTarefa,
    removerTarefa,
    getTarefa,
    atualizarTarefa,
    marcarTarefaConcluida,
    handleMarcarConcluida: marcarTarefaConcluida,
    handleVerDetalhes,
    handleVisualizarTarefa,
    handleEditarTarefa,
    handleFecharDetalhes,
    handleFecharVisualizacao,
    handleFecharEdicao,
    handleSalvarEdicao,
    handleAddTarefa,
    handleFiltrar,
    handleAlterarStatus
  };
}
