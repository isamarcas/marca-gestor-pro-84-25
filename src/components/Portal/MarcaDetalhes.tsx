
import React from 'react';
import { Calendar, FileText, Download, Clock, CheckCircle, AlertTriangle, User, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Marca } from '@/types';

interface MarcaDetalhesProps {
  marca: Marca;
  onDownloadDocument: (documentId: string) => void;
  onSendMessage: () => void;
}

const statusColors = {
  deferido: 'bg-green-100 text-green-800 border-green-200',
  em_analise: 'bg-blue-100 text-blue-800 border-blue-200',
  indeferido: 'bg-red-100 text-red-800 border-red-200',
  recurso: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  renovacao: 'bg-purple-100 text-purple-800 border-purple-200',
  oposicao: 'bg-orange-100 text-orange-800 border-orange-200',
};

const statusLabels = {
  deferido: 'Deferido',
  em_analise: 'Em Análise',
  indeferido: 'Indeferido',
  recurso: 'Recurso',
  renovacao: 'Renovação',
  oposicao: 'Oposição',
};

const tipoMarcaLabels = {
  mista: 'Mista',
  nominativa: 'Nominativa',
  figurativa: 'Figurativa',
};

export function MarcaDetalhes({ marca, onDownloadDocument, onSendMessage }: MarcaDetalhesProps) {
  // Mock de histórico de movimentações
  const historicoMovimentacoes = [
    {
      id: '1',
      data: new Date('2024-01-15'),
      titulo: 'Pedido de Registro Protocolado',
      descricao: 'Marca registrada no INPI com número de processo',
      status: 'concluido',
      responsavel: 'Sistema INPI'
    },
    {
      id: '2',
      data: new Date('2024-02-20'),
      titulo: 'Exame Formal Realizado',
      descricao: 'Documentação analisada e aprovada',
      status: 'concluido',
      responsavel: 'INPI'
    },
    {
      id: '3',
      data: new Date('2024-03-10'),
      titulo: 'Publicação na RPI',
      descricao: 'Marca publicada na Revista da Propriedade Industrial',
      status: 'concluido',
      responsavel: 'INPI'
    },
    {
      id: '4',
      data: new Date('2024-04-01'),
      titulo: 'Prazo de Oposição',
      descricao: 'Período para apresentação de oposições (60 dias)',
      status: marca.status === 'deferido' ? 'concluido' : 'em_andamento',
      responsavel: 'INPI'
    }
  ];

  const documentos = [
    {
      id: '1',
      nome: 'Certificado de Registro',
      tipo: 'Certificado',
      dataUpload: new Date('2024-04-15'),
      tamanho: '2.5 MB',
      disponivel: marca.status === 'deferido'
    },
    {
      id: '2',
      nome: 'Comprovante de Pagamento - Taxa de Depósito',
      tipo: 'Comprovante',
      dataUpload: new Date('2024-01-15'),
      tamanho: '1.2 MB',
      disponivel: true
    },
    {
      id: '3',
      nome: 'Procuração',
      tipo: 'Documento Legal',
      dataUpload: new Date('2024-01-15'),
      tamanho: '850 KB',
      disponivel: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header da Marca */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{marca.nome}</h1>
              <p className="text-slate-200 text-lg">Processo nº {marca.numeroProcesso}</p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Badge className={`${statusColors[marca.status]} text-sm px-3 py-1`}>
                  {statusLabels[marca.status]}
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  Classe {marca.classe}
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {tipoMarcaLabels[marca.tipoMarca]}
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white/10 hover:bg-white/20 border border-white/20" onClick={onSendMessage}>
                <FileText className="mr-2 h-4 w-4" />
                Falar sobre esta marca
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="mr-2 h-4 w-4" />
                Download completo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Gerais */}
        <Card className="lg:col-span-2 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Informações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Titular</label>
                <p className="text-lg font-semibold text-gray-900">{marca.titular}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Data de Depósito</label>
                <p className="text-lg font-semibold text-gray-900">
                  {format(marca.dataDeposito, 'dd/MM/yyyy', { locale: ptBR })}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Tipo da Marca</label>
                <p className="text-lg font-semibold text-gray-900">{tipoMarcaLabels[marca.tipoMarca]}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status Detalhado</label>
                <p className="text-lg font-semibold text-gray-900">{marca.statusDetalhado}</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <label className="text-sm font-medium text-gray-500">Especificação de Produtos/Serviços</label>
              <p className="text-gray-900 mt-2 leading-relaxed">{marca.descricaoProdutosServicos}</p>
            </div>

            {marca.proximoPrazo && (
              <>
                <Separator />
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <h3 className="font-semibold text-yellow-800">Próximo Prazo</h3>
                  </div>
                  <p className="text-yellow-700">
                    Vencimento em {format(marca.proximoPrazo, 'dd/MM/yyyy', { locale: ptBR })}
                  </p>
                  <p className="text-sm text-yellow-600 mt-1">
                    {Math.ceil((marca.proximoPrazo.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias restantes
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Resumo de Status */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Status do Processo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historicoMovimentacoes.map((mov, index) => (
                <div key={mov.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      mov.status === 'concluido' ? 'bg-green-100' : 
                      mov.status === 'em_andamento' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {mov.status === 'concluido' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : mov.status === 'em_andamento' ? (
                        <Clock className="h-4 w-4 text-blue-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    {index < historicoMovimentacoes.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className="font-semibold text-gray-900">{mov.titulo}</h4>
                    <p className="text-sm text-gray-600 mt-1">{mov.descricao}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {format(mov.data, 'dd/MM/yyyy', { locale: ptBR })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documentos */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentos Relacionados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentos.map((doc) => (
              <div 
                key={doc.id} 
                className={`border rounded-lg p-4 transition-all ${
                  doc.disponivel 
                    ? 'hover:shadow-md hover:border-blue-300 cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <FileText className={`h-8 w-8 ${doc.disponivel ? 'text-blue-600' : 'text-gray-400'}`} />
                  <Badge variant={doc.disponivel ? 'default' : 'secondary'}>
                    {doc.disponivel ? 'Disponível' : 'Pendente'}
                  </Badge>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{doc.nome}</h4>
                <p className="text-sm text-gray-600 mb-2">{doc.tipo}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{format(doc.dataUpload, 'dd/MM/yyyy', { locale: ptBR })}</span>
                  <span>{doc.tamanho}</span>
                </div>
                {doc.disponivel && (
                  <Button 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => onDownloadDocument(doc.id)}
                  >
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
