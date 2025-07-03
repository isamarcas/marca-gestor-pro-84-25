
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { removeFormatting } from '@/utils/inputMasks';
import { forceLoadClientes } from '@/hooks/useClientesStorage';
import { useNotificacoes } from '@/hooks/useNotificacoes';
import type { NovoClienteFormData } from '../types';

interface UseClienteFormProps {
  onAddCliente: (cliente: Omit<NovoClienteFormData, 'portalId'>) => Promise<boolean>;
  setIsSubmitting: (loading: boolean) => void;
  setOpen: (open: boolean) => void;
}

export function useClienteForm({ onAddCliente, setIsSubmitting, setOpen }: UseClienteFormProps) {
  const { adicionarNotificacao } = useNotificacoes();

  const form = useForm<NovoClienteFormData>({
    defaultValues: {
      nome: '',
      tipoCliente: 'pessoa_juridica',
      cpfCnpj: '',
      email: '',
      telefone: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
      },
      representanteLegal: '',
      segmentoAtuacao: '',
      observacoes: '',
      nacionalidade: '',
      profissao: '',
      estadoCivil: '',
      rg: '',
      orgaoEmissor: '',
    },
  });

  const validateEmail = (value: string) => {
    if (!value) return 'Campo obrigatório';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
    
    console.log('[NovoClienteDialog] 🔍 Validando email:', value);
    const clientesExistentes = forceLoadClientes();
    console.log('[NovoClienteDialog] 📊 Clientes existentes para validação:', clientesExistentes.length);
    
    const emailNormalizado = value.toLowerCase().trim();
    const emailJaExiste = clientesExistentes.some(cliente => 
      cliente.email.toLowerCase().trim() === emailNormalizado
    );
    
    if (emailJaExiste) {
      console.error('[NovoClienteDialog] ❌ Email já existe:', emailNormalizado);
      return 'Este email já está cadastrado no sistema';
    }
    
    console.log('[NovoClienteDialog] ✅ Email disponível:', emailNormalizado);
    return true;
  };

  const onSubmit = async (data: NovoClienteFormData) => {
    console.log('[NovoClienteDialog] 🚀 Iniciando cadastro manual:', data.email);
    setIsSubmitting(true);
    
    try {
      const emailValidation = validateEmail(data.email);
      if (emailValidation !== true) {
        toast({
          title: 'Erro de validação',
          description: emailValidation,
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      const dadosLimpos = {
        ...data,
        cpfCnpj: removeFormatting(data.cpfCnpj),
        telefone: removeFormatting(data.telefone),
        endereco: {
          ...data.endereco,
          cep: removeFormatting(data.endereco.cep),
        },
      };

      console.log('[NovoClienteDialog] 📝 Dados preparados para envio:', {
        email: dadosLimpos.email,
        nome: dadosLimpos.nome
      });

      const sucesso = await onAddCliente(dadosLimpos);

      if (sucesso) {
        console.log('[NovoClienteDialog] ✅ Cadastro manual realizado com sucesso');
        
        setTimeout(() => {
          adicionarNotificacao({
            clienteId: 'admin@isamarcas.com.br',
            tipo: 'info',
            categoria: 'geral',
            titulo: `Cliente cadastrado manualmente`,
            mensagem: `O cliente "${dadosLimpos.nome}" foi cadastrado manualmente pelo administrador.\n\nAção recomendada: Verificar dados e documentação.`,
            lida: false
          });
        }, 1000);
        
        form.reset();
        setOpen(false);
      } else {
        console.log('[NovoClienteDialog] ❌ Falha no cadastro manual');
      }
    } catch (error) {
      console.error('[NovoClienteDialog] 💥 Erro no cadastro manual:', error);
      toast({
        title: 'Erro ao cadastrar cliente',
        description: 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, onSubmit, validateEmail };
}
