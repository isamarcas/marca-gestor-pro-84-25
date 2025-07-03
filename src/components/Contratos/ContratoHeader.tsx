
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft } from 'lucide-react';

interface ContratoHeaderProps {
  step: string;
  versao: 'original' | 'premium';
  onVoltarParaSelecao: () => void;
}

// Memoize para evitar re-renders desnecessários
export const ContratoHeader = memo(function ContratoHeader({ step, versao, onVoltarParaSelecao }: ContratoHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg p-6 mb-8 border border-white/20">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CRM INPI - Sistema de Marcas
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">contato@crminpi.com.br | (11) 99999-9999</p>
              {step !== 'versao' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onVoltarParaSelecao}
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Trocar Versão
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <h2 className="text-xl font-semibold text-gray-900">
            Contrato de Prestação de Serviços
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">Assinatura Digital Segura</p>
            {step !== 'versao' && (
              <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-200 ${
                versao === 'premium' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {versao === 'premium' ? 'Premium' : 'Original'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
