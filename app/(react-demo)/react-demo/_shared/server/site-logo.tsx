import Link from 'next/link';
import { Route } from 'next';

export default function SiteLogo() {
    return (
        <Link href={"/react-demo" as Route} className="flex  items-center gap-3 group">
            <div className="flex items-center z-[9999] justify-center w-10 h-10 bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 rounded-lg transition-transform duration-200 group-hover:scale-105">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white dark:text-zinc-900"
                >
                    <path
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M2 17L12 22L22 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M2 12L12 17L22 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                    React Demo
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-tight">
                    Fundamentals
                </span>
            </div>
        </Link>
    );
}

