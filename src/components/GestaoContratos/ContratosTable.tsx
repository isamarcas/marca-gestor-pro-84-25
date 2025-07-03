
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ContratoData } from '@/types/contratos';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  User,
  Award
} from 'lucide-react';

interface ContratosTableProps {
  contratos: ContratoData[];
  onVerDetalhes: (contrato: ContratoData) => void;
  onDownload: (contrato: ContratoData) => void;
  formatarDataHora: (data: string, hora: string) => string;
  obterVersaoContrato: (contrato: ContratoData) => string;
}

export function ContratosTable({ 
  contratos, 
  onVerDetalhes, 
  onDownload, 
  formatarDataHora, 
  obterVersaoContrato 
}: ContratosTableProps) {
  if (contratos.length === 0) {
    return (
      <Card className="shadow-xl">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contratos Assinados</h2>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              Nenhum contrato encontrado com esse filtro
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Contratos Assinados</h2>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Versão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contratos.map((contrato) => (
                <TableRow key={contrato.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      {contrato.nomeCliente}
                    </div>
                  </TableCell>
                  <TableCell>
                    {contrato.email || '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {formatarDataHora(contrato.dataAceite, contrato.horaAceite)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={obterVersaoContrato(contrato) === 'Premium' ? 'default' : 'secondary'}
                      className={obterVersaoContrato(contrato) === 'Premium' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {obterVersaoContrato(contrato) === 'Premium' && (
                        <Award className="h-3 w-3 mr-1" />
                      )}
                      {obterVersaoContrato(contrato)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={contrato.status === 'aceito' ? 'default' : 'secondary'}
                      className="bg-green-100 text-green-800"
                    >
                      ✓ Aceito
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onVerDetalhes(contrato)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDownload(contrato)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Baixar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
