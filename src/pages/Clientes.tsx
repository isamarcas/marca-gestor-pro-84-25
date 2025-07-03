
import { Card, CardContent } from '@/components/ui/card';
import { ClientesHeader } from "@/components/Clientes/ClientesHeader";
import { ClientesFiltro } from "@/components/Clientes/ClientesFiltro";
import { ClientesListSection } from "@/components/Clientes/ClientesListSection";
import { useClientesPage } from "@/hooks/useClientesPage";

export default function Clientes() {
  const {
    clientes,
    filteredClientes,
    searchTerm,
    setSearchTerm,
    handleAddCliente,
  } = useClientesPage();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <ClientesHeader onAddCliente={handleAddCliente} />

      <Card>
        <CardContent className="p-3 sm:p-4">
          <ClientesFiltro
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </CardContent>
      </Card>

      <ClientesListSection
        clientes={clientes}
        filteredClientes={filteredClientes}
        searchTerm={searchTerm}
      />
    </div>
  );
}
