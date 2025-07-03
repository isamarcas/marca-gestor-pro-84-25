
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Building2,
  Tag,
  AlertTriangle 
} from 'lucide-react';
import { format, isValid, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TarefaSimplificada {
  id: number;
  titulo: string;
  cliente: string;
  prazo: string;
  status: 'pendente' | 'em_andamento' | 'concluido';
  prioridade: 'alta' | 'media' | 'baixa';
  tipo: string;
  descricao?: string;
}

interface DetalheTarefaModalProps {
  tarefa: TarefaSimplificada | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAlterarStatus: (id: number, novoStatus: 'pendente' | 'em_andamento' | 'concluido') => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'em_andamento': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'concluido': return 'bg-green-100 text-green-800 border-green-300';
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
    case 'concluido': return 'Concluído';
    default: return status;
  }
};

const formatarTipo = (tipo: string) => {
  switch (tipo) {
    case 'resposta_exigencia': return 'Resposta à Exigência';
    case 'renovacao': return 'Renovação';
    case 'defesa_oposicao': return 'Defesa de Oposição';
    case 'documentacao': return 'Documentação';
    case 'acompanhamento': return 'Acompanhamento';
    case 'pessoal': return 'Pessoal';
    case 'trabalho': return 'Trabalho';
    case 'lembrete': return 'Lembrete';
    case 'outros': return 'Outros';
    default: return tipo;
  }
};

// Função para formatar data de forma segura
const formatarDataSegura = (dataString: string) => {
  try {
    console.log('Formatando data:', dataString);
    
    // Se já é uma string vazia ou undefined
    if (!dataString) {
      return 'Data não informada';
    }

    // Tentar converter string para Date
    let data: Date;
    
    if (dataString.includes('T') || dataString.includes('Z')) {
      // Se parece com ISO string
      data = parseISO(dataString);
    } else {
      // Tentar criar nova data
      data = new Date(dataString);
    }

    // Verificar se a data é válida
    if (isValid(data)) {
      return format(data, 'dd/MM/yyyy', { locale: ptBR });
    } else {
      console.error('Data inválida:', dataString);
      return 'Data inválida';
    }
    
  } catch (error) {
    console.error('Erro ao formatar data:', error, 'Data original:', dataString);
    return 'Erro na data';
  }
};

export function DetalheTarefaModal({ 
  tarefa, 
  open, 
  onOpenChange, 
  onAlterarStatus 
}: DetalheTarefaModalProps) {
  console.log('DetalheTarefaModal renderizando com tarefa:', tarefa);

  if (!tarefa) {
    console.log('Tarefa não encontrada, não renderizando modal');
    return null;
  }

  const handleAlterarStatus = (novoStatus: string) => {
    console.log('Alterando status para:', novoStatus);
    onAlterarStatus(tarefa.id, novoStatus as 'pendente' | 'em_andamento' | 'concluido');
  };

  // Não mostrar "Cliente não encontrado" - só mostrar se o cliente não for essa string
  const mostrarCliente = tarefa.cliente && tarefa.cliente !== 'Cliente não encontrado' && tarefa.cliente !== 'Tarefa Geral';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <FileText className="h-6 w-6 text-blue-600" />
            Detalhes da Tarefa
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
                {formatarTipo(tarefa.tipo)}
              </Badge>
            </div>
          </div>

          {/* Descrição */}
          {tarefa.descricao && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Descrição
              </h3>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                {tarefa.descricao}
              </p>
            </div>
          )}

          {/* Informações principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {mostrarCliente && (
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
            </div>
          </div>

          {/* Alterar Status */}
          {tarefa.status !== 'concluido' && (
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">Alterar Status</h3>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Select onValueChange={handleAlterarStatus} defaultValue={tarefa.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                      <SelectItem value="concluido">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
