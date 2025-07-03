import React, { useState, useEffect } from 'react';
import { ChevronDown, Clock, CheckCircle, AlertCircle, FileText, Calendar, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Marca } from '@/types';
import { loadMarcasFromStorage } from '@/utils/marcasStorage';

interface ProcessProgressCardProps {
  clienteId: string;
}

const statusLabels = {
  em_analise: 'Em Análise',
  deferido: 'Deferido',
  indeferido: 'Indeferido',
  recurso: 'Recurso',
  renovacao: 'Renovação',
  oposicao: 'Oposição',
  deposito: 'Depósito',
  publicacao: 'Publicação',
  fase_oposicao: 'Fase de Oposição',
  exame_merito: 'Exame de Mérito',
  resposta_exigencia: 'Resposta à Exigência',
  pagamento_taxa: 'Pagamento da Taxa',
  concessao: 'Concessão',
  vigencia: 'Vigência',
  deposito_pedido: 'Depósito do Pedido',
  publicacao_pedido: 'Publicação de Pedido',
  fase_oposicao_detalhada: 'Fase de Oposição',
  exame_merito_detalhado: 'Exame de Mérito',
  resposta_exigencia_merito: 'Resposta à Exigência de Mérito',
  pagamento_taxa_concessao: 'Pagamento da Taxa de Concessão',
  concessao_registro: 'Concessão e Registro',
  vigencia_uso_fiscalizacao: 'Vigência, Uso e Fiscalização',
};

const statusDescricoes = {
  em_analise: 'Processo em análise pelo INPI',
  deferido: 'Marca aprovada pelo INPI',
  indeferido: 'Marca reprovada pelo INPI',
  recurso: 'Recurso apresentado contra decisão de indeferimento',
  renovacao: 'A marca pode ser renovada por mais 10 anos, indefinidamente, a cada vencimento. Caso não renove ocorrerá o arquivamento definitivo!',
  oposicao: 'Processo de oposição em andamento',
  deposito: 'Marca depositada no INPI',
  publicacao: 'Marca publicada para oposição',
  fase_oposicao: 'Processo na fase de oposição',
  exame_merito: 'Processo em exame de mérito',
  resposta_exigencia: 'Aguardando resposta à exigência',
  pagamento_taxa: 'Aguardando pagamento da taxa',
  concessao: 'Marca concedida pelo INPI',
  vigencia: 'Marca em vigência',
  deposito_pedido: 'Início do processo',
  publicacao_pedido: 'Abre-se o prazo para apresentação de oposição por terceiros, que é de 60 dias corridos.',
  fase_oposicao_detalhada: 'Terceiros interessados apresentam oposição fundamentada. Se houver oposição, o requerente será notificado e terá 60 dias para apresentar sua manifestação à oposição.',
  exame_merito_detalhado: 'O examinador analisa se a marca pode ou não ser registrada: Colisão com marcas anteriores? Descritiva, genérica ou de uso comum? Enquadrada em vedação legal?',
  resposta_exigencia_merito: 'Se houver exigência de mérito, o requerente tem 60 dias para responder. Se não responder, o pedido é arquivado de ofício.',
  pagamento_taxa_concessao: 'Se deferido, o titular tem 60 dias para pagar a taxa de expedição do certificado + 1ª década de vigência. Se não pagar, o pedido cai em abandono.',
  concessao_registro: 'Após o pagamento, o INPI publica o registro da marca e emite o certificado. A marca passa a ter vigência de 10 anos a partir da data de concessão.',
  vigencia_uso_fiscalizacao: 'O titular pode usar, licenciar e defender sua marca. Deve manter o uso real e contínuo da marca para evitar caducidade por desuso.',
};

const statusColors = {
  em_analise: 'bg-blue-100 text-blue-800 border-blue-200',
  deferido: 'bg-green-100 text-green-800 border-green-200',
  indeferido: 'bg-red-100 text-red-800 border-red-200',
  recurso: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  renovacao: 'bg-purple-100 text-purple-800 border-purple-200',
  oposicao: 'bg-orange-100 text-orange-800 border-orange-200',
  deposito: 'bg-gray-100 text-gray-800 border-gray-200',
  publicacao: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  fase_oposicao: 'bg-orange-100 text-orange-800 border-orange-200',
  exame_merito: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  resposta_exigencia: 'bg-amber-100 text-amber-800 border-amber-200',
  pagamento_taxa: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  concessao: 'bg-green-100 text-green-800 border-green-200',
  vigencia: 'bg-teal-100 text-teal-800 border-teal-200',
  deposito_pedido: 'bg-gray-100 text-gray-800 border-gray-200',
  publicacao_pedido: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  fase_oposicao_detalhada: 'bg-orange-100 text-orange-800 border-orange-200',
  exame_merito_detalhado: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  resposta_exigencia_merito: 'bg-amber-100 text-amber-800 border-amber-200',
  pagamento_taxa_concessao: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  concessao_registro: 'bg-green-100 text-green-800 border-green-200',
  vigencia_uso_fiscalizacao: 'bg-teal-100 text-teal-800 border-teal-200',
};

export function ProcessProgressCard({ clienteId }: ProcessProgressCardProps) {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Função para carregar marcas
  const carregarMarcas = () => {
    if (clienteId) {
      setIsRefreshing(true);
      // Simular um pequeno delay para mostrar o loading
      setTimeout(() => {
        const marcasDoCliente = loadMarcasFromStorage(clienteId);
        setMarcas(marcasDoCliente);
        console.log('ProcessProgressCard: Marcas recarregadas para cliente', clienteId, ':', marcasDoCliente.length);
        setIsRefreshing(false);
      }, 500);
    }
  };

  // Carregar marcas do cliente inicialmente
  useEffect(() => {
    carregarMarcas();
  }, [clienteId]);

  // Listener para mudanças no localStorage (quando status é alterado na página de marcas)
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('ProcessProgressCard: Detectada mudança no localStorage, recarregando marcas...');
      carregarMarcas();
    };

    // Escutar mudanças no localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Polling para detectar mudanças locais (mesma aba)
    const interval = setInterval(() => {
      const marcasAtuais = loadMarcasFromStorage(clienteId);
      if (marcasAtuais.length !== marcas.length || 
          marcasAtuais.some(marca => {
            const marcaExistente = marcas.find(m => m.id === marca.id);
            return !marcaExistente || marcaExistente.status !== marca.status ||
                   JSON.stringify(marcaExistente.historicoProcesso) !== JSON.stringify(marca.historicoProcesso);
          })) {
        console.log('ProcessProgressCard: Detectada mudança nas marcas via polling');
        setMarcas(marcasAtuais);
      }
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [clienteId, marcas]);

  // Encontrar a marca selecionada
  const marca = marcas.find(m => m.id === marcaSelecionada);

  const getTimelineIcon = (isActive: boolean, isCurrent: boolean) => {
    if (isCurrent) {
      return <Clock className="h-5 w-5 text-blue-500" />;
    } else if (isActive) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else {
      return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getTimelineColor = (isActive: boolean, isCurrent: boolean) => {
    if (isCurrent) {
      return 'border-blue-500 bg-blue-50 ring-2 ring-blue-200';
    } else if (isActive) {
      return 'border-green-500 bg-green-50';
    } else {
      return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
      
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-purple-900">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            Andamento dos Processos
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={carregarMarcas}
            disabled={isRefreshing}
            className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
            title="Atualizar dados"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Dropdown de seleção de marca */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-purple-700">Selecione uma marca:</label>
          <Select value={marcaSelecionada} onValueChange={setMarcaSelecionada}>
            <SelectTrigger className="w-full border-purple-200 focus:border-purple-500 bg-white/80">
              <SelectValue placeholder="Escolha uma marca para ver o andamento..." />
            </SelectTrigger>
            <SelectContent className="bg-white border-purple-200">
              {marcas.map((marca) => (
                <SelectItem key={marca.id} value={marca.id}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{marca.nome}</span>
                    <span className="text-xs text-gray-500">({marca.numeroProcesso})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Timeline do histórico de processos */}
        {marca && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-purple-800">Timeline do Processo</h4>
                <Badge className={statusColors[marca.status]}>
                  Status Atual: {statusLabels[marca.status]}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
                <div>
                  <span className="text-gray-600">Marca:</span>
                  <p className="font-semibold text-gray-900">{marca.nome}</p>
                </div>
                <div>
                  <span className="text-gray-600">Processo:</span>
                  <p className="font-mono text-gray-900">{marca.numeroProcesso}</p>
                </div>
                <div>
                  <span className="text-gray-600">Data Depósito:</span>
                  <p className="text-gray-900">{marca.dataDeposito.toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Linha vertical da timeline */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-green-300 to-gray-300"></div>
                
                <div className="space-y-6">
                  {marca.historicoProcesso && marca.historicoProcesso.length > 0 ? (
                    marca.historicoProcesso.map((historico, index) => {
                      const isLast = index === marca.historicoProcesso!.length - 1;
                      const isCurrent = historico.status === marca.status && isLast;
                      const descricao = statusDescricoes[historico.status as keyof typeof statusDescricoes] || historico.descricao;
                      
                      return (
                        <div key={historico.id} className="relative flex items-start gap-4">
                          {/* Ícone do step */}
                          <div className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${getTimelineColor(true, isCurrent)}`}>
                            {getTimelineIcon(true, isCurrent)}
                          </div>
                          
                          {/* Conteúdo do step */}
                          <div className="flex-1 min-w-0">
                            <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${getTimelineColor(true, isCurrent)}`}>
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold text-gray-900">
                                  {statusLabels[historico.status as keyof typeof statusLabels] || historico.evento}
                                </h5>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Calendar className="h-3 w-3" />
                                  {historico.data.toLocaleDateString('pt-BR')}
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{descricao}</p>
                              {historico.responsavel && (
                                <p className="text-xs text-gray-500 mt-1">Responsável: {historico.responsavel}</p>
                              )}
                              {isCurrent && (
                                <Badge className="mt-2 bg-blue-100 text-blue-800">
                                  ✓ Status Atual
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="relative flex items-start gap-4">
                      <div className="relative z-10 w-12 h-12 rounded-full border-2 border-blue-500 bg-blue-50 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-50">
                          <h5 className="font-semibold text-gray-900">{statusLabels[marca.status]}</h5>
                          <p className="text-sm text-gray-700 mt-1">
                            {statusDescricoes[marca.status as keyof typeof statusDescricoes] || 'Status atual do processo'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Próximo prazo se existir */}
              {marca.proximoPrazo && (
                <div className="mt-6 flex items-center gap-2 text-sm bg-purple-50 p-3 rounded-lg">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span className="text-gray-600">Próximo prazo:</span>
                  <span className="font-semibold text-purple-700">
                    {marca.proximoPrazo.toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Estado vazio */}
        {!marcaSelecionada && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-3 text-purple-300" />
            <p className="font-medium">Selecione uma marca para visualizar o andamento</p>
            <p className="text-sm mt-1">Acompanhe o histórico completo do seu processo</p>
          </div>
        )}

        {marcas.length === 0 && !isRefreshing && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-3 text-purple-300" />
            <p className="font-medium">Nenhuma marca encontrada</p>
            <p className="text-sm mt-1">Suas marcas aparecerão aqui quando estiverem disponíveis</p>
          </div>
        )}

        {isRefreshing && (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2 text-purple-600">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="text-sm">Atualizando dados...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
