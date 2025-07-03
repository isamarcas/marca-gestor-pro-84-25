
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export function PerfilUsuarioCard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [perfilData, setPerfilData] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
    telefone: ''
  });

  const handleSalvarPerfil = () => {
    if (!perfilData.nome.trim()) {
      toast({
        title: "Erro",
        description: "Nome completo é obrigatório",
        variant: "destructive"
      });
      return;
    }

    if (!perfilData.email.trim()) {
      toast({
        title: "Erro", 
        description: "Email é obrigatório",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Perfil atualizado com sucesso!"
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-lg sm:text-xl">Perfil do Usuário</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nome" className="text-sm font-medium">Nome Completo</Label>
          <Input 
            id="nome" 
            placeholder="Seu nome completo" 
            className="w-full" 
            value={perfilData.nome}
            onChange={(e) => setPerfilData(prev => ({ ...prev, nome: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="seu@email.com" 
            className="w-full" 
            value={perfilData.email}
            onChange={(e) => setPerfilData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone" className="text-sm font-medium">Telefone</Label>
          <Input 
            id="telefone" 
            placeholder="(11) 99999-9999" 
            className="w-full" 
            value={perfilData.telefone}
            onChange={(e) => setPerfilData(prev => ({ ...prev, telefone: e.target.value }))}
          />
        </div>
        <Button onClick={handleSalvarPerfil} className="w-full sm:w-auto">
          Salvar Alterações
        </Button>
      </CardContent>
    </Card>
  );
}
