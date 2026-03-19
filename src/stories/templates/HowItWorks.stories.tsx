import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { forSchoolsAssets } from "@/components/marketing/for-schools-assets"
import { BunduiHowItWorksSection } from "@/components/registry/bundui/how-it-works-section"

const meta = {
  title: "Templates/HowItWorks",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

const experienceSteps = [
  {
    title: "Expert Kickoff",
    body: "We onboard your faculty and send specialists to your campus for a hands-on kickoff, ensuring a seamless integration into your school's daily schedule.",
    variant: "filled" as const,
  },
  {
    title: "1:1 Certified Tutoring",
    variant: "outlined" as const,
  },
  {
    title: "Goal-Driven Monitoring",
    variant: "outlined" as const,
  },
  {
    title: "The Teacher Loop",
    variant: "outlined" as const,
  },
]

/** “Your Day-to-Day Experience with PLUS” — grid layout, step variants, optional image. */
export const BunduiHowItWorks: Story = {
  render: () => (
    <div className="bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <BunduiHowItWorksSection
          sectionLabel="Experience"
          sectionTitle="Your Day-to-Day Experience with PLUS"
          sectionDescription="A seamless integration designed to support your faculty and accelerate student growth."
          layout="grid"
          steps={experienceSteps}
          imageSrc={forSchoolsAssets.images.experience}
          imageAlt=""
        />
      </div>
    </div>
  ),
}

