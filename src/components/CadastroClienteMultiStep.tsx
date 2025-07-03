
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Loader2, 
  Eye, 
  EyeOff, 
  UserPlus, 
  User, 
  Lock, 
  Phone, 
  MapPin,
  ChevronLeft,
  ChevronRight,
  IdCard
} from 'lucide-react';

interface FormData {
  // Dados Básicos
  tipoCliente: 'pessoa_fisica' | 'pessoa_juridica';
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  representanteLegal: string;
  
  // Dados Pessoais
  nacionalidade: string;
  profissao: string;
  estadoCivil: string;
  rg: string;
  orgaoEmissor: string;
  
  // Endereço
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  
  // Credenciais
  senha: string;
  confirmarSenha: string;
  observacoes: string;
}

interface FormErrors {
  [key: string]: string;
}

interface CadastroClienteMultiStepProps {
  onAddCliente: (cliente: any) => Promise<boolean>;
}

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const estadosCivil = [
  { value: 'solteiro', label: 'Solteiro(a)' },
  { value: 'casado', label: 'Casado(a)' },
  { value: 'divorciado', label: 'Divorciado(a)' },
  { value: 'viuvo', label: 'Viúvo(a)' },
  { value: 'uniao_estavel', label: 'União Estável' }
];

export function CadastroClienteMultiStep({ onAddCliente }: CadastroClienteMultiStepProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState<FormData>({
    // Dados Básicos
    tipoCliente: 'pessoa_fisica',
    nome: '',
    cpf: '',
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const stepTitles = [
    'Dados Básicos',
    'Dados Pessoais',
    'Endereço',
    'Credenciais'
  ];

  const stepIcons = [User, IdCard, MapPin, Lock];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCPF = (cpf: string): boolean => {
    const cleanValue = cpf.replace(/\D/g, '');
    return cleanValue.length === 11;
  };

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validateCEP = (cep: string): boolean => {
    const cleanCEP = cep.replace(/\D/g, '');
    return cleanCEP.length === 8;
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: FormErrors = {};

    switch (currentStep) {
      case 1: // Dados Básicos
        if (!formData.nome.trim()) {
          newErrors.nome = 'Nome é obrigatório';
        } else if (formData.nome.trim().length < 2) {
          newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
        }

        if (!formData.cpf.trim()) {
          newErrors.cpf = 'CPF é obrigatório';
        } else if (!validateCPF(formData.cpf)) {
          newErrors.cpf = 'CPF inválido';
        }

        if (!formData.email.trim()) {
          newErrors.email = 'Email é obrigatório';
        } else if (!validateEmail(formData.email)) {
          newErrors.email = 'Email inválido';
        }

        if (!formData.telefone.trim()) {
          newErrors.telefone = 'Telefone é obrigatório';
        } else if (!validatePhone(formData.telefone)) {
          newErrors.telefone = 'Telefone inválido';
        }

        if (formData.tipoCliente === 'pessoa_juridica' && !formData.representanteLegal.trim()) {
          newErrors.representanteLegal = 'Representante legal é obrigatório para pessoa jurídica';
        }
        break;

      case 2: // Dados Pessoais
        if (!formData.nacionalidade.trim()) {
          newErrors.nacionalidade = 'Nacionalidade é obrigatória';
        }
        if (!formData.profissao.trim()) {
          newErrors.profissao = 'Profissão é obrigatória';
        }
        if (!formData.estadoCivil) {
          newErrors.estadoCivil = 'Estado civil é obrigatório';
        }
        if (!formData.rg.trim()) {
          newErrors.rg = 'RG é obrigatório';
        }
        if (!formData.orgaoEmissor.trim()) {
          newErrors.orgaoEmissor = 'Órgão emissor é obrigatório';
        }
        break;

      case 3: // Endereço
        if (!formData.rua.trim()) {
          newErrors.rua = 'Rua/Avenida é obrigatória';
        }
        if (!formData.numero.trim()) {
          newErrors.numero = 'Número é obrigatório';
        }
        if (!formData.bairro.trim()) {
          newErrors.bairro = 'Bairro é obrigatório';
        }
        if (!formData.cidade.trim()) {
          newErrors.cidade = 'Cidade é obrigatória';
        }
        if (!formData.estado) {
          newErrors.estado = 'Estado é obrigatório';
        }
        if (!formData.cep.trim()) {
          newErrors.cep = 'CEP é obrigatório';
        } else if (!validateCEP(formData.cep)) {
          newErrors.cep = 'CEP inválido';
        }
        break;

      case 4: // Credenciais
        if (!formData.senha) {
          newErrors.senha = 'Senha é obrigatória';
        } else if (formData.senha.length < 6) {
          newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
        }

        if (!formData.confirmarSenha) {
          newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
        } else if (formData.senha !== formData.confirmarSenha) {
          newErrors.confirmarSenha = 'Senhas não coincidem';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCPF = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    
    if (cleanValue.length <= 10) {
      return cleanValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return cleanValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const formatCEP = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const formatRG = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
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
    if (!validateCurrentStep()) {
      toast({
        title: "Erro na validação",
        description: "Verifique os campos obrigatórios e tente novamente.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const clienteData = {
        nome: formData.nome.trim(),
        email: formData.email.toLowerCase().trim(),
        telefone: formData.telefone,
        cpfCnpj: formData.cpf,
        tipoCliente: formData.tipoCliente,
        representanteLegal: formData.representanteLegal || '',
        nacionalidade: formData.nacionalidade,
        profissao: formData.profissao,
        estadoCivil: formData.estadoCivil,
        rg: formData.rg,
        orgaoEmissor: formData.orgaoEmissor,
        endereco: {
          rua: formData.rua,
          numero: formData.numero,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
          cep: formData.cep,
        },
        observacoes: formData.observacoes,
      };

      const sucesso = await onAddCliente(clienteData);

      if (sucesso) {
        toast({
          title: "Cliente cadastrado com sucesso! 🎉",
          description: `${formData.nome} foi adicionado ao sistema.`,
        });

        // Reset form and close dialog
        setFormData({
          tipoCliente: 'pessoa_fisica',
          nome: '',
          cpf: '',
          email: '',
          telefone: '',
          representanteLegal: '',
          nacionalidade: '',
          profissao: '',
          estadoCivil: '',
          rg: '',
          orgaoEmissor: '',
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: '',
          cep: '',
          senha: '',
          confirmarSenha: '',
          observacoes: '',
        });
        setCurrentStep(1);
        setOpen(false);
      }
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
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
    switch (currentStep) {
      case 1: // Dados Básicos
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Tipo de Cliente *</Label>
              <RadioGroup
                value={formData.tipoCliente}
                onValueChange={(value: 'pessoa_fisica' | 'pessoa_juridica') => 
                  handleInputChange('tipoCliente', value)
                }
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pessoa_fisica" id="pf" />
                  <Label htmlFor="pf">Pessoa Física</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pessoa_juridica" id="pj" />
                  <Label htmlFor="pj">Pessoa Jurídica</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Digite o nome completo"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className={errors.nome ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.nome && <p className="text-sm text-red-500">{errors.nome}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
                className={errors.cpf ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.cpf && <p className="text-sm text-red-500">{errors.cpf}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone *</Label>
              <Input
                id="telefone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', formatPhone(e.target.value))}
                className={errors.telefone ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.telefone && <p className="text-sm text-red-500">{errors.telefone}</p>}
            </div>

            {formData.tipoCliente === 'pessoa_juridica' && (
              <div className="space-y-2">
                <Label htmlFor="representanteLegal">Representante Legal *</Label>
                <Input
                  id="representanteLegal"
                  type="text"
                  placeholder="Nome do representante legal"
                  value={formData.representanteLegal}
                  onChange={(e) => handleInputChange('representanteLegal', e.target.value)}
                  className={errors.representanteLegal ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                {errors.representanteLegal && <p className="text-sm text-red-500">{errors.representanteLegal}</p>}
              </div>
            )}
          </div>
        );

      case 2: // Dados Pessoais
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nacionalidade">Nacionalidade *</Label>
                <Input
                  id="nacionalidade"
                  type="text"
                  placeholder="Ex: Brasileira"
                  value={formData.nacionalidade}
                  onChange={(e) => handleInputChange('nacionalidade', e.target.value)}
                  className={errors.nacionalidade ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                {errors.nacionalidade && <p className="text-sm text-red-500">{errors.nacionalidade}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="profissao">Profissão *</Label>
                <Input
                  id="profissao"
                  type="text"
                  placeholder="Ex: Advogado(a)"
                  value={formData.profissao}
                  onChange={(e) => handleInputChange('profissao', e.target.value)}
                  className={errors.profissao ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                {errors.profissao && <p className="text-sm text-red-500">{errors.profissao}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Estado Civil *</Label>
              <Select
                value={formData.estadoCivil}
                onValueChange={(value) => handleInputChange('estadoCivil', value)}
              >
                <SelectTrigger className={errors.estadoCivil ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {estadosCivil.map((estado) => (
                    <SelectItem key={estado.value} value={estado.value}>
                      {estado.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.estadoCivil && <p className="text-sm text-red-500">{errors.estadoCivil}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rg">RG *</Label>
                <Input
                  id="rg"
                  type="text"
                  placeholder="00.000.000-0"
                  value={formData.rg}
                  onChange={(e) => handleInputChange('rg', formatRG(e.target.value))}
                  className={errors.rg ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                {errors.rg && <p className="text-sm text-red-500">{errors.rg}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="orgaoEmissor">Órgão Emissor *</Label>
                <Input
                  id="orgaoEmissor"
                  type="text"
                  placeholder="SSP/SP"
                  value={formData.orgaoEmissor}
                  onChange={(e) => handleInputChange('orgaoEmissor', e.target.value.toUpperCase())}
                  className={errors.orgaoEmissor ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                {errors.orgaoEmissor && <p className="text-sm text-red-500">{errors.orgaoEmissor}</p>}
              </div>
            </div>
          </div>
        );

      case 3: // Endereço
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="rua">Rua/Avenida *</Label>
                <Input
                  id="rua"
                  type="text"
                  placeholder="Nome da rua"
                  value={formData.rua}
                  onChange={(e) => handleInputChange('rua', e.target.value)}
                  className={errors.rua ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                {errors.rua && <p className="text-sm text-red-500">{errors.rua}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="numero">Número *</Label>
                <Input
                  id="numero"
                  type="text"
                  placeholder="123"
                  value={formData.numero}
                  onChange={(e) => handleInputChange('numero', e.target.value)}
                  className={errors.numero ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                {errors.numero && <p className="text-sm text-red-500">{errors.numero}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro *</Label>
                <Input
                  id="bairro"
                  type="text"
                  placeholder="Nome do bairro"
                  value={formData.bairro}
                  onChange={(e) => handleInputChange('bairro', e.target.value)}
                  className={errors.bairro ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                {errors.bairro && <p className="text-sm text-red-500">{errors.bairro}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade *</Label>
                <Input
                  id="cidade"
                  type="text"
                  placeholder="Nome da cidade"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                  className={errors.cidade ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                {errors.cidade && <p className="text-sm text-red-500">{errors.cidade}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Estado *</Label>
                <Select
                  value={formData.estado}
                  onValueChange={(value) => handleInputChange('estado', value)}
                >
                  <SelectTrigger className={errors.estado ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.estado && <p className="text-sm text-red-500">{errors.estado}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cep">CEP *</Label>
                <Input
                  id="cep"
                  type="text"
                  placeholder="00000-000"
                  value={formData.cep}
                  onChange={(e) => handleInputChange('cep', formatCEP(e.target.value))}
                  className={errors.cep ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                {errors.cep && <p className="text-sm text-red-500">{errors.cep}</p>}
              </div>
            </div>
          </div>
        );

      case 4: // Credenciais
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="senha">Senha de Acesso *</Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha (mínimo 6 caracteres)"
                  value={formData.senha}
                  onChange={(e) => handleInputChange('senha', e.target.value)}
                  className={errors.senha ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.senha && <p className="text-sm text-red-500">{errors.senha}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
              <div className="relative">
                <Input
                  id="confirmarSenha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  value={formData.confirmarSenha}
                  onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                  className={errors.confirmarSenha ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.confirmarSenha && <p className="text-sm text-red-500">{errors.confirmarSenha}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações (opcional)</Label>
              <Textarea
                id="observacoes"
                placeholder="Informações adicionais sobre sua empresa ou necessidades..."
                className="min-h-[80px]"
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <p className="text-xs text-gray-500">
              Ao se cadastrar, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const StepIcon = stepIcons[currentStep - 1];
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-slate-900 hover:bg-slate-800">
          <UserPlus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
          <DialogDescription>
            Preencha as informações completas do cliente em etapas
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com progresso */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <StepIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{stepTitles[currentStep - 1]}</h3>
                <p className="text-sm text-gray-600">Etapa {currentStep} de {totalSteps}</p>
              </div>
            </div>
            
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Conteúdo do step atual */}
          <div className="min-h-[300px]">
            {renderStep()}
          </div>

          {/* Navegação */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || isLoading}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                Próximo
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Cadastrar Cliente
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
