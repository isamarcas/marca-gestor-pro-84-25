
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Tarefa } from "@/types";

interface TabelaTarefasProps {
  tarefas: Tarefa[];
}

export function TabelaTarefas({ tarefas }: TabelaTarefasProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Responsável</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Prioridade</TableHead>
          <TableHead>Prazo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tarefas.map((tarefa) => (
          <TableRow key={tarefa.id}>
            <TableCell className="font-medium">{tarefa.titulo}</TableCell>
            <TableCell>{tarefa.responsavel}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                tarefa.status === 'concluida' ? 'bg-green-100 text-green-800' :
                tarefa.status === 'em_andamento' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {tarefa.status}
              </span>
            </TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                tarefa.prioridade === 'alta' ? 'bg-red-100 text-red-800' :
                tarefa.prioridade === 'media' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {tarefa.prioridade}
              </span>
            </TableCell>
            <TableCell>{format(new Date(tarefa.prazo), 'dd/MM/yyyy')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
