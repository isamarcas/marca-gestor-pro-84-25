
import { Cliente } from './index';

declare global {
  interface Window {
    novosClientes?: Record<string, Cliente>;
  }
}

export {};
