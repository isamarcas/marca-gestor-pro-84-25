
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Lock, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UseFormReturn } from 'react-hook-form';
import { CadastroClienteFormData } from '@/components/CadastroCliente/types';

interface Step4CredenciaisProps {
  form: UseFormReturn<CadastroClienteFormData>;
  onPrev: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  senhaAcesso: string;
  setSenhaAcesso: (senha: string) => void;
  confirmarSenha: string;
  setConfirmarSenha: (senha: string) => void;
}

export function Step4Credenciais({ 
  form, 
  onPrev, 
  onSubmit,
  isLoading,
  senhaAcesso,
  setSenhaAcesso,
  confirmarSenha,
  setConfirmarSenha
}: Step4CredenciaisProps) {
  const isValidPassword = senhaAcesso && senhaAcesso.length >= 6;
  const passwordsMatch = senhaAcesso === confirmarSenha;
  const canSubmit = isValidPassword && passwordsMatch && confirmarSenha;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Credenciais de Acesso</h3>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          Crie suas credenciais para acessar o portal do cliente. Use o email cadastrado nos passos anteriores junto com esta senha para fazer login.
        </AlertDescription>
      </Alert>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="senha">Senha *</Label>
          <Input
            id="senha"
            type="password"
            placeholder="Digite sua senha (mín. 6 caracteres)"
            value={senhaAcesso}
            onChange={(e) => setSenhaAcesso(e.target.value)}
            required
          />
          {senhaAcesso && senhaAcesso.length < 6 && (
            <p className="text-sm text-red-600">Senha deve ter pelo menos 6 caracteres</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
          <Input
            id="confirmarSenha"
            type="password"
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
          {confirmarSenha && !passwordsMatch && (
            <p className="text-sm text-red-600">As senhas não coincidem</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoes">Observações (opcional)</Label>
        <Textarea 
          id="observacoes"
          placeholder="Informações adicionais sobre sua empresa ou necessidades..."
          className="min-h-[80px]"
          value={form.watch('observacoes') || ''}
          onChange={(e) => form.setValue('observacoes', e.target.value)}
        />
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrev} disabled={isLoading}>
          Anterior
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading || !canSubmit} 
          className="bg-green-600 hover:bg-green-700"
        >
          {isLoading ? 'Cadastrando...' : 'Finalizar Cadastro'}
        </Button>
      </div>
    </form>
  );
}
