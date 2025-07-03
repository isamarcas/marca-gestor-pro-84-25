import React from 'react';
import { AlertTriangle, Clock, CreditCard, Shield, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusAcesso } from '@/types';
import { useAuth } from '@/hooks/useAuth';

interface VerificacaoAcessoProps {
  statusAcesso: StatusAcesso;
  onRenovar: () => void;
  clienteNome: string;
}

export function VerificacaoAcesso({ statusAcesso, onRenovar, clienteNome }: VerificacaoAcessoProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log('🚪 [VerificacaoAcesso] Executando logout...');
    logout();
    
    // Forçar redirecionamento para a página de auth após logout
    setTimeout(() => {
      window.location.href = '/auth';
    }, 100);
  };

  if (statusAcesso.permitido) {
    return null; // Não mostrar nada se o acesso está permitido
  }

  const getStatusColor = () => {
    switch (statusAcesso.licencaStatus) {
      case 'vencida':
        return 'bg-red-500';
      case 'pendente':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (statusAcesso.licencaStatus) {
      case 'vencida':
        return 'Licença Vencida';
      case 'pendente':
        return 'Licença Pendente';
      default:
        return 'Sem Licença';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Botão de Logout no canto superior direito */}
      <div className="absolute top-4 right-4 z-10">
        <Button 
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="bg-white/90 hover:bg-white border-gray-300 text-gray-700 hover:text-gray-900 shadow-lg"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>

      <Card className="w-full max-w-2xl shadow-2xl border-0">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                <AlertTriangle className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Shield className="h-4 w-4 text-red-500" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            Acesso Bloqueado
          </CardTitle>
          <Badge className={`${getStatusColor()} text-white px-4 py-2 text-sm font-semibold`}>
            {getStatusText()}
          </Badge>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-gray-800 font-medium mb-2">
              Olá, {clienteNome}!
            </p>
            <p className="text-red-700 font-semibold text-lg">
              {statusAcesso.motivoBloqueio}
            </p>
          </div>

          {statusAcesso.dataVencimento && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Data de Vencimento</span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {new Date(statusAcesso.dataVencimento).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Para continuar usando o sistema:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span>Renovação rápida e segura</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span>Acesso imediato após pagamento</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span>Suporte técnico especializado</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span>Histórico de dados preservado</span>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <Button 
              onClick={onRenovar}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
              size="lg"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Renovar Licença Agora
            </Button>

            <div className="text-xs text-gray-500 space-y-1">
              <p>Precisa de ajuda? Entre em contato conosco:</p>
              <p className="font-semibold">suporte@sistema-marcas.com.br</p>
              <p>Telefone: (11) 9999-9999</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
