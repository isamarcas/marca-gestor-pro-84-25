
import { Cliente } from '@/types';
import { 
  forceLoadClientes, 
  forceSaveClientes, 
  addClienteToStorage, 
  clientesStorageManager,
  debugStorage
} from '@/hooks/useClientesStorage';

export const loadClientes = (): Cliente[] => {
  console.log('[useClientes/storage] 🔄 CARREGANDO TODOS OS CLIENTES...');
  
  try {
    const clientesCarregados = forceLoadClientes();
    console.log('[useClientes/storage] 📊 Resultado do carregamento:', clientesCarregados.length, 'clientes');
    
    if (clientesCarregados.length > 0) {
      console.log('[useClientes/storage] 📋 Clientes carregados:', clientesCarregados.map(c => ({
        id: c.id,
        nome: c.nome,
        email: c.email,
        origem: c.origem
      })));
    } else {
      console.log('[useClientes/storage] ⚠️ NENHUM CLIENTE ENCONTRADO');
    }
    
    return clientesCarregados;
  } catch (error) {
    console.error('[useClientes/storage] 💥 Erro ao carregar clientes:', error);
    return [];
  }
};

export const saveCliente = (novoCliente: Cliente): boolean => {
  console.log('[useClientes/storage] 🆕 ADICIONANDO NOVO CLIENTE:', novoCliente.email);
  
  const sucesso = addClienteToStorage(novoCliente);
  
  if (sucesso) {
    console.log('[useClientes/storage] ✅ Cliente adicionado ao storage com sucesso');
  } else {
    console.error('[useClientes/storage] ❌ Falha ao adicionar cliente');
  }
  
  return sucesso;
};

export const updateCliente = (id: string, dadosAtualizados: Partial<Cliente>): void => {
  const clientesAtuais = forceLoadClientes();
  const novosClientes = clientesAtuais.map(cliente => {
    if (cliente.id === id) {
      return { ...cliente, ...dadosAtualizados, updatedAt: new Date() };
    }
    return cliente;
  });
  
  forceSaveClientes(novosClientes);
};

export const deleteCliente = (id: string): Cliente[] => {
  const clientesAtuais = forceLoadClientes();
  const novosClientes = clientesAtuais.filter(cliente => cliente.id !== id);
  
  forceSaveClientes(novosClientes);
  return novosClientes;
};

export const subscribeToStorageChanges = (callback: () => void) => {
  console.log('[useClientes/storage] 🎧 Registrando listener para mudanças...');
  
  const unsubscribe = clientesStorageManager.subscribe(() => {
    console.log('[useClientes/storage] 🔔 MUDANÇA DETECTADA NO STORAGE!');
    
    // Aguardar um momento e executar callback
    setTimeout(() => {
      console.log('[useClientes/storage] 🔄 Executando callback após mudança...');
      callback();
    }, 50);
  });

  return unsubscribe;
};

export const forceReloadWithDebug = (): Cliente[] => {
  console.log('[useClientes/storage] 🔄 RELOAD MANUAL SOLICITADO...');
  debugStorage();
  
  // Múltiplas tentativas de reload
  const clientesRecarregados = loadClientes();
  
  // Segunda tentativa após delay
  setTimeout(() => {
    console.log('[useClientes/storage] 🔄 Segunda tentativa de reload...');
    const segundaTentativa = loadClientes();
    console.log('[useClientes/storage] 📊 Segunda tentativa resultado:', segundaTentativa.length, 'clientes');
  }, 200);
  
  console.log('[useClientes/storage] ✅ Reload manual concluído:', clientesRecarregados.length, 'clientes');
  return clientesRecarregados;
};
