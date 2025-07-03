
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Calendar, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TarefaGeralData {
  titulo: string;
  descricao: string;
  prazo?: Date;
  prioridade: 'alta' | 'media' | 'baixa';
  categoria: 'lembrete' | 'pessoal' | 'trabalho' | 'outros';
}

interface TarefaGeralModalProps {
  onAddTarefaGeral: (tarefa: TarefaGeralData) => void;
}

export function TarefaGeralModal({ onAddTarefaGeral }: TarefaGeralModalProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    prazo: '',
    prioridade: 'media' as const,
    categoria: 'outros' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o título da tarefa.",
        variant: "destructive",
      });
      return;
    }

    const novaTarefaGeral: TarefaGeralData = {
      titulo: formData.titulo,
      descricao: formData.descricao,
      prazo: formData.prazo ? new Date(formData.prazo) : undefined,
      prioridade: formData.prioridade,
      categoria: formData.categoria
    };

    console.log('Criando tarefa geral:', novaTarefaGeral);
    onAddTarefaGeral(novaTarefaGeral);
    
    // Reset form
    setFormData({
      titulo: '',
      descricao: '',
      prazo: '',
      prioridade: 'media',
      categoria: 'outros'
    });
    
    setOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50">
          <Lightbulb className="h-4 w-4" />
          Tarefas Gerais
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Lightbulb className="h-5 w-5 text-green-600" />
            Nova Tarefa Geral
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo" className="text-sm font-medium">
                Título da Tarefa *
              </Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                placeholder="Ex: Lembrar de enviar documento, Levar pet para passear..."
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao" className="text-sm font-medium">
                Descrição
              </Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                placeholder="Descreva os detalhes da tarefa (opcional)..."
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="categoria" className="text-sm font-medium">
                  Categoria
                </Label>
                <Select value={formData.categoria} onValueChange={(value) => handleInputChange('categoria', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lembrete">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        Lembrete
                      </div>
                    </SelectItem>
                    <SelectItem value="pessoal">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        Pessoal
                      </div>
                    </SelectItem>
                    <SelectItem value="trabalho">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        Trabalho
                      </div>
                    </SelectItem>
                    <SelectItem value="outros">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                        Outros
                      </div>
                    </SelectItem>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="prazo" className="text-sm font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Prazo (opcional)
              </Label>
              <Input
                id="prazo"
                type="date"
                value={formData.prazo}
                onChange={(e) => handleInputChange('prazo', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Criar Tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
