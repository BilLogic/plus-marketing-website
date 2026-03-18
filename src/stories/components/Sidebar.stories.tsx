import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  HomeIcon,
  InboxIcon,
  CalendarIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react"

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
  SidebarProvider,
} from "@/components/ui/sidebar"

/** An application sidebar with collapsible groups, menus, and mobile support. */
const meta = {
  title: "Components/Sidebar",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const navItems = [
  { title: "Home", icon: HomeIcon },
  { title: "Inbox", icon: InboxIcon },
  { title: "Calendar", icon: CalendarIcon },
  { title: "Search", icon: SearchIcon },
  { title: "Settings", icon: SettingsIcon },
]

/** A basic sidebar with a single navigation group. */
export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex min-h-[400px] w-full">
        <Sidebar>
          <SidebarHeader className="p-4 font-semibold">
            My App
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex flex-1 items-center justify-center bg-background">
          <p className="text-muted-foreground">Main content area</p>
        </main>
      </div>
    </SidebarProvider>
  ),
}
