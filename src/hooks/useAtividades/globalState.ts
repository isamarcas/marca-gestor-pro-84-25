
import { AtividadeRecente, AtividadesGlobais } from './types';
import { saveAtividadesToStorage } from './storage';

// Estado global para sincronização
let globalAtividades: AtividadesGlobais = [];
let subscribers: Set<() => void> = new Set();

// Função para notificar mudanças a todos os subscribers
export const notifySubscribers = () => {
  subscribers.forEach(callback => callback());
};

// Função para obter as atividades globais
export const getGlobalAtividades = (): AtividadesGlobais => {
  return globalAtividades;
};

// Função para definir as atividades globais
export const setGlobalAtividades = (atividades: AtividadesGlobais) => {
  globalAtividades = atividades;
};

// Função para adicionar subscriber
export const addSubscriber = (callback: () => void) => {
  subscribers.add(callback);
};

// Função para remover subscriber
export const removeSubscriber = (callback: () => void) => {
  subscribers.delete(callback);
};

// Função para adicionar nova atividade
export const adicionarNovaAtividade = (novaAtividade: Omit<AtividadeRecente, 'id' | 'data'>) => {
  const atividade: AtividadeRecente = {
    ...novaAtividade,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    data: new Date(),
  };
  
  // Adicionar no início da lista
  globalAtividades.unshift(atividade);
  
  // Manter apenas as últimas 50 atividades
  if (globalAtividades.length > 50) {
    globalAtividades = globalAtividades.slice(0, 50);
  }
  
  // Salvar no storage
  saveAtividadesToStorage(globalAtividades);
  
  // Notificar todos os subscribers
  notifySubscribers();
};

// Função para verificar se as atividades globais estão vazias
export const isGlobalAtividadesEmpty = (): boolean => {
  return globalAtividades.length === 0;
};
