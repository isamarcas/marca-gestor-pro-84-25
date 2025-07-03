import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, Calendar, Save, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Marca } from '@/types';

interface ProcessStep {
  id: string;
  titulo: string;
  descricao: string;
  status: 'concluido' | 'em_andamento' | 'pendente';
  statusMarca: Marca['status'];
}

interface EditarAndamentoDialogProps {
  marca: Marca | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveStatus: (marcaId: string, novoStatus: Marca['status']) => void;
}

const processSteps: ProcessStep[] = [
  {
    id: '1',
    titulo: 'Depósito do Pedido',
    descricao: 'Início do processo',
    status: 'concluido',
    statusMarca: 'deposito'
  },
  {
    id: '2',
    titulo: 'Publicação de Pedido',
    descricao: 'Abre-se o prazo para apresentação de oposição por terceiros, que é de 60 dias corridos.',
    status: 'pendente',
    statusMarca: 'publicacao'
  },
  {
    id: '3',
    titulo: 'Fase de Oposição',
    descricao: 'Terceiros interessados apresentam oposição fundamentada. Se houver oposição, o requerente será notificado e terá 60 dias para apresentar sua manifestação à oposição.',
    status: 'pendente',
    statusMarca: 'fase_oposicao'
  },
  {
    id: '4',
    titulo: 'Exame de Mérito',
    descricao: 'O examinador analisa se a marca pode ou não ser registrada: Colisão com marcas anteriores? Descritiva, genérica ou de uso comum? Enquadrada em vedação legal?',
    status: 'pendente',
    statusMarca: 'exame_merito'
  },
  {
    id: '5',
    titulo: 'Resposta à Exigência de Mérito',
    descricao: 'Se houver exigência de mérito, o requerente tem 60 dias para responder. Se não responder, o pedido é arquivado de ofício.',
    status: 'pendente',
    statusMarca: 'resposta_exigencia'
  },
  {
    id: '6',
    titulo: 'Deferimento',
    descricao: 'Marca aprovada pelo INPI',
    status: 'pendente',
    statusMarca: 'deferido'
  },
  {
    id: '7',
    titulo: 'Indeferimento',
    descricao: 'Marca reprovada pelo INPI',
    status: 'pendente',
    statusMarca: 'indeferido'
  },
  {
    id: '8',
    titulo: 'Recurso',
    descricao: 'Recurso apresentado contra decisão de indeferimento',
    status: 'pendente',
    statusMarca: 'recurso'
  },
  {
    id: '9',
    titulo: 'Pagamento da Taxa de Concessão',
    descricao: 'Se deferido, o titular tem 60 dias para pagar a taxa de expedição do certificado + 1ª década de vigência. Se não pagar, o pedido cai em abandono.',
    status: 'pendente',
    statusMarca: 'pagamento_taxa'
  },
  {
    id: '10',
    titulo: 'Concessão e Registro',
    descricao: 'Após o pagamento, o INPI publica o registro da marca e emite o certificado. A marca passa a ter vigência de 10 anos a partir da data de concessão.',
    status: 'pendente',
    statusMarca: 'concessao'
  },
  {
    id: '11',
    titulo: 'Vigência, Uso e Fiscalização',
    descricao: 'O titular pode usar, licenciar e defender sua marca. Deve manter o uso real e contínuo da marca para evitar caducidade por desuso.',
    status: 'pendente',
    statusMarca: 'vigencia'
  },
  {
    id: '12',
    titulo: 'Renovação',
    descricao: 'A marca pode ser renovada por mais 10 anos, indefinidamente, a cada vencimento. Caso não renove ocorrerá o arquivamento definitivo!',
    status: 'pendente',
    statusMarca: 'renovacao'
  }
];

const statusLabels = {
  em_analise: 'Em Análise',
  deferido: 'Deferido',
  indeferido: 'Indeferido',
  recurso: 'Recurso',
  renovacao: 'Renovação',
  oposicao: 'Oposição',
  deposito: 'Depósito',
  publicacao: 'Publicação',
  fase_oposicao: 'Fase de Oposição',
  exame_merito: 'Exame de Mérito',
  resposta_exigencia: 'Resposta à Exigência',
  pagamento_taxa: 'Pagamento da Taxa',
  concessao: 'Concessão',
  vigencia: 'Vigência',
};

const statusColors = {
  em_analise: 'bg-blue-100 text-blue-800 border-blue-200',
  deferido: 'bg-green-100 text-green-800 border-green-200',
  indeferido: 'bg-red-100 text-red-800 border-red-200',
  recurso: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  renovacao: 'bg-purple-100 text-purple-800 border-purple-200',
  oposicao: 'bg-orange-100 text-orange-800 border-orange-200',
  deposito: 'bg-gray-100 text-gray-800 border-gray-200',
  publicacao: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  fase_oposicao: 'bg-orange-100 text-orange-800 border-orange-200',
  exame_merito: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  resposta_exigencia: 'bg-amber-100 text-amber-800 border-amber-200',
  pagamento_taxa: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  concessao: 'bg-green-100 text-green-800 border-green-200',
  vigencia: 'bg-teal-100 text-teal-800 border-teal-200',
};

export function EditarAndamentoDialog({ 
  marca, 
  open, 
  onOpenChange, 
  onSaveStatus 
}: EditarAndamentoDialogProps) {
  const [statusSelecionado, setStatusSelecionado] = useState<string | null>(null);

  useEffect(() => {
    if (marca) {
      setStatusSelecionado(marca.status);
    }
  }, [marca]);

  const handleSave = () => {
    if (marca && statusSelecionado) {
      onSaveStatus(marca.id, statusSelecionado as Marca['status']);
      onOpenChange(false);
    }
  };

  const getStepIcon = (step: ProcessStep) => {
    if (step.statusMarca === statusSelecionado) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (step.statusMarca === marca?.status) {
      return <Clock className="h-5 w-5 text-blue-500" />;
    } else {
      return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStepColor = (step: ProcessStep) => {
    if (step.statusMarca === statusSelecionado) {
      return 'border-green-500 bg-green-50 ring-2 ring-green-200';
    } else if (step.statusMarca === marca?.status) {
      return 'border-blue-500 bg-blue-50';
    } else {
      return 'border-gray-300 bg-gray-50 hover:bg-gray-100';
    }
  };

  if (!marca) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            Editar Andamento do Processo
          </DialogTitle>
          <div className="text-sm text-gray-600">
            <p><strong>Marca:</strong> {marca.nome}</p>
            <p><strong>Processo:</strong> {marca.numeroProcesso}</p>
            <p><strong>Status Atual:</strong> 
              <Badge className={`ml-2 ${statusColors[marca.status]}`}>
                {statusLabels[marca.status]}
              </Badge>
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <h4 className="font-semibold text-gray-800">Selecione o novo status:</h4>
          
          <div className="relative">
            {/* Linha vertical da timeline */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-gray-300"></div>
            
            <div className="space-y-4">
              {processSteps.map((step) => (
                <div 
                  key={step.id} 
                  className={`relative flex items-start gap-4 cursor-pointer transition-all duration-200 ${
                    step.statusMarca === statusSelecionado ? 'transform scale-105' : ''
                  }`}
                  onClick={() => setStatusSelecionado(step.statusMarca)}
                >
                  {/* Ícone do step */}
                  <div className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${getStepColor(step)}`}>
                    {getStepIcon(step)}
                  </div>
                  
                  {/* Conteúdo do step */}
                  <div className="flex-1 min-w-0">
                    <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${getStepColor(step)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">{step.titulo}</h5>
                        <div className="flex items-center gap-2">
                          {step.statusMarca === statusSelecionado && (
                            <Badge className="bg-green-100 text-green-800">
                              ✓ Selecionado
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{step.descricao}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!statusSelecionado || statusSelecionado === marca.status}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
