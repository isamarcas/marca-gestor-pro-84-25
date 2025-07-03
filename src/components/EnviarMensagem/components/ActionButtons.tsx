
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function ActionButtons({ onCancel, onSubmit, isLoading }: ActionButtonsProps) {
  return (
    <div className="flex gap-3 pt-4">
      <Button 
        variant="outline" 
        onClick={onCancel}
        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Cancelar
      </Button>
      <Button 
        onClick={onSubmit}
        disabled={isLoading}
        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Enviar
          </>
        )}
      </Button>
    </div>
  );
}
