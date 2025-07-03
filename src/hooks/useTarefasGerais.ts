
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface TarefaGeral {
  id: string;
  titulo: string;
  descricao: string;
  prazo?: Date;
  prioridade: 'alta' | 'media' | 'baixa';
  categoria: 'lembrete' | 'pessoal' | 'trabalho' | 'outros';
  status: 'pendente' | 'concluida';
  createdAt: Date;
}

const STORAGE_KEY = 'tarefas_gerais';

export function useTarefasGerais() {
  const [tarefasGerais, setTarefasGerais] = useState<TarefaGeral[]>([]);
  const { toast } = useToast();

  // Carregar tarefas do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const tarefasComDatas = parsed.map((tarefa: any) => {
          console.log('Processando tarefa do storage:', tarefa);
          
          return {
            ...tarefa,
            createdAt: tarefa.createdAt ? new Date(tarefa.createdAt) : new Date(),
            prazo: tarefa.prazo ? new Date(tarefa.prazo) : undefined
          };
        });
        console.log('Tarefas carregadas com datas processadas:', tarefasComDatas);
        setTarefasGerais(tarefasComDatas);
      } catch (error) {
        console.error('Erro ao carregar tarefas gerais:', error);
      }
    }
  }, []);

  // Salvar no localStorage quando tarefas mudarem
  useEffect(() => {
    console.log('Salvando tarefas gerais:', tarefasGerais);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefasGerais));
  }, [tarefasGerais]);

  const adicionarTarefaGeral = (novaTarefa: Omit<TarefaGeral, 'id' | 'createdAt' | 'status'>) => {
    const tarefa: TarefaGeral = {
      ...novaTarefa,
      id: Date.now().toString(),
      status: 'pendente',
      createdAt: new Date(),
    };

    console.log('Adicionando nova tarefa geral:', tarefa);
    setTarefasGerais(prev => [tarefa, ...prev]);

    toast({
      title: "Tarefa geral criada!",
      description: `"${tarefa.titulo}" foi adicionada com sucesso.`,
    });
  };

  const marcarTarefaGeralConcluida = (id: string) => {
    console.log('Marcando tarefa geral como concluída:', id);
    setTarefasGerais(prev => 
      prev.map(tarefa => 
        tarefa.id === id 
          ? { ...tarefa, status: 'concluida' as const }
          : tarefa
      )
    );

    const tarefa = tarefasGerais.find(t => t.id === id);
    toast({
      title: "Tarefa concluída!",
      description: `"${tarefa?.titulo}" foi marcada como concluída.`,
    });
  };

  const atualizarTarefaGeral = (id: string, dadosAtualizados: Partial<TarefaGeral>) => {
    console.log('Atualizando tarefa geral:', id, dadosAtualizados);
    setTarefasGerais(prev => 
      prev.map(tarefa => 
        tarefa.id === id 
          ? { ...tarefa, ...dadosAtualizados }
          : tarefa
      )
    );

    toast({
      title: "Tarefa atualizada!",
      description: `A tarefa foi atualizada com sucesso.`,
    });
  };

  const removerTarefaGeral = (id: string) => {
    setTarefasGerais(prev => prev.filter(tarefa => tarefa.id !== id));
    toast({
      title: "Tarefa removida!",
      description: "A tarefa geral foi removida com sucesso.",
    });
  };

  return {
    tarefasGerais,
    adicionarTarefaGeral,
    marcarTarefaGeralConcluida,
    atualizarTarefaGeral,
    removerTarefaGeral
  };
}
