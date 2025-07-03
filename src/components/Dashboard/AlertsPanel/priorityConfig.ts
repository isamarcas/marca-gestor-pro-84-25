
import { Flame, AlertCircle, Info } from 'lucide-react';
import { PriorityConfig } from './types';

export const getPriorityConfig = (prioridade: string): PriorityConfig => {
  switch (prioridade) {
    case 'alta':
      return {
        color: 'bg-gradient-to-r from-red-500 to-rose-600',
        textColor: 'text-red-700',
        bgColor: 'bg-gradient-to-br from-red-50 to-rose-50',
        borderColor: 'border-red-200',
        icon: Flame,
        pulse: 'animate-pulse',
        glow: 'shadow-red-500/25'
      };
    case 'media':
      return {
        color: 'bg-gradient-to-r from-amber-500 to-orange-500',
        textColor: 'text-amber-700',
        bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
        borderColor: 'border-amber-200',
        icon: AlertCircle,
        pulse: '',
        glow: 'shadow-amber-500/25'
      };
    case 'baixa':
      return {
        color: 'bg-gradient-to-r from-emerald-500 to-green-500',
        textColor: 'text-emerald-700',
        bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50',
        borderColor: 'border-emerald-200',
        icon: Info,
        pulse: '',
        glow: 'shadow-emerald-500/25'
      };
    default:
      return {
        color: 'bg-gradient-to-r from-slate-500 to-gray-500',
        textColor: 'text-slate-700',
        bgColor: 'bg-gradient-to-br from-slate-50 to-gray-50',
        borderColor: 'border-slate-200',
        icon: Info,
        pulse: '',
        glow: 'shadow-slate-500/25'
      };
  }
};
