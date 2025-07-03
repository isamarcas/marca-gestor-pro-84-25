
import { Button } from "@/components/ui/button";
import { RefreshCw, Bug } from "lucide-react";

interface ClientesPageHeaderProps {
  isReloading: boolean;
  onForceReload: () => void;
  onDebugManual: () => void;
}

export function ClientesPageHeader({ 
  isReloading, 
  onForceReload, 
  onDebugManual 
}: ClientesPageHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
        <p className="text-gray-600 mt-2">
          Visualize todos os clientes cadastrados no sistema (manuais e via formulário)
        </p>
      </div>
      
      <div className="flex gap-3">
        <Button 
          onClick={onForceReload}
          variant="outline"
          disabled={isReloading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isReloading ? 'animate-spin' : ''}`} />
          {isReloading ? 'Atualizando...' : 'Atualizar'}
        </Button>
        <Button 
          onClick={onDebugManual}
          variant="outline"
          className="flex items-center gap-2"
          title="Debug manual do storage"
        >
          <Bug className="h-4 w-4" />
          Debug
        </Button>
      </div>
    </div>
  );
}
