
import React from 'react';
import { AlertTriangle, Clock, CreditCard, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertaLicenca } from '@/types';

interface AlertasLicencaProps {
  alertas: AlertaLicenca[];
  onRenovar: () => void;
  onMarcarComoLido: (alertaId: string) => void;
}

export function AlertasLicenca({ alertas, onRenovar, onMarcarComoLido }: AlertasLicencaProps) {
  if (alertas.length === 0) {
    return null;
  }

  const alertasAtivos = alertas.filter(a => a.ativo && !a.lido);

  if (alertasAtivos.length === 0) {
    return null;
  }

  const getAlertaIcon = (tipo: AlertaLicenca['tipo']) => {
    switch (tipo) {
      case 'vencimento_proximo':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'vencida':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'renovacao_necessaria':
        return <Shield className="h-5 w-5 text-orange-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getAlertaStyle = (tipo: AlertaLicenca['tipo']) => {
    switch (tipo) {
      case 'vencimento_proximo':
        return 'border-yellow-200 bg-yellow-50';
      case 'vencida':
        return 'border-red-200 bg-red-50';
      case 'renovacao_necessaria':
        return 'border-orange-200 bg-orange-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getAlertaBadge = (tipo: AlertaLicenca['tipo']) => {
    switch (tipo) {
      case 'vencimento_proximo':
        return <Badge className="bg-yellow-500 text-white">Vencimento Próximo</Badge>;
      case 'vencida':
        return <Badge className="bg-red-500 text-white">Vencida</Badge>;
      case 'renovacao_necessaria':
        return <Badge className="bg-orange-500 text-white">Renovação Necessária</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">Alerta</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {alertasAtivos.map((alerta) => (
        <Card key={alerta.id} className={`${getAlertaStyle(alerta.tipo)} border-l-4`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                {getAlertaIcon(alerta.tipo)}
                {alerta.titulo}
              </CardTitle>
              {getAlertaBadge(alerta.tipo)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{alerta.mensagem}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Data do Alerta:</span>
                <p>{new Date(alerta.dataAlerta).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Data de Vencimento:</span>
                <p className="font-semibold">
                  {new Date(alerta.dataVencimento).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            {alerta.diasRestantes > 0 && (
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">
                    {alerta.diasRestantes === 1 
                      ? '1 dia restante' 
                      : `${alerta.diasRestantes} dias restantes`
                    }
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button 
                onClick={onRenovar}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Renovar Agora
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onMarcarComoLido(alerta.id)}
                className="px-4"
              >
                Marcar como Lido
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
