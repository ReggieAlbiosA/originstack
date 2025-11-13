'use server';

import { revalidateTag } from 'next/cache';
import { prisma } from '@/lib/prisma-shopping';

/**
 * Update product prices and revalidate tags
 * Demonstrates tag-based revalidation with stale-while-revalidate
 */
export async function updateProductPricesAction() {
  try {
    // Update all product prices by a small random amount (demo purposes)
    const products = await prisma.product.findMany({ take: 10 });

    for (const product of products) {
      const priceChange = (Math.random() - 0.5) * 10; // Random change ±5
      await prisma.product.update({
        where: { id: product.id },
        data: {
          price: Math.max(0.99, product.price + priceChange),
          updatedAt: new Date(),
        },
      });
    }

    // ✅ Revalidate with stale-while-revalidate
    revalidateTag('products', 'max');      // All products
    revalidateTag('pricing', 'max');       // Pricing data

    return {
      success: true,
      message: 'Prices updated! Tags revalidated with stale-while-revalidate'
    };
  } catch (error) {
    console.error('Price update failed:', error);
    return { success: false, error: 'Price update failed' };
  }
}

/**
 * Update category and revalidate specific category tag
 */
export async function updateCategoryAction(category: string) {
  try {
    // Update products in this category
    await prisma.product.updateMany({
      where: { category },
      data: { updatedAt: new Date() },
    });

    // ✅ Revalidate only this specific category
    revalidateTag(`category-${category}`, 'max');
    // Other categories remain cached (efficient!)

    return {
      success: true,
      message: `Category '${category}' revalidated! Other categories remain cached.`
    };
  } catch (error) {
    console.error('Category update failed:', error);
    return { success: false, error: 'Category update failed' };
  }
}

/**
 * Update featured products
 */
export async function updateFeaturedAction() {
  try {
    // Toggle featured status for some products
    const products = await prisma.product.findMany({ take: 3 });

    for (const product of products) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          featured: !product.featured,
          updatedAt: new Date(),
        },
      });
    }

    // ✅ Revalidate featured and products tags
    revalidateTag('featured', 'max');
    revalidateTag('products', 'max');

    return {
      success: true,
      message: 'Featured products updated with background revalidation!'
    };
  } catch (error) {
    console.error('Featured update failed:', error);
    return { success: false, error: 'Featured update failed' };
  }
}

/**
 * Update single product stock
 */
export async function updateProductStockAction(productId: string, stockChange: number) {
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

    // ✅ Revalidate multiple related tags
    revalidateTag(`product-${productId}`, 'max');  // Specific product
    revalidateTag('products', 'max');              // All products
    revalidateTag('inventory', 'max');             // Inventory data

    return {
      success: true,
      message: 'Stock updated! Multiple tags revalidated efficiently.'
    };
  } catch (error) {
    console.error('Stock update failed:', error);
    return { success: false, error: 'Stock update failed' };
  }
}
