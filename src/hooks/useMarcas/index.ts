
import { useState, useEffect } from 'react';
import { Marca } from '@/types';
import { loadMarcasFromStorage, saveMarcasToStorage } from './storage';
import { useToast } from '@/hooks/use-toast';

export function useMarcas() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadMarcas();
  }, []);

  const loadMarcas = async () => {
    try {
      setIsLoading(true);
      const marcasData = await loadMarcasFromStorage();
      setMarcas(marcasData);
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
      toast({
        title: "Erro",
        description: "Falha ao carregar marcas",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addMarca = (novaMarca: Marca) => {
    try {
      const marcasAtualizadas = [...marcas, novaMarca];
      setMarcas(marcasAtualizadas);
      saveMarcasToStorage(marcasAtualizadas);
      
      toast({
        title: "Sucesso",
        description: `Marca "${novaMarca.nome}" adicionada com sucesso`
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao adicionar marca:', error);
      toast({
        title: "Erro",
        description: "Falha ao adicionar marca",
        variant: "destructive"
      });
      return false;
    }
  };

  const updateMarca = (marcaId: string, updates: Partial<Marca>) => {
    try {
      const marcasAtualizadas = marcas.map(marca => 
        marca.id === marcaId ? { ...marca, ...updates, updatedAt: new Date() } : marca
      );
      setMarcas(marcasAtualizadas);
      saveMarcasToStorage(marcasAtualizadas);
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar marca:', error);
      toast({
        title: "Erro",
        description: "Falha ao atualizar marca",
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteMarca = (marcaId: string) => {
    try {
      const marcasAtualizadas = marcas.filter(marca => marca.id !== marcaId);
      setMarcas(marcasAtualizadas);
      saveMarcasToStorage(marcasAtualizadas);
      
      toast({
        title: "Sucesso",
        description: "Marca removida com sucesso"
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao remover marca:', error);
      toast({
        title: "Erro",
        description: "Falha ao remover marca",
        variant: "destructive"
      });
      return false;
    }
  };

  const getEstatisticas = () => {
    const totalMarcas = marcas.length;
    const deferidas = marcas.filter(m => m.status === 'deferido').length;
    const emAnalise = marcas.filter(m => m.status === 'em_analise').length;
    const alertas = marcas.filter(m => {
      const prazo = new Date(m.proximoPrazo);
      const hoje = new Date();
      const diasRestantes = Math.ceil((prazo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
      return diasRestantes <= 30 && diasRestantes >= 0;
    }).length;

    return {
      totalMarcas,
      emAnalise,
      deferidas,
      alertas
    };
  };

  return {
    marcas,
    isLoading,
    addMarca,
    updateMarca,
    deleteMarca,
    getEstatisticas,
    loadMarcas
  };
}
