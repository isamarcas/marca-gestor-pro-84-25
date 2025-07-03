
import { Eye, FileText, Clock, Scale, Edit, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Marca } from '@/types';

const statusColors = {
  deferido: 'bg-green-100 text-green-800',
  em_analise: 'bg-blue-100 text-blue-800',
  indeferido: 'bg-red-100 text-red-800',
  recurso: 'bg-yellow-100 text-yellow-800',
  renovacao: 'bg-purple-100 text-purple-800',
  oposicao: 'bg-orange-100 text-orange-800',
  deposito: 'bg-gray-100 text-gray-800',
  publicacao: 'bg-cyan-100 text-cyan-800',
  fase_oposicao: 'bg-orange-100 text-orange-800',
  exame_merito: 'bg-indigo-100 text-indigo-800',
  resposta_exigencia: 'bg-amber-100 text-amber-800',
  pagamento_taxa: 'bg-emerald-100 text-emerald-800',
  concessao: 'bg-green-100 text-green-800',
  vigencia: 'bg-teal-100 text-teal-800',
};

const statusLabels = {
  deferido: 'Deferido',
  em_analise: 'Em Análise',
  indeferido: 'Indeferido',
  recurso: 'Recurso',
  renovacao: 'Renovação',
  oposicao: 'Oposição',
  deposito: 'Depósito',
  publicacao: 'Publicação',
  fase_oposicao: 'Fase de Oposição',
  exame_merito: 'Exame de Mérito',
  resposta_exigencia: 'Resposta à Exigência',
  pagamento_taxa: 'Pagamento da Taxa',
  concessao: 'Concessão',
  vigencia: 'Vigência',
};

interface MarcasTableProps {
  marcas: Marca[];
  searchTerm: string;
  onVerDetalhes: (marca: Marca) => void;
  onGerenciarDocumentos: (marcaId: string) => void;
  onMonitorarPrazos: (marcaId: string) => void;
  onGerenciarOposicoes: (marcaId: string) => void;
  onEditarAndamento: (marca: Marca) => void;
}

export function MarcasTable({
  marcas,
  searchTerm,
  onVerDetalhes,
  onGerenciarDocumentos,
  onMonitorarPrazos,
  onGerenciarOposicoes,
  onEditarAndamento
}: MarcasTableProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-lg sm:text-xl">Lista de Marcas ({marcas.length})</span>
          {searchTerm && (
            <Badge variant="outline" className="w-fit">
              Filtrado por: "{searchTerm}"
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {marcas.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <p className="text-muted-foreground text-sm sm:text-base">
              {searchTerm ? 'Nenhuma marca encontrada para esta busca.' : 'Nenhuma marca cadastrada.'}
            </p>
          </div>
        ) : (
          <>
            {/* Versão Desktop - Tabela */}
            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome da Marca</TableHead>
                      <TableHead>Nº Processo</TableHead>
                      <TableHead>Titular</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Classe</TableHead>
                      <TableHead>Data Depósito</TableHead>
                      <TableHead>Próximo Prazo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marcas.map((marca) => (
                      <TableRow key={marca.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{marca.nome}</TableCell>
                        <TableCell className="font-mono text-sm">{marca.numeroProcesso}</TableCell>
                        <TableCell>{marca.titular}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[marca.status as keyof typeof statusColors]}>
                            {statusLabels[marca.status as keyof typeof statusLabels]}
                          </Badge>
                        </TableCell>
                        <TableCell>{marca.classe}</TableCell>
                        <TableCell>
                          {format(marca.dataDeposito, 'dd/MM/yyyy', { locale: ptBR })}
                        </TableCell>
                        <TableCell>
                          {marca.proximoPrazo ? format(marca.proximoPrazo, 'dd/MM/yyyy', { locale: ptBR }) : '--'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => onVerDetalhes(marca)} title="Ver detalhes">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onEditarAndamento(marca)} title="Editar andamento" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onGerenciarDocumentos(marca.id)} title="Gerenciar documentos">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onMonitorarPrazos(marca.id)} title="Monitorar prazos">
                              <Clock className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onGerenciarOposicoes(marca.id)} title="Gestão de oposições">
                              <Scale className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Versão Mobile e Tablet - Cards */}
            <div className="lg:hidden space-y-3 p-4">
              {marcas.map((marca) => (
                <Card key={marca.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header do Card */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base truncate">{marca.nome}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground font-mono">{marca.numeroProcesso}</p>
                        </div>
                        <Badge className={`${statusColors[marca.status as keyof typeof statusColors]} text-xs ml-2 flex-shrink-0`}>
                          {statusLabels[marca.status as keyof typeof statusLabels]}
                        </Badge>
                      </div>

                      {/* Informações principais */}
                      <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div>
                          <span className="text-muted-foreground">Titular:</span>
                          <p className="font-medium truncate">{marca.titular}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Classe:</span>
                          <p className="font-medium">{marca.classe}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Data Depósito:</span>
                          <p className="font-medium">{format(marca.dataDeposito, 'dd/MM/yyyy', { locale: ptBR })}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Próximo Prazo:</span>
                          <p className="font-medium">
                            {marca.proximoPrazo ? format(marca.proximoPrazo, 'dd/MM/yyyy', { locale: ptBR }) : '--'}
                          </p>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => onVerDetalhes(marca)} className="text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            Ver
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => onEditarAndamento(marca)} className="text-xs text-blue-600 hover:text-blue-800">
                            <Edit className="h-3 w-3 mr-1" />
                            Editar
                          </Button>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => onGerenciarDocumentos(marca.id)}>
                              <FileText className="h-4 w-4 mr-2" />
                              Documentos
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onMonitorarPrazos(marca.id)}>
                              <Clock className="h-4 w-4 mr-2" />
                              Prazos
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onGerenciarOposicoes(marca.id)}>
                              <Scale className="h-4 w-4 mr-2" />
                              Oposições
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
