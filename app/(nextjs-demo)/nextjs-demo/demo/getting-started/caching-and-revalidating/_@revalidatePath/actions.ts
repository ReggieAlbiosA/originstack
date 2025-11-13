'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma-shopping';
import { DEMO_USER_ID } from '@/lib/shopping-demo/constants';

/**
 * Simulate Checkout Action
 * Demonstrates path revalidation after checkout
 */
export async function simulateCheckoutAction() {
  try {
    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: DEMO_USER_ID },
    });

    if (cartItems.length === 0) {
      return { success: false, error: 'Cart is empty' };
    }

    // Get product details for total calculation
    const productIds = cartItems.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    // Create order
    await prisma.order.create({
      data: {
        userId: DEMO_USER_ID,
        items: cartItems.map(item => {
          const product = products.find(p => p.id === item.productId);
          return {
            productId: item.productId,
            quantity: item.quantity,
            price: product?.price || 0,
            name: product?.name || 'Unknown',
          };
        }),
        totalAmount: total,
        status: 'completed',
      },
    });

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { userId: DEMO_USER_ID },
    });

    // ✅ Revalidate paths affected by checkout
    revalidatePath('/orders');                // Orders page updated
    revalidatePath('/shop/cart');             // Cart cleared
    revalidatePath('/profile');               // Profile order history updated

    return {
      success: true,
      message: 'Checkout completed! Paths revalidated: /orders, /shop/cart, /profile'
    };
  } catch (error) {
    console.error('Checkout failed:', error);
    return { success: false, error: 'Checkout failed' };
  }
}

/**
 * Update Profile Action
 * Demonstrates path revalidation after profile update
 */
export async function updateProfileAction(data: { name: string; email: string }) {
  try {
    await prisma.userProfile.upsert({
      where: { userId: DEMO_USER_ID },
      update: {
        name: data.name,
        email: data.email,
        updatedAt: new Date(),
      },
      create: {
        userId: DEMO_USER_ID,
        name: data.name,
        email: data.email,
      },
    });

    // ✅ Revalidate profile-related paths
    revalidatePath('/profile');               // Main profile page
    revalidatePath('/settings');              // Settings page

    return {
      success: true,
      message: 'Profile updated! Paths revalidated: /profile, /settings'
    };
  } catch (error) {
    console.error('Profile update failed:', error);
    return { success: false, error: 'Profile update failed' };
  }
}

/**
 * Update Inventory Action
 * Demonstrates path revalidation after inventory changes
 */
export async function updateInventoryAction(productId: string, stockChange: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: Math.max(0, product.stock + stockChange),
        updatedAt: new Date(),
      },
    });

    // ✅ Revalidate shop-related paths
    revalidatePath('/shop');                  // Main shop page
    revalidatePath('/admin/inventory');       // Admin inventory page

    return {
      success: true,
      message: 'Inventory updated! Paths revalidated: /shop, /admin/inventory'
    };
  } catch (error) {
    console.error('Inventory update failed:', error);
    return { success: false, error: 'Inventory update failed' };
  }
}

/**
 * Simulate adding items to cart (for demo purposes)
 */
export async function addToCartDemo() {
  try {
    // Get a random product
    const products = await prisma.product.findMany({ take: 5 });

    if (products.length === 0) {
      return { success: false, error: 'No products available' };
    }

    // Add first product to cart
    const product = products[0];

    await prisma.cartItem.create({
      data: {
        userId: DEMO_USER_ID,
        productId: product.id,
        quantity: 1,
      },
    });

    return {
      success: true,
      message: `Added ${product.name} to cart`
    };
  } catch (error) {
    console.error('Add to cart failed:', error);
    return { success: false, error: 'Failed to add to cart' };
  }
}




