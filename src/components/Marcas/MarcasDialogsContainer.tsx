
import { MarcaDetalheDialog } from './MarcaDetalheDialog';
import { EditarAndamentoDialog } from './EditarAndamentoDialog';
import { GestaoDocumentosDialog } from './GestaoDocumentosDialog';
import { MonitoramentoPrazosDialog } from './MonitoramentoPrazosDialog';
import { GestaoOposicoesDialog } from './GestaoOposicoesDialog';
import { Documento, AlertaPrazo, Oposicao, Marca } from '@/types';

interface MarcasDialogsContainerProps {
  // Dialog states
  marcaSelecionada: any;
  detalheOpen: boolean;
  setDetalheOpen: (open: boolean) => void;
  andamentoOpen: boolean;
  setAndamentoOpen: (open: boolean) => void;
  documentosOpen: boolean;
  prazosOpen: boolean;
  oposicoesOpen: boolean;
  marcaParaGestao: string | null;
  
  // Data
  documentos: Record<string, Documento[]>;
  alertasPrazos: Record<string, AlertaPrazo[]>;
  oposicoes: Record<string, Oposicao[]>;
  
  // Handlers
  onSaveStatus: (marcaId: string, novoStatus: Marca['status']) => void;
  onUploadDocumento: (documento: Omit<Documento, 'id'>) => void;
  onDeleteDocumento: (documentoId: string) => void;
  onAdicionarAlerta: (alerta: Omit<AlertaPrazo, 'id' | 'createdAt'>) => void;
  onResolverAlerta: (alertaId: string) => void;
  onAdiarAlerta: (alertaId: string, novaData: Date) => void;
  onAdicionarOposicao: (oposicao: Omit<Oposicao, 'id'>) => void;
  onAtualizarStatusOposicao: (oposicaoId: string, novoStatus: Oposicao['status']) => void;
  onCloseDocumentos: (open: boolean) => void;
  onClosePrazos: (open: boolean) => void;
  onCloseOposicoes: (open: boolean) => void;
}

export function MarcasDialogsContainer({
  marcaSelecionada,
  detalheOpen,
  setDetalheOpen,
  andamentoOpen,
  setAndamentoOpen,
  documentosOpen,
  prazosOpen,
  oposicoesOpen,
  marcaParaGestao,
  documentos,
  alertasPrazos,
  oposicoes,
  onSaveStatus,
  onUploadDocumento,
  onDeleteDocumento,
  onAdicionarAlerta,
  onResolverAlerta,
  onAdiarAlerta,
  onAdicionarOposicao,
  onAtualizarStatusOposicao,
  onCloseDocumentos,
  onClosePrazos,
  onCloseOposicoes,
}: MarcasDialogsContainerProps) {
  return (
    <>
      <MarcaDetalheDialog
        marca={marcaSelecionada}
        open={detalheOpen}
        onOpenChange={setDetalheOpen}
      />

      <EditarAndamentoDialog
        marca={marcaSelecionada}
        open={andamentoOpen}
        onOpenChange={setAndamentoOpen}
        onSaveStatus={onSaveStatus}
      />

      {marcaParaGestao && (
        <>
          <GestaoDocumentosDialog
            marcaId={marcaParaGestao}
            documentos={documentos[marcaParaGestao] || []}
            open={documentosOpen}
            onOpenChange={onCloseDocumentos}
            onUploadDocumento={onUploadDocumento}
            onDeleteDocumento={onDeleteDocumento}
          />

          <MonitoramentoPrazosDialog
            marcaId={marcaParaGestao}
            alertas={alertasPrazos[marcaParaGestao] || []}
            open={prazosOpen}
            onOpenChange={onClosePrazos}
            onAdicionarAlerta={onAdicionarAlerta}
            onResolverAlerta={onResolverAlerta}
            onAdiarAlerta={onAdiarAlerta}
          />

          <GestaoOposicoesDialog
            marcaId={marcaParaGestao}
            oposicoes={oposicoes[marcaParaGestao] || []}
            open={oposicoesOpen}
            onOpenChange={onCloseOposicoes}
            onAdicionarOposicao={onAdicionarOposicao}
            onAtualizarStatus={onAtualizarStatusOposicao}
          />
        </>
      )}
    </>
  );
}
