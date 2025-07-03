
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContratoViewerPremium } from '@/components/Contratos/ContratoViewerPremium';
import { AssinaturaDigitalPremium } from '@/components/Contratos/AssinaturaDigitalPremium';
import { CheckCircle, FileText, Download } from 'lucide-react';
import { gerarPDFContrato, downloadPDF } from '@/utils/pdfUtils';
import { ContratoData } from '@/types/contratos';
import { useToast } from '@/hooks/use-toast';

interface ContratoCliente {
  id: string;
  clienteId: string;
  contratoTexto: string;
  dataEnvio: string;
  status: 'pendente' | 'assinado';
  dataAssinatura?: string;
  assinatura?: string;
}

interface ContratoAssinaturaModalProps {
  isOpen: boolean;
  onClose: () => void;
  contrato: ContratoCliente;
  clienteNome: string;
  onAssinado: (assinatura: string) => void;
}

export function ContratoAssinaturaModal({ 
  isOpen, 
  onClose, 
  contrato, 
  clienteNome,
  onAssinado 
}: ContratoAssinaturaModalProps) {
  const [etapa, setEtapa] = useState<'leitura' | 'assinatura'>('leitura');
  const [leituraCompleta, setLeituraCompleta] = useState(false);
  const [dadosValidacaoPremium, setDadosValidacaoPremium] = useState<any>(null);
  const { toast } = useToast();

  const handleLeituraCompleta = (completa: boolean) => {
    setLeituraCompleta(completa);
  };

  const handleValidacaoCompleta = (dados: any) => {
    setDadosValidacaoPremium(dados);
  };

  const handleProsseguirAssinatura = () => {
    setEtapa('assinatura');
  };

  const handleAssinaturaCompleta = (dadosAssinatura: any) => {
    onAssinado(dadosAssinatura.assinatura);
  };

  const handleDownloadPDF = () => {
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

  const contratoTextoPersonalizado = contrato.contratoTexto.replace('[Nome do Cliente]', clienteNome);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {etapa === 'leitura' ? 'Contrato Digital Premium' : 'Assinatura Premium'}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-0">
          {etapa === 'leitura' && (
            <>
              <ContratoViewerPremium
                contratoTexto={contratoTextoPersonalizado}
                onLeituraCompleta={handleLeituraCompleta}
                onValidacaoCompleta={handleValidacaoCompleta}
              />
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  {leituraCompleta && dadosValidacaoPremium
                    ? "✓ Todas as validações concluídas - Prossiga para a assinatura"
                    : "Complete todas as validações de segurança para prosseguir"
                  }
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  {contrato.status === 'assinado' && (
                    <Button
                      onClick={handleDownloadPDF}
                      variant="outline"
                      className="mr-2"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar PDF
                    </Button>
                  )}
                  <Button
                    onClick={handleProsseguirAssinatura}
                    disabled={!leituraCompleta || !dadosValidacaoPremium}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Prosseguir para Assinatura Premium
                  </Button>
                </div>
              </div>
            </>
          )}

          {etapa === 'assinatura' && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Assinatura Digital Premium</h3>
                <p className="text-sm text-gray-600">
                  Complete todas as validações de segurança para assinar o contrato.
                </p>
              </div>

              <AssinaturaDigitalPremium
                onAssinaturaCompleta={handleAssinaturaCompleta}
                disabled={false}
                dadosValidacao={dadosValidacaoPremium}
              />

              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-center">
                  <h4 className="text-sm font-semibold text-purple-900 mb-2">
                    🛡️ Validações Premium Ativadas
                  </h4>
                  <p className="text-xs text-purple-700">
                    Este contrato possui validação biométrica avançada, captura de selfie,<br />
                    análise de métricas comportamentais e certificação digital premium.<br />
                    Máxima segurança jurídica conforme a legislação brasileira.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={() => setEtapa('leitura')}>
                  Voltar
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={handleDownloadPDF}
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar PDF
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
