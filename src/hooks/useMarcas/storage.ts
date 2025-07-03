
import { Marca } from '@/types';
import { STORAGE_KEY } from './types';
import { marcasIniciais } from './initialData';

export const loadMarcasFromStorage = async (): Promise<Marca[]> => {
  try {
    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Try to load from localStorage first
    const savedMarcas = localStorage.getItem(STORAGE_KEY);
    if (savedMarcas) {
      const parsedMarcas = JSON.parse(savedMarcas).map((marca: any) => ({
        ...marca,
        dataDeposito: new Date(marca.dataDeposito),
        proximoPrazo: new Date(marca.proximoPrazo),
        createdAt: new Date(marca.createdAt),
        updatedAt: new Date(marca.updatedAt),
        historicoProcesso: marca.historicoProcesso?.map((h: any) => ({
          ...h,
          data: new Date(h.data)
        })) || []
      }));
      return parsedMarcas;
    } else {
      saveMarcasToStorage(marcasIniciais);
      return marcasIniciais;
    }
  } catch (error) {
    console.error('Erro ao carregar marcas:', error);
    return marcasIniciais;
  }
};

export const saveMarcasToStorage = (marcas: Marca[]) => {
  if (marcas.length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(marcas));
  }
};
