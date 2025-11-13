'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Button } from '@/components/shadcn-ui/button';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  simulateCheckoutAction,
  updateProfileAction,
  updateInventoryAction,
  addToCartDemo,
} from '../actions';

/**
 * Interactive buttons to trigger path revalidation
 */
export default function RevalidateActions() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleCheckout = () => {
    setActiveAction('checkout');
    startTransition(async () => {
      const result = await simulateCheckoutAction();

      if (result.success) {
        toast.success(result.message || 'Checkout completed!');
        router.refresh();
      } else {
        toast.error(result.error || 'Checkout failed');
      }
      setActiveAction(null);
    });
  };

  const handleAddToCart = () => {
    setActiveAction('addCart');
    startTransition(async () => {
      const result = await addToCartDemo();

      if (result.success) {
        toast.success(result.message || 'Added to cart!');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to add to cart');
      }
      setActiveAction(null);
    });
  };

  const handleProfileUpdate = () => {
    setActiveAction('profile');
    startTransition(async () => {
      const result = await updateProfileAction({
        name: 'Demo User',
        email: `demo${Date.now()}@example.com`,
      });

      if (result.success) {
        toast.success(result.message || 'Profile updated!');
        router.refresh();
      } else {
        toast.error(result.error || 'Profile update failed');
      }
      setActiveAction(null);
    });
  };

  const handleInventoryUpdate = () => {
    setActiveAction('inventory');
    startTransition(async () => {
      // This is a demo, so we'll just update the first product
      const result = await updateInventoryAction('demo-product-id', 5);

      if (result.success) {
        toast.success(result.message || 'Inventory updated!');
        router.refresh();
      } else {
        toast.info('Update attempted - add products to see live updates');
      }
      setActiveAction(null);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Path Revalidation Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={isPending}
              variant="outline"
              className="h-auto py-3 flex flex-col items-start gap-1"
            >
              <span className="font-semibold">1. Add to Cart</span>
              <span className="text-xs font-normal text-muted-foreground">
                Prepare cart items for checkout
              </span>
            </Button>

            <Button
              onClick={handleCheckout}
              disabled={isPending}
              variant="default"
              className="h-auto py-3 flex flex-col items-start gap-1"
            >
              <span className="font-semibold">
                {activeAction === 'checkout' ? '⏳ Processing...' : '2. 💳 Simulate Checkout'}
              </span>
              <span className="text-xs font-normal opacity-80">
                Revalidates: /orders, /shop/cart, /profile
              </span>
            </Button>

            <Button
              onClick={handleProfileUpdate}
              disabled={isPending}
              variant="secondary"
              className="h-auto py-3 flex flex-col items-start gap-1"
            >
              <span className="font-semibold">
                {activeAction === 'profile' ? '⏳ Updating...' : '👤 Update Profile'}
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                Revalidates: /profile, /settings
              </span>
            </Button>

            <Button
              onClick={handleInventoryUpdate}
              disabled={isPending}
              variant="secondary"
              className="h-auto py-3 flex flex-col items-start gap-1"
            >
              <span className="font-semibold">
                {activeAction === 'inventory' ? '⏳ Updating...' : '📦 Update Inventory'}
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                Revalidates: /shop, /admin/inventory
              </span>
            </Button>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm">
            <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              💡 How it works:
            </p>
            <ol className="space-y-1 text-xs text-blue-800 dark:text-blue-200 ml-4 list-decimal">
              <li>Click a button to trigger an action</li>
              <li>Action completes (database updated)</li>
              <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">revalidatePath()</code> is called</li>
              <li>ALL cached data on those paths is cleared</li>
              <li>Page refreshes to show updated data</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




