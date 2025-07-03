
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { Marca } from "@/types";
import { useClientes } from "@/hooks/useClientes";

interface EstatisticasMarcas {
  totalMarcas: number;
  deferidas: number;
  emAnalise: number;
  alertas: number;
}

interface RelatorioMarcasProps {
  marcas: Marca[];
  estatisticas: EstatisticasMarcas;
}

export function RelatorioMarcas({ marcas, estatisticas }: RelatorioMarcasProps) {
  const { clientes } = useClientes();

  // Função para obter o nome do cliente pelo ID
  const getClienteNome = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nome : 'Cliente não encontrado';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deferido':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'em_analise':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'indeferido':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'deferido':
        return <Badge className="bg-green-100 text-green-800">Deferido</Badge>;
      case 'em_analise':
        return <Badge className="bg-orange-100 text-orange-800">Em Análise</Badge>;
      case 'indeferido':
        return <Badge className="bg-red-100 text-red-800">Indeferido</Badge>;
      case 'deposito':
        return <Badge className="bg-blue-100 text-blue-800">Depósito</Badge>;
      default:
        return <Badge variant="outline">{status.replace('_', ' ')}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Estatísticas do Portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {estatisticas.totalMarcas}
                </div>
                <p className="text-blue-700 font-medium">Total de Marcas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {estatisticas.deferidas}
                </div>
                <p className="text-green-700 font-medium">Deferidas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {estatisticas.emAnalise}
                </div>
                <p className="text-orange-700 font-medium">Em Análise</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {estatisticas.totalMarcas > 0 
                    ? `${Math.round((estatisticas.deferidas / estatisticas.totalMarcas) * 100)}%`
                    : '0%'}
                </div>
                <p className="text-purple-700 font-medium">Taxa de Sucesso</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Marcas */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            Portfolio Detalhado de Marcas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {marcas.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-2">Nenhuma marca cadastrada</p>
              <p className="text-gray-400 text-sm">
                As marcas aparecerão aqui quando forem registradas no sistema
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome da Marca</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Classe</TableHead>
                    <TableHead>Data de Depósito</TableHead>
                    <TableHead>Próximo Prazo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marcas.slice(0, 20).map((marca) => (
                    <TableRow key={marca.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getStatusIcon(marca.status)}
                          <span className="font-medium">{marca.nome}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getClienteNome(marca.clienteId)}</TableCell>
                      <TableCell>{getStatusBadge(marca.status)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          NCL {marca.classe}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(marca.dataDeposito), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>
                        {marca.proximoPrazo && (
                          <span className={`font-medium ${
                            new Date(marca.proximoPrazo) < new Date() 
                              ? 'text-red-600' 
                              : 'text-gray-700'
                          }`}>
                            {format(new Date(marca.proximoPrazo), 'dd/MM/yyyy')}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
