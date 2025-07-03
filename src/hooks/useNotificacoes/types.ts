
import { Notificacao } from '@/types';

export interface NotificacoesGlobais {
  [clienteId: string]: Notificacao[];
}

export interface NotificacoesIniciais {
  demo: Notificacao[];
  '1': Notificacao[];
  '2': Notificacao[];
  '3': Notificacao[];
}

export const STORAGE_KEY = 'sistema_notificacoes';
