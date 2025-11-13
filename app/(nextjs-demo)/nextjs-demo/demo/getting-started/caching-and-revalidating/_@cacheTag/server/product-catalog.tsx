import { prisma } from '@/lib/prisma-shopping';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';

/**
 * Product Catalog Demo
 * Demonstrates: Basic cache tags for all products
 * Tags: ['products', 'catalog']
 */
async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
        });
        return products;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

export default async function ProductCatalog() {
    const fetchTime = new Date().toLocaleTimeString();
    const products = await getProducts();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Product Catalog</span>
                    <Badge variant="secondary" className="font-mono text-xs">
                        {products.length} items
                    </Badge>
                </CardTitle>
                <CardDescription>
                    All products with general cache tags
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                        'products'
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                        'catalog'
                    </Badge>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {products.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p className="mb-2">No products found</p>
                            <p className="text-sm">Run migrations and add some products to see them here!</p>
                        </div>
                    ) : (
                        products.map((product: typeof products[0]) => (
                            <div
                                key={product.id}
                                className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm">{product.name}</h4>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {product.description?.slice(0, 60)}...
                                        </p>
                                        <div className="flex gap-2 mt-2">
                                            <Badge variant="outline" className="text-xs">
                                                {product.category}
                                            </Badge>
                                            {product.featured && (
                                                <Badge className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                                                    ⭐ Featured
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-sm">${product.price.toFixed(2)}</p>
                                        <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="pt-3 border-t text-xs text-muted-foreground">
                    <p>📦 Fetched at: {fetchTime}</p>
                    <p className="mt-1">
                        💡 When tagged with <code className="bg-muted px-1 rounded">['products', 'catalog']</code>,
                        this data can be invalidated by:
                    </p>
                    <ul className="mt-1 ml-4 space-y-0.5">
                        <li>• <code className="bg-muted px-1 rounded">revalidateTag('products')</code></li>
                        <li>• <code className="bg-muted px-1 rounded">revalidateTag('catalog')</code></li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}

