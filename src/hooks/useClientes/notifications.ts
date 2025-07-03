
import { useCallback } from 'react';
import { Cliente } from '@/types';
import { useNotificacoes } from '@/hooks/useNotificacoes';

export function useClienteNotifications() {
  const { adicionarNotificacao } = useNotificacoes();

  const addNotificationForNewClient = useCallback((novoCliente: Cliente) => {
    console.log('[useClientes/notifications] 🔔 Criando notificação para novo cliente:', novoCliente.nome);
    
    const tipoOrigemTexto = novoCliente.origem === 'formulario' ? 'via formulário online' : 'manualmente';
    
    // Criar notificação após um pequeno delay para garantir que tudo foi salvo
    setTimeout(() => {
      adicionarNotificacao({
        clienteId: 'admin@isamarcas.com.br', // Notificação para o admin
        tipo: 'success',
        categoria: 'geral',
        titulo: `Novo cliente cadastrado: ${novoCliente.nome}`,
        mensagem: `O cliente "${novoCliente.nome}" foi cadastrado ${tipoOrigemTexto}.\n\nDetalhes:\n• Email: ${novoCliente.email}\n• Tipo: ${novoCliente.tipoCliente === 'pessoa_fisica' ? 'Pessoa Física' : 'Pessoa Jurídica'}\n• Telefone: ${novoCliente.telefone}`,
        lida: false
      });
      
      console.log('[useClientes/notifications] ✅ Notificação criada com sucesso');
    }, 500);
  }, [adicionarNotificacao]);

  return {
    addNotificationForNewClient,
  };
}
