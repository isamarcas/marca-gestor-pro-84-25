
import { useState, useEffect, useRef } from 'react';
import { Cliente } from '@/types';
import { useClientes } from '@/hooks/useClientes';

export function useClienteLoader(clienteId: string) {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);
  
  const { clientes, loadAllClientes } = useClientes();

  useEffect(() => {
    const loadCliente = async () => {
      if (loadingRef.current) return;
      
      try {
        loadingRef.current = true;
        setIsLoading(true);
        setError(null);
        
        await loadAllClientes();
        
      } catch (err) {
        setError('Erro ao carregar dados dos clientes');
        setIsLoading(false);
        loadingRef.current = false;
      }
    };

    if (clienteId && !loadingRef.current) {
      loadCliente();
    } else if (!clienteId) {
      setError('ID do cliente não fornecido');
      setIsLoading(false);
    }
  }, [clienteId]);

  useEffect(() => {
    if (clientes.length > 0 && clienteId && loadingRef.current) {
      const clienteEncontrado = clientes.find(c => c.id === clienteId);
      
      if (clienteEncontrado) {
        setCliente(clienteEncontrado);
      } else {
        setError('Cliente não encontrado');
      }
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [clientes, clienteId]);

  return {
    cliente,
    isLoading,
    error
  };
}
