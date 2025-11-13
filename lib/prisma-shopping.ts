// lib/prisma-shopping.ts
// Prisma client for Shopping Demo with Supabase PostgreSQL
import { PrismaClient } from '@prisma/client';
import { cache } from 'react';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Cached database helper for React Server Components
export const getShoppingDb = cache(() => {
    return prisma;
});

