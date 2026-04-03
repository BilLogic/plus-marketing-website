"use client"

import { Fragment } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { NAV_CONFIG } from "./nav-config"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

type DesktopNavProps = {
  className?: string
}

export const DesktopNav = ({ className }: DesktopNavProps) => {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {NAV_CONFIG.map((item) => (
          <NavigationMenuItem key={item.label}>
            {item.children ? (
              <>
                <NavigationMenuTrigger className="text-sm">
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-2 md:w-[480px] md:grid-cols-2">
                    {item.children.map((section, sIdx) => (
                      <Fragment key={sIdx}>
                        {section.heading && (
                          <li className="col-span-full px-3 pt-2 pb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase list-none">
                            {section.heading}
                          </li>
                        )}
                        {section.items.map((child) => (
                          <li key={`${item.label}-${child.href}-${child.label}`}>
                            <Link
                              href={child.href}
                              data-slot="navigation-menu-link"
                              className="flex select-none items-start gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1"
                            >
                              {child.icon && (
                                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/50">
                                  <child.icon className="size-4 text-muted-foreground" />
                                </span>
                              )}
                              <div className="flex flex-col gap-1">
                                <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
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
                            </Link>
                          </li>
                        ))}
                      </Fragment>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link
                href={item.href!}
                data-slot="navigation-menu-link"
                className={cn(navigationMenuTriggerStyle(), "text-sm")}
              >
                {item.label}
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
