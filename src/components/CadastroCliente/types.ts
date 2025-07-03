
export interface CadastroClienteFormData {
  tipoCliente: 'pessoa_fisica' | 'pessoa_juridica';
  nome: string;
  razaoSocial?: string;
  cpfCnpj: string;
  email: string;
  telefone: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  representanteLegal?: string;
  segmentoAtuacao?: string;
  nacionalidade?: string;
  profissao?: string;
  estadoCivil?: string;
  rg?: string;
  orgaoEmissor?: string;
  observacoes?: string;
  senha: string;
  confirmarSenha: string;
}

export interface StepProps {
  form: any;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  isLoading?: boolean;
}
