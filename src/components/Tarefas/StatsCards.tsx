
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    total: number;
    pendentes: number;
    emAndamento: number;
    concluidas: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total de Tarefas</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Calendar className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600 flex-shrink-0 ml-2" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Pendentes</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600">{stats.pendentes}</p>
            </div>
            <Clock className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-yellow-600 flex-shrink-0 ml-2" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Em Andamento</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">{stats.emAndamento}</p>
            </div>
            <AlertTriangle className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600 flex-shrink-0 ml-2" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Concluídas</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">{stats.concluidas}</p>
            </div>
            <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600 flex-shrink-0 ml-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
