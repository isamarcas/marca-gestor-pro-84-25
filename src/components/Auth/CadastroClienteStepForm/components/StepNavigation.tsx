
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, UserPlus, Loader2 } from 'lucide-react';
import { totalSteps } from '../constants';

interface StepNavigationProps {
  currentStep: number;
  isLoading: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function StepNavigation({ 
  currentStep, 
  isLoading, 
  onPrev, 
  onNext, 
  onSubmit 
}: StepNavigationProps) {
  return (
    <div className="flex justify-between pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onPrev}
        disabled={currentStep === 1 || isLoading}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      {currentStep < totalSteps ? (
        <Button
          type="button"
          onClick={onNext}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          Próximo
          <ChevronRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cadastrando...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Criar Conta
            </>
          )}
        </Button>
      )}
    </div>
  );
}
