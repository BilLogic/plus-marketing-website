"use client"

import { useState, Fragment } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { NAV_CONFIG } from "./nav-config"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

type MobileNavProps = {
  className?: string
}

/** Chevron column width — matches across link+trigger rows and full-width dropdown rows. */
const MOBILE_NAV_DROPDOWN_CHEVRON_W = "w-10 shrink-0"

const mobileNavDropdownLabelClass =
  "flex min-h-10 min-w-0 flex-1 items-center px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"

const mobileNavDropdownChevronTriggerClass = cn(
  MOBILE_NAV_DROPDOWN_CHEVRON_W,
  "group flex min-h-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
)

const mobileNavDemoCtaClass =
  "inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-[#a6edf4] px-3 text-sm font-normal text-[#004247] transition-opacity hover:opacity-90 whitespace-nowrap sm:px-4 sm:text-base"
const mobileNavLoginClass =
  "inline-flex h-7 shrink-0 items-center justify-center rounded-lg px-2 text-sm font-medium text-[#62636c] transition-opacity hover:opacity-60 whitespace-nowrap sm:px-2.5 sm:text-base"

/** Slightly tighter in the drawer toolbar so logo + CTAs + X fit on narrow sheets. */
const mobileNavSheetToolbarDemoClass =
  "inline-flex h-8 shrink-0 items-center justify-center rounded-full bg-[#a6edf4] px-2.5 text-xs font-normal text-[#004247] transition-opacity hover:opacity-90 whitespace-nowrap sm:h-9 sm:px-3 sm:text-sm"
const mobileNavSheetToolbarLoginClass =
  "inline-flex h-7 shrink-0 items-center justify-center rounded-lg px-1.5 text-xs font-medium text-[#62636c] transition-opacity hover:opacity-60 whitespace-nowrap sm:px-2 sm:text-sm"

export const MobileNav = ({ className }: MobileNavProps) => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className={cn("flex min-w-0 items-center justify-end gap-2 sm:gap-2.5", className)}>
        {!open ? (
          <>
            <a
              href="https://app.tutors.plus/demo"
              target="_blank"
              rel="noopener noreferrer"
              className={mobileNavDemoCtaClass}
            >
              Try Demo
            </a>
            <a
              href="https://app.tutors.plus/login"
              target="_blank"
              rel="noopener noreferrer"
              className={mobileNavLoginClass}
            >
              Log In
            </a>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon-sm" aria-label="Open menu" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
          </>
        ) : null}
      </div>

      <SheetContent side="right" showCloseButton={false} className="gap-0 p-0">
        <SheetTitle className="sr-only">Site navigation</SheetTitle>

        {/* Top toolbar — match main header `h-14` band; symmetric vertical padding. */}
        <div className="flex h-14 min-w-0 shrink-0 items-center border-b border-border/40 px-4">
          <Link
            href="/"
            onClick={close}
            className="flex min-w-0 shrink-0 items-center gap-2"
          >
            <img
              src="/brand/plus-icon-gradient.svg"
              alt=""
              className="size-8 shrink-0"
            />
            <img
              src="/brand/plus-logo-dark.svg"
              alt="PLUS"
              className="h-5 shrink-0"
            />
          </Link>
          <div className="ml-auto flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href="https://app.tutors.plus/demo"
              target="_blank"
              rel="noopener noreferrer"
              className={mobileNavSheetToolbarDemoClass}
            >
              Try Demo
            </a>
            <a
              href="https://app.tutors.plus/login"
              target="_blank"
              rel="noopener noreferrer"
              className={mobileNavSheetToolbarLoginClass}
            >
              Log In
            </a>
            <SheetClose
              render={
                <Button variant="ghost" size="icon-sm" className="shrink-0" aria-label="Close menu" />
              }
            >
              <X className="size-5" />
            </SheetClose>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-8 pt-4">
          <ul className="flex flex-col gap-1">
            {NAV_CONFIG.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <Collapsible>
                    {item.href ? (
                      <div className="flex min-w-0 items-stretch rounded-md">
                        <Link
                          href={item.href}
                          onClick={close}
                          className={cn(mobileNavDropdownLabelClass, "rounded-l-md rounded-r-none")}
                        >
                          {item.label}
                        </Link>
                        <CollapsibleTrigger
                          className={cn(mobileNavDropdownChevronTriggerClass, "rounded-l-none rounded-r-md")}
                          aria-label={`Toggle ${item.label} menu`}
                        >
                          <ChevronDown
                            className="size-4 transition-transform duration-200 group-data-[panel-open]:rotate-180"
                            aria-hidden
                          />
                        </CollapsibleTrigger>
                      </div>
                    ) : (
                      <CollapsibleTrigger
                        className={cn(
                          "group flex w-full min-w-0 items-stretch rounded-md p-0 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        )}
                      >
                        <span className={mobileNavDropdownLabelClass}>{item.label}</span>
                        <span
                          className={cn(
                            MOBILE_NAV_DROPDOWN_CHEVRON_W,
                            "flex min-h-10 items-center justify-center text-muted-foreground",
                          )}
                          aria-hidden
                        >
                          <ChevronDown className="size-4 transition-transform duration-200 group-data-[panel-open]:rotate-180" />
                        </span>
                      </CollapsibleTrigger>
                    )}
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
                                  onClick={close}
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
                    onClick={close}
                    className="flex min-h-10 items-center rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
