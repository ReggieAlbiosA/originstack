import { prisma } from '@/lib/prisma-shopping';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';

/**
 * Featured Products Demo
 * Demonstrates: Multiple cache tags for hierarchical invalidation
 * Tags: ['products', 'featured', 'homepage']
 */
async function getFeaturedProducts() {
    try {
        const products = await prisma.product.findMany({
            where: { featured: true },
            take: 6,
            orderBy: { createdAt: 'desc' },
        });
        return products;
    } catch (error) {
        console.error('Failed to fetch featured products:', error);
        return [];
    }
}

export default async function FeaturedProducts() {
    const fetchTime = new Date().toLocaleTimeString();
    const products = await getFeaturedProducts();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <span>⭐ Featured Products</span>
                    <Badge variant="secondary" className="font-mono text-xs">
                        {products.length} items
                    </Badge>
                </CardTitle>
                <CardDescription>
                    Featured items with multiple hierarchical tags
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                        'products'
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                        'featured'
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                        'homepage'
                    </Badge>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {products.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p className="mb-2">No featured products found</p>
                            <p className="text-sm">Mark some products as featured to see them here!</p>
                        </div>
                    ) : (
                        products.map((product: typeof products[0]) => (
                            <div
                                key={product.id}
                                className="p-2 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm">{product.name}</h4>
                                        <Badge variant="outline" className="text-xs mt-1">
                                            {product.category}
                                        </Badge>
                                    </div>
                                    <p className="font-semibold text-sm">${product.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="pt-3 border-t text-xs text-muted-foreground space-y-2">
                    <p>📦 Fetched at: {fetchTime}</p>
                    <div>
                        <p className="font-medium">💡 Multiple Tags Enable Multi-Level Invalidation:</p>
                        <ul className="mt-1 ml-4 space-y-0.5">
                            <li>• <code className="bg-muted px-1 rounded">revalidateTag('products')</code> → All product data</li>
                            <li>• <code className="bg-muted px-1 rounded">revalidateTag('featured')</code> → Only featured items</li>
                            <li>• <code className="bg-muted px-1 rounded">revalidateTag('homepage')</code> → All homepage content</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

