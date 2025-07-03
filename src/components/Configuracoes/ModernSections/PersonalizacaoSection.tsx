
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { PersonalizacaoPreview } from './Personalizacao/PersonalizacaoPreview';
import { TemaSelector } from './Personalizacao/TemaSelector';
import { LayoutSelector } from './Personalizacao/LayoutSelector';
import { EfeitosVisuais } from './Personalizacao/EfeitosVisuais';
import { PersonalizacaoActions } from './Personalizacao/PersonalizacaoActions';
import { temas, layouts } from './Personalizacao/personalizacaoData';
import { PersonalizacaoState } from './Personalizacao/personalizacaoTypes';

export function PersonalizacaoSection() {
  const { toast } = useToast();
  
  const [personalizacao, setPersonalizacao] = useState<PersonalizacaoState>({
    temaSelecionado: 'default',
    layoutSelecionado: 'comfortable',
    animacoesHabilitadas: true,
    efeitos3D: true,
    bordersRadius: [12],
    opacity: [90],
    blur: [8]
  });

  const selecionarTema = (temaId: string) => {
    setPersonalizacao(prev => ({ ...prev, temaSelecionado: temaId }));
    const tema = temas.find(t => t.id === temaId);
    toast({
      title: "🎨 Tema Alterado",
      description: `Tema "${tema?.nome}" aplicado com sucesso!`,
    });
  };

  const selecionarLayout = (layoutId: string) => {
    setPersonalizacao(prev => ({ ...prev, layoutSelecionado: layoutId }));
    const layout = layouts.find(l => l.id === layoutId);
    toast({
      title: "📐 Layout Alterado",
      description: `Layout "${layout?.nome}" aplicado com sucesso!`,
    });
  };

  const toggleAnimacoes = () => {
    setPersonalizacao(prev => ({ 
      ...prev, 
      animacoesHabilitadas: !prev.animacoesHabilitadas 
    }));
    toast({
      title: personalizacao.animacoesHabilitadas ? "🚫 Animações Desativadas" : "✨ Animações Ativadas",
      description: personalizacao.animacoesHabilitadas 
        ? "Animações foram desabilitadas para melhor performance" 
        : "Animações foram habilitadas para melhor experiência",
    });
  };

  const toggleEfeitos3D = () => {
    setPersonalizacao(prev => ({ 
      ...prev, 
      efeitos3D: !prev.efeitos3D 
    }));
    toast({
      title: personalizacao.efeitos3D ? "🎭 Efeitos 3D Desativados" : "🎨 Efeitos 3D Ativados",
      description: personalizacao.efeitos3D 
        ? "Efeitos 3D foram desabilitados" 
        : "Efeitos 3D foram habilitados",
    });
  };

  const aplicarPersonalizacao = () => {
    toast({
      title: "🎉 Personalização Aplicada",
      description: "Todas as suas configurações foram salvas e aplicadas!",
    });
  };

  const temaAtual = temas.find(t => t.id === personalizacao.temaSelecionado)!;
  const layoutAtual = layouts.find(l => l.id === personalizacao.layoutSelecionado)!;

  const efeitosCallbacks = {
    toggleAnimacoes,
    toggleEfeitos3D,
    setBordersRadius: (value: number[]) => setPersonalizacao(prev => ({ ...prev, bordersRadius: value })),
    setOpacity: (value: number[]) => setPersonalizacao(prev => ({ ...prev, opacity: value })),
    setBlur: (value: number[]) => setPersonalizacao(prev => ({ ...prev, blur: value }))
  };

  return (
    <div className="space-y-6">
      <PersonalizacaoPreview 
        temaAtual={temaAtual} 
        layoutAtual={layoutAtual} 
      />
      
      <TemaSelector
        temas={temas}
        temaSelecionado={personalizacao.temaSelecionado}
        onSelecionarTema={selecionarTema}
      />
      
      <LayoutSelector
        layouts={layouts}
        layoutSelecionado={personalizacao.layoutSelecionado}
        onSelecionarLayout={selecionarLayout}
      />
      
      <EfeitosVisuais
        personalizacao={personalizacao}
        callbacks={efeitosCallbacks}
      />
      
      <PersonalizacaoActions
        temas={temas}
        onAplicarPersonalizacao={aplicarPersonalizacao}
        onSelecionarTema={selecionarTema}
      />
    </div>
  );
}
