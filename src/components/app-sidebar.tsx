import { Link } from "react-router";
import Logo from "../assets/icon/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "./ui/sidebar";
import { useUserInfoQuery } from "../redux/features/auth/auth.api";
import { getRoleRoutes } from "../utils/getRoleRoutes";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);
  const role = userData?.data?.role || "receiver";
  const data = getRoleRoutes(role) || [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to="/">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data?.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <span className="font-medium">{item.title}</span>
                </SidebarMenuButton>

                {Array.isArray(item.items) && item.items.length > 0 && (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={subItem.url}>{subItem.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
