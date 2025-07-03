
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, AlertTriangle, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { SegurancaConfig } from './types';
import { clearLoginAttempts, getLoginStatus } from '@/hooks/useLocalAuth/bruteForceProtection';

interface LoginProtectionConfigProps {
  config: SegurancaConfig;
  onConfigChange: (updates: Partial<SegurancaConfig>) => void;
}

export function LoginProtectionConfig({ config, onConfigChange }: LoginProtectionConfigProps) {
  const { toast } = useToast();

  const handleClearAttempts = () => {
    // Limpar tentativas para emails comuns de teste
    const testEmails = ['admin@gmail.com', 'test@test.com', 'admin@admin.com', 'user@test.com'];
    
    testEmails.forEach(email => {
      clearLoginAttempts(email);
    });

    toast({
      title: "🧹 Tentativas Limpas",
      description: "Todas as tentativas de login foram resetadas para teste.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Lock className="h-6 w-6 text-red-600" />
            Proteção de Login
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max-attempts" className="text-sm font-semibold text-slate-700">
                Máximo de Tentativas
              </Label>
              <Input
                id="max-attempts"
                type="number"
                min="1"
                max="20"
                value={config.maxLoginAttempts}
                onChange={(e) => 
                  onConfigChange({ maxLoginAttempts: parseInt(e.target.value) || 5 })
                }
                className="border-red-300 focus:border-red-500"
              />
              <p className="text-xs text-slate-500">
                Número máximo de tentativas de login antes do bloqueio
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lockout-duration" className="text-sm font-semibold text-slate-700">
                Duração do Bloqueio (minutos)
              </Label>
              <Input
                id="lockout-duration"
                type="number"
                min="1"
                max="1440"
                value={config.lockoutDuration}
                onChange={(e) => 
                  onConfigChange({ lockoutDuration: parseInt(e.target.value) || 15 })
                }
                className="border-red-300 focus:border-red-500"
              />
              <p className="text-xs text-slate-500">
                Tempo que o usuário ficará bloqueado após exceder tentativas
              </p>
            </div>
          </div>

          {/* Área de Teste e Debugging */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Ferramentas de Teste
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-blue-800">
                Use estas ferramentas para testar e debugar o sistema de proteção:
              </p>
              <Button
                onClick={handleClearAttempts}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                size="sm"
              >
                <RefreshCw className="h-3 w-3 mr-2" />
                Limpar Tentativas de Login
              </Button>
              <p className="text-xs text-blue-600">
                Remove todos os bloqueios e contadores de tentativas para permitir novos testes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
            <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0" />
            <div className="text-sm text-orange-800">
              <strong>Recomendação:</strong> Use no máximo 5 tentativas com bloqueio de 15-30 minutos 
              para balancear segurança e experiência do usuário.
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
