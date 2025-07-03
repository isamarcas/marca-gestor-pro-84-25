
import { Cliente } from '@/types';

export interface UseClientesReturn {
  clientes: Cliente[];
  clientesManuais: Cliente[];
  clientesFormulario: Cliente[];
  filteredClientes: Cliente[];
  filteredClientesManuais: Cliente[];
  filteredClientesFormulario: Cliente[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  adicionarCliente: (novoClienteForm: Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>) => boolean;
  addCliente: (novoCliente: Cliente) => boolean;
  atualizarCliente: (id: string, dadosAtualizados: Partial<Cliente>) => void;
  removerCliente: (id: string) => void;
  loadAllClientes: () => Cliente[];
  forceReload: () => Cliente[];
}
