
import { Routes, Route } from 'react-router-dom';
import { RootRedirect } from './RootRedirect';
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';

// Importar todas as páginas
import Auth from '@/pages/Auth';
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import Clientes from '@/pages/Clientes';
import Marcas from '@/pages/Marcas';
import Tarefas from '@/pages/Tarefas';
import Relatorios from '@/pages/Relatorios';
import Configuracoes from '@/pages/Configuracoes';
import Alertas from '@/pages/Alertas';
import Caixa from '@/pages/Caixa';
import Mailbox from '@/pages/Mailbox';
import Contratos from '@/pages/Contratos';
import GestaoContratos from '@/pages/GestaoContratos';
import GerenciamentoLicencas from '@/pages/GerenciamentoLicencas';
import PortalCliente from '@/pages/PortalCliente';
import PoliticaPrivacidade from '@/pages/PoliticaPrivacidade';
import NotFound from '@/pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rota raiz - redireciona baseado no status de login */}
      <Route path="/" element={<RootRedirect />} />
      
      {/* Rota de autenticação */}
      <Route path="/auth" element={
        <PublicRoute>
          <Auth />
        </PublicRoute>
      } />
      
      {/* Política de Privacidade - Rota pública */}
      <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
      
      {/* Portal do Cliente - Rota pública específica */}
      <Route path="/portal/:clienteId" element={<PortalCliente />} />
      
      {/* Rotas protegidas apenas para admin e gestor */}
      <Route path="/inicio" element={
        <ProtectedRoute requiredRoles={['admin', 'gestor']}>
          <Index />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute requiredRoles={['admin', 'gestor']}>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/clientes" element={
        <ProtectedRoute requiredRoles={['admin', 'gestor']}>
          <Clientes />
        </ProtectedRoute>
      } />
      
      <Route path="/marcas" element={
        <ProtectedRoute requiredRoles={['admin', 'gestor']}>
          <Marcas />
        </ProtectedRoute>
      } />
      
      <Route path="/tarefas" element={
        <ProtectedRoute requiredRoles={['admin', 'gestor']}>
          <Tarefas />
        </ProtectedRoute>
      } />
      
      <Route path="/relatorios" element={
        <ProtectedRoute requiredRoles={['admin', 'gestor']}>
          <Relatorios />
        </ProtectedRoute>
      } />
      
      <Route path="/configuracoes" element={
        <ProtectedRoute>
          <Configuracoes />
        </ProtectedRoute>
      } />
      
      <Route path="/alertas" element={
        <ProtectedRoute requiredRoles={['admin', 'gestor']}>
          <Alertas />
        </ProtectedRoute>
      } />
      
      <Route path="/caixa" element={
        <ProtectedRoute requiredRoles={['admin']}>
          <Caixa />
        </ProtectedRoute>
      } />
      
      <Route path="/mailbox" element={
        <ProtectedRoute requiredRoles={['admin', 'gestor']}>
          <Mailbox />
        </ProtectedRoute>
      } />
      
      <Route path="/contratos" element={
        <ProtectedRoute requiredRoles={['admin', 'gestor']}>
          <Contratos />
        </ProtectedRoute>
      } />
      
      <Route path="/gestao-contratos" element={
        <ProtectedRoute requiredRoles={['admin', 'gestor']}>
          <GestaoContratos />
        </ProtectedRoute>
      } />
      
      <Route path="/licencas" element={
        <ProtectedRoute requiredRoles={['admin']}>
          <GerenciamentoLicencas />
        </ProtectedRoute>
      } />

      {/* Rota 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
