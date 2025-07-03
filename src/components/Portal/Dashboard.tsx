
import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Award, Globe } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useParams } from 'react-router-dom';
import { WelcomeSection } from './WelcomeSection';
import { CriticalDeadlines } from './CriticalDeadlines';
import { CompactStatsCards } from './CompactStatsCards';
import { StatusBadges } from './StatusBadges';
import { RecentActivitiesSection } from './RecentActivitiesSection';
import { ProcessProgressCard } from './ProcessProgressCard';
import { StatusLicenca } from './StatusLicenca';
import { AlertasLicenca } from './AlertasLicenca';
import { Licenca, AlertaLicenca } from '@/types';

interface DashboardProps {
  stats: {
    totalMarcas: number;
    emAnalise: number;
    deferidas: number;
    alertas: number;
  };
  prazosProximos: Array<{
    id: string;
    marca: string;
    prazo: Date;
    tipo: string;
    urgencia: 'alta' | 'media' | 'baixa';
  }>;
  atividadesRecentes: Array<{
    id: string;
    tipo: 'status' | 'documento' | 'comunicacao';
    titulo: string;
    descricao: string;
    data: Date;
    marca?: string;
  }>;
  // Novos props para licenciamento
  licencaCliente?: Licenca;
  alertasLicenca?: AlertaLicenca[];
  onRenovarLicenca?: () => void;
  onMarcarAlertaComoLido?: (alertaId: string) => void;
}

export function Dashboard({ 
  stats, 
  prazosProximos, 
  atividadesRecentes,
  licencaCliente,
  alertasLicenca = [],
  onRenovarLicenca = () => {},
  onMarcarAlertaComoLido = () => {}
}: DashboardProps) {
  const { clienteId } = useParams<{ clienteId: string }>();
  const [statsPersonalizadas, setStatsPersonalizadas] = useState(stats);

  // Carregar estatísticas personalizadas do localStorage
  useEffect(() => {
    if (clienteId) {
      try {
        const statsData = localStorage.getItem(`stats_${clienteId}`);
        if (statsData) {
          const customStats = JSON.parse(statsData);
          setStatsPersonalizadas(customStats);
        } else {
          setStatsPersonalizadas(stats);
        }
      } catch (error) {
        setStatsPersonalizadas(stats);
      }
    }
  }, [clienteId, stats]);

  // Calculate success rate based on personalized stats
  const taxaSucesso = statsPersonalizadas.totalMarcas > 0 ? Math.round((statsPersonalizadas.deferidas / statsPersonalizadas.totalMarcas) * 100) : 0;

  // Verificar se há uma licença ativa
  const temLicencaAtiva = licencaCliente?.status === 'ativa';
  
  // Criar um statusAcesso mock para o StatusLicenca
  const statusAcessoMock = {
    permitido: temLicencaAtiva,
    licencaStatus: licencaCliente?.status || 'pendente' as const,
    dataVencimento: licencaCliente?.dataVencimento,
    diasRestantes: licencaCliente ? Math.ceil((new Date(licencaCliente.dataVencimento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Welcome Section Premium */}
        <WelcomeSection taxaSucesso={taxaSucesso} />

        {/* Status da Licença - Seção prioritária */}
        <StatusLicenca 
          licenca={licencaCliente}
          statusAcesso={statusAcessoMock}
          onRenovar={onRenovarLicenca}
        />

        {/* Alertas de Licença - Integrado aos Prazos Críticos */}
        {alertasLicenca.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Alertas de Licenciamento</h3>
            <AlertasLicenca 
              alertas={alertasLicenca}
              onRenovar={onRenovarLicenca}
              onMarcarComoLido={onMarcarAlertaComoLido}
            />
          </div>
        )}

        {/* Compact Stats Cards - Moved here and made more compact */}
        <CompactStatsCards 
          statsPersonalizadas={statsPersonalizadas} 
          taxaSucesso={taxaSucesso} 
        />

        {/* Status Badges Section */}
        <StatusBadges statsPersonalizadas={statsPersonalizadas} />

        {/* Process Progress Card - New feature */}
        {clienteId && <ProcessProgressCard clienteId={clienteId} />}

        {/* Prazos Críticos */}
        <CriticalDeadlines prazosProximos={prazosProximos} />

        {/* Atividades Recentes */}
        <RecentActivitiesSection atividadesRecentes={atividadesRecentes} />

        {/* Modern Footer */}
        <div className="relative mt-12 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-8 text-white overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-indigo-400/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left side - Security info */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/20">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-400" />
                        <span className="text-sm font-semibold">Dados Protegidos LGPD</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Seus dados estão seguros e protegidos conforme Lei Geral de Proteção de Dados</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/20">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-semibold">SSL Criptografado</span>
                </div>
              </div>

              {/* Right side - Premium badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-xl px-4 py-3 rounded-2xl border border-yellow-400/30">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-300">Portal Premium</span>
                  <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Bottom text */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-blue-100">
                <p className="font-medium">
                  © 2024 Sistema de Gestão de Marcas Premium - Tecnologia de ponta para proteção intelectual
                </p>
                <div className="flex items-center gap-4">
                  <span className="opacity-70">Versão 2.0</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 font-semibold">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
