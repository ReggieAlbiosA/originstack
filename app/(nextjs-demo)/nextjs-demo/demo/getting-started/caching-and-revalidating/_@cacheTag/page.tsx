import { Suspense } from 'react';
import ProductCatalog from './server/product-catalog';
import FeaturedProducts from './server/featured-products';
import UserWishlist from './server/user-wishlist';
import CategoryProducts from './server/category-products';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import TagVisualization from './client/tag-visualization';

function LoadingSkeleton() {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-32 bg-muted rounded"></div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function CacheTagDemoPage() {
    return (
        <div className="space-y-6 p-6">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Cache Tags in Action - Shopping Demo</h3>
                <p className="text-muted-foreground">
                    Explore how cache tags work in a real shopping application. Each section demonstrates
                    different tagging strategies for various types of data. Tags enable selective cache
                    invalidation without affecting unrelated cached content.
                </p>
            </div>

            {/* Tag Hierarchy Visualization */}
            <TagVisualization />

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Demo 1: Product Catalog with General Tags */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <ProductCatalog />
                </Suspense>

                {/* Demo 2: Featured Products with Multiple Tags */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <FeaturedProducts />
                </Suspense>

                {/* Demo 3: Category-Specific Products */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <CategoryProducts />
                </Suspense>

                {/* Demo 4: User-Specific Wishlist */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <UserWishlist />
                </Suspense>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                    </div>
                    <div className="space-y-3">
                        <h5 className="text-sm font-semibold text-purple-900 dark:text-purple-100">🏷️ Cache Tag Best Practices</h5>
                        <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                                <span>Use <strong>descriptive names</strong> like 'products', 'cart', 'wishlist'</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                                <span>Create <strong>hierarchies</strong> with multiple tags: ['products', 'category-electronics']</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                                <span>Include <strong>IDs</strong> for specific resources: 'product-123', 'user-456-cart'</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                                <span>Assign <strong>multiple tags</strong> to enable invalidation at different levels</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                                <span>Maximum 64 tags per request, 256 characters per tag</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <div className="space-y-3">
                    <h5 className="text-sm font-semibold text-blue-900 dark:text-blue-100">💡 Understanding Tag Invalidation</h5>
                    <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                        <p>Once data is tagged, you can invalidate it using:</p>
                        <ul className="ml-4 space-y-1">
                            <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">revalidateTag('products')</code> → Invalidates all requests tagged with 'products'</li>
                            <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">revalidateTag('category-electronics')</code> → Invalidates only electronics category</li>
                            <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">updateTag('cart')</code> → Immediately expires cart cache (for critical updates)</li>
                        </ul>
                        <p className="mt-2 italic">
                            See the <strong>@revalidateTag</strong> and <strong>@updateTag</strong> demos to learn how to invalidate these tagged caches!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

