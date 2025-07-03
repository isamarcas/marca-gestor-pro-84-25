
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const classesList = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
  "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
  "41", "42", "43", "44", "45"
];

interface MarcaFormFieldsProps {
  form: {
    nome: string;
    numeroProcesso: string;
    titular: string;
    classe: string;
    tipoMarca: string;
    observacoes: string;
    descricaoProdutosServicos: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

export function MarcaFormFields({ form, errors, onChange, onSelectChange }: MarcaFormFieldsProps) {
  return (
    <>
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome da Marca <span className="text-red-500">*</span></Label>
          <Input
            id="nome"
            name="nome"
            value={form.nome}
            onChange={onChange}
            placeholder="Digite o nome da marca"
            className={errors.nome ? "border-red-500" : ""}
          />
          {errors.nome && <p className="text-xs text-red-500">{errors.nome}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="numeroProcesso">Nº Processo <span className="text-red-500">*</span></Label>
          <Input
            id="numeroProcesso"
            name="numeroProcesso"
            value={form.numeroProcesso}
            onChange={onChange}
            placeholder="Número do processo no INPI"
            className={errors.numeroProcesso ? "border-red-500" : ""}
          />
          {errors.numeroProcesso && <p className="text-xs text-red-500">{errors.numeroProcesso}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="titular">Titular <span className="text-red-500">*</span></Label>
        <Input
          id="titular"
          name="titular"
          value={form.titular}
          onChange={onChange}
          placeholder="Nome completo do titular"
          className={errors.titular ? "border-red-500" : ""}
        />
        {errors.titular && <p className="text-xs text-red-500">{errors.titular}</p>}
      </div>

      {/* Classification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Classe NCL <span className="text-red-500">*</span></Label>
          <Select value={form.classe} onValueChange={(value) => onSelectChange("classe", value)}>
            <SelectTrigger className={errors.classe ? "border-red-500" : ""}>
              <SelectValue placeholder="Selecione a classe" />
            </SelectTrigger>
            <SelectContent>
              {classesList.map((classe) => (
                <SelectItem key={classe} value={classe}>
                  Classe {classe}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.classe && <p className="text-xs text-red-500">{errors.classe}</p>}
        </div>

        <div className="space-y-2">
          <Label>Tipo de Marca</Label>
          <Select value={form.tipoMarca} onValueChange={(value) => onSelectChange("tipoMarca", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nominativa">Nominativa</SelectItem>
              <SelectItem value="figurativa">Figurativa</SelectItem>
              <SelectItem value="mista">Mista</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-2">
        <Label htmlFor="descricaoProdutosServicos">Descrição de Produtos/Serviços</Label>
        <Textarea
          id="descricaoProdutosServicos"
          name="descricaoProdutosServicos"
          value={form.descricaoProdutosServicos}
          onChange={onChange}
          placeholder="Descreva os produtos ou serviços cobertos por esta marca"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          name="observacoes"
          value={form.observacoes}
          onChange={onChange}
          placeholder="Adicione observações importantes sobre esta marca"
          rows={3}
        />
      </div>
    </>
  );
}
