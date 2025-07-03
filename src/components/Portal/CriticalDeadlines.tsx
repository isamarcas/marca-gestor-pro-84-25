
import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PrazoProximo {
  id: string;
  marca: string;
  prazo: Date;
  tipo: string;
  urgencia: 'alta' | 'media' | 'baixa';
}

interface CriticalDeadlinesProps {
  prazosProximos: PrazoProximo[];
}

const urgenciaConfig = {
  alta: { 
    color: 'bg-red-100 text-red-800 border-red-200',
    badge: 'bg-red-500',
    icon: '🚨'
  },
  media: { 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    badge: 'bg-yellow-500',
    icon: '⚠️'
  },
  baixa: { 
    color: 'bg-green-100 text-green-800 border-green-200',
    badge: 'bg-green-500',
    icon: '✅'
  }
};

export function CriticalDeadlines({ prazosProximos }: CriticalDeadlinesProps) {
  const getUrgenciaColor = (urgencia: 'alta' | 'media' | 'baixa') => {
    return urgenciaConfig[urgencia];
  };

  return (
    <Card className="bg-gradient-to-br from-red-50 via-white to-rose-50 border-red-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-xl font-bold">Prazos Críticos</CardTitle>
              <p className="text-red-100 text-xs sm:text-sm">Monitoramento inteligente</p>
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-red-200 animate-pulse flex-shrink-0" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Prazos monitorados automaticamente</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {prazosProximos.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-600 font-medium text-sm sm:text-base">Nenhum prazo crítico</p>
              <p className="text-gray-400 text-xs sm:text-sm">Todos os prazos estão em dia</p>
            </div>
          ) : (
            prazosProximos.map((prazo) => {
              const config = getUrgenciaColor(prazo.urgencia);
              const diasRestantes = Math.ceil((prazo.prazo.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={prazo.id} className={`p-3 sm:p-4 rounded-xl border ${config.color} hover:shadow-lg transition-all duration-300 group cursor-pointer hover:scale-[1.02]`}>
                  <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <Tooltip>
                        <TooltipTrigger>
                          <div className={`w-3 h-3 rounded-full ${config.badge} animate-pulse flex-shrink-0`}></div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Urgência {prazo.urgencia}</p>
                        </TooltipContent>
                      </Tooltip>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">{prazo.marca}</h4>
                    </div>
                    <Badge className={`${config.color} border-0 font-bold text-xs flex-shrink-0`}>
                      <span className="mr-1">{config.icon}</span>
                      <span className="hidden sm:inline">
                        {prazo.urgencia === 'alta' ? 'Alta Prioridade' : 
                         prazo.urgencia === 'media' ? 'Média Prioridade' : 'Baixa Prioridade'}
                      </span>
                      <span className="sm:hidden">
                        {prazo.urgencia === 'alta' ? 'Alta' : 
                         prazo.urgencia === 'media' ? 'Média' : 'Baixa'}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-gray-700 font-medium mb-2 sm:mb-3 text-sm sm:text-base">{prazo.tipo}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                      📅 Vence em {diasRestantes} dias
                    </span>
                    <span className="text-xs text-gray-500">
                      {format(prazo.prazo, 'dd/MM/yyyy', { locale: ptBR })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
