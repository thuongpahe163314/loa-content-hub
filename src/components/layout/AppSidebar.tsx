import { NavLink, useLocation } from "react-router-dom";
import {
  FileText,
  Layout,
  Tags,
  Folder,
  Settings,
  BarChart3,
  Megaphone,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Tổng quan",
    url: "/admin",
    icon: Layout,
  },
  {
    title: "Quản lý Nội dung",
    url: "/admin/content",
    icon: FileText,
  },
  {
    title: "Danh mục",
    url: "/admin/categories",
    icon: Folder,
  },
  {
    title: "Thẻ tag",
    url: "/admin/tags",
    icon: Tags,
  },
  {
    title: "Thống kê",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Cài đặt",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="flex items-center gap-2 px-4 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Megaphone className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">Loa Phường</h2>
              <p className="text-xs text-muted-foreground">Hệ thống quản trị</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu chính</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
