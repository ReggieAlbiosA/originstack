import { prisma } from '@/lib/prisma-shopping';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { DEMO_USER_ID } from '@/lib/shopping-demo/constants';

/**
 * Cart Stats Demo
 * Shows real-time cart statistics updated via updateTag
 */
async function getCartStats() {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: DEMO_USER_ID },
    });

    const productIds = cartItems.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = cartItems.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    return {
      itemCount: cartItems.length,
      totalItems,
      totalValue,
      uniqueProducts: cartItems.length,
    };
  } catch (error) {
    console.error('Failed to fetch cart stats:', error);
    return {
      itemCount: 0,
      totalItems: 0,
      totalValue: 0,
      uniqueProducts: 0,
    };
  }
}

export default async function CartStats() {
  const fetchTime = new Date().toLocaleTimeString();
  const stats = await getCartStats();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📊 Cart Statistics</span>
        </CardTitle>
        <CardDescription>
          Real-time stats updated via updateTag
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border bg-card text-center">
            <p className="text-xs text-muted-foreground">Unique Items</p>
            <p className="text-2xl font-bold">{stats.uniqueProducts}</p>
          </div>
          <div className="p-3 rounded-lg border bg-card text-center">
            <p className="text-xs text-muted-foreground">Total Items</p>
            <p className="text-2xl font-bold">{stats.totalItems}</p>
          </div>
          <div className="col-span-2 p-3 rounded-lg border bg-card text-center">
            <p className="text-xs text-muted-foreground">Cart Value</p>
            <p className="text-3xl font-bold">${stats.totalValue.toFixed(2)}</p>
          </div>
        </div>

        <div className="p-3 bg-muted/50 rounded-lg text-sm">
          <p className="font-medium mb-2">💡 Why updateTag here?</p>
          <p className="text-xs text-muted-foreground">
            Cart statistics are derived from cart items. When users add/remove items,
            these stats MUST update immediately to maintain consistency with the cart display.
            Using <code className="bg-background px-1 rounded">updateTag('cart')</code> ensures
            stats and cart are always synchronized.
          </p>
        </div>

        <div className="pt-3 border-t text-xs text-muted-foreground">
          <p>📦 Fetched at: {fetchTime}</p>
          <p className="mt-1">Updated via: <code className="bg-muted px-1 rounded">updateTag('cart')</code></p>
        </div>
      </CardContent>
    </Card>
  );
}




