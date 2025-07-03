
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export function StepIndicator({ currentStep, totalSteps, stepTitles }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium
                    ${isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isCurrent 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'bg-gray-100 border-gray-300 text-gray-500'
                    }
                  `}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                </div>
                {stepNumber < totalSteps && (
                  <div
                    className={`
                      flex-1 h-0.5 mx-2
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}
                    `}
                  />
                )}
              </div>
              <span
                className={`
                  text-xs mt-2 text-center
                  ${isCurrent ? 'text-blue-600 font-medium' : 'text-gray-500'}
                `}
              >
                {title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
