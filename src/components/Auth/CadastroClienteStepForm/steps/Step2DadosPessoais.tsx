
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepProps } from '../types';

export function Step2DadosPessoais({ formData, errors, isLoading, onInputChange }: StepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nacionalidade">Nacionalidade</Label>
          <Input
            id="nacionalidade"
            type="text"
            placeholder="Ex: Brasileira"
            value={formData.nacionalidade}
            onChange={(e) => onInputChange('nacionalidade', e.target.value)}
            className={errors.nacionalidade ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.nacionalidade && <p className="text-sm text-red-500">{errors.nacionalidade}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="profissao">Profissão</Label>
          <Input
            id="profissao"
            type="text"
            placeholder="Ex: Advogado(a)"
            value={formData.profissao}
            onChange={(e) => onInputChange('profissao', e.target.value)}
            className={errors.profissao ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.profissao && <p className="text-sm text-red-500">{errors.profissao}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="estadoCivil">Estado Civil</Label>
          <Select
            value={formData.estadoCivil}
            onValueChange={(value) => onInputChange('estadoCivil', value)}
          >
            <SelectTrigger className={errors.estadoCivil ? 'border-red-500' : ''}>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solteiro">Solteiro(a)</SelectItem>
              <SelectItem value="casado">Casado(a)</SelectItem>
              <SelectItem value="divorciado">Divorciado(a)</SelectItem>
              <SelectItem value="viuvo">Viúvo(a)</SelectItem>
              <SelectItem value="uniao_estavel">União Estável</SelectItem>
            </SelectContent>
          </Select>
          {errors.estadoCivil && <p className="text-sm text-red-500">{errors.estadoCivil}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="rg">RG</Label>
          <Input
            id="rg"
            type="text"
            placeholder="00.000.000-0"
            value={formData.rg}
            onChange={(e) => onInputChange('rg', e.target.value)}
            className={errors.rg ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.rg && <p className="text-sm text-red-500">{errors.rg}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="orgaoEmissor">Órgão Emissor</Label>
          <Input
            id="orgaoEmissor"
            type="text"
            placeholder="SSP/SP"
            value={formData.orgaoEmissor}
            onChange={(e) => onInputChange('orgaoEmissor', e.target.value)}
            className={errors.orgaoEmissor ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.orgaoEmissor && <p className="text-sm text-red-500">{errors.orgaoEmissor}</p>}
        </div>
      </div>
    </div>
  );
}
