
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { DialogHeader as UIDialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function DialogHeader() {
  return (
    <UIDialogHeader className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
          <MessageSquare className="h-6 w-6 text-white" />
        </div>
        <div>
          <DialogTitle className="text-xl font-bold text-gray-900">Enviar Mensagem</DialogTitle>
          <DialogDescription className="text-gray-600">
            Envie uma mensagem direta para o cliente
          </DialogDescription>
        </div>
      </div>
    </UIDialogHeader>
  );
}
