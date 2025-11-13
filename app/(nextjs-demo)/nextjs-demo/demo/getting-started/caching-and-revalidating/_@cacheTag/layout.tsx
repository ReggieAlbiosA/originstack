import { FileSystemObject } from '@/components/layout/types/types';
import TabbedDashboard from '@/components/layout/server/tabbed-dashboard';

/**
 * UNDERSTANDING CACHE TAGS IN NEXT.JS
 * ====================================
 *
 * Based on Next.js documentation and Vercel's implementation:
 *
 * ## 1. WHAT ARE CACHE TAGS?
 * Cache tags are labels you assign to cached data that allow you to selectively
 * invalidate specific cache entries later. Think of them as "categories" or "labels"
 * for your cached content.
 *
 * ## 2. WHY USE CACHE TAGS?
 * Without tags, you're limited to:
 * - Time-based invalidation (revalidate every N seconds)
 * - Path-based invalidation (invalidate entire routes)
 *
 * With tags, you get:
 * - Granular control over what gets invalidated
 * - Multiple requests can share the same tag
 * - One invalidation action can update all related data
 * - Better cache efficiency (only invalidate what changed)
 *
 * ## 3. HOW TO ASSIGN CACHE TAGS
 *
 * ### A. Single Tag
 * ```typescript
 * const res = await fetch('https://api.example.com/products', {
 *   next: { tags: ['products'] }
 * });
 * ```
 *
 * ### B. Multiple Tags
 * You can assign multiple tags to the same request:
 * ```typescript
 * const res = await fetch('https://api.example.com/products/123', {
 *   next: { tags: ['products', 'product-123', 'electronics'] }
 * });
 * ```
 *
 * This allows invalidation at different levels:
 * - Invalidate all products
 * - Invalidate specific product
 * - Invalidate all electronics
 *
 * ### C. Dynamic Tags
 * Tags can be dynamic based on IDs or categories:
 * ```typescript
 * const res = await fetch(`https://api.example.com/products/${id}`, {
 *   next: { tags: ['products', `product-${id}`, `category-${category}`] }
 * });
 * ```
 *
 * ## 4. TAG NAMING CONVENTIONS
 *
 * ### Best Practices:
 * ✅ Use descriptive names: `products`, `user-profile`, `cart-items`
 * ✅ Use hierarchical tags: `products`, `category-electronics`, `product-123`
 * ✅ Use kebab-case: `shopping-cart`, `user-wishlist`
 * ✅ Include IDs for specific resources: `user-${userId}`, `order-${orderId}`
 *
 * ### Avoid:
 * ❌ Generic names: `data`, `cache`, `items`
 * ❌ Too many tags per request (keep it reasonable)
 * ❌ Special characters that might cause issues
 *
 * ## 5. REAL-WORLD EXAMPLE: E-COMMERCE
 *
 * ### Product Catalog
 * ```typescript
 * // Main catalog - tag with general category
 * const products = await fetch('/api/products', {
 *   next: { tags: ['products', 'catalog'] }
 * });
 * ```
 *
 * ### Specific Product
 * ```typescript
 * // Individual product - tag with multiple levels
 * const product = await fetch(`/api/products/${id}`, {
 *   next: { tags: ['products', `product-${id}`, `category-${category}`] }
 * });
 * ```
 *
 * ### User's Wishlist
 * ```typescript
 * // User-specific data - tag with user ID
 * const wishlist = await fetch(`/api/users/${userId}/wishlist`, {
 *   next: { tags: ['wishlist', `user-${userId}`] }
 * });
 * ```
 *
 * ### Featured Products
 * ```typescript
 * // Special collections - tag appropriately
 * const featured = await fetch('/api/products?featured=true', {
 *   next: { tags: ['products', 'featured', 'homepage'] }
 * });
 * ```
 *
 * ## 6. COMBINING TAGS WITH OTHER STRATEGIES
 *
 * You can combine tags with time-based revalidation:
 * ```typescript
 * const res = await fetch('https://api.example.com/products', {
 *   next: {
 *     revalidate: 3600,        // Auto-refresh every hour
 *     tags: ['products']        // Also allow manual refresh
 *   }
 * });
 * ```
 *
 * This provides:
 * - Automatic background updates (time-based)
 * - Manual on-demand updates (tag-based)
 * - Best of both worlds
 *
 * ## 7. HOW TAGS WORK WITH INVALIDATION
 *
 * Once you've tagged your data, you can invalidate it using:
 *
 * ### revalidateTag() - Background Revalidation
 * ```typescript
 * revalidateTag('products', 'max'); // Stale-while-revalidate
 * ```
 * - Serves stale data immediately
 * - Fetches fresh data in background
 * - Updates cache for next request
 *
 * ### updateTag() - Immediate Invalidation
 * ```typescript
 * updateTag('products'); // Immediate expiration
 * ```
 * - Expires cache immediately
 * - Next request fetches fresh data
 * - No stale-while-revalidate
 *
 * ## 8. TAG HIERARCHIES IN SHOPPING DEMO
 *
 * Our shopping demo uses a hierarchical tagging strategy:
 *
 * ```
 * Root Tags:
 * ├─ 'products'           → All product data
 * │  ├─ 'category-electronics'  → Electronics only
 * │  ├─ 'category-clothing'     → Clothing only
 * │  └─ 'product-{id}'          → Specific product
 * │
 * ├─ 'cart'               → Shopping cart data
 * │  └─ 'user-{id}-cart'        → User-specific cart
 * │
 * ├─ 'orders'             → Order data
 * │  └─ 'user-{id}-orders'      → User-specific orders
 * │
 * ├─ 'wishlist'           → Wishlist data
 * │  └─ 'user-{id}-wishlist'    → User-specific wishlist
 * │
 * └─ 'featured'           → Featured products
 *    └─ 'homepage'              → Homepage featured items
 * ```
 *
 * ## 9. CACHE TAG BENEFITS
 *
 * ### Efficiency
 * - Only invalidate what changed
 * - Keep unrelated cache entries valid
 * - Reduce unnecessary data fetching
 *
 * ### Flexibility
 * - Invalidate at different granularities
 * - One tag can affect multiple requests
 * - Multiple tags can affect one request
 *
 * ### Performance
 * - Faster cache invalidation
 * - Less load on your data source
 * - Better user experience
 *
 * ## 10. WHEN TO USE CACHE TAGS
 *
 * ✅ Use cache tags when:
 * - Data can be categorized or grouped
 * - You need selective cache invalidation
 * - Multiple endpoints return related data
 * - You want granular control over cache
 * - User actions should trigger specific updates
 *
 * ❌ Don't use cache tags when:
 * - Data is always real-time (use cache: 'no-store')
 * - You're invalidating entire pages anyway (use revalidatePath)
 * - Tags would be too complex to manage
 * - Cache invalidation is purely time-based
 *
 * ## 11. DEBUGGING CACHE TAGS
 *
 * To see which tags are associated with cached data:
 * - Check Next.js cache headers in DevTools
 * - Use `console.log` in revalidation actions
 * - Monitor cache hit/miss patterns
 * - Test invalidation with different tag combinations
 *
 * ## 12. PRODUCTION CONSIDERATIONS
 *
 * ### On Vercel:
 * - Tags are stored in the Edge Cache metadata
 * - Invalidation propagates globally
 * - REST API available for programmatic invalidation
 * - Rate limits apply to invalidation requests
 *
 * ### Tag Limits:
 * - Maximum tags per request: 64
 * - Maximum tag length: 256 characters
 * - Total tags string length: 8196 characters
 *
 * The examples below demonstrate cache tags in a real-world shopping context.
 */

export default function CacheTagDemoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const code: FileSystemObject[] = [{
        type: "directory",
        name: "@cacheTag-demos",
        path: "/@cacheTag-demos",
        children: [
            {
                type: "file",
                name: "product-catalog.tsx",
                path: "/server/product-catalog.tsx",
                code: `// product-catalog.tsx - Demonstrating cache tags on product data
'use server';

import { prisma } from '@/lib/prisma-shopping';

/**
 * Fetch all products with cache tags
 * Tags: ['products', 'catalog']
 */
async function getProducts() {
  // In a real app, this would use fetch() with tags
  // For demo purposes, we're showing the concept
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return products;
}

// Example with fetch() and cache tags:
async function getProductsWithTags() {
  const res = await fetch('https://api.example.com/products', {
    next: {
      tags: ['products', 'catalog'], // ✅ These tags enable selective invalidation
    },
  });

  return res.json();
}

/**
 * Fetch products by category with hierarchical tags
 * Tags: ['products', 'category-electronics']
 */
async function getProductsByCategory(category: string) {
  const res = await fetch(\`https://api.example.com/products?category=\${category}\`, {
    next: {
      tags: [
        'products',              // ✅ All products
        \`category-\${category}\`,  // ✅ Specific category
      ],
    },
  });

  return res.json();
}

export default async function ProductCatalog() {
  const products = await getProducts();

  return (
    <div>
      <h3>Product Catalog</h3>
      <p>Tagged with: ['products', 'catalog']</p>
      {/* Product list rendering */}
    </div>
  );
}`,
            },
            {
                type: "file",
                name: "featured-products.tsx",
                path: "/server/featured-products.tsx",
                code: `// featured-products.tsx - Featured items with specific tags
'use server';

import { prisma } from '@/lib/prisma-shopping';

/**
 * Fetch featured products
 * Tags: ['products', 'featured', 'homepage']
 *
 * Multiple tags allow invalidation at different levels:
 * - revalidateTag('products') → Updates all product-related cache
 * - revalidateTag('featured') → Updates only featured items
 * - revalidateTag('homepage') → Updates all homepage content
 */
async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { featured: true },
    take: 6,
    orderBy: { createdAt: 'desc' },
  });

  return products;
}

// With fetch() and cache tags:
async function getFeaturedWithTags() {
  const res = await fetch('https://api.example.com/products?featured=true', {
    next: {
      tags: [
        'products',   // ✅ General product tag
        'featured',   // ✅ Featured items tag
        'homepage',   // ✅ Homepage content tag
      ],
    },
  });

  return res.json();
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <div>
      <h3>Featured Products</h3>
      <p>Tagged with: ['products', 'featured', 'homepage']</p>
      {/* Featured products rendering */}
    </div>
  );
}`,
            },
            {
                type: "file",
                name: "user-wishlist.tsx",
                path: "/server/user-wishlist.tsx",
                code: `// user-wishlist.tsx - User-specific cache tags
'use server';

import { prisma } from '@/lib/prisma-shopping';
import { DEMO_USER_ID } from '@/lib/shopping-demo/constants';

/**
 * Fetch user's wishlist with user-specific tags
 * Tags: ['wishlist', 'user-{userId}']
 *
 * User-specific tags enable:
 * - Per-user cache invalidation
 * - Efficient cache management
 * - No impact on other users' cache
 */
async function getUserWishlist(userId: string) {
  const profile = await prisma.userProfile.findUnique({
    where: { userId },
  });

  if (!profile?.wishlist) return [];

  const productIds = profile.wishlist as string[];
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  return products;
}

// With fetch() and cache tags:
async function getWishlistWithTags(userId: string) {
  const res = await fetch(\`https://api.example.com/users/\${userId}/wishlist\`, {
    next: {
      tags: [
        'wishlist',           // ✅ All wishlists
        \`user-\${userId}\`,     // ✅ This specific user
        \`user-\${userId}-wishlist\`, // ✅ This user's wishlist specifically
      ],
    },
  });

  return res.json();
}

export default async function UserWishlist() {
  const wishlist = await getUserWishlist(DEMO_USER_ID);

  return (
    <div>
      <h3>My Wishlist</h3>
      <p>Tagged with: ['wishlist', 'user-{userId}', 'user-{userId}-wishlist']</p>
      <p>Count: {wishlist.length} items</p>
    </div>
  );
}`,
            },
            {
                type: "file",
                name: "tag-visualization.tsx",
                path: "/client/tag-visualization.tsx",
                code: `// tag-visualization.tsx - Visualize tag hierarchies
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';

/**
 * Visual representation of cache tag hierarchies
 * Helps understand how tags are organized and used
 */
export default function TagVisualization() {
  const tagHierarchy = {
    products: {
      description: 'All product data',
      children: {
        'category-electronics': 'Electronics products only',
        'category-clothing': 'Clothing products only',
        'product-{id}': 'Specific product by ID',
      },
    },
    cart: {
      description: 'Shopping cart data',
      children: {
        'user-{id}-cart': 'User-specific cart',
      },
    },
    wishlist: {
      description: 'Wishlist data',
      children: {
        'user-{id}-wishlist': 'User-specific wishlist',
      },
    },
    featured: {
      description: 'Featured products',
      children: {
        homepage: 'Homepage featured items',
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cache Tag Hierarchy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(tagHierarchy).map(([tag, data]) => (
            <div key={tag} className="border-l-2 border-blue-500 pl-4">
              <h4 className="font-semibold text-blue-600">{tag}</h4>
              <p className="text-sm text-muted-foreground">{data.description}</p>
              {data.children && (
                <div className="mt-2 ml-4 space-y-1">
                  {Object.entries(data.children).map(([childTag, desc]) => (
                    <div key={childTag} className="text-sm">
                      <span className="font-mono bg-muted px-1 rounded">{childTag}</span>
                      <span className="text-muted-foreground ml-2">{desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}`,
            },
        ]
    }];

    return (
        <div className="space-y-8">
            <header className="text-2xl font-bold">
                <h2>Cache Tags - Labeling Your Cached Data</h2>
            </header>
            <TabbedDashboard fileSystem={code}>
                {children}
            </TabbedDashboard>
        </div>
    );
}

