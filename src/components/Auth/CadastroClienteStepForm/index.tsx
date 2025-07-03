
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useClientes } from '@/hooks/useClientes';
import { useLocalAuth } from '@/hooks/useLocalAuth';
import { Cliente } from '@/types';
import { FormData, FormErrors } from './types';
import { useFormValidation } from './hooks/useFormValidation';
import { StepHeader } from './components/StepHeader';
import { StepNavigation } from './components/StepNavigation';
import { Step1DadosBasicos } from './steps/Step1DadosBasicos';
import { Step2DadosPessoais } from './steps/Step2DadosPessoais';
import { Step3Endereco } from './steps/Step3Endereco';
import { Step4Credenciais } from './steps/Step4Credenciais';

export function CadastroClienteStepForm() {
  const navigate = useNavigate();
  const { addCliente } = useClientes();
  const { cadastrarUsuario, carregarUsuarios } = useLocalAuth();
  const { validateCurrentStep } = useFormValidation();
  
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState<FormData>({
    // Dados Básicos
    tipoCliente: 'pessoa_fisica',
    razaoSocial: '',
    nome: '',
    cpfCnpj: '',
    email: '',
    telefone: '',
    representanteLegal: '',
    
    // Dados Pessoais
    nacionalidade: '',
    profissao: '',
    estadoCivil: '',
    rg: '',
    orgaoEmissor: '',
    
    // Endereço
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    
    // Credenciais
    senha: '',
    confirmarSenha: '',
    observacoes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateAndProceed = (step: number): boolean => {
    const newErrors = validateCurrentStep(step, formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateAndProceed(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast({
        title: "Erro na validação",
        description: "Verifique os campos obrigatórios e tente novamente.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateAndProceed(currentStep)) {
      toast({
        title: "Erro na validação",
        description: "Verifique os campos obrigatórios e tente novamente.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('🆕 [CadastroClienteStepForm] ===== INICIANDO CADASTRO COMPLETO =====');
      console.log('🆕 [CadastroClienteStepForm] Email:', formData.email);
      console.log('🆕 [CadastroClienteStepForm] Nome:', formData.nome);

      // Criar ID único para o cliente
      const clienteId = `cliente-form-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      console.log('🆔 [CadastroClienteStepForm] ID gerado:', clienteId);

      // PASSO 1: FORÇAR reload dos usuários antes de cadastrar
      console.log('🔄 [CadastroClienteStepForm] Forçando reload dos usuários...');
      carregarUsuarios();
      
      // Aguardar um momento para garantir que o reload terminou
      await new Promise(resolve => setTimeout(resolve, 300));

      // PASSO 2: Criar usuário no sistema de autenticação
      console.log('👤 [CadastroClienteStepForm] Criando usuário no sistema de auth...');
      console.log('👤 [CadastroClienteStepForm] Dados do usuário:', {
        nome: formData.nome,
        email: formData.email,
        role: 'cliente',
        clienteId
      });
      
      const usuarioCriado = cadastrarUsuario(
        formData.nome,
        formData.email,
        formData.senha,
        'cliente',
        clienteId
      );

      if (!usuarioCriado) {
        console.error('❌ [CadastroClienteStepForm] Falha ao criar usuário');
        toast({
          title: "Erro no cadastro",
          description: "Este email já está cadastrado no sistema.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      console.log('✅ [CadastroClienteStepForm] Usuário criado com sucesso no auth');

      // PASSO 3: Aguardar para garantir que o usuário foi persistido
      await new Promise(resolve => setTimeout(resolve, 500));

      // PASSO 4: Criar cliente no sistema de clientes
      const enderecoCompleto = `${formData.rua}, ${formData.numero}, ${formData.bairro}, ${formData.cidade}, ${formData.estado}, CEP: ${formData.cep}`;

      const novoCliente: Cliente = {
        id: clienteId,
        nome: formData.nome.trim(),
        email: formData.email.toLowerCase().trim(),
        telefone: formData.telefone,
        cpfCnpj: formData.cpfCnpj,
        endereco: enderecoCompleto,
        tipoCliente: formData.tipoCliente,
        razaoSocial: formData.razaoSocial || undefined,
        representanteLegal: formData.representanteLegal || undefined,
        nacionalidade: formData.nacionalidade || undefined,
        profissao: formData.profissao || undefined,
        estadoCivil: formData.estadoCivil || undefined,
        rg: formData.rg || undefined,
        orgaoEmissor: formData.orgaoEmissor || undefined,
        observacoes: formData.observacoes || undefined,
        totalMarcas: 0,
        marcasAtivas: 0,
        marcas: [],
        documentosIdentificacao: [],
        origem: 'formulario',
        createdAt: new Date(),
        updatedAt: new Date(),
        enderecoDetalhado: {
          rua: formData.rua,
          numero: formData.numero,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
          cep: formData.cep,
        }
      };

      console.log('📝 [CadastroClienteStepForm] Criando cliente no sistema...');
      const clienteAdicionado = addCliente(novoCliente);

      if (!clienteAdicionado) {
        console.error('❌ [CadastroClienteStepForm] Falha ao criar cliente');
        toast({
          title: "Erro no cadastro",
          description: "Não foi possível criar o cadastro. Tente novamente.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      console.log('✅ [CadastroClienteStepForm] Cliente criado com sucesso');

      // PASSO 5: Aguardar sincronização final
      await new Promise(resolve => setTimeout(resolve, 1000));

      // PASSO 6: Recarregar usuários uma última vez para garantir sincronização
      console.log('🔄 [CadastroClienteStepForm] Sincronização final...');
      carregarUsuarios();

      toast({
        title: "Cadastro realizado com sucesso! 🎉",
        description: `Bem-vindo(a), ${formData.nome}! Você já pode fazer login com seus dados.`,
      });

      console.log('✅ [CadastroClienteStepForm] ===== CADASTRO COMPLETO FINALIZADO =====');
      console.log('📊 [CadastroClienteStepForm] Resumo:', {
        usuarioId: clienteId,
        email: formData.email,
        nome: formData.nome,
        role: 'cliente',
        clienteCriado: true,
        usuarioCriado: true
      });

      // Aguardar mais um momento antes de redirecionar
      setTimeout(() => {
        console.log('🔄 [CadastroClienteStepForm] Redirecionando para login...');
        navigate('/auth');
      }, 2500);

    } catch (error: any) {
      console.error('💥 [CadastroClienteStepForm] Erro no cadastro:', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      errors,
      isLoading,
      onInputChange: handleInputChange,
    };

    switch (currentStep) {
      case 1:
        return <Step1DadosBasicos {...stepProps} />;
      case 2:
        return <Step2DadosPessoais {...stepProps} />;
      case 3:
        return <Step3Endereco {...stepProps} />;
      case 4:
        return <Step4Credenciais {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <StepHeader currentStep={currentStep} />

      <div className="min-h-[300px]">
        {renderStep()}
      </div>

      <StepNavigation
        currentStep={currentStep}
        isLoading={isLoading}
        onPrev={prevStep}
        onNext={nextStep}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
