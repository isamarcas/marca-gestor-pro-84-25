
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMarcas } from '@/hooks/useMarcas';
import { useClientes } from '@/hooks/useClientes';

interface TarefaDetalhada {
  id: string;
  titulo: string;
  descricao: string;
  marcaId: string;
  responsavel: string;
  prazo: Date;
  status: 'pendente' | 'em_andamento' | 'concluida';
  prioridade: 'baixa' | 'media' | 'alta';
  tipoTarefa: string;
  tempoEstimado?: number;
  createdAt: Date;
  isTarefaGeral?: boolean;
}

interface EditarTarefaModalProps {
  tarefa: TarefaDetalhada | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSalvarTarefa: (id: string, dadosAtualizados: Partial<TarefaDetalhada>) => void;
}

export function EditarTarefaModal({ 
  tarefa, 
  open, 
  onOpenChange, 
  onSalvarTarefa 
}: EditarTarefaModalProps) {
  const { toast } = useToast();
  const { marcas } = useMarcas();
  const { clientes } = useClientes();

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    marcaId: '',
    responsavel: '',
    prazo: '',
    status: 'pendente' as 'pendente' | 'em_andamento' | 'concluida',
    prioridade: 'media' as 'baixa' | 'media' | 'alta',
    tipoTarefa: 'outros',
    tempoEstimado: 0
  });

  useEffect(() => {
    if (tarefa) {
      let prazoFormatado = '';
      try {
        if (tarefa.prazo instanceof Date) {
          prazoFormatado = tarefa.prazo.toISOString().split('T')[0];
        } else if (typeof tarefa.prazo === 'string') {
          prazoFormatado = new Date(tarefa.prazo).toISOString().split('T')[0];
        }
      } catch (error) {
        prazoFormatado = new Date().toISOString().split('T')[0];
      }
      
      setFormData({
        titulo: tarefa.titulo || '',
        descricao: tarefa.descricao || '',
        marcaId: tarefa.marcaId || '',
        responsavel: tarefa.responsavel || '',
        prazo: prazoFormatado,
        status: tarefa.status || 'pendente',
        prioridade: tarefa.prioridade || 'media',
        tipoTarefa: tarefa.tipoTarefa || 'outros',
        tempoEstimado: tarefa.tempoEstimado || 0
      });
    }
  }, [tarefa]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.prazo) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha título e prazo.",
        variant: "destructive",
      });
      return;
    }

    if (!tarefa?.isTarefaGeral && (!formData.marcaId || !formData.responsavel)) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (!tarefa) return;

    const dadosAtualizados = {
      titulo: formData.titulo,
      descricao: formData.descricao,
      marcaId: tarefa.isTarefaGeral ? '' : formData.marcaId,
      responsavel: tarefa.isTarefaGeral ? 'Sistema' : formData.responsavel,
      prazo: new Date(formData.prazo),
      status: formData.status,
      prioridade: formData.prioridade,
      tipoTarefa: formData.tipoTarefa,
      tempoEstimado: formData.tempoEstimado,
      isTarefaGeral: tarefa.isTarefaGeral
    };

    onSalvarTarefa(tarefa.id, dadosAtualizados);
    onOpenChange(false);
    
    toast({
      title: "Tarefa atualizada",
      description: `A tarefa "${formData.titulo}" foi atualizada com sucesso.`,
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getClienteNome = (marcaId: string) => {
    const marca = marcas.find(m => m.id === marcaId);
    if (!marca) return '';
    const cliente = clientes.find(c => c.id === marca.clienteId);
    return cliente?.nome || marca.titular || 'Cliente não encontrado';
  };

  if (!tarefa) return null;

  const isTarefaGeral = tarefa.isTarefaGeral;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Calendar className="h-5 w-5" />
            Editar {isTarefaGeral ? 'Tarefa Geral' : 'Tarefa'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="titulo" className="text-sm font-medium">
                Título da Tarefa *
              </Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                placeholder="Ex: Resposta à exigência - Marca X"
                className="w-full"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="descricao" className="text-sm font-medium">
                Descrição
              </Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                placeholder="Descreva os detalhes da tarefa..."
                className="min-h-[80px] resize-none"
              />
            </div>

            {!isTarefaGeral && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="marcaId" className="text-sm font-medium">
                    Marca *
                  </Label>
                  <Select value={formData.marcaId} onValueChange={(value) => handleInputChange('marcaId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {marcas.map((marca) => (
                        <SelectItem key={marca.id} value={marca.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{marca.nome}</span>
                            <span className="text-xs text-gray-500">{getClienteNome(marca.id)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsavel" className="text-sm font-medium">
                    Responsável *
                  </Label>
                  <Input
                    id="responsavel"
                    value={formData.responsavel}
                    onChange={(e) => handleInputChange('responsavel', e.target.value)}
                    placeholder="Nome do responsável"
                    required
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  {!isTarefaGeral && <SelectItem value="em_andamento">Em Andamento</SelectItem>}
                  <SelectItem value="concluida">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prioridade" className="text-sm font-medium">
                Prioridade
              </Label>
              <Select value={formData.prioridade} onValueChange={(value) => handleInputChange('prioridade', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      Alta
                    </div>
                  </SelectItem>
                  <SelectItem value="media">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      Média
                    </div>
                  </SelectItem>
                  <SelectItem value="baixa">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Baixa
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipoTarefa" className="text-sm font-medium">
                {isTarefaGeral ? 'Categoria' : 'Tipo de Tarefa'}
              </Label>
              <Select value={formData.tipoTarefa} onValueChange={(value) => handleInputChange('tipoTarefa', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {isTarefaGeral ? (
                    <>
                      <SelectItem value="pessoal">Pessoal</SelectItem>
                      <SelectItem value="trabalho">Trabalho</SelectItem>
                      <SelectItem value="lembrete">Lembrete</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="resposta_exigencia">Resposta à Exigência</SelectItem>
                      <SelectItem value="renovacao">Renovação</SelectItem>
                      <SelectItem value="defesa_oposicao">Defesa de Oposição</SelectItem>
                      <SelectItem value="documentacao">Documentação</SelectItem>
                      <SelectItem value="acompanhamento">Acompanhamento</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prazo" className="text-sm font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Prazo *
              </Label>
              <Input
                id="prazo"
                type="date"
                value={formData.prazo}
                onChange={(e) => handleInputChange('prazo', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {!isTarefaGeral && (
              <div className="space-y-2">
                <Label htmlFor="tempoEstimado" className="text-sm font-medium">
                  Tempo Estimado (horas)
                </Label>
                <Input
                  id="tempoEstimado"
                  type="number"
                  value={formData.tempoEstimado}
                  onChange={(e) => handleInputChange('tempoEstimado', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
