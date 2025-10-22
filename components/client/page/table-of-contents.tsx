'use client'

import { IconListSearch } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

interface TableOfContentsItem {
    id: string;
    title: string;
    level: number;
}

interface TableOfContentsProps {
    items: TableOfContentsItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
    const [active, setActive] = useState('');

    // Convert items to links format
    const links = items.map(item => ({
        label: item.title,
        link: `#${item.id}`,
        order: item.level
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
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            window.history.pushState(null, '', link);
        }
        setActive(link);
    };

    const tocItems = links.map((item) => (
        <a
            key={item.label}
            href={item.link}
            onClick={(e) => handleClick(e, item.link)}
            className={clsx(
                'block no-underline text-sm leading-[1.2] py-2 px-3 rounded-r-md border-l transition-colors',
                'hover:bg-gray-100 dark:hover:bg-gray-800',
                active === item.link
                    ? 'font-medium border-l-blue-600 text-blue-600 bg-blue-50 dark:border-l-blue-400 dark:text-blue-400 dark:bg-blue-950'
                    : 'border-l-gray-300 dark:border-l-gray-600 text-gray-800 dark:text-gray-300'
            )}
            style={{ paddingLeft: `calc(${item.order} * 0.75rem)` }}
        >
            {item.label}
        </a>
    ));

    return (
        <nav className="w-full sticky top-25 pt-8" aria-label="Table of contents">
            <div className="flex items-center gap-2 mb-3">
                <IconListSearch size={18} stroke={1.5} className="text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Table of contents
                </span>
            </div>
            <div className="space-y-1">{tocItems}</div>
        </nav>
    );
}
