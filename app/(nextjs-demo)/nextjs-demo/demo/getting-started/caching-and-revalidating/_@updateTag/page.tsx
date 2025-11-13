import { Suspense } from 'react';
import ShoppingCart from './server/shopping-cart';
import OrderHistory from './server/order-history';
import CartStats from './server/cart-stats';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import UpdateTagComparison from './client/update-tag-comparison';
import CartActions from './client/cart-actions';

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

export default function UpdateTagDemoPage() {
    return (
        <div className="space-y-6 p-6">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">updateTag - Immediate Cache Expiration</h3>
                <p className="text-muted-foreground">
                    Explore immediate cache expiration for critical operations. When users add/remove cart
                    items or place orders, they expect to see changes immediately. updateTag ensures instant
                    consistency by immediately deleting cache entries, though at the cost of a fresh data fetch.
                </p>
            </div>

            {/* Comparison Chart */}
            <UpdateTagComparison />

            {/* Interactive Cart Actions */}
            <CartActions />

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Demo 1: Shopping Cart - Updated with updateTag */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <ShoppingCart />
                </Suspense>

                {/* Demo 2: Order History - Updated with updateTag */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <OrderHistory />
                </Suspense>

                {/* Demo 3: Cart Stats */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <CartStats />
                </Suspense>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div className="space-y-3">
                        <h5 className="text-sm font-semibold text-red-900 dark:text-red-100">🎯 Read-Your-Own-Writes Pattern</h5>
                        <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
                            <li className="flex items-start gap-2">
                                <span className="text-red-600 dark:text-red-400 mt-0.5">1.</span>
                                <span><strong>User Action</strong>: Add/remove cart item, place order</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-600 dark:text-red-400 mt-0.5">2.</span>
                                <span><strong>Database Update</strong>: Server modifies data</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-600 dark:text-red-400 mt-0.5">3.</span>
                                <span><strong>Cache Deletion</strong>: <code className="bg-red-100 dark:bg-red-900 px-1 rounded">updateTag()</code> expires cache immediately</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-600 dark:text-red-400 mt-0.5">4.</span>
                                <span><strong>Fresh Fetch</strong>: Next request fetches from source</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-600 dark:text-red-400 mt-0.5">5.</span>
                                <span><strong>User Sees Changes</strong>: No stale data confusion</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                <div className="space-y-3">
                    <h5 className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">⚠️ Performance Trade-Off</h5>
                    <div className="text-sm text-yellow-800 dark:text-yellow-200 space-y-2">
                        <p>updateTag provides <strong>immediate consistency</strong> but at a cost:</p>
                        <div className="grid sm:grid-cols-2 gap-4 mt-2">
                            <div>
                                <p className="font-medium text-green-700 dark:text-green-300">✅ Benefits:</p>
                                <ul className="text-xs mt-1 space-y-0.5 ml-4">
                                    <li>• User sees changes immediately</li>
                                    <li>• No stale data confusion</li>
                                    <li>• Guaranteed consistency</li>
                                    <li>• Perfect for critical operations</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-medium text-red-700 dark:text-red-300">⚠️ Costs:</p>
                                <ul className="text-xs mt-1 space-y-0.5 ml-4">
                                    <li>• Slower response (waits for fetch)</li>
                                    <li>• No stale-while-revalidate</li>
                                    <li>• Increased origin server load</li>
                                    <li>• Potential cache stampede</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-card">
                    <h5 className="font-semibold text-sm mb-2 text-green-600 dark:text-green-400">✅ When to use updateTag:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• <strong>Shopping Cart</strong>: Add/remove items</li>
                        <li>• <strong>Orders</strong>: Place order, cancel order</li>
                        <li>• <strong>Profile</strong>: Update personal info</li>
                        <li>• <strong>Account</strong>: Delete account, change password</li>
                        <li>• Any "read-your-own-writes" scenario</li>
                    </ul>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                    <h5 className="font-semibold text-sm mb-2 text-blue-600 dark:text-blue-400">💡 When to use revalidateTag instead:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• <strong>Product Updates</strong>: Price changes</li>
                        <li>• <strong>Inventory</strong>: Stock level changes</li>
                        <li>• <strong>Categories</strong>: Category updates</li>
                        <li>• <strong>Reviews</strong>: New reviews added</li>
                        <li>• Any non-critical background update</li>
                    </ul>
                </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <div className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                    <p className="font-medium text-purple-900 dark:text-purple-100">⚡ Key Difference from revalidateTag:</p>
                    <div className="grid sm:grid-cols-2 gap-3 mt-2">
                        <div className="p-3 bg-white dark:bg-purple-950/40 rounded">
                            <p className="font-medium text-xs mb-1">updateTag (this demo)</p>
                            <code className="text-xs">updateTag('cart')</code>
                            <p className="text-xs mt-1">→ Cache deleted immediately</p>
                            <p className="text-xs">→ Next request: 500ms (waits for fetch)</p>
                        </div>
                        <div className="p-3 bg-white dark:bg-purple-950/40 rounded">
                            <p className="font-medium text-xs mb-1">revalidateTag (@revalidateTag demo)</p>
                            <code className="text-xs">revalidateTag('cart', 'max')</code>
                            <p className="text-xs mt-1">→ Cache marked stale</p>
                            <p className="text-xs">→ Next request: 50ms (serves stale)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
