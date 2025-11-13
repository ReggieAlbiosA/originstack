import { prisma } from '@/lib/prisma-shopping';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';
import { DEMO_USER_ID } from '@/lib/shopping-demo/constants';
import RemoveFromCartButton from '../client/remove-from-cart-button';

/**
 * Shopping Cart Demo
 * Updated via: updateTag('cart') - immediate cache expiration
 */
async function getCartItems() {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: DEMO_USER_ID },
      orderBy: { addedAt: 'desc' },
    });

    // Get product details
    const productIds = cartItems.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    // Combine cart items with product details
    const itemsWithProducts = cartItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        product,
      };
    });

    return itemsWithProducts;
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
    return [];
  }
}

export default async function ShoppingCart() {
  const fetchTime = new Date().toLocaleTimeString();
  const cartItems = await getCartItems();
  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>🛒 Shopping Cart</span>
          <Badge variant="secondary" className="font-mono text-xs">
            {cartItems.length} items
          </Badge>
        </CardTitle>
        <CardDescription>
          Updated via updateTag('cart') - immediate expiration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            'cart'
          </Badge>
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            'user-{'{userId}'}-cart'
          </Badge>
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="mb-2">Your cart is empty</p>
              <p className="text-sm">Add some products using the actions below!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg border bg-card"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.product?.name || 'Unknown Product'}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Quantity: {item.quantity} × ${item.product?.price.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-xs font-semibold mt-1">
                      Subtotal: ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <RemoveFromCartButton itemId={item.id} />
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="pt-3 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="text-lg font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="pt-3 border-t text-xs text-muted-foreground space-y-2">
          <p>📦 Fetched at: {fetchTime}</p>
          <div>
            <p className="font-medium">⚡ Immediate Update Process:</p>
            <ol className="mt-1 ml-4 space-y-0.5 list-decimal">
              <li>User adds/removes item</li>
              <li><code className="bg-muted px-1 rounded">updateTag('cart')</code> called</li>
              <li>Cache deleted immediately (not stale)</li>
              <li>Next request waits for fresh fetch</li>
              <li>User sees changes right away</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




