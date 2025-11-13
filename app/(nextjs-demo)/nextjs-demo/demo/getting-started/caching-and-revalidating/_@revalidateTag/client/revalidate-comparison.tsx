'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';

/**
 * Visual comparison of revalidation methods
 */
export default function RevalidateComparison() {
  const comparisonData = [
    {
      method: 'revalidateTag (with max)',
      response: '50ms',
      behavior: 'Stale-while-revalidate',
      userExperience: '⭐⭐⭐⭐⭐ Instant',
      color: 'green',
    },
    {
      method: 'updateTag',
      response: '500ms',
      behavior: 'Immediate expiration',
      userExperience: '⭐⭐⭐ Waits for fresh data',
      color: 'amber',
    },
    {
      method: 'revalidatePath',
      response: '500ms',
      behavior: 'Immediate expiration',
      userExperience: '⭐⭐⭐ Waits for fresh data',
      color: 'blue',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800',
      amber: 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800',
      blue: 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {comparisonData.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getColorClasses(item.color)}`}
            >
              <div className="grid sm:grid-cols-4 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Method</p>
                  <p className="font-semibold text-sm">{item.method}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Response Time</p>
                  <p className="font-bold text-sm">{item.response}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Behavior</p>
                  <p className="text-sm">{item.behavior}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">UX</p>
                  <p className="text-sm">{item.userExperience}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
          <p className="font-medium mb-2">📊 Key Takeaway:</p>
          <p className="text-xs text-muted-foreground">
            <strong>revalidateTag</strong> with <code className="bg-background px-1 rounded">profile="max"</code> is
            <strong className="text-green-600 dark:text-green-400"> 10x faster</strong> for the first request after
            invalidation because it serves stale data instantly while fetching fresh data in the background.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}




