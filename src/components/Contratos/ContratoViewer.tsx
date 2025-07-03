
import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface ContratoViewerProps {
  contratoTexto: string;
  onLeituraCompleta: (completa: boolean) => void;
}

export function ContratoViewer({ contratoTexto, onLeituraCompleta }: ContratoViewerProps) {
  const [scrollCompleto, setScrollCompleto] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;
    
    // Ajustar o threshold para 90% ao invés de 95%
    const scrollPercent = (scrollTop + clientHeight) / scrollHeight;
    
    console.log('Scroll info:', { scrollTop, scrollHeight, clientHeight, scrollPercent });
    
    if (scrollPercent >= 0.9 && !scrollCompleto) {
      console.log('Scroll completo detectado!');
      setScrollCompleto(true);
      onLeituraCompleta(true);
    }
  };

  useEffect(() => {
    if (scrollCompleto) {
      onLeituraCompleta(true);
    }
  }, [scrollCompleto, onLeituraCompleta]);

  return (
    <Card className="w-full">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Contrato de Prestação de Serviços
          </h3>
          {!scrollCompleto && (
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              Role até o final para continuar
            </div>
          )}
          {scrollCompleto && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Leitura completa
            </div>
          )}
        </div>
        
        <div 
          className="h-96 w-full border rounded-lg p-4 bg-gray-50 overflow-y-auto"
          onScroll={handleScroll}
          ref={scrollAreaRef}
        >
          <div className="text-sm leading-relaxed text-justify whitespace-pre-line">
            {contratoTexto}
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          {scrollCompleto 
            ? "✓ Você leu todo o contrato e pode prosseguir para a assinatura"
            : "Por favor, role até o final do documento para prosseguir"
          }
        </div>
      </div>
    </Card>
  );
}
