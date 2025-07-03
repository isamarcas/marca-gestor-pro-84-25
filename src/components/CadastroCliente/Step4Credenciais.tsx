
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Lock, AlertCircle } from 'lucide-react';
import { StepProps } from './types';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function Step4Credenciais({ form, onPrev, isLoading }: StepProps) {
  const senha = form.watch('senha');
  const confirmarSenha = form.watch('confirmarSenha');
  
  const isValidPassword = senha && senha.length >= 6;
  const passwordsMatch = senha === confirmarSenha;
  const canSubmit = isValidPassword && passwordsMatch && confirmarSenha;

  return (
    <div className="space-y-6">
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
        <FormField
          control={form.control}
          name="senha"
          rules={{ 
            required: 'Senha é obrigatória',
            minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha *</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite sua senha (mín. 6 caracteres)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {senha && senha.length < 6 && (
                <p className="text-sm text-red-600">Senha deve ter pelo menos 6 caracteres</p>
              )}
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmarSenha"
          rules={{ 
            required: 'Confirmação de senha é obrigatória',
            validate: (value) => {
              if (!value) return 'Confirmação de senha é obrigatória';
              if (value !== form.getValues('senha')) return 'As senhas não coincidem';
              return true;
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha *</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirme sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {confirmarSenha && !passwordsMatch && (
                <p className="text-sm text-red-600">As senhas não coincidem</p>
              )}
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="observacoes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observações (opcional)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Informações adicionais sobre sua empresa ou necessidades..."
                className="min-h-[80px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} disabled={isLoading}>
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
    </div>
  );
}
