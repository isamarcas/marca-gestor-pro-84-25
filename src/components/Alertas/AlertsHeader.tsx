
import { AlertTriangle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface AlertsHeaderProps {
  filtroTipo: string;
  filtroPrioridade: string;
  onFiltrarTipo: (tipo: string) => void;
  onFiltrarPrioridade: (prioridade: string) => void;
}

export function AlertsHeader({ 
  filtroTipo, 
  filtroPrioridade, 
  onFiltrarTipo, 
  onFiltrarPrioridade 
}: AlertsHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-red-100 rounded-xl">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alertas</h1>
          <p className="text-gray-600 mt-1">Gerencie alertas importantes do sistema</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Tipo:</span>
          <Select value={filtroTipo} onValueChange={onFiltrarTipo}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="prazo">Prazo</SelectItem>
              <SelectItem value="renovacao">Renovação</SelectItem>
              <SelectItem value="oposicao">Oposição</SelectItem>
              <SelectItem value="recurso">Recurso</SelectItem>
              <SelectItem value="documentacao">Documentação</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Prioridade:</span>
          <Select value={filtroPrioridade} onValueChange={onFiltrarPrioridade}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="baixa">Baixa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
