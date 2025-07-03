
import React from 'react';
import { Award, FileText, Target, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface WelcomeSectionProps {
  taxaSucesso: number;
}

export function WelcomeSection({ taxaSucesso }: WelcomeSectionProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-white shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-br from-cyan-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Award className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 px-2 sm:px-3 py-1 text-xs sm:text-sm">
            Cliente Premium
          </Badge>
        </div>
        
        <h1 className="text-xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
          Bem-vindo ao seu Portal Premium
        </h1>
        <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 font-medium">
          Acompanhe suas marcas com inteligência avançada e tecnologia de ponta
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl hover:scale-105 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto">
                <FileText className="mr-2 h-4 w-4" />
                Nova Solicitação Premium
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Criar nova solicitação de marca</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-3 sm:px-4 py-2 rounded-xl w-full sm:w-auto">
                <Target className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold">Taxa de Sucesso: {taxaSucesso}%</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Percentual de marcas deferidas</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-3 sm:px-4 py-2 rounded-xl w-full sm:w-auto">
                <Zap className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold">Processamento Acelerado</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Análises prioritárias para clientes premium</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
