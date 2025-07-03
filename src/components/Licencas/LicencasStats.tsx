
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Licenca } from '@/types';

interface LicencasStatsProps {
  licencas: Licenca[];
}

export function LicencasStats({ licencas }: LicencasStatsProps) {
  const stats = {
    total: licencas.length,
    ativas: licencas.filter(l => l.status === 'ativa').length,
    vencidas: licencas.filter(l => l.status === 'vencida').length,
    pendentes: licencas.filter(l => l.status === 'pendente').length,
    receita: licencas
      .filter(l => l.status === 'ativa')
      .reduce((acc, l) => acc + l.valor, 0),
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total de Licenças</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-green-600">{stats.ativas}</div>
          <div className="text-sm text-gray-600">Licenças Ativas</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-red-600">{stats.vencidas}</div>
          <div className="text-sm text-gray-600">Licenças Vencidas</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-yellow-600">{stats.pendentes}</div>
          <div className="text-sm text-gray-600">Licenças Pendentes</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600">{formatarMoeda(stats.receita)}</div>
          <div className="text-sm text-gray-600">Receita Ativa</div>
        </CardContent>
      </Card>
    </div>
  );
}
