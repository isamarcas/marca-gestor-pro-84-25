
export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  endereco: string;
  marcas: string[];
  createdAt: Date;
  updatedAt: Date;
  // Novos campos
  tipoCliente: 'pessoa_fisica' | 'pessoa_juridica';
  escritorioResponsavel?: string;
  observacoes?: string;
  documentosIdentificacao: string[]; // Document IDs
  // Campos adicionais necessários
  representanteLegal?: string;
  segmentoAtuacao?: string;
  razaoSocial?: string; // Razão Social para Pessoa Jurídica
  // Novos campos do representante legal
  nacionalidade?: string;
  profissao?: string;
  estadoCivil?: string;
  rg?: string;
  orgaoEmissor?: string;
  // Campos para listagem de clientes
  totalMarcas?: number;
  marcasAtivas?: number;
  // Campo para identificar a origem do cliente
  origem: 'manual' | 'formulario';
  // Endereço detalhado
  enderecoDetalhado?: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}
