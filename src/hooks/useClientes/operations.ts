
import { useState, useCallback } from 'react';
import { Cliente } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { adicionarAtividade } from '@/hooks/useAtividades';
import { 
  saveCliente, 
  updateCliente, 
  deleteCliente, 
  loadClientes 
} from './storage';

export function useClienteOperations(
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>,
  addNotification: (cliente: Cliente) => void
) {
  const { toast } = useToast();

  // Função PRINCIPAL para adicionar cliente
  const addCliente = useCallback((novoCliente: Cliente) => {
    console.log('[useClientes/operations] 🆕 ADICIONANDO NOVO CLIENTE:', novoCliente.email);
    
    const sucesso = saveCliente(novoCliente);
    
    if (sucesso) {
      console.log('[useClientes/operations] ✅ Cliente adicionado ao storage com sucesso');
      
      // Forçar atualização IMEDIATA do estado local
      setClientes(prev => {
        const novosClientes = [...prev, novoCliente];
        console.log('[useClientes/operations] 🔄 Estado local atualizado imediatamente:', novosClientes.length, 'clientes');
        return novosClientes;
      });
      
      // Criar notificação automática
      addNotification(novoCliente);
      
      // Recarregar do storage após um pequeno delay para garantir sincronização
      setTimeout(() => {
        console.log('[useClientes/operations] 🔄 Recarregando do storage para sincronização...');
        const clientesDoStorage = loadClientes();
        setClientes(clientesDoStorage);
        console.log('[useClientes/operations] ✅ Sincronização completa:', clientesDoStorage.length, 'clientes');
      }, 100);
      
      // Adicionar atividade
      adicionarAtividade({
        tipo: 'cliente',
        titulo: `Novo cliente: ${novoCliente.nome}`,
        descricao: `Cliente "${novoCliente.nome}" foi adicionado${novoCliente.origem === 'formulario' ? ' via formulário' : ''}`,
        cliente: novoCliente.nome
      });
    } else {
      console.error('[useClientes/operations] ❌ Falha ao adicionar cliente');
      toast({
        title: "Cliente já existe",
        description: `O email ${novoCliente.email} já está cadastrado.`,
        variant: "destructive",
      });
    }
    
    return sucesso;
  }, [toast, setClientes, addNotification]);

  // Compatibilidade com código existente
  const adicionarCliente = useCallback((novoClienteForm: Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>) => {
    const cliente: Cliente = {
      ...novoClienteForm,
      id: `cliente-manual-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      origem: novoClienteForm.origem || 'manual',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const sucesso = addCliente(cliente);
    
    if (sucesso) {
      toast({
        title: "Cliente adicionado!",
        description: `${cliente.nome} foi cadastrado com sucesso.`,
      });
    }
    
    return sucesso;
  }, [addCliente, toast]);

  const atualizarCliente = useCallback((id: string, dadosAtualizados: Partial<Cliente>) => {
    updateCliente(id, dadosAtualizados);
    const clientesAtualizados = loadClientes();
    setClientes(clientesAtualizados);
  }, [setClientes]);

  const removerCliente = useCallback((id: string) => {
    const novosClientes = deleteCliente(id);
    setClientes(novosClientes);
    
    toast({
      title: "Cliente removido!",
      description: "O cliente foi removido com sucesso.",
    });
  }, [toast, setClientes]);

  return {
    addCliente,
    adicionarCliente,
    atualizarCliente,
    removerCliente,
  };
}
