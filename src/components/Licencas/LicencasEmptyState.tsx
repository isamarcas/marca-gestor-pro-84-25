
import React from 'react';
import { Shield } from 'lucide-react';
import { NovaLicencaDialog } from './NovaLicencaDialog';

export function LicencasEmptyState() {
  return (
    <div className="text-center py-12">
      <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Nenhuma licença criada ainda
      </h3>
      <p className="text-gray-500 mb-4">
        Comece criando a primeira licença para seus clientes.
      </p>
      <NovaLicencaDialog />
    </div>
  );
}
