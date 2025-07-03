
import { Mail, Phone, Eye, Tag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ClienteDetalhesModal } from "./ClienteDetalhesModal";
import type { Cliente } from "@/types";

interface ClientesTabelaProps {
  clientes: Cliente[];
}

export function ClientesTabela({ clientes }: ClientesTabelaProps) {
  const navigate = useNavigate();
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewPortal = (clienteId: string) => {
    navigate(`/portal/${clienteId}`);
  };

  const handleViewDetails = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };

  const getOrigemBadge = (origem: string) => {
    if (origem === 'formulario') {
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Tag className="h-3 w-3 mr-1" />
          Formulário
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
        <Tag className="h-3 w-3 mr-1" />
        Manual
      </Badge>
    );
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>CPF/CNPJ</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Total Marcas</TableHead>
              <TableHead>Marcas Ativas</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{cliente.nome}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {cliente.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {cliente.telefone}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{cliente.cpfCnpj}</TableCell>
                <TableCell>
                  {getOrigemBadge(cliente.origem)}
                </TableCell>
                <TableCell>{cliente.totalMarcas}</TableCell>
                <TableCell>
                  <span className="text-green-600 font-medium">
                    {cliente.marcasAtivas}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(cliente)}
                      title="Ver detalhes completos do cliente"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewPortal(cliente.id)}
                      title="Ver portal do cliente"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Enviar email">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedCliente && (
        <ClienteDetalhesModal
          cliente={selectedCliente}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCliente(null);
          }}
        />
      )}
    </>
  );
}
