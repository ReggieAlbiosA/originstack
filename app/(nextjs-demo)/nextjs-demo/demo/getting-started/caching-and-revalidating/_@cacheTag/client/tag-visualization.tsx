'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';

/**
 * Visual representation of cache tag hierarchies
 * Helps understand how tags are organized and used
 */
export default function TagVisualization() {
    const tagHierarchy = [
        {
            root: 'products',
            description: 'All product data',
            color: 'blue',
            children: [
                { tag: 'category-electronics', desc: 'Electronics products only' },
                { tag: 'category-clothing', desc: 'Clothing products only' },
                { tag: 'category-food', desc: 'Food products only' },
                { tag: 'product-{id}', desc: 'Specific product by ID' },
            ],
        },
        {
            root: 'cart',
            description: 'Shopping cart data',
            color: 'green',
            children: [
                { tag: 'user-{id}-cart', desc: 'User-specific cart items' },
            ],
        },
        {
            root: 'wishlist',
            description: 'Wishlist data',
            color: 'pink',
            children: [
                { tag: 'user-{id}', desc: 'All data for specific user' },
                { tag: 'user-{id}-wishlist', desc: 'User-specific wishlist' },
            ],
        },
        {
            root: 'featured',
            description: 'Featured products',
            color: 'yellow',
            children: [
                { tag: 'homepage', desc: 'Homepage featured items' },
            ],
        },
    ];

    const getColorClasses = (color: string) => {
        const colors = {
            blue: 'border-blue-500 bg-blue-50 dark:bg-blue-950/20',
            green: 'border-green-500 bg-green-50 dark:bg-green-950/20',
            pink: 'border-pink-500 bg-pink-50 dark:bg-pink-950/20',
            yellow: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20',
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Cache Tag Hierarchy - Shopping Demo
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                    {tagHierarchy.map((item) => (
                        <div
                            key={item.root}
                            className={`border-l-4 pl-4 p-3 rounded-r-lg ${getColorClasses(item.color)}`}
                        >
                            <div className="mb-2">
                                <h4 className="font-semibold font-mono text-sm">{item.root}</h4>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                            {item.children && (
                                <div className="ml-3 space-y-1.5 mt-3">
                                    {item.children.map((child) => (
                                        <div key={child.tag} className="text-xs">
                                            <div className="flex items-start gap-1.5">
                                                <span className="text-muted-foreground mt-0.5">└─</span>
                                                <div>
                                                    <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">
                                                        {child.tag}
                                                    </code>
                                                    <p className="text-muted-foreground mt-0.5">{child.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
                    <p className="font-medium mb-2">🎯 How to Use These Tags:</p>
                    <ul className="space-y-1 text-xs text-muted-foreground ml-4">
                        <li>• Assign tags when fetching data: <code className="bg-background px-1 rounded">next: {'{ tags: [\'products\', \'featured\'] }'}</code></li>
                        <li>• Invalidate specific tags: <code className="bg-background px-1 rounded">revalidateTag('products')</code></li>
                        <li>• Multiple tags enable multi-level invalidation strategies</li>
                        <li>• Dynamic tags (with IDs) allow per-resource cache control</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}

