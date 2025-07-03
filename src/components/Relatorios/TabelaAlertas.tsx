
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

interface Alerta {
  id: number;
  titulo: string;
  tipo: string;
  prioridade: 'alta' | 'media' | 'baixa';
  status: 'ativo' | 'resolvido' | 'adiado';
  prazo: string;
}

interface TabelaAlertasProps {
  alertas: Alerta[];
}

export function TabelaAlertas({ alertas }: TabelaAlertasProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Prioridade</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Prazo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alertas.map((alerta) => (
          <TableRow key={alerta.id}>
            <TableCell className="font-medium">{alerta.titulo}</TableCell>
            <TableCell>{alerta.tipo}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                alerta.prioridade === 'alta' ? 'bg-red-100 text-red-800' :
                alerta.prioridade === 'media' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {alerta.prioridade}
              </span>
            </TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                alerta.status === 'ativo' ? 'bg-red-100 text-red-800' :
                alerta.status === 'resolvido' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {alerta.status}
              </span>
            </TableCell>
            <TableCell>{format(new Date(alerta.prazo), 'dd/MM/yyyy')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
