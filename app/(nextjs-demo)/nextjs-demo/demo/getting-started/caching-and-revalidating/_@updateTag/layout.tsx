import { FileSystemObject } from '@/components/layout/types/types';
import TabbedDashboard from '@/components/layout/server/tabbed-dashboard';

/**
 * UNDERSTANDING updateTag IN NEXT.JS
 * ===================================
 *
 * Based on Next.js documentation and Vercel's implementation:
 *
 * ## 1. WHAT IS updateTag?
 * updateTag is a server-side function that IMMEDIATELY expires cached data
 * associated with specific tags. Unlike revalidateTag, it does NOT use
 * stale-while-revalidate. The cache is deleted immediately, forcing the
 * next request to fetch fresh data.
 *
 * ## 2. HOW IT WORKS
 *
 * ```typescript
 * import { updateTag } from 'next/cache';
 *
 * // In Server Actions ONLY (not Route Handlers)
 * updateTag('cart');       // ✅ Immediate cache deletion
 * updateTag('user-orders'); // ✅ Next request waits for fresh data
 * ```
 *
 * ⚠️ **Important**: updateTag ONLY works in Server Actions, not Route Handlers
 *
 * ## 3. IMMEDIATE EXPIRATION BEHAVIOR
 *
 * When using `updateTag(tag)`:
 * 1. **Cache is immediately deleted** (not marked stale)
 * 2. **Next request**: Must wait for fresh data fetch from source
 * 3. **User sees**: Loading state or delay while data loads
 * 4. **Result**: User sees their changes immediately
 *
 * No stale-while-revalidate - the cache entry is gone.
 *
 * ## 4. WHEN TO USE updateTag
 *
 * ✅ Use updateTag when:
 * - User MUST see their changes immediately ("read-your-own-writes")
 * - Data consistency is critical
 * - Stale data is unacceptable
 * - User performed an action expecting instant feedback
 *
 * ❌ Don't use updateTag when:
 * - Stale data is temporarily acceptable (use revalidateTag)
 * - Performance is more important than immediate consistency
 * - You're in a Route Handler (use revalidateTag instead)
 * - The action is not user-initiated
 *
 * ## 5. updateTag vs revalidateTag vs revalidatePath
 *
 * ### updateTag:
 * - Scope: Tagged data only
 * - Behavior: Immediate deletion
 * - Where: Server Actions ONLY
 * - Speed: Slower (waits for fresh data)
 * - Use: Critical updates, read-your-own-writes
 *
 * ### revalidateTag:
 * - Scope: Tagged data only
 * - Behavior: Stale-while-revalidate (with profile="max")
 * - Where: Server Actions + Route Handlers
 * - Speed: Instant (serves stale)
 * - Use: Non-critical updates, better UX
 *
 * ### revalidatePath:
 * - Scope: Entire page/route
 * - Behavior: Immediate deletion
 * - Where: Server Actions + Route Handlers
 * - Speed: Slower (waits for fresh data)
 * - Use: Full page refresh
 *
 * ## 6. REAL-WORLD EXAMPLES: E-COMMERCE
 *
 * ### A. Add to Cart
 * ```typescript
 * 'use server';
 * import { updateTag } from 'next/cache';
 *
 * export async function addToCartAction(productId: string, userId: string) {
 *   // Add item to cart
 *   await db.cartItem.create({
 *     data: { userId, productId, quantity: 1 }
 *   });
 *
 *   // ✅ User MUST see new item immediately
 *   updateTag('cart');
 *   updateTag(\`user-\${userId}-cart\`);
 *
 *   return { success: true };
 * }
 * ```
 *
 * ### B. Remove from Cart
 * ```typescript
 * export async function removeFromCartAction(itemId: string, userId: string) {
 *   await db.cartItem.delete({ where: { id: itemId } });
 *
 *   // ✅ Item must disappear immediately
 *   updateTag('cart');
 *   updateTag(\`user-\${userId}-cart\`);
 *
 *   return { success: true };
 * }
 * ```
 *
 * ### C. Place Order
 * ```typescript
 * export async function placeOrderAction(userId: string) {
 *   // Create order from cart
 *   const order = await createOrderFromCart(userId);
 *
 *   // Clear cart
 *   await db.cartItem.deleteMany({ where: { userId } });
 *
 *   // ✅ User must see order confirmation immediately
 *   updateTag(\`user-\${userId}-orders\`);
 *   updateTag('cart');
 *
 *   return { success: true, orderId: order.id };
 * }
 * ```
 *
 * ## 7. "READ-YOUR-OWN-WRITES" PATTERN
 *
 * This is the primary use case for updateTag:
 *
 * 1. **User performs action** (add to cart, delete item)
 * 2. **Server updates database**
 * 3. **updateTag expires cache immediately**
 * 4. **User refreshes/navigates**
 * 5. **Fresh data fetched** (user sees their changes)
 *
 * Without immediate expiration:
 * - User adds item to cart
 * - Refreshes page
 * - Sees old cached cart (confusing!)
 * - Has to wait for background revalidation
 *
 * ## 8. PERFORMANCE TRADE-OFFS
 *
 * ### Advantages:
 * ✅ Guaranteed immediate consistency
 * ✅ User sees their changes right away
 * ✅ No confusion from stale data
 * ✅ Perfect for critical operations
 *
 * ### Disadvantages:
 * ⚠️ Slower response time (waits for fresh fetch)
 * ⚠️ No stale-while-revalidate benefit
 * ⚠️ Can cause cache stampede if overused
 * ⚠️ Higher origin server load
 *
 * ## 9. SHOPPING DEMO USE CASES
 *
 * ### Shopping Cart Operations
 * User adds/removes items:
 * - Cart count must update immediately
 * - Item must appear/disappear right away
 * - No stale cart data acceptable
 * Solution: `updateTag('cart')` - immediate update
 *
 * ### Order Placement
 * User completes order:
 * - Order must appear in history immediately
 * - Cart must clear right away
 * - Order confirmation must show fresh data
 * Solution: `updateTag('orders')` - instant consistency
 *
 * ### Account Deletion
 * User deletes account:
 * - Profile must disappear immediately
 * - No stale user data
 * - Security-critical operation
 * Solution: `updateTag('user-profile')` - immediate removal
 *
 * ## 10. COMBINING WITH OTHER STRATEGIES
 *
 * You can use updateTag with other revalidation methods:
 *
 * ```typescript
 * export async function criticalUpdate() {
 *   await updateDatabase();
 *
 *   // ✅ Critical data: immediate expiration
 *   updateTag('cart');
 *
 *   // ✅ Related but less critical: stale-while-revalidate
 *   revalidateTag('products', 'max');
 *
 *   // ✅ Entire page: full refresh
 *   revalidatePath('/shop');
 * }
 * ```
 *
 * ## 11. BEST PRACTICES
 *
 * ### DO:
 * ✅ Use for user-initiated actions requiring immediate feedback
 * ✅ Use for critical data consistency scenarios
 * ✅ Use in Server Actions only
 * ✅ Inform user with loading states
 * ✅ Handle errors gracefully
 *
 * ### DON'T:
 * ❌ Overuse (impacts performance)
 * ❌ Use in Route Handlers (not supported)
 * ❌ Use for non-critical updates (use revalidateTag)
 * ❌ Forget about the performance trade-off
 * ❌ Use without user feedback (loading states)
 *
 * ## 12. ERROR HANDLING
 *
 * ```typescript
 * 'use server';
 * import { updateTag } from 'next/cache';
 *
 * export async function criticalAction() {
 *   try {
 *     await updateDatabase();
 *     updateTag('critical-data');
 *     return { success: true };
 *   } catch (error) {
 *     console.error('Critical action failed:', error);
 *     // Don't updateTag if action failed
 *     return { success: false, error: 'Action failed' };
 *   }
 * }
 * ```
 *
 * ## 13. USER EXPERIENCE CONSIDERATIONS
 *
 * When using updateTag, consider:
 *
 * 1. **Loading States**: Show spinners/skeletons while fetching
 * 2. **Optimistic Updates**: Update UI optimistically before server confirms
 * 3. **Error Handling**: Rollback optimistic updates on error
 * 4. **Feedback**: Use toasts/notifications to confirm actions
 *
 * ## 14. DEBUGGING
 *
 * To debug updateTag:
 * - Check if you're in a Server Action (not Route Handler)
 * - Monitor request timing (should see delay after invalidation)
 * - Use console.log to confirm updateTag is called
 * - Verify cache headers show no-cache after invalidation
 *
 * ## 15. PRODUCTION CONSIDERATIONS
 *
 * ### On Vercel:
 * - updateTag propagates to edge network
 * - Cache deletion is immediate
 * - Next request fetches from origin
 * - Use sparingly to avoid origin overload
 *
 * ### Performance:
 * - First request after updateTag: Slow (waits for fetch)
 * - Subsequent requests: Fast (cached again)
 * - Consider rate limiting for frequently updated tags
 *
 * The examples below demonstrate updateTag for critical cart operations.
 */

export default function UpdateTagDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const code: FileSystemObject[] = [{
    type: "directory",
    name: "@updateTag-demos",
    path: "/@updateTag-demos",
    children: [
      {
        type: "file",
        name: "cart-operations.tsx",
        path: "/server/cart-operations.tsx",
        code: `// cart-operations.tsx - Immediate cache expiration for cart
'use server';

import { updateTag } from 'next/cache';
import { prisma } from '@/lib/prisma-shopping';

/**
 * Add to cart with immediate cache update
 * User MUST see new item right away
 */
export async function addToCartAction(
  productId: string,
  userId: string
) {
  try {
    await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity: 1,
      },
    });

    // ✅ Immediate cache expiration
    updateTag('cart');
    updateTag(\`user-\${userId}-cart\`);

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to add to cart' };
  }
}

/**
 * Remove from cart with immediate cache update
 * Item MUST disappear immediately
 */
export async function removeFromCartAction(
  itemId: string,
  userId: string
) {
  try {
    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    // ✅ Immediate cache expiration
    updateTag('cart');
    updateTag(\`user-\${userId}-cart\`);

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to remove item' };
  }
}`,
      },
      {
        type: "file",
        name: "order-placement.tsx",
        path: "/server/order-placement.tsx",
        code: `// order-placement.tsx - Immediate cache expiration for orders
'use server';

import { updateTag } from 'next/cache';
import { prisma } from '@/lib/prisma-shopping';

/**
 * Place order with immediate cache update
 * User MUST see order confirmation immediately
 */
export async function placeOrderAction(userId: string) {
  try {
    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
    });

    if (cartItems.length === 0) {
      return { success: false, error: 'Cart is empty' };
    }

    // Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        items: cartItems,
        totalAmount: total,
        status: 'completed',
      },
    });

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { userId },
    });

    // ✅ Immediate cache expiration for orders and cart
    updateTag(\`user-\${userId}-orders\`);
    updateTag('cart');

    return { success: true, orderId: order.id };
  } catch (error) {
    return { success: false, error: 'Order failed' };
  }
}`,
      },
      {
        type: "file",
        name: "comparison.tsx",
        path: "/client/comparison.tsx",
        code: `// comparison.tsx - Show difference between updateTag and revalidateTag
'use client';

export default function Comparison() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-4 border rounded">
        <h4 className="font-semibold mb-2">updateTag</h4>
        <ul className="text-sm space-y-1">
          <li>✅ Immediate consistency</li>
          <li>✅ User sees changes right away</li>
          <li>❌ Slower (waits for fresh fetch)</li>
          <li>❌ Server Actions only</li>
          <li>🎯 Use for: Cart, Orders, Profile changes</li>
        </ul>
      </div>
      <div className="p-4 border rounded">
        <h4 className="font-semibold mb-2">revalidateTag</h4>
        <ul className="text-sm space-y-1">
          <li>✅ Fast (stale-while-revalidate)</li>
          <li>✅ Better UX (no waiting)</li>
          <li>❌ Temporary stale data</li>
          <li>✅ Server Actions + Route Handlers</li>
          <li>🎯 Use for: Products, Pricing, Categories</li>
        </ul>
      </div>
    </div>
  );
}`,
      },
    ]
  }];

  return (
    <div className="space-y-8">
      <header className="text-2xl font-bold">
        <h2>updateTag - Immediate Cache Expiration for Critical Operations</h2>
      </header>
      <TabbedDashboard fileSystem={code}>
        {children}
      </TabbedDashboard>
    </div>
  );
}


