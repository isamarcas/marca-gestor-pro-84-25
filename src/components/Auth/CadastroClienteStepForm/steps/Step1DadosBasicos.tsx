
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepProps } from '../types';
import { useFormFormatters } from '../hooks/useFormFormatters';

export function Step1DadosBasicos({ formData, errors, isLoading, onInputChange }: StepProps) {
  const { formatCPFCNPJ, formatPhone } = useFormFormatters();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Tipo de Cliente *</Label>
        <Select
          value={formData.tipoCliente}
          onValueChange={(value: 'pessoa_fisica' | 'pessoa_juridica') => 
            onInputChange('tipoCliente', value)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pessoa_fisica">Pessoa Física</SelectItem>
            <SelectItem value="pessoa_juridica">Pessoa Jurídica</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.tipoCliente === 'pessoa_juridica' && (
        <div className="space-y-2">
          <Label htmlFor="razaoSocial">Razão Social *</Label>
          <Input
            id="razaoSocial"
            type="text"
            placeholder="Digite a razão social"
            value={formData.razaoSocial}
            onChange={(e) => onInputChange('razaoSocial', e.target.value)}
            className={errors.razaoSocial ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.razaoSocial && <p className="text-sm text-red-500">{errors.razaoSocial}</p>}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="nome">{formData.tipoCliente === 'pessoa_fisica' ? 'Nome Completo' : 'Nome Fantasia'} *</Label>
        <Input
          id="nome"
          type="text"
          placeholder={formData.tipoCliente === 'pessoa_fisica' ? 'Digite o nome completo' : 'Digite o nome fantasia'}
          value={formData.nome}
          onChange={(e) => onInputChange('nome', e.target.value)}
          className={errors.nome ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.nome && <p className="text-sm text-red-500">{errors.nome}</p>}
      </div>

      {formData.tipoCliente === 'pessoa_juridica' && (
        <div className="space-y-2">
          <Label htmlFor="nomeCompleto">Nome Completo do Responsável *</Label>
          <Input
            id="nomeCompleto"
            type="text"
            placeholder="Digite o nome completo do responsável"
            value={formData.representanteLegal}
            onChange={(e) => onInputChange('representanteLegal', e.target.value)}
            className={errors.representanteLegal ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.representanteLegal && <p className="text-sm text-red-500">{errors.representanteLegal}</p>}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="cpfCnpj">{formData.tipoCliente === 'pessoa_fisica' ? 'CPF' : 'CNPJ'} *</Label>
        <Input
          id="cpfCnpj"
          type="text"
          placeholder={formData.tipoCliente === 'pessoa_fisica' ? '000.000.000-00' : '00.000.000/0000-00'}
          value={formData.cpfCnpj}
          onChange={(e) => onInputChange('cpfCnpj', formatCPFCNPJ(e.target.value))}
          className={errors.cpfCnpj ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.cpfCnpj && <p className="text-sm text-red-500">{errors.cpfCnpj}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail *</Label>
        <Input
          id="email"
          type="email"
          placeholder="exemplo@email.com"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone *</Label>
        <Input
          id="telefone"
          type="tel"
          placeholder="(00) 00000-0000"
          value={formData.telefone}
          onChange={(e) => onInputChange('telefone', formatPhone(e.target.value))}
          className={errors.telefone ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.telefone && <p className="text-sm text-red-500">{errors.telefone}</p>}
      </div>
    </div>
  );
}
