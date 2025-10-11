"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/shadcn-ui/button"
import Sidebar, { type SidebarConfig } from "./sidebar"
import { cn } from "@/lib/utils"

interface MobileSidebarProps {
    config: SidebarConfig
    className?: string
}

export default function MobileSidebar({ config, className }: MobileSidebarProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Mobile Menu Button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(true)}
                className={className}
                aria-label="Open menu"
            >
                <Menu className="w-5 h-5" />
            </Button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Drawer */}
            <div
                className={cn(
                    "fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Close Button */}
                <div className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-800">
                    <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        Menu
                    </span>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Sidebar Content */}
                <div className="overflow-y-auto h-[calc(100vh-64px)]">
                    <Sidebar config={config} className="w-full h-auto border-0 sticky-0" />
                </div>
            </div>
        </>
    )
}

