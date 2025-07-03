
import { GestaoContratosHeader } from '@/components/GestaoContratos/GestaoContratosHeader';
import { ContratosTable } from '@/components/GestaoContratos/ContratosTable';
import { ContratoDetailModal } from '@/components/GestaoContratos/ContratoDetailModal';
import { useGestaoContratos } from '@/hooks/useGestaoContratos';

export default function GestaoContratos() {
  const {
    contratos,
    filtroNome,
    setFiltroNome,
    contratoSelecionado,
    setContratoSelecionado,
    estatisticas,
    handleDownload,
    handleCopyToClipboard,
    formatarDataHora,
    obterVersaoContrato
  } = useGestaoContratos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <GestaoContratosHeader
          filtroNome={filtroNome}
          onFiltroChange={setFiltroNome}
          estatisticas={estatisticas}
        />

        <ContratosTable
          contratos={contratos}
          onVerDetalhes={setContratoSelecionado}
          onDownload={handleDownload}
          formatarDataHora={formatarDataHora}
          obterVersaoContrato={obterVersaoContrato}
        />

        <ContratoDetailModal
          contrato={contratoSelecionado}
          isOpen={!!contratoSelecionado}
          onClose={() => setContratoSelecionado(null)}
          onDownload={handleDownload}
          onCopyToClipboard={handleCopyToClipboard}
          formatarDataHora={formatarDataHora}
          obterVersaoContrato={obterVersaoContrato}
        />
      </div>
    </div>
  );
}
