
import { NotificacoesGlobais } from './types';

const STORAGE_KEY = 'notificacoes_sistema_global';

export const loadAllNotificacoesFromStorage = (): NotificacoesGlobais => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // Converter strings de data de volta para objetos Date
      const converted: NotificacoesGlobais = {};
      Object.keys(parsed).forEach(clienteId => {
        converted[clienteId] = parsed[clienteId].map((n: any) => ({
          ...n,
          createdAt: new Date(n.createdAt)
        }));
      });
      
      console.log('Notificações carregadas do storage:', Object.keys(converted).length, 'clientes');
      return converted;
    }
    
    return {};
  } catch (error) {
    console.error('Erro ao carregar notificações do storage:', error);
    return {};
  }
};

export const saveAllNotificacoesToStorage = (notificacoes: NotificacoesGlobais): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notificacoes));
    console.log('Notificações salvas no storage:', Object.keys(notificacoes).length, 'clientes');
  } catch (error) {
    console.error('Erro ao salvar notificações no storage:', error);
  }
};
