
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  RefreshCw,
  Building2,
  Eye
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

interface AlertCardProps {
  alerta: Alerta;
  onMarcarResolvido: (id: number) => void;
  onVerDetalhes: (alerta: Alerta) => void;
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

const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case 'prazo': return 'text-red-600 bg-red-100';
    case 'renovacao': return 'text-blue-600 bg-blue-100';
    case 'oposicao': return 'text-yellow-600 bg-yellow-100';
    case 'recurso': return 'text-purple-600 bg-purple-100';
    case 'documentacao': return 'text-green-600 bg-green-100';
    default: return 'text-gray-600 bg-gray-100';
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

const formatarStatus = (status: string) => {
  switch (status) {
    case 'ativo': return 'Ativo';
    case 'resolvido': return 'Resolvido';
    case 'adiado': return 'Adiado';
    default: return status;
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

export function AlertCard({ alerta, onMarcarResolvido, onVerDetalhes }: AlertCardProps) {
  const TipoIcon = getTipoIcon(alerta.tipo);
  const tipoColor = getTipoColor(alerta.tipo);

  return (
    <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`p-3 rounded-lg ${tipoColor}`}>
              <TipoIcon className="h-6 w-6" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {alerta.titulo}
                </h3>
                <div className="flex gap-2">
                  <Badge variant="outline" className={getPrioridadeColor(alerta.prioridade)}>
                    {alerta.prioridade.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(alerta.status)}>
                    {formatarStatus(alerta.status)}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    {formatarTipo(alerta.tipo)}
                  </Badge>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-2">{alerta.descricao}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">Marca:</span>
                  <span>{alerta.marca}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium">Cliente:</span>
                  <span className="truncate">{alerta.cliente}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Prazo:</span>
                  <span>{formatDistanceToNow(new Date(alerta.prazo), { locale: ptBR, addSuffix: true })}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onVerDetalhes(alerta)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Ver Detalhes
            </Button>
            
            {alerta.status === 'ativo' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMarcarResolvido(alerta.id)}
                className="flex items-center gap-2 text-green-600 border-green-300 hover:bg-green-50"
              >
                <CheckCircle className="h-4 w-4" />
                Resolver
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
