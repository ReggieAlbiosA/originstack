'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';

/**
 * Visualize which paths are revalidated for different actions
 */
export default function PathVisualization() {
  const pathMappings = [
    {
      action: '🛒 Checkout',
      icon: '💳',
      paths: ['/orders', '/shop/cart', '/profile'],
      reason: 'Order created, cart cleared, order history updated',
      color: 'blue',
    },
    {
      action: '👤 Profile Update',
      icon: '✏️',
      paths: ['/profile', '/settings'],
      reason: 'User information and preferences changed',
      color: 'green',
    },
    {
      action: '📦 Inventory Update',
      icon: '🔧',
      paths: ['/shop', '/admin/inventory'],
      reason: 'Product stock or details changed',
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800',
      green: 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800',
      purple: 'bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getBadgeColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Path Revalidation Mapping
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pathMappings.map((mapping, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getColorClasses(mapping.color)}`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{mapping.icon}</div>
                <div className="flex-1 space-y-2">
                  <h4 className="font-semibold">{mapping.action}</h4>
                  <p className="text-sm text-muted-foreground">{mapping.reason}</p>
                  <div className="flex flex-wrap gap-2">
                    {mapping.paths.map((path) => (
                      <Badge
                        key={path}
                        className={`font-mono text-xs ${getBadgeColor(mapping.color)}`}
                      >
                        {path}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
          <p className="font-medium mb-2">🎯 Understanding Path Revalidation:</p>
          <ul className="space-y-1 text-xs text-muted-foreground ml-4">
            <li>• Each path represents a complete page/route</li>
            <li>• All cached data on that path is invalidated</li>
            <li>• Next request fetches fresh data from the source</li>
            <li>• More broad than tag-based invalidation</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}




