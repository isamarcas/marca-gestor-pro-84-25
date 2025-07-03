import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useClientes } from '@/hooks/useClientes';
import { useLocalAuth } from '@/hooks/useLocalAuth';
import { Cliente } from '@/types';
import { Loader2, Eye, EyeOff, UserPlus } from 'lucide-react';

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  telefone: string;
  cpfCnpj: string;
  endereco: string;
}

interface FormErrors {
  [key: string]: string;
}

export function CadastroClienteForm() {
  const navigate = useNavigate();
  // BYPASS: Usar diretamente o hook useClientes da página de clientes
  const { addCliente } = useClientes();
  const { cadastrarUsuario } = useLocalAuth();
  
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    cpfCnpj: '',
    endereco: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCPFCNPJ = (cpfCnpj: string): boolean => {
    const cleanValue = cpfCnpj.replace(/\D/g, '');
    return cleanValue.length === 11 || cleanValue.length === 14;
  };

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validação de nome
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    // Validação de email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validação de senha
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    // Validação de confirmação de senha
    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Senhas não coincidem';
    }

    // Validação de telefone
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido';
    }

    // Validação de CPF/CNPJ
    if (!formData.cpfCnpj.trim()) {
      newErrors.cpfCnpj = 'CPF/CNPJ é obrigatório';
    } else if (!validateCPFCNPJ(formData.cpfCnpj)) {
      newErrors.cpfCnpj = 'CPF/CNPJ inválido';
    }

    // Validação de endereço
    if (!formData.endereco.trim()) {
      newErrors.endereco = 'Endereço é obrigatório';
    } else if (formData.endereco.trim().length < 10) {
      newErrors.endereco = 'Endereço deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCPFCNPJ = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    
    if (cleanValue.length <= 11) {
      // CPF format: 000.000.000-00
      return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      // CNPJ format: 00.000.000/0000-00
      return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  };

  const formatPhone = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    
    if (cleanValue.length <= 10) {
      // Telefone fixo: (00) 0000-0000
      return cleanValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      // Celular: (00) 00000-0000
      return cleanValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erro na validação",
        description: "Verifique os campos obrigatórios e tente novamente.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('🆕 [CadastroCliente] BYPASS ATIVADO - Usando hook useClientes diretamente');
      console.log('🆕 [CadastroCliente] Iniciando cadastro para:', formData.email);

      // Criar ID único para o cliente
      const clienteId = `cliente-form-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

      // Primeiro, criar o usuário para login
      const usuarioCriado = cadastrarUsuario(
        formData.nome,
        formData.email,
        formData.senha,
        'cliente',
        clienteId
      );

      if (!usuarioCriado) {
        toast({
          title: "Erro no cadastro",
          description: "Este email já está cadastrado no sistema.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // BYPASS: Criar o cliente usando diretamente o hook useClientes
      const novoCliente: Cliente = {
        id: clienteId,
        nome: formData.nome.trim(),
        email: formData.email.toLowerCase().trim(),
        telefone: formData.telefone,
        cpfCnpj: formData.cpfCnpj,
        endereco: formData.endereco.trim(),
        tipoCliente: formData.cpfCnpj.replace(/\D/g, '').length === 11 ? 'pessoa_fisica' : 'pessoa_juridica',
        totalMarcas: 0,
        marcasAtivas: 0,
        marcas: [],
        documentosIdentificacao: [],
        origem: 'formulario',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log('👤 [CadastroCliente] BYPASS - Usando addCliente do hook useClientes:', novoCliente);

      // USAR DIRETAMENTE O HOOK useClientes (mesmo usado na página de clientes)
      const clienteAdicionado = addCliente(novoCliente);

      if (!clienteAdicionado) {
        toast({
          title: "Erro no cadastro",
          description: "Não foi possível criar o cadastro. Tente novamente.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      console.log('✅ [CadastroCliente] BYPASS SUCESSO - Cliente cadastrado via hook useClientes');

      toast({
        title: "Cadastro realizado com sucesso! 🎉",
        description: `Bem-vindo(a), ${formData.nome}! Seus dados foram salvos e você já pode fazer login.`,
      });

      // Aguardar um momento para garantir que os dados foram salvos
      setTimeout(() => {
        navigate('/auth');
      }, 1500);

    } catch (error: any) {
      console.error('💥 [CadastroCliente] Erro no cadastro:', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nome Completo */}
      <div className="space-y-2">
        <Label htmlFor="nome">Nome Completo *</Label>
        <Input
          id="nome"
          type="text"
          placeholder="Seu nome completo"
          value={formData.nome}
          onChange={(e) => handleInputChange('nome', e.target.value)}
          className={errors.nome ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.nome && <p className="text-sm text-red-500">{errors.nome}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Senha */}
      <div className="space-y-2">
        <Label htmlFor="senha">Senha *</Label>
        <div className="relative">
          <Input
            id="senha"
            type={showPassword ? 'text' : 'password'}
            placeholder="Mínimo 6 caracteres"
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

      {/* Confirmar Senha */}
      <div className="space-y-2">
        <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
        <div className="relative">
          <Input
            id="confirmarSenha"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Digite a senha novamente"
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

      {/* Telefone */}
      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone *</Label>
        <Input
          id="telefone"
          type="tel"
          placeholder="(11) 99999-9999"
          value={formData.telefone}
          onChange={(e) => handleInputChange('telefone', formatPhone(e.target.value))}
          className={errors.telefone ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.telefone && <p className="text-sm text-red-500">{errors.telefone}</p>}
      </div>

      {/* CPF/CNPJ */}
      <div className="space-y-2">
        <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
        <Input
          id="cpfCnpj"
          type="text"
          placeholder="000.000.000-00 ou 00.000.000/0000-00"
          value={formData.cpfCnpj}
          onChange={(e) => handleInputChange('cpfCnpj', formatCPFCNPJ(e.target.value))}
          className={errors.cpfCnpj ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.cpfCnpj && <p className="text-sm text-red-500">{errors.cpfCnpj}</p>}
      </div>

      {/* Endereço */}
      <div className="space-y-2">
        <Label htmlFor="endereco">Endereço Completo *</Label>
        <Input
          id="endereco"
          type="text"
          placeholder="Rua, número, bairro, cidade, estado, CEP"
          value={formData.endereco}
          onChange={(e) => handleInputChange('endereco', e.target.value)}
          className={errors.endereco ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.endereco && <p className="text-sm text-red-500">{errors.endereco}</p>}
      </div>

      {/* Botão de Cadastro */}
      <Button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-700" 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Cadastrando...
          </>
        ) : (
          <>
            <UserPlus className="mr-2 h-4 w-4" />
            Criar Conta
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Ao se cadastrar, você concorda com nossos termos de uso e política de privacidade.
      </p>
    </form>
  );
}
