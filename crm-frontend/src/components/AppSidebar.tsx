import React from 'react'
import { Calendar, Contact, Database, Home, Inbox, Search, Settings, Star } from "lucide-react"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Tasks",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Databases",
    url: "#",
    icon: Database,
  },
  {
    title: "Contacts",
    url: "#",
    icon: Contact,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Our Team",
    url: "#",
    icon: Star,
  },
]

export const AppSidebar = () => {
  return (
    <Sidebar>
        <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel>
              <Image
                className="dark:invert"
                src="/KXARLOGO.svg"
                alt="KXAR logo"
                width={50}
                height={25}
                priority
              />
            
            </SidebarGroupLabel>
            <SidebarGroupContent>
            <SidebarMenu>
                {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                    <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                    </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  )
}
