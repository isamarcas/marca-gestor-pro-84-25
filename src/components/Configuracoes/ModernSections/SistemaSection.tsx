
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Settings, 
  Moon, 
  Sun, 
  Globe, 
  Database, 
  Download,
  Upload,
  Trash2,
  RefreshCw,
  HardDrive,
  Wifi,
  Monitor
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function SistemaSection() {
  const { toast } = useToast();
  
  const [configuracoesSistema, setConfiguracoesSistema] = useState({
    modoEscuro: false,
    idioma: 'pt-BR',
    backupAutomatico: true,
    sincronizacao: true,
    compressaoImagens: true,
    notificacoesDesktop: true
  });

  const [armazenamento] = useState({
    usado: 2.1,
    total: 5.0,
    porcentagem: 42
  });

  const [ultimoBackup] = useState('Há 2 horas');
  const [statusSincronizacao] = useState('Sincronizado');

  const idiomas = [
    { value: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷' },
    { value: 'en-US', label: 'English (US)', flag: '🇺🇸' },
    { value: 'es-ES', label: 'Español', flag: '🇪🇸' },
    { value: 'fr-FR', label: 'Français', flag: '🇫🇷' }
  ];

  const toggleConfiguracao = (campo: keyof typeof configuracoesSistema) => {
    setConfiguracoesSistema(prev => {
      const newState = { ...prev, [campo]: !prev[campo] };
      
      const mensagens = {
        modoEscuro: newState[campo] ? '🌙 Modo escuro ativado' : '☀️ Modo claro ativado',
        backupAutomatico: newState[campo] ? '💾 Backup automático ativado' : '💾 Backup automático desativado',
        sincronizacao: newState[campo] ? '🔄 Sincronização ativada' : '🔄 Sincronização desativada',
        compressaoImagens: newState[campo] ? '📷 Compressão de imagens ativada' : '📷 Compressão de imagens desativada',
        notificacoesDesktop: newState[campo] ? '🖥️ Notificações desktop ativadas' : '🖥️ Notificações desktop desativadas'
      };

      toast({
        title: "⚙️ Configuração Atualizada",
        description: mensagens[campo] || 'Configuração alterada com sucesso',
      });

      return newState;
    });
  };

  const handleIdiomaChange = (novoIdioma: string) => {
    setConfiguracoesSistema(prev => ({ ...prev, idioma: novoIdioma }));
    const idiomaSelecionado = idiomas.find(i => i.value === novoIdioma);
    toast({
      title: "🌍 Idioma Alterado",
      description: `Interface alterada para ${idiomaSelecionado?.label}`,
    });
  };

  const executarBackup = () => {
    toast({
      title: "💾 Backup Iniciado",
      description: "Criando backup dos seus dados...",
    });

    setTimeout(() => {
      toast({
        title: "✅ Backup Concluído",
        description: "Backup criado com sucesso!",
      });
    }, 2000);
  };

  const limparCache = () => {
    toast({
      title: "🧹 Limpando Cache",
      description: "Removendo arquivos temporários...",
    });

    setTimeout(() => {
      toast({
        title: "✅ Cache Limpo",
        description: "Cache removido com sucesso!",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Cards de Status do Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Armazenamento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-xl">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <HardDrive className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900">
                      {armazenamento.usado}GB
                    </p>
                    <p className="text-xs text-slate-600">de {armazenamento.total}GB</p>
                  </div>
                </div>
                <Progress value={armazenamento.porcentagem} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Backup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Último Backup</p>
                  <p className="text-xs text-slate-600">{ultimoBackup}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sincronização */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <Wifi className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Status</p>
                  <p className="text-xs text-green-600 font-semibold">{statusSincronizacao}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tema */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                  {configuracoesSistema.modoEscuro ? (
                    <Moon className="h-5 w-5 text-white" />
                  ) : (
                    <Sun className="h-5 w-5 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Tema</p>
                  <p className="text-xs text-slate-600">
                    {configuracoesSistema.modoEscuro ? 'Escuro' : 'Claro'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Configurações de Aparência */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Monitor className="h-6 w-6 text-orange-600" />
              Aparência & Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Modo Escuro */}
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                  {configuracoesSistema.modoEscuro ? (
                    <Moon className="h-6 w-6 text-white" />
                  ) : (
                    <Sun className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Modo Escuro</h4>
                  <p className="text-sm text-slate-600">
                    {configuracoesSistema.modoEscuro 
                      ? 'Interface com tema escuro ativado' 
                      : 'Interface com tema claro ativado'
                    }
                  </p>
                </div>
              </div>
              <Switch
                checked={configuracoesSistema.modoEscuro}
                onCheckedChange={() => toggleConfiguracao('modoEscuro')}
              />
            </div>

            {/* Idioma */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-blue-600" />
                <h4 className="font-bold text-slate-900">Idioma da Interface</h4>
              </div>
              <Select 
                value={configuracoesSistema.idioma} 
                onValueChange={handleIdiomaChange}
              >
                <SelectTrigger className="bg-white border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {idiomas.map((idioma) => (
                    <SelectItem key={idioma.value} value={idioma.value}>
                      <div className="flex items-center gap-2">
                        <span>{idioma.flag}</span>
                        <span>{idioma.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Configurações de Sistema */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-purple-600" />
              Configurações do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Backup Automático */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Backup Automático</h4>
                  <p className="text-sm text-slate-600">
                    Backup diário dos seus dados importantes
                  </p>
                </div>
              </div>
              <Switch
                checked={configuracoesSistema.backupAutomatico}
                onCheckedChange={() => toggleConfiguracao('backupAutomatico')}
              />
            </div>

            {/* Sincronização */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Sincronização Automática</h4>
                  <p className="text-sm text-slate-600">
                    Manter dados sincronizados em tempo real
                  </p>
                </div>
              </div>
              <Switch
                checked={configuracoesSistema.sincronizacao}
                onCheckedChange={() => toggleConfiguracao('sincronizacao')}
              />
            </div>

            {/* Compressão de Imagens */}
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Compressão de Imagens</h4>
                  <p className="text-sm text-slate-600">
                    Otimizar imagens para economizar espaço
                  </p>
                </div>
              </div>
              <Switch
                checked={configuracoesSistema.compressaoImagens}
                onCheckedChange={() => toggleConfiguracao('compressaoImagens')}
              />
            </div>

            {/* Notificações Desktop */}
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                  <Monitor className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Notificações Desktop</h4>
                  <p className="text-sm text-slate-600">
                    Receber notificações do sistema no desktop
                  </p>
                </div>
              </div>
              <Switch
                checked={configuracoesSistema.notificacoesDesktop}
                onCheckedChange={() => toggleConfiguracao('notificacoesDesktop')}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Ações do Sistema */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Database className="h-6 w-6 text-green-600" />
              Ações do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={executarBackup}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-auto p-4 flex-col"
              >
                <Download className="h-6 w-6 mb-2" />
                <span className="font-semibold">Fazer Backup</span>
                <span className="text-xs opacity-80">Criar backup agora</span>
              </Button>

              <Button
                onClick={limparCache}
                variant="outline"
                className="border-slate-300 hover:bg-slate-50 h-auto p-4 flex-col"
              >
                <Trash2 className="h-6 w-6 mb-2 text-slate-600" />
                <span className="font-semibold text-slate-900">Limpar Cache</span>
                <span className="text-xs text-slate-500">Liberar espaço</span>
              </Button>

              <Button
                onClick={() => {
                  toast({
                    title: "🔄 Sincronizando",
                    description: "Atualizando dados do servidor...",
                  });
                }}
                variant="outline"
                className="border-blue-300 hover:bg-blue-50 h-auto p-4 flex-col"
              >
                <RefreshCw className="h-6 w-6 mb-2 text-blue-600" />
                <span className="font-semibold text-blue-900">Sincronizar</span>
                <span className="text-xs text-blue-600">Atualizar dados</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
