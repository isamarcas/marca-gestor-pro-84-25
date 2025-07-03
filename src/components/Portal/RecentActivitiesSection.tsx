
import React from 'react';
import { Activity, Award, CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AtividadeRecente {
  id: string;
  tipo: 'status' | 'documento' | 'comunicacao';
  titulo: string;
  descricao: string;
  data: Date;
  marca?: string;
}

interface RecentActivitiesSectionProps {
  atividadesRecentes: AtividadeRecente[];
}

export function RecentActivitiesSection({ atividadesRecentes }: RecentActivitiesSectionProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-blue-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Activity className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-xl font-bold">Atividades Recentes</CardTitle>
              <p className="text-blue-100 text-xs sm:text-sm">Acompanhamento em tempo real</p>
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 animate-pulse flex-shrink-0" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Histórico de movimentações</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {atividadesRecentes.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <Activity className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-slate-600 font-medium text-sm sm:text-base">Nenhuma atividade recente</p>
              <p className="text-slate-400 text-xs sm:text-sm">As atividades aparecerão aqui conforme ocorrerem</p>
            </div>
          ) : (
            atividadesRecentes.map((atividade) => {
              const IconComponent = atividade.tipo === 'status' ? CheckCircle :
                                 atividade.tipo === 'documento' ? FileText : Activity;
              const bgColor = atividade.tipo === 'status' ? 'bg-green-100' :
                            atividade.tipo === 'documento' ? 'bg-blue-100' : 'bg-purple-100';
              const iconColor = atividade.tipo === 'status' ? 'text-green-600' :
                              atividade.tipo === 'documento' ? 'text-blue-600' : 'text-purple-600';
              
              return (
                <div key={atividade.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer hover:scale-[1.01]">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${bgColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">{atividade.titulo}</h4>
                      {atividade.marca && (
                        <Badge variant="outline" className="text-xs font-medium self-start sm:self-auto">
                          {atividade.marca}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">{atividade.descricao}</p>
                    <p className="text-xs text-gray-500 font-medium">
                      {formatDistanceToNow(atividade.data, { addSuffix: true, locale: ptBR })}
                    </p>
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
