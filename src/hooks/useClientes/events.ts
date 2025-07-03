
export const setupGlobalEventListeners = (reloadCallback: () => void) => {
  console.log('[useClientes/events] 🎧 Registrando listener para eventos globais...');
  
  const handleClienteAdicionado = (event: CustomEvent) => {
    console.log('[useClientes/events] 🔔 EVENTO GLOBAL DETECTADO - Cliente adicionado!', event.detail);
    
    // Forçar recarregamento imediato
    setTimeout(() => {
      console.log('[useClientes/events] 🔄 Recarregando devido a evento global...');
      reloadCallback();
    }, 100);
  };

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'clientes') {
      console.log('[useClientes/events] 🔔 STORAGE EVENT DETECTADO para clientes!');
      
      setTimeout(() => {
        console.log('[useClientes/events] 🔄 Recarregando devido a storage event...');
        reloadCallback();
      }, 100);
    }
  };

  // Registrar os listeners
  window.addEventListener('clienteAdicionado', handleClienteAdicionado as EventListener);
  window.addEventListener('storage', handleStorageChange);

  return () => {
    window.removeEventListener('clienteAdicionado', handleClienteAdicionado as EventListener);
    window.removeEventListener('storage', handleStorageChange);
  };
};
