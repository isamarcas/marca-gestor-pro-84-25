
import { AtividadesGlobais } from './types';

const STORAGE_KEY = 'atividades_recentes';

export const saveAtividadesToStorage = (atividades: AtividadesGlobais) => {
  try {
    const serialized = atividades.map(atividade => ({
      ...atividade,
      data: atividade.data.toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch (error) {
    // Silently fail
  }
};

export const loadAtividadesFromStorage = (): AtividadesGlobais => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    
    const parsed = JSON.parse(stored);
    const atividades = parsed.map((atividade: any) => ({
      ...atividade,
      data: new Date(atividade.data)
    }));
    
    return atividades;
  } catch (error) {
    return [];
  }
};
