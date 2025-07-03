
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'gestor' | 'colaborador' | 'cliente';
  avatar?: string;
  // Novos campos
  escritorio?: string;
  especialidades: string[];
  telefone?: string;
  ativo: boolean;
  ultimoAcesso?: Date;
}
