import { prisma } from '@/lib/prisma-shopping';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';
import { DEMO_USER_ID } from '@/lib/shopping-demo/constants';

/**
 * Order History Demo
 * Updated via: updateTag('orders') - immediate cache expiration
 */
async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: DEMO_USER_ID },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return orders;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return [];
  }
}

export default async function OrderHistory() {
  const fetchTime = new Date().toLocaleTimeString();
  const orders = await getOrders();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>📋 Order History</span>
          <Badge variant="secondary" className="font-mono text-xs">
            {orders.length} orders
          </Badge>
        </CardTitle>
        <CardDescription>
          Updated via updateTag('orders') - immediate expiration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            'orders'
          </Badge>
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            'user-{'{userId}'}-orders'
          </Badge>
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="mb-2">No orders yet</p>
              <p className="text-sm">Place an order to see it appear immediately!</p>
            </div>
          ) : (
            orders.map((order) => {
              const items = order.items as any[];
              return (
                <div
                  key={order.id}
                  className="p-3 rounded-lg border bg-card"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Badge
                      variant={order.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">{items.length} items</p>
                    <p className="font-semibold mt-1">
                      Total: ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="pt-3 border-t text-xs text-muted-foreground space-y-2">
          <p>📦 Fetched at: {fetchTime}</p>
          <div>
            <p className="font-medium">🎯 Critical Update Scenario:</p>
            <ul className="mt-1 ml-4 space-y-0.5">
              <li>• User places order</li>
              <li>• Order confirmation MUST show immediately</li>
              <li>• No stale data acceptable</li>
              <li>• <code className="bg-muted px-1 rounded">updateTag('orders')</code> ensures instant visibility</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




