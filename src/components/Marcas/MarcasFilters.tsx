
import { Search, Filter, Download, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusLabels = {
  deferido: 'Deferido',
  em_analise: 'Em Análise',
  indeferido: 'Indeferido',
  recurso: 'Recurso',
  renovacao: 'Renovação',
  oposicao: 'Oposição',
};

interface MarcasFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export function MarcasFilters({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange 
}: MarcasFiltersProps) {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          {/* Barra de pesquisa */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nome, número do processo ou titular..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          {/* Filtros e ações */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Select de status - mobile first */}
            <div className="flex-1 sm:flex-none sm:min-w-[200px]">
              <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Botões de ação */}
            <div className="flex gap-2 sm:gap-3">
              <Button 
                variant="outline" 
                className="flex-1 sm:flex-none min-w-0"
                size="default"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">Mais Filtros</span>
                <span className="sm:hidden">Filtros</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 sm:flex-none min-w-0"
                size="default"
              >
                <Download className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">Exportar</span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
