
import React from 'react';
import { CheckCircle, Clock, FileText, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface DashboardStatsCardsProps {
  statsPersonalizadas: {
    totalMarcas: number;
    emAnalise: number;
    deferidas: number;
    alertas: number;
  };
  taxaSucesso: number;
}

export function DashboardStatsCards({ statsPersonalizadas, taxaSucesso }: DashboardStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Total de Marcas */}
      <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600 mb-2">Total de Marcas</p>
              <p className="text-3xl md:text-4xl font-black text-blue-900">{statsPersonalizadas.totalMarcas}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-xs md:text-sm font-medium text-emerald-600">+12% este mês</span>
              </div>
            </div>
            <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-6 md:h-8 w-6 md:w-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Em Análise */}
      <Card className="group relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-600 mb-2">Em Análise</p>
              <p className="text-3xl md:text-4xl font-black text-amber-900">{statsPersonalizadas.emAnalise}</p>
              <div className="mt-3 w-full bg-amber-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-6 md:h-8 w-6 md:w-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deferidas */}
      <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-600 mb-2">Deferidas</p>
              <p className="text-3xl md:text-4xl font-black text-emerald-900">{statsPersonalizadas.deferidas}</p>
              <div className="flex items-center gap-1 mt-2">
                <Tooltip>
                  <TooltipTrigger>
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Marcas aprovadas com sucesso</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-xs md:text-sm font-medium text-emerald-600">{taxaSucesso}% sucesso</span>
              </div>
            </div>
            <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="h-6 md:h-8 w-6 md:w-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
