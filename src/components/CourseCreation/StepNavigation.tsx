
import React from 'react';
import { Check } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const StepNavigation = ({ currentStep, totalSteps, stepLabels }: StepNavigationProps) => {
  const getStepIcon = (step: number, currentStep: number) => {
    if (step < currentStep) {
      return <Check className="h-5 w-5" />;
    }
    return <span>{step}</span>;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        <div className="flex items-center">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <React.Fragment key={index}>
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full 
                  ${currentStep >= index + 1 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
              >
                {getStepIcon(index + 1, currentStep)}
              </div>
              {index < totalSteps - 1 && (
                <div 
                  className={`w-24 h-1 mx-2 
                    ${currentStep > index + 1 
                      ? 'bg-blue-500' 
                      : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-2">
        {stepLabels.map((label, index) => (
          <div key={index} className="text-center w-36">
            <p className={`text-sm font-medium 
              ${currentStep >= index + 1 
                ? 'text-blue-500' 
                : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepNavigation;
