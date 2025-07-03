
import { useState, useEffect, useCallback } from 'react';
import { Cliente } from '@/types';
import { 
  loadClientes, 
  subscribeToStorageChanges, 
  forceReloadWithDebug 
} from './storage';
import { setupGlobalEventListeners } from './events';

export function useClientesState() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Função de carregamento com log detalhado
  const loadAllClientes = useCallback(() => {
    const clientesCarregados = loadClientes();
    setClientes(clientesCarregados);
    return clientesCarregados;
  }, []);

  // Inicialização com múltiplas tentativas
  useEffect(() => {
    console.log('[useClientes/state] 🚀 INICIALIZANDO ESTADO...');
    
    // Primeira tentativa imediata
    loadAllClientes();
    
    // Segunda tentativa após um pequeno delay
    const timer = setTimeout(() => {
      console.log('[useClientes/state] ⏰ Segunda tentativa de carregamento...');
      loadAllClientes();
    }, 200);
    
    return () => clearTimeout(timer);
  }, [loadAllClientes]);

  // Listener para mudanças no storage
  useEffect(() => {
    const unsubscribe = subscribeToStorageChanges(() => {
      const clientesAtualizados = loadClientes();
      console.log('[useClientes/state] ✅ Clientes recarregados:', clientesAtualizados.length);
      setClientes(clientesAtualizados);
    });

    return unsubscribe;
  }, []);

  // Listener para eventos globais
  useEffect(() => {
    const cleanup = setupGlobalEventListeners(loadAllClientes);
    return cleanup;
  }, [loadAllClientes]);

  // Log do estado sempre que mudar
  useEffect(() => {
    console.log('[useClientes/state] 📈 ESTADO ATUAL ATUALIZADO:', {
      total: clientes.length,
      detalhes: clientes.map(c => ({ id: c.id, nome: c.nome, email: c.email, origem: c.origem }))
    });
  }, [clientes]);

  const forceReload = useCallback(() => {
    const clientesRecarregados = forceReloadWithDebug();
    setClientes(clientesRecarregados);
    return clientesRecarregados;
  }, []);

  return {
    clientes,
    setClientes,
    searchTerm,
    setSearchTerm,
    loadAllClientes,
    forceReload,
  };
}
