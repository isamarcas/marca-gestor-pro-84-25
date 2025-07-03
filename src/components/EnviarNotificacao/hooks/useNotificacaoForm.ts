
import { useForm } from 'react-hook-form';
import { useNotificacoes } from '@/hooks/useNotificacoes';
import { useClientes } from '@/hooks/useClientes';
import { toast } from '@/hooks/use-toast';
import { FormData } from '../types';

export function useNotificacaoForm(onClose: () => void) {
  const { adicionarNotificacao } = useNotificacoes();
  const { clientes } = useClientes();
  
  console.log('useNotificacaoForm: Lista de clientes disponíveis:', clientes.map(c => ({ id: c.id, nome: c.nome })));
  
  const form = useForm<FormData>({
    defaultValues: {
      clienteId: '',
      titulo: '',
      mensagem: '',
      tipo: 'info',
      categoria: 'geral',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('useNotificacaoForm: Dados do formulário:', data);
    
    adicionarNotificacao({
      titulo: data.titulo,
      mensagem: data.mensagem,
      tipo: data.tipo,
      categoria: data.categoria,
      clienteId: data.clienteId,
      lida: false,
    });
    
    const cliente = clientes.find(c => c.id === data.clienteId);
    console.log('useNotificacaoForm: Cliente encontrado:', cliente);
    
    toast({
      title: 'Notificação enviada',
      description: `Notificação enviada para ${cliente?.nome || 'Cliente'}`,
    });
    
    form.reset();
    onClose();
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    clientes
  };
}
