
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ClientesFiltroProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
}

export function ClientesFiltro({ searchTerm, setSearchTerm }: ClientesFiltroProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por nome, email ou CNPJ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        Filtros
      </Button>
    </div>
  );
}
