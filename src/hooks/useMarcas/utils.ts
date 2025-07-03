
import { Marca } from '@/types';
import { MarcasStats } from './types';

export const calculateEstatisticas = (marcas: Marca[]): MarcasStats => {
  const total = marcas.length;
  const emAnalise = marcas.filter(m => m.status === 'em_analise').length;
  const deferidas = marcas.filter(m => m.status === 'deferido').length;
  const alertas = marcas.filter(m => 
    ['indeferido', 'recurso', 'oposicao'].includes(m.status)
  ).length;

  return { totalMarcas: total, emAnalise, deferidas, alertas };
};

export const calcularEstatisticas = calculateEstatisticas;

export const calculateEstatisticasCliente = (marcas: Marca[], clienteId: string): MarcasStats => {
  const marcasCliente = marcas.filter(marca => marca.clienteId === clienteId);
  return calculateEstatisticas(marcasCliente);
};

export const getMarcasByClient = (marcas: Marca[], clienteId: string): Marca[] => {
  return marcas.filter(marca => marca.clienteId === clienteId);
};
