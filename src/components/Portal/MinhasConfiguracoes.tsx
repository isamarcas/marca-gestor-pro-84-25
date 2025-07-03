
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Mail, Shield, Globe, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function MinhasConfiguracoes() {
  const { toast } = useToast();
  
  const [configuracoes, setConfiguracoes] = useState({
    notificacaoEmail: true,
    notificacaoPush: false,
    alertasPrazos: true,
    alertasDocumentos: true,
    idioma: 'pt-BR',
    tema: 'claro'
  });

  const handleSalvarConfiguracoes = () => {
    // Salvar no localStorage
    localStorage.setItem('configuracoes_cliente', JSON.stringify(configuracoes));
    
    toast({
      title: "Configurações Salvas",
      description: "Suas preferências foram atualizadas com sucesso."
    });
  };

  const handleToggle = (campo: string, valor: boolean) => {
    setConfiguracoes(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleSelect = (campo: string, valor: string) => {
    setConfiguracoes(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Personalize suas preferências do sistema</p>
      </div>

      {/* Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notificacao-email">Notificações por E-mail</Label>
              <p className="text-sm text-gray-500">Receber notificações importantes por e-mail</p>
            </div>
            <Switch
              id="notificacao-email"
              checked={configuracoes.notificacaoEmail}
              onCheckedChange={(checked) => handleToggle('notificacaoEmail', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notificacao-push">Notificações Push</Label>
              <p className="text-sm text-gray-500">Receber notificações no navegador</p>
            </div>
            <Switch
              id="notificacao-push"
              checked={configuracoes.notificacaoPush}
              onCheckedChange={(checked) => handleToggle('notificacaoPush', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Alertas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Alertas Automáticos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="alertas-prazos">Alertas de Prazos</Label>
              <p className="text-sm text-gray-500">Ser notificado sobre prazos importantes</p>
            </div>
            <Switch
              id="alertas-prazos"
              checked={configuracoes.alertasPrazos}
              onCheckedChange={(checked) => handleToggle('alertasPrazos', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="alertas-documentos">Alertas de Documentos</Label>
              <p className="text-sm text-gray-500">Ser notificado sobre novos documentos</p>
            </div>
            <Switch
              id="alertas-documentos"
              checked={configuracoes.alertasDocumentos}
              onCheckedChange={(checked) => handleToggle('alertasDocumentos', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferências Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Preferências Gerais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="idioma">Idioma</Label>
            <Select value={configuracoes.idioma} onValueChange={(value) => handleSelect('idioma', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="es-ES">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tema">Tema</Label>
            <Select value={configuracoes.tema} onValueChange={(value) => handleSelect('tema', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="claro">Claro</SelectItem>
                <SelectItem value="escuro">Escuro</SelectItem>
                <SelectItem value="auto">Automático</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={handleSalvarConfiguracoes}
          className="px-8 py-2 bg-blue-600 hover:bg-blue-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
