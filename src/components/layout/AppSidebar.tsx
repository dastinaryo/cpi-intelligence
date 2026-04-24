import {
  Activity,
  AlertTriangle,
  BarChart3,
  LayoutDashboard,
  Network,
  Settings,
  Truck,
  Users,
} from "lucide-react";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navGroups = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Supply Chain",
    items: [
      { id: "network", label: "Network", icon: Network },
      { id: "logistics", label: "Logistics", icon: Truck },
      { id: "partners", label: "Partners", icon: Users },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { id: "signals", label: "Signals", icon: Activity },
      { id: "alerts", label: "Alerts", icon: AlertTriangle, badge: 3 },
    ],
  },
];

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-sm font-bold tracking-tight">CP</span>
          </div>
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-semibold text-sidebar-foreground">
              CPI Intelligence
            </span>
            <span className="truncate text-[10px] uppercase tracking-wider text-muted-foreground">
              Supply Chain
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={item.active}
                        tooltip={item.label}
                        className="gap-2.5"
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1 truncate text-sm">{item.label}</span>
                        {item.badge !== undefined && (
                          <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-sm bg-primary px-1 text-[10px] font-medium text-primary-foreground group-data-[collapsible=icon]:hidden">
                            {item.badge}
                          </span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings" className="gap-2.5">
              <Settings className="h-4 w-4 shrink-0" />
              <span className="text-sm">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export { AppSidebar, SidebarTrigger };
