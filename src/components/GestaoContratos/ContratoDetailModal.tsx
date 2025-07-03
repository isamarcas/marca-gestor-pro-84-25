
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ContratoData } from '@/types/contratos';
import { 
  FileText, 
  Download, 
  Shield, 
  Calendar,
  User,
  MapPin,
  Smartphone,
  Award,
  Clock,
  Mail,
  Globe,
  CheckCircle,
  Copy,
  X
} from 'lucide-react';

interface ContratoDetailModalProps {
  contrato: ContratoData | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (contrato: ContratoData) => void;
  onCopyToClipboard: (text: string, label: string) => void;
  formatarDataHora: (data: string, hora: string) => string;
  obterVersaoContrato: (contrato: ContratoData) => string;
}

export function ContratoDetailModal({
  contrato,
  isOpen,
  onClose,
  onDownload,
  onCopyToClipboard,
  formatarDataHora,
  obterVersaoContrato
}: ContratoDetailModalProps) {
  if (!contrato) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            Detalhes do Contrato Digital
            <Badge 
              className={`ml-auto ${obterVersaoContrato(contrato) === 'Premium' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-gray-100 text-gray-800'
              }`}
            >
              {obterVersaoContrato(contrato) === 'Premium' && (
                <Award className="h-3 w-3 mr-1" />
              )}
              {obterVersaoContrato(contrato)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Informações do Cliente */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações do Cliente
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-blue-700">Nome Completo</Label>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-blue-900">{contrato.nomeCliente}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCopyToClipboard(contrato.nomeCliente, 'Nome')}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-blue-700">E-mail</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <p className="text-blue-900">{contrato.email || 'Não informado'}</p>
                  {contrato.email && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCopyToClipboard(contrato.email!, 'E-mail')}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Informações da Assinatura */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Dados da Assinatura Digital
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-green-700">Data e Hora</Label>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <p className="text-green-900 font-medium">
                    {formatarDataHora(contrato.dataAceite, contrato.horaAceite)}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-green-700">Status</Label>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Assinado Digitalmente
                </Badge>
              </div>
            </div>
          </div>

          {/* Informações Técnicas */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Informações Técnicas de Segurança
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Dispositivo</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Smartphone className="h-4 w-4 text-gray-600" />
                    <p className="text-sm text-gray-900 break-all">{contrato.dispositivo}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Endereço IP</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Globe className="h-4 w-4 text-gray-600" />
                    <p className="text-sm text-gray-900">{contrato.ipAddress}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCopyToClipboard(contrato.ipAddress!, 'IP')}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700">ID do Contrato</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-900">
                      {contrato.id}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCopyToClipboard(contrato.id, 'ID do Contrato')}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                {/* Hash SHA256 */}
                {(contrato.dadosPremium?.validacoes?.hashDocumento) && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Hash SHA-256</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Shield className="h-4 w-4 text-gray-600" />
                      <p className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-900 break-all">
                        {contrato.dadosPremium.validacoes.hashDocumento}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCopyToClipboard(
                          contrato.dadosPremium?.validacoes?.hashDocumento!, 
                          'Hash SHA-256'
                        )}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Assinatura Digital */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Assinatura Digital Validada
            </Label>
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <img 
                src={contrato.assinatura} 
                alt="Assinatura Digital" 
                className="max-w-full h-24 object-contain mx-auto mb-2"
              />
              <p className="text-sm text-gray-600">
                Assinatura capturada em {formatarDataHora(contrato.dataAceite, contrato.horaAceite)}
              </p>
            </div>
          </div>

          {/* Recursos Premium */}
          {contrato.dadosPremium?.versao === 'premium' && (
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recursos Premium Ativados
              </h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-purple-700">
                  <CheckCircle className="h-4 w-4" />
                  Validação biométrica realizada
                </div>
                <div className="flex items-center gap-2 text-purple-700">
                  <CheckCircle className="h-4 w-4" />
                  Selfie de verificação capturada
                </div>
                <div className="flex items-center gap-2 text-purple-700">
                  <CheckCircle className="h-4 w-4" />
                  Métricas comportamentais analisadas
                </div>
                <div className="flex items-center gap-2 text-purple-700">
                  <CheckCircle className="h-4 w-4" />
                  Localização geográfica registrada
                </div>
                <div className="flex items-center gap-2 text-purple-700">
                  <CheckCircle className="h-4 w-4" />
                  Hash criptográfico SHA-256
                </div>
                <div className="flex items-center gap-2 text-purple-700">
                  <CheckCircle className="h-4 w-4" />
                  Certificação digital avançada
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3 mt-6 pt-4 border-t">
          <Button
            onClick={() => onDownload(contrato)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            Baixar Contrato em PDF
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
