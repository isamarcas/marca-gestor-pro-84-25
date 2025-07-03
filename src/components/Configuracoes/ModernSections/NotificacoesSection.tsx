
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Clock, 
  AlertTriangle,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  Settings,
  Check
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'email' | 'push' | 'sms' | 'desktop';
  enabled: boolean;
  critical?: boolean;
}

export function NotificacoesSection() {
  const { toast } = useToast();
  
  const [notificacoes, setNotificacoes] = useState<NotificationSetting[]>([]);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [doNotDisturb, setDoNotDisturb] = useState(false);

  const toggleNotificacao = (id: string) => {
    setNotificacoes(prev => prev.map(notif => 
      notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
    ));

    const notificacao = notificacoes.find(n => n.id === id);
    if (notificacao) {
      toast({
        title: `🔔 ${notificacao.title}`,
        description: `${!notificacao.enabled ? 'Ativada' : 'Desativada'} com sucesso!`,
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'email': return Mail;
      case 'push': return Bell;
      case 'sms': return MessageSquare;
      case 'desktop': return Monitor;
      default: return Bell;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'email': return 'from-blue-500 to-cyan-500';
      case 'push': return 'from-green-500 to-emerald-500';
      case 'sms': return 'from-purple-500 to-violet-500';
      case 'desktop': return 'from-orange-500 to-yellow-500';
      default: return 'from-slate-500 to-gray-500';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'email': return { text: 'EMAIL', color: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'push': return { text: 'PUSH', color: 'bg-green-100 text-green-700 border-green-200' };
      case 'sms': return { text: 'SMS', color: 'bg-purple-100 text-purple-700 border-purple-200' };
      case 'desktop': return { text: 'DESKTOP', color: 'bg-orange-100 text-orange-700 border-orange-200' };
      default: return { text: 'GERAL', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const enabledCount = notificacoes.filter(n => n.enabled).length;
  const criticalCount = notificacoes.filter(n => n.enabled && n.critical).length;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Geral */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{enabledCount}</p>
                  <p className="text-sm text-slate-600 font-medium">Notificações Ativas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Alertas Críticos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{criticalCount}</p>
                  <p className="text-sm text-slate-600 font-medium">Alertas Críticos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Controles Rápidos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {soundEnabled ? (
                      <Volume2 className="h-5 w-5 text-purple-600" />
                    ) : (
                      <VolumeX className="h-5 w-5 text-slate-400" />
                    )}
                    <span className="text-sm font-semibold">Sons</span>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-semibold">Não Perturbar</span>
                  </div>
                  <Switch
                    checked={doNotDisturb}
                    onCheckedChange={setDoNotDisturb}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Lista de Notificações */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-blue-600" />
              Configurações de Notificação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notificacoes.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Nenhuma configuração de notificação definida</p>
              </div>
            ) : (
              notificacoes.map((notificacao, index) => {
                const Icon = notificacao.icon;
                const CategoryIcon = getCategoryIcon(notificacao.category);
                const badge = getCategoryBadge(notificacao.category);
                
                return (
                  <motion.div
                    key={notificacao.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className={`p-4 rounded-2xl border transition-all ${
                      notificacao.enabled 
                        ? 'bg-gradient-to-r from-white to-blue-50/30 border-blue-200/60 shadow-md' 
                        : 'bg-slate-50/50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            notificacao.enabled 
                              ? `bg-gradient-to-br ${getCategoryColor(notificacao.category)} text-white shadow-lg` 
                              : 'bg-slate-200 text-slate-400'
                          }`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className={`font-bold ${notificacao.enabled ? 'text-slate-900' : 'text-slate-500'}`}>
                                {notificacao.title}
                              </h4>
                              <Badge className={`text-xs font-semibold ${badge.color}`}>
                                {badge.text}
                              </Badge>
                              {notificacao.critical && (
                                <Badge variant="destructive" className="text-xs">
                                  CRÍTICO
                                </Badge>
                              )}
                            </div>
                            <p className={`text-sm ${notificacao.enabled ? 'text-slate-600' : 'text-slate-400'}`}>
                              {notificacao.description}
                            </p>
                          </div>
                        </div>

                        <motion.div
                          whileTap={{ scale: 0.95 }}
                        >
                          <Switch
                            checked={notificacao.enabled}
                            onCheckedChange={() => toggleNotificacao(notificacao.id)}
                            className="data-[state=checked]:bg-blue-500"
                          />
                        </motion.div>
                      </div>
                    </div>
                    
                    {index < notificacoes.length - 1 && (
                      <Separator className="my-4 bg-slate-200/60" />
                    )}
                  </motion.div>
                );
              })
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Botões de Ação */}
      {notificacoes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <Button 
            onClick={() => {
              setNotificacoes(prev => prev.map(n => ({ ...n, enabled: true })));
              toast({
                title: "✅ Todas Ativadas",
                description: "Todas as notificações foram habilitadas!",
              });
            }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
          >
            <Check className="h-4 w-4 mr-2" />
            Ativar Todas
          </Button>
          
          <Button 
            onClick={() => {
              setNotificacoes(prev => prev.map(n => ({ ...n, enabled: false })));
              toast({
                title: "🔇 Todas Desativadas",
                description: "Todas as notificações foram desabilitadas!",
              });
            }}
            variant="outline"
            className="border-slate-300"
          >
            <VolumeX className="h-4 w-4 mr-2" />
            Desativar Todas
          </Button>
        </motion.div>
      )}
    </div>
  );
}
