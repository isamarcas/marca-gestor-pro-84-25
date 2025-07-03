
import { Cliente } from '@/types';

export const filterClientesBySearchTerm = (clientes: Cliente[], searchTerm: string): Cliente[] => {
  return clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cpfCnpj.includes(searchTerm)
  );
};

export const filterClientesByOrigin = (clientes: Cliente[], origem: 'manual' | 'formulario'): Cliente[] => {
  return clientes.filter(cliente => cliente.origem === origem);
};

export const getFilteredClientesByOriginAndSearch = (
  clientes: Cliente[], 
  origem: 'manual' | 'formulario', 
  searchTerm: string
): Cliente[] => {
  const clientesByOrigin = filterClientesByOrigin(clientes, origem);
  return filterClientesBySearchTerm(clientesByOrigin, searchTerm);
};
