// lib/shopping-demo/constants.ts
// Constants for the shopping demo

export const DEMO_USER_ID = 'demo-user-001';

export const PRODUCT_CATEGORIES = [
    'electronics',
    'clothing',
    'food',
    'books',
    'toys',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const ORDER_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
} as const;


