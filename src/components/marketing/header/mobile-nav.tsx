"use client"

import { Fragment } from "react"
import Link from "next/link"
import { Menu, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV_CONFIG } from "./nav-config"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"

type MobileNavProps = {
  className?: string
}

export const MobileNav = ({ className }: MobileNavProps) => {
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Open menu" />
          }
        >
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>
              <Link href="/" className="flex items-center gap-2">
                <img
                  src="/brand/plus-icon-gradient.svg"
                  alt=""
                  className="size-8"
                />
                <img
                  src="/brand/plus-logo-dark.svg"
                  alt="PLUS"
                  className="h-5"
                />
              </Link>
            </SheetTitle>
          </SheetHeader>

          <nav className="flex-1 overflow-y-auto px-4">
            <ul className="flex flex-col gap-1">
              {NAV_CONFIG.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <Collapsible>
                      <div className="flex items-center">
                        {item.href ? (
                          <Link
                            href={item.href}
                            className="flex-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span className="flex-1 px-3 py-2 text-sm font-medium text-foreground">
                            {item.label}
                          </span>
                        )}
                        <CollapsibleTrigger
                          className="flex items-center justify-center rounded-md px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          aria-label={`Toggle ${item.label} menu`}
                        >
                          <ChevronDown className="size-4 transition-transform duration-200 [[data-panel-open]>&]:rotate-180" />
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <ul className="ml-3 flex flex-col gap-0.5 border-l border-border/50 pl-3 pt-1">
                          {item.children.map((section, sIdx) => (
                            <Fragment key={sIdx}>
                              {section.heading && (
                                <li className="px-3 pt-2 pb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                  {section.heading}
                                </li>
                              )}
                              {section.items.map((child) => (
                                <li key={child.href + child.label}>
                                  <Link
                                    href={child.href}
                                    className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                  >
                                    {child.icon && (
                                      <child.icon className="size-4 shrink-0" />
                                    )}
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </Fragment>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      href={item.href!}
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <SheetFooter>
            <Button className="w-full rounded-full" nativeButton={false} render={<Link href="/demo" />}>
              Try PLUS Demo
            </Button>
            <Button variant="outline" className="w-full" nativeButton={false} render={<Link href="/login" />}>
              Log In
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
