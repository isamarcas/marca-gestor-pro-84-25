
import { useState } from 'react';
import { MarcasHeader } from './MarcasHeader';
import { MarcasStats } from './MarcasStats';
import { MarcasFilters } from './MarcasFilters';
import { MarcasTable } from './MarcasTable';
import { Marca } from '@/types';

interface MarcasContentProps {
  marcas: Marca[];
  estatisticas: {
    totalMarcas: number;
    emAnalise: number;
    deferidas: number;
    alertas: number;
  };
  onAddMarca: (novaMarca: Marca) => void;
  onVerDetalhes: (marca: any) => void;
  onEditarAndamento: (marca: Marca) => void;
  onGerenciarDocumentos: (marcaId: string) => void;
  onMonitorarPrazos: (marcaId: string) => void;
  onGerenciarOposicoes: (marcaId: string) => void;
}

export function MarcasContent({
  marcas,
  estatisticas,
  onAddMarca,
  onVerDetalhes,
  onEditarAndamento,
  onGerenciarDocumentos,
  onMonitorarPrazos,
  onGerenciarOposicoes,
}: MarcasContentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const marcasFiltradas = marcas.filter((m) => {
    const matchesSearch = m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.numeroProcesso.includes(searchTerm) ||
      m.titular.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || m.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-[#f9fafb] min-h-screen">
      <MarcasHeader onAddMarca={onAddMarca} />
      
      <MarcasStats estatisticas={estatisticas} />

      <MarcasFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <MarcasTable
        marcas={marcasFiltradas}
        searchTerm={searchTerm}
        onVerDetalhes={onVerDetalhes}
        onEditarAndamento={onEditarAndamento}
        onGerenciarDocumentos={onGerenciarDocumentos}
        onMonitorarPrazos={onMonitorarPrazos}
        onGerenciarOposicoes={onGerenciarOposicoes}
      />
    </div>
  );
}
