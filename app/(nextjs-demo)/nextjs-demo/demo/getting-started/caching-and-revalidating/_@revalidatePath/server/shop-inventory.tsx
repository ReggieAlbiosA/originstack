import { prisma } from '@/lib/prisma-shopping';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';

/**
 * Shop Inventory Display
 * This page is revalidated via revalidatePath('/shop') after inventory updates
 */
async function getInventoryStats() {
  try {
    const [totalProducts, lowStockCount, totalValue] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({
        where: { stock: { lt: 10 } },
      }),
      prisma.product.aggregate({
        _sum: { price: true },
      }),
    ]);

    return {
      totalProducts,
      lowStockCount,
      totalValue: totalValue._sum.price || 0,
    };
  } catch (error) {
    console.error('Failed to fetch inventory stats:', error);
    return {
      totalProducts: 0,
      lowStockCount: 0,
      totalValue: 0,
    };
  }
}

async function getRecentProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
    });
    return products;
  } catch (error) {
    return [];
  }
}

export default async function ShopInventory() {
  const fetchTime = new Date().toLocaleTimeString();
  const stats = await getInventoryStats();
  const recentProducts = await getRecentProducts();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🏪 Shop Inventory</span>
        </CardTitle>
        <CardDescription>
          Revalidated via revalidatePath('/shop')
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            Path: /shop
          </Badge>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            Path: /admin/inventory
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-2 rounded-lg border bg-card text-center">
            <p className="text-xs text-muted-foreground">Products</p>
            <p className="text-xl font-bold">{stats.totalProducts}</p>
          </div>
          <div className="p-2 rounded-lg border bg-card text-center">
            <p className="text-xs text-muted-foreground">Low Stock</p>
            <p className="text-xl font-bold text-amber-600">{stats.lowStockCount}</p>
          </div>
          <div className="p-2 rounded-lg border bg-card text-center">
            <p className="text-xs text-muted-foreground">Value</p>
            <p className="text-xl font-bold">${stats.totalValue.toFixed(0)}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Recently Updated</p>
          <div className="space-y-2 max-h-[150px] overflow-y-auto">
            {recentProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No products found
              </p>
            ) : (
              recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-2 rounded-lg border bg-card text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{product.name}</span>
                    <Badge variant="outline" className="text-xs">
                      Stock: {product.stock}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-3 border-t text-xs text-muted-foreground space-y-2">
          <p>📦 Fetched at: {fetchTime}</p>
          <div>
            <p className="font-medium">💡 When is this revalidated?</p>
            <ul className="mt-1 ml-4 space-y-0.5">
              <li>• After inventory update: <code className="bg-muted px-1 rounded">revalidatePath('/shop')</code></li>
              <li>• Admin changes: <code className="bg-muted px-1 rounded">revalidatePath('/admin/inventory')</code></li>
              <li>• All shop data refreshed (stats, products, prices)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




