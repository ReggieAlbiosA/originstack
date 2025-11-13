import { Suspense } from 'react';
import OrdersDisplay from './server/orders-display';
import ProfileDisplay from './server/profile-display';
import ShopInventory from './server/shop-inventory';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import PathVisualization from './client/path-visualization';
import RevalidateActions from './client/revalidate-actions';

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

export default function RevalidatePathDemoPage() {
    return (
        <div className="space-y-6 p-6">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">revalidatePath in Action - Shopping Demo</h3>
                <p className="text-muted-foreground">
                    Explore path-based cache invalidation in a real shopping application. When major
                    actions occur (checkout, profile update, inventory change), entire pages are refreshed
                    to ensure all data is current.
                </p>
            </div>

            {/* Path Mapping Visualization */}
            <PathVisualization />

            {/* Interactive Actions */}
            <RevalidateActions />

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Demo 1: Orders Page - Revalidated after checkout */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <OrdersDisplay />
                </Suspense>

                {/* Demo 2: Profile Page - Revalidated after profile update */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <ProfileDisplay />
                </Suspense>

                {/* Demo 3: Shop Inventory - Revalidated after inventory update */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <ShopInventory />
                </Suspense>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="space-y-3">
                        <h5 className="text-sm font-semibold text-green-900 dark:text-green-100">🔄 revalidatePath Best Practices</h5>
                        <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                                <span>Use for <strong>major user actions</strong> like checkout, profile updates, or bulk changes</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                                <span>Perfect when <strong>multiple unrelated data</strong> on a page changed</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                                <span>Simpler than tracking and invalidating multiple tags</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                                <span>Guarantees <strong>complete freshness</strong> for entire page</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="space-y-3">
                        <h5 className="text-sm font-semibold text-amber-900 dark:text-amber-100">⚠️ When NOT to Use revalidatePath</h5>
                        <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600 dark:text-amber-400 mt-0.5">×</span>
                                <span>For <strong>small, specific data</strong> changes (use revalidateTag instead)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600 dark:text-amber-400 mt-0.5">×</span>
                                <span>When you need <strong>stale-while-revalidate</strong> behavior</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600 dark:text-amber-400 mt-0.5">×</span>
                                <span>For <strong>frequent updates</strong> (causes excessive cache invalidation)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <div className="space-y-3">
                    <h5 className="text-sm font-semibold text-blue-900 dark:text-blue-100">💡 revalidatePath vs revalidateTag</h5>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
                        <div className="space-y-2">
                            <p className="font-medium">revalidatePath:</p>
                            <ul className="ml-4 space-y-1 text-xs">
                                <li>• Invalidates ENTIRE page</li>
                                <li>• Broad scope, simple API</li>
                                <li>• No stale-while-revalidate</li>
                                <li>• Best for major changes</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <p className="font-medium">revalidateTag:</p>
                            <ul className="ml-4 space-y-1 text-xs">
                                <li>• Invalidates specific tags</li>
                                <li>• Granular control</li>
                                <li>• Has stale-while-revalidate</li>
                                <li>• Best for selective updates</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




