import { prisma } from '@/lib/prisma-shopping';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';
import { DEMO_USER_ID } from '@/lib/shopping-demo/constants';

/**
 * Profile Display
 * This page is revalidated via revalidatePath('/profile') after profile updates
 */
async function getProfile() {
  try {
    const profile = await prisma.userProfile.findUnique({
      where: { userId: DEMO_USER_ID },
    });
    return profile;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return null;
  }
}

async function getOrderCount() {
  try {
    const count = await prisma.order.count({
      where: { userId: DEMO_USER_ID },
    });
    return count;
  } catch (error) {
    return 0;
  }
}

export default async function ProfileDisplay() {
  const fetchTime = new Date().toLocaleTimeString();
  const profile = await getProfile();
  const orderCount = await getOrderCount();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>👤 My Profile</span>
        </CardTitle>
        <CardDescription>
          Revalidated via revalidatePath('/profile')
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            Path: /profile
          </Badge>
        </div>

        <div className="space-y-3">
          {!profile ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="mb-2">No profile found</p>
              <p className="text-sm">Update your profile to see data here!</p>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-lg border bg-card space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-medium">{profile.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-sm">{new Date(profile.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="text-sm">{new Date(profile.updatedAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="p-3 rounded-lg border bg-accent">
                <p className="text-xs text-muted-foreground mb-1">Order History</p>
                <p className="text-2xl font-bold">{orderCount}</p>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </div>
            </>
          )}
        </div>

        <div className="pt-3 border-t text-xs text-muted-foreground space-y-2">
          <p>📦 Fetched at: {fetchTime}</p>
          <div>
            <p className="font-medium">💡 When is this revalidated?</p>
            <ul className="mt-1 ml-4 space-y-0.5">
              <li>• After profile update: <code className="bg-muted px-1 rounded">revalidatePath('/profile')</code></li>
              <li>• After checkout: <code className="bg-muted px-1 rounded">revalidatePath('/profile')</code></li>
              <li>• All profile data refreshed (name, email, orders)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




