'use client'

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, FileText, Hash } from 'lucide-react';
import Link from 'next/link';
import { Route } from 'next';
import type { SidebarConfig, SidebarLinkItem, SidebarParentItem } from '@/components/client/sidebar/sidebar';

// Define interface for search result items
interface SearchResultItem {
    label: string;
    href: string;
    description?: string;
    parentLabel?: string;
    isChild?: boolean;
}

// Define props interface
interface SearchInterfaceProps {
    docsItems?: SidebarConfig;
}

// Helper function to check if an item is a parent item
function isParentItem(item: SidebarLinkItem | SidebarParentItem): item is SidebarParentItem {
    return 'children' in item && Array.isArray(item.children);
}

// Function to extract all routable items from sidebar config
function extractRoutableItems(config: SidebarConfig): SearchResultItem[] {
    const items: SearchResultItem[] = [];

    config.sections.forEach(section => {
        section.items.forEach(item => {
            if (isParentItem(item)) {
                // If parent has its own href, add it
                if (item.href) {
                    items.push({
                        label: item.label || '',
                        href: item.href,
                        description: item.label
                    });
                }

                // Add all children that have hrefs
                item.children.forEach(child => {
                    if (child.href) {
                        items.push({
                            label: child.label,
                            href: child.href,
                            description: child.description,
                            parentLabel: item.label,
                            isChild: true
                        });
                    }
                });
            } else {
                // Regular link item
                if (item.href) {
                    items.push({
                        label: item.label,
                        href: item.href,
                        description: item.description
                    });
                }
            }
        });
    });

    return items;
}

// Preloaded items that should show when modal opens
const preloadedItems = [
    'Installation',
    'Styling with utility classes',
    'useState',
    'useEffect',
    'Render Props'
];

export default function SearchInterface({ docsItems }: SearchInterfaceProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [selected, setSelected] = useState<number>(0);

    const hideOnMobileStyle = "hidden sm:flex";

    // Extract all routable items from docs
    const allRoutableItems = useMemo(() => {
        if (!docsItems) return [];
        return extractRoutableItems(docsItems);
    }, [docsItems]);

    // Get preloaded items that exist in the routable items
    const availablePreloadedItems = useMemo(() => {
        return allRoutableItems.filter(item =>
            preloadedItems.includes(item.label)
        );
    }, [allRoutableItems]);

    // Memoize filtered items to avoid recalculating on every render
    const filteredItems = useMemo(() => {
        if (!search.trim()) {
            return availablePreloadedItems;
        }

        return allRoutableItems.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search, allRoutableItems, availablePreloadedItems]);

    // Handle global keydown for opening/closing palette
    const handleGlobalKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            setOpen((prev) => !prev);
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            setOpen(false);
        }
    }, []);

    // Handle navigation keydown when palette is open
    const handleNavigationKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!open || !filteredItems.length) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelected((s) => (s + 1) % filteredItems.length);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelected((s) => (s - 1 + filteredItems.length) % filteredItems.length);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (filteredItems[selected]) {
                        console.log('Selected:', filteredItems[selected].label);
                        setOpen(false);
                    }
                    break;
            }
        },
        [open, selected, filteredItems]
    );

    // Set up global keydown listener
    useEffect(() => {
        document.addEventListener('keydown', handleGlobalKeyDown);
        return () => document.removeEventListener('keydown', handleGlobalKeyDown);
    }, [handleGlobalKeyDown]);

    // Set up navigation keydown listener
    useEffect(() => {
        document.addEventListener('keydown', handleNavigationKeyDown);
        return () => document.removeEventListener('keydown', handleNavigationKeyDown);
    }, [handleNavigationKeyDown]);

    // Reset selected index when search changes
    useEffect(() => {
        setSelected(0);
    }, [search]);

    // Debounced search handler
    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
        },
        []
    );

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setOpen(true)}
                className="flex lg:w-[230px] md:w-[200] sm:w-[145px] items-center gap-2 px-2.5 h-[35px] bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400"
                aria-label="Open command palette"
            >
                <Search className="w-4.5 h-4.5" aria-hidden="true" />

                {/* apply truncate here */}
                <span className="hidden  sm:inline truncate">
                    Search Demo...
                </span>

                <kbd
                    className={`ml-auto px-1  text-xs bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 rounded border border-zinc-300 dark:border-zinc-600 ${hideOnMobileStyle}`}
                >
                    ⌘K
                </kbd>
            </button>


            {/* Command Palette Modal */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="command-palette-title"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute w-screen  h-screen inset-0 bg-black/70"
                        onClick={() => setOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Dialog */}
                    <div className="relative w-full max-w-2xl max-h-[50vh] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800">
                            <p id="command-palette-title" className="text-xs text-zinc-500 dark:text-zinc-400">
                                Search Documentation
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
                            <input
                                type="text"
                                value={search}
                                onChange={handleSearchChange}
                                placeholder="Search"
                                className="w-full bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm"
                                autoFocus
                                aria-label="Search documentation"
                            />
                        </div>

                        {/* Results */}
                        <div className="py-1 overflow-y-auto flex-1" role="listbox" aria-label="Search results">
                            {filteredItems.length === 0 ? (
                                <div className="py-8 text-center">
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">No results found</p>
                                </div>
                            ) : (
                                filteredItems.map((item, idx) => {
                                    return (
                                        <Link
                                            key={idx}
                                            href={item.href as Route}
                                            onMouseEnter={() => setSelected(idx)}
                                            onClick={() => setOpen(false)}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${selected === idx ? 'bg-zinc-100 dark:bg-zinc-800' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'
                                                }`}
                                            role="option"
                                            aria-selected={selected === idx}
                                        >
                                            {item.isChild ? (
                                                <Hash className="w-4 h-4 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />
                                            ) : (
                                                <FileText className="w-4 h-4 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />
                                            )}
                                            <div className="flex-1">
                                                {item.isChild && item.parentLabel && (
                                                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-0.5">
                                                        {item.parentLabel}
                                                    </div>
                                                )}
                                                <div className={`text-sm text-zinc-900 dark:text-zinc-100 ${item.isChild ? 'ml-4' : ''}`}>
                                                    {item.label}
                                                </div>
                                                {item.description && (
                                                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                        {item.description}
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
