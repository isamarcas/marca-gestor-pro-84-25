
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Server, Eye, EyeOff } from 'lucide-react';
import { SegurancaConfig } from './types';

interface AdvancedProtectionsProps {
  config: SegurancaConfig;
  onConfigChange: (updates: Partial<SegurancaConfig>) => void;
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
}

export function AdvancedProtections({ 
  config, 
  onConfigChange, 
  showAdvanced, 
  onToggleAdvanced 
}: AdvancedProtectionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Server className="h-6 w-6 text-slate-600" />
              Proteções Avançadas
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleAdvanced}
              className="flex items-center gap-2"
            >
              {showAdvanced ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showAdvanced ? 'Ocultar' : 'Mostrar'}
            </Button>
          </CardTitle>
        </CardHeader>
        {showAdvanced && (
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-semibold text-slate-700">
                      Logs de Segurança
                    </Label>
                    <p className="text-xs text-slate-500">
                      Registra todas as atividades suspeitas
                    </p>
                  </div>
                  <Switch
                    checked={config.enableSecurityLogs}
                    onCheckedChange={(checked) => 
                      onConfigChange({ enableSecurityLogs: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-semibold text-slate-700">
                      Alertas de Atividade Suspeita
                    </Label>
                    <p className="text-xs text-slate-500">
                      Notifica sobre tentativas de acesso suspeitas
                    </p>
                  </div>
                  <Switch
                    checked={config.alertOnSuspiciousActivity}
                    onCheckedChange={(checked) => 
                      onConfigChange({ alertOnSuspiciousActivity: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-semibold text-slate-700">
                      Ocultar Versão do Sistema
                    </Label>
                    <p className="text-xs text-slate-500">
                      Remove informações de versão dos headers
                    </p>
                  </div>
                  <Switch
                    checked={config.hideWpVersion}
                    onCheckedChange={(checked) => 
                      onConfigChange({ hideWpVersion: checked })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-semibold text-slate-700">
                      Content Security Policy (CSP)
                    </Label>
                    <p className="text-xs text-slate-500">
                      Previne ataques XSS e injeção de código
                    </p>
                  </div>
                  <Switch
                    checked={config.enableCSP}
                    onCheckedChange={(checked) => 
                      onConfigChange({ enableCSP: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-semibold text-slate-700">
                      HTTP Strict Transport Security (HSTS)
                    </Label>
                    <p className="text-xs text-slate-500">
                      Força conexões HTTPS seguras
                    </p>
                  </div>
                  <Switch
                    checked={config.enableHSTS}
                    onCheckedChange={(checked) => 
                      onConfigChange({ enableHSTS: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-semibold text-slate-700">
                      X-Frame-Options
                    </Label>
                    <p className="text-xs text-slate-500">
                      Previne ataques de clickjacking
                    </p>
                  </div>
                  <Switch
                    checked={config.enableXFrameOptions}
                    onCheckedChange={(checked) => 
                      onConfigChange({ enableXFrameOptions: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-semibold text-slate-700">
                      Navegação de Diretório
                    </Label>
                    <p className="text-xs text-slate-500">
                      Impede listagem de arquivos em diretórios
                    </p>
                  </div>
                  <Switch
                    checked={config.disableDirectoryBrowsing}
                    onCheckedChange={(checked) => 
                      onConfigChange({ disableDirectoryBrowsing: checked })
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}
