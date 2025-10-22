'use client'

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { cn } from '@/lib/utils';

interface TableOfContentsItem {
    id: string;
    title: string;
    level: number;
}

interface MobileTableOfContentsProps {
    items: TableOfContentsItem[];
    pageTitle?: string;
}

export function MobileTableOfContents({ items, pageTitle = "On this page" }: MobileTableOfContentsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState('');

    // Convert items to links format
    const links = items.map(item => ({
        label: item.title,
        link: `#${item.id}`,
        level: item.level
    }));

    // Track scroll position to highlight active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = links.map(link => link.link.substring(1));
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i]);
                if (element && element.offsetTop <= scrollPosition) {
                    setActive(`#${sections[i]}`);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [links]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();
        const targetId = link.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Account for sticky header offset
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            window.history.pushState(null, '', link);
        }
        setActive(link);
        setIsOpen(false); // Close menu after selection
    };

    // Close menu when clicking outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-mobile-toc]')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    if (items.length === 0) return null;

    // Get the active section title
    const activeItem = links.find(link => link.link === active);
    const activeTitle = activeItem?.label;

    return (
        <div
            className="xl:hidden sticky lg:top-[64.5px] md:top-[65px] top-[64.9px] z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800"
            data-mobile-toc
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-3 py-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                aria-expanded={isOpen}
                aria-controls="mobile-toc-menu"
            >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    {/* Hamburger Icon */}
                    <svg
                        className="w-5 h-5 text-zinc-600 dark:text-zinc-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>

                    {/* Breadcrumb-style title */}
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 shrink-0">
                            {pageTitle}
                        </span>
                        {activeTitle && (
                            <>
                                <ChevronRight
                                    className={cn("text-zinc-600 dark:text-zinc-400 transition-transform duration-200 shrink-0 ", isOpen && "rotate-90")}
                                    size={15}
                                    aria-hidden="true"
                                />
                                <span className="text-sm font-medium text-zinc-900/40 dark:text-zinc-100/40 truncate">
                                    {activeTitle}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <nav
                    id="mobile-toc-menu"
                    className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900  absolute top-full left-0 w-full max-h-[70vh] overflow-y-auto"
                    aria-label="Table of contents"
                >
                    {links.map((item) => {
                        const isActive = active === item.link;
                        // Calculate indentation based on heading level (h2 = 0, h3 = 1, h4 = 2, etc.)
                        const indent = Math.max(0, item.level - 2);

                        return (
                            <a
                                key={item.label}
                                href={item.link}
                                onClick={(e) => handleClick(e, item.link)}
                                className={clsx(
                                    'block no-underline text-sm py-2.5 px-4 transition-colors border-l-2',
                                    isActive
                                        ? 'font-medium border-l-blue-600 text-blue-600 bg-blue-50 dark:border-l-blue-400 dark:text-blue-400 dark:bg-blue-950/50'
                                        : 'border-l-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                                )}
                                style={{ paddingLeft: `${16 + indent * 16}px` }}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                </nav>
            )}
        </div>
    );
}

