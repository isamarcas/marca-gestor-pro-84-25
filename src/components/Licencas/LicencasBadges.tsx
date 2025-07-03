
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Licenca } from '@/types';

export const getStatusBadge = (status: Licenca['status']) => {
  switch (status) {
    case 'ativa':
      return <Badge className="bg-green-500 text-white">Ativa</Badge>;
    case 'vencida':
      return <Badge className="bg-red-500 text-white">Vencida</Badge>;
    case 'pendente':
      return <Badge className="bg-yellow-500 text-white">Pendente</Badge>;
    case 'suspensa':
      return <Badge className="bg-gray-500 text-white">Suspensa</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white">Desconhecido</Badge>;
  }
};

export const getPlanoBadge = (plano: Licenca['plano']) => {
  switch (plano) {
    case 'basico':
      return <Badge variant="outline" className="border-blue-500 text-blue-500">Básico</Badge>;
    case 'premium':
      return <Badge variant="outline" className="border-purple-500 text-purple-500">Premium</Badge>;
    case 'enterprise':
      return <Badge variant="outline" className="border-gold-500 text-orange-500">Enterprise</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};
