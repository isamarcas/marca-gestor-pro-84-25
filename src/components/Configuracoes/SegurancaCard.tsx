
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SegurancaCard() {
  const { toast } = useToast();

  const [senhas, setSenhas] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  const handleAlterarSenha = () => {
    if (!senhas.senhaAtual || !senhas.novaSenha || !senhas.confirmarSenha) {
      toast({
        title: "Erro",
        description: "Todos os campos de senha são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (senhas.novaSenha !== senhas.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    if (senhas.novaSenha.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 6 caracteres",
        variant: "destructive"
      });
      return;
    }

    setSenhas({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
    toast({
      title: "Sucesso",
      description: "Senha alterada com sucesso!"
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-lg sm:text-xl">Segurança</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="senha-atual" className="text-sm font-medium">Senha Atual</Label>
          <Input 
            id="senha-atual" 
            type="password" 
            placeholder="••••••••" 
            className="w-full" 
            value={senhas.senhaAtual}
            onChange={(e) => setSenhas(prev => ({ ...prev, senhaAtual: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nova-senha" className="text-sm font-medium">Nova Senha</Label>
          <Input 
            id="nova-senha" 
            type="password" 
            placeholder="••••••••" 
            className="w-full" 
            value={senhas.novaSenha}
            onChange={(e) => setSenhas(prev => ({ ...prev, novaSenha: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmar-senha" className="text-sm font-medium">Confirmar Nova Senha</Label>
          <Input 
            id="confirmar-senha" 
            type="password" 
            placeholder="••••••••" 
            className="w-full" 
            value={senhas.confirmarSenha}
            onChange={(e) => setSenhas(prev => ({ ...prev, confirmarSenha: e.target.value }))}
          />
        </div>
        <Button onClick={handleAlterarSenha} className="w-full sm:w-auto">
          Alterar Senha
        </Button>
      </CardContent>
    </Card>
  );
}
