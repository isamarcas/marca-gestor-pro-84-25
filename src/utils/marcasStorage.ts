
import { Marca } from '@/types';

const STORAGE_KEY_PREFIX = 'marcas_cliente_';
const STORAGE_KEY_GLOBAL = 'marcas_sistema';

export const loadMarcasFromStorage = (clienteId?: string): Marca[] => {
  try {
    const storageKey = clienteId ? `${STORAGE_KEY_PREFIX}${clienteId}` : STORAGE_KEY_GLOBAL;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      const parsed = JSON.parse(saved).map((marca: any) => ({
        ...marca,
        dataDeposito: new Date(marca.dataDeposito),
        proximoPrazo: new Date(marca.proximoPrazo),
        createdAt: new Date(marca.createdAt),
        updatedAt: new Date(marca.updatedAt),
        historicoProcesso: marca.historicoProcesso?.map((h: any) => ({
          ...h,
          data: new Date(h.data)
        })) || []
      }));
      
      console.log(`Marcas carregadas para ${clienteId || 'global'}:`, parsed.length);
      return parsed;
    }
    
    return [];
  } catch (error) {
    console.error('Erro ao carregar marcas:', error);
    return [];
  }
};

export const saveMarcasToStorage = (marcas: Marca[], clienteId?: string) => {
  try {
    const storageKey = clienteId ? `${STORAGE_KEY_PREFIX}${clienteId}` : STORAGE_KEY_GLOBAL;
    localStorage.setItem(storageKey, JSON.stringify(marcas));
    console.log(`Marcas salvas para ${clienteId || 'global'}:`, marcas.length);
  } catch (error) {
    console.error('Erro ao salvar marcas:', error);
  }
};

export const adicionarMarcaAoCliente = (marca: Marca, clienteId: string) => {
  const marcasCliente = loadMarcasFromStorage(clienteId);
  const marcasAtualizadas = [...marcasCliente, marca];
  saveMarcasToStorage(marcasAtualizadas, clienteId);
  
  // Também salvar no sistema global
  const marcasGlobais = loadMarcasFromStorage();
  const marcasGlobaisAtualizadas = [...marcasGlobais, marca];
  saveMarcasToStorage(marcasGlobaisAtualizadas);
  
  return true;
};

export const atualizarMarcaDoCliente = (marcaId: string, updates: Partial<Marca>, clienteId: string) => {
  const marcasCliente = loadMarcasFromStorage(clienteId);
  const marcasAtualizadas = marcasCliente.map(m => 
    m.id === marcaId ? { ...m, ...updates, updatedAt: new Date() } : m
  );
  saveMarcasToStorage(marcasAtualizadas, clienteId);
  
  // Também atualizar no sistema global
  const marcasGlobais = loadMarcasFromStorage();
  const marcasGlobaisAtualizadas = marcasGlobais.map(m => 
    m.id === marcaId ? { ...m, ...updates, updatedAt: new Date() } : m
  );
  saveMarcasToStorage(marcasGlobaisAtualizadas);
  
  return true;
};
