
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Calendar, 
  Settings, 
  BarChart3,
  AlertCircle,
  CheckCircle,
  Mail
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/', bgColor: '#1e293b' },
  { icon: FileText, label: 'Marcas', href: '/marcas', bgColor: '#1e293b' },
  { icon: Users, label: 'Clientes', href: '/clientes', bgColor: '#1e293b' },
  { icon: Calendar, label: 'Tarefas', href: '/tarefas', bgColor: '#1e293b' },
  { icon: AlertCircle, label: 'Alertas', href: '/alertas', bgColor: '#1e293b' },
  { icon: Mail, label: 'Mailbox', href: '/mailbox', bgColor: '#1e293b' },
  { icon: BarChart3, label: 'Relatórios', href: '/relatorios', bgColor: '#1e293b' },
  { icon: Settings, label: 'Configurações', href: '/configuracoes', bgColor: '#1e293b' },
];

export function AppSidebarBackup() {
  const location = useLocation();

  return (
    <Sidebar style={{ backgroundColor: '#1e293b' }}>
      <SidebarHeader className="border-b border-sidebar-border" style={{ backgroundColor: '#1e293b' }}>
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-white">CRM INPI</span>
            <span className="truncate text-xs text-gray-300">Sistema de Marcas</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent style={{ backgroundColor: '#1e293b' }}>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <SidebarMenuItem key={item.href}>
                    <div 
                      className="p-2 rounded-md"
                      style={{ backgroundColor: item.bgColor }}
                    >
                      <SidebarMenuButton asChild isActive={isActive} className="bg-transparent hover:bg-transparent">
                        <Link to={item.href} className="text-white">
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </div>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border" style={{ backgroundColor: '#1e293b' }}>
        <div className="flex items-center gap-2 px-4 py-3 text-sm">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-white">Sistema Online</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
