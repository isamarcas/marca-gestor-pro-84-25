
import { useEffect } from 'react';

export function useSecurity() {
  useEffect(() => {
    // Removido todas as proteções de segurança que podem impedir carregamento em webview
    // Apenas mantendo logs básicos para debugging
    console.log('🔐 Sistema de segurança simplificado ativo');
    
    return () => {
      // Cleanup simples
    };
  }, []);

  return null;
}
