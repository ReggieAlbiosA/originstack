import { prisma } from '@/lib/prisma-shopping';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';

/**
 * Product List Demo
 * Tagged with: ['products', 'pricing']
 * Revalidated via: revalidateTag('products', 'max')
 */
async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 8,
      orderBy: { updatedAt: 'desc' },
    });
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function ProductList() {
  const fetchTime = new Date().toLocaleTimeString();
  const products = await getProducts();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>📦 Product Catalog</span>
          <Badge variant="secondary" className="font-mono text-xs">
            {products.length} items
          </Badge>
        </CardTitle>
        <CardDescription>
          Tagged with 'products' and 'pricing'
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100">
            'products'
          </Badge>
          <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100">
            'pricing'
          </Badge>
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {products.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="mb-2">No products available</p>
              <p className="text-sm">Run migrations and add products to see them!</p>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      {product.featured && (
                        <Badge className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                          ⭐
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

        <div className="pt-3 border-t text-xs text-muted-foreground space-y-2">
          <p>📦 Fetched at: {fetchTime}</p>
          <div>
            <p className="font-medium">⚡ Stale-While-Revalidate:</p>
            <ol className="mt-1 ml-4 space-y-0.5 list-decimal">
              <li><code className="bg-muted px-1 rounded">revalidateTag('products', 'max')</code> called</li>
              <li>This data served instantly (stale)</li>
              <li>Fresh data fetched in background</li>
              <li>Cache updated for next request</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




