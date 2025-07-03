
import { Cliente } from '@/types';

// Cache for localStorage operations to reduce redundant reads
let clientesCache: Cliente[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const isCacheValid = () => {
  return clientesCache !== null && Date.now() - cacheTimestamp < CACHE_DURATION;
};

const clearCache = () => {
  clientesCache = null;
  cacheTimestamp = 0;
};

// Optimized date processing function
const processClienteDates = (cliente: any): Cliente => {
  return {
    ...cliente,
    totalMarcas: cliente.totalMarcas || 0,
    marcasAtivas: cliente.marcasAtivas || 0,
    createdAt: cliente.createdAt ? new Date(cliente.createdAt) : new Date(),
    updatedAt: cliente.updatedAt ? new Date(cliente.updatedAt) : new Date(),
  };
};

export const loadNewClientesFromStorage = (): Cliente[] => {
  // Return cached version if valid
  if (isCacheValid()) {
    console.log('clientesStorage: Retornando clientes do cache');
    return clientesCache!;
  }

  try {
    const stored = localStorage.getItem("clientes");
    console.log('clientesStorage: localStorage raw data:', stored);
    
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('clientesStorage: Parsed data:', parsed);
      
      // Garantir que sempre retorna array de clientes válidos
      if (Array.isArray(parsed)) {
        const clientesProcessados = parsed.map(cliente => {
          console.log('clientesStorage: Processando cliente:', cliente.id);
          return processClienteDates(cliente);
        });
        
        // Update cache
        clientesCache = clientesProcessados;
        cacheTimestamp = Date.now();
        
        console.log('clientesStorage: Clientes processados e em cache:', clientesProcessados.map(c => ({ id: c.id, nome: c.nome })));
        return clientesProcessados;
      }
    }
    
    console.log('clientesStorage: Nenhum cliente encontrado no localStorage');
    clientesCache = [];
    cacheTimestamp = Date.now();
    return [];
  } catch (error) {
    console.error('clientesStorage: Erro ao carregar do localStorage:', error);
    clientesCache = [];
    cacheTimestamp = Date.now();
    return [];
  }
};

export const saveNewClientesToStorage = (todosClientes: Cliente[]) => {
  try {
    console.log('clientesStorage: Salvando clientes no localStorage:', todosClientes.map(c => ({ id: c.id, nome: c.nome })));
    
    // Optimized serialization - prepare data once
    const clientesParaSalvar = todosClientes.map(cliente => ({
      ...cliente,
      createdAt: cliente.createdAt?.toISOString(),
      updatedAt: cliente.updatedAt?.toISOString(),
    }));
    
    const jsonString = JSON.stringify(clientesParaSalvar);
    localStorage.setItem("clientes", jsonString);
    
    // Update cache immediately after successful save
    clientesCache = todosClientes;
    cacheTimestamp = Date.now();
    
    console.log('clientesStorage: Dados salvos no localStorage e cache atualizado');
    
    // Simplified verification (only in development)
    if (process.env.NODE_ENV === 'development') {
      const verificacao = localStorage.getItem("clientes");
      console.log('clientesStorage: Verificação - dados salvos:', verificacao);
      
      try {
        const verificacaoParsed = JSON.parse(verificacao || '[]');
        console.log('clientesStorage: Verificação - IDs salvos:', verificacaoParsed.map((c: any) => c.id));
      } catch (verifyError) {
        console.error('clientesStorage: Erro na verificação:', verifyError);
      }
    }
    
  } catch (error) {
    console.error('clientesStorage: Erro ao salvar no localStorage:', error);
    // Clear cache on save error to force reload
    clearCache();
  }
};

// Export cache management functions for external use
export const clearClientesCache = clearCache;
export const isClientesCacheValid = isCacheValid;
