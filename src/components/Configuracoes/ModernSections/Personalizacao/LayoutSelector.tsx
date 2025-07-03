
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout as LayoutIcon } from 'lucide-react';
import { Layout } from './personalizacaoTypes';

interface LayoutSelectorProps {
  layouts: Layout[];
  layoutSelecionado: string;
  onSelecionarLayout: (layoutId: string) => void;
}

export function LayoutSelector({ layouts, layoutSelecionado, onSelecionarLayout }: LayoutSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <LayoutIcon className="h-6 w-6 text-blue-600" />
            Layout da Interface
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {layouts.map((layout) => (
              <motion.div
                key={layout.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${
                    layoutSelecionado === layout.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  onClick={() => onSelecionarLayout(layout.id)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{layout.icon}</div>
                    <h4 className="font-bold text-slate-900 mb-1">{layout.nome}</h4>
                    <p className="text-sm text-slate-600">{layout.descricao}</p>
                    {layoutSelecionado === layout.id && (
                      <Badge className="mt-2 bg-blue-100 text-blue-700">Selecionado</Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
