
export interface Relatorio {
  id: string;
  tipo: 'status_marcas' | 'vencimentos' | 'custos' | 'oposicoes' | 'licenciamentos';
  titulo: string;
  parametros: Record<string, any>;
  dadosGerados: any;
  dataGeracao: Date;
  usuarioId: string;
}
