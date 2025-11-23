"use client"

import {
  Home,
  FileText,
  PlusSquare,
  Folder,
  Edit3,
  Settings,
  HelpCircle,
  Search,
  User,
  CreditCard,
  Bell,
  LogOut,
  MoreVertical,
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
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuthStore from "@/store/authStore"

// Main navigation items
const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "My Blogs", url: "/myblogs", icon: FileText },
  { title: "Create Post", url: "/createblog", icon: PlusSquare },
  { title: "Categories", url: "/categories", icon: Folder },
  { title: "Drafts", url: "/drafts", icon: Edit3 },
  { title: "Settings", url: "/settings", icon: Settings },
]

// Secondary navigation items (should be at bottom)
const secondaryItems = [
  { title: "Search", url: "#", icon: Search },
  { title: "Get Help", url: "#", icon: HelpCircle },
]


function NavSecondary({ items }: { items: typeof secondaryItems }) {
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
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
                      group-data-[collapsible=icon]:justify-center
                    "
                  >
                    <a href={item.url} className="flex items-center gap-4 px-3 py-3">
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
  )
}

function NavUser() {
  const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="
                data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground
                group-data-[collapsible=icon]:h-12!
                group-data-[collapsible=icon]:w-12!
                group-data-[collapsible=icon]:mx-auto
                group-data-[collapsible=icon]:justify-center
                group-data-[collapsible=icon]:px-0!
              "
            >
              <Avatar className="
                h-8 w-8 rounded-lg
                group-data-[collapsible=icon]:h-10
                group-data-[collapsible=icon]:w-10
              ">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded-lg">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
              <MoreVertical className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">
                    {user?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="w-4 h-4 mr-2" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

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
          flex flex-col
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
        <SidebarContent className="flex-1">
          {/* Main Navigation Group */}
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
                {mainItems.map((item) => (
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

          {/* Secondary Navigation - Now at the bottom */}
          <NavSecondary items={secondaryItems} />
        </SidebarContent>

        {/* FOOTER - User Menu */}
        <SidebarFooter className="p-2 border-t border-neutral-200 dark:border-neutral-800">
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  )
}