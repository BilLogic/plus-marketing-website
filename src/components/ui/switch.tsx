"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-0 p-0.5 transition-colors duration-150 outline-none after:absolute after:-inset-x-3 after:-inset-y-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:ring-2 aria-invalid:ring-(--ds-border-danger) data-[size=default]:h-5 data-[size=default]:w-10 data-[size=sm]:h-4 data-[size=sm]:w-8 data-checked:bg-(--ds-background-selected-bold) data-checked:hover:bg-(--ds-background-selected-bold-hovered) data-unchecked:bg-(--ds-background-neutral-bold) data-unchecked:hover:bg-(--ds-background-neutral-bold-hovered) data-disabled:cursor-not-allowed data-disabled:bg-(--ds-background-disabled)",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-(--ds-icon-inverse) ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-5 group-data-[size=sm]/switch:data-checked:translate-x-4 group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
