
export interface TipoRelatorio {
  value: string;
  label: string;
}

export const tiposRelatorio: TipoRelatorio[] = [
  { value: "marcas", label: "Marcas" },
  { value: "clientes", label: "Clientes" },
  { value: "tarefas", label: "Tarefas" },
  { value: "alertas", label: "Alertas" },
];
