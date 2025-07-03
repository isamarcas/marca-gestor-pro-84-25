
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Marca } from "@/types";

interface TabelaMarcasProps {
  marcas: Marca[];
}

export function TabelaMarcas({ marcas }: TabelaMarcasProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Número do Processo</TableHead>
          <TableHead>Titular</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Data Depósito</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {marcas.map((marca) => (
          <TableRow key={marca.id}>
            <TableCell className="font-medium">{marca.nome}</TableCell>
            <TableCell>{marca.numeroProcesso}</TableCell>
            <TableCell>{marca.titular}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                marca.status === 'deferido' ? 'bg-green-100 text-green-800' :
                marca.status === 'em_analise' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {marca.status}
              </span>
            </TableCell>
            <TableCell>{format(new Date(marca.dataDeposito), 'dd/MM/yyyy')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
