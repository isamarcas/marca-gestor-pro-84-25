
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { SegurancaConfig } from './types';

interface IPFiltersConfigProps {
  config: SegurancaConfig;
  onConfigChange: (updates: Partial<SegurancaConfig>) => void;
}

export function IPFiltersConfig({ config, onConfigChange }: IPFiltersConfigProps) {
  const { toast } = useToast();
  const [newWhitelistIP, setNewWhitelistIP] = useState('');
  const [newBlacklistIP, setNewBlacklistIP] = useState('');

  const addWhitelistIP = () => {
    if (!newWhitelistIP.trim()) return;
    
    // Validar formato de IP
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(newWhitelistIP.trim())) {
      toast({
        title: "⚠️ IP Inválido",
        description: "Por favor, insira um endereço IP válido.",
        variant: "destructive"
      });
      return;
    }

    const updatedWhitelist = [...config.whitelistIPs, newWhitelistIP.trim()];
    onConfigChange({ whitelistIPs: updatedWhitelist });
    setNewWhitelistIP('');
    
    toast({
      title: "✅ IP Adicionado",
      description: `IP ${newWhitelistIP.trim()} adicionado à lista de IPs permitidos.`,
    });
  };

  const removeWhitelistIP = (ip: string) => {
    const updatedWhitelist = config.whitelistIPs.filter(item => item !== ip);
    onConfigChange({ whitelistIPs: updatedWhitelist });
    
    toast({
      title: "🗑️ IP Removido",
      description: `IP ${ip} removido da lista de IPs permitidos.`,
    });
  };

  const addBlacklistIP = () => {
    if (!newBlacklistIP.trim()) return;
    
    // Validar formato de IP
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(newBlacklistIP.trim())) {
      toast({
        title: "⚠️ IP Inválido",
        description: "Por favor, insira um endereço IP válido.",
        variant: "destructive"
      });
      return;
    }

    const updatedBlacklist = [...config.blacklistIPs, newBlacklistIP.trim()];
    onConfigChange({ blacklistIPs: updatedBlacklist });
    setNewBlacklistIP('');
    
    toast({
      title: "🚫 IP Bloqueado",
      description: `IP ${newBlacklistIP.trim()} adicionado à lista de IPs bloqueados.`,
    });
  };

  const removeBlacklistIP = (ip: string) => {
    const updatedBlacklist = config.blacklistIPs.filter(item => item !== ip);
    onConfigChange({ blacklistIPs: updatedBlacklist });
    
    toast({
      title: "🗑️ IP Removido",
      description: `IP ${ip} removido da lista de IPs bloqueados.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-blue-600" />
            Filtros de IP
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Whitelist IPs */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-slate-700">
              IPs Permitidos (Whitelist)
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="192.168.1.100"
                value={newWhitelistIP}
                onChange={(e) => setNewWhitelistIP(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addWhitelistIP} variant="outline">
                Adicionar
              </Button>
            </div>
            {config.whitelistIPs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {config.whitelistIPs.map((ip, index) => (
                  <Badge 
                    key={index} 
                    className="bg-green-100 text-green-700 border-green-200 cursor-pointer"
                    onClick={() => removeWhitelistIP(ip)}
                  >
                    {ip} ✕
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Blacklist IPs */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-slate-700">
              IPs Bloqueados (Blacklist)
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="203.0.113.42"
                value={newBlacklistIP}
                onChange={(e) => setNewBlacklistIP(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addBlacklistIP} variant="outline">
                Bloquear
              </Button>
            </div>
            {config.blacklistIPs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {config.blacklistIPs.map((ip, index) => (
                  <Badge 
                    key={index} 
                    className="bg-red-100 text-red-700 border-red-200 cursor-pointer"
                    onClick={() => removeBlacklistIP(ip)}
                  >
                    {ip} ✕
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Geo Blocking */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-semibold text-slate-700">
                Bloqueio Geográfico
              </Label>
              <p className="text-xs text-slate-500">
                Bloquear acesso de países específicos
              </p>
            </div>
            <Switch
              checked={config.enableGeoBlocking}
              onCheckedChange={(checked) => 
                onConfigChange({ enableGeoBlocking: checked })
              }
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
