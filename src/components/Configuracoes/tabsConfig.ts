
import { 
  User, 
  Bell, 
  Shield, 
  Settings, 
  Palette, 
  Database,
  Lock
} from 'lucide-react';
import { ConfigTab } from './types';
import { PerfilSection } from './ModernSections/PerfilSection';
import { NotificacoesSection } from './ModernSections/NotificacoesSection';
import { SegurancaSection } from './ModernSections/SegurancaSection';
import { SegurancaForcaBrutaSection } from './ModernSections/SegurancaForcaBruta';
import { SistemaSection } from './ModernSections/SistemaSection';
import { PersonalizacaoSection } from './ModernSections/PersonalizacaoSection';
import { AvancadoSection } from './ModernSections/AvancadoSection';

export const configTabs: ConfigTab[] = [
  {
    id: 'perfil',
    title: 'Perfil',
    description: 'Informações pessoais e conta',
    icon: User,
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    component: PerfilSection
  },
  {
    id: 'notificacoes',
    title: 'Notificações',
    description: 'Alertas e comunicações',
    icon: Bell,
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-50 to-emerald-50',
    component: NotificacoesSection
  },
  {
    id: 'seguranca',
    title: 'Segurança',
    description: 'Senhas e autenticação',
    icon: Shield,
    color: 'from-red-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-red-50 to-pink-50',
    component: SegurancaSection
  },
  {
    id: 'seguranca-brute-force',
    title: 'Anti-Força Bruta',
    description: 'Proteção contra ataques automatizados',
    icon: Lock,
    color: 'from-red-600 to-orange-600',
    gradient: 'bg-gradient-to-br from-red-50 to-orange-50',
    component: SegurancaForcaBrutaSection
  },
  {
    id: 'sistema',
    title: 'Sistema',
    description: 'Idioma, tema e backup',
    icon: Settings,
    color: 'from-purple-500 to-violet-500',
    gradient: 'bg-gradient-to-br from-purple-50 to-violet-50',
    component: SistemaSection
  },
  {
    id: 'personalizacao',
    title: 'Personalização',
    description: 'Aparência e layout',
    icon: Palette,
    color: 'from-orange-500 to-yellow-500',
    gradient: 'bg-gradient-to-br from-orange-50 to-yellow-50',
    component: PersonalizacaoSection
  },
  {
    id: 'avancado',
    title: 'Avançado',
    description: 'Integrações e dados',
    icon: Database,
    color: 'from-slate-700 to-gray-800',
    gradient: 'bg-gradient-to-br from-slate-50 to-gray-50',
    component: AvancadoSection
  }
];
