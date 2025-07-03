
export interface FormData {
  // Dados Básicos
  tipoCliente: 'pessoa_fisica' | 'pessoa_juridica';
  razaoSocial: string;
  nome: string;
  cpfCnpj: string;
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

export interface FormErrors {
  [key: string]: string;
}

export interface StepProps {
  formData: FormData;
  errors: FormErrors;
  isLoading: boolean;
  onInputChange: (field: keyof FormData, value: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => void;
}
