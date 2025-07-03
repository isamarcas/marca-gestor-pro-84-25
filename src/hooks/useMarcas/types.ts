
import { Marca, HistoricoProcesso } from '@/types';

export interface MarcasStats {
  totalMarcas: number;
  emAnalise: number;
  deferidas: number;
  alertas: number;
}

export interface UseMarcasReturn {
  marcas: Marca[];
  isLoading: boolean;
  addMarca: (novaMarca: Marca) => void;
  updateMarca: (marcaId: string, updates: Partial<Marca>) => void;
  deleteMarca: (marcaId: string) => void;
  getMarcasByClient: (clienteId: string) => Marca[];
  getEstatisticas: () => MarcasStats;
  getEstatisticasCliente: (clienteId: string) => MarcasStats;
  // Legacy methods
  adicionarMarca: (novaMarca: Omit<Marca, 'id' | 'createdAt' | 'updatedAt'>) => void;
  atualizarMarca: (id: string, dadosAtualizados: Partial<Marca>) => void;
  removerMarca: (id: string) => void;
}

export const STORAGE_KEY = 'marcas';
