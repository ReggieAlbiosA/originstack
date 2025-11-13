import { FileSystemObject } from '@/components/layout/types/types';
import TabbedDashboard from '@/components/layout/server/tabbed-dashboard';

/**
 * UNDERSTANDING revalidateTag IN NEXT.JS
 * =======================================
 *
 * Based on Next.js documentation and Vercel's implementation:
 *
 * ## 1. WHAT IS revalidateTag?
 * revalidateTag is a server-side function that invalidates cached data
 * associated with specific tags. It provides granular control over cache
 * invalidation with optimal performance through stale-while-revalidate.
 *
 * ## 2. HOW IT WORKS
 *
 * ```typescript
 * import { revalidateTag } from 'next/cache';
 *
 * // In Server Actions or Route Handlers
 * revalidateTag('products', 'max');  // ✅ Recommended: stale-while-revalidate
 * revalidateTag('products');          // ❌ Legacy: immediate expiration
 * ```
 *
 * ## 3. STALE-WHILE-REVALIDATE BEHAVIOR (profile="max")
 *
 * When using `revalidateTag(tag, 'max')`:
 * 1. **Tag is marked as stale** (not deleted)
 * 2. **Next request**: Serves stale data immediately (fast response)
 * 3. **Background**: Fetches fresh data from source
 * 4. **Cache updated**: Future requests get fresh data
 *
 * Benefits:
 * ✅ No request latency - users get instant response
 * ✅ Smooth user experience - no loading delays
 * ✅ Reduced origin load - controlled revalidation
 *
 * ## 4. LEGACY BEHAVIOR (without profile)
 *
 * When using `revalidateTag(tag)` without profile:
 * 1. **Cache immediately expires** (deleted)
 * 2. **Next request**: Must wait for fresh data fetch
 * 3. **User sees delay** during data fetch
 *
 * ⚠️ This is deprecated - always use profile="max" for better UX
 *
 * ## 5. WHEN TO USE revalidateTag
 *
 * ✅ Use revalidateTag when:
 * - Specific data changed (not entire page)
 * - You want granular control
 * - Stale data is acceptable temporarily
 * - You need optimal performance
 * - Multiple requests share the same tag
 *
 * ❌ Don't use revalidateTag when:
 * - User MUST see changes immediately (use updateTag)
 * - Entire page needs refresh (use revalidatePath)
 * - Real-time data is critical (use cache: 'no-store')
 *
 * ## 6. revalidateTag vs updateTag vs revalidatePath
 *
 * ### revalidateTag:
 * - Scope: Tagged data only
 * - Behavior: Stale-while-revalidate (with profile="max")
 * - Where: Server Actions + Route Handlers
 * - Speed: Instant (serves stale)
 * - Use: General updates, non-critical changes
 *
 * ### updateTag:
 * - Scope: Tagged data only
 * - Behavior: Immediate expiration
 * - Where: Server Actions ONLY
 * - Speed: Slower (waits for fresh data)
 * - Use: Critical updates, must see changes
 *
 * ### revalidatePath:
 * - Scope: Entire page/route
 * - Behavior: Immediate expiration
 * - Where: Server Actions + Route Handlers
 * - Speed: Slower (waits for fresh data)
 * - Use: Full page refresh
 *
 * ## 7. REAL-WORLD EXAMPLES: E-COMMERCE
 *
 * ### A. Product Price Update
 * ```typescript
 * 'use server';
 * import { revalidateTag } from 'next/cache';
 *
 * export async function updateProductPrice(id: string, price: number) {
 *   await db.product.update({ id, price });
 *
 *   // ✅ Update product cache with stale-while-revalidate
 *   revalidateTag('products', 'max');
 *   revalidateTag(\`product-\${id}\`, 'max');
 *   revalidateTag('pricing', 'max');
 * }
 * ```
 *
 * ### B. Category Update
 * ```typescript
 * export async function updateCategory(category: string) {
 *   await db.products.updateMany({ category, featured: true });
 *
 *   // ✅ Update only specific category
 *   revalidateTag(\`category-\${category}\`, 'max');
 * }
 * ```
 *
 * ### C. Stock Level Change
 * ```typescript
 * export async function updateStock(productId: string, stock: number) {
 *   await db.product.update({ id: productId, stock });
 *
 *   // ✅ Update specific product and general inventory
 *   revalidateTag(\`product-\${productId}\`, 'max');
 *   revalidateTag('inventory', 'max');
 * }
 * ```
 *
 * ## 8. TAG INVALIDATION STRATEGIES
 *
 * ### Single Tag
 * ```typescript
 * revalidateTag('products', 'max');
 * ```
 * - Invalidates all requests tagged with 'products'
 * - Broad but controlled
 *
 * ### Multiple Tags
 * ```typescript
 * revalidateTag('products', 'max');
 * revalidateTag('category-electronics', 'max');
 * revalidateTag('featured', 'max');
 * ```
 * - Invalidates multiple specific tags
 * - More granular control
 *
 * ### Hierarchical Tags
 * ```typescript
 * revalidateTag(\`product-\${id}\`, 'max');     // Specific product
 * revalidateTag('products', 'max');            // All products
 * ```
 * - Update at different levels
 * - Flexible cache management
 *
 * ## 9. PERFORMANCE COMPARISON
 *
 * ### With stale-while-revalidate (revalidateTag with profile="max"):
 * ```
 * Request 1: 50ms (serves stale, revalidates background)
 * Request 2: 50ms (serves fresh data from cache)
 * Request 3: 50ms (continues serving fresh data)
 * ```
 *
 * ### Without stale-while-revalidate (legacy):
 * ```
 * Request 1: 500ms (waits for fresh data fetch)
 * Request 2: 50ms (serves fresh data from cache)
 * Request 3: 50ms (continues serving fresh data)
 * ```
 *
 * **Result**: 10x faster response for first request!
 *
 * ## 10. COMBINING WITH OTHER STRATEGIES
 *
 * You can use revalidateTag alongside other methods:
 *
 * ```typescript
 * export async function majorProductUpdate() {
 *   await updateDatabase();
 *
 *   // ✅ Tag-based for specific data
 *   revalidateTag('products', 'max');
 *
 *   // ✅ Path-based for entire pages
 *   revalidatePath('/shop');
 * }
 * ```
 *
 * ## 11. SHOPPING DEMO USE CASES
 *
 * ### Product Updates
 * Admin changes product details:
 * - Price updated
 * - Description changed
 * - Stock level adjusted
 * Solution: `revalidateTag('products', 'max')` - smooth update
 *
 * ### Category Management
 * Admin updates category:
 * - Featured items changed
 * - Category filters updated
 * Solution: `revalidateTag('category-electronics', 'max')` - targeted update
 *
 * ### Search Results
 * Products added/removed:
 * - Search index updated
 * - Filters refreshed
 * Solution: `revalidateTag('search', 'max')` - background refresh
 *
 * ## 12. BEST PRACTICES
 *
 * ### DO:
 * ✅ Always use profile="max" for stale-while-revalidate
 * ✅ Use for non-critical updates
 * ✅ Tag related data with same tags
 * ✅ Combine with time-based revalidation
 * ✅ Handle errors gracefully
 *
 * ### DON'T:
 * ❌ Use for critical "read-your-own-writes" scenarios
 * ❌ Omit profile parameter (legacy behavior)
 * ❌ Over-invalidate (affects performance)
 * ❌ Forget to tag data properly
 *
 * ## 13. ERROR HANDLING
 *
 * ```typescript
 * export async function updateData() {
 *   try {
 *     await updateDatabase();
 *     revalidateTag('data', 'max');
 *     return { success: true };
 *   } catch (error) {
 *     console.error('Revalidation failed:', error);
 *     return { success: false, error: 'Update failed' };
 *   }
 * }
 * ```
 *
 * ## 14. DEBUGGING
 *
 * To debug revalidateTag:
 * - Add timestamps in components
 * - Check cache headers in DevTools
 * - Monitor background revalidation
 * - Compare response times
 *
 * ## 15. PRODUCTION CONSIDERATIONS
 *
 * ### On Vercel:
 * - Tag revalidation propagates to edge network
 * - Background revalidation happens globally
 * - Stale-while-revalidate works across regions
 * - REST API available for external triggers
 *
 * ### Performance:
 * - First request after revalidation: Fast (stale)
 * - Background fetch: Non-blocking
 * - Cache update: Automatic
 * - User experience: Seamless
 *
 * The examples below demonstrate revalidateTag with stale-while-revalidate.
 */

export default function RevalidateTagDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const code: FileSystemObject[] = [{
    type: "directory",
    name: "@revalidateTag-demos",
    path: "/@revalidateTag-demos",
    children: [
      {
        type: "file",
        name: "product-updates.tsx",
        path: "/server/product-updates.tsx",
        code: `// product-updates.tsx - Tag revalidation for product changes
'use server';

import { revalidateTag } from 'next/cache';
import { prisma } from '@/lib/prisma-shopping';

/**
 * Update product and revalidate tags
 * Uses stale-while-revalidate for smooth UX
 */
export async function updateProductAction(
  productId: string,
  updates: { price?: number; stock?: number }
) {
  try {
    await prisma.product.update({
      where: { id: productId },
      data: updates,
    });

    // ✅ Revalidate with stale-while-revalidate
    revalidateTag('products', 'max');           // All products
    revalidateTag(\`product-\${productId}\`, 'max'); // Specific product
    revalidateTag('pricing', 'max');            // Pricing data

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Update failed' };
  }
}

/**
 * Fetch products with cache tags
 */
async function getProducts() {
  // Simulating fetch with tags
  // In reality, this would be:
  // const res = await fetch('https://api.example.com/products', {
  //   next: { tags: ['products', 'pricing'] }
  // });

  const products = await prisma.product.findMany();
  return products;
}`,
      },
      {
        type: "file",
        name: "category-updates.tsx",
        path: "/server/category-updates.tsx",
        code: `// category-updates.tsx - Category-specific tag revalidation
'use server';

import { revalidateTag } from 'next/cache';
import { prisma } from '@/lib/prisma-shopping';

/**
 * Update category and revalidate specific tags
 */
export async function updateCategoryAction(category: string) {
  try {
    await prisma.product.updateMany({
      where: { category },
      data: { updatedAt: new Date() },
    });

    // ✅ Revalidate only specific category
    revalidateTag(\`category-\${category}\`, 'max');
    // Other categories remain cached (efficient!)

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Update failed' };
  }
}

/**
 * Fetch category products with tags
 */
async function getCategoryProducts(category: string) {
  // With fetch:
  // const res = await fetch(\`https://api.example.com/products?category=\${category}\`, {
  //   next: { tags: ['products', \`category-\${category}\`] }
  // });

  const products = await prisma.product.findMany({
    where: { category },
  });
  return products;
}`,
      },
      {
        type: "file",
        name: "comparison-demo.tsx",
        path: "/client/comparison-demo.tsx",
        code: `// comparison-demo.tsx - Visual comparison of revalidation methods
'use client';

import { Card } from '@/components/shadcn-ui/card';

/**
 * Shows the difference between revalidation methods
 */
export default function ComparisonDemo() {
  return (
    <Card>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <h4>revalidateTag</h4>
          <ul>
            <li>✅ Stale-while-revalidate</li>
            <li>✅ Background update</li>
            <li>✅ Instant response</li>
            <li>✅ Server Actions + Route Handlers</li>
          </ul>
        </div>
        <div>
          <h4>updateTag</h4>
          <ul>
            <li>❌ Immediate expiration</li>
            <li>❌ Blocks on fresh fetch</li>
            <li>⚠️ Slower response</li>
            <li>⚠️ Server Actions only</li>
          </ul>
        </div>
        <div>
          <h4>revalidatePath</h4>
          <ul>
            <li>❌ Immediate expiration</li>
            <li>❌ Entire page</li>
            <li>⚠️ Less granular</li>
            <li>✅ Server Actions + Route Handlers</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}`,
      },
    ]
  }];

  return (
    <div className="space-y-8">
      <header className="text-2xl font-bold">
        <h2>revalidateTag - Granular Cache Revalidation with Stale-While-Revalidate</h2>
      </header>
      <TabbedDashboard fileSystem={code}>
        {children}
      </TabbedDashboard>
    </div>
  );
}




