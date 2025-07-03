
export interface Alerta {
  id: string;
  marcaId?: string;
  marca: string;
  tipo: string;
  titulo: string;
  descricao: string;
  prazo: string;
  prioridade: 'alta' | 'media' | 'baixa';
  status: 'ativo' | 'resolvido' | 'adiado';
  createdAt: string;
  cliente: string;
  categoria?: 'marca' | 'licenca';
}

export interface PriorityConfig {
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  icon: any;
  pulse: string;
  glow: string;
}
