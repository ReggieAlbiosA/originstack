import { prisma } from '@/lib/prisma-shopping';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';

/**
 * Pricing Display Demo
 * Tagged with: ['pricing']
 * Revalidated via: revalidateTag('pricing', 'max')
 */
async function getPricingStats() {
  try {
    const [avgPrice, minPrice, maxPrice, productCount] = await Promise.all([
      prisma.product.aggregate({ _avg: { price: true } }),
      prisma.product.aggregate({ _min: { price: true } }),
      prisma.product.aggregate({ _max: { price: true } }),
      prisma.product.count(),
    ]);

    return {
      average: avgPrice._avg.price || 0,
      min: minPrice._min.price || 0,
      max: maxPrice._max.price || 0,
      count: productCount,
    };
  } catch (error) {
    console.error('Failed to fetch pricing stats:', error);
    return { average: 0, min: 0, max: 0, count: 0 };
  }
}

async function getRecentPriceUpdates() {
  try {
    const products = await prisma.product.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      select: { id: true, name: true, price: true, updatedAt: true },
    });
    return products;
  } catch (error) {
    return [];
  }
}

export default async function PricingDisplay() {
  const fetchTime = new Date().toLocaleTimeString();
  const stats = await getPricingStats();
  const recentUpdates = await getRecentPriceUpdates();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>💰 Pricing Dashboard</span>
        </CardTitle>
        <CardDescription>
          Tagged with 'pricing' for price-related data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100">
            'pricing'
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border bg-card text-center">
            <p className="text-xs text-muted-foreground">Average</p>
            <p className="text-lg font-bold">${stats.average.toFixed(2)}</p>
          </div>
          <div className="p-3 rounded-lg border bg-card text-center">
            <p className="text-xs text-muted-foreground">Products</p>
            <p className="text-lg font-bold">{stats.count}</p>
          </div>
          <div className="p-3 rounded-lg border bg-card text-center">
            <p className="text-xs text-muted-foreground">Min Price</p>
            <p className="text-lg font-bold">${stats.min.toFixed(2)}</p>
          </div>
          <div className="p-3 rounded-lg border bg-card text-center">
            <p className="text-xs text-muted-foreground">Max Price</p>
            <p className="text-lg font-bold">${stats.max.toFixed(2)}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Recent Price Updates</p>
          <div className="space-y-1 max-h-[120px] overflow-y-auto">
            {recentUpdates.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">
                No recent updates
              </p>
            ) : (
              recentUpdates.map((product) => (
                <div
                  key={product.id}
                  className="p-2 rounded border bg-card text-xs flex justify-between items-center"
                >
                  <span className="font-medium truncate">{product.name}</span>
                  <span className="font-bold ml-2">${product.price.toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-3 border-t text-xs text-muted-foreground space-y-2">
          <p>📦 Fetched at: {fetchTime}</p>
          <div>
            <p className="font-medium">💡 Efficient Updates:</p>
            <ul className="mt-1 ml-4 space-y-0.5">
              <li>• <code className="bg-muted px-1 rounded">revalidateTag('pricing', 'max')</code></li>
              <li>• Only pricing data revalidated</li>
              <li>• Product details, categories remain cached</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




