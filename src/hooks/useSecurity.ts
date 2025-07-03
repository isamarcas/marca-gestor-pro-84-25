
import { useEffect } from 'react';

export function useSecurity() {
  useEffect(() => {
    // Desabilitar clicar com botão direito em produção
    const handleContextMenu = (e: MouseEvent) => {
      if (process.env.NODE_ENV === 'production') {
        e.preventDefault();
      }
    };

    // Desabilitar algumas teclas de atalho em produção
    const handleKeyDown = (e: KeyboardEvent) => {
      if (process.env.NODE_ENV === 'production') {
        // Desabilitar F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.key === 'u') ||
          (e.ctrlKey && e.key === 's')
        ) {
          e.preventDefault();
        }
      }
    };

    // Detectar tentativas de depuração
    const detectDevTools = () => {
      let devtools = { open: false };
      
      const threshold = 160;
      
      const detect = () => {
        if (
          window.outerHeight - window.innerHeight > threshold ||
          window.outerWidth - window.innerWidth > threshold
        ) {
          if (!devtools.open) {
            devtools.open = true;
            // Limpar dados sensíveis quando DevTools é detectado
            sessionStorage.clear();
            
            // Opcional: redirecionar para página de segurança
            if (window.location.pathname === '/auth') {
              window.location.reload();
            }
          }
        } else {
          devtools.open = false;
        }
      };

      detect();
      return detect;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    
    const detectInterval = setInterval(detectDevTools(), 1000);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(detectInterval);
    };
  }, []);

  return null;
}
