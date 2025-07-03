
import { Marca } from '@/types';
import { TarefaGeral } from '@/hooks/useTarefasGerais';

export const mapStatusToComponent = (status: 'pendente' | 'em_andamento' | 'concluida'): 'pendente' | 'em_andamento' | 'concluido' => {
  if (status === 'concluida') return 'concluido';
  return status;
};

export const safeToISOString = (date: any) => {
  console.log('safeToISOString recebeu:', date, 'tipo:', typeof date);
  
  if (!date) {
    console.log('Data vazia, usando data atual');
    return new Date().toISOString();
  }
  
  if (typeof date === 'string') {
    try {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        console.error('String de data inválida:', date);
        return new Date().toISOString();
      }
      return parsedDate.toISOString();
    } catch (error) {
      console.error('Erro ao converter string para data:', error);
      return new Date().toISOString();
    }
  }
  
  if (date instanceof Date) {
    if (isNaN(date.getTime())) {
      console.error('Objeto Date inválido:', date);
      return new Date().toISOString();
    }
    return date.toISOString();
  }
  
  // Verificar se é um objeto com propriedades _type e value (formato do localStorage)
  if (typeof date === 'object' && date._type === 'Date' && date.value) {
    try {
      const parsedDate = new Date(date.value.iso || date.value.value);
      if (isNaN(parsedDate.getTime())) {
        console.error('Objeto Date complexo inválido:', date);
        return new Date().toISOString();
      }
      return parsedDate.toISOString();
    } catch (error) {
      console.error('Erro ao converter objeto Date complexo:', error);
      return new Date().toISOString();
    }
  }
  
  console.warn('Tipo de data não reconhecido:', typeof date, date);
  return new Date().toISOString();
};

export const formatTarefasForComponent = (tarefas: any[], marcas: Marca[], clientes: any[]) => {
  return tarefas.map(tarefa => {
    const marca = marcas.find(m => m.id === tarefa.marcaId);
    const cliente = clientes.find(c => c.id === marca?.clienteId);
    
    return {
      id: parseInt(tarefa.id),
      titulo: tarefa.titulo,
      cliente: cliente?.nome || marca?.titular || 'Cliente não encontrado',
      prazo: safeToISOString(tarefa.prazo),
      status: mapStatusToComponent(tarefa.status),
      prioridade: tarefa.prioridade,
      tipo: tarefa.tipoTarefa || 'outros',
      descricao: tarefa.descricao || '',
      isTarefaGeral: false
    };
  });
};

export const formatTarefasGeraisForComponent = (tarefasGerais: TarefaGeral[]) => {
  console.log('formatTarefasGeraisForComponent recebeu:', tarefasGerais);
  
  return tarefasGerais.map(tarefaGeral => {
    console.log('Processando tarefa geral:', tarefaGeral);
    
    const prazoFormatado = safeToISOString(tarefaGeral.prazo);
    console.log('Prazo formatado:', prazoFormatado);
    
    return {
      id: parseInt(tarefaGeral.id),
      titulo: tarefaGeral.titulo,
      cliente: 'Tarefa Geral',
      prazo: prazoFormatado,
      status: tarefaGeral.status === 'concluida' ? 'concluido' as const : 'pendente' as const,
      prioridade: tarefaGeral.prioridade,
      tipo: tarefaGeral.categoria,
      descricao: tarefaGeral.descricao || '',
      isTarefaGeral: true
    };
  });
};

export const calculateCombinedStats = (todasTarefas: any[]) => {
  return {
    total: todasTarefas.length,
    pendentes: todasTarefas.filter(t => t.status === 'pendente').length,
    emAndamento: todasTarefas.filter(t => t.status === 'em_andamento').length,
    concluidas: todasTarefas.filter(t => t.status === 'concluido').length
  };
};

export const formatTarefaSelecionada = (tarefaSelecionada: any, marcas: Marca[], clientes: any[]) => {
  if (!tarefaSelecionada) return null;

  const marca = marcas.find(m => m.id === tarefaSelecionada.marcaId);
  const cliente = clientes.find(c => c.id === marca?.clienteId);

  return {
    id: parseInt(tarefaSelecionada.id),
    titulo: tarefaSelecionada.titulo,
    cliente: cliente?.nome || marca?.titular || 'Cliente não encontrado',
    prazo: safeToISOString(tarefaSelecionada.prazo),
    status: mapStatusToComponent(tarefaSelecionada.status),
    prioridade: tarefaSelecionada.prioridade,
    tipo: tarefaSelecionada.tipoTarefa || 'outros',
    descricao: tarefaSelecionada.descricao || ''
  };
};

export const formatTarefaSelecionadaDetalhada = (tarefaSelecionada: any, marcas: Marca[], clientes: any[]) => {
  if (!tarefaSelecionada) return null;

  console.log('formatTarefaSelecionadaDetalhada recebeu:', tarefaSelecionada);

  // Converter prazo para string ISO segura
  const prazoISO = safeToISOString(tarefaSelecionada.prazo);
  console.log('Prazo convertido para ISO:', prazoISO);

  // Converter createdAt para string ISO segura
  const createdAtISO = safeToISOString(tarefaSelecionada.createdAt);
  console.log('CreatedAt convertido para ISO:', createdAtISO);

  const marca = marcas.find(m => m.id === tarefaSelecionada.marcaId);
  const cliente = clientes.find(c => c.id === marca?.clienteId);

  return {
    ...tarefaSelecionada,
    prazo: prazoISO,
    createdAt: createdAtISO,
    cliente: cliente?.nome || marca?.titular || 'Cliente não encontrado',
    marca: marca?.nome || 'Marca não encontrada'
  };
};
