
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorConfig = {
  blue: {
    gradient: 'from-blue-500 to-blue-700',
    iconBg: 'bg-blue-500',
    trendColor: 'text-blue-600',
    glowColor: 'shadow-blue-500/20',
    borderColor: 'border-blue-200/30'
  },
  green: {
    gradient: 'from-emerald-500 to-green-700',
    iconBg: 'bg-emerald-500',
    trendColor: 'text-emerald-600',
    glowColor: 'shadow-emerald-500/20',
    borderColor: 'border-emerald-200/30'
  },
  yellow: {
    gradient: 'from-amber-500 to-yellow-600',
    iconBg: 'bg-amber-500',
    trendColor: 'text-amber-600',
    glowColor: 'shadow-amber-500/20',
    borderColor: 'border-amber-200/30'
  },
  red: {
    gradient: 'from-red-500 to-rose-700',
    iconBg: 'bg-red-500',
    trendColor: 'text-red-600',
    glowColor: 'shadow-red-500/20',
    borderColor: 'border-red-200/30'
  },
  purple: {
    gradient: 'from-purple-500 to-violet-700',
    iconBg: 'bg-purple-500',
    trendColor: 'text-purple-600',
    glowColor: 'shadow-purple-500/20',
    borderColor: 'border-purple-200/30'
  },
};

export function StatsCard({ title, value, icon: Icon, color, trend }: StatsCardProps) {
  const config = colorConfig[color];
  
  return (
    <Card className={`group relative overflow-hidden bg-white/95 backdrop-blur-xl border ${config.borderColor} rounded-3xl shadow-xl ${config.glowColor} hover:shadow-2xl transform hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 h-[220px]`}>
      {/* Gradient overlay sutil */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-700`}></div>
      
      {/* Pattern overlay mais sutil */}
      <div className="absolute inset-0 opacity-[0.01] bg-[radial-gradient(circle_at_2px_2px,_rgba(0,0,0,0.15)_1px,_transparent_0)] bg-[length:24px_24px]"></div>
      
      {/* Floating particles effect */}
      <div className="absolute top-4 right-4 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-8 left-6 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <CardContent className="relative p-8 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          {/* Title com tipografia melhorada */}
          <div className="flex-1 pr-4">
            <p className="text-sm font-bold text-slate-600 uppercase tracking-widest leading-tight opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              {title}
            </p>
          </div>
          
          {/* Icon com efeitos melhorados */}
          <div className="relative flex-shrink-0">
            <div className={`absolute inset-0 ${config.iconBg} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500 scale-110`}></div>
            <div className={`relative p-4 ${config.iconBg} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        {/* Value Section com melhor posicionamento */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center mb-4">
            <p className="text-5xl font-black text-slate-900 leading-none tracking-tight group-hover:scale-105 transition-transform duration-300">
              {value}
            </p>
          </div>
        </div>
        
        {/* Trend Section melhorada */}
        <div className="h-14 flex flex-col justify-end">
          {trend ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  trend.isPositive 
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}>
                  <span className="text-sm leading-none">
                    {trend.isPositive ? '↗' : '↘'}
                  </span>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </div>
              </div>
              <p className="text-xs font-medium text-slate-500 text-center opacity-70">
                vs mês anterior
              </p>
            </div>
          ) : (
            <div className="h-14"></div>
          )}
        </div>
        
        {/* Bottom accent line animada */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-b-3xl`}></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:animate-[shimmer_1.5s_ease-in-out] pointer-events-none"></div>
        </div>
      </CardContent>
    </Card>
  );
}
