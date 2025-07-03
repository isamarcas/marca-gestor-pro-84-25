
import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { useLicencas } from '@/hooks/useLicencas';
import { useClientes } from '@/hooks/useClientes';
import { Licenca } from '@/types';
import { exportarRelatorioCSV } from '@/utils/licencasUtils';
import { LicencasStats } from '@/components/Licencas/LicencasStats';
import { LicencasFilters } from '@/components/Licencas/LicencasFilters';
import { LicencasTable } from '@/components/Licencas/LicencasTable';
import { LicencasEmptyState } from '@/components/Licencas/LicencasEmptyState';

export default function GerenciamentoLicencas() {
  const { licencas, atualizarStatusLicenca, verificarAlertasAutomaticos, isLoading } = useLicencas();
  const { clientes } = useClientes();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [planoFilter, setPlanoFilter] = useState<string>('todos');

  console.log('GerenciamentoLicencas: Licenças carregadas:', licencas);
  console.log('GerenciamentoLicencas: Clientes disponíveis:', clientes);

  // Filtrar licenças
  const licencasFiltradas = licencas.filter(licenca => {
    const cliente = clientes.find(c => c.id === licenca.clienteId);
    const nomeCliente = cliente?.nome.toLowerCase() || '';
    const numeroLicenca = licenca.numeroLicenca.toLowerCase();
    
    const matchesSearch = nomeCliente.includes(searchTerm.toLowerCase()) || 
                         numeroLicenca.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || licenca.status === statusFilter;
    const matchesPlano = planoFilter === 'todos' || licenca.plano === planoFilter;
    
    return matchesSearch && matchesStatus && matchesPlano;
  });

  const handleAtualizarStatus = (licencaId: string, novoStatus: Licenca['status']) => {
    atualizarStatusLicenca(licencaId, novoStatus);
  };

  const handleVerificarAlertas = () => {
    verificarAlertasAutomaticos();
  };

  const handleExportarRelatorio = () => {
    exportarRelatorioCSV(licencasFiltradas, clientes);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Gerenciamento de Licenças
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Controle e administre todas as licenças do sistema
              </p>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <LicencasStats licencas={licencas} />

        {/* Filtros e Ações */}
        <LicencasFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          planoFilter={planoFilter}
          setPlanoFilter={setPlanoFilter}
          onVerificarAlertas={handleVerificarAlertas}
          onExportarRelatorio={handleExportarRelatorio}
        />

        {/* Lista de Licenças ou Estado Vazio */}
        {licencas.length === 0 ? (
          <LicencasEmptyState />
        ) : (
          <LicencasTable
            licencas={licencasFiltradas}
            clientes={clientes}
            onAtualizarStatus={handleAtualizarStatus}
          />
        )}
      </div>
    </div>
  );
}
