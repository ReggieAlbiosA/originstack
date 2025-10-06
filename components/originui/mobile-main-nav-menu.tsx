"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Route } from "next"

import { Button } from "@/components/shadcn-ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../shadcn-ui/accordion"
import { ChevronRightIcon } from "lucide-react"
import { type NavItem } from "@/components/client/navigation-menu"
import { SiGithub } from "react-icons/si"
import { MobileThemeToggle } from "../client/theme-toggle"

interface MenuButtonProps {
    className?: string
    navigationItems?: NavItem[]
}



export default function MobileMainNavMenu({ className, navigationItems = [] }: MenuButtonProps) {
    const [open, setOpen] = useState<boolean>(false)

    const overrideAccordionItemClass = "border-b-0 "
    const overrideAccordionTriggerClass = "hover:no-underline hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-3 rounded-md"
    const overrideAccordionTriggerIcon = <ChevronRightIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
    const overrideAccordionContentClass = "px-2 py-3 flex flex-col gap-3"

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [open])

    // Auto-close menu when screen reaches md: breakpoint
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && open) {
                setOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [open])



    return (
        <>

            <Button
                className={`group ${className} z-[9999]`}
                variant="outline"
                size="icon"
                onClick={() => setOpen((prevState) => !prevState)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
            >
                <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4 12L20 12"
                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                        d="M4 12H20"
                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                        d="M4 12H20"
                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                </svg>
            </Button>

            {open && (
                <div className="fixed overflow-auto inset-0 bg-white dark:bg-zinc-900 px-5 pb-4 flex flex-col gap-3 w-screen h-screen z-[9998]">
                    <div className="sticky top-0 pt-18 bg-white dark:bg-zinc-900" />

                    <Button asChild>
                        <a href="https://github.com/originstack/originstack" target="_blank" rel="noopener noreferrer">
                            <SiGithub className="w-6 h-6" />
                            <span>Github</span>
                        </a>
                    </Button>

                    <Accordion
                        type="single"
                        collapsible
                        className="w-full "
                    >
                        {navigationItems.map((item, index) => (
                            item.type === "sub" && item.children ? (
                                <AccordionItem key={index} value={`item-${index}`} className={overrideAccordionItemClass}>
                                    <AccordionTrigger
                                        className={overrideAccordionTriggerClass}
                                        overrideIcon={overrideAccordionTriggerIcon as React.ReactNode}
                                    >
                                        {item.label}
                                    </AccordionTrigger>
                                    <AccordionContent className={overrideAccordionContentClass}>
                                        {item.children.map((child, childIndex) => (
                                            <Link
                                                key={childIndex}
                                                href={(child.href || "#") as Route}
                                                onClick={() => setOpen(false)}
                                                className="flex flex-col gap-1 py-2 px-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
                                            >
                                                <span className="font-medium text-sm">{child.label}</span>
                                                {child.description && (
                                                    <span className="text-sm text-zinc-500 dark:text-zinc-400 text-balance">
                                                        {child.description}
                                                    </span>
                                                )}
                                            </Link>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            ) : item.type === "main" && item.href ? (
                                <div key={index} className="py-1">
                                    <Link
                                        href={item.href as Route}
                                        onClick={() => setOpen(false)}
                                        className={`block ${overrideAccordionTriggerClass} font-medium`}
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            ) : null
                        ))}
                    </Accordion>

                    <hr className="border-zinc-200 dark:border-zinc-800" />

                    <div className="flex justify-between">
                        <span className="py-2 px-2 text-zinc-900 dark:text-zinc-100">Theme</span>
                        <MobileThemeToggle />
                    </div>
                </div>
            )}
        </>
    )
}
