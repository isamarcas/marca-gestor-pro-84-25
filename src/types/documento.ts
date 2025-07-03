
export interface Documento {
  id: string;
  nome: string;
  tipo: string;
  url: string;
  uploadedAt: Date;
  // Novos campos
  categoria: 'certidao' | 'comprovante_pagamento' | 'procuracao' | 'contrato' | 'correspondencia' | 'outros';
  marcaRelacionada?: string;
  dataValidade?: Date;
  tamanhoArquivo: number;
  formato: string;
}
