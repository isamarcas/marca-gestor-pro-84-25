
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ContratoData } from '@/types/contratos';
import { gerarPDFContrato, downloadPDF } from '@/utils/pdfUtils';
import { toast } from '@/hooks/use-toast';
import { 
  Shield, 
  FileText, 
  Download, 
  CheckCircle, 
  Award, 
  Calendar, 
  Clock, 
  MapPin, 
  Smartphone, 
  Globe 
} from 'lucide-react';

interface ContratoSuccessPageProps {
  contratoFinalizado: ContratoData;
}

export function ContratoSuccessPage({ contratoFinalizado }: ContratoSuccessPageProps) {
  const handleDownloadPDF = () => {
    try {
      const htmlContent = gerarPDFContrato(contratoFinalizado);
      downloadPDF(htmlContent, `contrato_${contratoFinalizado.nomeCliente}_${contratoFinalizado.dataAceite.replace(/\//g, '-')}`);
      
      toast({
        title: "Download iniciado",
        description: "O arquivo HTML do contrato será baixado automaticamente.",
      });
    } catch (error) {
      console.error('Erro no download:', error);
      toast({
        title: "Erro no download",
        description: "Não foi possível gerar o arquivo.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header com animação */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-2xl animate-glow">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Award className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Contrato Aceito!
                </h1>
                <div className="flex items-center justify-center gap-2 text-lg text-emerald-700">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Assinatura Digital Validada</span>
                </div>
              </div>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-xl text-gray-700 mb-4">
                Parabéns <span className="font-bold text-emerald-700">{contratoFinalizado.nomeCliente}</span>! 
              </p>
              <p className="text-lg text-gray-600">
                Seu contrato foi aceito digitalmente e registrado com máxima segurança em nosso sistema.
                Todos os dados foram criptografados e autenticados.
              </p>
            </div>
          </div>

          {/* Cards principais */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Card de Informações do Aceite */}
            <Card className="shadow-3xl bg-white/70 backdrop-blur-lg border-white/20 animate-scale-in">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Detalhes do Aceite</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <Label className="text-sm font-semibold text-blue-900">Data do Aceite</Label>
                      </div>
                      <p className="text-lg font-bold text-blue-800">{contratoFinalizado.dataAceite}</p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        <Label className="text-sm font-semibold text-emerald-900">Horário</Label>
                      </div>
                      <p className="text-lg font-bold text-emerald-800">{contratoFinalizado.horaAceite}</p>
                    </div>
                  </div>

                  {contratoFinalizado.email && (
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                      <Label className="text-sm font-semibold text-purple-900 block mb-2">E-mail Registrado</Label>
                      <p className="text-lg font-medium text-purple-800">{contratoFinalizado.email}</p>
                    </div>
                  )}
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Smartphone className="h-4 w-4 text-gray-600" />
                        <Label className="text-xs font-medium text-gray-500">Dispositivo</Label>
                      </div>
                      <p className="text-sm text-gray-700 truncate">{contratoFinalizado.dispositivo}</p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Globe className="h-4 w-4 text-gray-600" />
                        <Label className="text-xs font-medium text-gray-500">IP</Label>
                      </div>
                      <p className="text-sm font-mono text-gray-700">{contratoFinalizado.ipAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card da Assinatura */}
            <Card className="shadow-3xl bg-white/70 backdrop-blur-lg border-white/20 animate-scale-in">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Assinatura Digital</h2>
                </div>
                
                <div className="text-center">
                  <div className="relative inline-block p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-emerald-200 shadow-lg">
                    <div className="absolute -top-3 -right-3 h-8 w-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <img 
                      src={contratoFinalizado.assinatura} 
                      alt="Assinatura Digital Validada" 
                      className="max-w-full h-24 object-contain mx-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-4 max-w-xs mx-auto">
                    Assinatura validada e protegida por criptografia avançada
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Ações principais */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in">
            <Button 
              onClick={handleDownloadPDF}
              size="lg"
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Download className="h-6 w-6" />
              Baixar Contrato (HTML)
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="flex items-center gap-3 px-8 py-4 text-lg font-semibold border-2 border-blue-200 hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              onClick={() => window.location.href = '/'}
            >
              <FileText className="h-6 w-6" />
              Voltar ao Sistema
            </Button>
          </div>

          {/* Certificações e Segurança */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/30 text-center">
              <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-green-800 mb-2">Juridicamente Válido</h3>
              <p className="text-sm text-green-700">
                Conforme Lei 14.063/2020 sobre assinaturas eletrônicas
              </p>
            </Card>

            <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/30 text-center">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-blue-800 mb-2">Criptografia Avançada</h3>
              <p className="text-sm text-blue-700">
                Dados protegidos com hash SHA-256 e timestamp
              </p>
            </Card>

            <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/30 text-center">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-purple-800 mb-2">Rastreabilidade Total</h3>
              <p className="text-sm text-purple-700">
                IP, dispositivo e localização registrados
              </p>
            </Card>
          </div>

          {/* Footer informativo */}
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                Certificado de Autenticidade Digital
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">🔒 Segurança Garantida:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Timestamp criptográfico irrefutável</li>
                    <li>• Hash de integridade do documento</li>
                    <li>• Registro de IP e geolocalização</li>
                    <li>• Assinatura biométrica digital</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">⚖️ Validade Legal:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Conforme Lei 14.063/2020</li>
                    <li>• Aceito em tribunais brasileiros</li>
                    <li>• Equivalente à assinatura manuscrita</li>
                    <li>• Arquivo permanente e auditável</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-200">
                <p className="text-sm text-gray-600 italic">
                  Documento gerado automaticamente pelo <strong>CRM INPI - Sistema de Marcas</strong> em {new Date().toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
