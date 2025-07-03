
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RelatoriosControles } from './RelatoriosControles';
import { RelatorioOverview } from './RelatorioOverview';
import { RelatorioMarcas } from './RelatorioMarcas';
import { RelatorioVencimentos } from './RelatorioVencimentos';
import { RelatorioRiscos } from './RelatorioRiscos';
import { RelatorioFinanceiro } from './RelatorioFinanceiro';
import { RelatorioClientes } from './RelatorioClientes';
import { RelatorioCompetitivo } from './RelatorioCompetitivo';
import { RelatorioCompliance } from './RelatorioCompliance';
import { useMarcas } from '@/hooks/useMarcas';
import { useClientes } from '@/hooks/useClientes';
import { useTarefas } from '@/hooks/useTarefas';
import { useAlertas } from '@/hooks/useAlertas';
import { format, subMonths } from "date-fns";

interface RelatoriosContentProps {
  tipoRelatorio: string;
  onTipoRelatorioChange: (tipo: string) => void;
}

export function RelatoriosContent({ tipoRelatorio, onTipoRelatorioChange }: RelatoriosContentProps) {
  const [periodoInicio, setPeriodoInicio] = useState(format(subMonths(new Date(), 6), 'yyyy-MM-dd'));
  const [periodoFim, setPeriodoFim] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [clienteFiltro, setClienteFiltro] = useState('todos');

  const { marcas, getEstatisticas } = useMarcas();
  const { clientes } = useClientes();
  const { stats: statsTarefas } = useTarefas();
  const { alertas, stats: statsAlertas } = useAlertas();

  const estatisticasMarcas = getEstatisticas();

  const handleExportarRelatorio = () => {
    console.log('Exportando relatório...');
    // TODO: Implementar exportação real
  };

  const renderRelatorioContent = () => {
    switch (tipoRelatorio) {
      case 'overview':
        return (
          <RelatorioOverview
            clientes={clientes}
            estatisticasMarcas={estatisticasMarcas}
            statsTarefas={statsTarefas}
            statsAlertas={statsAlertas}
          />
        );
      case 'marcas':
        return <RelatorioMarcas marcas={marcas} estatisticas={estatisticasMarcas} />;
      case 'vencimentos':
        return <RelatorioVencimentos marcas={marcas} />;
      case 'riscos':
        return (
          <RelatorioRiscos
            clientes={clientes}
            estatisticasMarcas={estatisticasMarcas}
            statsAlertas={statsAlertas}
            alertas={alertas}
          />
        );
      case 'financeiro':
        return <RelatorioFinanceiro />;
      case 'clientes':
        return <RelatorioClientes clientes={clientes} />;
      case 'competitivo':
        return <RelatorioCompetitivo />;
      case 'compliance':
        return <RelatorioCompliance />;
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Relatório não encontrado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">O tipo de relatório selecionado não foi encontrado.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Controles do Relatório */}
      <RelatoriosControles
        tipoRelatorio={tipoRelatorio}
        setTipoRelatorio={onTipoRelatorioChange}
        periodoInicio={periodoInicio}
        setPeriodoInicio={setPeriodoInicio}
        periodoFim={periodoFim}
        setPeriodoFim={setPeriodoFim}
        clienteFiltro={clienteFiltro}
        setClienteFiltro={setClienteFiltro}
        clientes={clientes}
        onExportar={handleExportarRelatorio}
      />

      {/* Conteúdo do Relatório */}
      {renderRelatorioContent()}
    </div>
  );
}
