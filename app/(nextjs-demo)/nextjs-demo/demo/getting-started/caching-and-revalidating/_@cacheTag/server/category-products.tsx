import { prisma } from '@/lib/prisma-shopping';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';

/**
 * Category Products Demo
 * Demonstrates: Dynamic cache tags based on category
 * Tags: ['products', 'category-electronics']
 */
async function getProductsByCategory(category: string) {
    try {
        const products = await prisma.product.findMany({
            where: { category },
            take: 8,
            orderBy: { createdAt: 'desc' },
        });
        return products;
    } catch (error) {
        console.error(`Failed to fetch products for category ${category}:`, error);
        return [];
    }
}

export default async function CategoryProducts() {
    const fetchTime = new Date().toLocaleTimeString();
    const category = 'electronics'; // Demo category
    const products = await getProductsByCategory(category);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Electronics Category</span>
                    <Badge variant="secondary" className="font-mono text-xs">
                        {products.length} items
                    </Badge>
                </CardTitle>
                <CardDescription>
                    Category-specific products with dynamic tags
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                        'products'
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                        'category-{category}'
                    </Badge>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {products.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p className="mb-2">No electronics products found</p>
                            <p className="text-sm">Add some products with category 'electronics' to see them here!</p>
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
                                        <p className="text-xs text-muted-foreground">
                                            Stock: {product.stock} units
                                        </p>
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
                        <p className="font-medium">💡 Dynamic Category Tags:</p>
                        <ul className="mt-1 ml-4 space-y-0.5">
                            <li>
                                • <code className="bg-muted px-1 rounded">revalidateTag('category-electronics')</code> →
                                Only this category
                            </li>
                            <li>
                                • <code className="bg-muted px-1 rounded">revalidateTag('products')</code> →
                                All products (including this category)
                            </li>
                            <li>
                                • Other categories remain cached (efficient!)
                            </li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

