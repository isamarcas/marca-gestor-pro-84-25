
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getActivityConfig } from './activityConfig';
import { AtividadeRecente } from '@/hooks/useAtividades/types';

interface ActivityItemProps {
  atividade: AtividadeRecente;
  index: number;
}

export function ActivityItem({ atividade, index }: ActivityItemProps) {
  const config = getActivityConfig(atividade.tipo);
  const IconComponent = config.icon;
  
  return (
    <div 
      className={`group relative overflow-hidden ${config.bgColor} ${config.borderColor} border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1`}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="relative flex items-start gap-5">
        {/* Timeline and Icon */}
        <div className="flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full ${config.color} ${config.pulse} shadow-lg mb-3`}></div>
          <div className="relative">
            <div className={`absolute inset-0 ${config.color} rounded-2xl blur-md opacity-30`}></div>
            <div className={`relative p-3 ${config.color} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
              <IconComponent className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h4 className="text-lg font-black text-slate-900">
              {atividade.titulo}
            </h4>
            <Badge className={`${config.color} text-white border-0 font-bold text-xs px-3 py-1 shadow-lg`}>
              {atividade.tipo.toUpperCase()}
            </Badge>
          </div>
          
          <p className={`text-base font-semibold ${config.textColor} mb-3`}>
            {atividade.descricao}
          </p>
          
          {atividade.marca && (
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <p className="text-sm font-medium text-slate-600">
                Marca: {atividade.marca}
              </p>
            </div>
          )}

          {atividade.cliente && (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <p className="text-sm font-medium text-slate-600">
                Cliente: {atividade.cliente}
              </p>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            <p className="text-xs font-medium text-slate-500">
              {formatDistanceToNow(atividade.data, { 
                addSuffix: true, 
                locale: ptBR 
              })}
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom Glow */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${config.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </div>
  );
}
