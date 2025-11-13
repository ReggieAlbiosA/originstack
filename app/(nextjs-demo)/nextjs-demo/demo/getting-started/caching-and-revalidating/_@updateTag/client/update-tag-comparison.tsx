'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';

/**
 * Visual comparison: updateTag vs revalidateTag
 */
export default function UpdateTagComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>updateTag vs revalidateTag - Performance & Behavior</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h4 className="font-semibold text-red-900 dark:text-red-100">updateTag (Immediate)</h4>
                <p className="text-xs text-red-700 dark:text-red-300">For critical operations</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-white dark:bg-red-950/40 rounded">
                <p className="text-xs font-medium mb-1">When Action Happens:</p>
                <ol className="text-xs text-muted-foreground ml-4 list-decimal space-y-0.5">
                  <li>Database updated</li>
                  <li>Cache deleted immediately</li>
                  <li>updateTag('cart') called</li>
                </ol>
              </div>
              <div className="p-2 bg-white dark:bg-red-950/40 rounded">
                <p className="text-xs font-medium mb-1">Next Request:</p>
                <p className="text-xs text-muted-foreground">
                  ⏱️ <strong>500ms</strong> - waits for fresh data fetch
                </p>
              </div>
              <div className="p-2 bg-white dark:bg-red-950/40 rounded">
                <p className="text-xs font-medium">Result:</p>
                <p className="text-xs text-green-700 dark:text-green-300">✅ User sees changes immediately</p>
                <p className="text-xs text-amber-700 dark:text-amber-300">⚠️ Slower response time</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🔄</span>
              <div>
                <h4 className="font-semibold text-cyan-900 dark:text-cyan-100">revalidateTag (Stale-While-Revalidate)</h4>
                <p className="text-xs text-cyan-700 dark:text-cyan-300">For non-critical updates</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-white dark:bg-cyan-950/40 rounded">
                <p className="text-xs font-medium mb-1">When Action Happens:</p>
                <ol className="text-xs text-muted-foreground ml-4 list-decimal space-y-0.5">
                  <li>Database updated</li>
                  <li>Cache marked stale (not deleted)</li>
                  <li>revalidateTag('products', 'max') called</li>
                </ol>
              </div>
              <div className="p-2 bg-white dark:bg-cyan-950/40 rounded">
                <p className="text-xs font-medium mb-1">Next Request:</p>
                <p className="text-xs text-muted-foreground">
                  ⚡ <strong>50ms</strong> - serves stale instantly
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  🔄 Background: Fresh data fetched
                </p>
              </div>
              <div className="p-2 bg-white dark:bg-cyan-950/40 rounded">
                <p className="text-xs font-medium">Result:</p>
                <p className="text-xs text-green-700 dark:text-green-300">✅ Instant response (10x faster)</p>
                <p className="text-xs text-amber-700 dark:text-amber-300">⚠️ Temporarily shows stale data</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
          <p className="font-medium mb-2">🎯 When to Use Each:</p>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-medium text-red-700 dark:text-red-300 mb-1">Use updateTag for:</p>
              <ul className="ml-4 space-y-0.5 text-muted-foreground">
                <li>• Shopping cart add/remove</li>
                <li>• Order placement</li>
                <li>• Account deletion</li>
                <li>• Password changes</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-cyan-700 dark:text-cyan-300 mb-1">Use revalidateTag for:</p>
              <ul className="ml-4 space-y-0.5 text-muted-foreground">
                <li>• Product price updates</li>
                <li>• Inventory changes</li>
                <li>• Category updates</li>
                <li>• Review additions</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


