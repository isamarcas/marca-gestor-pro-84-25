
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useClienteData } from '@/hooks/useClienteData';
import { useLicencas } from '@/hooks/useLicencas';
import { PortalLayout } from '@/components/Portal/PortalLayout';
import { Dashboard } from '@/components/Portal/Dashboard';
import { VerificacaoAcesso } from '@/components/Licencas/VerificacaoAcesso';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function PortalCliente() {
  const { clienteId } = useParams<{ clienteId: string }>();
  const { toast } = useToast();
  
  console.log('🔍 PortalCliente: URL completa:', window.location.href);
  console.log('🔍 PortalCliente: Pathname:', window.location.pathname);
  console.log('🔍 PortalCliente: clienteId dos parâmetros:', clienteId);
  
  if (!clienteId) {
    console.log('❌ PortalCliente: clienteId não encontrado, redirecionando para koala');
    return <Navigate to="/portal/koala" replace />;
  }

  const { cliente, marcas, stats, isLoading, error } = useClienteData(clienteId);
  const { 
    verificarStatusAcesso, 
    getLicencaCliente, 
    getAlertasCliente, 
    marcarAlertaComoLido,
    verificarAlertasAutomaticos,
    licencas
  } = useLicencas();

  console.log('🔍 PortalCliente: Dados recebidos do useClienteData:', {
    cliente: cliente ? { id: cliente.id, nome: cliente.nome } : null,
    isLoading,
    error,
    marcasCount: marcas.length
  });

  // Verificar status de acesso
  const statusAcesso = verificarStatusAcesso(clienteId);
  const licencaCliente = getLicencaCliente(clienteId);
  const alertasLicenca = getAlertasCliente(clienteId);

  console.log('PortalCliente: Status de acesso:', statusAcesso);
  console.log('PortalCliente: Licença do cliente:', licencaCliente);

  // Verificar alertas automaticamente
  React.useEffect(() => {
    if (licencas.length > 0) {
      verificarAlertasAutomaticos();
    }
  }, [licencas, verificarAlertasAutomaticos]);

  const handleRenovarLicenca = () => {
    toast({
      title: "Redirecionando para renovação",
      description: "Você será redirecionado para a página de pagamento.",
    });
    // Aqui você integraria com seu sistema de pagamento
    console.log('Iniciando processo de renovação de licença para cliente:', clienteId);
  };

  // Carregar prazos críticos reais do localStorage
  const getPrazosCliente = () => {
    try {
      const prazosData = localStorage.getItem(`prazos_${clienteId}`);
      console.log('PortalCliente: Prazos do localStorage para', clienteId, ':', prazosData);
      
      if (!prazosData) return [];
      
      const prazos = JSON.parse(prazosData);
      console.log('PortalCliente: Prazos parseados:', prazos);
      
      return prazos;
    } catch (error) {
      console.error('Erro ao carregar prazos:', error);
      return [];
    }
  };

  // Carregar atividades reais do localStorage
  const getAtividadesCliente = () => {
    try {
      const atividadesData = localStorage.getItem(`atividades_${clienteId}`);
      console.log('PortalCliente: Atividades do localStorage para', clienteId, ':', atividadesData);
      return atividadesData ? JSON.parse(atividadesData) : [];
    } catch (error) {
      console.error('Erro ao carregar atividades:', error);
      return [];
    }
  };

  const prazosProximos = getPrazosCliente().map((prazo: any) => {
    console.log('PortalCliente: Convertendo prazo:', prazo);
    return {
      ...prazo,
      prazo: new Date(prazo.prazo)
    };
  });

  console.log('PortalCliente: Prazos convertidos para Dashboard:', prazosProximos);

  const atividadesRecentes = getAtividadesCliente().map((atividade: any) => ({
    ...atividade,
    data: new Date(atividade.data || Date.now())
  }));

  if (isLoading) {
    console.log('PortalCliente: Ainda carregando...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Carregando portal do cliente...</p>
        </div>
      </div>
    );
  }

  if (error || !cliente) {
    console.log('PortalCliente: Erro ou cliente não encontrado:', { error, cliente });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-4 sm:p-6 text-center">
            <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-red-500 mx-auto mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Cliente não encontrado</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">O portal do cliente solicitado não foi encontrado.</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-4 break-all">ID buscado: {clienteId}</p>
            <div className="space-y-2">
              <Button onClick={() => window.location.href = '/portal/koala'} className="w-full text-sm">
                Ir para Portal KOALA
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/clientes'} className="w-full text-sm">
                Voltar para Lista de Clientes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Verificar se o acesso está bloqueado
  if (!statusAcesso.permitido) {
    console.log('PortalCliente: Acesso bloqueado para cliente:', clienteId, statusAcesso);
    return (
      <VerificacaoAcesso 
        statusAcesso={statusAcesso}
        onRenovar={handleRenovarLicenca}
        clienteNome={cliente.nome}
      />
    );
  }

  console.log('PortalCliente: Renderizando portal para cliente:', cliente.nome);

  return (
    <PortalLayout clienteNome={cliente.nome}>
      <Dashboard
        stats={stats}
        prazosProximos={prazosProximos}
        atividadesRecentes={atividadesRecentes}
        // Passando dados de licença para o dashboard
        licencaCliente={licencaCliente}
        alertasLicenca={alertasLicenca}
        onRenovarLicenca={handleRenovarLicenca}
        onMarcarAlertaComoLido={marcarAlertaComoLido}
      />
    </PortalLayout>
  );
}
