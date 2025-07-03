
import { 
  FileText, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Zap,
  Award,
  Target,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { RecentActivity } from '@/components/Dashboard/RecentActivity';
import { AlertsPanel } from '@/components/Dashboard/AlertsPanel';
import { useClientes } from '@/hooks/useClientes';
import { useMarcas } from '@/hooks/useMarcas';
import { useAlertas } from '@/hooks/useAlertas';
import { useAlertasAutomaticos } from '@/hooks/useAlertasAutomaticos';

export default function Dashboard() {
  const { clientes } = useClientes();
  const { marcas } = useMarcas();
  const { alertas } = useAlertas();
  
  // Ativar sistema de alertas automáticos
  useAlertasAutomaticos();

  // Calcular estatísticas reais
  const totalMarcas = marcas.length;
  const clientesAtivos = clientes.filter(c => c.marcasAtivas && c.marcasAtivas > 0).length;
  const marcasDeferidas = marcas.filter(m => m.status === 'deferido').length;
  const alertasPendentes = alertas.filter(a => a.status === 'ativo').length;
  const taxaSucesso = totalMarcas > 0 ? Math.round((marcasDeferidas / totalMarcas) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60">
      {/* Hero Section com animações melhoradas */}
      <div className="relative overflow-hidden">
        {/* Background animado mais sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/3 to-cyan-600/5"></div>
        
        {/* Efeitos de fundo mais refinados */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl transform -translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/10 to-indigo-400/10 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative p-4 sm:p-6 md:p-8 pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Header melhorado com melhor tipografia */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                <span className="hidden sm:inline">Sistema Premium de Gestão de Marcas</span>
                <span className="sm:hidden">Sistema Premium</span>
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight tracking-tight">
                Dashboard Elite
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium px-4">
                Controle total do seu portfólio de marcas com{' '}
                <span className="text-blue-600 font-bold">inteligência avançada</span> e{' '}
                <span className="text-purple-600 font-bold">alertas automáticos</span>
              </p>
              
              {/* Indicadores de performance */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 px-4">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl shadow-lg">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  <span className="text-xs sm:text-sm font-bold text-slate-700">+{taxaSucesso}% Taxa de Sucesso</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl shadow-lg">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  <span className="text-xs sm:text-sm font-bold text-slate-700">{totalMarcas} Marcas Ativas</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl shadow-lg">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                  <span className="text-xs sm:text-sm font-bold text-slate-700">{alertasPendentes} Alertas Ativos</span>
                </div>
              </div>
            </div>

            {/* Grid de Stats melhorado com animações */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 px-4 sm:px-0">
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <StatsCard
                    title="Total de Marcas"
                    value={totalMarcas}
                    icon={FileText}
                    color="blue"
                    trend={{ value: 12, isPositive: true }}
                  />
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <StatsCard
                    title="Clientes Ativos"
                    value={clientesAtivos}
                    icon={Users}
                    color="green"
                    trend={{ value: 8, isPositive: true }}
                  />
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <StatsCard
                    title="Marcas Deferidas"
                    value={marcasDeferidas}
                    icon={CheckCircle}
                    color="green"
                  />
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <StatsCard
                    title="Alertas Pendentes"
                    value={alertasPendentes}
                    icon={AlertTriangle}
                    color="red"
                  />
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <StatsCard
                    title="Taxa de Sucesso"
                    value={`${taxaSucesso}%`}
                    icon={TrendingUp}
                    color="purple"
                    trend={{ value: 2, isPositive: true }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider melhorado */}
        <div className="relative">
          <svg 
            className="w-full h-32 transform scale-105" 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
              </linearGradient>
            </defs>
            <path 
              d="M0 120L48 105C96 90 192 60 288 52.5C384 45 480 60 576 67.5C672 75 768 75 864 82.5C960 90 1056 105 1152 105C1248 105 1344 90 1392 82.5L1440 75V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" 
              fill="url(#waveGradient)"
            />
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-12">
          {/* Excellence Badge com animação */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <div className="group flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-white via-white to-white backdrop-blur-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/50 hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="relative">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <span className="font-bold text-slate-700 text-sm sm:text-base md:text-lg">Sistema Inteligente de Alertas</span>
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 animate-pulse" />
            </div>
          </div>

          {/* Content Grid com espaçamento melhorado */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="relative transform group-hover:-translate-y-2 transition-all duration-500">
                  <RecentActivity />
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="relative transform group-hover:-translate-y-2 transition-all duration-500">
                  <AlertsPanel />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Spacing com gradiente sutil */}
          <div className="h-16 sm:h-24 bg-gradient-to-b from-transparent to-slate-50/50"></div>
        </div>
      </div>
    </div>
  );
}
