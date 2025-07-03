
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  RefreshCw,
  Building2,
  User 
} from 'lucide-react';
import { useState } from 'react';

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

interface AlertDetailModalProps {
  alerta: Alerta | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarcarResolvido: (id: number) => void;
  onAdiarAlerta: (id: number, novaData: string) => void;
}

const getTipoIcon = (tipo: string) => {
  switch (tipo) {
    case 'prazo': return Clock;
    case 'renovacao': return RefreshCw;
    case 'oposicao': return AlertTriangle;
    case 'recurso': return FileText;
    case 'documentacao': return FileText;
    default: return AlertTriangle;
  }
};

const getPrioridadeColor = (prioridade: string) => {
  switch (prioridade) {
    case 'alta': return 'bg-red-100 text-red-800 border-red-300';
    case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'baixa': return 'bg-green-100 text-green-800 border-green-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ativo': return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'resolvido': return 'bg-green-100 text-green-800 border-green-300';
    case 'adiado': return 'bg-blue-100 text-blue-800 border-blue-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const formatarTipo = (tipo: string) => {
  switch (tipo) {
    case 'prazo': return 'Prazo';
    case 'renovacao': return 'Renovação';
    case 'oposicao': return 'Oposição';
    case 'recurso': return 'Recurso';
    case 'documentacao': return 'Documentação';
    default: return tipo;
  }
};

const formatarStatus = (status: string) => {
  switch (status) {
    case 'ativo': return 'Ativo';
    case 'resolvido': return 'Resolvido';
    case 'adiado': return 'Adiado';
    default: return status;
  }
};

export function AlertDetailModal({ 
  alerta, 
  open, 
  onOpenChange, 
  onMarcarResolvido, 
  onAdiarAlerta 
}: AlertDetailModalProps) {
  const [novaData, setNovaData] = useState('');

  if (!alerta) return null;

  const TipoIcon = getTipoIcon(alerta.tipo);

  const handleAdiar = () => {
    if (novaData) {
      onAdiarAlerta(alerta.id, novaData);
      setNovaData('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <TipoIcon className="h-6 w-6 text-orange-600" />
            Detalhes do Alerta
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Título e badges */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{alerta.titulo}</h2>
            <div className="flex gap-2 flex-wrap">
              <Badge className={getStatusColor(alerta.status)}>
                {formatarStatus(alerta.status)}
              </Badge>
              <Badge className={getPrioridadeColor(alerta.prioridade)}>
                Prioridade {alerta.prioridade.charAt(0).toUpperCase() + alerta.prioridade.slice(1)}
              </Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-800">
                {formatarTipo(alerta.tipo)}
              </Badge>
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Descrição</h3>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{alerta.descricao}</p>
          </div>

          {/* Informações principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Marca</p>
                  <p className="text-gray-900">{alerta.marca}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Cliente</p>
                  <p className="text-gray-900">{alerta.cliente}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Prazo</p>
                  <p className="text-gray-900">{new Date(alerta.prazo).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Criado em</p>
                  <p className="text-gray-900">{new Date(alerta.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
          {alerta.status === 'ativo' && (
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">Ações</h3>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => onMarcarResolvido(alerta.id)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4" />
                  Marcar como Resolvido
                </Button>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Label htmlFor="nova-data" className="text-sm">Adiar para:</Label>
                    <Input
                      id="nova-data"
                      type="date"
                      value={novaData}
                      onChange={(e) => setNovaData(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={handleAdiar}
                    disabled={!novaData}
                    variant="outline"
                    className="mt-6"
                  >
                    Adiar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
