
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Cliente } from "@/types";

interface EstatisticasMarcas {
  totalMarcas: number;
  deferidas: number;
  emAnalise: number;
  alertas: number;
}

interface StatsAlertas {
  total: number;
  ativos: number;
  resolvidos: number;
  alta: number;
}

interface Alerta {
  id: number;
  titulo: string;
  prioridade: 'alta' | 'media' | 'baixa';
  status: string;
  prazo: string;
}

interface RelatorioRiscosProps {
  clientes: Cliente[];
  estatisticasMarcas: EstatisticasMarcas;
  statsAlertas: StatsAlertas;
  alertas: Alerta[];
}

export function RelatorioRiscos({
  clientes,
  estatisticasMarcas,
  statsAlertas,
  alertas
}: RelatorioRiscosProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Riscos e Oportunidades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Riscos Identificados</h4>
            <p className="text-red-700">Alertas de alta prioridade: {statsAlertas.alta}</p>
            <p className="text-red-700">Marcas próximas ao vencimento: {estatisticasMarcas.alertas}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Oportunidades</h4>
            <p className="text-green-700">Marcas deferidas para renovação: {estatisticasMarcas.deferidas}</p>
            <p className="text-green-700">Novos clientes este mês: {clientes.filter(c => {
              const created = new Date(c.createdAt);
              const now = new Date();
              return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
            }).length}</p>
          </div>
        </div>

        {alertas.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Alertas Recentes</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prazo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alertas.slice(0, 5).map((alerta) => (
                  <TableRow key={alerta.id}>
                    <TableCell>{alerta.titulo}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        alerta.prioridade === 'alta' ? 'bg-red-100 text-red-800' :
                        alerta.prioridade === 'media' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {alerta.prioridade}
                      </span>
                    </TableCell>
                    <TableCell>{alerta.status}</TableCell>
                    <TableCell>{format(new Date(alerta.prazo), 'dd/MM/yyyy')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
