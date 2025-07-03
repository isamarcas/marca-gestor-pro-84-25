
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Building2,
  Tag,
  AlertTriangle,
  Edit
} from 'lucide-react';
import { format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ComentarioTarefa } from '@/types/tarefa';

interface TarefaDetalhada {
  id: string;
  titulo: string;
  descricao: string;
  marcaId: string;
  responsavel: string;
  prazo: Date | string;
  status: 'pendente' | 'em_andamento' | 'concluida';
  prioridade: 'baixa' | 'media' | 'alta';
  tipoTarefa: 'resposta_exigencia' | 'renovacao' | 'defesa_oposicao' | 'documentacao' | 'acompanhamento' | 'outros';
  tempoEstimado?: number;
  createdAt: Date | string;
  cliente?: string;
  marca?: string;
  anexos: string[];
  comentarios: ComentarioTarefa[];
}

interface VisualizarTarefaModalProps {
  tarefa: TarefaDetalhada | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditarTarefa?: (tarefa: TarefaDetalhada) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'em_andamento': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'concluida': return 'bg-green-100 text-green-800 border-green-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getPrioridadeColor = (prioridade: string) => {
  switch (prioridade) {
    case 'alta': return 'bg-red-100 text-red-800 border-red-300';
    case 'media': return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'baixa': return 'bg-green-100 text-green-800 border-green-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const formatarStatus = (status: string) => {
  switch (status) {
    case 'pendente': return 'Pendente';
    case 'em_andamento': return 'Em Andamento';
    case 'concluida': return 'Concluída';
    default: return status;
  }
};

const formatarTipoTarefa = (tipo: string) => {
  switch (tipo) {
    case 'resposta_exigencia': return 'Resposta à Exigência';
    case 'renovacao': return 'Renovação';
    case 'defesa_oposicao': return 'Defesa de Oposição';
    case 'documentacao': return 'Documentação';
    case 'acompanhamento': return 'Acompanhamento';
    case 'outros': return 'Outros';
    default: return tipo;
  }
};

const formatarDataSegura = (data: Date | string) => {
  try {
    let dateObj: Date;
    
    if (typeof data === 'string') {
      dateObj = new Date(data);
    } else if (data instanceof Date) {
      dateObj = data;
    } else {
      console.error('Data inválida recebida:', data);
      return 'Data não disponível';
    }
    
    if (!isValid(dateObj)) {
      console.error('Data inválida após conversão:', dateObj);
      return 'Data inválida';
    }
    
    return format(dateObj, 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data:', error, 'Data original:', data);
    return 'Erro na formatação';
  }
};

const formatarDataHoraSegura = (data: Date | string) => {
  try {
    let dateObj: Date;
    
    if (typeof data === 'string') {
      dateObj = new Date(data);
    } else if (data instanceof Date) {
      dateObj = data;
    } else {
      console.error('Data inválida recebida:', data);
      return 'Data não disponível';
    }
    
    if (!isValid(dateObj)) {
      console.error('Data inválida após conversão:', dateObj);
      return 'Data inválida';
    }
    
    return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data/hora:', error, 'Data original:', data);
    return 'Erro na formatação';
  }
};

export function VisualizarTarefaModal({ 
  tarefa, 
  open, 
  onOpenChange, 
  onEditarTarefa 
}: VisualizarTarefaModalProps) {
  if (!tarefa) return null;

  console.log('VisualizarTarefaModal renderizando com tarefa:', tarefa);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xl">
              <FileText className="h-6 w-6 text-blue-600" />
              Detalhes da Tarefa
            </div>
            {onEditarTarefa && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditarTarefa(tarefa)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Editar
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Título e badges */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{tarefa.titulo}</h2>
            <div className="flex gap-2 flex-wrap">
              <Badge className={getStatusColor(tarefa.status)}>
                {formatarStatus(tarefa.status)}
              </Badge>
              <Badge className={getPrioridadeColor(tarefa.prioridade)}>
                Prioridade {tarefa.prioridade.charAt(0).toUpperCase() + tarefa.prioridade.slice(1)}
              </Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-800">
                {formatarTipoTarefa(tarefa.tipoTarefa)}
              </Badge>
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Descrição
            </h3>
            {tarefa.descricao ? (
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                {tarefa.descricao}
              </p>
            ) : (
              <p className="text-gray-400 bg-gray-50 p-4 rounded-lg italic">
                Nenhuma descrição fornecida
              </p>
            )}
          </div>

          {/* Informações principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {tarefa.marca && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Tag className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Marca</p>
                    <p className="text-gray-900">{tarefa.marca}</p>
                  </div>
                </div>
              )}

              {tarefa.cliente && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Cliente</p>
                    <p className="text-gray-900">{tarefa.cliente}</p>
                  </div>
                </div>
              )}

              {tarefa.responsavel && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Responsável</p>
                    <p className="text-gray-900">{tarefa.responsavel}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Prazo</p>
                  <p className="text-gray-900">
                    {formatarDataSegura(tarefa.prazo)}
                  </p>
                </div>
              </div>

              {tarefa.tempoEstimado && tarefa.tempoEstimado > 0 && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tempo Estimado</p>
                    <p className="text-gray-900">{tarefa.tempoEstimado} horas</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Data de Criação</p>
                  <p className="text-gray-900">
                    {formatarDataHoraSegura(tarefa.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
