
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from "lucide-react";
import { ClientesTabela } from "./ClientesTabela";
import { Cliente } from "@/types";

interface ClientesListSectionProps {
  clientes: Cliente[];
  filteredClientes: Cliente[];
  searchTerm: string;
}

export function ClientesListSection({ 
  clientes, 
  filteredClientes, 
  searchTerm 
}: ClientesListSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div>
            <span>
              Lista de Clientes ({filteredClientes.length})
              {clientes.length !== filteredClientes.length && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (de {clientes.length} total)
                </span>
              )}
            </span>
            <div className="text-sm font-normal text-gray-600 mt-1">
              Manuais: {clientes.filter(c => c.origem === 'manual').length} | 
              Formulário: {clientes.filter(c => c.origem === 'formulario').length}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <div className="overflow-x-auto">
          {filteredClientes.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">
                {searchTerm 
                  ? 'Nenhum cliente encontrado com os filtros aplicados.'
                  : 'Nenhum cliente cadastrado ainda.'}
              </p>
            </div>
          ) : (
            <ClientesTabela clientes={filteredClientes} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
