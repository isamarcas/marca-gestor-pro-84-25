
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { SegurancaConfig } from './types';

interface StatusCardProps {
  config: SegurancaConfig;
  onConfigChange: (updates: Partial<SegurancaConfig>) => void;
}

export function StatusCard({ config, onConfigChange }: StatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className={`${
        config.enableBruteForceProtection 
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
          : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'
      } shadow-xl`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                config.enableBruteForceProtection 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                  : 'bg-gradient-to-br from-red-500 to-pink-500'
              } shadow-2xl`}>
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Proteção Anti-Força Bruta
                </h3>
                <p className="text-slate-600 font-medium">
                  Status: {config.enableBruteForceProtection ? 'Ativo' : 'Inativo'}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {config.enableBruteForceProtection ? (
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Protegido
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 border-red-200">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Vulnerável
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Switch
              checked={config.enableBruteForceProtection}
              onCheckedChange={(checked) => 
                onConfigChange({ enableBruteForceProtection: checked })
              }
              className="scale-125"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
