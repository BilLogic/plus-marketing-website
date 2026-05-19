"use client"

import { Fragment } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NAV_CONFIG,
  NAV_DROPDOWN_PANEL_STYLE,
  navDropdownHoverCloseDelayMs,
  navDropdownHoverOpenDelayMs,
  navDropdownItemClass,
  navDropdownLabelClass,
  navDropdownListClass,
  navDropdownTriggerClass,
} from "./nav-config"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

type DesktopNavProps = {
  className?: string
}

export const DesktopNav = ({ className }: DesktopNavProps) => {
  const router = useRouter()
  return (
    <NavigationMenu
      className={className}
      delay={navDropdownHoverOpenDelayMs}
      closeDelay={navDropdownHoverCloseDelayMs}
    >
      <NavigationMenuList>
        {NAV_CONFIG.map((item) => (
          <NavigationMenuItem key={item.label}>
            {item.children ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    navDropdownTriggerClass,
                    item.href && "cursor-pointer",
                    "text-base min-[1800px]:text-lg",
                  )}
                  {...(item.href ? { onClick: () => router.push(item.href!) } : {})}
                >
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className={navDropdownListClass} style={NAV_DROPDOWN_PANEL_STYLE}>
                    {item.children.map((section, sIdx) => (
                      <Fragment key={sIdx}>
                        {section.heading && (
                          <li className="col-span-full px-3 pt-2 pb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase list-none">
                            {section.heading}
                          </li>
                        )}
                        {section.items.map((child) => (
                          <li key={`${item.label}-${child.href}-${child.label}`}>
                            <NavigationMenuLink
                              closeOnClick
                              render={
                                <Link href={child.href} className={navDropdownItemClass} />
                              }
                            >
                              {child.icon && (
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/50">
                                  <child.icon className="size-4 text-muted-foreground" />
                                </span>
                              )}
                              <div className="flex items-center">
                                <span
                                  className={cn(
                                    navDropdownLabelClass,
                                    "flex items-center gap-1.5",
                                  )}
                                >
                                  {child.label}
                                  {child.badge && (
                                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                                      {child.badge}
                                    </span>
                                  )}
                                </span>
                                {child.description && (
                                  <span className="line-clamp-2 text-xs text-muted-foreground">
                                    {child.description}
                                  </span>
                                )}
                              </div>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </Fragment>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                render={
                  <Link
                    href={item.href!}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-base min-[1800px]:text-lg",
                    )}
                  />
                }
              >
                {item.label}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
