import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const TEST_DB_URL = process.env.TEST_DATABASE_URL ||
    'postgres://prisma:password@localhost:5432/test_migrations';

describe('Prisma Migration Tests', () => {
    let prisma: PrismaClient;

    beforeAll(async () => {
        // Apply migrations to test database
        execSync('prisma migrate deploy', {
            env: { ...process.env, DATABASE_URL: TEST_DB_URL }
        });

        prisma = new PrismaClient({
            datasources: { db: { url: TEST_DB_URL } }
        });
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('Schema Validation', () => {
        it('should have all required models', async () => {
            expect(prisma.product).toBeDefined();
            expect(prisma.cartItem).toBeDefined();
            expect(prisma.order).toBeDefined();
            expect(prisma.userProfile).toBeDefined();
        });

        it('should create a product with all fields', async () => {
            const product = await prisma.product.create({
                data: {
                    name: 'Test Product',
                    description: 'Test Description',
                    price: 99.99,
                    category: 'electronics',
                    stock: 50,
                    featured: true,
                    imageUrl: 'https://example.com/image.jpg'
                }
            });

            expect(product).toMatchObject({
                name: 'Test Product',
                price: 99.99,
                category: 'electronics',
                stock: 50,
                featured: true
            });
            expect(product.id).toBeDefined();
            expect(product.createdAt).toBeInstanceOf(Date);
        });

        it('should enforce unique constraints on UserProfile', async () => {
            const user1 = await prisma.userProfile.create({
                data: {
                    userId: 'user1',
                    name: 'John Doe',
                    email: 'john@example.com'
                }
            });

            // Should fail with duplicate email
            await expect(
                prisma.userProfile.create({
                    data: {
                        userId: 'user2',
                        name: 'Jane Doe',
                        email: 'john@example.com' // Same email
                    }
                })
            ).rejects.toThrow();
        });

        it('should handle JSON fields in Order', async () => {
            const order = await prisma.order.create({
                data: {
                    userId: 'user1',
                    items: [
                        { productId: '123', quantity: 2, price: 99.99 },
                        { productId: '456', quantity: 1, price: 49.99 }
                    ],
                    totalAmount: 249.97,
                    status: 'pending'
                }
            });

            expect(order.items).toEqual([
                { productId: '123', quantity: 2, price: 99.99 },
                { productId: '456', quantity: 1, price: 49.99 }
            ]);
        });
    });

    describe('Schema Relationships & Constraints', () => {
        it('should use correct table names with @@map', async () => {
            // This validates that @@map directives work correctly
            const product = await prisma.product.create({
                data: {
                    name: 'Mapped Test',
                    price: 10,
                    category: 'test',
                    stock: 1
                }
            });

            // Query raw to check actual table name
            const result = await prisma.$queryRaw`
        SELECT * FROM "originstack-supabase-schema".products
        WHERE id = ${product.id}
      `;
            expect(result).toHaveLength(1);
        });

        it('should use correct schema with @@schema', async () => {
            // Validates that custom schema is being used
            const schemas = await prisma.$queryRaw`
        SELECT schema_name FROM information_schema.schemata
        WHERE schema_name = 'originstack-supabase-schema'
      `;
            expect(schemas).toHaveLength(1);
        });
    });
});
