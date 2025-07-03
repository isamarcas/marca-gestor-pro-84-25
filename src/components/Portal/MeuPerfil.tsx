
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, Lock, Save } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface MeuPerfilProps {
  clienteNome: string;
  clienteEmail?: string;
}

export function MeuPerfil({ clienteNome, clienteEmail }: MeuPerfilProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [perfil, setPerfil] = useState({
    nome: clienteNome || '',
    email: clienteEmail || user?.email || '',
    telefone: '',
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  const handleSalvarPerfil = () => {
    if (!perfil.nome.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive"
      });
      return;
    }

    if (perfil.novaSenha && perfil.novaSenha !== perfil.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sucesso",  
      description: "Perfil atualizado com sucesso!"
    });

    // Limpar campos de senha
    setPerfil(prev => ({
      ...prev,
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: ''
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
        <p className="text-gray-600">Gerencie suas informações pessoais</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                value={perfil.nome}
                onChange={(e) => setPerfil(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={perfil.email}
                onChange={(e) => setPerfil(prev => ({ ...prev, email: e.target.value }))}
                placeholder="seu@email.com"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={perfil.telefone}
              onChange={(e) => setPerfil(prev => ({ ...prev, telefone: e.target.value }))}
              placeholder="(11) 99999-9999"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Alterar Senha
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="senhaAtual">Senha Atual</Label>
            <Input
              id="senhaAtual"
              type="password"
              value={perfil.senhaAtual}
              onChange={(e) => setPerfil(prev => ({ ...prev, senhaAtual: e.target.value }))}
              placeholder="••••••••"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="novaSenha">Nova Senha</Label>
              <Input
                id="novaSenha"
                type="password"
                value={perfil.novaSenha}
                onChange={(e) => setPerfil(prev => ({ ...prev, novaSenha: e.target.value }))}
                placeholder="••••••••"
              />
            </div>
            <div>
              <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
              <Input
                id="confirmarSenha"
                type="password"
                value={perfil.confirmarSenha}
                onChange={(e) => setPerfil(prev => ({ ...prev, confirmarSenha: e.target.value }))}
                placeholder="••••••••"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={handleSalvarPerfil}
          className="px-8 py-2 bg-blue-600 hover:bg-blue-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
