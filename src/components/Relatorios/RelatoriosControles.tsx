
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Filter, Calendar } from "lucide-react";
import { Cliente } from "@/types";

interface RelatoriosControlesProps {
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

export function RelatoriosControles({
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
}: RelatoriosControlesProps) {
  const tiposRelatorio = [
    { value: 'overview', label: 'Visão Geral' },
    { value: 'marcas', label: 'Portfolio de Marcas' },
    { value: 'vencimentos', label: 'Prazos & Vencimentos' },
    { value: 'riscos', label: 'Análise de Riscos' },
    { value: 'financeiro', label: 'Performance Financeira' },
    { value: 'clientes', label: 'Gestão de Clientes' },
    { value: 'competitivo', label: 'Inteligência Competitiva' },
    { value: 'compliance', label: 'Compliance & Auditoria' }
  ];

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col space-y-4">
          {/* Primeira linha - Tipo de relatório */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium min-w-fit">
              <Filter className="h-4 w-4" />
              <span className="text-sm sm:text-base">Filtros:</span>
            </div>
            <div className="flex-1">
              <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="Tipo de relatório" />
                </SelectTrigger>
                <SelectContent>
                  {tiposRelatorio.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>{tipo.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Segunda linha - Período e Cliente */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Período */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:flex-1">
              <div className="flex items-center gap-2 text-gray-700 font-medium min-w-fit">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Período:</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Input
                  type="date"
                  value={periodoInicio}
                  onChange={(e) => setPeriodoInicio(e.target.value)}
                  className="w-full sm:w-36"
                />
                <span className="text-center text-gray-500 text-sm sm:self-center hidden sm:block">até</span>
                <Input
                  type="date"
                  value={periodoFim}
                  onChange={(e) => setPeriodoFim(e.target.value)}
                  className="w-full sm:w-36"
                />
              </div>
            </div>
            
            {/* Cliente e Exportar */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-1 lg:justify-end">
              <Select value={clienteFiltro} onValueChange={setClienteFiltro}>
                <SelectTrigger className="w-full sm:w-48">
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
              
              <Button 
                onClick={onExportar} 
                variant="outline" 
                className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 border-blue-600 hover:border-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                <span className="sm:inline">Exportar</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
