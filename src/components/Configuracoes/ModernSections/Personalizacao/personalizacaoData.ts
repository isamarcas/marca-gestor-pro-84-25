
import { Tema, Layout } from './personalizacaoTypes';

export const temas: Tema[] = [
  {
    id: 'default',
    nome: 'Padrão',
    cores: ['#3B82F6', '#8B5CF6', '#06B6D4'],
    gradient: 'from-blue-500 via-purple-500 to-cyan-500'
  },
  {
    id: 'sunset',
    nome: 'Pôr do Sol',
    cores: ['#F59E0B', '#EF4444', '#EC4899'],
    gradient: 'from-amber-500 via-red-500 to-pink-500'
  },
  {
    id: 'nature',
    nome: 'Natureza',
    cores: ['#10B981', '#059669', '#047857'],
    gradient: 'from-emerald-500 via-green-600 to-green-700'
  },
  {
    id: 'ocean',
    nome: 'Oceano',
    cores: ['#0EA5E9', '#0284C7', '#0369A1'],
    gradient: 'from-sky-500 via-blue-600 to-blue-700'
  },
  {
    id: 'dark',
    nome: 'Escuro',
    cores: ['#374151', '#1F2937', '#111827'],
    gradient: 'from-gray-700 via-gray-800 to-gray-900'
  }
];

export const layouts: Layout[] = [
  {
    id: 'compact',
    nome: 'Compacto',
    descricao: 'Interface mais densa',
    icon: '📱'
  },
  {
    id: 'comfortable',
    nome: 'Confortável',
    descricao: 'Espaçamento padrão',
    icon: '🖥️'
  },
  {
    id: 'spacious',
    nome: 'Espaçoso',
    descricao: 'Mais espaço entre elementos',
    icon: '🖼️'
  }
];
