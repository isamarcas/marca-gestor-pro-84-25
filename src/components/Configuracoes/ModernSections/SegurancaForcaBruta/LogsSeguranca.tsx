
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, 
  Shield, 
  Eye, 
  Search,
  Calendar,
  MapPin,
  Monitor,
  Trash2,
  Download
} from 'lucide-react';
import { SecurityLog } from './types';

export function LogsSeguranca() {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<SecurityLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  useEffect(() => {
    // Carregar logs do localStorage ou criar logs de exemplo
    const savedLogs = localStorage.getItem('security-logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    } else {
      // Logs de exemplo
      const exampleLogs: SecurityLog[] = [
        {
          id: '1',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min atrás
          type: 'login_attempt',
          ip: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          details: 'Tentativa de login falhada para usuário admin',
          severity: 'medium'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h atrás
          type: 'blocked_ip',
          ip: '203.0.113.42',
          userAgent: 'curl/7.68.0',
          details: 'IP bloqueado após 5 tentativas de login falhadas',
          severity: 'high'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6h atrás
          type: 'suspicious_activity',
          ip: '198.51.100.23',
          userAgent: 'python-requests/2.25.1',
          details: 'Tentativa de acesso a arquivos sensíveis',
          severity: 'critical'
        },
        {
          id: '4',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12h atrás
          type: 'admin_access',
          ip: '192.168.1.50',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          details: 'Acesso bem-sucedido ao painel administrativo',
          severity: 'low'
        }
      ];
      setLogs(exampleLogs);
      localStorage.setItem('security-logs', JSON.stringify(exampleLogs));
    }
  }, []);

  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.ip.includes(searchTerm) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userAgent.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(log => log.severity === selectedSeverity);
    }

    setFilteredLogs(filtered.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  }, [logs, searchTerm, selectedSeverity]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'login_attempt': return Shield;
      case 'blocked_ip': return AlertTriangle;
      case 'suspicious_activity': return Eye;
      case 'admin_access': return Monitor;
      default: return AlertTriangle;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'login_attempt': return 'Tentativa de Login';
      case 'blocked_ip': return 'IP Bloqueado';
      case 'suspicious_activity': return 'Atividade Suspeita';
      case 'admin_access': return 'Acesso Admin';
      default: return type;
    }
  };

  const clearLogs = () => {
    setLogs([]);
    localStorage.removeItem('security-logs');
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `security-logs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header com Filtros */}
      <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-blue-600" />
              Logs de Segurança
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                onClick={exportLogs}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Exportar
              </Button>
              <Button
                onClick={clearLogs}
                variant="destructive"
                size="sm"
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Limpar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar por IP, detalhes ou user agent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md bg-white text-sm"
            >
              <option value="all">Todas as Severidades</option>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
              <option value="critical">Crítica</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Logs */}
      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
            <CardContent className="p-8 text-center">
              <Eye className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Nenhum log encontrado
              </h3>
              <p className="text-slate-500">
                {searchTerm || selectedSeverity !== 'all' 
                  ? 'Tente ajustar os filtros de busca'
                  : 'Os logs de segurança aparecerão aqui'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredLogs.map((log, index) => {
            const TypeIcon = getTypeIcon(log.type);
            
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl hover:shadow-2xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        log.severity === 'critical' ? 'bg-red-500' :
                        log.severity === 'high' ? 'bg-orange-500' :
                        log.severity === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      } text-white shadow-lg`}>
                        <TypeIcon className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-slate-900">
                            {getTypeLabel(log.type)}
                          </h4>
                          <Badge className={getSeverityColor(log.severity)}>
                            {log.severity.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="text-slate-700 mb-3">
                          {log.details}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {log.timestamp.toLocaleString('pt-BR')}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {log.ip}
                          </div>
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            <span className="truncate">
                              {log.userAgent.split(' ')[0]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
