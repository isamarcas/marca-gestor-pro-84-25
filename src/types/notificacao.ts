
export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'info' | 'warning' | 'success' | 'error';
  lida: boolean;
  clienteId: string;
  createdAt: Date;
  // Novos campos
  categoria: 'prazo' | 'documento' | 'processo' | 'pagamento' | 'geral';
  marcaRelacionada?: string;
  acaoRequerida?: boolean;
  urlAcao?: string;
}
