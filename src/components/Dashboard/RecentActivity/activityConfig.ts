
import { TrendingUp, Users, CheckCircle, FileSignature, Upload, MessageSquare, FileText } from 'lucide-react';

export interface ActivityConfig {
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  icon: any;
  pulse: string;
}

export const getActivityConfig = (type: string): ActivityConfig => {
  switch (type) {
    case 'marca':
      return {
        color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        textColor: 'text-blue-700',
        bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
        borderColor: 'border-blue-200',
        icon: TrendingUp,
        pulse: 'animate-pulse'
      };
    case 'cliente':
      return {
        color: 'bg-gradient-to-r from-emerald-500 to-green-500',
        textColor: 'text-emerald-700',
        bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50',
        borderColor: 'border-emerald-200',
        icon: Users,
        pulse: ''
      };
    case 'tarefa':
      return {
        color: 'bg-gradient-to-r from-purple-500 to-violet-500',
        textColor: 'text-purple-700',
        bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
        borderColor: 'border-purple-200',
        icon: CheckCircle,
        pulse: ''
      };
    case 'contrato':
      return {
        color: 'bg-gradient-to-r from-amber-500 to-orange-500',
        textColor: 'text-amber-700',
        bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
        borderColor: 'border-amber-200',
        icon: FileSignature,
        pulse: ''
      };
    case 'documento':
      return {
        color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
        textColor: 'text-indigo-700',
        bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
        borderColor: 'border-indigo-200',
        icon: Upload,
        pulse: ''
      };
    case 'status':
      return {
        color: 'bg-gradient-to-r from-pink-500 to-rose-500',
        textColor: 'text-pink-700',
        bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
        borderColor: 'border-pink-200',
        icon: MessageSquare,
        pulse: ''
      };
    default:
      return {
        color: 'bg-gradient-to-r from-slate-500 to-gray-500',
        textColor: 'text-slate-700',
        bgColor: 'bg-gradient-to-br from-slate-50 to-gray-50',
        borderColor: 'border-slate-200',
        icon: FileText,
        pulse: ''
      };
  }
};
