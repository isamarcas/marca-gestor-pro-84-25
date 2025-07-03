
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, Eye, Trash2, File, Search, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Documento } from "@/types";

type Props = {
  marcaId: string;
  documentos: Documento[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadDocumento: (documento: Omit<Documento, 'id'>) => void;
  onDeleteDocumento: (documentoId: string) => void;
};

const categoriaLabels = {
  certidao: "Certidão",
  comprovante_pagamento: "Comprovante de Pagamento",
  procuracao: "Procuração",
  contrato: "Contrato",
  correspondencia: "Correspondência",
  outros: "Outros"
};

const categoriaColors = {
  certidao: "bg-blue-100 text-blue-800",
  comprovante_pagamento: "bg-green-100 text-green-800",
  procuracao: "bg-purple-100 text-purple-800",
  contrato: "bg-orange-100 text-orange-800",
  correspondencia: "bg-yellow-100 text-yellow-800",
  outros: "bg-gray-100 text-gray-800"
};

export function GestaoDocumentosDialog({ marcaId, documentos, open, onOpenChange, onUploadDocumento, onDeleteDocumento }: Props) {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [busca, setBusca] = useState('');
  const [novoDocumento, setNovoDocumento] = useState({
    nome: '',
    categoria: 'outros' as keyof typeof categoriaLabels,
    arquivo: null as File | null
  });

  const documentosFiltrados = documentos.filter(doc => {
    const matchCategoria = filtroCategoria === 'todos' || doc.categoria === filtroCategoria;
    const matchBusca = doc.nome.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  const handleUpload = () => {
    if (novoDocumento.nome && novoDocumento.arquivo) {
      const documento: Omit<Documento, 'id'> = {
        nome: novoDocumento.nome,
        tipo: novoDocumento.arquivo.type,
        url: URL.createObjectURL(novoDocumento.arquivo),
        uploadedAt: new Date(),
        categoria: novoDocumento.categoria,
        marcaRelacionada: marcaId,
        tamanhoArquivo: novoDocumento.arquivo.size,
        formato: novoDocumento.arquivo.name.split('.').pop() || ''
      };
      
      onUploadDocumento(documento);
      setNovoDocumento({ nome: '', categoria: 'outros', arquivo: null });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestão de Documentos</DialogTitle>
          <DialogDescription>
            Gerencie todos os documentos relacionados à marca
          </DialogDescription>
        </DialogHeader>

        {/* Upload de novo documento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Adicionar Documento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome do Documento</label>
                <Input
                  value={novoDocumento.nome}
                  onChange={(e) => setNovoDocumento({...novoDocumento, nome: e.target.value})}
                  placeholder="Nome do documento"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <Select value={novoDocumento.categoria} onValueChange={(value) => setNovoDocumento({...novoDocumento, categoria: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoriaLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Arquivo</label>
                <Input
                  type="file"
                  onChange={(e) => setNovoDocumento({...novoDocumento, arquivo: e.target.files?.[0] || null})}
                />
              </div>
            </div>
            <Button onClick={handleUpload} disabled={!novoDocumento.nome || !novoDocumento.arquivo}>
              <Upload className="h-4 w-4 mr-2" />
              Fazer Upload
            </Button>
          </CardContent>
        </Card>

        {/* Filtros */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar documentos..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as categorias</SelectItem>
                  {Object.entries(categoriaLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de documentos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Documentos ({documentosFiltrados.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {documentosFiltrados.length === 0 ? (
              <div className="text-center py-8">
                <File className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum documento encontrado</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Formato</TableHead>
                      <TableHead>Tamanho</TableHead>
                      <TableHead>Data Upload</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentosFiltrados.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.nome}</TableCell>
                        <TableCell>
                          <Badge className={categoriaColors[doc.categoria]}>
                            {categoriaLabels[doc.categoria]}
                          </Badge>
                        </TableCell>
                        <TableCell className="uppercase">{doc.formato}</TableCell>
                        <TableCell>{(doc.tamanhoArquivo / 1024).toFixed(1)} KB</TableCell>
                        <TableCell>
                          {format(doc.uploadedAt, 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" title="Visualizar">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Download">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title="Excluir"
                              onClick={() => onDeleteDocumento(doc.id)}
                            >
                              <Trash2 className="h-4 w-4" />
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
      </DialogContent>
    </Dialog>
  );
}
