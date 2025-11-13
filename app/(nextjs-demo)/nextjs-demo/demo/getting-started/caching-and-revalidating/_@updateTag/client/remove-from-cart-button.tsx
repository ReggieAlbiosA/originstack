'use client';

import { Button } from '@/components/shadcn-ui/button';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { removeFromCartAction } from '../actions';

interface RemoveFromCartButtonProps {
  itemId: string;
}

/**
 * Button to remove item from cart
 * Demonstrates immediate cache update with updateTag
 */
export default function RemoveFromCartButton({ itemId }: RemoveFromCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRemove = () => {
    startTransition(async () => {
      const result = await removeFromCartAction(itemId);

      if (result.success) {
        toast.success(result.message || 'Item removed!');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to remove item');
      }
    });
  };

  return (
    <Button
      onClick={handleRemove}
      disabled={isPending}
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0"
    >
      {isPending ? (
        <span className="text-xs">⏳</span>
      ) : (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </Button>
  );
}


