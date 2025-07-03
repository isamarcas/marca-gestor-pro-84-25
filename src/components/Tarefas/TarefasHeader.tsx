
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NovaTarefaModal } from '@/components/NovaTarefaModal';
import { TarefaGeralModal } from '@/components/TarefaGeralModal';

interface TarefaGeralData {
  titulo: string;
  descricao: string;
  prazo?: Date;
  prioridade: 'alta' | 'media' | 'baixa';
  categoria: 'lembrete' | 'pessoal' | 'trabalho' | 'outros';
}

interface TarefasHeaderProps {
  filtroStatus: string;
  onFiltrar: (filtro: string) => void;
  onAddTarefa: (tarefa: any) => void;
  onAddTarefaGeral: (tarefa: TarefaGeralData) => void;
}

export function TarefasHeader({ 
  filtroStatus, 
  onFiltrar, 
  onAddTarefa, 
  onAddTarefaGeral 
}: TarefasHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Gerenciamento de Tarefas</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Acompanhe e gerencie todas as suas tarefas em um só lugar
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <NovaTarefaModal onAddTarefa={onAddTarefa} />
          <TarefaGeralModal onAddTarefaGeral={onAddTarefaGeral} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar tarefas..."
              className="pl-10 w-full"
            />
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Select value={filtroStatus} onValueChange={onFiltrar}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="pendentes">Pendentes</SelectItem>
              <SelectItem value="em_andamento">Em Andamento</SelectItem>
              <SelectItem value="concluidas">Concluídas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
