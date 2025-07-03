
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Check, Shuffle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Tema } from './personalizacaoTypes';

interface PersonalizacaoActionsProps {
  temas: Tema[];
  onAplicarPersonalizacao: () => void;
  onSelecionarTema: (temaId: string) => void;
}

export function PersonalizacaoActions({ 
  temas, 
  onAplicarPersonalizacao, 
  onSelecionarTema 
}: PersonalizacaoActionsProps) {
  const { toast } = useToast();

  const handleTemaAleatorio = () => {
    toast({
      title: "🎲 Personalizando",
      description: "Aplicando tema aleatório...",
    });
    const temaAleatorio = temas[Math.floor(Math.random() * temas.length)];
    onSelecionarTema(temaAleatorio.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex gap-4"
    >
      <Button
        onClick={onAplicarPersonalizacao}
        className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white flex-1"
      >
        <Check className="h-4 w-4 mr-2" />
        Aplicar Personalização
      </Button>
      
      <Button
        onClick={handleTemaAleatorio}
        variant="outline"
        className="border-slate-300"
      >
        <Shuffle className="h-4 w-4 mr-2" />
        Aleatório
      </Button>
    </motion.div>
  );
}
