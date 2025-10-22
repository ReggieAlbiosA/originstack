'use client'

import Link from 'next/link'
import { type Route } from 'next'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

export interface PageNavigationLink {
    label: string
    title: string
    href: string
}

export interface PageNavigationProps {
    previous?: PageNavigationLink
    next?: PageNavigationLink
}

export function PageNavigation({ previous, next }: PageNavigationProps) {
    return (
        <nav
            className="w-full border-t border-zinc-200 dark:border-zinc-800 pt-8 pb-12 mt-12"
            aria-label="Page navigation"
        >
            <div className="flex items-center justify-between gap-4">
                {/* Previous Page */}
                {previous ? (
                    <Link
                        href={previous.href as Route}
                        className="group flex flex-col items-start gap-1 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 w-full focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                        aria-label={`Previous page: ${previous.title}`}
                    >
                        <span className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                            <IconChevronLeft size={16} className="flex-shrink-0" aria-hidden="true" />
                            <span>{previous.label}</span>
                        </span>
                        <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 truncate w-full">
                            {previous.title}
                        </span>
                    </Link>
                ) : (
                    <div className="max-w-[calc(50%-0.5rem)]" aria-hidden="true" />
                )}

                {/* Next Page */}
                {next ? (
                    <Link
                        href={next.href as Route}
                        className="group flex flex-col items-end gap-1 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 w-full focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                        aria-label={`Next page: ${next.title}`}
                    >
                        <span className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                            <span>{next.label}</span>
                            <IconChevronRight size={16} className="flex-shrink-0" aria-hidden="true" />
                        </span>
                        <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 truncate w-full text-right">
                            {next.title}
                        </span>
                    </Link>
                ) : (
                    <div className="max-w-[calc(50%-0.5rem)]" aria-hidden="true" />
                )}
            </div>
        </nav>
    )
}

