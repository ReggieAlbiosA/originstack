"use client"

import * as React from "react"
import Link from "next/link"
import { Route } from "next"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// ============================================================================
// Types
// ============================================================================

export type NavItem = {
    label: string
    href?: string
    type: "main" | "sub"
    description?: string
    children?: NavItem[]
}

interface CustomNavigationMenuProps {
    className?: string
    items: NavItem[]
    dropDownContent?: React.ReactNode
}

// ============================================================================
// Main Navigation Component
// ============================================================================

export default function CustomNavigationMenu({ className, items, dropDownContent }: CustomNavigationMenuProps) {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null)
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
    const menuRef = React.useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenIndex(null)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleMouseEnter = (index: number, hasChildren: boolean) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        if (hasChildren) {
            setOpenIndex(index)
        }
    }

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            setOpenIndex(null)
        }, 150)
    }

    const handleTriggerClick = (index: number, hasChildren: boolean) => {
        if (hasChildren) {
            setOpenIndex(openIndex === index ? null : index)
        }
    }

    return (
        <nav ref={menuRef} className={cn("relative flex items-center", className)}>
            <ul className="flex items-center gap-1">
                {items.map((item, index) => {
                    const isOpen = openIndex === index
                    const hasChildren = Boolean(item.type === "sub" && item.children && item.children.length > 0)

                    return (
                        <li
                            key={index}
                            className="relative"
                            onMouseEnter={() => handleMouseEnter(index, hasChildren)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {item.type === "main" && item.href ? (
                                <Link
                                    href={item.href as Route}
                                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-ring/50 transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
                                >
                                    {item.label}
                                </Link>
                            ) : hasChildren ? (
                                <>
                                    <button
                                        onClick={() => handleTriggerClick(index, hasChildren)}
                                        aria-expanded={isOpen}
                                        className={cn(
                                            "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow]",
                                            "hover:bg-accent hover:text-accent-foreground",
                                            "focus:bg-accent focus:text-accent-foreground",
                                            "outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
                                            "disabled:pointer-events-none disabled:opacity-50",
                                            isOpen && "bg-accent/50 text-accent-foreground"
                                        )}
                                    >
                                        {item.label}
                                        <ChevronDownIcon
                                            className={cn(
                                                "relative top-[1px] ml-1 size-3 transition-transform duration-300",
                                                isOpen && "rotate-180"
                                            )}
                                            aria-hidden="true"
                                        />
                                    </button>

                                    {/* Dropdown Content */}
                                    {isOpen && item.children && (
                                        <div
                                            className={cn(
                                                "absolute right-0 top-full mt-1.5 w-auto z-50",
                                                "origin-top-right",
                                                "animate-in fade-in-0 zoom-in-95 duration-200",
                                                "overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg"
                                            )}
                                            onMouseEnter={() => {
                                                if (timeoutRef.current) {
                                                    clearTimeout(timeoutRef.current)
                                                }
                                            }}
                                        >
                                            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                {item.children.map((child, childIndex) => (
                                                    <ClientList onClick={() => setOpenIndex(null)}>
                                                        <ListItem
                                                            key={childIndex}
                                                            title={child.label}
                                                            href={child.href || "#"}
                                                            description={child.description}
                                                        // onClick={() => setOpenIndex(null)}
                                                        />
                                                    </ClientList>
                                                ))}
                                            </ul>
                                        </div>
                                        // dropDownContent
                                    )}
                                </>
                            ) : null}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

// ============================================================================
// List Item Component
// ============================================================================

interface ClientListProps {
    onClick?: () => void
    children: React.ReactNode
}

export function ClientList({ onClick, children }: ClientListProps) {
    return (
        <div onClick={onClick}>
            {children}
        </div>
    )
}

interface ListItemProps {
    title: string
    description?: string
    href: string
}


function ListItem({ title, description, href }: ListItemProps) {
    return (
        <li>
            <Link
                href={href as Route}
                className={cn(
                    "flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground",
                    "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1"
                )}
            >
                <div className="text-sm leading-none font-medium">{title}</div>
                {description && (
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {description}
                    </p>
                )}
            </Link>
        </li>
    )
}


