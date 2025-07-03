
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Eye, EyeOff } from 'lucide-react';
import { StepProps } from '../types';

export function Step4Credenciais({ formData, errors, isLoading, onInputChange }: StepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="senha">Senha de Acesso *</Label>
        <div className="relative">
          <Input
            id="senha"
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite sua senha (mínimo 6 caracteres)"
            value={formData.senha}
            onChange={(e) => onInputChange('senha', e.target.value)}
            className={errors.senha ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {errors.senha && <p className="text-sm text-red-500">{errors.senha}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
        <div className="relative">
          <Input
            id="confirmarSenha"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirme sua senha"
            value={formData.confirmarSenha}
            onChange={(e) => onInputChange('confirmarSenha', e.target.value)}
            className={errors.confirmarSenha ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isLoading}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {errors.confirmarSenha && <p className="text-sm text-red-500">{errors.confirmarSenha}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoes">Observações (opcional)</Label>
        <Textarea
          id="observacoes"
          placeholder="Informações adicionais sobre sua empresa ou necessidades..."
          className="min-h-[80px]"
          value={formData.observacoes}
          onChange={(e) => onInputChange('observacoes', e.target.value)}
          disabled={isLoading}
        />
      </div>

      <p className="text-xs text-gray-500">
        Ao se cadastrar, você concorda com nossos termos de uso e política de privacidade.
      </p>
    </div>
  );
}
