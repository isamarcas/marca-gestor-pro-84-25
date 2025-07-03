
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClientes } from "@/hooks/useClientes";

interface ClienteSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function ClienteSelector({ value, onChange, error }: ClienteSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const { clientes } = useClientes();
  
  const selectedCliente = clientes.find(c => c.id === value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Cliente <span className="text-red-500">*</span>
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between",
                !value && "text-muted-foreground",
                error && "border-red-500"
              )}
            >
              {selectedCliente ? (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {selectedCliente.nome}
                </div>
              ) : (
                "Selecione o cliente..."
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Buscar cliente..." />
              <CommandList>
                <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                <CommandGroup>
                  {clientes.map((cliente) => (
                    <CommandItem
                      key={cliente.id}
                      value={cliente.nome}
                      onSelect={() => {
                        onChange(cliente.id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === cliente.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{cliente.nome}</span>
                        <span className="text-xs text-muted-foreground">{cliente.email}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>

      {selectedCliente && (
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-900">Cliente Selecionado</p>
          <p className="text-xs text-blue-700">{selectedCliente.email}</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              {selectedCliente.totalMarcas} marcas
            </Badge>
            <Badge variant="outline" className="text-xs">
              {selectedCliente.marcasAtivas} ativas
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
}
