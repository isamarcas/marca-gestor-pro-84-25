
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepProps } from '../types';
import { useFormFormatters } from '../hooks/useFormFormatters';

export function Step3Endereco({ formData, errors, isLoading, onInputChange }: StepProps) {
  const { formatCEP } = useFormFormatters();

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="rua">Rua/Avenida *</Label>
          <Input
            id="rua"
            type="text"
            placeholder="Nome da rua/avenida"
            value={formData.rua}
            onChange={(e) => onInputChange('rua', e.target.value)}
            className={errors.rua ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.rua && <p className="text-sm text-red-500">{errors.rua}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="numero">Número *</Label>
          <Input
            id="numero"
            type="text"
            placeholder="123"
            value={formData.numero}
            onChange={(e) => onInputChange('numero', e.target.value)}
            className={errors.numero ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.numero && <p className="text-sm text-red-500">{errors.numero}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bairro">Bairro *</Label>
          <Input
            id="bairro"
            type="text"
            placeholder="Nome do bairro"
            value={formData.bairro}
            onChange={(e) => onInputChange('bairro', e.target.value)}
            className={errors.bairro ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.bairro && <p className="text-sm text-red-500">{errors.bairro}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cidade">Cidade *</Label>
          <Input
            id="cidade"
            type="text"
            placeholder="Nome da cidade"
            value={formData.cidade}
            onChange={(e) => onInputChange('cidade', e.target.value)}
            className={errors.cidade ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.cidade && <p className="text-sm text-red-500">{errors.cidade}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="estado">Estado *</Label>
          <Select
            value={formData.estado}
            onValueChange={(value) => onInputChange('estado', value)}
          >
            <SelectTrigger className={errors.estado ? 'border-red-500' : ''}>
              <SelectValue placeholder="Selecione o Estado" />
            </SelectTrigger>
            <SelectContent>
              {estados.map((estado) => (
                <SelectItem key={estado} value={estado}>
                  {estado}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.estado && <p className="text-sm text-red-500">{errors.estado}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cep">CEP *</Label>
          <Input
            id="cep"
            type="text"
            placeholder="00000-000"
            value={formData.cep}
            onChange={(e) => onInputChange('cep', formatCEP(e.target.value))}
            className={errors.cep ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.cep && <p className="text-sm text-red-500">{errors.cep}</p>}
        </div>
      </div>
    </div>
  );
}
