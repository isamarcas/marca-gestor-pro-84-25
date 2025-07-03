
import { useState, useEffect } from 'react';
import { AtividadeRecente } from './types';
import { 
  getGlobalAtividades, 
  setGlobalAtividades, 
  addSubscriber, 
  removeSubscriber,
  isGlobalAtividadesEmpty,
  adicionarNovaAtividade as addAtividade
} from './globalState';
import { loadAtividadesFromStorage } from './storage';

export function useAtividades() {
  const [atividades, setAtividades] = useState<AtividadeRecente[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função para atualizar as atividades locais
  const updateLocalAtividades = () => {
    const globalAtividades = getGlobalAtividades();
    setAtividades(globalAtividades);
  };

  useEffect(() => {
    const fetchAtividades = async () => {
      setIsLoading(true);
      
      // Carregar atividades globais se ainda não foram carregadas
      if (isGlobalAtividadesEmpty()) {
        const stored = loadAtividadesFromStorage();
        setGlobalAtividades(stored);
      }
      
      // Atualizar atividades locais
      updateLocalAtividades();
      
      // Registrar este componente para receber atualizações
      addSubscriber(updateLocalAtividades);
      
      setIsLoading(false);
    };

    fetchAtividades();

    // Cleanup: remover subscriber quando o componente desmontar
    return () => {
      removeSubscriber(updateLocalAtividades);
    };
  }, []);

  return {
    atividades,
    isLoading,
    adicionarAtividade: addAtividade,
  };
}

// Export da função para uso global
export { adicionarNovaAtividade as adicionarAtividade } from './globalState';
