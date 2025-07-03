
export interface Cliente {
  id: string;
  nome: string;
}

export interface Mensagem {
  id: string;
  remetente: string;
  preview: string;
  data: Date;
  lida: boolean;
}
