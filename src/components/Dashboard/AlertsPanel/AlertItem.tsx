
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Alerta } from './types';
import { getPriorityConfig } from './priorityConfig';

interface AlertItemProps {
  alerta: Alerta;
  index: number;
  onResolve: (alertaId: string) => void;
}

export function AlertItem({ alerta, index, onResolve }: AlertItemProps) {
  const config = getPriorityConfig(alerta.prioridade);
  const IconComponent = config.icon;
  const prazoDate = new Date(alerta.prazo);
  const hoje = new Date();
  const diasRestantes = Math.ceil((prazoDate.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div 
      className={`group relative overflow-hidden ${config.bgColor} ${config.borderColor} border-2 rounded-2xl p-6 hover:shadow-xl ${config.glow} transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1`}
      style={{
        animationDelay: `${index * 150}ms`
      }}
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="relative flex items-start gap-5">
        {/* Priority Indicator and Icon */}
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
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <h4 className="text-lg font-black text-slate-900">
              {alerta.marca}
            </h4>
            <Badge className={`${config.color} text-white border-0 font-bold text-xs px-3 py-1 shadow-lg uppercase tracking-wider`}>
              {alerta.prioridade}
            </Badge>
            {alerta.categoria === 'licenca' && (
              <Badge variant="outline" className="border-blue-500 text-blue-600 text-xs">
                Licença
              </Badge>
            )}
          </div>
          
          <p className={`text-base font-semibold ${config.textColor} mb-4`}>
            {alerta.descricao}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl">
              <Calendar className="h-4 w-4 text-slate-500" />
              <p className="text-sm font-bold text-slate-700">
                {diasRestantes > 0 
                  ? `Vence em ${diasRestantes} dia${diasRestantes > 1 ? 's' : ''}`
                  : diasRestantes === 0 
                    ? 'Vence hoje!'
                    : `Venceu há ${Math.abs(diasRestantes)} dia${Math.abs(diasRestantes) > 1 ? 's' : ''}`
                }
              </p>
            </div>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onResolve(alerta.id)}
              className="bg-white hover:bg-slate-50 border-slate-300"
            >
              Resolver
            </Button>
          </div>
        </div>
      </div>
      
      {/* Urgency Bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-2 ${config.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`}></div>
    </div>
  );
}
