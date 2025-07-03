
import React from 'react';
import { FileText, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CompactStatsCardsProps {
  statsPersonalizadas: {
    totalMarcas: number;
    emAnalise: number;
    deferidas: number;
    alertas: number;
  };
  taxaSucesso: number;
}

export function CompactStatsCards({ statsPersonalizadas, taxaSucesso }: CompactStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total de Marcas */}
      <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full transform translate-x-6 -translate-y-6"></div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-600 mb-1">Total de Marcas</p>
              <p className="text-2xl font-black text-blue-900 mb-1">{statsPersonalizadas.totalMarcas}</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-600">+12% este mês</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Em Análise */}
      <Card className="group relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full transform translate-x-6 -translate-y-6"></div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-600 mb-1">Em Análise</p>
              <p className="text-2xl font-black text-amber-900 mb-2">{statsPersonalizadas.emAnalise}</p>
              <div className="w-full bg-amber-100 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1.5 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deferidas */}
      <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full transform translate-x-6 -translate-y-6"></div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-emerald-600 mb-1">Deferidas</p>
              <p className="text-2xl font-black text-emerald-900 mb-1">{statsPersonalizadas.deferidas}</p>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger>
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Marcas aprovadas com sucesso</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-xs font-medium text-emerald-600">{taxaSucesso}% sucesso</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
