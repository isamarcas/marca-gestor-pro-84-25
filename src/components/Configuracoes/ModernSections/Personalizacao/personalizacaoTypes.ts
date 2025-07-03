
export interface Tema {
  id: string;
  nome: string;
  cores: string[];
  gradient: string;
}

export interface Layout {
  id: string;
  nome: string;
  descricao: string;
  icon: string;
}

export interface PersonalizacaoState {
  temaSelecionado: string;
  layoutSelecionado: string;
  animacoesHabilitadas: boolean;
  efeitos3D: boolean;
  bordersRadius: number[];
  opacity: number[];
  blur: number[];
}

export interface PersonalizacaoCallbacks {
  selecionarTema: (temaId: string) => void;
  selecionarLayout: (layoutId: string) => void;
  toggleAnimacoes: () => void;
  toggleEfeitos3D: () => void;
  setBordersRadius: (value: number[]) => void;
  setOpacity: (value: number[]) => void;
  setBlur: (value: number[]) => void;
  aplicarPersonalizacao: () => void;
}
