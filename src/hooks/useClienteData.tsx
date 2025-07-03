
import { useState, useEffect } from 'react';
import { Cliente } from '@/types';

export function useClienteData(clienteId: string) {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔍 useClienteData: Buscando cliente com ID:', clienteId);
    
    const loadCliente = () => {
      try {
        // Carregar clientes do localStorage com retry
        let clientesData = localStorage.getItem('clientes');
        console.log('🔍 useClienteData: Dados brutos do localStorage:', clientesData);
        
        // Se não encontrou, tentar novamente após um pequeno delay
        if (!clientesData) {
          console.log('⏳ useClienteData: Dados não encontrados, tentando novamente...');
          setTimeout(() => {
            clientesData = localStorage.getItem('clientes');
            if (clientesData) {
              processarClientes(clientesData);
            } else {
              console.log('❌ useClienteData: Nenhum dado encontrado no localStorage após retry');
              setError('Nenhum cliente encontrado no sistema');
              setIsLoading(false);
            }
          }, 500);
          return;
        }

        processarClientes(clientesData);
      } catch (error) {
        console.error('❌ useClienteData: Erro ao carregar cliente:', error);
        setError('Erro ao carregar dados do cliente');
        setIsLoading(false);
      }
    };

    const processarClientes = (clientesData: string) => {
      try {
        const clientes: Cliente[] = JSON.parse(clientesData);
        console.log('🔍 useClienteData: Clientes parseados:', clientes.map(c => ({ id: c.id, nome: c.nome })));
        
        const clienteEncontrado = clientes.find(c => c.id === clienteId);
        console.log('🔍 useClienteData: Cliente encontrado:', clienteEncontrado ? { id: clienteEncontrado.id, nome: clienteEncontrado.nome } : 'null');
        
        if (clienteEncontrado) {
          setCliente(clienteEncontrado);
          setError(null);
          console.log('✅ useClienteData: Cliente carregado com sucesso:', clienteEncontrado.nome);
        } else {
          console.log('❌ useClienteData: Cliente não encontrado com ID:', clienteId);
          console.log('🔍 useClienteData: IDs disponíveis:', clientes.map(c => c.id));
          setError(`Cliente com ID "${clienteId}" não encontrado`);
        }
      } catch (parseError) {
        console.error('❌ useClienteData: Erro ao fazer parse dos dados:', parseError);
        setError('Erro ao processar dados do cliente');
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    setError(null);
    
    // Executar imediatamente e também com delay
    loadCliente();
  }, [clienteId]);

  // Dados mock para marcas e estatísticas
  const marcas = [];
  const stats = {
    totalMarcas: 0,
    emAnalise: 0,
    deferidas: 0,
    alertas: 0,
  };

  return {
    cliente,
    marcas,
    stats,
    isLoading,
    error,
  };
}
