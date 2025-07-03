
import { CadastroClienteMultiStep } from "@/components/CadastroClienteMultiStep";
import { GerenciarPortalDialog } from "./GerenciarPortalDialog";

interface ClientesHeaderProps {
  onAddCliente: (novoCliente: any) => Promise<boolean>;
}

export function ClientesHeader({ onAddCliente }: ClientesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <p className="text-gray-600 mt-1">
          Visualize todos os clientes do sistema (cadastrados manualmente e via formulário)
        </p>
      </div>
      
      <div className="flex gap-3">
        <GerenciarPortalDialog />
        <CadastroClienteMultiStep onAddCliente={onAddCliente} />
      </div>
    </div>
  );
}
