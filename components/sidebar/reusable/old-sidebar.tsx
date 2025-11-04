"use client"

import Link from "next/link"
import { Route } from "next"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import VersionNavigation from "@/app/(hosting-calculator)/hosting-calculator/full-stack/vercel/page"

// ============================================================================
// Types
// ============================================================================

export type SidebarLinkItem = {
    label: string
    href: string
    description?: string
}

export type SidebarSection = {
    title?: string // Optional - if no title, items will be rendered without a section header
    collapsible?: boolean // Whether the section can be collapsed (default: true if title exists)
    defaultOpen?: boolean // Whether the section is open by default (default: true)
    items: (SidebarLinkItem | SidebarParentItem)[]
}

export type SidebarParentItem = {
    label?: string
    href?: string // Parent can optionally have its own link
    collapsible?: boolean // Whether children can be collapsed (default: true)
    defaultOpen?: boolean // Whether children are shown by default (default: false)
    children: SidebarLinkItem[]
}

export type SidebarConfig = {
    sections: SidebarSection[]
}

// ============================================================================
// Type Guards
// ============================================================================

function isParentItem(item: SidebarLinkItem | SidebarParentItem): item is SidebarParentItem {
    return 'children' in item && Array.isArray(item.children)
}

// ============================================================================
// Components
// ============================================================================

interface SidebarProps {
    config: SidebarConfig
    className?: string
}

export default function Sidebar({ config, className }: SidebarProps) {
    return (
        <aside className={cn(
            "w-70 h-[calc(100vh-66px)] sticky top-[65px] overflow-y-auto border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900",
            className
        )} role="complementary" aria-label="Sidebar navigation">
            <nav className="p-4 py-6 space-y-6 flex flex-col " role="navigation" aria-label="Table of contents">

                <VersionNavigation />

                {config.sections.map((section, index) => (
                    <SidebarSectionComponent key={index} section={section} />
                ))}

            </nav>
        </aside>
    )
}

// ============================================================================
// Section Component
// ============================================================================

interface SidebarSectionComponentProps {
    section: SidebarSection
}

function SidebarSectionComponent({ section }: SidebarSectionComponentProps) {
    const hasTitle = !!section.title
    const isCollapsible = section.collapsible ?? hasTitle
    const [isOpen, setIsOpen] = useState(section.defaultOpen ?? true)

    // If section has a title
    if (hasTitle) {
        if (isCollapsible) {
            return (
                <section className="space-y-2" aria-labelledby={`section-${section.title?.toLowerCase().replace(/\s+/g, '-')}`}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-controls={`section-content-${section.title?.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center justify-between w-full text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                    >
                        <span id={`section-${section.title?.toLowerCase().replace(/\s+/g, '-')}`}>{section.title}</span>
                        <ChevronRight
                            className={cn(
                                "w-3 h-3 transition-transform duration-200",
                                isOpen && "rotate-90"
                            )}
                            aria-hidden="true"
                        />
                    </button>
                    {isOpen && (
                        <div id={`section-content-${section.title?.toLowerCase().replace(/\s+/g, '-')}`} className="space-y-1" role="region" aria-labelledby={`section-${section.title?.toLowerCase().replace(/\s+/g, '-')}`}>
                            {section.items.map((item, index) => (
                                <SidebarItemComponent key={index} item={item} />
                            ))}
                        </div>
                    )}
                </section>
            )
        } else {
            return (
                <section className="space-y-2" aria-labelledby={`section-${section.title?.toLowerCase().replace(/\s+/g, '-')}`}>
                    <h3 id={`section-${section.title?.toLowerCase().replace(/\s+/g, '-')}`} className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        {section.title}
                    </h3>
                    <div className="space-y-2" role="region" aria-labelledby={`section-${section.title?.toLowerCase().replace(/\s+/g, '-')}`}>
                        {section.items.map((item, index) => (
                            <SidebarItemComponent key={index} item={item} />
                        ))}
                    </div>
                </section >
            )
        }
    }

    // No title - just render items
    return (
        <div className="space-y-1" role="region">
            {section.items.map((item, index) => (
                <SidebarItemComponent key={index} item={item} />
            ))}
        </div>
    )
}

// ============================================================================
// Item Component
// ============================================================================

interface SidebarItemComponentProps {
    item: SidebarLinkItem | SidebarParentItem
}

function SidebarItemComponent({ item }: SidebarItemComponentProps) {
    if (isParentItem(item)) {
        return <SidebarParentItemComponent item={item} />
    }

    return <SidebarLinkItemComponent item={item} />
}

// ============================================================================
// Link Item Component
// ============================================================================

interface SidebarLinkItemComponentProps {
    item: SidebarLinkItem
    isChild?: boolean
}

function SidebarLinkItemComponent({ item, isChild = false }: SidebarLinkItemComponentProps) {
    const pathname = usePathname()
    const isActive = pathname === item.href

    return (
        <Link
            href={item.href as Route}
            className={cn(
                "block rounded-md px-3 py-2 text-sm transition-colors group relative",
                isChild && "pl-6 py-1.5",
                // Active state
                isActive ? [
                    "bg-zinc-100 dark:bg-zinc-800",
                    "text-zinc-900 dark:text-zinc-100",
                    "border-l-[3px] border-zinc-900 dark:border-zinc-100",
                    "pl-[9px]", // Adjust padding for border (12px - 3px)
                    isChild && "pl-[21px]", // Adjust child padding (24px - 3px)
                ] : [
                    "text-zinc-700 dark:text-zinc-300",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    "hover:text-zinc-900 dark:hover:text-zinc-100",
                ]
            )}
        >
            <div className="flex flex-col gap-0.5">
                <span className={cn(
                    "font-medium",
                    isActive && "font-semibold"
                )}>
                    {item.label}
                </span>
                {item.description && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                        {item.description}
                    </span>
                )}
            </div>
        </Link>
    )
}

// ============================================================================
// Parent Item Component
// ============================================================================

interface SidebarParentItemComponentProps {
    item: SidebarParentItem
}

function SidebarParentItemComponent({ item }: SidebarParentItemComponentProps) {
    const pathname = usePathname()
    const isCollapsible = item.collapsible ?? true
    const [isOpen, setIsOpen] = useState(item.defaultOpen ?? false)
    const isActive = item.href ? pathname === item.href : false

    if (isCollapsible) {
        return (
            <div className="space-y-1">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "flex items-center justify-between w-full rounded-md px-3 py-2 text-sm transition-colors",
                        "text-zinc-700 dark:text-zinc-300",
                        "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                        "hover:text-zinc-900 dark:hover:text-zinc-100"
                    )}
                >
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight
                        className={cn(
                            "w-4 h-4 transition-transform duration-200 flex-shrink-0",
                            isOpen && "rotate-90"
                        )}
                    />
                </button>
                {isOpen && (
                    <div className="space-y-1">
                        {item.children.map((child, index) => (
                            <SidebarLinkItemComponent key={index} item={child} isChild />
                        ))}
                    </div>
                )}
            </div>
        )
    }

    // Non-collapsible parent
    return (
        <div className="space-y-1">
            {item.href ? (
                <Link
                    href={item.href as Route}
                    className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors relative",
                        // Active state
                        isActive ? [
                            "bg-zinc-100 dark:bg-zinc-800",
                            "text-zinc-900 dark:text-zinc-100",
                            "border-l-[3px] border-zinc-900 dark:border-zinc-100",
                            "pl-[9px]", // Adjust padding for border (12px - 3px)
                            "font-semibold"
                        ] : [
                            "text-zinc-700 dark:text-zinc-300",
                            "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                            "hover:text-zinc-900 dark:hover:text-zinc-100",
                            "font-medium"
                        ]
                    )}
                >
                    {item.label}
                </Link>
            ) : (
                <div className="px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {item.label}
                </div>
            )}
            <div className="space-y-1">
                {item.children.map((child, index) => (
                    <SidebarLinkItemComponent key={index} item={child} isChild />
                ))}
            </div>
        </div>
    )
}

