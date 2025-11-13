// prisma/seed.ts
// Seed data for shopping demo

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = [
    // ============================================================================
    // ELECTRONICS CATEGORY
    // ============================================================================
    {
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.',
        price: 299.99,
        category: 'electronics',
        stock: 45,
        featured: true,
        imageUrl: null,
    },
    {
        name: 'Smart Watch Pro',
        description: 'Advanced fitness tracking, heart rate monitor, GPS, and smartphone notifications. Water-resistant up to 50m with 7-day battery life.',
        price: 399.99,
        category: 'electronics',
        stock: 32,
        featured: true,
        imageUrl: null,
    },
    {
        name: 'USB-C Hub Adapter',
        description: '7-in-1 USB-C hub with HDMI, USB 3.0 ports, SD card reader, and power delivery. Essential for modern laptops.',
        price: 49.99,
        category: 'electronics',
        stock: 120,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Wireless Gaming Mouse',
        description: 'High-precision wireless mouse with RGB lighting, 16000 DPI, programmable buttons, and 70-hour battery life.',
        price: 79.99,
        category: 'electronics',
        stock: 67,
        featured: false,
        imageUrl: null,
    },
    {
        name: '4K Webcam with Ring Light',
        description: 'Professional 4K webcam with built-in ring light, auto-focus, and noise-cancelling microphone. Perfect for streaming and video calls.',
        price: 149.99,
        category: 'electronics',
        stock: 28,
        featured: true,
        imageUrl: null,
    },
    {
        name: 'Portable Power Bank 20000mAh',
        description: 'High-capacity power bank with fast charging, dual USB ports, and USB-C input/output. Charges most phones 4-5 times.',
        price: 39.99,
        category: 'electronics',
        stock: 95,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Mechanical Keyboard RGB',
        description: 'Mechanical gaming keyboard with customizable RGB backlighting, Cherry MX switches, and programmable macros.',
        price: 159.99,
        category: 'electronics',
        stock: 41,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Bluetooth Speaker Waterproof',
        description: 'Portable Bluetooth speaker with 360° sound, IPX7 waterproof rating, and 24-hour battery. Perfect for outdoor adventures.',
        price: 89.99,
        category: 'electronics',
        stock: 73,
        featured: false,
        imageUrl: null,
    },

    // ============================================================================
    // CLOTHING CATEGORY
    // ============================================================================
    {
        name: 'Premium Cotton T-Shirt',
        description: 'Soft, breathable 100% organic cotton t-shirt. Available in multiple colors. Perfect for everyday wear.',
        price: 29.99,
        category: 'clothing',
        stock: 150,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Slim Fit Denim Jeans',
        description: 'Classic slim-fit jeans with stretch denim for comfort. Durable construction with reinforced stitching.',
        price: 79.99,
        category: 'clothing',
        stock: 88,
        featured: true,
        imageUrl: null,
    },
    {
        name: 'Waterproof Rain Jacket',
        description: 'Lightweight, breathable rain jacket with adjustable hood. Packable design perfect for travel.',
        price: 119.99,
        category: 'clothing',
        stock: 42,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Merino Wool Sweater',
        description: 'Premium merino wool sweater that regulates temperature naturally. Soft, comfortable, and odor-resistant.',
        price: 89.99,
        category: 'clothing',
        stock: 56,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Athletic Performance Shorts',
        description: 'Moisture-wicking athletic shorts with built-in compression liner. Perfect for running and gym workouts.',
        price: 39.99,
        category: 'clothing',
        stock: 102,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Winter Puffer Jacket',
        description: 'Insulated puffer jacket with down filling. Water-resistant outer shell keeps you warm and dry.',
        price: 189.99,
        category: 'clothing',
        stock: 34,
        featured: true,
        imageUrl: null,
    },
    {
        name: 'Yoga Leggings High-Waist',
        description: 'High-waisted yoga leggings with four-way stretch. Squat-proof and features hidden pocket.',
        price: 54.99,
        category: 'clothing',
        stock: 78,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Casual Button-Down Shirt',
        description: 'Versatile button-down shirt in wrinkle-resistant fabric. Perfect for work or casual occasions.',
        price: 59.99,
        category: 'clothing',
        stock: 91,
        featured: false,
        imageUrl: null,
    },

    // ============================================================================
    // FOOD CATEGORY
    // ============================================================================
    {
        name: 'Organic Coffee Beans 1kg',
        description: 'Single-origin arabica coffee beans, medium roast. Fair trade and organic certified. Rich, smooth flavor.',
        price: 24.99,
        category: 'food',
        stock: 125,
        featured: true,
        imageUrl: null,
    },
    {
        name: 'Premium Dark Chocolate Bar',
        description: '85% cacao dark chocolate made from single-origin beans. Rich, intense flavor with health benefits.',
        price: 8.99,
        category: 'food',
        stock: 200,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Raw Honey Organic 500g',
        description: 'Pure, unfiltered raw honey from local beekeepers. Contains natural enzymes and antioxidants.',
        price: 18.99,
        category: 'food',
        stock: 87,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Matcha Green Tea Powder',
        description: 'Ceremonial grade matcha powder from Japan. High in antioxidants and provides sustained energy.',
        price: 32.99,
        category: 'food',
        stock: 64,
        featured: true,
        imageUrl: null,
    },
    {
        name: 'Mixed Nuts Variety Pack',
        description: 'Premium mixed nuts including almonds, cashews, walnuts, and pecans. Lightly salted and roasted.',
        price: 16.99,
        category: 'food',
        stock: 143,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Olive Oil Extra Virgin 750ml',
        description: 'Cold-pressed extra virgin olive oil from Mediterranean olives. Perfect for cooking and dressings.',
        price: 22.99,
        category: 'food',
        stock: 76,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Protein Powder Chocolate',
        description: 'Whey protein powder with 25g protein per serving. Great for post-workout recovery.',
        price: 49.99,
        category: 'food',
        stock: 58,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Gourmet Sea Salt Collection',
        description: 'Collection of 5 specialty sea salts from around the world. Includes Himalayan pink, fleur de sel, and more.',
        price: 34.99,
        category: 'food',
        stock: 45,
        featured: false,
        imageUrl: null,
    },

    // ============================================================================
    // BOOKS CATEGORY
    // ============================================================================
    {
        name: 'Clean Code by Robert Martin',
        description: 'Essential guide to writing clean, maintainable code. A must-read for software developers.',
        price: 44.99,
        category: 'books',
        stock: 67,
        featured: true,
        imageUrl: null,
    },
    {
        name: 'Atomic Habits by James Clear',
        description: 'Proven framework for improving every day. Learn how tiny changes lead to remarkable results.',
        price: 27.99,
        category: 'books',
        stock: 112,
        featured: true,
        imageUrl: null,
    },
    {
        name: 'The Psychology of Money',
        description: 'Timeless lessons on wealth, greed, and happiness. Understanding the psychology behind financial decisions.',
        price: 24.99,
        category: 'books',
        stock: 89,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Deep Work by Cal Newport',
        description: 'Rules for focused success in a distracted world. Learn to cultivate deep focus and productivity.',
        price: 28.99,
        category: 'books',
        stock: 73,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Designing Data-Intensive Applications',
        description: 'Comprehensive guide to designing scalable, reliable systems. Essential for backend engineers.',
        price: 59.99,
        category: 'books',
        stock: 42,
        featured: true,
        imageUrl: null,
    },
    {
        name: 'Thinking, Fast and Slow',
        description: 'Explore the two systems that drive the way we think. Nobel Prize winner\'s insights into decision-making.',
        price: 32.99,
        category: 'books',
        stock: 95,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'The Lean Startup',
        description: 'How today\'s entrepreneurs use continuous innovation to create radically successful businesses.',
        price: 29.99,
        category: 'books',
        stock: 68,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'System Design Interview Guide',
        description: 'Insider\'s guide to acing system design interviews. Real-world examples and detailed solutions.',
        price: 39.99,
        category: 'books',
        stock: 54,
        featured: false,
        imageUrl: null,
    },

    // ============================================================================
    // TOYS CATEGORY
    // ============================================================================
    {
        name: 'Building Blocks Set 1000 Pieces',
        description: 'Creative building blocks set with 1000 pieces. Compatible with major brands. Encourages creativity and fine motor skills.',
        price: 49.99,
        category: 'toys',
        stock: 83,
        featured: true,
        imageUrl: null,
    },
    {
        name: 'Remote Control Racing Car',
        description: 'High-speed RC car with 2.4GHz remote control. Rechargeable battery provides 30 minutes of playtime.',
        price: 79.99,
        category: 'toys',
        stock: 56,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Educational STEM Robotics Kit',
        description: 'Build and program your own robot. Teaches coding, engineering, and problem-solving skills.',
        price: 129.99,
        category: 'toys',
        stock: 38,
        featured: true,
        imageUrl: null,
    },
    {
        name: 'Wooden Puzzle Set Collection',
        description: 'Set of 5 high-quality wooden puzzles for different age groups. Develops spatial reasoning and patience.',
        price: 34.99,
        category: 'toys',
        stock: 72,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Art Supplies Complete Set',
        description: 'Complete art set with crayons, markers, colored pencils, and paper. Everything young artists need.',
        price: 44.99,
        category: 'toys',
        stock: 91,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Interactive Learning Tablet',
        description: 'Kid-friendly tablet with educational games and parental controls. Teaches reading, math, and science.',
        price: 89.99,
        category: 'toys',
        stock: 47,
        featured: true,
        imageUrl: null,
    },
    {
        name: 'Science Experiment Lab Kit',
        description: 'Perform 100+ safe science experiments at home. Includes all materials and detailed instruction manual.',
        price: 59.99,
        category: 'toys',
        stock: 65,
        featured: false,
        imageUrl: null,
    },
    {
        name: 'Musical Instrument Toy Set',
        description: 'Collection of child-safe musical instruments including xylophone, tambourine, and maracas.',
        price: 39.99,
        category: 'toys',
        stock: 104,
        featured: false,
        imageUrl: null,
    },
];

export async function main() {
    console.log('🌱 Starting seed...');

    // Clear existing products (optional - remove if you want to keep existing data)
    console.log('🗑️  Clearing existing products...');
    await prisma.product.deleteMany();

    // Seed products
    console.log('📦 Seeding products...');
    for (const p of productData) {
        await prisma.product.create({
            data: p,
        });
    }

    console.log(`✅ Created ${productData.length} products`);
    console.log('📊 Summary:');
    console.log(`   - Electronics: ${productData.filter(p => p.category === 'electronics').length}`);
    console.log(`   - Clothing: ${productData.filter(p => p.category === 'clothing').length}`);
    console.log(`   - Food: ${productData.filter(p => p.category === 'food').length}`);
    console.log(`   - Books: ${productData.filter(p => p.category === 'books').length}`);
    console.log(`   - Toys: ${productData.filter(p => p.category === 'toys').length}`);
    console.log(`   - Featured: ${productData.filter(p => p.featured).length}`);
    console.log('🎉 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
