
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function ConfigurationWarning() {
  return (
    <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-amber-800">Configuração necessária</p>
          <p className="text-amber-700 mt-1">
            Para enviar e-mails reais, você precisa configurar um serviço como EmailJS ou ter um endpoint backend.
            Atualmente o sistema tentará usar uma API local em /api/send-email.
          </p>
        </div>
      </div>
    </div>
  );
}
