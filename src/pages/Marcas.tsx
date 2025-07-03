
import { MarcasContent } from '@/components/Marcas/MarcasContent';
import { MarcasDialogsContainer } from '@/components/Marcas/MarcasDialogsContainer';
import { useMarcasDialogs } from '@/hooks/useMarcasDialogs';
import { useMarcasHandlers } from '@/components/Marcas/MarcasHandlers';
import { Marca } from '@/types';
import { useMarcas } from '@/hooks/useMarcas';
import { useToast } from '@/hooks/use-toast';

const statusLabels = {
  deferido: 'Deferido',
  em_analise: 'Em Análise',
  indeferido: 'Indeferido',
  recurso: 'Recurso',
  renovacao: 'Renovação',
  oposicao: 'Oposição',
  deposito: 'Depósito',
  publicacao: 'Publicação',
  fase_oposicao: 'Fase de Oposição',
  exame_merito: 'Exame de Mérito',
  resposta_exigencia: 'Resposta à Exigência',
  pagamento_taxa: 'Pagamento da Taxa',
  concessao: 'Concessão',
  vigencia: 'Vigência',
};

export default function Marcas() {
  const { marcas, isLoading, addMarca, updateMarca, getEstatisticas } = useMarcas();
  const { toast } = useToast();
  const estatisticas = getEstatisticas();
  
  const dialogsState = useMarcasDialogs();
  
  const handlers = useMarcasHandlers({
    marcaParaGestao: dialogsState.marcaParaGestao,
    setDocumentos: dialogsState.setDocumentos,
    setAlertasPrazos: dialogsState.setAlertasPrazos,
    setOposicoes: dialogsState.setOposicoes,
  });

  function handleAddMarca(novaMarca: Marca) {
    addMarca(novaMarca);
    
    toast({
      title: "Sucesso!",
      description: `Marca "${novaMarca.nome}" cadastrada com sucesso.`,
    });
  }

  function handleSaveStatus(marcaId: string, novoStatus: Marca['status']) {
    updateMarca(marcaId, { status: novoStatus });
    
    toast({
      title: "Status atualizado!",
      description: `O status da marca foi alterado para "${statusLabels[novoStatus]}".`,
    });
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-[#f9fafb] min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando marcas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <MarcasContent
        marcas={marcas}
        estatisticas={estatisticas}
        onAddMarca={handleAddMarca}
        onVerDetalhes={dialogsState.openDetalhes}
        onEditarAndamento={dialogsState.openAndamento}
        onGerenciarDocumentos={dialogsState.openDocumentos}
        onMonitorarPrazos={dialogsState.openPrazos}
        onGerenciarOposicoes={dialogsState.openOposicoes}
      />

      <MarcasDialogsContainer
        marcaSelecionada={dialogsState.marcaSelecionada}
        detalheOpen={dialogsState.detalheOpen}
        setDetalheOpen={dialogsState.setDetalheOpen}
        andamentoOpen={dialogsState.andamentoOpen}
        setAndamentoOpen={dialogsState.setAndamentoOpen}
        documentosOpen={dialogsState.documentosOpen}
        prazosOpen={dialogsState.prazosOpen}
        oposicoesOpen={dialogsState.oposicoesOpen}
        marcaParaGestao={dialogsState.marcaParaGestao}
        documentos={dialogsState.documentos}
        alertasPrazos={dialogsState.alertasPrazos}
        oposicoes={dialogsState.oposicoes}
        onSaveStatus={handleSaveStatus}
        onUploadDocumento={handlers.handleUploadDocumento}
        onDeleteDocumento={handlers.handleDeleteDocumento}
        onAdicionarAlerta={handlers.handleAdicionarAlerta}
        onResolverAlerta={handlers.handleResolverAlerta}
        onAdiarAlerta={handlers.handleAdiarAlerta}
        onAdicionarOposicao={handlers.handleAdicionarOposicao}
        onAtualizarStatusOposicao={handlers.handleAtualizarStatusOposicao}
        onCloseDocumentos={dialogsState.closeDocumentos}
        onClosePrazos={dialogsState.closePrazos}
        onCloseOposicoes={dialogsState.closeOposicoes}
      />
    </>
  );
}
