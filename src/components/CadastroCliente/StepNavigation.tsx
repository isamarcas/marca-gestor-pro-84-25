
import { useState } from 'react';

export function useStepNavigation(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetStep = () => {
    setCurrentStep(1);
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    resetStep,
    setCurrentStep,
  };
}
