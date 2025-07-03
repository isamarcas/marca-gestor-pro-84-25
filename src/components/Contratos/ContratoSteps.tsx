
import { memo } from 'react';

interface ContratoStepsProps {
  currentStep: string;
  versao: 'original' | 'premium';
}

// Memoize para evitar re-renders quando as props não mudarem
export const ContratoSteps = memo(function ContratoSteps({ currentStep, versao }: ContratoStepsProps) {
  const steps = ['dados', 'contrato', 'assinatura'];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-4 mb-4">
        {steps.map((stepName, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepName;
          const isCompleted = steps.indexOf(currentStep) > index;
          
          return (
            <div key={stepName} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200
                ${isActive ? 'bg-blue-600 text-white' : 
                  isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}
              `}>
                {isCompleted ? '✓' : stepNumber}
              </div>
              {index < 2 && (
                <div className={`w-12 h-1 mx-2 transition-colors duration-200 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-600">
          {currentStep === 'dados' && 'Passo 1: Identificação'}
          {currentStep === 'contrato' && `Passo 2: Leitura do Contrato ${versao === 'premium' ? '(Premium)' : ''}`}
          {currentStep === 'assinatura' && `Passo 3: Assinatura Digital ${versao === 'premium' ? '(Premium)' : ''}`}
        </p>
      </div>
    </div>
  );
});
