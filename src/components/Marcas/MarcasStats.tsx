
import { TrendingUp, FileCheck, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MarcasStatsProps {
  estatisticas: {
    totalMarcas: number;
    emAnalise: number;
    deferidas: number;
    alertas: number;
  };
}

export function MarcasStats({ estatisticas }: MarcasStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">Total de Marcas</p>
              <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-blue-600">{estatisticas.totalMarcas}</p>
              <p className="text-xs text-green-600 font-medium">Sistema ativo</p>
            </div>
            <div className="flex-shrink-0">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">Em Análise</p>
              <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-orange-600">{estatisticas.emAnalise}</p>
            </div>
            <div className="flex-shrink-0">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">Deferidas</p>
              <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-green-600">{estatisticas.deferidas}</p>
              <p className="text-xs text-green-600 font-medium">{estatisticas.totalMarcas > 0 ? Math.round((estatisticas.deferidas / estatisticas.totalMarcas) * 100) : 0}% de sucesso</p>
            </div>
            <div className="flex-shrink-0">
              <FileCheck className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">Alertas</p>
              <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-red-600">{estatisticas.alertas}</p>
            </div>
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
