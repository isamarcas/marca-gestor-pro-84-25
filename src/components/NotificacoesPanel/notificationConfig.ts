
import { Info, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

export const tipoConfig = {
  info: {
    icon: Info,
    colors: 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-800',
    badgeColors: 'bg-blue-500 text-white',
    iconColors: 'text-blue-600',
  },
  warning: {
    icon: AlertTriangle,
    colors: 'bg-gradient-to-r from-amber-50 to-yellow-100 border-amber-200 text-amber-800',
    badgeColors: 'bg-amber-500 text-white',
    iconColors: 'text-amber-600',
  },
  success: {
    icon: CheckCircle,
    colors: 'bg-gradient-to-r from-emerald-50 to-green-100 border-emerald-200 text-emerald-800',
    badgeColors: 'bg-emerald-500 text-white',
    iconColors: 'text-emerald-600',
  },
  error: {
    icon: AlertCircle,
    colors: 'bg-gradient-to-r from-red-50 to-rose-100 border-red-200 text-red-800',
    badgeColors: 'bg-red-500 text-white',
    iconColors: 'text-red-600',
  },
};

export const tipoLabels = {
  info: 'Informação',
  warning: 'Atenção',
  success: 'Sucesso',
  error: 'Urgente',
};
