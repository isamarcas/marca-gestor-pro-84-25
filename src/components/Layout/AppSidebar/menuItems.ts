import {
  LayoutDashboard,
  Users,
  Tag,
  CheckSquare,
  BarChart3,
  Settings,
  AlertTriangle,
  DollarSign,
  Mail,
  FileText,
  FolderOpen,
  Shield,
  Home
} from 'lucide-react';

export interface MenuItem {
  title: string;
  url: string;
  icon: any;
  description?: string;
  badge?: string | number;
  role?: string[];
}

export const menuItems: MenuItem[] = [
  {
    title: "Início",
    url: "/inicio",
    icon: Home,
    description: "Página inicial do sistema"
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Visão geral do sistema"
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Users,
    description: "Gestão de clientes"
  },
  {
    title: "Marcas",
    url: "/marcas",
    icon: Tag,
    description: "Gestão de marcas e patentes"
  },
  {
    title: "Tarefas",
    url: "/tarefas",
    icon: CheckSquare,
    description: "Gestão de tarefas"
  },
  {
    title: "Relatórios",
    url: "/relatorios",
    icon: BarChart3,
    description: "Relatórios e estatísticas"
  },
  {
    title: "Alertas",
    url: "/alertas",
    icon: AlertTriangle,
    description: "Alertas e notificações"
  },
  {
    title: "Caixa",
    url: "/caixa",
    icon: DollarSign,
    description: "Gestão financeira",
    role: ["admin", "gestor"]
  },
  {
    title: "Mailbox",
    url: "/mailbox",
    icon: Mail,
    description: "Centro de mensagens"
  },
  {
    title: "Contratos",
    url: "/contratos",
    icon: FileText,
    description: "Geração de contratos"
  },
  {
    title: "Gestão Contratos",
    url: "/gestao-contratos",
    icon: FolderOpen,
    description: "Gestão de contratos",
    role: ["admin", "gestor"]
  },
  {
    title: "Licenças",
    url: "/licencas",
    icon: Shield,
    description: "Gestão de licenças",
    role: ["admin"]
  },
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
    description: "Configurações do sistema"
  }
];
