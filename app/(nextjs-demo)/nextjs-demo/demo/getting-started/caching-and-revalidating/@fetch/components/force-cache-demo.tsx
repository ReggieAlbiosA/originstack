import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';
import { connection } from 'next/server';
import { DemoError } from './demo-error';

/**
 * FORCE CACHE DEMO - Data is cached indefinitely
 * Uses cache: 'force-cache' to cache the response permanently
 * Perfect for static content that rarely changes
 */

interface Quote {
    _id: string;
    content: string;
    author: string;
    tags: string[];
    authorSlug: string;
    length: number;
}

// Fallback quotes in case API is unavailable
const FALLBACK_QUOTES: Quote[] = [
    {
        _id: '1',
        content: 'The best way to predict the future is to invent it.',
        author: 'Alan Kay',
        tags: ['technology', 'future'],
        authorSlug: 'alan-kay',
        length: 51,
    },
    {
        _id: '2',
        content: 'Performance is not just about what you measure, but what you choose to optimize.',
        author: 'Unknown',
        tags: ['performance', 'optimization'],
        authorSlug: 'unknown',
        length: 82,
    },
];

async function getRandomQuote(): Promise<{ data: Quote; error?: string; isFallback: boolean }> {
    try {
        const res = await fetch('https://api.quotable.io/quotes/random', {
            cache: 'force-cache', // Cache indefinitely
            next: {
                tags: ['quotes'], // Tag for manual invalidation if needed
            },
            signal: AbortSignal.timeout(5000),
        });

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = (await res.json()) as Quote[];
        return { data: data[0], isFallback: false };
    } catch (error) {
        console.warn('Quotes API unavailable, using fallback data:', error);
        // Random fallback quote
        const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
        return {
            data: randomQuote,
            error: error instanceof Error ? error.message : 'Unknown error',
            isFallback: true,
        };
    }
}

export default async function ForceCacheDemo() {
    // Access connection to ensure dynamic rendering
    await connection();

    const { data: quote, error, isFallback } = await getRandomQuote();
    const fetchTime = new Date().toLocaleTimeString();

    // If using fallback data, show error state
    if (isFallback) {
        return (
            <DemoError
                title="Force Cache Demo"
                description="cache: 'force-cache'"
                error={error || 'API unavailable'}
                badgeText="Cached"
                badgeClassName="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800"
            />
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Force Cache Demo</CardTitle>
                        <CardDescription>
                            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                cache: 'force-cache'
                            </code>
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800">
                        Cached
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border rounded-lg p-6">
                    <blockquote className="space-y-4">
                        <p className="text-lg italic leading-relaxed">
                            "{quote.content}"
                        </p>
                        <footer className="flex items-center justify-between">
                            <cite className="text-sm font-semibold not-italic">
                                — {quote.author}
                            </cite>
                            <div className="flex gap-2">
                                {quote.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </footer>
                    </blockquote>
                </div>

                <div className="text-xs text-muted-foreground pt-4 border-t space-y-1">
                    <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-mono text-purple-600 dark:text-purple-400">Cached Permanently ✓</span>
                    </div>
                    <div className="flex justify-between">
                        <span>First fetched at:</span>
                        <span className="font-mono">{fetchTime}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Cache tag:</span>
                        <span className="font-mono">'quotes'</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Revalidation:</span>
                        <span className="font-mono">Manual only</span>
                    </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md p-3">
                    <p className="text-xs text-amber-800 dark:text-amber-200">
                        <strong>How it works:</strong> This quote was fetched once and cached indefinitely.
                        Even if you refresh the page, the same quote will appear unless you rebuild the application
                        or manually invalidate the cache using <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">revalidateTag('quotes')</code>.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
