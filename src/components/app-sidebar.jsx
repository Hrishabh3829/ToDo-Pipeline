import * as React from "react"
import {
  BookOpen,
  Bot,
  CheckSquare,
  Command,
  Frame,
  Home,
  LifeBuoy,
  List,
  Map,
  PieChart,
  Clock,
  Calendar,
  Tag,
  Send,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Hrishabh Gupta",
    email: "hrishabh@domain.com",
    avatar: "https://github.com/shadcn.png",
    initials: "HG", 
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
        {
          title: "Recent Tasks",
          url: "#",
        },
      ],
    },
    {
      title: "Task Management",
      url: "#",
      icon: CheckSquare,
      items: [
        {
          title: "All Tasks",
          url: "#",
        },
        {
          title: "Completed Tasks",
          url: "#",
        },
        {
          title: "In Progress",
          url: "#",
        },
        {
          title: "Pending Tasks",
          url: "#",
        },
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: Tag,
      items: [
        {
          title: "Work",
          url: "#",
        },
        {
          title: "Personal",
          url: "#",
        },
        {
          title: "Education",
          url: "#",
        },
        {
          title: "Health",
          url: "#",
        },
      ],
    },
    {
      title: "Schedule",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Today",
          url: "#",
        },
        {
          title: "Upcoming",
          url: "#",
        },
        {
          title: "Weekly View",
          url: "#",
        },
        {
          title: "Monthly Planner",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Team Members",
      url: "#",
      icon: Users,
    },
    {
      title: "Help & Support",
      url: "#", 
      icon: LifeBuoy,
    },
    {
      title: "Analytics",
      url: "#",
      icon: PieChart,
    },
  ],
  projects: [
    {
      name: "Work Projects",
      url: "#",
      icon: CheckSquare,
    },
    {
      name: "Personal Goals",
      url: "#",
      icon: List,
    },
    {
      name: "Team Tasks",
      url: "#",
      icon: Users,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div
                  className="bg-blue-600 text-white flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Task Manager</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-800 pt-2">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
