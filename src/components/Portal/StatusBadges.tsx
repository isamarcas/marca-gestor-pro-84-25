
import React from 'react';
import { Award, CheckCircle, Clock, XCircle, RotateCcw, RefreshCcw, Pause } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface StatusBadgesProps {
  statsPersonalizadas: {
    totalMarcas: number;
    emAnalise: number;
    deferidas: number;
    alertas: number;
  };
}

export function StatusBadges({ statsPersonalizadas }: StatusBadgesProps) {
  const statusBadges = [
    {
      id: 'deferido',
      label: 'Deferido',
      color: 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      count: statsPersonalizadas.deferidas,
      tooltip: 'Marcas aprovadas pelo INPI'
    },
    {
      id: 'em_analise',
      label: 'Em Análise',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200',
      icon: Clock,
      iconColor: 'text-yellow-600',
      count: statsPersonalizadas.emAnalise,
      tooltip: 'Marcas em processo de análise'
    },
    {
      id: 'indeferido',
      label: 'Indeferido',
      color: 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200',
      icon: XCircle,
      iconColor: 'text-red-600',
      count: 0,
      tooltip: 'Marcas rejeitadas pelo INPI'
    },
    {
      id: 'recurso',
      label: 'Recurso',
      color: 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200',
      icon: RotateCcw,
      iconColor: 'text-orange-600',
      count: 0,
      tooltip: 'Marcas em processo de recurso'
    },
    {
      id: 'renovacao',
      label: 'Renovação',
      color: 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200',
      icon: RefreshCcw,
      iconColor: 'text-purple-600',
      count: 0,
      tooltip: 'Marcas em processo de renovação'
    },
    {
      id: 'oposicao',
      label: 'Oposição',
      color: 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200',
      icon: Pause,
      iconColor: 'text-blue-600',
      count: 0,
      tooltip: 'Marcas com oposição em andamento'
    }
  ];

  const handleStatusClick = (statusId: string) => {
    console.log(`Navegando para marcas com status: ${statusId}`);
  };

  return (
    <Card className="bg-gradient-to-br from-slate-50 via-white to-gray-50 border-gray-200 shadow-xl">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
            <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">Status das Marcas</CardTitle>
            <p className="text-gray-600 text-xs sm:text-sm">Clique nos cards para filtrar por status</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {statusBadges.map((status) => {
            const IconComponent = status.icon;
            return (
              <Tooltip key={status.id}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => handleStatusClick(status.id)}
                    className={`flex flex-col items-center p-3 sm:p-4 rounded-xl border-2 ${status.color} hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group`}
                  >
                    <div className="mb-2 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`h-5 w-5 sm:h-6 sm:w-6 ${status.iconColor}`} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-center mb-1 leading-tight">{status.label}</span>
                    <span className="text-xs font-bold opacity-70">{status.count}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{status.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
