
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Cliente } from "@/types";

interface TabelaClientesProps {
  clientes: Cliente[];
}

export function TabelaClientes({ clientes }: TabelaClientesProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>CPF/CNPJ</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Data Cadastro</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clientes.map((cliente) => (
          <TableRow key={cliente.id}>
            <TableCell className="font-medium">{cliente.nome}</TableCell>
            <TableCell>{cliente.email}</TableCell>
            <TableCell>{cliente.cpfCnpj}</TableCell>
            <TableCell>
              <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                {cliente.tipoCliente === 'pessoa_fisica' ? 'Pessoa Física' : 'Pessoa Jurídica'}
              </span>
            </TableCell>
            <TableCell>{format(new Date(cliente.createdAt), 'dd/MM/yyyy')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
