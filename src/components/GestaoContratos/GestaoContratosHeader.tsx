
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, FileText, CheckCircle, Clock, Plus } from 'lucide-react';
import { AdicionarContratoModal } from './AdicionarContratoModal';

interface GestaoContratosHeaderProps {
  filtroNome: string;
  onFiltroChange: (valor: string) => void;
  estatisticas: {
    total: number;
    premium: number;
    aceitos: number;
  };
}

export function GestaoContratosHeader({ 
  filtroNome, 
  onFiltroChange, 
  estatisticas 
}: GestaoContratosHeaderProps) {
  const [showAdicionarModal, setShowAdicionarModal] = useState(false);

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gestão de Contratos
            </h1>
            <p className="text-gray-600 mt-2">
              Gerencie todos os contratos digitais do sistema
            </p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por cliente..."
                value={filtroNome}
                onChange={(e) => onFiltroChange(e.target.value)}
                className="pl-10 w-full lg:w-80"
              />
            </div>
            <Button 
              onClick={() => setShowAdicionarModal(true)}
              className="bg-green-600 hover:bg-green-700 whitespace-nowrap"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Contrato a Cliente
            </Button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total de Contratos</p>
                  <p className="text-2xl font-bold">{estatisticas.total}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Versão Premium</p>
                  <p className="text-2xl font-bold">{estatisticas.premium}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Contratos Aceitos</p>
                  <p className="text-2xl font-bold">{estatisticas.aceitos}</p>
                </div>
                <Clock className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AdicionarContratoModal 
        isOpen={showAdicionarModal}
        onClose={() => setShowAdicionarModal(false)}
      />
    </>
  );
}
