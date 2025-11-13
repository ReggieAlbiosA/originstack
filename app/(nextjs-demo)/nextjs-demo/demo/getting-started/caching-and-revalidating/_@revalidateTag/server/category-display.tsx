import { prisma } from '@/lib/prisma-shopping';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';

/**
 * Category Display Demo
 * Tagged with: ['products', 'category-electronics']
 * Revalidated via: revalidateTag('category-electronics', 'max')
 */
async function getCategoryProducts(category: string) {
  try {
    const products = await prisma.product.findMany({
      where: { category },
      take: 6,
      orderBy: { updatedAt: 'desc' },
    });
    return products;
  } catch (error) {
    console.error('Failed to fetch category products:', error);
    return [];
  }
}

export default async function CategoryDisplay() {
  const fetchTime = new Date().toLocaleTimeString();
  const category = 'electronics';
  const products = await getCategoryProducts(category);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>🔌 Electronics</span>
          <Badge variant="secondary" className="font-mono text-xs">
            {products.length} items
          </Badge>
        </CardTitle>
        <CardDescription>
          Tagged with category-specific tag
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100">
            'products'
          </Badge>
          <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100">
            'category-electronics'
          </Badge>
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {products.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="mb-2">No electronics products</p>
              <p className="text-sm">Add electronics to see them here!</p>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="p-2 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
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
            <p className="font-medium">🎯 Granular Revalidation:</p>
            <ul className="mt-1 ml-4 space-y-0.5">
              <li>• <code className="bg-muted px-1 rounded">revalidateTag('category-electronics', 'max')</code></li>
              <li>• Only electronics category revalidated</li>
              <li>• Other categories remain cached (efficient!)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




