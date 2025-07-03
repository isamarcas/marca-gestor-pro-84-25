import { Cliente } from '@/types';

const STORAGE_KEY = 'clientes';

// Sistema de eventos para notificar mudanças
class ClientesStorageManager {
  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void) {
    console.log('[ClientesStorageManager] 📝 Registrando listener. Total:', this.listeners.size + 1);
    this.listeners.add(listener);
    return () => {
      console.log('[ClientesStorageManager] 🗑️ Removendo listener. Total restante:', this.listeners.size - 1);
      this.listeners.delete(listener);
    };
  }

  notify() {
    console.log('[ClientesStorageManager] 🔔 Notificando', this.listeners.size, 'listeners');
    this.listeners.forEach(listener => {
      try {
        listener();
      } catch (error) {
        console.error('[ClientesStorageManager] ❌ Erro ao executar listener:', error);
      }
    });
  }
}

export const clientesStorageManager = new ClientesStorageManager();

// Função centralizada para carregar clientes
export const forceLoadClientes = (): Cliente[] => {
  try {
    console.log('[forceLoadClientes] 🔍 Carregando clientes...');
    
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log('[forceLoadClientes] 📦 Dados brutos:', stored);
    
    if (!stored || stored === 'null' || stored === 'undefined' || stored === '[]') {
      console.log('[forceLoadClientes] ⚠️ Dados vazios, retornando array vazio');
      return [];
    }

    const parsed = JSON.parse(stored);
    
    if (!Array.isArray(parsed)) {
      console.warn('[forceLoadClientes] ⚠️ Dados não são array, reinicializando');
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    
    const clientes = parsed.map((c: any) => ({
      ...c,
      totalMarcas: c.totalMarcas || 0,
      marcasAtivas: c.marcasAtivas || 0,
      origem: c.origem || 'manual',
      createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
      updatedAt: c.updatedAt ? new Date(c.updatedAt) : new Date(),
    }));
    
    console.log('[forceLoadClientes] ✅ Carregados:', clientes.length, 'clientes');
    console.log('[forceLoadClientes] 📋 Lista:', clientes.map(c => ({ id: c.id, nome: c.nome, email: c.email, origem: c.origem })));
    
    return clientes;
  } catch (error) {
    console.error('[forceLoadClientes] 💥 Erro:', error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
};

// Função ROBUSTA para salvar clientes
export const forceSaveClientes = (clientes: Cliente[]): boolean => {
  try {
    console.log('[forceSaveClientes] 💾 SALVANDO', clientes.length, 'clientes...');
    console.log('[forceSaveClientes] 📝 Detalhes dos clientes:', clientes.map(c => ({ id: c.id, nome: c.nome, email: c.email, origem: c.origem })));
    
    // Preparar dados para salvamento
    const clientesParaSalvar = clientes.map(c => ({
      ...c,
      createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt,
      updatedAt: c.updatedAt instanceof Date ? c.updatedAt.toISOString() : c.updatedAt,
    }));
    
    // Salvar diretamente
    const dadosString = JSON.stringify(clientesParaSalvar);
    localStorage.setItem(STORAGE_KEY, dadosString);
    
    // VERIFICAÇÃO CRÍTICA IMEDIATA
    const verificacao = localStorage.getItem(STORAGE_KEY);
    
    if (!verificacao) {
      console.error('[forceSaveClientes] ❌ Falha na verificação - dados não foram salvos');
      return false;
    }
    
    const verificado = JSON.parse(verificacao);
    
    if (!Array.isArray(verificado) || verificado.length !== clientes.length) {
      console.error('[forceSaveClientes] ❌ Verificação falhou:', verificado.length, 'vs', clientes.length);
      return false;
    }
    
    console.log('[forceSaveClientes] ✅ SALVAMENTO VERIFICADO COM SUCESSO');
    console.log('[forceSaveClientes] 📊 Clientes salvos:', verificado.length);
    
    // Notificar IMEDIATAMENTE após verificação bem-sucedida
    console.log('[forceSaveClientes] 🔔 Notificando listeners...');
    clientesStorageManager.notify();
    
    // Disparar evento global para sincronização entre abas
    window.dispatchEvent(new CustomEvent('clienteAdicionado', {
      detail: { totalClientes: verificado.length }
    }));
    
    return true;
    
  } catch (error) {
    console.error('[forceSaveClientes] 💥 Erro ao salvar:', error);
    return false;
  }
};

// Função CORRIGIDA para adicionar cliente
export const addClienteToStorage = (novoCliente: Cliente): boolean => {
  try {
    console.log('[addClienteToStorage] 🆕 INICIANDO ADIÇÃO DO CLIENTE:', novoCliente.email);
    console.log('[addClienteToStorage] 📋 Dados completos do cliente:', novoCliente);
    
    // Carregar clientes atuais com fallback
    let clientesAtuais: Cliente[] = [];
    try {
      clientesAtuais = forceLoadClientes();
    } catch (error) {
      console.warn('[addClienteToStorage] ⚠️ Erro ao carregar clientes, iniciando com lista vazia');
      clientesAtuais = [];
    }
    
    console.log('[addClienteToStorage] 📊 Clientes existentes antes da adição:', clientesAtuais.length);
    
    // Verificar duplicatas com segurança
    const emailNormalizado = novoCliente.email.toLowerCase().trim();
    const emailExiste = clientesAtuais.some(c => {
      try {
        return c.email && c.email.toLowerCase().trim() === emailNormalizado;
      } catch (error) {
        return false;
      }
    });
    
    if (emailExiste) {
      console.log('[addClienteToStorage] ⚠️ Email já existe:', emailNormalizado);
      return false;
    }
    
    // Criar cliente com dados completos
    const clienteCompleto: Cliente = {
      ...novoCliente,
      id: novoCliente.id || `cliente-form-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    console.log('[addClienteToStorage] 👤 Cliente preparado para salvamento:', {
      id: clienteCompleto.id,
      nome: clienteCompleto.nome,
      email: clienteCompleto.email,
      origem: clienteCompleto.origem
    });
    
    // Adicionar à lista (FORÇAR criação de nova array)
    const novosClientes = [...clientesAtuais, clienteCompleto];
    console.log('[addClienteToStorage] 📝 Nova lista criada com', novosClientes.length, 'clientes');
    
    // Salvar DIRETAMENTE no localStorage para garantir persistência
    const dadosParaSalvar = JSON.stringify(novosClientes.map(c => ({
      ...c,
      createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt,
      updatedAt: c.updatedAt instanceof Date ? c.updatedAt.toISOString() : c.updatedAt,
    })));
    
    console.log('[addClienteToStorage] 💾 Salvando DIRETAMENTE no localStorage...');
    localStorage.setItem(STORAGE_KEY, dadosParaSalvar);
    
    // Verificação tripla para garantir que foi salvo
    const verificacao1 = localStorage.getItem(STORAGE_KEY);
    if (!verificacao1) {
      console.error('[addClienteToStorage] ❌ PRIMEIRA VERIFICAÇÃO FALHOU');
      return false;
    }
    
    const clientesVerificacao = JSON.parse(verificacao1);
    if (!Array.isArray(clientesVerificacao) || clientesVerificacao.length !== novosClientes.length) {
      console.error('[addClienteToStorage] ❌ SEGUNDA VERIFICAÇÃO FALHOU:', clientesVerificacao.length, 'vs', novosClientes.length);
      return false;
    }
    
    // Verificar se o cliente específico foi salvo
    const clienteSalvo = clientesVerificacao.find(c => c.email === novoCliente.email);
    if (!clienteSalvo) {
      console.error('[addClienteToStorage] ❌ TERCEIRA VERIFICAÇÃO FALHOU - Cliente não encontrado na lista salva');
      return false;
    }
    
    console.log('[addClienteToStorage] ✅ CLIENTE SALVO COM SUCESSO!');
    console.log('[addClienteToStorage] 📊 Total de clientes agora:', clientesVerificacao.length);
    console.log('[addClienteToStorage] 🎯 Cliente salvo:', {
      id: clienteSalvo.id,
      nome: clienteSalvo.nome,
      email: clienteSalvo.email,
      origem: clienteSalvo.origem
    });
    
    // Notificar IMEDIATAMENTE
    setTimeout(() => {
      console.log('[addClienteToStorage] 🔔 Notificando mudanças...');
      clientesStorageManager.notify();
      
      // Disparar evento global
      window.dispatchEvent(new CustomEvent('clienteAdicionado', {
        detail: { 
          cliente: clienteCompleto,
          totalClientes: clientesVerificacao.length 
        }
      }));
    }, 100);
    
    return true;
    
  } catch (error) {
    console.error('[addClienteToStorage] 💥 Erro geral:', error);
    return false;
  }
};

export const debugStorage = () => {
  console.log('🔍 [DEBUG STORAGE] ===================');
  
  try {
    const keys = Object.keys(localStorage);
    console.log('🔍 [DEBUG] Chaves no localStorage:', keys);
    
    const clientesData = localStorage.getItem(STORAGE_KEY);
    console.log('🔍 [DEBUG] Dados de clientes (RAW):', clientesData);
    
    if (clientesData && clientesData !== 'null') {
      try {
        const parsed = JSON.parse(clientesData);
        console.log('🔍 [DEBUG] Dados parseados:', parsed);
        console.log('🔍 [DEBUG] É array?:', Array.isArray(parsed));
        console.log('🔍 [DEBUG] Quantidade:', Array.isArray(parsed) ? parsed.length : 'N/A');
        
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log('🔍 [DEBUG] Primeiros clientes:', parsed.slice(0, 3).map(c => ({
            id: c.id,
            nome: c.nome,
            email: c.email,
            origem: c.origem
          })));
        }
      } catch (parseError) {
        console.error('🔍 [DEBUG] Erro ao parsear:', parseError);
      }
    }
    
    // Teste de funcionamento do localStorage
    const testKey = 'test-' + Date.now();
    const testValue = 'test-value-' + Math.random();
    localStorage.setItem(testKey, testValue);
    const testRead = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    console.log('🔍 [DEBUG] Teste localStorage:', testRead === testValue ? 'OK' : 'FALHOU');
    
    // Teste específico para a chave de clientes
    console.log('🔍 [DEBUG] Tamanho dos dados de clientes:', clientesData ? clientesData.length : 0, 'caracteres');
    
  } catch (error) {
    console.error('🔍 [DEBUG] Erro geral:', error);
  }
  
  console.log('🔍 [DEBUG STORAGE] ===================');
};

// Inicializar storage
try {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored || stored === 'null' || stored === 'undefined') {
    console.log('[useClientesStorage] 🚀 Inicializando storage vazio...');
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } else {
    console.log('[useClientesStorage] 📦 Storage já existe com dados:', stored.length, 'caracteres');
  }
} catch (error) {
  console.error('[useClientesStorage] ❌ Erro crítico na inicialização:', error);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}

console.log('[useClientesStorage] 🚀 Módulo carregado');
