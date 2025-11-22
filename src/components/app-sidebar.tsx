"use client"

import {
  Home,
  FileText,
  PlusSquare,
  Folder,
  Edit3,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "My Posts", url: "/posts", icon: FileText },
  { title: "Create Post", url: "/create", icon: PlusSquare },
  { title: "Categories", url: "/categories", icon: Folder },
  { title: "Drafts", url: "/drafts", icon: Edit3 },
  { title: "Settings", url: "/settings", icon: Settings },
]

export default function AppSidebar() {
  return (
    <TooltipProvider>
      <Sidebar
        collapsible="icon"
        className="
          transition-all duration-300 
          overflow-visible 
          bg-white dark:bg-black 
          border-r border-neutral-200 dark:border-neutral-800
        "
      >
        {/* HEADER */}
        <SidebarHeader
          className="
            p-6 
            border-b 
            border-neutral-200 dark:border-neutral-800
          "
        >
          <div
            className="
              flex items-center space-x-3
              group-data-[state=collapsed]:flex-col 
              group-data-[state=collapsed]:space-y-3
              group-data-[state=collapsed]:space-x-0
            "
          >
            {/* ICON + TEXT WRAPPER */}
            <div
              className="
                flex items-center space-x-3 
                group-data-[state=collapsed]:flex-col 
                group-data-[state=collapsed]:space-y-2
                group-data-[state=collapsed]:space-x-0
              "
            >
              {/* Logo */}
              <div
                className="
                  flex h-10 w-10 items-center justify-center rounded-lg 
                  bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black
                  font-bold text-lg
                "
              >
                B
              </div>

              {/* Title + Subtitle */}
              <div className="flex flex-col group-data-[state=collapsed]:hidden">
                <h1 className="text-xl font-bold text-black dark:text-white">
                  BlogsHub
                </h1>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Make your Blogs and Go live now
                </p>
              </div>
            </div>
          </div>
        </SidebarHeader>

        {/* CONTENT */}
        <SidebarContent>
          {/* Navigation Group */}
          <SidebarGroup>
            <SidebarGroupLabel
              className="
                text-xs uppercase tracking-wider 
                text-neutral-500 dark:text-neutral-400 
                px-2 
                group-data-[state=collapsed]:hidden
              "
            >
              Navigation
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          asChild
                          className="
                            hover:bg-neutral-100 dark:hover:bg-neutral-900 
                            transition-colors
                            group-data-[collapsible=icon]:h-12!
                            group-data-[collapsible=icon]:w-12!
                            group-data-[collapsible=icon]:mx-auto
                            group-data-[collapsible=icon]:mt-2
                            group-data-[collapsible=icon]:justify-center
                          "
                        >
                          <a
                            href={item.url}
                            className="flex items-center gap-4 px-3 py-3"
                          >
                            <item.icon
                              className="
                                h-5 w-5 text-black dark:text-white 
                                group-data-[collapsible=icon]:h-6
                                group-data-[collapsible=icon]:w-6
                                shrink-0
                              "
                            />
                            <span
                              className="
                                text-black dark:text-white 
                                whitespace-nowrap font-medium
                                group-data-[collapsible=icon]:hidden
                              "
                            >
                              {item.title}
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </TooltipTrigger>

                      {/* Tooltip for collapsed state */}
                      <TooltipContent
                        side="right"
                        className="bg-black text-white dark:bg-white dark:text-black px-3 py-2"
                      >
                        {item.title}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Stats shown ONLY when collapsed */}
          <SidebarGroup
            className="
              mt-auto border-t 
              border-neutral-200 dark:border-neutral-800 
              pt-4
              group-data-[state=expanded]:hidden
            "
          >
            <SidebarGroupContent>
              <div className="flex flex-col items-center space-y-2 p-2">
                <div className="text-neutral-500 dark:text-neutral-400 text-sm font-semibold">
                  V 1.0
                </div>
                <div className="text-neutral-500 dark:text-neutral-400 text-xs text-center">
                  Blog Platform
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  )
}
