
import { memo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ContratoViewer } from '@/components/Contratos/ContratoViewer';
import { ContratoViewerPremium } from '@/components/Contratos/ContratoViewerPremium';
import { AssinaturaDigital } from '@/components/Contratos/AssinaturaDigital';
import { AssinaturaDigitalPremium } from '@/components/Contratos/AssinaturaDigitalPremium';

interface ContratoFormProps {
  step: 'dados' | 'contrato' | 'assinatura';
  versao: 'original' | 'premium';
  nomeCliente: string;
  emailCliente: string;
  leituraCompleta: boolean;
  contratoTexto: string;
  dadosValidacaoPremium: any;
  isLoading: boolean;
  onNomeChange: (nome: string) => void;
  onEmailChange: (email: string) => void;
  onLeituraCompleta: (completa: boolean) => void;
  onProximoStep: () => void;
  onValidacaoPremiumCompleta: (dados: any) => void;
  onAssinaturaCompleta: (dadosAssinatura: any) => void;
}

// Memoize o componente para evitar re-renders desnecessários
export const ContratoForm = memo(function ContratoForm({
  step,
  versao,
  nomeCliente,
  emailCliente,
  leituraCompleta,
  contratoTexto,
  dadosValidacaoPremium,
  isLoading,
  onNomeChange,
  onEmailChange,
  onLeituraCompleta,
  onProximoStep,
  onValidacaoPremiumCompleta,
  onAssinaturaCompleta
}: ContratoFormProps) {
  if (step === 'dados') {
    return (
      <Card className="shadow-xl">
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Identificação do Cliente
          </h2>
          
          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <Label htmlFor="nome" className="text-base font-medium">
                Nome Completo *
              </Label>
              <Input
                id="nome"
                value={nomeCliente}
                onChange={(e) => onNomeChange(e.target.value)}
                placeholder="Digite seu nome completo"
                className="mt-2 text-lg p-3"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-base font-medium">
                E-mail (opcional)
              </Label>
              <Input
                id="email"
                type="email"
                value={emailCliente}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="seu@email.com"
                className="mt-2 text-lg p-3"
              />
            </div>
            
            <Button
              onClick={onProximoStep}
              disabled={!nomeCliente.trim()}
              className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700"
            >
              Continuar para o Contrato
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (step === 'contrato') {
    return (
      <div className="space-y-6">
        {versao === 'original' ? (
          <ContratoViewer
            contratoTexto={contratoTexto}
            onLeituraCompleta={onLeituraCompleta}
          />
        ) : (
          <ContratoViewerPremium
            contratoTexto={contratoTexto}
            onLeituraCompleta={onLeituraCompleta}
            onValidacaoCompleta={onValidacaoPremiumCompleta}
          />
        )}
        
        <div className="text-center">
          <Button
            onClick={onProximoStep}
            disabled={!leituraCompleta}
            className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
          >
            {leituraCompleta ? 'Prosseguir para Assinatura' : 'Complete a leitura primeiro'}
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'assinatura') {
    return (
      <div className="space-y-6">
        {versao === 'original' ? (
          <AssinaturaDigital
            onAssinaturaCompleta={onAssinaturaCompleta}
            disabled={isLoading}
          />
        ) : (
          <AssinaturaDigitalPremium
            onAssinaturaCompleta={onAssinaturaCompleta}
            disabled={isLoading}
            dadosValidacao={dadosValidacaoPremium}
          />
        )}
        
        <Card className="bg-blue-50 border-blue-200">
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              ⚖️ Informações Legais
            </h3>
            <p className="text-sm text-blue-700">
              Ao assinar digitalmente, você aceita todos os termos do contrato.<br />
              Esta assinatura possui validade jurídica conforme a legislação brasileira sobre assinaturas eletrônicas.
              {versao === 'premium' && (
                <><br /><strong>Versão Premium:</strong> Inclui validações biométricas adicionais para maior segurança jurídica.</>
              )}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return null;
});
