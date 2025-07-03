
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from 'lucide-react';
import { SegurancaConfig } from './types';

interface URLMaskingConfigProps {
  config: SegurancaConfig;
  onConfigChange: (updates: Partial<SegurancaConfig>) => void;
}

export function URLMaskingConfig({ config, onConfigChange }: URLMaskingConfigProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Eye className="h-6 w-6 text-purple-600" />
            Mascaramento de URLs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Admin URL */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-semibold text-slate-700">
                  Ocultar URL do Admin
                </Label>
                <p className="text-xs text-slate-500">
                  Muda a URL padrão /admin para um caminho personalizado
                </p>
              </div>
              <Switch
                checked={config.hideAdminUrl}
                onCheckedChange={(checked) => 
                  onConfigChange({ hideAdminUrl: checked })
                }
              />
            </div>

            {config.hideAdminUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <Label htmlFor="admin-path" className="text-sm font-semibold text-slate-700">
                  Caminho Personalizado do Admin
                </Label>
                <Input
                  id="admin-path"
                  value={config.customAdminPath}
                  onChange={(e) => 
                    onConfigChange({ customAdminPath: e.target.value })
                  }
                  placeholder="painel-secreto"
                  className="border-purple-300 focus:border-purple-500"
                />
                <p className="text-xs text-slate-500">
                  Nova URL será: /configuracoes/{config.customAdminPath || 'painel-secreto'}
                </p>
              </motion.div>
            )}
          </div>

          {/* Login URL */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-semibold text-slate-700">
                  Ocultar URL de Login
                </Label>
                <p className="text-xs text-slate-500">
                  Muda a URL padrão /login para um caminho personalizado
                </p>
              </div>
              <Switch
                checked={config.hideLoginUrl}
                onCheckedChange={(checked) => 
                  onConfigChange({ hideLoginUrl: checked })
                }
              />
            </div>

            {config.hideLoginUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <Label htmlFor="login-path" className="text-sm font-semibold text-slate-700">
                  Caminho Personalizado do Login
                </Label>
                <Input
                  id="login-path"
                  value={config.customLoginPath}
                  onChange={(e) => 
                    onConfigChange({ customLoginPath: e.target.value })
                  }
                  placeholder="acesso-sistema"
                  className="border-purple-300 focus:border-purple-500"
                />
                <p className="text-xs text-slate-500">
                  Nova URL será: /{config.customLoginPath || 'acesso-sistema'}
                </p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
