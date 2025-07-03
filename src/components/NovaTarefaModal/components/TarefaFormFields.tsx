
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { useMarcas } from '@/hooks/useMarcas';
import { useClientes } from '@/hooks/useClientes';
import { TarefaFormData } from '../types';

interface TarefaFormFieldsProps {
  formData: TarefaFormData;
  onInputChange: (field: string, value: string | number) => void;
}

export function TarefaFormFields({ formData, onInputChange }: TarefaFormFieldsProps) {
  const { marcas } = useMarcas();
  const { clientes } = useClientes();

  // Função para obter o nome do cliente baseado na marca selecionada
  const getClienteNome = (marcaId: string) => {
    const marca = marcas.find(m => m.id === marcaId);
    if (!marca) return '';
    const cliente = clientes.find(c => c.id === marca.clienteId);
    return cliente?.nome || marca.titular || 'Cliente não encontrado';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="titulo" className="text-sm font-medium">
          Título da Tarefa *
        </Label>
        <Input
          id="titulo"
          value={formData.titulo}
          onChange={(e) => onInputChange('titulo', e.target.value)}
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
          onChange={(e) => onInputChange('descricao', e.target.value)}
          placeholder="Descreva os detalhes da tarefa..."
          className="min-h-[80px] resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="marcaId" className="text-sm font-medium">
          Marca *
        </Label>
        <Select value={formData.marcaId} onValueChange={(value) => onInputChange('marcaId', value)}>
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
          onChange={(e) => onInputChange('responsavel', e.target.value)}
          placeholder="Nome do responsável"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipoTarefa" className="text-sm font-medium">
          Tipo de Tarefa
        </Label>
        <Select value={formData.tipoTarefa} onValueChange={(value) => onInputChange('tipoTarefa', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="resposta_exigencia">Resposta à Exigência</SelectItem>
            <SelectItem value="renovacao">Renovação</SelectItem>
            <SelectItem value="defesa_oposicao">Defesa de Oposição</SelectItem>
            <SelectItem value="documentacao">Documentação</SelectItem>
            <SelectItem value="acompanhamento">Acompanhamento</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="prioridade" className="text-sm font-medium">
          Prioridade
        </Label>
        <Select value={formData.prioridade} onValueChange={(value) => onInputChange('prioridade', value)}>
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
        <Label htmlFor="prazo" className="text-sm font-medium flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          Prazo *
        </Label>
        <Input
          id="prazo"
          type="date"
          value={formData.prazo}
          onChange={(e) => onInputChange('prazo', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tempoEstimado" className="text-sm font-medium">
          Tempo Estimado (horas)
        </Label>
        <Input
          id="tempoEstimado"
          type="number"
          value={formData.tempoEstimado}
          onChange={(e) => onInputChange('tempoEstimado', parseInt(e.target.value) || 0)}
          placeholder="0"
          min="0"
        />
      </div>
    </div>
  );
}
