'use server';

import { updateTag } from 'next/cache';
import { prisma } from '@/lib/prisma-shopping';
import { DEMO_USER_ID } from '@/lib/shopping-demo/constants';

/**
 * Add item to cart with immediate cache update
 * User MUST see new item right away - no stale data acceptable
 */
export async function addToCartAction(productId: string) {
  try {
    // Check if item already in cart
    const existing = await prisma.cartItem.findFirst({
      where: {
        userId: DEMO_USER_ID,
        productId,
      },
    });

    if (existing) {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + 1 },
      });
    } else {
      // Create new cart item
      await prisma.cartItem.create({
        data: {
          userId: DEMO_USER_ID,
          productId,
          quantity: 1,
        },
      });
    }

    // ✅ Immediate cache expiration - user MUST see changes
    updateTag('cart');
    updateTag(`user-${DEMO_USER_ID}-cart`);

    return {
      success: true,
      message: 'Added to cart! Cache updated immediately.'
    };
  } catch (error) {
    console.error('Add to cart failed:', error);
    return { success: false, error: 'Failed to add to cart' };
  }
}

/**
 * Remove item from cart with immediate cache update
 * Item MUST disappear immediately - critical UX requirement
 */
export async function removeFromCartAction(itemId: string) {
  try {
    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    // ✅ Immediate cache expiration - item must disappear now
    updateTag('cart');
    updateTag(`user-${DEMO_USER_ID}-cart`);

    return {
      success: true,
      message: 'Removed from cart! Cache expired immediately.'
    };
  } catch (error) {
    console.error('Remove from cart failed:', error);
    return { success: false, error: 'Failed to remove item' };
  }
}

/**
 * Place order with immediate cache update
 * User MUST see order confirmation and cleared cart immediately
 */
export async function placeOrderAction() {
  try {
    // Get cart items with product details
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
    const order = await prisma.order.create({
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

    // ✅ Immediate cache expiration for orders and cart
    updateTag(`user-${DEMO_USER_ID}-orders`);
    updateTag('orders');
    updateTag('cart');
    updateTag(`user-${DEMO_USER_ID}-cart`);

    return {
      success: true,
      message: `Order #${order.id.slice(0, 8)} placed! Cache updated immediately.`,
      orderId: order.id,
    };
  } catch (error) {
    console.error('Place order failed:', error);
    return { success: false, error: 'Failed to place order' };
  }
}

/**
 * Clear cart with immediate cache update
 */
export async function clearCartAction() {
  try {
    await prisma.cartItem.deleteMany({
      where: { userId: DEMO_USER_ID },
    });

    // ✅ Immediate cache expiration
    updateTag('cart');
    updateTag(`user-${DEMO_USER_ID}-cart`);

    return {
      success: true,
      message: 'Cart cleared! Cache expired immediately.'
    };
  } catch (error) {
    console.error('Clear cart failed:', error);
    return { success: false, error: 'Failed to clear cart' };
  }
}
