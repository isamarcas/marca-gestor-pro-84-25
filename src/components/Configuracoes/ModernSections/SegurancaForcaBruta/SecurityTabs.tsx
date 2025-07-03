
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Eye } from 'lucide-react';
import { ProtecaoForcaBruta } from './ProtecaoForcaBruta';
import { LogsSeguranca } from './LogsSeguranca';
import { SegurancaConfig } from './types';

interface SecurityTabsProps {
  config: SegurancaConfig;
  onConfigChange: (config: SegurancaConfig) => void;
}

export function SecurityTabs({ config, onConfigChange }: SecurityTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
        <CardContent className="p-6">
          <Tabs defaultValue="protecao" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="protecao" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configurações
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Logs de Segurança
              </TabsTrigger>
            </TabsList>

            <TabsContent value="protecao">
              <ProtecaoForcaBruta 
                config={config} 
                onConfigChange={onConfigChange}
              />
            </TabsContent>

            <TabsContent value="logs">
              <LogsSeguranca />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
