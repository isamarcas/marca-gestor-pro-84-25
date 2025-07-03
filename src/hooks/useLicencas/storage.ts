
const STORAGE_KEY_LICENCAS = 'licencas';
const STORAGE_KEY_HISTORICO = 'historico_renovacoes';
const STORAGE_KEY_ALERTAS = 'alertas_licencas';

export const loadFromStorage = <T>(key: string, defaultValue: T[]): T[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Erro ao carregar ${key}:`, error);
    return defaultValue;
  }
};

export const saveToStorage = <T>(key: string, data: T[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Erro ao salvar ${key}:`, error);
  }
};

export const storageKeys = {
  LICENCAS: STORAGE_KEY_LICENCAS,
  HISTORICO: STORAGE_KEY_HISTORICO,
  ALERTAS: STORAGE_KEY_ALERTAS,
};
