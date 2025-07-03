
import React from 'react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onSave: () => void;
  onTest: () => void;
}

export function ActionButtons({ onSave, onTest }: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button type="submit" className="flex-1" onClick={onSave}>
        Salvar Configuração
      </Button>
      <Button type="button" variant="outline" onClick={onTest}>
        Testar Conexão
      </Button>
    </div>
  );
}
