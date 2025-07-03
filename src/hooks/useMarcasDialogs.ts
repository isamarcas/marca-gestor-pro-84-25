
import { useState } from 'react';
import { Marca, Documento, AlertaPrazo, Oposicao } from '@/types';

export function useMarcasDialogs() {
  // Dialog states
  const [marcaSelecionada, setMarcaSelecionada] = useState<any>(null);
  const [detalheOpen, setDetalheOpen] = useState(false);
  const [documentosOpen, setDocumentosOpen] = useState(false);
  const [prazosOpen, setPrazosOpen] = useState(false);
  const [oposicoesOpen, setOposicoesOpen] = useState(false);
  const [andamentoOpen, setAndamentoOpen] = useState(false);
  const [marcaParaGestao, setMarcaParaGestao] = useState<string | null>(null);

  // Data states
  const [documentos, setDocumentos] = useState<Record<string, Documento[]>>({});
  const [alertasPrazos, setAlertasPrazos] = useState<Record<string, AlertaPrazo[]>>({});
  const [oposicoes, setOposicoes] = useState<Record<string, Oposicao[]>>({});

  const openDetalhes = (marca: any) => {
    setMarcaSelecionada(marca);
    setDetalheOpen(true);
  };

  const openAndamento = (marca: Marca) => {
    setMarcaSelecionada(marca);
    setAndamentoOpen(true);
  };

  const openDocumentos = (marcaId: string) => {
    setMarcaParaGestao(marcaId);
    setDocumentosOpen(true);
  };

  const openPrazos = (marcaId: string) => {
    setMarcaParaGestao(marcaId);
    setPrazosOpen(true);
  };

  const openOposicoes = (marcaId: string) => {
    setMarcaParaGestao(marcaId);
    setOposicoesOpen(true);
  };

  const closeDocumentos = (open: boolean) => {
    setDocumentosOpen(open);
    if (!open) setMarcaParaGestao(null);
  };

  const closePrazos = (open: boolean) => {
    setPrazosOpen(open);
    if (!open) setMarcaParaGestao(null);
  };

  const closeOposicoes = (open: boolean) => {
    setOposicoesOpen(open);
    if (!open) setMarcaParaGestao(null);
  };

  return {
    // States
    marcaSelecionada,
    detalheOpen,
    setDetalheOpen,
    documentosOpen,
    prazosOpen,
    oposicoesOpen,
    andamentoOpen,
    setAndamentoOpen,
    marcaParaGestao,
    documentos,
    setDocumentos,
    alertasPrazos,
    setAlertasPrazos,
    oposicoes,
    setOposicoes,
    // Actions
    openDetalhes,
    openAndamento,
    openDocumentos,
    openPrazos,
    openOposicoes,
    closeDocumentos,
    closePrazos,
    closeOposicoes,
  };
}
