
import { Tarefa } from '@/types';

const STORAGE_KEY = 'tarefas';

export const saveTarefasToStorage = (tarefas: Tarefa[]) => {
  try {
    const serialized = tarefas.map(tarefa => ({
      ...tarefa,
      prazo: tarefa.prazo.toISOString(),
      createdAt: tarefa.createdAt.toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch (error) {
    console.error('Erro ao salvar tarefas no localStorage:', error);
  }
};

export const loadTarefasFromStorage = (): Tarefa[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const parsed = JSON.parse(stored);
    return parsed.map((tarefa: any) => ({
      ...tarefa,
      prazo: new Date(tarefa.prazo),
      createdAt: new Date(tarefa.createdAt)
    }));
  } catch (error) {
    console.error('Erro ao carregar tarefas do localStorage:', error);
    return [];
  }
};
