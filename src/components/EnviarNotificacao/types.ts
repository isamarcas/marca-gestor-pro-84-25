
export interface FormData {
  clienteId: string;
  titulo: string;
  mensagem: string;
  tipo: 'info' | 'warning' | 'success' | 'error';
  categoria: 'prazo' | 'documento' | 'processo' | 'pagamento' | 'geral';
}
