
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Cliente } from "@/types";

interface RelatorioControlesProps {
  tipoRelatorio: string;
  setTipoRelatorio: (tipo: string) => void;
  periodoInicio: string;
  setPeriodoInicio: (data: string) => void;
  periodoFim: string;
  setPeriodoFim: (data: string) => void;
  clienteFiltro: string;
  setClienteFiltro: (cliente: string) => void;
  clientes: Cliente[];
  onExportar: () => void;
}

export function RelatorioControles({
  tipoRelatorio,
  setTipoRelatorio,
  periodoInicio,
  setPeriodoInicio,
  periodoFim,
  setPeriodoFim,
  clienteFiltro,
  setClienteFiltro,
  clientes,
  onExportar
}: RelatorioControlesProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tipo de relatório" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dashboard">Dashboard Geral</SelectItem>
              <SelectItem value="riscos">Riscos e Oportunidades</SelectItem>
              <SelectItem value="custos">Análise de Custos</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Input
              type="date"
              value={periodoInicio}
              onChange={(e) => setPeriodoInicio(e.target.value)}
              className="w-40"
            />
            <Input
              type="date"
              value={periodoFim}
              onChange={(e) => setPeriodoFim(e.target.value)}
              className="w-40"
            />
          </div>
          
          <Select value={clienteFiltro} onValueChange={setClienteFiltro}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os clientes</SelectItem>
              {clientes.map((cliente) => (
                <SelectItem key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button onClick={onExportar} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
