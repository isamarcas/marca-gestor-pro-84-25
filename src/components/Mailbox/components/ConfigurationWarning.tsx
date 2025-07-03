
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfigurationWarningProps {
  errors: string[];
}

export function ConfigurationWarning({ errors }: ConfigurationWarningProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-red-800">Configuração incompleta</p>
          <ul className="text-red-700 mt-1 list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
