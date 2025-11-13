// lib/shopping-demo/types.ts
// TypeScript types for the shopping demo

export interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number;
    category: string;
    stock: number;
    featured: boolean;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CartItem {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    addedAt: Date;
}

export interface CartItemWithProduct extends CartItem {
    product: Product;
}

export interface Order {
    id: string;
    userId: string;
    items: any; // JSON data
    totalAmount: number;
    status: string;
    createdAt: Date;
}

export interface UserProfile {
    id: string;
    userId: string;
    name: string;
    email: string;
    wishlist: any; // JSON data - array of product IDs
    createdAt: Date;
    updatedAt: Date;
}


