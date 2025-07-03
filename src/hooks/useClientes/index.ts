
import { 
  filterClientesBySearchTerm, 
  filterClientesByOrigin, 
  getFilteredClientesByOriginAndSearch 
} from './filters';
import { useClientesState } from './state';
import { useClienteOperations } from './operations';
import { useClienteNotifications } from './notifications';
import { UseClientesReturn } from './types';

export function useClientes(): UseClientesReturn {
  // State management
  const {
    clientes,
    setClientes,
    searchTerm,
    setSearchTerm,
    loadAllClientes,
    forceReload,
  } = useClientesState();

  // Notification management
  const { addNotificationForNewClient } = useClienteNotifications();

  // Client operations
  const {
    addCliente,
    adicionarCliente,
    atualizarCliente,
    removerCliente,
  } = useClienteOperations(setClientes, addNotificationForNewClient);

  // Filtros calculados
  const clientesManuais = filterClientesByOrigin(clientes, 'manual');
  const clientesFormulario = filterClientesByOrigin(clientes, 'formulario');
  const filteredClientes = filterClientesBySearchTerm(clientes, searchTerm);
  const filteredClientesManuais = getFilteredClientesByOriginAndSearch(clientes, 'manual', searchTerm);
  const filteredClientesFormulario = getFilteredClientesByOriginAndSearch(clientes, 'formulario', searchTerm);

  return {
    clientes,
    clientesManuais,
    clientesFormulario,
    filteredClientes,
    filteredClientesManuais,
    filteredClientesFormulario,
    searchTerm,
    setSearchTerm,
    adicionarCliente,
    addCliente,
    atualizarCliente,
    removerCliente,
    loadAllClientes,
    forceReload,
  };
}
