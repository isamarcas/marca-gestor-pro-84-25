
import React, { useState } from 'react';
import { Search, Filter, Eye, Download, Clock, Calendar, FileText, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Marca } from '@/types';

interface MarcasViewProps {
  marcas: Marca[];
  onViewDetails: (marca: Marca) => void;
  onDownloadDocuments: (marcaId: string) => void;
  onSendMessage: (marcaId: string) => void;
}

const statusColors = {
  deferido: 'bg-green-100 text-green-800 border-green-200',
  em_analise: 'bg-blue-100 text-blue-800 border-blue-200',
  indeferido: 'bg-red-100 text-red-800 border-red-200',
  recurso: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  renovacao: 'bg-purple-100 text-purple-800 border-purple-200',
  oposicao: 'bg-orange-100 text-orange-800 border-orange-200',
};

const statusLabels = {
  deferido: 'Deferido',
  em_analise: 'Em Análise',
  indeferido: 'Indeferido',
  recurso: 'Recurso',
  renovacao: 'Renovação',
  oposicao: 'Oposição',
};

export function MarcasView({ marcas, onViewDetails, onDownloadDocuments, onSendMessage }: MarcasViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [classeFilter, setClasseFilter] = useState<string>('todas');

  // Filtrar marcas
  const marcasFiltradas = marcas.filter(marca => {
    const matchesSearch = marca.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         marca.numeroProcesso.includes(searchTerm);
    const matchesStatus = statusFilter === 'todos' || marca.status === statusFilter;
    const matchesClasse = classeFilter === 'todas' || marca.classe === classeFilter;
    
    return matchesSearch && matchesStatus && matchesClasse;
  });

  // Obter classes únicas
  const classesUnicas = Array.from(new Set(marcas.map(m => m.classe))).sort();

  const calcularDiasRestantes = (data: Date) => {
    const hoje = new Date();
    const diffTime = data.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Marcas</h1>
          <p className="text-gray-600 mt-1">Acompanhe todas as suas marcas registradas</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <FileText className="mr-2 h-4 w-4" />
          Solicitar Nova Marca
        </Button>
      </div>

      {/* Filtros */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar marcas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="deferido">Deferido</SelectItem>
                <SelectItem value="em_analise">Em Análise</SelectItem>
                <SelectItem value="indeferido">Indeferido</SelectItem>
                <SelectItem value="recurso">Recurso</SelectItem>
                <SelectItem value="renovacao">Renovação</SelectItem>
                <SelectItem value="oposicao">Oposição</SelectItem>
              </SelectContent>
            </Select>

            <Select value={classeFilter} onValueChange={setClasseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as Classes</SelectItem>
                {classesUnicas.map(classe => (
                  <SelectItem key={classe} value={classe}>Classe {classe}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Marcas */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-t-lg">
          <CardTitle>Suas Marcas ({marcasFiltradas.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {marcasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {searchTerm || statusFilter !== 'todos' || classeFilter !== 'todas'
                  ? 'Nenhuma marca encontrada com os filtros aplicados.'
                  : 'Nenhuma marca cadastrada ainda.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Nome da Marca</TableHead>
                    <TableHead className="font-semibold">Nº Processo</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Classe</TableHead>
                    <TableHead className="font-semibold">Data Depósito</TableHead>
                    <TableHead className="font-semibold">Próximo Prazo</TableHead>
                    <TableHead className="font-semibold text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marcasFiltradas.map((marca) => (
                    <TableRow 
                      key={marca.id} 
                      className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                      onClick={() => onViewDetails(marca)}
                    >
                      <TableCell className="font-medium text-gray-900">{marca.nome}</TableCell>
                      <TableCell className="font-mono text-sm text-gray-600">{marca.numeroProcesso}</TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[marca.status]} font-medium`}>
                          {statusLabels[marca.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium">
                          Classe {marca.classe}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {format(marca.dataDeposito, 'dd/MM/yyyy', { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        {marca.proximoPrazo ? (
                          <div className="flex flex-col">
                            <span className="text-gray-900 font-medium">
                              {format(marca.proximoPrazo, 'dd/MM/yyyy', { locale: ptBR })}
                            </span>
                            {(() => {
                              const dias = calcularDiasRestantes(marca.proximoPrazo);
                              if (dias <= 7) {
                                return <span className="text-red-600 text-xs font-medium">⚠️ {dias} dias</span>;
                              } else if (dias <= 30) {
                                return <span className="text-yellow-600 text-xs">⏰ {dias} dias</span>;
                              } else {
                                return <span className="text-green-600 text-xs">✅ {dias} dias</span>;
                              }
                            })()}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 justify-center" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onViewDetails(marca)}
                            title="Ver detalhes"
                            className="hover:bg-blue-100"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onDownloadDocuments(marca.id)}
                            title="Download de documentos"
                            className="hover:bg-green-100"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onSendMessage(marca.id)}
                            title="Enviar mensagem"
                            className="hover:bg-purple-100"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
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
