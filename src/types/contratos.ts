
export interface ContratoData {
  id: string;
  nomeCliente: string;
  email?: string;
  dataAceite: string;
  horaAceite: string;
  ipAddress?: string;
  dispositivo?: string;
  assinatura: string; // base64
  contratoTexto: string;
  status: 'pendente' | 'aceito' | 'rejeitado';
  dadosPremium?: {
    versao: 'original' | 'premium';
    selfie?: string;
    metricas?: {
      coordenadas: {x: number, y: number, timestamp: number}[];
      velocidadeAssinatura: number;
      pressaoMedia: number;
      tempoAssinatura: number;
      pontos: number;
    };
    validacoes?: {
      biometrica: boolean;
      selfie: boolean;
      tempoLeitura?: number;
      localizacao?: {lat: number, lon: number};
      hashDocumento?: string;
    };
  };
}

export interface AssinaturaData {
  assinatura: string;
  timestamp: string;
  coordenadas?: { x: number; y: number }[];
}

export interface ValidacaoPremium {
  tempoLeitura: number;
  localizacao?: {lat: number, lon: number};
  hashDocumento: string;
  biometriaValidada: boolean;
  timestampValidacao: string;
}
