
import React from 'react';
import { Search, RefreshCw, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NovaLicencaDialog } from './NovaLicencaDialog';

interface LicencasFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  planoFilter: string;
  setPlanoFilter: (plano: string) => void;
  onVerificarAlertas: () => void;
  onExportarRelatorio: () => void;
}

export function LicencasFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  planoFilter,
  setPlanoFilter,
  onVerificarAlertas,
  onExportarRelatorio,
}: LicencasFiltersProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Filtros e Ações</span>
          <NovaLicencaDialog />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por cliente ou número da licença..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="ativa">Ativa</SelectItem>
              <SelectItem value="vencida">Vencida</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="suspensa">Suspensa</SelectItem>
            </SelectContent>
          </Select>
          <Select value={planoFilter} onValueChange={setPlanoFilter}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Plano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Planos</SelectItem>
              <SelectItem value="basico">Básico</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onVerificarAlertas}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Verificar Alertas
            </Button>
            <Button variant="outline" onClick={onExportarRelatorio}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
