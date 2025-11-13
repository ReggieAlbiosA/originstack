import { prisma } from '@/lib/prisma-shopping';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';
import { DEMO_USER_ID } from '@/lib/shopping-demo/constants';

/**
 * User Wishlist Demo
 * Demonstrates: User-specific cache tags for personalized data
 * Tags: ['wishlist', 'user-{userId}', 'user-{userId}-wishlist']
 */
async function getUserWishlist(userId: string) {
    try {
        const profile = await prisma.userProfile.findUnique({
            where: { userId },
        });

        if (!profile?.wishlist) {
            return [];
        }

        const productIds = (profile.wishlist as string[]) || [];

        if (productIds.length === 0) {
            return [];
        }

        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
        });

        return products;
    } catch (error) {
        console.error('Failed to fetch wishlist:', error);
        return [];
    }
}

export default async function UserWishlist() {
    const fetchTime = new Date().toLocaleTimeString();
    const products = await getUserWishlist(DEMO_USER_ID);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>💖 My Wishlist</span>
                    <Badge variant="secondary" className="font-mono text-xs">
                        {products.length} items
                    </Badge>
                </CardTitle>
                <CardDescription>
                    User-specific data with personalized tags
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                        'wishlist'
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                        'user-{'{userId}'}'
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                        'user-{'{userId}'}-wishlist'
                    </Badge>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {products.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p className="mb-2">Your wishlist is empty</p>
                            <p className="text-sm">Add some products to your wishlist to see them here!</p>
                        </div>
                    ) : (
                        products.map((product: typeof products[0]) => (
                            <div
                                key={product.id}
                                className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm">{product.name}</h4>
                                        <Badge variant="outline" className="text-xs mt-1">
                                            {product.category}
                                        </Badge>
                                    </div>
                                    <p className="font-semibold text-sm">${product.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="pt-3 border-t text-xs text-muted-foreground space-y-2">
                    <p>📦 Fetched at: {fetchTime}</p>
                    <p>👤 User ID: {DEMO_USER_ID}</p>
                    <div>
                        <p className="font-medium">💡 User-Specific Tags Enable:</p>
                        <ul className="mt-1 ml-4 space-y-0.5">
                            <li>
                                • <code className="bg-muted px-1 rounded">revalidateTag('user-{DEMO_USER_ID}-wishlist')</code> →
                                Only this user's wishlist
                            </li>
                            <li>
                                • <code className="bg-muted px-1 rounded">revalidateTag('user-{DEMO_USER_ID}')</code> →
                                All data for this user
                            </li>
                            <li>
                                • <code className="bg-muted px-1 rounded">revalidateTag('wishlist')</code> →
                                All wishlists (all users)
                            </li>
                            <li>• Other users' cache remains unaffected</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

