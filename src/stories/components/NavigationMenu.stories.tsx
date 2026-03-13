import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CultNavbar } from "@/components/registry/cult/navbar"

/** A top-level navigation component for site-wide or section-wide links. */
const meta = {
  title: "components-marketing/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

/** Overview of navigation menu patterns across registries. */
export const Overview: Story = {
  render: () => (
    <Tabs defaultValue="shadcn">
      <TabsList variant="line" className="mb-4 w-full justify-start">
        <TabsTrigger value="shadcn">Base (shadcn)</TabsTrigger>
        <TabsTrigger value="tailark">Tailark</TabsTrigger>
        <TabsTrigger value="cult-ui">Cult UI</TabsTrigger>
      </TabsList>

      <TabsContent value="shadcn">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/components">Components</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/examples">Examples</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </TabsContent>

      <TabsContent value="tailark">
        <div className="rounded-full border border-border/70 bg-background/80 px-4 py-2 shadow-sm">
          <NavigationMenu>
            <NavigationMenuList className="gap-4 text-xs font-medium text-muted-foreground sm:text-sm">
              <NavigationMenuItem>
                <NavigationMenuLink href="#features">Features</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#templates">Templates</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#pricing">Pricing</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </TabsContent>

      <TabsContent value="cult-ui">
        <CultNavbar />
      </TabsContent>
    </Tabs>
  ),
}

/** A simple navigation menu with several link items. */
export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs">
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/components">
            Components
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/examples">
            Examples
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
