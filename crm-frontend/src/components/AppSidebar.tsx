import React from 'react'
<<<<<<< HEAD
import { Calendar, Contact, Database, Home, Inbox, Settings, Star } from "lucide-react"
import Image from "next/image"
=======
import { Calendar, Contact, Database, Home, Inbox, Link, Settings, Star } from "lucide-react"
import Image from "next/image"

>>>>>>> main
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
<<<<<<< HEAD
 
=======

>>>>>>> main
// Menu items.
const items = [
  {
    title: "Dashboard",
<<<<<<< HEAD
    url: "/",
=======
    url: "/pages/dashboard",
>>>>>>> main
    icon: Home,
  },
  {
    title: "Tasks",
<<<<<<< HEAD
    url: "#",
=======
    url: "/pages/tasks",
>>>>>>> main
    icon: Inbox,
  },
  {
    title: "Calendar",
<<<<<<< HEAD
    url: "#",
=======
    url: "/pages/calendar",
>>>>>>> main
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
<<<<<<< HEAD
=======
              <a href="/">
>>>>>>> main
              <Image
                className="dark:invert"
                src="/KXARLOGO.svg"
                alt="KXAR logo"
                width={50}
                height={25}
                priority
              />
<<<<<<< HEAD
=======
              </a>
>>>>>>> main
            
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
