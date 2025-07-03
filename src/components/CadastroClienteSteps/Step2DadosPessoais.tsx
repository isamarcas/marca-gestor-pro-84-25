
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { IdCard } from 'lucide-react';
import { CadastroClienteFormData } from '@/components/CadastroCliente/types';

interface Step2Props {
  form: UseFormReturn<CadastroClienteFormData>;
  onNext: () => void;
  onPrev: () => void;
  tipoCliente: 'pessoa_fisica' | 'pessoa_juridica';
}

export function Step2DadosPessoais({ form, onNext, onPrev, tipoCliente }: Step2Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <IdCard className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          {tipoCliente === 'pessoa_juridica' ? 'Dados do Representante Legal' : 'Dados Pessoais'}
        </h2>
      </div>

      {tipoCliente === 'pessoa_juridica' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="representanteLegal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Representante Legal</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do responsável" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="nacionalidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nacionalidade</FormLabel>
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profissão</FormLabel>
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado Civil</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>RG</FormLabel>
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Órgão Emissor</FormLabel>
              <FormControl>
                <Input placeholder="SSP/SP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Anterior
        </Button>
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
          Próximo
        </Button>
      </div>
    </div>
  );
}
