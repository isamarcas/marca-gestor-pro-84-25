
import React from 'react';
import { Shield, Calendar, CreditCard, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Licenca, StatusAcesso } from '@/types';

interface StatusLicencaProps {
  licenca?: Licenca;
  statusAcesso: StatusAcesso;
  onRenovar: () => void;
}

export function StatusLicenca({ licenca, statusAcesso, onRenovar }: StatusLicencaProps) {
  if (!licenca) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            Nenhuma Licença Encontrada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 mb-4">
            Você não possui uma licença ativa no sistema.
          </p>
          <Button onClick={onRenovar} className="bg-red-600 hover:bg-red-700">
            <CreditCard className="h-4 w-4 mr-2" />
            Adquirir Licença
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = () => {
    switch (licenca.status) {
      case 'ativa':
        return <Badge className="bg-green-500 text-white">Ativa</Badge>;
      case 'vencida':
        return <Badge className="bg-red-500 text-white">Vencida</Badge>;
      case 'pendente':
        return <Badge className="bg-yellow-500 text-white">Pendente</Badge>;
      case 'suspensa':
        return <Badge className="bg-gray-500 text-white">Suspensa</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">Desconhecido</Badge>;
    }
  };

  const getCardStyle = () => {
    switch (licenca.status) {
      case 'ativa':
        return 'border-green-200 bg-green-50';
      case 'vencida':
        return 'border-red-200 bg-red-50';
      case 'pendente':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getIconColor = () => {
    switch (licenca.status) {
      case 'ativa':
        return 'text-green-600';
      case 'vencida':
        return 'text-red-600';
      case 'pendente':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calcularDiasRestantes = () => {
    const hoje = new Date();
    const vencimento = new Date(licenca.dataVencimento);
    const diff = vencimento.getTime() - hoje.getTime();
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return dias;
  };

  const diasRestantes = calcularDiasRestantes();

  return (
    <Card className={getCardStyle()}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {licenca.status === 'ativa' ? (
            <CheckCircle className={`h-5 w-5 ${getIconColor()}`} />
          ) : (
            <Shield className={`h-5 w-5 ${getIconColor()}`} />
          )}
          Status da Licença
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 font-medium">Número da Licença</p>
            <p className="font-semibold">{licenca.numeroLicenca}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Plano</p>
            <p className="font-semibold capitalize">{licenca.plano}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Data de Emissão</p>
            <p className="font-semibold">{formatarData(licenca.dataEmissao)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Data de Vencimento</p>
            <p className={`font-semibold ${diasRestantes <= 7 ? 'text-red-600' : 'text-gray-900'}`}>
              {formatarData(licenca.dataVencimento)}
            </p>
          </div>
        </div>

        {diasRestantes > 0 && licenca.status === 'ativa' && (
          <div className={`p-3 rounded-lg border ${diasRestantes <= 7 ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex items-center gap-2">
              <Calendar className={`h-4 w-4 ${diasRestantes <= 7 ? 'text-yellow-600' : 'text-blue-600'}`} />
              <span className={`font-medium ${diasRestantes <= 7 ? 'text-yellow-800' : 'text-blue-800'}`}>
                {diasRestantes === 1 ? '1 dia restante' : `${diasRestantes} dias restantes`}
              </span>
            </div>
            {diasRestantes <= 7 && (
              <p className="text-sm text-yellow-700 mt-1">
                Sua licença vencerá em breve. Renove agora para evitar interrupções.
              </p>
            )}
          </div>
        )}

        {(licenca.status === 'vencida' || diasRestantes <= 7) && (
          <Button 
            onClick={onRenovar}
            className={`w-full ${licenca.status === 'vencida' ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-600 hover:bg-yellow-700'}`}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            {licenca.status === 'vencida' ? 'Renovar Licença' : 'Renovar Agora'}
          </Button>
        )}

        {licenca.observacoes && (
          <div className="text-sm text-gray-600 p-3 bg-gray-100 rounded-lg">
            <strong>Observações:</strong> {licenca.observacoes}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
