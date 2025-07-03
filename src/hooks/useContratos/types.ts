
export interface AssinaturaContrato {
  nome: string;
  email: string;
  data: Date;
  localizacao: string;
  ip: string;
}

export interface Contrato {
  id: string;
  titulo: string;
  cliente: string;
  dataCriacao: Date;
  dataVencimento: Date;
  valor: number;
  status: 'ativo' | 'pendente' | 'concluido' | 'cancelado';
  arquivo: string; // URL ou caminho para o arquivo do contrato
  assinado: boolean;
  dataAssinatura?: Date;
  assinatura?: AssinaturaContrato;
}

export const contratosIniciais: Contrato[] = [
  {
    id: "1",
    titulo: "Contrato de Prestação de Serviços - Koala Marketing",
    cliente: "Koala Marketing Ltda",
    dataCriacao: new Date("2024-01-15"),
    dataVencimento: new Date("2024-12-31"),
    valor: 12000.00,
    status: "ativo",
    arquivo: "/contratos/koala-marketing.pdf",
    assinado: true,
    dataAssinatura: new Date("2024-01-20"),
    assinatura: {
      nome: "Jane Doe",
      email: "jane.doe@example.com",
      data: new Date("2024-01-20"),
      localizacao: "São Paulo, SP",
      ip: "192.168.1.1"
    }
  },
  {
    id: "2",
    titulo: "Contrato de Licença de Uso de Marca - InovaTech",
    cliente: "InovaTech Solutions",
    dataCriacao: new Date("2023-11-01"),
    dataVencimento: new Date("2024-10-31"),
    valor: 8000.00,
    status: "concluido",
    arquivo: "/contratos/inovatech-licenca.pdf",
    assinado: true,
    dataAssinatura: new Date("2023-11-05"),
    assinatura: {
      nome: "Richard Roe",
      email: "richard.roe@example.com",
      data: new Date("2023-11-05"),
      localizacao: "Rio de Janeiro, RJ",
      ip: "10.0.0.2"
    }
  },
  {
    id: "3",
    titulo: "Acordo de Confidencialidade - StartupBR",
    cliente: "StartupBR Inc",
    dataCriacao: new Date("2024-03-10"),
    dataVencimento: new Date("2025-03-09"),
    valor: 0.00,
    status: "ativo",
    arquivo: "/contratos/startupbr-confidencialidade.pdf",
    assinado: false
  }
];
