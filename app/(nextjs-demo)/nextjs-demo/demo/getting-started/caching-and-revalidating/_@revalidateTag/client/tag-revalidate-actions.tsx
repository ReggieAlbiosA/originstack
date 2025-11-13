'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Button } from '@/components/shadcn-ui/button';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  updateProductPricesAction,
  updateCategoryAction,
  updateFeaturedAction,
} from '../actions';

/**
 * Interactive buttons to trigger tag revalidation
 */
export default function TagRevalidateActions() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handlePriceUpdate = () => {
    setActiveAction('prices');
    startTransition(async () => {
      const result = await updateProductPricesAction();

      if (result.success) {
        toast.success(result.message || 'Prices updated!');
        router.refresh();
      } else {
        toast.error(result.error || 'Update failed');
      }
      setActiveAction(null);
    });
  };

  const handleCategoryUpdate = () => {
    setActiveAction('category');
    startTransition(async () => {
      const result = await updateCategoryAction('electronics');

      if (result.success) {
        toast.success(result.message || 'Category updated!');
        router.refresh();
      } else {
        toast.error(result.error || 'Update failed');
      }
      setActiveAction(null);
    });
  };

  const handleFeaturedUpdate = () => {
    setActiveAction('featured');
    startTransition(async () => {
      const result = await updateFeaturedAction();

      if (result.success) {
        toast.success(result.message || 'Featured products updated!');
        router.refresh();
      } else {
        toast.error(result.error || 'Update failed');
      }
      setActiveAction(null);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Tag Revalidation Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-3">
            <Button
              onClick={handlePriceUpdate}
              disabled={isPending}
              variant="default"
              className="h-auto py-3 flex flex-col items-start gap-1"
            >
              <span className="font-semibold">
                {activeAction === 'prices' ? '⏳ Updating...' : '💰 Update Prices'}
              </span>
              <span className="text-xs font-normal opacity-80">
                Tags: products, pricing
              </span>
            </Button>

            <Button
              onClick={handleCategoryUpdate}
              disabled={isPending}
              variant="secondary"
              className="h-auto py-3 flex flex-col items-start gap-1"
            >
              <span className="font-semibold">
                {activeAction === 'category' ? '⏳ Updating...' : '🔌 Update Category'}
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                Tag: category-electronics
              </span>
            </Button>

            <Button
              onClick={handleFeaturedUpdate}
              disabled={isPending}
              variant="secondary"
              className="h-auto py-3 flex flex-col items-start gap-1"
            >
              <span className="font-semibold">
                {activeAction === 'featured' ? '⏳ Updating...' : '⭐ Update Featured'}
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                Tags: featured, products
              </span>
            </Button>
          </div>

          <div className="p-3 bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800 rounded-lg text-sm">
            <p className="font-medium text-cyan-900 dark:text-cyan-100 mb-1">
              ⚡ Stale-While-Revalidate Process:
            </p>
            <ol className="space-y-1 text-xs text-cyan-800 dark:text-cyan-200 ml-4 list-decimal">
              <li>Click button to trigger update</li>
              <li>Database updated, <code className="bg-cyan-100 dark:bg-cyan-900 px-1 rounded">revalidateTag(tag, 'max')</code> called</li>
              <li>Tag marked as stale (not deleted)</li>
              <li>Next request serves stale data instantly</li>
              <li>Fresh data fetched in background</li>
              <li>Cache updated silently for future requests</li>
            </ol>
          </div>

          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">💡 Notice the difference:</p>
            <p>
              Unlike <strong>updateTag</strong> or <strong>revalidatePath</strong>, you won't see a loading delay
              when you refresh the page. The stale data is served instantly while fresh data is fetched behind the scenes!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




