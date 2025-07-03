
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { IdCard } from 'lucide-react';
import { StepProps } from './types';

export function Step2DadosPessoais({ form, onNext, onPrev, tipoCliente }: StepProps & { tipoCliente: string }) {
  const validateStep = () => {
    const values = form.getValues();
    return values.nacionalidade && values.profissao && values.estadoCivil && values.rg && values.orgaoEmissor;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    } else {
      form.trigger(['nacionalidade', 'profissao', 'estadoCivil', 'rg', 'orgaoEmissor', 'representanteLegal']);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <IdCard className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">
          {tipoCliente === 'pessoa_juridica' ? 'Dados do Representante Legal' : 'Dados Pessoais'}
        </h3>
      </div>

      {tipoCliente === 'pessoa_juridica' && (
        <FormField
          control={form.control}
          name="representanteLegal"
          rules={{ required: 'Representante Legal é obrigatório' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Representante Legal *</FormLabel>
              <FormControl>
                <Input placeholder="Nome do representante legal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="nacionalidade"
          rules={{ required: 'Nacionalidade é obrigatória' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nacionalidade *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Brasileira" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profissao"
          rules={{ required: 'Profissão é obrigatória' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profissão *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Advogado(a)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="estadoCivil"
          rules={{ required: 'Estado Civil é obrigatório' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado Civil *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                  <SelectItem value="casado">Casado(a)</SelectItem>
                  <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                  <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                  <SelectItem value="uniao_estavel">União Estável</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rg"
          rules={{ required: 'RG é obrigatório' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>RG *</FormLabel>
              <FormControl>
                <Input placeholder="00.000.000-0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="orgaoEmissor"
          rules={{ required: 'Órgão Emissor é obrigatório' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Órgão Emissor *</FormLabel>
              <FormControl>
                <Input placeholder="SSP/SP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {tipoCliente === 'pessoa_juridica' && (
        <FormField
          control={form.control}
          name="segmentoAtuacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Segmento de Atuação</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Tecnologia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          Anterior
        </Button>
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
          Próximo
        </Button>
      </div>
    </div>
  );
}
