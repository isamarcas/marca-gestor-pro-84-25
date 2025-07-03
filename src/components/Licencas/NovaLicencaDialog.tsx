
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useClientes } from '@/hooks/useClientes';
import { useLicencas } from '@/hooks/useLicencas';
import { Licenca } from '@/types';

export function NovaLicencaDialog() {
  const { clientes } = useClientes();
  const { criarLicenca } = useLicencas();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    clienteId: '',
    numeroLicenca: '',
    status: 'ativa' as Licenca['status'],
    plano: 'basico' as Licenca['plano'],
    valor: '',
    dataVencimento: '',
    observacoes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clienteId || !formData.numeroLicenca || !formData.valor || !formData.dataVencimento) {
      return;
    }

    const hoje = new Date();
    const dataVencimento = new Date(formData.dataVencimento);

    criarLicenca({
      clienteId: formData.clienteId,
      numeroLicenca: formData.numeroLicenca,
      dataEmissao: hoje,
      dataVencimento,
      dataPagamento: hoje,
      status: formData.status,
      plano: formData.plano,
      valor: parseFloat(formData.valor),
      observacoes: formData.observacoes,
    });

    // Reset form
    setFormData({
      clienteId: '',
      numeroLicenca: '',
      status: 'ativa',
      plano: 'basico',
      valor: '',
      dataVencimento: '',
      observacoes: '',
    });
    
    setOpen(false);
  };

  const generateLicenseNumber = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `LIC-${year}-${randomNum}`;
  };

  const handleGenerateNumber = () => {
    setFormData(prev => ({
      ...prev,
      numeroLicenca: generateLicenseNumber()
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Licença
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Criar Nova Licença</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cliente">Cliente*</Label>
              <Select value={formData.clienteId} onValueChange={(value) => setFormData(prev => ({ ...prev, clienteId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="numeroLicenca">Número da Licença*</Label>
              <div className="flex gap-2">
                <Input
                  id="numeroLicenca"
                  value={formData.numeroLicenca}
                  onChange={(e) => setFormData(prev => ({ ...prev, numeroLicenca: e.target.value }))}
                  placeholder="Ex: LIC-2024-001"
                  required
                />
                <Button type="button" variant="outline" onClick={handleGenerateNumber}>
                  Gerar
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Licenca['status'] }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativa">Ativa</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="suspensa">Suspensa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="plano">Plano</Label>
              <Select value={formData.plano} onValueChange={(value) => setFormData(prev => ({ ...prev, plano: value as Licenca['plano'] }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basico">Básico</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="valor">Valor (R$)*</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => setFormData(prev => ({ ...prev, valor: e.target.value }))}
                placeholder="0,00"
                required
              />
            </div>

            <div>
              <Label htmlFor="dataVencimento">Data de Vencimento*</Label>
              <Input
                id="dataVencimento"
                type="date"
                value={formData.dataVencimento}
                onChange={(e) => setFormData(prev => ({ ...prev, dataVencimento: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              placeholder="Informações adicionais sobre a licença..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Licença
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
