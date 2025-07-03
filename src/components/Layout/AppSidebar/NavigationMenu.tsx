
import { Link, useLocation } from 'react-router-dom';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { menuItems } from './menuItems';

// Organizar itens em grupos
const menuGroups = [
  {
    id: 'main',
    title: 'Principal',
    items: menuItems.filter(item => ['Dashboard'].includes(item.title))
  },
  {
    id: 'business',
    title: 'Gestão de Negócio',
    items: menuItems.filter(item => ['Marcas', 'Clientes', 'Tarefas', 'Alertas'].includes(item.title))
  },
  {
    id: 'contracts',
    title: 'Contratos & Documentos',
    items: menuItems.filter(item => ['Contratos', 'Gestão Contratos'].includes(item.title))
  },
  {
    id: 'financial',
    title: 'Financeiro',
    items: menuItems.filter(item => ['Caixa'].includes(item.title))
  },
  {
    id: 'licenses',
    title: 'Licenças',
    items: menuItems.filter(item => ['Licenças'].includes(item.title))
  },
  {
    id: 'communication',
    title: 'Comunicação',
    items: menuItems.filter(item => ['Mailbox', 'Relatórios'].includes(item.title))
  },
  {
    id: 'settings',
    title: 'Sistema',
    items: menuItems.filter(item => ['Configurações'].includes(item.title))
  }
];

interface NavigationMenuProps {
  isDark: boolean;
}

export function NavigationMenu({ isDark }: NavigationMenuProps) {
  const location = useLocation();

  const renderMenuItem = (item: typeof menuItems[0]) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.url;
    
    return (
      <SidebarMenuItem key={item.url}>
        <SidebarMenuButton 
          asChild 
          className={cn(
            "group h-12 rounded-xl transition-all duration-300 mx-2 border-0",
            isDark 
              ? isActive 
                ? "bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-700/50 shadow-sm"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
              : isActive 
                ? "bg-gradient-to-r from-blue-50 to-blue-50 border border-blue-100 shadow-sm"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm"
          )}
        >
          <Link to={item.url} className="flex items-center gap-3 px-4 py-3 w-full">
            <div className={cn(
              "flex items-center justify-center w-6 h-6",
              isDark
                ? isActive 
                  ? "text-blue-400" 
                  : "text-gray-400 group-hover:text-gray-300"
                : isActive 
                  ? "text-blue-600" 
                  : "text-gray-500 group-hover:text-gray-700"
            )}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={cn(
                "font-medium text-sm leading-tight",
                isDark
                  ? isActive 
                    ? "text-blue-200" 
                    : "text-gray-300 group-hover:text-white"
                  : isActive 
                    ? "text-blue-900" 
                    : "text-gray-700 group-hover:text-gray-900"
              )}>
                {item.title}
              </div>
              <div className={cn(
                "text-xs truncate leading-tight mt-0.5",
                isDark
                  ? isActive 
                    ? "text-blue-300" 
                    : "text-gray-500 group-hover:text-gray-400"
                  : isActive 
                    ? "text-blue-600" 
                    : "text-gray-500 group-hover:text-gray-600"
              )}>
                {item.description}
              </div>
            </div>
            {isActive && (
              <div className={cn(
                "w-2 h-2 rounded-full",
                isDark ? "bg-blue-400" : "bg-blue-500"
              )}></div>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <SidebarContent className={`transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <ScrollArea className="h-full">
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className={`font-semibold text-xs uppercase tracking-wider mb-4 px-3 transition-colors duration-300 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Navegação Premium
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Accordion type="multiple" defaultValue={['main', 'business']} className="w-full space-y-1">
              {menuGroups.map((group) => (
                <AccordionItem key={group.id} value={group.id} className="border-none">
                  <AccordionTrigger className={cn(
                    "hover:no-underline py-3 px-3 rounded-lg text-sm font-semibold transition-all duration-300 border-0",
                    isDark 
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                  )}>
                    {group.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-2">
                    <SidebarMenu className="space-y-1">
                      {group.items.map(renderMenuItem)}
                    </SidebarMenu>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SidebarGroupContent>
        </SidebarGroup>
      </ScrollArea>
    </SidebarContent>
  );
}
