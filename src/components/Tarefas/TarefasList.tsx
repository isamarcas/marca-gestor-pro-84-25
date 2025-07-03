
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { TarefaCard } from './TarefaCard';

interface Tarefa {
  id: number;
  titulo: string;
  cliente: string;
  prazo: string;
  status: 'pendente' | 'em_andamento' | 'concluido';
  prioridade: 'alta' | 'media' | 'baixa';
  tipo: string;
  isTarefaGeral?: boolean;
}

interface TarefasListProps {
  tarefas: Tarefa[];
  filtroStatus: string;
  onMarcarConcluida: (id: number) => void;
  onVerDetalhes: (tarefa: Tarefa) => void;
  onEditarTarefa?: (tarefa: Tarefa) => void;
}

export function TarefasList({ tarefas, filtroStatus, onMarcarConcluida, onVerDetalhes, onEditarTarefa }: TarefasListProps) {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-base sm:text-lg">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 flex-shrink-0" />
            <span>Lista de Tarefas</span>
          </div>
          {filtroStatus !== 'todas' && (
            <Badge variant="outline" className="text-xs sm:text-sm">
              Filtro: {filtroStatus.replace('_', ' ')}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {tarefas.map((tarefa, index) => (
            <div key={tarefa.id} className={index === tarefas.length - 1 ? 'border-b-0' : ''}>
              <TarefaCard
                tarefa={tarefa}
                onMarcarConcluida={onMarcarConcluida}
                onVerDetalhes={onVerDetalhes}
                onEditarTarefa={onEditarTarefa}
              />
            </div>
          ))}
          
          {tarefas.length === 0 && (
            <div className="p-6 sm:p-8 text-center text-gray-500">
              <p className="text-sm sm:text-base">Nenhuma tarefa encontrada para o filtro selecionado.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
