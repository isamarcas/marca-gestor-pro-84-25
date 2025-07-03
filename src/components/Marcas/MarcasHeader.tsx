
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NovaMarcaDialog } from './NovaMarcaDialog';
import { Marca } from '@/types';

interface MarcasHeaderProps {
  onAddMarca: (novaMarca: Marca) => void;
}

export function MarcasHeader({ onAddMarca }: MarcasHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="w-full sm:w-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Marcas</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Gerencie todas as marcas registradas</p>
      </div>
      
      <div className="w-full sm:w-auto">
        <NovaMarcaDialog
          onAddMarca={onAddMarca}
          trigger={
            <Button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 flex items-center justify-center gap-2 font-semibold px-4 sm:px-6 py-2 rounded-lg shadow-sm text-sm sm:text-base">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" /> 
              <span>Nova Marca</span>
            </Button>
          }
        />
      </div>
    </div>
  );
}
