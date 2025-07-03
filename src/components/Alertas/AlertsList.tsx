
import { AlertCard } from './AlertCard';

interface Alerta {
  id: number;
  titulo: string;
  descricao: string;
  tipo: 'prazo' | 'renovacao' | 'oposicao' | 'recurso' | 'documentacao';
  prioridade: 'alta' | 'media' | 'baixa';
  marca: string;
  cliente: string;
  prazo: string;
  status: 'ativo' | 'resolvido' | 'adiado';
  createdAt: string;
}

interface AlertsListProps {
  alertas: Alerta[];
  onMarcarResolvido: (id: number) => void;
  onVerDetalhes: (alerta: Alerta) => void;
}

export function AlertsList({ alertas, onMarcarResolvido, onVerDetalhes }: AlertsListProps) {
  if (alertas.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum alerta encontrado</h3>
        <p className="text-gray-500">Não há alertas que correspondam aos filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Alertas ({alertas.length})
      </h2>
      <div className="grid gap-4">
        {alertas.map((alerta) => (
          <AlertCard
            key={alerta.id}
            alerta={alerta}
            onMarcarResolvido={onMarcarResolvido}
            onVerDetalhes={onVerDetalhes}
          />
        ))}
      </div>
    </div>
  );
}
