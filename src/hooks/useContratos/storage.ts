
import { Contrato, contratosIniciais } from './types';
import { ContratoData } from '@/types/contratos';

const STORAGE_KEY = 'meus_contratos';
const CONTRATOS_ACEITOS_KEY = 'contratos_aceitos';

export const saveContratosToStorage = (contratos: Contrato[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contratos));
};

export const loadContratosFromStorage = (): Contrato[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : contratosIniciais;
};

export const saveContratoAceitoToStorage = (contrato: ContratoData) => {
  try {
    const stored = localStorage.getItem(CONTRATOS_ACEITOS_KEY);
    const contratos = stored ? JSON.parse(stored) : [];
    contratos.push(contrato);
    localStorage.setItem(CONTRATOS_ACEITOS_KEY, JSON.stringify(contratos));
  } catch (error) {
    console.error('Erro ao salvar contrato aceito:', error);
  }
};

export const loadContratosAceitosFromStorage = (): ContratoData[] => {
  try {
    const stored = localStorage.getItem(CONTRATOS_ACEITOS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao buscar contratos:', error);
    return [];
  }
};
