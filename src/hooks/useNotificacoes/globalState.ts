
import { Notificacao } from '@/types';
import { NotificacoesGlobais } from './types';
import { saveAllNotificacoesToStorage } from './storage';

// Instância global para sincronização
let globalNotificacoes: NotificacoesGlobais = {};
let subscribers: Set<() => void> = new Set();

// Função para notificar mudanças a todos os subscribers
export const notifySubscribers = () => {
  subscribers.forEach(callback => callback());
};

// Função para obter as notificações globais
export const getGlobalNotificacoes = (): NotificacoesGlobais => {
  return globalNotificacoes;
};

// Função para definir as notificações globais
export const setGlobalNotificacoes = (notificacoes: NotificacoesGlobais) => {
  globalNotificacoes = notificacoes;
};

// Função para adicionar subscriber
export const addSubscriber = (callback: () => void) => {
  subscribers.add(callback);
};

// Função para remover subscriber
export const removeSubscriber = (callback: () => void) => {
  subscribers.delete(callback);
};

// Função para marcar notificação como lida
export const marcarNotificacaoComoLida = (notificacaoId: string) => {
  console.log('useNotificacoes: Marcando notificação como lida:', notificacaoId);
  
  // Atualizar nas notificações globais
  Object.keys(globalNotificacoes).forEach(cId => {
    globalNotificacoes[cId] = globalNotificacoes[cId].map(notif =>
      notif.id === notificacaoId ? { ...notif, lida: true } : notif
    );
  });
  
  // Salvar no storage
  saveAllNotificacoesToStorage(globalNotificacoes);
  
  // Notificar todos os subscribers
  notifySubscribers();
};

// Função para deletar uma notificação específica
export const deletarNotificacao = (notificacaoId: string) => {
  console.log('useNotificacoes: Deletando notificação:', notificacaoId);
  
  // Remover das notificações globais
  Object.keys(globalNotificacoes).forEach(cId => {
    globalNotificacoes[cId] = globalNotificacoes[cId].filter(notif => notif.id !== notificacaoId);
  });
  
  // Salvar no storage
  saveAllNotificacoesToStorage(globalNotificacoes);
  
  // Notificar todos os subscribers
  notifySubscribers();
};

// Função para deletar todas as notificações de um cliente
export const deletarTodasNotificacoesCliente = (clienteId: string) => {
  console.log('useNotificacoes: Deletando todas as notificações do cliente:', clienteId);
  
  if (globalNotificacoes[clienteId]) {
    globalNotificacoes[clienteId] = [];
  }
  
  // Salvar no storage
  saveAllNotificacoesToStorage(globalNotificacoes);
  
  // Notificar todos os subscribers
  notifySubscribers();
};

// Função para deletar todas as notificações do sistema
export const deletarTodasNotificacoesSistema = () => {
  console.log('useNotificacoes: Deletando todas as notificações do sistema');
  
  globalNotificacoes = {};
  
  // Salvar no storage
  saveAllNotificacoesToStorage(globalNotificacoes);
  
  // Notificar todos os subscribers
  notifySubscribers();
};

// Função para adicionar nova notificação
export const adicionarNovaNotificacao = (novaNotificacao: Omit<Notificacao, 'id' | 'createdAt'>) => {
  console.log('useNotificacoes: Adicionando nova notificação para cliente:', novaNotificacao.clienteId);
  
  const notificacao: Notificacao = {
    ...novaNotificacao,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  
  console.log('useNotificacoes: Notificação criada:', notificacao);
  
  // Garantir que o array do cliente existe
  if (!globalNotificacoes[novaNotificacao.clienteId]) {
    console.log('useNotificacoes: Criando array de notificações para novo cliente:', novaNotificacao.clienteId);
    globalNotificacoes[novaNotificacao.clienteId] = [];
  }
  
  // Adicionar no início da lista
  globalNotificacoes[novaNotificacao.clienteId].unshift(notificacao);
  
  console.log('useNotificacoes: Total de notificações para cliente', novaNotificacao.clienteId, ':', globalNotificacoes[novaNotificacao.clienteId].length);
  
  // Salvar no storage
  saveAllNotificacoesToStorage(globalNotificacoes);
  
  // Notificar todos os subscribers
  notifySubscribers();
  
  console.log('useNotificacoes: Notificação adicionada e subscribers notificados');
};

// Função para verificar se as notificações globais estão vazias
export const isGlobalNotificacoesEmpty = (): boolean => {
  return Object.keys(globalNotificacoes).length === 0;
};
