
import { Calendar, Clock, CheckCircle, AlertTriangle, Eye, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface TarefaCardProps {
  tarefa: Tarefa;
  onMarcarConcluida: (id: number) => void;
  onVerDetalhes: (tarefa: Tarefa) => void;
  onEditarTarefa?: (tarefa: Tarefa) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pendente': return 'bg-yellow-100 text-yellow-800';
    case 'em_andamento': return 'bg-blue-100 text-blue-800';
    case 'concluido': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPrioridadeColor = (prioridade: string) => {
  switch (prioridade) {
    case 'alta': return 'bg-red-100 text-red-800';
    case 'media': return 'bg-orange-100 text-orange-800';
    case 'baixa': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pendente': return <Clock className="h-4 w-4" />;
    case 'em_andamento': return <AlertTriangle className="h-4 w-4" />;
    case 'concluido': return <CheckCircle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

export function TarefaCard({ tarefa, onMarcarConcluida, onVerDetalhes, onEditarTarefa }: TarefaCardProps) {
  return (
    <div className="p-4 sm:p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
            <div className="flex items-center gap-2">
              {getStatusIcon(tarefa.status)}
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{tarefa.titulo}</h3>
              {tarefa.isTarefaGeral && (
                <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                  Geral
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Badge className={`${getPrioridadeColor(tarefa.prioridade)} text-xs`}>
                {tarefa.prioridade.charAt(0).toUpperCase() + tarefa.prioridade.slice(1)}
              </Badge>
              <Badge className={`${getStatusColor(tarefa.status)} text-xs`}>
                {tarefa.status === 'em_andamento' ? 'Em Andamento' : 
                 tarefa.status === 'concluido' ? 'Concluído' : 'Pendente'}
              </Badge>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-2 truncate">Cliente: {tarefa.cliente}</p>
          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>Prazo: {new Date(tarefa.prazo).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onVerDetalhes(tarefa)}
            className="w-full sm:w-auto text-xs sm:text-sm flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Ver Detalhes
          </Button>
          {onEditarTarefa && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEditarTarefa(tarefa)}
              className="w-full sm:w-auto text-xs sm:text-sm flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Editar Tarefa
            </Button>
          )}
          {tarefa.status !== 'concluido' && (
            <Button 
              size="sm"
              onClick={() => onMarcarConcluida(tarefa.id)}
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              Marcar como Concluída
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
