
export interface NovoClienteFormData {
  nome: string;
  tipoCliente: 'pessoa_fisica' | 'pessoa_juridica';
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
  observacoes?: string;
  nacionalidade?: string;
  profissao?: string;
  estadoCivil?: string;
  rg?: string;
  orgaoEmissor?: string;
}
