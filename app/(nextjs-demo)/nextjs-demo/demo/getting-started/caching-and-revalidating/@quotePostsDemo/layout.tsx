import { FileSystemObject } from '@/components/layout/types/types';
import TabbedDashboard from '@/components/layout/server/tabbed-dashboard';
import Link from 'next/link';

/**
 * UNDERSTANDING revalidatePath IN NEXT.JS
 * ========================================
 *
 * Based on Next.js documentation and Vercel's implementation:
 *
 * ## 1. WHAT IS revalidatePath?
 * revalidatePath is a server-side function that invalidates ALL cached data
 * for a specific route path. It's a broad, path-based cache invalidation strategy
 * that affects everything cached on that route.
 *
 * ## 2. HOW IT WORKS
 *
 * ```typescript
 * import { revalidatePath } from 'next/cache';
 *
 * // In a Server Action or Route Handler
 * revalidatePath('/shop');        // Invalidate /shop
 * revalidatePath('/shop/cart');   // Invalidate /shop/cart
 * revalidatePath('/profile');     // Invalidate /profile
 * ```
 *
 * ## 3. WHEN TO USE revalidatePath
 *
 * ✅ Use revalidatePath when:
 * - You need to refresh an ENTIRE page
 * - Multiple data sources on a page changed
 * - It's simpler than invalidating multiple tags
 * - You want to ensure everything is fresh
 * - User completes a major action (checkout, profile update)
 *
 * ❌ Don't use revalidatePath when:
 * - Only specific data changed (use revalidateTag instead)
 * - You need granular control
 * - The path has many unrelated cache entries
 * - You want stale-while-revalidate behavior
 *
 * ## 4. revalidatePath vs revalidateTag
 *
 * ### revalidatePath:
 * - Scope: ENTIRE route/page
 * - Granularity: Broad (all cached data on path)
 * - Use case: Major changes, full page refresh
 * - Example: After checkout, refresh /orders page
 *
 * ### revalidateTag:
 * - Scope: SPECIFIC tagged data
 * - Granularity: Fine (only data with matching tag)
 * - Use case: Selective updates, related data
 * - Example: After adding product, refresh only 'products' tag
 *
 * ## 5. REAL-WORLD EXAMPLES: E-COMMERCE
 *
 * ### A. After Checkout
 * ```typescript
 * 'use server';
 * import { revalidatePath } from 'next/cache';
 *
 * export async function checkout() {
 *   // Process payment...
 *   // Clear cart...
 *   // Create order...
 *
 *   revalidatePath('/orders');      // Refresh orders page
 *   revalidatePath('/shop/cart');   // Refresh cart page
 *   revalidatePath('/profile');     // Refresh profile (order history)
 * }
 * ```
 *
 * ### B. After Profile Update
 * ```typescript
 * export async function updateProfile(data: ProfileData) {
 *   await db.update('users', data);
 *
 *   revalidatePath('/profile');     // Refresh entire profile page
 *   revalidatePath('/settings');    // Refresh settings page
 * }
 * ```
 *
 * ### C. After Inventory Update (Admin)
 * ```typescript
 * export async function updateInventory() {
 *   // Update stock levels...
 *
 *   revalidatePath('/shop');        // Refresh entire shop
 *   revalidatePath('/admin/inventory'); // Refresh admin panel
 * }
 * ```
 *
 * ## 6. PATH TYPES
 *
 * You can specify different path types:
 *
 * ```typescript
 * // Revalidate specific page (default)
 * revalidatePath('/shop/cart', 'page');
 *
 * // Revalidate layout (affects all nested pages)
 * revalidatePath('/shop', 'layout');
 * ```
 *
 * ## 7. COMBINING WITH OTHER STRATEGIES
 *
 * You can use revalidatePath alongside revalidateTag:
 *
 * ```typescript
 * export async function placeOrder() {
 *   // Create order...
 *
 *   revalidateTag('orders');        // ✅ Update tagged order data
 *   revalidatePath('/orders');      // ✅ Refresh entire orders page
 *   revalidatePath('/profile');     // ✅ Refresh profile
 * }
 * ```
 *
 * ## 8. SHOPPING DEMO USE CASES
 *
 * ### Checkout Flow
 * User completes checkout:
 * 1. Payment processed
 * 2. Order created
 * 3. Cart cleared
 * Result: Multiple changes across different data
 * Solution: `revalidatePath('/orders')` refreshes entire page
 *
 * ### Profile Update
 * User updates profile information:
 * 1. Name changed
 * 2. Email updated
 * 3. Preferences modified
 * Result: Multiple profile-related data changed
 * Solution: `revalidatePath('/profile')` ensures all data is fresh
 *
 * ### Inventory Management
 * Admin updates product inventory:
 * 1. Stock levels changed
 * 2. Prices updated
 * 3. Featured status modified
 * Result: Entire catalog needs refresh
 * Solution: `revalidatePath('/shop')` updates whole shop
 *
 * ## 9. PERFORMANCE IMPLICATIONS
 *
 * ### Advantages:
 * ✅ Simple API - one function call
 * ✅ Guaranteed freshness - everything is updated
 * ✅ No need to track individual tags
 * ✅ Perfect for major state changes
 *
 * ### Disadvantages:
 * ⚠️ Invalidates more than needed
 * ⚠️ Can be less efficient than tag-based
 * ⚠️ No stale-while-revalidate behavior
 * ⚠️ All cache entries expire immediately
 *
 * ## 10. BEST PRACTICES
 *
 * ### DO:
 * ✅ Use for major user actions (checkout, profile update)
 * ✅ Use when multiple unrelated data changed
 * ✅ Combine with revalidateTag for granular control
 * ✅ Document which paths are revalidated and why
 *
 * ### DON'T:
 * ❌ Overuse - causes unnecessary cache invalidation
 * ❌ Use for frequent small updates (use tags instead)
 * ❌ Forget to handle errors
 * ❌ Revalidate unrelated paths
 *
 * ## 11. ERROR HANDLING
 *
 * Always wrap revalidatePath in try-catch:
 *
 * ```typescript
 * export async function updateData() {
 *   try {
 *     await updateDatabase();
 *     revalidatePath('/data');
 *     return { success: true };
 *   } catch (error) {
 *     console.error('Revalidation failed:', error);
 *     return { success: false, error: 'Update failed' };
 *   }
 * }
 * ```
 *
 * ## 12. DEBUGGING
 *
 * To debug revalidatePath:
 * - Add console.log before revalidatePath call
 * - Check Next.js cache headers
 * - Monitor timestamp changes in UI
 * - Test in production environment
 *
 * ## 13. PRODUCTION CONSIDERATIONS
 *
 * ### On Vercel:
 * - Path revalidation propagates to all edge locations
 * - Takes a few seconds to propagate globally
 * - Works with ISR (Incremental Static Regeneration)
 * - Can be triggered via API routes or webhooks
 *
 * ### Rate Limits:
 * - Be mindful of revalidation frequency
 * - Avoid revalidating the same path rapidly
 * - Consider implementing debouncing for frequent actions
 *
 * The examples below demonstrate revalidatePath in real-world shopping scenarios.
 */

export default function RevalidatePathDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const code: FileSystemObject[] = [{
    type: "directory",
    name: "@revalidatePath-demos",
    path: "/@revalidatePath-demos",
    children: [
      {
        type: "file",
        name: "checkout-flow.tsx",
        path: "/server/checkout-flow.tsx",
        code: `// checkout-flow.tsx - Path revalidation after checkout
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma-shopping';

/**
 * Checkout Action
 * After checkout, multiple paths need to be refreshed:
 * - /orders (new order added)
 * - /shop/cart (cart cleared)
 * - /profile (order history updated)
 */
export async function checkoutAction(userId: string) {
  try {
    // 1. Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    // 2. Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // 3. Create order
    await prisma.order.create({
      data: {
        userId,
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalAmount: total,
        status: 'completed',
      },
    });

    // 4. Clear cart
    await prisma.cartItem.deleteMany({
      where: { userId },
    });

    // 5. Revalidate paths
    revalidatePath('/orders');      // ✅ Orders page
    revalidatePath('/shop/cart');   // ✅ Cart page
    revalidatePath('/profile');     // ✅ Profile page

    return { success: true };
  } catch (error) {
    console.error('Checkout failed:', error);
    return { success: false, error: 'Checkout failed' };
  }
}`,
      },
      {
        type: "file",
        name: "profile-update.tsx",
        path: "/server/profile-update.tsx",
        code: `// profile-update.tsx - Path revalidation after profile update
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma-shopping';

/**
 * Update Profile Action
 * After profile update, refresh profile-related paths
 */
export async function updateProfileAction(
  userId: string,
  data: { name: string; email: string }
) {
  try {
    await prisma.userProfile.upsert({
      where: { userId },
      update: {
        name: data.name,
        email: data.email,
      },
      create: {
        userId,
        name: data.name,
        email: data.email,
      },
    });

    // Revalidate profile-related paths
    revalidatePath('/profile');     // ✅ Main profile page
    revalidatePath('/settings');    // ✅ Settings page

    return { success: true };
  } catch (error) {
    console.error('Profile update failed:', error);
    return { success: false, error: 'Update failed' };
  }
}`,
      },
      {
        type: "file",
        name: "inventory-update.tsx",
        path: "/server/inventory-update.tsx",
        code: `// inventory-update.tsx - Path revalidation for inventory changes
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma-shopping';

/**
 * Update Inventory Action
 * When inventory changes, refresh shop-related paths
 */
export async function updateInventoryAction(
  productId: string,
  stock: number
) {
  try {
    await prisma.product.update({
      where: { id: productId },
      data: { stock },
    });

    // Revalidate shop-related paths
    revalidatePath('/shop');              // ✅ Main shop page
    revalidatePath('/admin/inventory');   // ✅ Admin inventory page

    return { success: true };
  } catch (error) {
    console.error('Inventory update failed:', error);
    return { success: false, error: 'Update failed' };
  }
}`,
      },
      {
        type: "file",
        name: "orders-display.tsx",
        path: "/server/orders-display.tsx",
        code: `// orders-display.tsx - Display orders (revalidated after checkout)
'use server';

import { prisma } from '@/lib/prisma-shopping';

/**
 * Get user orders
 * This data is cached and revalidated via revalidatePath('/orders')
 */
export async function getOrders(userId: string) {
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return orders;
}

export default async function OrdersDisplay({ userId }: { userId: string }) {
  const orders = await getOrders(userId);

  return (
    <div>
      <h3>My Orders</h3>
      <p>This page is revalidated via revalidatePath('/orders')</p>
      {/* Orders list */}
    </div>
  );
}`,
      },
      {
        type: "file",
        name: "path-visualization.tsx",
        path: "/client/path-visualization.tsx",
        code: `// path-visualization.tsx - Visualize path invalidation
'use client';

import { Card } from '@/components/shadcn-ui/card';

/**
 * Shows which paths are revalidated for different actions
 */
export default function PathVisualization() {
  const pathMappings = [
    {
      action: 'Checkout',
      paths: ['/orders', '/shop/cart', '/profile'],
      reason: 'Order created, cart cleared, order history updated',
    },
    {
      action: 'Profile Update',
      paths: ['/profile', '/settings'],
      reason: 'User information changed',
    },
    {
      action: 'Inventory Update',
      paths: ['/shop', '/admin/inventory'],
      reason: 'Product stock or details changed',
    },
  ];

  return (
    <Card>
      {/* Visualization */}
    </Card>
  );
}`,
      },
    ]
  }];

  return (
    <TabbedDashboard fileSystem={code}>

      <header className='border-b border-zinc-200 dark:border-zinc-800'>
        <nav>
          <ul className='flex gap-6 px-4 py-2'>
            <li>
              <Link className='text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100' href="/nextjs-demo/demo/getting-started/caching-and-revalidating/all-posts">
                All Posts
              </Link>
            </li>
            <li>
              <Link className='text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100' href="/nextjs-demo/demo/getting-started/caching-and-revalidating/my-posts">
                My Posts
              </Link>
            </li>
            <li>
              <Link className='text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100' href="/nextjs-demo/demo/getting-started/caching-and-revalidating/create-posts">
                Create Posts
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {children}
    </TabbedDashboard>
  );
}




