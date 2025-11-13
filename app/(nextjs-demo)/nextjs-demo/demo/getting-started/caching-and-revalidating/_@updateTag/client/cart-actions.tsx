'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Button } from '@/components/shadcn-ui/button';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  addToCartAction,
  placeOrderAction,
  clearCartAction,
} from '../actions';

/**
 * Interactive cart action buttons demonstrating updateTag
 */
export default function CartActions() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleAddToCart = async () => {
    setActiveAction('add');
    startTransition(async () => {
      // Get a random product (in real app, user would select)
      // For demo, we'll just add a mock product ID
      const result = await addToCartAction('demo-product-1');

      if (result.success) {
        toast.success(result.message || 'Added to cart!');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to add to cart');
      }
      setActiveAction(null);
    });
  };

  const handlePlaceOrder = () => {
    setActiveAction('order');
    startTransition(async () => {
      const result = await placeOrderAction();

      if (result.success) {
        toast.success(result.message || 'Order placed!');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to place order');
      }
      setActiveAction(null);
    });
  };

  const handleClearCart = () => {
    setActiveAction('clear');
    startTransition(async () => {
      const result = await clearCartAction();

      if (result.success) {
        toast.success(result.message || 'Cart cleared!');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to clear cart');
      }
      setActiveAction(null);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Cart Actions - updateTag Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={isPending}
              variant="default"
              className="h-auto py-3 flex flex-col items-start gap-1"
            >
              <span className="font-semibold">
                {activeAction === 'add' ? '⏳ Adding...' : '🛒 Add to Cart'}
              </span>
              <span className="text-xs font-normal opacity-80">
                updateTag('cart')
              </span>
            </Button>

            <Button
              onClick={handlePlaceOrder}
              disabled={isPending}
              variant="secondary"
              className="h-auto py-3 flex flex-col items-start gap-1"
            >
              <span className="font-semibold">
                {activeAction === 'order' ? '⏳ Processing...' : '💳 Place Order'}
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                updateTag('orders', 'cart')
              </span>
            </Button>

            <Button
              onClick={handleClearCart}
              disabled={isPending}
              variant="outline"
              className="h-auto py-3 flex flex-col items-start gap-1"
            >
              <span className="font-semibold">
                {activeAction === 'clear' ? '⏳ Clearing...' : '🗑️ Clear Cart'}
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                updateTag('cart')
              </span>
            </Button>
          </div>

          <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-sm">
            <p className="font-medium text-red-900 dark:text-red-100 mb-1">
              ⚡ Immediate Cache Expiration Process:
            </p>
            <ol className="space-y-1 text-xs text-red-800 dark:text-red-200 ml-4 list-decimal">
              <li>Click action button (add to cart, place order, clear cart)</li>
              <li>Server updates database</li>
              <li><code className="bg-red-100 dark:bg-red-900 px-1 rounded">updateTag()</code> deletes cache immediately</li>
              <li>Page refreshes</li>
              <li>Fresh data fetched from database (may see brief loading)</li>
              <li>Changes are visible immediately (no stale data)</li>
            </ol>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm">
            <p className="font-medium text-amber-900 dark:text-amber-100 mb-2">
              💡 Notice the Difference:
            </p>
            <div className="text-xs text-amber-800 dark:text-amber-200 space-y-1">
              <p>
                <strong>updateTag</strong> (this demo): You might notice a brief delay when the page
                refreshes because it's fetching fresh data. But you're <strong>guaranteed</strong> to
                see your changes immediately - no stale cart data!
              </p>
              <p className="mt-2">
                <strong>revalidateTag</strong> (@revalidateTag demo): Page refreshes instantly because
                it serves stale data, then updates in the background. Faster, but you might briefly
                see old data.
              </p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">🎯 Use Cases for updateTag:</p>
            <ul className="ml-4 space-y-0.5">
              <li>• <strong>Shopping Cart:</strong> User expects added items to appear immediately</li>
              <li>• <strong>Orders:</strong> Order confirmation must show right away</li>
              <li>• <strong>Profile Changes:</strong> Name/email updates should be instant</li>
              <li>• <strong>Deletions:</strong> Removed items must disappear immediately</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


