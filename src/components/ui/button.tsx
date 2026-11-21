"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[0.375rem] border border-transparent bg-clip-padding text-sm/5 font-medium tracking-(--ds-body-default-tracking) whitespace-nowrap transition-colors duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-(--ds-background-brand-bold-hovered) active:bg-(--ds-background-brand-bold-pressed)",
        outline:
          "border-border bg-background hover:bg-(--ds-background-neutral-subtle-hovered) hover:text-foreground active:bg-(--ds-background-neutral-subtle-pressed) aria-expanded:bg-(--ds-background-neutral-subtle-hovered) aria-expanded:text-foreground",
        secondary:
          "bg-(--ds-background-neutral) text-secondary-foreground hover:bg-(--ds-background-neutral-hovered) active:bg-(--ds-background-neutral-pressed) aria-expanded:bg-(--ds-background-neutral-hovered) aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-(--ds-background-neutral-subtle-hovered) hover:text-foreground active:bg-(--ds-background-neutral-subtle-pressed) aria-expanded:bg-(--ds-background-neutral-subtle-hovered) aria-expanded:text-foreground",
        destructive:
          "bg-(--ds-background-danger-bold) text-(--ds-text-inverse) hover:bg-(--ds-background-danger-bold-hovered) active:bg-(--ds-background-danger-bold-pressed) focus-visible:ring-destructive",
        link: "text-(--ds-link) underline-offset-4 hover:underline active:text-(--ds-link-pressed)",
        /** PLUS nav “Tutor Login” pill — bg #A6EDF4, text #004247 */
        plusNavCta:
          "border-transparent bg-[#A6EDF4] text-[#004247] shadow-none hover:bg-[#A6EDF4] hover:text-[#004247] hover:opacity-95 [&_svg]:text-[#004247]",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-(--ds-radius-md) px-2 text-xs/4 in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-(--ds-radius-md) px-2.5 in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-(--ds-radius-md) in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-(--ds-radius-md) in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
        /** Pill used with `plusNavCta` — matches BunduiNavbar Tutor Login */
        navCta:
          "h-auto min-h-10 gap-3 rounded-full px-4 py-2 text-base/6 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

/** Class string for `<Link>` CTAs that should match `Button variant="plusNavCta" size="navCta"`. */
const plusNavCtaLinkClassName = cn(
  buttonVariants({ variant: "plusNavCta", size: "navCta" }),
  "inline-flex items-center justify-center no-underline"
)

export { Button, buttonVariants, plusNavCtaLinkClassName }
