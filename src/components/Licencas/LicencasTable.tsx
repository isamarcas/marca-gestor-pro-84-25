
import React from 'react';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Licenca } from '@/types';
import { formatarData, formatarMoeda, calcularDiasRestantes } from '@/utils/licencasUtils';
import { getStatusBadge, getPlanoBadge } from './LicencasBadges';
import { NovaLicencaDialog } from './NovaLicencaDialog';

interface LicencasTableProps {
  licencas: Licenca[];
  clientes: any[];
  onAtualizarStatus: (licencaId: string, novoStatus: Licenca['status']) => void;
}

export function LicencasTable({ licencas, clientes, onAtualizarStatus }: LicencasTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Licenças ({licencas.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Licença
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plano
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {licencas.map((licenca) => {
                const cliente = clientes.find(c => c.id === licenca.clienteId);
                const diasRestantes = calcularDiasRestantes(licenca.dataVencimento);
                
                return (
                  <tr key={licenca.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {cliente?.nome || 'Cliente não encontrado'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {cliente?.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {licenca.numeroLicenca}
                      </div>
                      <div className="text-sm text-gray-500">
                        Emitida em {formatarData(licenca.dataEmissao)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(licenca.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPlanoBadge(licenca.plano)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatarData(licenca.dataVencimento)}
                      </div>
                      <div className={`text-sm ${diasRestantes <= 7 ? 'text-red-600' : diasRestantes <= 30 ? 'text-yellow-600' : 'text-gray-500'}`}>
                        {diasRestantes > 0 ? `${diasRestantes} dias restantes` : 'Vencida'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatarMoeda(licenca.valor)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Select
                        value={licenca.status}
                        onValueChange={(value) => onAtualizarStatus(licenca.id, value as Licenca['status'])}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ativa">Ativa</SelectItem>
                          <SelectItem value="vencida">Vencida</SelectItem>
                          <SelectItem value="pendente">Pendente</SelectItem>
                          <SelectItem value="suspensa">Suspensa</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {licencas.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma licença encontrada
            </h3>
            <p className="text-gray-500 mb-4">
              Tente ajustar os filtros para encontrar as licenças desejadas.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
