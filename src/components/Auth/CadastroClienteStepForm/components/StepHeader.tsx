
import { Progress } from '@/components/ui/progress';
import { stepTitles, stepIcons, totalSteps } from '../constants';

interface StepHeaderProps {
  currentStep: number;
}

export function StepHeader({ currentStep }: StepHeaderProps) {
  const StepIcon = stepIcons[currentStep - 1];
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <StepIcon className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{stepTitles[currentStep - 1]}</h3>
          <p className="text-sm text-gray-600">Etapa {currentStep} de {totalSteps}</p>
        </div>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
}
