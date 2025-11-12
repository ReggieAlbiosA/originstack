import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with @testing-library/jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Mock Next.js environment variables
process.env.NODE_ENV = 'test';

// Mock Next.js Image component
vi.mock('next/image', () => ({
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        return <img {...props} />;
    },
}));

// Mock Next.js Link component
vi.mock('next/link', () => ({
    default: ({ children, href }: any) => {
        return <a href={href}>{children}</a>;
    },
}));

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        pathname: '/',
        query: {},
        asPath: '/',
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));

