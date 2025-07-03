
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, CheckCircle, AlertCircle, Edit, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ContratoAssinaturaModal } from './ContratoAssinaturaModal';
import { gerarPDFContrato, downloadPDF } from '@/utils/pdfUtils';
import { ContratoData } from '@/types/contratos';

interface ContratoCliente {
  id: string;
  clienteId: string;
  contratoTexto: string;
  dataEnvio: string;
  status: 'pendente' | 'assinado';
  dataAssinatura?: string;
  assinatura?: string;
}

interface MeusDocumentosProps {
  clienteId: string;
  clienteNome: string;
}

export function MeusDocumentos({ clienteId, clienteNome }: MeusDocumentosProps) {
  const [contrato, setContrato] = useState<ContratoCliente | null>(null);
  const [showContratoModal, setShowContratoModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Carregar contrato do cliente
    const carregarContrato = () => {
      try {
        const contratosEnviados = JSON.parse(localStorage.getItem('contratos_enviados') || '[]');
        const contratoCliente = contratosEnviados.find((c: ContratoCliente) => c.clienteId === clienteId);
        
        if (contratoCliente) {
          setContrato(contratoCliente);
        }
      } catch (error) {
        console.error('Erro ao carregar contrato:', error);
      }
    };

    carregarContrato();
  }, [clienteId]);

  const handleAssinarContrato = () => {
    setShowContratoModal(true);
  };

  const handleContratoAssinado = (assinatura: string) => {
    if (!contrato) return;

    const contratoAssinado = {
      ...contrato,
      status: 'assinado' as const,
      dataAssinatura: new Date().toISOString(),
      assinatura
    };

    // Atualizar no localStorage
    try {
      const contratosEnviados = JSON.parse(localStorage.getItem('contratos_enviados') || '[]');
      const index = contratosEnviados.findIndex((c: ContratoCliente) => c.id === contrato.id);
      
      if (index !== -1) {
        contratosEnviados[index] = contratoAssinado;
        localStorage.setItem('contratos_enviados', JSON.stringify(contratosEnviados));
      }

      setContrato(contratoAssinado);
      setShowContratoModal(false);
      
      toast({
        title: "Contrato Assinado!",
        description: "Seu contrato premium foi assinado com sucesso e possui máxima segurança jurídica."
      });
    } catch (error) {
      console.error('Erro ao salvar assinatura:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar assinatura do contrato.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadPDF = () => {
    if (!contrato) return;

    try {
      // Criar dados do contrato para gerar PDF
      const contratoParaPDF: ContratoData = {
        id: contrato.id,
        nomeCliente: clienteNome,
        email: '', // Cliente pode não ter email
        dataAceite: contrato.dataAssinatura ? new Date(contrato.dataAssinatura).toLocaleDateString('pt-BR') : '',
        horaAceite: contrato.dataAssinatura ? new Date(contrato.dataAssinatura).toLocaleTimeString('pt-BR') : '',
        assinatura: contrato.assinatura || '',
        contratoTexto: contrato.contratoTexto.replace('[Nome do Cliente]', clienteNome),
        status: contrato.status === 'assinado' ? 'aceito' : 'pendente',
        ipAddress: 'Portal do Cliente',
        dispositivo: navigator.userAgent,
        dadosPremium: {
          versao: 'premium'
        }
      };

      const htmlContent = gerarPDFContrato(contratoParaPDF);
      downloadPDF(htmlContent, `contrato-${clienteNome.replace(/\s+/g, '-').toLowerCase()}`);
      
      toast({
        title: "Download iniciado",
        description: "O contrato está sendo baixado em formato HTML."
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast({
        title: "Erro",
        description: "Erro ao gerar o PDF do contrato.",
        variant: "destructive"
      });
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Meus Documentos</h1>
        <p className="text-gray-600">Gerencie seus documentos e contratos digitais</p>
      </div>

      {/* Seção de Contratos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Contratos Premium
          </CardTitle>
        </CardHeader>
        <CardContent>
          {contrato ? (
            <div className="border-2 border-purple-200 rounded-lg p-4 space-y-4 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">Contrato de Prestação de Serviços</h3>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                      <Shield className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">  
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Enviado em: {formatarData(contrato.dataEnvio)}
                    </div>
                    {contrato.dataAssinatura && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Assinado em: {formatarData(contrato.dataAssinatura)}
                      </div>
                    )}
                  </div>
                </div>
                <Badge 
                  variant={contrato.status === 'assinado' ? 'default' : 'secondary'}
                  className={contrato.status === 'assinado' ? 'bg-green-600' : 'bg-yellow-600'}
                >
                  {contrato.status === 'assinado' ? 'Assinado' : 'Pendente'}
                </Badge>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <h4 className="text-sm font-semibold text-purple-900 mb-2">🛡️ Recursos Premium Inclusos:</h4>
                <div className="grid md:grid-cols-2 gap-1 text-xs text-purple-700">
                  <div>• Validação biométrica avançada</div>
                  <div>• Captura de selfie para verificação</div>
                  <div>• Análise de métricas comportamentais</div>
                  <div>• Localização GPS (opcional)</div>
                  <div>• Hash de integridade do documento</div>
                  <div>• Máxima segurança jurídica</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                {contrato.status === 'pendente' && (
                  <Button 
                    onClick={handleAssinarContrato}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Assinar Contrato Premium
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={handleDownloadPDF}
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum contrato disponível</p>
              <p className="text-sm">Os contratos enviados pelo administrador aparecerão aqui</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Seção de Outros Documentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Outros Documentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum documento disponível</p>
            <p className="text-sm">Outros documentos relacionados ao seu processo aparecerão aqui</p>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Assinatura do Contrato Premium */}
      {contrato && (
        <ContratoAssinaturaModal
          isOpen={showContratoModal}
          onClose={() => setShowContratoModal(false)}
          contrato={contrato}
          clienteNome={clienteNome}
          onAssinado={handleContratoAssinado}
        />
      )}
    </div>
  );
}
