
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Palette } from 'lucide-react';
import { Tema } from './personalizacaoTypes';

interface TemaSelectorProps {
  temas: Tema[];
  temaSelecionado: string;
  onSelecionarTema: (temaId: string) => void;
}

export function TemaSelector({ temas, temaSelecionado, onSelecionarTema }: TemaSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Palette className="h-6 w-6 text-pink-600" />
            Temas de Cores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {temas.map((tema) => (
              <motion.div
                key={tema.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`relative cursor-pointer rounded-2xl p-1 transition-all ${
                    temaSelecionado === tema.id
                      ? 'ring-4 ring-blue-300 ring-offset-2'
                      : 'hover:ring-2 hover:ring-slate-300 hover:ring-offset-2'
                  }`}
                  onClick={() => onSelecionarTema(tema.id)}
                >
                  <div className={`h-20 bg-gradient-to-br ${tema.gradient} rounded-xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    {temaSelecionado === tema.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </motion.div>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="font-semibold text-sm text-slate-900">{tema.nome}</p>
                    <div className="flex justify-center gap-1 mt-1">
                      {tema.cores.map((cor, index) => (
                        <div
                          key={index}
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: cor }}
                        />
                      ))}
                    </div>
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
