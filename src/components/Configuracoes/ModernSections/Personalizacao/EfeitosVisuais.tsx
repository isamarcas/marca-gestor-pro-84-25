
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Sparkles, 
  Zap,
  Eye,
  Paintbrush
} from 'lucide-react';
import { PersonalizacaoState, PersonalizacaoCallbacks } from './personalizacaoTypes';

interface EfeitosVisuaisProps {
  personalizacao: PersonalizacaoState;
  callbacks: Pick<PersonalizacaoCallbacks, 'toggleAnimacoes' | 'toggleEfeitos3D' | 'setBordersRadius' | 'setOpacity' | 'setBlur'>;
}

export function EfeitosVisuais({ personalizacao, callbacks }: EfeitosVisuaisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-purple-600" />
            Efeitos Visuais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Animações */}
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Animações</h4>
                <p className="text-sm text-slate-600">
                  {personalizacao.animacoesHabilitadas 
                    ? 'Animações suaves ativadas' 
                    : 'Animações desativadas para performance'
                  }
                </p>
              </div>
            </div>
            <Switch
              checked={personalizacao.animacoesHabilitadas}
              onCheckedChange={callbacks.toggleAnimacoes}
            />
          </div>

          {/* Efeitos 3D */}
          <div className="flex items-center justify-between p-4 bg-pink-50 rounded-xl border border-pink-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Efeitos 3D</h4>
                <p className="text-sm text-slate-600">
                  {personalizacao.efeitos3D 
                    ? 'Profundidade e sombras ativadas' 
                    : 'Interface plana para melhor performance'
                  }
                </p>
              </div>
            </div>
            <Switch
              checked={personalizacao.efeitos3D}
              onCheckedChange={callbacks.toggleEfeitos3D}
            />
          </div>

          {/* Controles Deslizantes */}
          <div className="space-y-6">
            {/* Border Radius */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 font-semibold text-slate-700">
                  <Paintbrush className="h-4 w-4" />
                  Arredondamento das Bordas
                </Label>
                <Badge>{personalizacao.bordersRadius[0]}px</Badge>
              </div>
              <Slider
                value={personalizacao.bordersRadius}
                onValueChange={callbacks.setBordersRadius}
                max={24}
                min={0}
                step={2}
                className="w-full"
              />
            </div>

            {/* Opacity */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 font-semibold text-slate-700">
                  <Eye className="h-4 w-4" />
                  Transparência dos Elementos
                </Label>
                <Badge>{personalizacao.opacity[0]}%</Badge>
              </div>
              <Slider
                value={personalizacao.opacity}
                onValueChange={callbacks.setOpacity}
                max={100}
                min={50}
                step={5}
                className="w-full"
              />
            </div>

            {/* Blur */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 font-semibold text-slate-700">
                  <Sparkles className="h-4 w-4" />
                  Intensidade do Blur
                </Label>
                <Badge>{personalizacao.blur[0]}px</Badge>
              </div>
              <Slider
                value={personalizacao.blur}
                onValueChange={callbacks.setBlur}
                max={20}
                min={0}
                step={2}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
