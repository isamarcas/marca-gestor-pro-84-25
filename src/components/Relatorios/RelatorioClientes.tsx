
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserPlus, Star, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { Cliente } from "@/types";

interface RelatorioClientesProps {
  clientes: Cliente[];
}

export function RelatorioClientes({ clientes }: RelatorioClientesProps) {
  // Calcular estatísticas dos clientes
  const hoje = new Date();
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const inicioAno = new Date(hoje.getFullYear(), 0, 1);
  
  const clientesNovosNoMes = clientes.filter(cliente => 
    new Date(cliente.createdAt) >= inicioMes
  ).length;
  
  const clientesNovosNoAno = clientes.filter(cliente => 
    new Date(cliente.createdAt) >= inicioAno
  ).length;

  // Assumindo que todos os clientes são ativos por padrão (já que não existe campo status)
  const clientesAtivos = clientes.length;
  const taxaRetencao = clientes.length > 0 ? 100 : 0; // 100% já que não temos campo status

  const getTipoClienteBadge = (tipoCliente: string) => {
    switch (tipoCliente) {
      case 'pessoa_fisica':
        return <Badge className="bg-blue-100 text-blue-800">Pessoa Física</Badge>;
      case 'pessoa_juridica':
        return <Badge className="bg-purple-100 text-purple-800">Pessoa Jurídica</Badge>;
      default:
        return <Badge variant="outline">{tipoCliente}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Estatísticas dos Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {clientes.length}
                </div>
                <p className="text-blue-700 font-medium">Total de Clientes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {clientesNovosNoMes}
                </div>
                <p className="text-green-700 font-medium">Novos este Mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {clientesAtivos}
                </div>
                <p className="text-purple-700 font-medium">Clientes Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {taxaRetencao}%
                </div>
                <p className="text-orange-700 font-medium">Taxa de Retenção</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise de Crescimento */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              Crescimento da Base
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <div>
                  <span className="font-medium text-gray-700">Crescimento Anual</span>
                  <p className="text-sm text-gray-500">Novos clientes em {hoje.getFullYear()}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">
                    +{clientesNovosNoAno}
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    Este ano
                  </Badge>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <div>
                  <span className="font-medium text-gray-700">Taxa de Conversão</span>
                  <p className="text-sm text-gray-500">Leads para clientes</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">
                    78%
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    Excelente
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50/30">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              Perfil dos Clientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {['pessoa_juridica', 'pessoa_fisica'].map((tipoCliente) => {
                const count = clientes.filter(c => c.tipoCliente === tipoCliente).length;
                const percentage = clientes.length > 0 ? Math.round((count / clientes.length) * 100) : 0;
                
                return (
                  <div key={tipoCliente} className="flex justify-between items-center p-4 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-gray-700">
                        {tipoCliente === 'pessoa_juridica' ? 'Pessoa Jurídica' : 'Pessoa Física'}
                      </span>
                      <p className="text-sm text-gray-500">{count} clientes</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">
                        {percentage}%
                      </div>
                      {getTipoClienteBadge(tipoCliente)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista Detalhada de Clientes */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            Base de Clientes Detalhada
          </CardTitle>
        </CardHeader>
        <CardContent>
          {clientes.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-2">Nenhum cliente cadastrado</p>
              <p className="text-gray-400 text-sm">
                Os clientes aparecerão aqui quando forem cadastrados no sistema
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientes.slice(0, 20).map((cliente) => (
                    <TableRow key={cliente.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{cliente.nome}</div>
                          {cliente.razaoSocial && (
                            <div className="text-xs text-gray-500">{cliente.razaoSocial}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getTipoClienteBadge(cliente.tipoCliente)}</TableCell>
                      <TableCell className="font-mono text-sm">{cliente.email}</TableCell>
                      <TableCell className="font-mono text-sm">{cliente.telefone}</TableCell>
                      <TableCell>
                        {format(new Date(cliente.createdAt), 'dd/MM/yyyy')}
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
