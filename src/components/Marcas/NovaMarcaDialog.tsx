
import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Building2 } from "lucide-react";
import { ClienteSelector } from "./components/ClienteSelector";
import { StatusSelector, statusList } from "./components/StatusSelector";
import { MarcaFormFields } from "./components/MarcaFormFields";
import { DateFieldsSection } from "./components/DateFieldsSection";
import { FormPreview } from "./components/FormPreview";
import { useClientes } from "@/hooks/useClientes";

type NovaMarcaDialogProps = {
  onAddMarca: (marca: any) => void;
  trigger: React.ReactNode;
};

export function NovaMarcaDialog({ onAddMarca, trigger }: NovaMarcaDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    nome: "",
    numeroProcesso: "",
    titular: "",
    clienteId: "",
    status: "em_analise",
    classe: "",
    dataDeposito: "",
    proximoPrazo: "",
    dataLimiteManifestacao: "",
    tipoMarca: "nominativa",
    observacoes: "",
    descricaoProdutosServicos: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const { toast } = useToast();
  const { clientes } = useClientes();

  const selectedCliente = clientes.find(c => c.id === form.clienteId);
  const statusSelecionado = statusList.find(s => s.value === form.status);
  const requiresDeadline = statusSelecionado?.requiresDeadline || false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Remove error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Clear deadline field if status doesn't require it
    if (name === 'status') {
      const selectedStatus = statusList.find(s => s.value === value);
      if (!selectedStatus?.requiresDeadline) {
        setForm(prev => ({ ...prev, dataLimiteManifestacao: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.nome.trim()) newErrors.nome = "Nome da marca é obrigatório";
    if (!form.numeroProcesso.trim()) newErrors.numeroProcesso = "Número do processo é obrigatório";
    if (!form.titular.trim()) newErrors.titular = "Titular é obrigatório";
    if (!form.clienteId) newErrors.clienteId = "Cliente é obrigatório";
    if (!form.classe) newErrors.classe = "Classe é obrigatória";
    if (!form.dataDeposito) newErrors.dataDeposito = "Data de depósito é obrigatória";
    if (!form.proximoPrazo) newErrors.proximoPrazo = "Próximo prazo é obrigatório";
    
    // Validate deadline for specific statuses
    if (requiresDeadline && !form.dataLimiteManifestacao) {
      newErrors.dataLimiteManifestacao = "Data limite para manifestação é obrigatória para este status";
    }

    // Validate date logic
    if (form.dataDeposito && form.proximoPrazo) {
      const dataDeposito = new Date(form.dataDeposito);
      const proximoPrazo = new Date(form.proximoPrazo);
      
      if (proximoPrazo <= dataDeposito) {
        newErrors.proximoPrazo = "Próximo prazo deve ser posterior à data de depósito";
      }
    }

    if (form.dataLimiteManifestacao && form.dataDeposito) {
      const dataLimite = new Date(form.dataLimiteManifestacao);
      const dataDeposito = new Date(form.dataDeposito);
      
      if (dataLimite <= dataDeposito) {
        newErrors.dataLimiteManifestacao = "Data limite deve ser posterior à data de depósito";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const criarAlertaSeNecessario = (marca: any) => {
    if (!requiresDeadline || !form.dataLimiteManifestacao) return;

    const dataLimite = new Date(form.dataLimiteManifestacao);
    const agora = new Date();
    const diasRestantes = Math.ceil((dataLimite.getTime() - agora.getTime()) / (1000 * 60 * 60 * 24));

    // Criar alerta se estiver próximo do vencimento (30 dias ou menos)
    if (diasRestantes <= 30 && diasRestantes > 0) {
      const alerta = {
        id: Math.random().toString(36).slice(2, 10),
        marcaId: marca.id,
        marca: marca.nome,
        tipo: 'prazo',
        titulo: `${statusSelecionado?.label} - ${marca.nome}`,
        descricao: `Prazo para manifestação vence em ${diasRestantes} dias`,
        prazo: dataLimite.toISOString(),
        prioridade: diasRestantes <= 15 ? 'alta' : diasRestantes <= 7 ? 'alta' : 'media',
        status: 'ativo',
        createdAt: agora.toISOString(),
        cliente: selectedCliente?.nome || marca.titular
      };

      // Salvar alerta no localStorage
      const alertasExistentes = JSON.parse(localStorage.getItem('alertas') || '[]');
      alertasExistentes.push(alerta);
      localStorage.setItem('alertas', JSON.stringify(alertasExistentes));

      console.log('Alerta criado automaticamente:', alerta);
    }
  };

  const atualizarEstatisticas = (clienteId: string, novoStatus: string) => {
    try {
      const statsKey = `stats_${clienteId}`;
      const statsData = localStorage.getItem(statsKey);
      let stats = statsData ? JSON.parse(statsData) : {
        totalMarcas: 0,
        emAnalise: 0,
        deferidas: 0,
        alertas: 0
      };

      // Increment total
      stats.totalMarcas += 1;

      // Update specific status
      switch (novoStatus) {
        case 'em_analise':
          stats.emAnalise += 1;
          break;
        case 'deferido':
          stats.deferidas += 1;
          break;
        case 'indeferido':
        case 'recurso':
        case 'oposicao':
        case 'nulidade':
        case 'caducidade':
        case 'exigencia_merito':
          stats.alertas += 1;
          break;
      }

      localStorage.setItem(statsKey, JSON.stringify(stats));
      console.log('Estatísticas atualizadas para cliente', clienteId, ':', stats);
    } catch (error) {
      console.error('Erro ao atualizar estatísticas:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os campos destacados em vermelho.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const novaMarca = {
        id: Math.random().toString(36).slice(2, 10),
        nome: form.nome,
        numeroProcesso: form.numeroProcesso,
        titular: form.titular,
        clienteId: form.clienteId,
        status: form.status,
        classe: form.classe,
        dataDeposito: new Date(form.dataDeposito),
        proximoPrazo: new Date(form.proximoPrazo),
        dataLimiteManifestacao: form.dataLimiteManifestacao ? new Date(form.dataLimiteManifestacao) : undefined,
        tipoMarca: form.tipoMarca as 'nominativa' | 'figurativa' | 'mista',
        observacoes: form.observacoes,
        descricaoProdutosServicos: form.descricaoProdutosServicos,
        createdAt: new Date(),
        updatedAt: new Date(),
        documentos: [],
        custosAssociados: [],
        statusDetalhado: statusSelecionado?.label || '',
        historicoProcesso: [],
        oposicoes: [],
        licenciamentos: [],
        transferencias: [],
      };

      onAddMarca(novaMarca);
      
      // Update client statistics
      atualizarEstatisticas(form.clienteId, form.status);
      
      // Create alert if necessary
      criarAlertaSeNecessario(novaMarca);
      
      setLoading(false);
      setOpen(false);
      
      // Reset form
      setForm({
        nome: "",
        numeroProcesso: "",
        titular: "",
        clienteId: "",
        status: "em_analise",
        classe: "",
        dataDeposito: "",
        proximoPrazo: "",
        dataLimiteManifestacao: "",
        tipoMarca: "nominativa",
        observacoes: "",
        descricaoProdutosServicos: "",
      });
      setErrors({});
      
      toast({
        title: "Marca cadastrada com sucesso!",
        description: `A marca "${form.nome}" foi adicionada para ${selectedCliente?.nome}. ${requiresDeadline && form.dataLimiteManifestacao ? 'Alerta de prazo criado automaticamente.' : ''}`,
      });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Nova Marca
          </DialogTitle>
          <DialogDescription>
            Preencha os dados para cadastrar uma nova marca. Todos os campos marcados com * são obrigatórios.
          </DialogDescription>
        </DialogHeader>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <ClienteSelector 
            value={form.clienteId}
            onChange={(value) => handleSelectChange("clienteId", value)}
            error={errors.clienteId}
          />

          <MarcaFormFields
            form={form}
            errors={errors}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
          />

          <StatusSelector 
            value={form.status}
            onChange={(value) => handleSelectChange("status", value)}
          />

          <DateFieldsSection
            form={form}
            errors={errors}
            requiresDeadline={requiresDeadline}
            onChange={handleChange}
          />

          <FormPreview 
            form={form}
            requiresDeadline={requiresDeadline}
          />

          <DialogFooter className="pt-4">
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? "Cadastrando..." : "Cadastrar Marca"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
