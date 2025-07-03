"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type UserRole = "superadmin" | "admin" | "seller" | "buyer";

interface SidebarMenuItemType {
  title: string;
  url?: string;
  children?: SidebarMenuItemType[];
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: UserRole;
}

const menuByRole: Record<UserRole, SidebarMenuItemType[]> = {
  superadmin: [
    { title: "Dashboard", url: "/superadmin/dashboard" },
    { title: "Manage Admins", url: "/superadmin/admins" },
    { title: "Manage Sellers", url: "/superadmin/sellers" },
    { title: "Manage Buyers", url: "/superadmin/buyers" },
    { title: "All Properties", url: "/superadmin/properties" },
    { title: "Reports", url: "/superadmin/reports" },
  ],
  admin: [
    { title: "Dashboard", url: "/admin/dashboard" },
    { title: "Buyers", url: "/admin/buyers" },
    { title: "Sellers", url: "/admin/sellers" },
    {
      title: "Properties",
      children: [
        { title: "Pending", url: "/admin/properties/pending" },
        { title: "Approved", url: "/admin/properties/approved" },
        { title: "Rejected", url: "/admin/properties/rejected" },
      ],
    },
    { title: "Reported Listings", url: "/admin/reports" },
    { title: "Block/Unblock Users", url: "/admin/users/block" },
  ],
  seller: [
    { title: "Dashboard", url: "/seller/dashboard" },
    { title: "My Properties", url: "/seller/properties" },
    { title: "Add Property", url: "/seller/properties/add" },
    // ❌ Removed "Edit Property" from static menu
    { title: "Buyer Messages", url: "/seller/messages" },
  ],
  buyer: [
    { title: "Browse Properties", url: "/properties" },
    { title: "Favorites", url: "/buyer/favorites" },
    { title: "My Inquiries", url: "/buyer/inquiries" },
    { title: "Add Inquiry", url: "/buyer/inquiries/add" },
    { title: "Schedule Visit", url: "/buyer/visit" },
    { title: "Profile", url: "/buyer/profile" },
  ],
};

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const menus = menuByRole[userRole];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h2 className="text-lg font-semibold px-4 pt-3 capitalize">
          {userRole} Panel
        </h2>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {menus?.map((item) =>
          item.children ? (
            <Collapsible key={item.title} defaultOpen>
              <SidebarGroup>
                <SidebarGroupLabel asChild className="group/label text-sm">
                  <CollapsibleTrigger>
                    {item.title}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item.children.map((child) => (
                        <SidebarMenuItem key={child.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname.startsWith(child.url ?? "")}
                          >
                            <a href={child.url}>{child.title}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ) : (
            <SidebarGroup key={item.title}>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.url ?? "")}
                  >
                    <a href={item.url}>{item.title}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          )
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
