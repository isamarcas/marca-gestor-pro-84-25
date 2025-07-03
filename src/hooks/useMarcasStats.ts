
import { useMemo } from 'react';
import { Marca } from '@/types';

export function useMarcasStats(marcas: Marca[]) {
  return useMemo(() => {
    const totalMarcas = marcas.length;
    const emAnalise = marcas.filter(m => m.status === 'em_analise').length;
    const deferidas = marcas.filter(m => m.status === 'deferido').length;
    const alertas = marcas.filter(m => {
      const prazo = new Date(m.proximoPrazo);
      const hoje = new Date();
      const diasRestantes = Math.ceil((prazo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
      return diasRestantes <= 30 && diasRestantes >= 0;
    }).length;

    return {
      totalMarcas,
      emAnalise,
      deferidas,
      alertas
    };
  }, [marcas]);
}
