
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Zap, Users, Award, Clock } from 'lucide-react';

interface VersionSelectorProps {
  versaoAtual: 'original' | 'premium';
  onMudarVersao: (versao: 'original' | 'premium') => void;
}

export function VersionSelector({ versaoAtual, onMudarVersao }: VersionSelectorProps) {
  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Escolha a Versão do Sistema de Contratos
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Selecione entre nossa versão original simples ou a versão premium com validações avançadas de segurança
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Versão Original */}
        <Card className={`p-6 cursor-pointer transition-all duration-300 ${
          versaoAtual === 'original' 
            ? 'border-2 border-blue-500 bg-blue-50 shadow-lg' 
            : 'border border-gray-200 hover:border-gray-300 hover:shadow-md'
        }`}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <FileText className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Versão Original
            </h3>
            
            <Badge variant="secondary" className="mb-4">
              Simples e Eficiente
            </Badge>
            
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Leitura obrigatória do contrato</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Assinatura digital básica</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Registro de IP e dispositivo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Timestamp de aceite</span>
              </div>
            </div>
            
            <Button
              onClick={() => onMudarVersao('original')}
              variant={versaoAtual === 'original' ? 'default' : 'outline'}
              className="w-full"
            >
              {versaoAtual === 'original' ? 'Versão Atual' : 'Usar Versão Original'}
            </Button>
          </div>
        </Card>

        {/* Versão Premium */}
        <Card className={`p-6 cursor-pointer transition-all duration-300 relative overflow-hidden ${
          versaoAtual === 'premium' 
            ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg' 
            : 'border border-gray-200 hover:border-blue-300 hover:shadow-md'
        }`}>
          {/* Premium Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Award className="h-3 w-3 mr-1" />
              PREMIUM
            </Badge>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Versão Premium
            </h3>
            
            <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800">
              Máxima Segurança Jurídica
            </Badge>
            
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Tempo mínimo de leitura obrigatório</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>Validação biométrica simulada</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Captura de selfie para verificação</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Análise de métricas de assinatura</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                <span>Localização GPS (opcional)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span>Hash de integridade do documento</span>
              </div>
            </div>
            
            <Button
              onClick={() => onMudarVersao('premium')}
              variant={versaoAtual === 'premium' ? 'default' : 'outline'}
              className={`w-full ${
                versaoAtual === 'premium' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                  : 'border-blue-300 hover:bg-blue-50'
              }`}
            >
              {versaoAtual === 'premium' ? 'Versão Atual' : 'Ativar Versão Premium'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Informações Legais */}
      <div className="mt-6 text-center text-sm text-gray-500 bg-white/70 rounded-lg p-4">
        <p>
          <strong>Nota Legal:</strong> Ambas as versões possuem validade jurídica conforme a legislação brasileira sobre assinaturas eletrônicas. 
          A versão premium oferece camadas adicionais de segurança e validação para casos que exigem maior rigor probatório.
        </p>
      </div>
    </div>
  );
}
