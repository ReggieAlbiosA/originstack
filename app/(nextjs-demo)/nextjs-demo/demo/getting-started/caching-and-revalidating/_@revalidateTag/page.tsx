import { Suspense } from 'react';
import ProductList from './server/product-list';
import CategoryDisplay from './server/category-display';
import PricingDisplay from './server/pricing-display';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import RevalidateComparison from './client/revalidate-comparison';
import TagRevalidateActions from './client/tag-revalidate-actions';

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

export default function RevalidateTagDemoPage() {
    return (
        <div className="space-y-6 p-6">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">revalidateTag with Stale-While-Revalidate</h3>
                <p className="text-muted-foreground">
                    Explore tag-based cache revalidation with optimal performance. When tags are revalidated
                    using profile="max", stale data is served instantly while fresh data is fetched in the
                    background - providing the best user experience.
                </p>
            </div>

            {/* Comparison Chart */}
            <RevalidateComparison />

            {/* Interactive Actions */}
            <TagRevalidateActions />

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Demo 1: Product List - Tagged with 'products' */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <ProductList />
                </Suspense>

                {/* Demo 2: Category Display - Tagged with 'category-{name}' */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <CategoryDisplay />
                </Suspense>

                {/* Demo 3: Pricing Display - Tagged with 'pricing' */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <PricingDisplay />
                </Suspense>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-6">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div className="space-y-3">
                        <h5 className="text-sm font-semibold text-cyan-900 dark:text-cyan-100">⚡ Stale-While-Revalidate Benefits</h5>
                        <ul className="space-y-2 text-sm text-cyan-800 dark:text-cyan-200">
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-600 dark:text-cyan-400 mt-0.5">✓</span>
                                <span><strong>Instant Response</strong>: Users get data immediately (serves stale)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-600 dark:text-cyan-400 mt-0.5">✓</span>
                                <span><strong>No Latency</strong>: Background revalidation doesn't block requests</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-600 dark:text-cyan-400 mt-0.5">✓</span>
                                <span><strong>Better UX</strong>: No loading spinners or delays for users</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-600 dark:text-cyan-400 mt-0.5">✓</span>
                                <span><strong>Reduced Load</strong>: Controlled origin requests in background</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <div className="space-y-3">
                    <h5 className="text-sm font-semibold text-purple-900 dark:text-purple-100">📚 How Stale-While-Revalidate Works</h5>
                    <div className="text-sm text-purple-800 dark:text-purple-200 space-y-2">
                        <div className="flex items-start gap-3">
                            <span className="font-bold text-purple-600 dark:text-purple-400">1.</span>
                            <div>
                                <p className="font-medium">Action Triggers Revalidation</p>
                                <code className="text-xs bg-purple-100 dark:bg-purple-900 px-1.5 py-0.5 rounded">revalidateTag('products', 'max')</code>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="font-bold text-purple-600 dark:text-purple-400">2.</span>
                            <div>
                                <p className="font-medium">Tag Marked as Stale (Not Deleted)</p>
                                <p className="text-xs">Cache entry remains but flagged for refresh</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="font-bold text-purple-600 dark:text-purple-400">3.</span>
                            <div>
                                <p className="font-medium">Next Request Serves Stale Instantly</p>
                                <p className="text-xs">User gets immediate response (50ms) with existing data</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="font-bold text-purple-600 dark:text-purple-400">4.</span>
                            <div>
                                <p className="font-medium">Background Fetch Starts</p>
                                <p className="text-xs">Fresh data fetched from source without blocking user</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="font-bold text-purple-600 dark:text-purple-400">5.</span>
                            <div>
                                <p className="font-medium">Cache Updated Silently</p>
                                <p className="text-xs">Future requests get fresh data seamlessly</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border bg-card">
                    <h5 className="font-semibold text-sm mb-2 text-green-600 dark:text-green-400">✅ Use revalidateTag when:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Specific data changed</li>
                        <li>• Stale data is acceptable</li>
                        <li>• Optimal performance needed</li>
                        <li>• Multiple requests share tags</li>
                    </ul>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                    <h5 className="font-semibold text-sm mb-2 text-amber-600 dark:text-amber-400">⚠️ Use updateTag when:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• User must see changes NOW</li>
                        <li>• Critical read-your-own-writes</li>
                        <li>• Data consistency required</li>
                        <li>• In Server Actions only</li>
                    </ul>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                    <h5 className="font-semibold text-sm mb-2 text-blue-600 dark:text-blue-400">🔄 Use revalidatePath when:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Entire page needs refresh</li>
                        <li>• Multiple unrelated changes</li>
                        <li>• Simpler than tracking tags</li>
                        <li>• Major state transitions</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
