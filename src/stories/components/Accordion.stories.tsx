import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/** Accordion displays collapsible content panels for presenting information in a limited space. */
const meta = {
  title: "components-marketing/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

/** Overview of Accordion patterns across registries. */
export const Overview: Story = {
  render: () => (
    <Tabs defaultValue="shadcn">
      <TabsList variant="line" className="mb-4 w-full justify-start">
        <TabsTrigger value="shadcn">Base (shadcn)</TabsTrigger>
        <TabsTrigger value="tailark">Tailark</TabsTrigger>
        <TabsTrigger value="bundui">Bundui</TabsTrigger>
        <TabsTrigger value="plus">Plus</TabsTrigger>
      </TabsList>
      {/* Reuse the same content as the Comparison story */}
      <TabsContent value="shadcn">
        <Accordion value={[0]}>
          <AccordionItem>
            <AccordionTrigger>What are your shipping options?</AccordionTrigger>
            <AccordionContent>
              We offer standard (5–7 days), express (2–3 days), and overnight shipping. Free
              shipping on international orders.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              Returns are accepted within 30 days of purchase. Items must be in original condition
              with tags attached.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
      {/* Tailark / Bundui / Plus tabs are defined in the Comparison story below */}
    </Tabs>
  ),
}

/** Default accordion with the first item expanded. */
export const Default: Story = {
  render: () => (
    <Accordion value={[0]}>
      <AccordionItem>
        <AccordionTrigger>What are your shipping options?</AccordionTrigger>
        <AccordionContent>
          We offer standard (5–7 days), express (2–3 days), and overnight shipping. Free shipping on
          international orders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          Returns are accepted within 30 days of purchase. Items must be in original condition with
          tags attached.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
        <AccordionContent>
          You can reach our support team via email, live chat, or phone 24/7 for all plans.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/** Comparison view using tabs to switch between registry-inspired and Plus accordion patterns. */
export const Comparison: Story = {
  render: () => (
    <Tabs defaultValue="shadcn">
      <TabsList variant="line" className="mb-4 w-full justify-start">
        <TabsTrigger value="shadcn">Base (shadcn)</TabsTrigger>
        <TabsTrigger value="tailark">Tailark</TabsTrigger>
        <TabsTrigger value="bundui">Bundui</TabsTrigger>
        <TabsTrigger value="plus">Plus</TabsTrigger>
      </TabsList>

      <TabsContent value="shadcn">
        <Accordion value={[0]}>
          <AccordionItem>
            <AccordionTrigger>What are your shipping options?</AccordionTrigger>
            <AccordionContent>
              We offer standard (5–7 days), express (2–3 days), and overnight shipping. Free
              shipping on international orders.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              Returns are accepted within 30 days of purchase. Items must be in original condition
              with tags attached.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>

      <TabsContent value="tailark">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
            Tailark (registry)
          </p>
          <Accordion value={[0]} className="divide-y divide-border/60 rounded-xl border">
            <AccordionItem>
              <AccordionTrigger className="px-4 py-3 text-left text-sm font-medium">
                How does Tailark-style FAQ look?
              </AccordionTrigger>
              <AccordionContent className="bg-card/60 px-4 pb-4 pt-0 text-xs text-muted-foreground">
                This variant leans on clear dividers, compact copy, and subtle radius to echo
                Tailark&apos;s FAQ and pricing accordions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger className="px-4 py-3 text-left text-sm font-medium">
                Where would we use this?
              </AccordionTrigger>
              <AccordionContent className="bg-card/60 px-4 pb-4 pt-0 text-xs text-muted-foreground">
                Ideal for pricing, onboarding, and product-overview FAQs that sit under Tailark-like
                hero and pricing blocks.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </TabsContent>

      <TabsContent value="bundui">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
            Bundui (blocks kit)
          </p>
          <Accordion value={[0]} className="rounded-xl border bg-card/70 px-1 py-1">
            <AccordionItem>
              <AccordionTrigger className="rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-background/60">
                Subscription &amp; billing FAQ
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-3 pt-0 text-xs text-muted-foreground">
                Bundui leans on soft radii, card-like surfaces, and concise copy for subscription
                questions. This mirrors that pattern while using Plus tokens.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger className="rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-background/60">
                Can I change plans later?
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-3 pt-0 text-xs text-muted-foreground">
                Yes, upgrade or downgrade any time — this accordion lives near Bundui-style pricing
                templates.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </TabsContent>

      <TabsContent value="plus">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
            Plus
          </p>
          <Accordion value={[0]}>
            <AccordionItem>
              <AccordionTrigger>Plus-styled marketing FAQ</AccordionTrigger>
              <AccordionContent>
                Currently matches the base styling; we&apos;ll evolve this into a Plus-specific
                variant once registry coverage is complete.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </TabsContent>
    </Tabs>
  ),
}
