
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Tema, Layout } from './personalizacaoTypes';

interface PersonalizacaoPreviewProps {
  temaAtual: Tema;
  layoutAtual: Layout;
}

export function PersonalizacaoPreview({ temaAtual, layoutAtual }: PersonalizacaoPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className={`bg-gradient-to-r ${temaAtual?.gradient} p-1 shadow-2xl`}>
        <div className="bg-white/90 backdrop-blur-xl rounded-[11px] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900">
                Preview da Interface
              </h3>
              <p className="text-slate-600">
                Tema: {temaAtual?.nome} • Layout: {layoutAtual?.nome}
              </p>
            </div>
            <div className="flex gap-2">
              {temaAtual?.cores.map((cor, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full shadow-lg"
                  style={{ backgroundColor: cor }}
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 bg-gradient-to-br ${temaAtual?.gradient} rounded-xl text-white`}>
              <h4 className="font-bold mb-2">Card Example</h4>
              <p className="text-sm opacity-80">Este é um exemplo de como ficará</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold text-slate-900 mb-2">Conteúdo</h4>
              <p className="text-sm text-slate-600">Layout {layoutAtual?.nome}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl text-white">
              <h4 className="font-bold mb-2">Elementos</h4>
              <p className="text-sm opacity-80">Interface personalizada</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
