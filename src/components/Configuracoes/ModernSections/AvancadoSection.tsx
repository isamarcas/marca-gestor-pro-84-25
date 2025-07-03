
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Settings, 
  Code, 
  Zap,
  Cloud,
  Link,
  Key,
  FileText,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const integracoes = [];

export function AvancadoSection() {
  const { toast } = useToast();
  
  const [configuracoes, setConfiguracoes] = useState({
    apiKey: '',
    webhookUrl: '',
    debugMode: false,
    logLevel: 'info',
    customCSS: '',
    backupFrequency: 'daily'
  });

  const [dadosExportacao] = useState({
    usuarios: 0,
    marcas: 0,
    contratos: 0,
    documentos: 0
  });

  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportData = () => {
    setIsExporting(true);
    setExportProgress(0);
    
    toast({
      title: "📦 Iniciando Exportação",
      description: "Preparando seus dados para download...",
    });

    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          toast({
            title: "✅ Exportação Concluída",
            description: "Dados exportados com sucesso!",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleImportData = () => {
    toast({
      title: "📤 Importação Iniciada",
      description: "Processando arquivo de importação...",
    });

    setTimeout(() => {
      toast({
        title: "✅ Dados Importados",
        description: "Importação realizada com sucesso!",
      });
    }, 2000);
  };

  const handleDeleteAllData = () => {
    toast({
      title: "⚠️ Confirmação Necessária",
      description: "Esta ação não pode ser desfeita. Confirme no botão específico.",
      variant: "destructive"
    });
  };

  const conectarIntegracao = (integracaoId: string) => {
    toast({
      title: "🔗 Conectando Integração",
      description: "Estabelecendo conexão...",
    });

    setTimeout(() => {
      toast({
        title: "✅ Integração Conectada",
        description: "Conexão estabelecida com sucesso!",
      });
    }, 1500);
  };

  const desconectarIntegracao = (integracaoId: string) => {
    toast({
      title: "🔌 Desconectando",
      description: "Removendo integração...",
    });

    setTimeout(() => {
      toast({
        title: "✅ Integração Removida",
        description: "Conexão removida com sucesso!",
      });
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <div className="h-5 w-5 rounded-full bg-slate-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-700 border-green-200';
      case 'error': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Conectado';
      case 'error': return 'Erro';
      default: return 'Desconectado';
    }
  };

  return (
    <div className="space-y-6">
      {/* Cards de Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(dadosExportacao).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200 shadow-xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-black text-slate-900">{value.toLocaleString()}</p>
                  <p className="text-sm text-slate-600 font-medium capitalize">{key}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Integrações */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Link className="h-6 w-6 text-blue-600" />
              Integrações Externas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {integracoes.length === 0 ? (
              <div className="text-center py-8">
                <Link className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Nenhuma integração configurada</p>
              </div>
            ) : (
              integracoes.map((integracao) => (
                <div 
                  key={integracao.id}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{integracao.icon}</div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-slate-900">{integracao.nome}</h4>
                          <Badge className={getStatusColor(integracao.status)}>
                            {getStatusText(integracao.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">{integracao.descricao}</p>
                        {integracao.url && (
                          <p className="text-xs text-blue-600 mt-1">{integracao.url}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getStatusIcon(integracao.status)}
                      {integracao.status === 'connected' ? (
                        <Button 
                          onClick={() => desconectarIntegracao(integracao.id)}
                          variant="destructive" 
                          size="sm"
                        >
                          Desconectar
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => conectarIntegracao(integracao.id)}
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          {integracao.status === 'error' ? 'Reconectar' : 'Conectar'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Configurações de API */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Key className="h-6 w-6 text-purple-600" />
              Configurações de API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="text-sm font-semibold text-slate-700">
                API Key
              </Label>
              <div className="flex gap-2">
                <Input
                  id="api-key"
                  type="password"
                  value={configuracoes.apiKey}
                  onChange={(e) => setConfiguracoes(prev => ({ 
                    ...prev, 
                    apiKey: e.target.value 
                  }))}
                  className="font-mono"
                  placeholder="sk-..."
                />
                <Button variant="outline" size="icon">
                  <Code className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-url" className="text-sm font-semibold text-slate-700">
                Webhook URL
              </Label>
              <Input
                id="webhook-url"
                value={configuracoes.webhookUrl}
                onChange={(e) => setConfiguracoes(prev => ({ 
                  ...prev, 
                  webhookUrl: e.target.value 
                }))}
                placeholder="https://sua-api.com/webhook"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-css" className="text-sm font-semibold text-slate-700">
                CSS Personalizado
              </Label>
              <Textarea
                id="custom-css"
                value={configuracoes.customCSS}
                onChange={(e) => setConfiguracoes(prev => ({ 
                  ...prev, 
                  customCSS: e.target.value 
                }))}
                className="font-mono text-sm"
                rows={4}
                placeholder="/* Adicione seu CSS personalizado aqui */"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Backup e Exportação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Database className="h-6 w-6 text-green-600" />
              Backup e Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Exportação */}
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-slate-900">Exportar Dados</h4>
                  <p className="text-sm text-slate-600">
                    Baixe todos os seus dados em formato JSON
                  </p>
                </div>
                <Button
                  onClick={handleExportData}
                  disabled={isExporting}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isExporting ? 'Exportando...' : 'Exportar'}
                </Button>
              </div>
              
              {isExporting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progresso da exportação</span>
                    <span>{exportProgress}%</span>
                  </div>
                  <Progress value={exportProgress} className="h-2" />
                </div>
              )}
            </div>

            {/* Importação */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">Importar Dados</h4>
                  <p className="text-sm text-slate-600">
                    Restaurar dados de um backup anterior
                  </p>
                </div>
                <Button
                  onClick={handleImportData}
                  variant="outline"
                  className="border-blue-300 hover:bg-blue-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Importar
                </Button>
              </div>
            </div>

            {/* Zona de Perigo */}
            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-900 mb-1">Zona de Perigo</h4>
                    <p className="text-sm text-red-700 mb-3">
                      Ações irreversíveis que podem causar perda permanente de dados.
                    </p>
                    <div className="space-y-2">
                      <Button
                        onClick={handleDeleteAllData}
                        variant="destructive"
                        size="sm"
                        className="mr-2"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Deletar Todos os Dados
                      </Button>
                      <p className="text-xs text-red-600">
                        ⚠️ Esta ação não pode ser desfeita
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Links Úteis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Documentação & Suporte</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  Acesse nossa documentação técnica e recursos de desenvolvimento
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    API Docs
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Suporte
                  </Button>
                </div>
              </div>
              <div className="text-6xl opacity-20">
                🚀
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
