
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { useClientes } from '@/hooks/useClientes';
import { Cliente } from '@/types';

export function useClientesPage() {
  const {
    clientes,
    filteredClientes,
    searchTerm,
    setSearchTerm,
    addCliente,
    forceReload,
  } = useClientes();

  // Debug inicial na montagem da página
  useEffect(() => {
    const timer = setTimeout(() => {
      forceReload();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [forceReload]);

  const handleAddCliente = async (novoClienteForm: any): Promise<boolean> => {
    const clienteUnificado: Cliente = {
      id: `cliente-manual-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      nome: novoClienteForm.nome,
      email: novoClienteForm.email,
      telefone: novoClienteForm.telefone,
      cpfCnpj: novoClienteForm.cpfCnpj,
      totalMarcas: 0,
      marcasAtivas: 0,
      endereco: [
        novoClienteForm.endereco?.rua,
        novoClienteForm.endereco?.numero,
        novoClienteForm.endereco?.bairro,
        novoClienteForm.endereco?.cidade,
        novoClienteForm.endereco?.estado
      ]
        .filter(Boolean)
        .join(', ')
        + (novoClienteForm.endereco?.cep ? ` - CEP ${novoClienteForm.endereco.cep}` : ''),
      tipoCliente: novoClienteForm.tipoCliente,
      representanteLegal: novoClienteForm.representanteLegal || "",
      segmentoAtuacao: novoClienteForm.segmentoAtuacao || "",
      observacoes: novoClienteForm.observacoes || "",
      marcas: [],
      documentosIdentificacao: [],
      nacionalidade: novoClienteForm.nacionalidade,
      profissao: novoClienteForm.profissao,
      estadoCivil: novoClienteForm.estadoCivil,
      rg: novoClienteForm.rg,
      orgaoEmissor: novoClienteForm.orgaoEmissor,
      origem: 'manual',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const sucesso = addCliente(clienteUnificado);
    
    if (sucesso) {
      toast({
        title: "Cliente adicionado com sucesso!",
        description: `${clienteUnificado.nome} foi adicionado manualmente ao sistema.`,
      });
    }
    
    return sucesso;
  };

  return {
    clientes,
    filteredClientes,
    searchTerm,
    setSearchTerm,
    handleAddCliente,
  };
}
