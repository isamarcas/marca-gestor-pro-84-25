
import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        
        return (
          <div key={stepNumber} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  isCompleted
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : isCurrent
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : 'border-gray-300 text-gray-400 bg-white'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  isCompleted || isCurrent ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {stepLabels[index]}
              </span>
            </div>
            {stepNumber < totalSteps && (
              <div
                className={`w-16 h-0.5 mx-4 ${
                  isCompleted ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
