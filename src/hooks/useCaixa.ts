
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { adicionarAtividade } from '@/hooks/useAtividades';

export interface MovimentoCaixa {
  id: string;
  data: Date;
  tipo: 'entrada' | 'saida';
  descricao: string;
  valor: number;
  categoria: string;
  formaPagamento: string;
  hora: string;
}

const STORAGE_KEY = 'movimentos_caixa';

const saveMovimentosToStorage = (movimentos: MovimentoCaixa[]) => {
  try {
    const serialized = movimentos.map(movimento => ({
      ...movimento,
      data: movimento.data.toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch (error) {
    console.error('Erro ao salvar movimentos no localStorage:', error);
  }
};

const loadMovimentosFromStorage = (): MovimentoCaixa[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const parsed = JSON.parse(stored);
    return parsed.map((movimento: any) => ({
      ...movimento,
      data: new Date(movimento.data)
    }));
  } catch (error) {
    console.error('Erro ao carregar movimentos do localStorage:', error);
    return [];
  }
};

export function useCaixa() {
  const [movimentos, setMovimentos] = useState<MovimentoCaixa[]>([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todos');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initialMovimentos = loadMovimentosFromStorage();
    setMovimentos(initialMovimentos);
  }, []);

  const handleCategoriaFiltroChange = (categoria: string) => {
    setCategoriaFiltro(categoria);
    toast({
      title: "Filtro aplicado",
      description: `Exibindo movimentações da categoria: ${categoria === 'todos' ? 'todas' : categoria}`,
    });
  };

  const movimentosFiltrados = movimentos.filter(movimento => {
    return categoriaFiltro === 'todos' || movimento.categoria === categoriaFiltro;
  });

  const registrarMovimento = async (movimento: {
    descricao: string;
    valor: number;
    tipo: 'entrada' | 'saida';
    formaPagamento: string;
    categoria?: string;
  }): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const novoMovimento: MovimentoCaixa = {
        ...movimento,
        categoria: movimento.categoria || 'Outros',
        id: Date.now().toString(),
        data: new Date(),
        hora: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      const novosMovimentos = [...movimentos, novoMovimento];
      setMovimentos(novosMovimentos);
      saveMovimentosToStorage(novosMovimentos);

      // Registrar atividade
      const tipoMovimento = movimento.tipo === 'entrada' ? 'recebido' : 'pago';
      adicionarAtividade({
        tipo: 'documento',
        titulo: `Movimento de caixa: ${movimento.tipo}`,
        descricao: `R$ ${movimento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ${tipoMovimento} - ${movimento.descricao}`,
      });

      toast({
        title: `${movimento.tipo === 'entrada' ? 'Entrada' : 'Saída'} registrada!`,
        description: `Movimento de R$ ${movimento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} foi registrado.`,
      });

      return true;
    } catch (error) {
      console.error('Erro ao registrar movimento:', error);
      toast({
        title: "Erro ao registrar movimento",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  
  const movimentosHoje = movimentos.filter(m => {
    const dataMovimento = new Date(m.data);
    dataMovimento.setHours(0, 0, 0, 0);
    return dataMovimento.getTime() === hoje.getTime();
  });

  const totalEntradas = movimentos.filter(m => m.tipo === 'entrada').reduce((acc, m) => acc + m.valor, 0);
  const totalSaidas = movimentos.filter(m => m.tipo === 'saida').reduce((acc, m) => acc + m.valor, 0);
  const saldoAtual = totalEntradas - totalSaidas;

  const entradasHoje = movimentosHoje.filter(m => m.tipo === 'entrada').reduce((acc, m) => acc + m.valor, 0);
  const saidasHoje = movimentosHoje.filter(m => m.tipo === 'saida').reduce((acc, m) => acc + m.valor, 0);
  const saldoDia = entradasHoje - saidasHoje;

  return {
    movimentos: movimentosFiltrados,
    movimentosHoje,
    registrarMovimento,
    totalEntradas,
    totalSaidas,
    saldoAtual,
    saldoTotal: saldoAtual,
    entradasHoje,
    saidasHoje,
    saldoDia,
    categoriaFiltro,
    handleCategoriaFiltroChange,
    isLoading
  };
}
