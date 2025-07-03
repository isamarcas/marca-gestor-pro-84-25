
import React, { useState } from 'react';
import { Shield, User, LogOut, FileText, Settings, Sparkles, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NotificacoesPanel } from '@/components/NotificacoesPanel';
import { MeuPerfil } from './MeuPerfil';
import { MeusDocumentos } from './MeusDocumentos';
import { MinhasConfiguracoes } from './MinhasConfiguracoes';
import { useAuth } from '@/hooks/useAuth';

interface PortalLayoutProps {
  children: React.ReactNode;
  clienteNome: string;
  notificacoesNaoLidas?: number;
}

type PaginaAtual = 'dashboard' | 'perfil' | 'documentos' | 'configuracoes';

export function PortalLayout({ children, clienteNome }: PortalLayoutProps) {
  const [paginaAtual, setPaginaAtual] = useState<PaginaAtual>('dashboard');
  const { user, logout } = useAuth();
  
  const iniciais = clienteNome
    .split(' ')
    .map(nome => nome.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const pathSegments = window.location.pathname.split('/');
  const portalIndex = pathSegments.indexOf('portal');
  const clienteId = portalIndex !== -1 && portalIndex + 1 < pathSegments.length 
    ? pathSegments[portalIndex + 1] 
    : '';

  const handleMenuClick = (pagina: PaginaAtual) => {
    setPaginaAtual(pagina);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/auth';
  };

  const renderConteudo = () => {
    switch (paginaAtual) {
      case 'perfil':
        return <MeuPerfil clienteNome={clienteNome} clienteEmail={user?.email} />;
      case 'documentos':
        return <MeusDocumentos clienteId={clienteId} clienteNome={clienteNome} />;
      case 'configuracoes':
        return <MinhasConfiguracoes />;
      default:
        return children;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Header Premium do Portal */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo Premium */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative cursor-pointer" onClick={() => setPaginaAtual('dashboard')}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-lg sm:text-xl font-black bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent cursor-pointer" onClick={() => setPaginaAtual('dashboard')}>
                    Portal Premium
                  </h1>
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">Gestão Avançada de Marcas INPI</p>
              </div>
            </div>
            
            {/* Ações Premium do usuário */}
            <div className="flex items-center gap-2 sm:gap-4">
              <NotificacoesPanel clienteId={clienteId} />

              {/* Menu Premium do usuário */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 sm:gap-3 hover:bg-blue-50 hover:scale-105 transition-all duration-200 rounded-xl px-2 sm:px-4 py-2 group">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-blue-200 ring-offset-2">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white text-xs sm:text-sm font-bold">
                        {iniciais}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-bold text-slate-900 truncate max-w-32 lg:max-w-none">{clienteNome}</p>
                      <p className="text-xs text-blue-600 font-medium">Cliente Premium</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 sm:w-64 bg-white/95 backdrop-blur-xl border-slate-200 shadow-2xl rounded-2xl z-50 p-2">
                  <div className="p-3 border-b border-slate-100 mb-2">
                    <p className="font-semibold text-slate-900 truncate">{clienteNome}</p>
                    <p className="text-xs text-blue-600 font-medium">Cliente Premium ⭐</p>
                  </div>
                  
                  <DropdownMenuItem 
                    className="rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => handleMenuClick('perfil')}
                  >
                    <User className="mr-3 h-4 w-4 text-blue-600" />
                    <span className="font-medium">Meu Perfil</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    className="rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => handleMenuClick('documentos')}
                  >
                    <FileText className="mr-3 h-4 w-4 text-blue-600" />
                    <span className="font-medium">Meus Documentos</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    className="rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => handleMenuClick('configuracoes')}
                  >
                    <Settings className="mr-3 h-4 w-4 text-blue-600" />
                    <span className="font-medium">Configurações</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="my-2" />
                  
                  <DropdownMenuItem 
                    className="text-red-600 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="font-medium">Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal com fundo premium */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        <div className="relative">
          {/* Efeitos de fundo premium */}
          <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-to-br from-cyan-400/10 to-indigo-400/10 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10">
            {renderConteudo()}
          </div>
        </div>
      </main>
    </div>
  );
}
